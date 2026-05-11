import { notFound } from "next/navigation";
import { client } from "../../../lib/sanity";
import ProductDetail from "./ProductDetail";

const BASE_URL = "https://miveron.com";

async function getProduct(id) {
  const query = `*[_type == "product" && _id == $id][0]{
    "id": _id,
    name,
    price,
    "collection": collection,
    "image": image.asset->url,
    description,
    variants[]{
      colorName,
      colorCode,
      "image": image.asset->url
    },
    "gallery": gallery[].asset->url,
    badge,
    tagline,
    currency,
    caseSize,
    movement,
    caseMaterial,
    crystal,
    strapMaterial,
    waterResistance,
    features,
    inStock
  }`;

  return await client.fetch(query, { id });
}

async function getRelatedProducts(collection, excludeId) {
  if (!collection) return [];

  const query = `*[_type == "product" && collection == $collection && _id != $id && !(_id in path("drafts.**"))][0...3]{
    "id": _id,
    name,
    price,
    currency,
    "image": image.asset->url
  }`;

  const data = await client.fetch(query, { collection, id: excludeId });
  return data || [];
}

// Dynamic metadata for each product page
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const title = `${product.name} — Premium Watch`;
  const description = product.description
    ? `${product.description.slice(0, 150)}. Buy ${product.name} from MIVERON with free delivery across Egypt.`
    : `Buy ${product.name} — premium luxury watch from MIVERON. Free delivery across Egypt. Cash on delivery available. ساعة فاخرة`;
  const productUrl = `${BASE_URL}/product/${product.id}`;

  return {
    title,
    description,
    keywords: [
      product.name,
      "luxury watch",
      "premium watch Egypt",
      "buy watch online",
      product.collection ? `${product.collection} collection` : "",
      "MIVERON",
      "ساعة فاخرة",
      "شراء ساعات مصر",
    ].filter(Boolean),
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.name} — MIVERON`,
      description,
      url: productUrl,
      siteName: "MIVERON",
      type: "website",
      images: product.image
        ? [
            {
              url: product.image,
              width: 800,
              height: 800,
              alt: product.name,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — MIVERON`,
      description,
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.collection, id);

  // Product JSON-LD structured data
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description ||
      `${product.name} — premium luxury watch from MIVERON`,
    image: product.image || "",
    brand: {
      "@type": "Brand",
      name: "MIVERON",
    },
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/product/${product.id}`,
      priceCurrency: "EGP",
      price: product.price,
      availability: product.inStock !== false
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "MIVERON",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "EGP",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "EG",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
    },
  };

  // Add specifications if available
  if (product.caseSize || product.movement || product.caseMaterial) {
    productJsonLd.additionalProperty = [];
    if (product.caseSize) {
      productJsonLd.additionalProperty.push({
        "@type": "PropertyValue",
        name: "Case Size",
        value: product.caseSize,
      });
    }
    if (product.movement) {
      productJsonLd.additionalProperty.push({
        "@type": "PropertyValue",
        name: "Movement",
        value: product.movement,
      });
    }
    if (product.caseMaterial) {
      productJsonLd.additionalProperty.push({
        "@type": "PropertyValue",
        name: "Case Material",
        value: product.caseMaterial,
      });
    }
    if (product.waterResistance) {
      productJsonLd.additionalProperty.push({
        "@type": "PropertyValue",
        name: "Water Resistance",
        value: product.waterResistance,
      });
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </>
  );
}

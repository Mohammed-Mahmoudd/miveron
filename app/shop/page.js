import { client } from "../../lib/sanity";
import ShopContent from "./ShopContent";

export const metadata = {
  title: "Shop All Luxury Watches",
  description:
    "Browse our full collection of premium luxury watches. Free delivery across Egypt. Cash on delivery available. تسوق ساعات فاخرة مع توصيل مجاني",
  keywords: [
    "shop watches Egypt",
    "buy luxury watches",
    "premium watches online",
    "تسوق ساعات",
    "ساعات فاخرة",
    "MIVERON collection",
    "watches free delivery Egypt",
  ],
  alternates: {
    canonical: "https://miveron.com/shop",
  },
  openGraph: {
    title: "Shop All Luxury Watches — MIVERON",
    description:
      "Browse our full collection of premium luxury watches with free delivery across Egypt.",
    url: "https://miveron.com/shop",
    type: "website",
  },
};

async function getProducts() {
  const query = `*[_type == "product" && !(_id in path("drafts.**"))]{
    "id": _id,
    name,
    price,
    "collection": collection,
    "image": image.asset->url,
    color,
    description,
    badge,
    currency,
    inStock
  }`;
  const data = await client.fetch(query);
  return data || [];
}

export default async function ShopPage() {
  const products = await getProducts();

  // ItemList JSON-LD for product listing page
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MIVERON Luxury Watch Collection",
    description: "Premium luxury watches with free delivery across Egypt",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://miveron.com/product/${product.id}`,
      name: product.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd),
        }}
      />
      <ShopContent products={products} />
    </>
  );
}

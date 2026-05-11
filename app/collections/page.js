import Link from "next/link";
import Image from "next/image";
import { collections } from "../data/products";
import { client } from "../../lib/sanity";
import styles from "./collections.module.css";

export const metadata = {
  title: "Collections — MIVERON",
  description: "Explore MIVERON's watch collections: Core, Icon, and Limited.",
};

export default async function CollectionsPage() {
  const query = `*[_type == "product" && !(_id in path("drafts.**"))]{
    "id": _id,
    name,
    price,
    "collection": collection,
    "image": image.asset->url,
    badge,
    tagline,
    currency
  }`;
  
  let products = [];
  try {
    products = await client.fetch(query) || [];
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Collections</h1>
          <p className={styles.subtitle}>
            Three tiers. One standard. Each designed with intent.
          </p>
        </div>

        <div className={styles.collectionsStack}>
          {collections.map((col, idx) => {
            const colProducts = products.filter(
              (p) => p.collection && p.collection.toLowerCase() === col.id
            );

            // Calculate dynamic price range
            const prices = colProducts.map(p => p.price).filter(p => p != null);
            const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
            const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
            const dynamicRange = prices.length > 0 
              ? `EGP ${minPrice.toLocaleString()} — ${maxPrice.toLocaleString()}`
              : col.priceRange; 

            return (
              <div key={col.id} className={styles.collectionSection} id={`collection-section-${col.id}`}>
                <div className={styles.collectionHeader}>
                  <div className={styles.collectionMeta}>
                    <span className={styles.collectionNumber}>0{idx + 1}</span>
                    <div>
                      <h2 className={styles.collectionName}>{col.name}</h2>
                      <p className={styles.collectionDesc}>{col.description}</p>
                    </div>
                  </div>
                  <span className={styles.collectionPrice}>{dynamicRange}</span>
                </div>

                <div className={styles.productsRow}>
                  {colProducts.map((p) => (
                    <Link href={`/product/${p.id}`} key={p.id} className={styles.productTile}>
                      <div className={styles.productImageWrap}>
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className={styles.productImage}
                        />
                        {p.badge && (
                          <span className={styles.productBadge}>{p.badge}</span>
                        )}
                      </div>
                      <div className={styles.productInfo}>
                        <h4 className={styles.productName}>{p.name}</h4>
                        <p className={styles.productTagline}>{p.tagline}</p>
                        <p className={styles.productPrice}>
                          {p.currency} {p.price?.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import styles from "./product.module.css";

export default function ProductPage({ params }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href="/shop" className={styles.breadcrumbLink}>Shop</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{product.name}</span>
        </nav>

        <div className={styles.layout}>
          {/* Image */}
          <div className={styles.imageSection}>
            <div className={styles.imageMain}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 55vw"
                className={styles.productImage}
              />
              {product.badge && (
                <span className={styles.badge}>{product.badge}</span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className={styles.details}>
            <div className={styles.detailsTop}>
              <span className={styles.collection}>
                {product.collection} Collection
              </span>
              <h1 className={styles.productName}>{product.name}</h1>
              <p className={styles.tagline}>{product.tagline}</p>
              <p className={styles.price}>
                {product.currency} {product.price.toLocaleString()}
              </p>
            </div>

            <div className={styles.divider} />

            {/* Specs */}
            <div className={styles.specs}>
              <h3 className={styles.specsTitle}>Specifications</h3>
              <div className={styles.specsList}>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Case Size</span>
                  <span className={styles.specValue}>{product.caseSize}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Movement</span>
                  <span className={styles.specValue}>{product.movement}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Case</span>
                  <span className={styles.specValue}>{product.caseMaterial}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Crystal</span>
                  <span className={styles.specValue}>{product.crystal}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Strap</span>
                  <span className={styles.specValue}>{product.strapMaterial}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Water Resistance</span>
                  <span className={styles.specValue}>{product.waterResistance}</span>
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Features */}
            <div className={styles.features}>
              <h3 className={styles.specsTitle}>Features</h3>
              <ul className={styles.featureList}>
                {product.features.map((f, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <span className={styles.featureDot} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.divider} />

            {/* Add to Cart */}
            {product.inStock ? (
              <button
                className={styles.addToCart}
                onClick={() => addItem(product)}
                id="add-to-cart"
              >
                Add to Bag — {product.currency} {product.price.toLocaleString()}
              </button>
            ) : (
              <div className={styles.soldOutWrap}>
                <button className={styles.soldOutBtn} disabled>
                  Sold Out
                </button>
                <p className={styles.soldOutText}>
                  This piece is no longer available. Join the waitlist for the next drop.
                </p>
              </div>
            )}

            <p className={styles.shipping}>
              Free shipping across Egypt · Cash on Delivery available
            </p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className={styles.related}>
            <h2 className={styles.relatedTitle}>You might also like</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((p) => (
                <Link href={`/product/${p.id}`} key={p.id} className={styles.relatedCard}>
                  <div className={styles.relatedImageWrap}>
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className={styles.relatedImage}
                    />
                  </div>
                  <div className={styles.relatedInfo}>
                    <h4 className={styles.relatedName}>{p.name}</h4>
                    <p className={styles.relatedPrice}>
                      {p.currency} {p.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

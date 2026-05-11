"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import styles from "./product.module.css";

export default function ProductDetail({ product, relatedProducts }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [activeImage, setActiveImage] = useState(
    product.variants?.[0]?.image || product.image
  );
  const { addItem } = useCart();

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
                src={activeImage || product.image}
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

            {/* Gallery Thumbnails */}
            {(product.gallery?.length > 0 || product.variants?.length > 0) && (
              <div className={styles.thumbnailGrid}>


                {/* Variant Thumbnails (if they have images) */}
                {product.variants?.map((v, idx) => v.image && (
                  <button 
                    key={`v-${idx}`}
                    className={`${styles.thumbnail} ${activeImage === v.image ? styles.activeThumb : ""}`}
                    onClick={() => {
                      setActiveImage(v.image);
                      setSelectedVariant(v);
                    }}
                  >
                    <Image src={v.image} alt={v.colorName} fill sizes="80px" className={styles.thumbImg} />
                  </button>
                ))}

                {/* Gallery Images */}
                {product.gallery?.map((img, idx) => (
                  <button 
                    key={`g-${idx}`}
                    className={`${styles.thumbnail} ${activeImage === img ? styles.activeThumb : ""}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <Image src={img} alt={`Gallery ${idx}`} fill sizes="80px" className={styles.thumbImg} />
                  </button>
                ))}
              </div>
            )}
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
                {product.currency} {product.price?.toLocaleString()}
              </p>
            </div>

            {/* Color Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className={styles.variantSection}>
                <p className={styles.variantLabel}>
                  Color: <span className={styles.variantName}>{selectedVariant?.colorName}</span>
                </p>
                <div className={styles.colorGrid}>
                  {product.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      className={`${styles.colorCircle} ${selectedVariant?.colorName === variant.colorName ? styles.activeColor : ""}`}
                      style={{ backgroundColor: variant.colorCode || "#333" }}
                      onClick={() => {
                        setSelectedVariant(variant);
                        if (variant.image) setActiveImage(variant.image);
                      }}
                      title={variant.colorName}
                    />
                  ))}
                </div>
              </div>
            )}

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
                {product.features?.map((f, idx) => (
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
                Add to Bag — {product.currency} {product.price?.toLocaleString()}
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
              Free Delivery across Egypt · Cash on Delivery available
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
                      {p.currency} {p.price?.toLocaleString()}
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

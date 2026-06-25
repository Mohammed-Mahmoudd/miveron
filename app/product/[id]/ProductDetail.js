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

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in this product: ${product.name}${selectedVariant ? ` (Color: ${selectedVariant.colorName})` : ''}\nhttps://miveron.com/product/${product.id}`
  );

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

            {/* Add to Cart + WhatsApp */}
            {product.inStock ? (
              <div className={styles.ctaRow}>


                <button
                  className={styles.addToCart}
                  onClick={() => {
                    const itemToAdd = selectedVariant
                      ? {
                          ...product,
                          color: selectedVariant.colorName || product.color,
                          image: selectedVariant.image || product.image,
                        }
                      : product;
                    addItem(itemToAdd);
                  }}
                  id="add-to-cart"
                >
                  Add to Bag — {product.currency} {product.price?.toLocaleString()}
                </button>
                <a
                  href={`https://wa.me/201501685539?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappBtn}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
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
              Cash on Delivery available
            </p>

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
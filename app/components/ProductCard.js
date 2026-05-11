"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className={styles.card} id={`product-${product.id}`}>
      <Link href={`/product/${product.id}`} className={styles.imageWrap}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className={styles.image}
        />
        <div className={styles.quickAdd}>
          <button
            className={styles.quickAddBtn}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
          >
            + Add to Bag
          </button>
        </div>
      </Link>

      <div className={styles.info}>
        <Link href={`/product/${product.id}`} className={styles.nameLink}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        <p className={styles.color}>{product.color}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>
            {product.currency || "EGP"} {product.price?.toLocaleString() || "—"}
          </span>
          {!product.inStock && (
            <span className={styles.soldOut}>Sold Out</span>
          )}
        </div>
      </div>
    </div>
  );
}

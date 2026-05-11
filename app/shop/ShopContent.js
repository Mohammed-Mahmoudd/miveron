"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { collections } from "../data/products";
import ProductCard from "../components/ProductCard";
import styles from "./shop.module.css";

function ShopInner({ products }) {
  const searchParams = useSearchParams();
  const initialCollection = searchParams.get("collection") || "all";
  const [activeFilter, setActiveFilter] = useState(initialCollection);
  const [sortBy, setSortBy] = useState("featured");

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeFilter !== "all") {
      result = result.filter(
        (p) => p.collection && p.collection.toLowerCase() === activeFilter
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      default:
        break;
    }

    return result;
  }, [products, activeFilter, sortBy]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <span className={styles.label}>Collection</span>
            <h1 className={styles.title}>All Watches</h1>
          </div>
          <p className={styles.count}>{filtered.length} pieces</p>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filterTabs}>
            <button
              className={`${styles.filterTab} ${activeFilter === "all" ? styles.filterTabActive : ""}`}
              onClick={() => setActiveFilter("all")}
              id="filter-all"
            >
              All
            </button>
            {collections.map((col) => (
              <button
                key={col.id}
                className={`${styles.filterTab} ${activeFilter === col.id ? styles.filterTabActive : ""}`}
                onClick={() => setActiveFilter(col.id)}
                id={`filter-${col.id}`}
              >
                {col.name}
              </button>
            ))}
          </div>

        </div>

        {/* Products Grid */}
        <div className={styles.grid}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p>No watches found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopContent({ products }) {
  return (
    <Suspense>
      <ShopInner products={products} />
    </Suspense>
  );
}

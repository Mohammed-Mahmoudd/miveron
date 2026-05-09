"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { products, collections } from "../data/products";
import ProductCard from "../components/ProductCard";
import styles from "./shop.module.css";
import { Suspense } from "react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCollection = searchParams.get("collection") || "all";
  const [activeFilter, setActiveFilter] = useState(initialCollection);
  const [sortBy, setSortBy] = useState("featured");

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeFilter !== "all") {
      result = result.filter(
        (p) => p.collection.toLowerCase() === activeFilter
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [activeFilter, sortBy]);

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

          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            id="sort-select"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
          </select>
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

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}

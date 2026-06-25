"use client";
import { useState, useMemo, Suspense } from "react";
import ProductCard from "../components/ProductCard";
import styles from "./shop.module.css";

function ShopInner({ products }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => {
        const name = p.name?.toLowerCase() || "";
        const description = p.description?.toLowerCase() || "";
        return name.includes(q) || description.includes(q);
      });
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
  }, [products, searchQuery, sortBy]);

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
          <div className={styles.searchBar}>
            <svg
              className={styles.searchIcon}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search watches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              id="search-watches"
            />
          </div>

          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            id="sort-select"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
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
            <p>No watches found matching your search.</p>
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
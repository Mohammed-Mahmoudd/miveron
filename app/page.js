"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products, collections } from "./data/products";
import ProductCard from "./components/ProductCard";
import HomeAnimations from "./components/HomeAnimations";
import ParallaxSection from "./components/ParallaxSection";
import styles from "./page.module.css";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProducts = activeFilter === "all"
    ? products.filter((p) => p.inStock).slice(0, 8)
    : products.filter((p) => p.collection.toLowerCase() === activeFilter.toLowerCase() && p.inStock).slice(0, 8);

  return (
    <div className={styles.homeWrapper}>
      <HomeAnimations />

      {/* ── HERO BANNER ── */}
      <section className={styles.heroBannerPadded}>
        <div className={styles.container}>
          <div className={styles.heroBannerWrap}>
            <Image
              src="/HERO-BACKGROUND.png"
              alt="Miveron Drop 001"
              fill
              priority
              quality={100}
              unoptimized={true}
              className={styles.heroBannerImg}
              data-anim="hero-img"
            />
            <div className={styles.heroTextBlock}>
              <span className={styles.heroLabel} data-anim="hero-label">ICON COLLECTION</span>
              <h1 className={styles.heroHeadline} data-anim="hero-headline">Set The<br/>Standard.</h1>
              <p className={styles.heroSub} data-anim="hero-sub">Premium timepieces for the ones who move first.</p>
              <Link href="/shop" className={styles.heroBtn} data-anim="hero-btn">
                SHOP NOW
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── UNIFIED PRODUCTS SECTION ── */}
      <section className={styles.sectionWrap}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-anim="section-header">
            <h2 className={styles.sectionTitle}>The Collection</h2>
            <Link href="/shop" className={styles.viewAllBtn}>Shop All →</Link>
          </div>

          {/* Filter Tabs */}
          <div className={styles.filterTabs} data-anim="section-header">
            <button
              className={`${styles.filterTab} ${activeFilter === "all" ? styles.filterTabActive : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All
            </button>
            {collections.map((col) => (
              <button
                key={col.id}
                className={`${styles.filterTab} ${activeFilter === col.id ? styles.filterTabActive : ""}`}
                onClick={() => setActiveFilter(col.id)}
              >
                {col.name}
              </button>
            ))}
          </div>

          <div className={styles.productsGrid} data-anim="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── NORMAL PARALLAX TEXT ── */}
      <ParallaxSection />

      {/* ── SOCIAL & CTA ── */}
      <section className={styles.socialSection}>
        <div className={styles.container}>
          <h2 className={styles.socialHeadline} data-anim="story-title">Follow the movement.</h2>
          <p className={styles.socialSub} data-anim="story-text">New drops. Behind-the-scenes. Exclusive content.</p>

          <div className={styles.socialLinks}>
            <a href="https://instagram.com/miveron" target="_blank" rel="noopener noreferrer" className={styles.socialLink} data-anim="social-card">
              <div className={styles.socialIconWrap}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.socialIcon}>
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                </svg>
              </div>
              <span className={styles.socialPlatform}>Instagram</span>
              <span className={styles.socialHandle}>@miveron</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.socialArrow}><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </a>

            <a href="https://tiktok.com/@miveron" target="_blank" rel="noopener noreferrer" className={styles.socialLink} data-anim="social-card">
              <div className={styles.socialIconWrap}>
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.37a8.16 8.16 0 004.76 1.51v-3.4a4.85 4.85 0 01-1-.79z"/>
                </svg>
              </div>
              <span className={styles.socialPlatform}>TikTok</span>
              <span className={styles.socialHandle}>@miveron</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.socialArrow}><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </a>

            <a href="https://facebook.com/miveron" target="_blank" rel="noopener noreferrer" className={styles.socialLink} data-anim="social-card">
              <div className={styles.socialIconWrap}>
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </div>
              <span className={styles.socialPlatform}>Facebook</span>
              <span className={styles.socialHandle}>MIVERON</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.socialArrow}><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </a>
          </div>

          <div className={styles.ctaWrap} data-anim="social-card">
            <Link href="/shop" className={styles.ctaBtn}>
              SHOP ALL COLLECTION
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

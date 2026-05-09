"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        id="main-navbar"
      >
        <div className={styles.inner}>
          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="menu-toggle"
          >
            <span />
            <span />
            <span />
          </button>

          {/* Logo */}
          <Link href="/" className={styles.logo} id="brand-logo">
            <span className={styles.logoText}>MIVERON</span>
            <span className={styles.logoSub}>EST. CAIRO / ميڤيرون</span>
          </Link>

          {/* Desktop Nav */}
          <div className={styles.desktopNav}>
            <Link href="/shop" className={styles.navLink}>
              Shop
            </Link>
            <Link href="/collections" className={styles.navLink}>
              Collections
            </Link>
            <Link href="/about" className={styles.navLink}>
              About
            </Link>
          </div>

          {/* Cart */}
          <button
            className={styles.cartBtn}
            onClick={() => setIsOpen(true)}
            id="cart-button"
            aria-label="Open cart"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <div className={styles.mobileMenuInner}>
          <Link
            href="/"
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/collections"
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            Collections
          </Link>
          <Link
            href="/about"
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <div className={styles.mobileDivider} />
          <span className={styles.mobileTagline}>Before everyone else.</span>
        </div>
      </div>

      <CartDrawer />
    </>
  );
}

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="site-footer">
      {/* Marquee */}
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          <span>BEFORE EVERYONE ELSE</span>
          <span className={styles.dot}>●</span>
          <span>DON&apos;T FOLLOW TIME. SET IT.</span>
          <span className={styles.dot}>●</span>
          <span>EST. CAIRO</span>
          <span className={styles.dot}>●</span>
          <span>WORN BY THE ONES AHEAD</span>
          <span className={styles.dot}>●</span>
          <span>قبل الكل</span>
          <span className={styles.dot}>●</span>
          <span>BEFORE EVERYONE ELSE</span>
          <span className={styles.dot}>●</span>
          <span>DON&apos;T FOLLOW TIME. SET IT.</span>
          <span className={styles.dot}>●</span>
          <span>EST. CAIRO</span>
          <span className={styles.dot}>●</span>
          <span>WORN BY THE ONES AHEAD</span>
          <span className={styles.dot}>●</span>
          <span>قبل الكل</span>
          <span className={styles.dot}>●</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <h3 className={styles.brandName}>MIVERON</h3>
            <p className={styles.brandSub}>Luxury Watch Store / متجر ساعات فاخرة</p>
            <p className={styles.brandDesc}>
              Curated premium watches for the ones who move first. / تشكيلة مختارة من الساعات الفاخرة لمن يصنعون الفارق.
            </p>
          </div>

          {/* Shop */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Shop / تسوق</h4>
            <Link href="/shop" className={styles.link}>
              All Watches
            </Link>
            <Link href="/shop?collection=core" className={styles.link}>
              Core
            </Link>
            <Link href="/shop?collection=icon" className={styles.link}>
              Icon
            </Link>
          </div>

          {/* Connect */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Connect / تواصل</h4>
            <Link href="/contact" className={styles.link}>
              Contact Us
            </Link>
            <a href="https://wa.me/201501685539" target="_blank" rel="noopener noreferrer" className={styles.link}>
              WhatsApp
            </a>
            <a href="https://www.instagram.com/its.miveron/" target="_blank" rel="noopener noreferrer" className={styles.link}>
              Instagram
            </a>
            <a href="https://www.facebook.com/share/1BKDLECa7m/" target="_blank" rel="noopener noreferrer" className={styles.link}>
              Facebook
            </a>
            <a href="https://www.tiktok.com/@miveron1" target="_blank" rel="noopener noreferrer" className={styles.link}>
              TikTok
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} MIVERON. All rights reserved.
          </p>
          <div className={styles.socials}>
            <a
              href="https://www.instagram.com/its.miveron/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/share/1BKDLECa7m/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="https://www.tiktok.com/@miveron1"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="TikTok"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

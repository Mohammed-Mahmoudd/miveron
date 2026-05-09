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
          <span>DON'T FOLLOW TIME. SET IT.</span>
          <span className={styles.dot}>●</span>
          <span>EST. CAIRO</span>
          <span className={styles.dot}>●</span>
          <span>WORN BY THE ONES AHEAD</span>
          <span className={styles.dot}>●</span>
          <span>قبل الكل</span>
          <span className={styles.dot}>●</span>
          <span>BEFORE EVERYONE ELSE</span>
          <span className={styles.dot}>●</span>
          <span>DON'T FOLLOW TIME. SET IT.</span>
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
            <p className={styles.brandSub}>Est. Cairo / صنع في القاهرة</p>
            <p className={styles.brandDesc}>
              Premium watches for the ones who move first. / ساعات فاخرة لمن يصنعون الفارق.
            </p>
          </div>

          {/* Shop */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Shop / تسوق</h4>
            <Link href="/shop" className={styles.link}>
              All Watches
            </Link>
            <Link href="/collections" className={styles.link}>
              Collections
            </Link>
            <Link href="/shop?collection=core" className={styles.link}>
              Core
            </Link>
            <Link href="/shop?collection=icon" className={styles.link}>
              Icon
            </Link>
          </div>

          {/* Brand */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Brand / علامتنا</h4>
            <Link href="/contact" className={styles.link}>
              Contact Us
            </Link>
          </div>

          {/* Newsletter */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Stay Ahead / كن أول من يعلم</h4>
            <p className={styles.newsletterText}>
              Be the first to know about drops. / اشترك لتصلك أحدث الإصدارات.
            </p>
            <div className={styles.emailWrap}>
              <input
                type="email"
                placeholder="your@email.com"
                className={styles.emailInput}
                id="footer-email"
              />
              <button className={styles.emailBtn} id="footer-subscribe">
                →
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} MIVERON. All rights reserved.
          </p>
          <div className={styles.socials}>
            <a
              href="https://instagram.com/miveron"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@miveron"
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

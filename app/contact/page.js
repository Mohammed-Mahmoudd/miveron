import styles from "./contact.module.css";

export const metadata = {
  title: "Contact — MIVERON",
  description:
    "Get in touch with MIVERON. We build for creators, builders, and the self-made.",
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.label}>Contact Us</span>
          <h1 className={styles.heroTitle}>
            Reach out.
            <br />
            <span className={styles.accent}>We&apos;re listening.</span>
          </h1>
          <p className={styles.heroSub}>
            Whether you have a question about our collections, need assistance with your order, 
            or want to explore partnerships, we are here for you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2 className={styles.contactInfoTitle}>
                Get in touch
              </h2>
              
              <div className={styles.infoBlock}>
                <div className={styles.infoLabel}>Email</div>
                <div className={styles.infoValue}>
                  <a href="mailto:support@miveron.com" className={styles.infoLink}>
                    support@miveron.com
                  </a>
                </div>
              </div>
              
              <div className={styles.infoBlock}>
                <div className={styles.infoLabel}>Location</div>
                <div className={styles.infoValue}>
                  Cairo, Egypt<br />
                  <span style={{ fontSize: "0.85rem", color: "var(--smoke)" }}>(Online Store Only)</span>
                </div>
              </div>

              <div className={styles.infoBlock}>
                <div className={styles.infoLabel}>Social</div>
                <div className={styles.infoValue}>
                  <a href="https://instagram.com/miveron" target="_blank" rel="noopener noreferrer" className={styles.infoLink} style={{ marginRight: '1rem' }}>
                    Instagram
                  </a>
                  <a href="https://tiktok.com/@miveron" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                    TikTok
                  </a>
                </div>
              </div>
            </div>
            
            <div className={styles.contactForm}>
              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.infoLabel}>Name</label>
                  <input type="text" id="name" className={styles.input} placeholder="Your name" required />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.infoLabel}>Email</label>
                  <input type="email" id="email" className={styles.input} placeholder="your@email.com" required />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.infoLabel}>Message</label>
                  <textarea id="message" className={`${styles.input} ${styles.textarea}`} placeholder="How can we help?" required></textarea>
                </div>
                
                <button type="button" className={styles.submitBtn}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

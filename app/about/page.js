import styles from "./about.module.css";

export const metadata = {
  title: "About — MIVERON",
  description:
    "Est. Cairo. The story behind MIVERON — premium watches for the ones who move first.",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.label}>Our Story</span>
          <h1 className={styles.heroTitle}>
            We didn&apos;t start a brand.
            <br />
            <span className={styles.accent}>We set a signal.</span>
          </h1>
          <p className={styles.heroSub}>
            MIVERON was born in Cairo with one belief: the ones who move first
            deserve something that matches their pace. Not luxury for the sake
            of it — but design with intent.
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className={styles.manifesto}>
        <div className={styles.container}>
          <div className={styles.manifestoGrid}>
            <div className={styles.manifestoLeft}>
              <span className={styles.label}>Manifesto</span>
              <h2 className={styles.manifestoTitle}>
                Don&apos;t follow time. Set it.
              </h2>
            </div>
            <div className={styles.manifestoRight}>
              <p className={styles.manifestoText}>
                We build for creators, builders, and the self-made. The
                generation that grew up online but shows up in person. The ones
                who understand that style isn&apos;t decoration — it&apos;s
                identity.
              </p>
              <p className={styles.manifestoText}>
                Every MIVERON watch is designed to be the finishing piece.
                The detail that says everything without saying a word. Because
                the ones ahead don&apos;t need to explain themselves.
              </p>
              <p className={styles.manifestoArabic}>
                قبل الكل.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.values} id="philosophy">
        <div className={styles.container}>
          <span className={styles.label}>Principles</span>
          <h2 className={styles.valuesTitle}>What drives us</h2>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueNumber}>01</div>
              <h3 className={styles.valueName}>Intentional Design</h3>
              <p className={styles.valueText}>
                Every curve, every marker, every material is chosen. Nothing is
                accidental. We obsess over the details so you don&apos;t have to.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueNumber}>02</div>
              <h3 className={styles.valueName}>Engineered Scarcity</h3>
              <p className={styles.valueText}>
                Limited runs. No restocks. When a piece is gone, it&apos;s gone.
                We&apos;d rather be sold out than overproduced.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueNumber}>03</div>
              <h3 className={styles.valueName}>Cairo Forward</h3>
              <p className={styles.valueText}>
                Designed in Cairo for the world. We carry the energy of the city
                — the hustle, the ambition, the heat. This is Egyptian design on
                a global level.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueNumber}>04</div>
              <h3 className={styles.valueName}>Quality at the Core</h3>
              <p className={styles.valueText}>
                Japanese and Swiss movements. Sapphire crystals. Surgical-grade
                steel. Premium materials at prices that make sense.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timeline}>
        <div className={styles.container}>
          <span className={styles.label}>Journey</span>
          <h2 className={styles.timelineTitle}>The Playbook</h2>

          <div className={styles.timelineStack}>
            <div className={styles.timelineItem}>
              <div className={styles.timelinePhase}>Month 1</div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineName}>Mystery</h3>
                <p className={styles.timelineText}>
                  No product. Just the logo. Build tension. Let them wonder.
                </p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelinePhase}>Month 2</div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineName}>Reveal</h3>
                <p className={styles.timelineText}>
                  First drop. 50 units. Micro-influencers only. The chosen few.
                </p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelinePhase}>Month 3</div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineName}>Sold Out</h3>
                <p className={styles.timelineText}>
                  Show the empty stock. Waitlist opens. Demand exceeds supply.
                </p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelinePhase}>Month 4+</div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineName}>The Word Spreads</h3>
                <p className={styles.timelineText}>
                  They find it. They tell their friends. Organic. Authentic.
                  Unstoppable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

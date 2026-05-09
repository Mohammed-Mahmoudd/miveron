"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PortalSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function PortalSection() {
  const sectionRef = useRef(null);
  const portalRef = useRef(null);
  const textTopRef = useRef(null);
  const textBottomRef = useRef(null);
  const marqueeRef = useRef(null);
  const portalInnerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const portal = portalRef.current;
      const textTop = textTopRef.current;
      const textBottom = textBottomRef.current;
      const marquee = marqueeRef.current;
      const portalInner = portalInnerRef.current;

      if (!section) return;

      // ── PARALLAX TEXT — moves apart as you scroll ──
      gsap.to(textTop, {
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -120,
        ease: "none",
      });

      gsap.to(textBottom, {
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: 120,
        ease: "none",
      });

      // ── PORTAL CIRCLE — scales up as you scroll into it ──
      gsap.fromTo(portal, 
        { scale: 0.3, opacity: 0 },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "center center",
            scrub: 1,
          },
          scale: 1,
          opacity: 1,
          ease: "power2.out",
        }
      );

      // ── INNER PORTAL GLOW — pulses ──
      gsap.fromTo(portalInner,
        { scale: 0.5, opacity: 0 },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 40%",
            end: "center center",
            scrub: 1,
          },
          scale: 1,
          opacity: 1,
          ease: "power2.out",
        }
      );

      // ── MARQUEE — infinite horizontal scroll ──
      if (marquee) {
        const marqueeInner = marquee.querySelector(`.${styles.marqueeTrack}`);
        if (marqueeInner) {
          gsap.to(marqueeInner, {
            x: "-50%",
            duration: 20,
            repeat: -1,
            ease: "none",
          });
        }
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const marqueeText = "DON'T FOLLOW TIME · SET THE STANDARD · MIVERON · BEFORE EVERYONE ELSE · ";

  return (
    <section className={styles.portalSection} ref={sectionRef}>
      {/* Parallax Split Text */}
      <div className={styles.parallaxText}>
        <h2 className={styles.textTop} ref={textTopRef}>DON'T FOLLOW</h2>
        <h2 className={styles.textBottom} ref={textBottomRef}>TIME.</h2>
      </div>

      {/* Portal Circle */}
      <div className={styles.portal} ref={portalRef}>
        <div className={styles.portalInner} ref={portalInnerRef}>
          <span className={styles.portalLabel}>EST. CAIRO</span>
        </div>
        <div className={styles.portalRing}></div>
        <div className={styles.portalRingOuter}></div>
      </div>

      {/* Scrolling Marquee */}
      <div className={styles.marquee} ref={marqueeRef}>
        <div className={styles.marqueeTrack}>
          {[...Array(4)].map((_, i) => (
            <span key={i} className={styles.marqueeItem}>{marqueeText}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

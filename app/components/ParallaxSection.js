"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ParallaxSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection() {
  const sectionRef = useRef(null);
  const textTopRef = useRef(null);
  const textBottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const textTop = textTopRef.current;
      const textBottom = textBottomRef.current;

      if (!section) return;

      // ── PARALLAX TEXT — moves apart as you scroll ──
      gsap.to(textTop, {
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        x: -150, // Move left
        ease: "none",
      });

      gsap.to(textBottom, {
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        x: 150, // Move right
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.parallaxSection} ref={sectionRef}>
      <div className={styles.parallaxTextWrap}>
        <h2 className={styles.parallaxTextOutline} ref={textTopRef}>DON'T FOLLOW</h2>
        <h2 className={styles.parallaxTextSolid} ref={textBottomRef}>TIME.</h2>
      </div>
    </section>
  );
}

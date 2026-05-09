"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeAnimations() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Wait for DOM to settle
    const ctx = gsap.context(() => {

      // ── HERO TEXT ENTRANCE ──
      const heroLabel = document.querySelector("[data-anim='hero-label']");
      const heroHeadline = document.querySelector("[data-anim='hero-headline']");
      const heroSub = document.querySelector("[data-anim='hero-sub']");
      const heroBtn = document.querySelector("[data-anim='hero-btn']");

      if (heroLabel) {
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        heroTl
          .fromTo(heroLabel, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
          .fromTo(heroHeadline, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, "-=0.4")
          .fromTo(heroSub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
          .fromTo(heroBtn, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
      }

      // ── SECTION HEADERS — slide in from left ──
      gsap.utils.toArray("[data-anim='section-header']").forEach((header) => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          x: -40,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // ── COLLECTION CARDS — staggered fade-up ──
      const collectionCards = document.querySelectorAll("[data-anim='collection-card']");
      if (collectionCards.length) {
        gsap.from(collectionCards, {
          scrollTrigger: {
            trigger: collectionCards[0].parentElement,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 60,
          scale: 0.97,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
      }

      // ── PRODUCT CARDS — staggered scale-in ──
      gsap.utils.toArray("[data-anim='products-grid']").forEach((grid) => {
        const cards = grid.children;
        gsap.from(cards, {
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        });
      });

      // ── STORY SECTION — smooth reveal ──
      const storyTitle = document.querySelector("[data-anim='story-title']");
      const storyText = document.querySelector("[data-anim='story-text']");
      if (storyTitle) {
        const storyTl = gsap.timeline({
          scrollTrigger: {
            trigger: storyTitle,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
        storyTl
          .from(storyTitle, { opacity: 0, y: 30, duration: 0.9, ease: "power3.out" })
          .from(storyText, { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" }, "-=0.4");
      }

      // ── SOCIAL CARDS — staggered reveal ──
      const socialCards = document.querySelectorAll("[data-anim='social-card']");
      if (socialCards.length) {
        gsap.fromTo(socialCards, 
          { opacity: 0, y: 40, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: socialCards[0].parentElement,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }

      // ── PARALLAX on Hero Image ──
      const heroImg = document.querySelector("[data-anim='hero-img']");
      if (heroImg) {
        gsap.to(heroImg, {
          scrollTrigger: {
            trigger: heroImg.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          y: 60,
          scale: 1.05,
          ease: "none",
        });
      }

    });

    return () => ctx.revert();
  }, []);

  return null; // This component only runs animations
}

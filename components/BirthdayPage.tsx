"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

gsap.registerPlugin(ScrollTrigger);

// ── Replace with your actual image paths ─────────────────
const PHOTOS = [
  { src: "/images/photo1.jpg", caption: "Эхний өдөр" },
  { src: "/images/photo2.jpg", caption: "Тав дахь сар" },
  { src: "/images/photo3.jpg", caption: "Нэг нас" },
];
const ROTATIONS = [-4, 2.5, -2];
// ─────────────────────────────────────────────────────────

const PARTICLE_OPTS = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    color: { value: ["#C9973A", "#E8704A", "#F4C875", "#ffffff"] },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0, max: 0.5 },
      animation: {
        enable: true,
        speed: 1.5,
        startValue: "random" as const,
        destroy: "none" as const,
        sync: false,
      },
    },
    size: { value: { min: 0.5, max: 2.5 } },
    move: {
      enable: true,
      speed: 0.4,
      direction: "none" as const,
      random: true,
      straight: false,
      outModes: "out" as const,
    },
    number: { value: 120, density: { enable: true, area: 800 } },
  },
  fullScreen: { enable: false },
};

export default function BirthdayPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleLine1 = useRef<HTMLDivElement>(null);
  const titleLine2 = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const [engReady, setEngReady] = useState(false);

  const particlesLoaded = useCallback(async () => {}, []);

  // tsParticles engine init
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngReady(true));
  }, []);

  // Lenis smooth scroll + GSAP animations
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // ── Hero entrance ──────────────────────────────
      gsap
        .timeline({ delay: 0.1 })
        .from(photoWrapRef.current, {
          scale: 0.65,
          opacity: 0,
          duration: 1.1,
          ease: "back.out(1.4)",
        })
        .from(
          badgeRef.current,
          {
            scale: 0,
            rotation: -40,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(2.2)",
          },
          "-=0.25",
        )
        .from(
          subtitleRef.current,
          { y: 15, opacity: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .from(
          titleLine1.current,
          { yPercent: 110, opacity: 0, duration: 0.7, ease: "power3.out" },
          "-=0.25",
        )
        .from(
          titleLine2.current,
          { yPercent: 110, opacity: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5",
        )
        .from(hintRef.current, { opacity: 0, y: 8, duration: 0.45 }, "+=0.35");

      // ── Polaroid scroll reveal ─────────────────────
      gsap.utils.toArray<HTMLElement>(".polaroid-card").forEach((el, i) => {
        gsap.from(el, {
          y: 100,
          opacity: 0,
          rotation: i % 2 === 0 ? -16 : 16,
          duration: 0.9,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      gsap.from(".section-heading", {
        x: -35,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: { trigger: ".section-heading", start: "top 85%" },
      });

      // ── Detail cards stagger ───────────────────────
      gsap.from(".detail-card", {
        y: 38,
        opacity: 0,
        stagger: 0.12,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: detailsRef.current,
          start: "top 82%",
        },
      });

      // ── CTA ───────────────────────────────────────
      gsap.from(ctaRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.94,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 88%" },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#FBF5EE] min-h-screen overflow-x-hidden"
    >
      {/* Grain texture overlay */}
      <div className="grain-overlay" />

      {/* tsParticles — sparkle background */}
      {engReady && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <Particles
            id="bp-particles"
            options={PARTICLE_OPTS}
            particlesLoaded={particlesLoaded}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      {/* ══ HERO ══════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="-mt-20 flex flex-col items-center">
          {/* Child photo + 1 badge */}
          <div ref={photoWrapRef} className="hero-photo-wrap mb-4">
            <div className="hero-photo-ring" />
            <div className="hero-photo-frame">
              <Image
                src="/child.jpeg"
                alt="Ө. Хангай"
                fill
                sizes="220px"
                priority
                style={{ objectFit: "cover", objectPosition: "center 20%" }}
              />
            </div>
            <div
              ref={badgeRef}
              className="hero-badge flex flex-col items-center justify-center pt-1"
            >
              <span className="badge-num text-[1.9rem] -mt-3 leading-none">
                1
              </span>
              <span className="badge-num text-[0.55rem] tracking-[0.2em] font-bold mt-0.5">
                НАС
              </span>
            </div>
          </div>

          <div ref={subtitleRef} className="mb-6 px-4">
            <h1 className="font-(family-name:--font-playfair) text-5xl font-black italic text-[#1C0F00] tracking-tighter pr-2">
              Ө. Хангай
            </h1>
            <div className="w-12 h-0.5 bg-[#E8704A] mx-auto mt-2 opacity-60" />
          </div>

          {/* Title — more refined typography */}
          <div className="flex flex-col gap-0">
            <div className="overflow-hidden">
              <div
                ref={titleLine1}
                className="text-[0.7rem] tracking-[0.4em] uppercase text-[#8B6F5E] font-bold mb-2"
              >
                Нэг насны
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                ref={titleLine2}
                className="hero-line hero-line--coral text-[3.5rem]! sm:text-[4.5rem]!"
              >
                Төрсөн өдөр
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#8B6F5E]">
            Доош гүйлгээрэй
          </span>
          <div className="scroll-hint-line" />
        </div>
      </section>

      {/* ══ PHOTOS ════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center py-20">
        <h2 className="section-heading font-(family-name:--font-playfair) text-2xl italic text-[#1C0F00] text-center mb-10 px-6">
          — Нэг жилийн аялал —
        </h2>

        <div className="photos-scroll">
          {PHOTOS.map(({ src, caption }, i) => (
            <figure
              key={caption}
              className="polaroid-card"
              style={{ "--rot": `${ROTATIONS[i]}deg` } as React.CSSProperties}
            >
              <div className="tape" />
              <div className="photo-frame">
                <Image
                  src={src}
                  alt={caption}
                  fill
                  sizes="260px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="polaroid-caption !text-[0.75rem] !mt-4">
                {caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Second scroll hint */}
        <div className="mt-12 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#8B6F5E]">
            Доош гүйлгээрэй
          </span>
          <div className="scroll-hint-line" />
        </div>
      </section>

      {/* ══ DETAILS ═══════════════════════════════════ */}
      <section
        ref={detailsRef}
        className="relative z-10 py-4 px-6 max-w-sm mx-auto"
      >
        <div className="detail-grid">
          {/* Date */}
          <div className="detail-card">
            <p className="detail-label">Хэзээ</p>
            <div className="detail-divider" />
            <p className="detail-val">05.02</p>
            <p className="detail-sub">Бямба</p>
          </div>

          {/* Time */}
          <div className="detail-card">
            <p className="detail-label">Хэдэн цагт</p>
            <div className="detail-divider" />
            <p className="detail-val">12:00 цагт</p>
            <p className="detail-sub">Эхлэх болно</p>
          </div>

          {/* Location */}
          <div className="detail-card detail-card--full">
            <p className="detail-label">Байршил</p>
            <div className="detail-divider" />
            <p className="detail-val text-balance">
              Зайсан, Хан голомт резиденс
            </p>
            <p className="detail-sub not-italic font-medium mt-2">
              Club House, 1-р давхар
            </p>
            <a
              href="https://www.google.com/maps/search/Khan+Golomt+Residence+Zaisan+Ulaanbaatar"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 text-[#C9973A] text-[0.65rem] font-bold tracking-widest uppercase border border-[rgba(201,151,58,0.2)] px-4 py-2 rounded-full transition-colors hover:bg-[rgba(201,151,58,0.05)] active:scale-95"
            >
              <span>📍 Google Map харах</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className="relative z-10 px-5 pb-24 flex justify-center"
      >
        <div className="cta-card">
          <div className="cta-inner">
            <p className="font-(family-name:--font-playfair) text-xl italic text-[#1C0F00] mb-2">
              Та бүхнийг тэсэн ядан хүлээж байна! 🥳
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

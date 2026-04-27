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
  { src: "/image1.jpeg", caption: "" },
  { src: "/image2.jpeg", caption: "" },
  { src: "/image3.jpeg", caption: "" },
];
const ROTATIONS = [-4, 2.5, -2];
// ─────────────────────────────────────────────────────────

const PARTICLE_OPTS = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    color: { value: ["#3B82F6", "#F472B6", "#FDE047", "#ffffff"] },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.1, max: 0.8 },
      animation: {
        enable: true,
        speed: 3,
        startValue: "random" as const,
        destroy: "none" as const,
        sync: false,
      },
    },
    size: { value: { min: 1, max: 4 } },
    move: {
      enable: true,
      speed: 0.8,
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
  const titleLine1 = useRef<HTMLDivElement>(null);
  const titleLine2 = useRef<HTMLDivElement>(null);
  const heroDateRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
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
    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.2, // Утаснаас гүйлгэхэд илүү хөнгөн болгоно
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    // gsap.ticker.lagSmoothing(0); // Заримдаа гацалт үүсгэдэг тул хасав

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
          titleLine2.current,
          { yPercent: 110, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.3",
        )
        .from(
          heroDateRef.current,
          { y: 10, opacity: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3",
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
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden">
      {/* Mesh Background Blobs (Гэрэлтсэн туяанууд) */}
      <div className="mesh-bg">
        <div className="mesh-blob blob-1" />
        <div className="mesh-blob blob-2" />
        <div className="mesh-blob blob-3" />
      </div>

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
            <h1 className="font-(family-name:--font-playfair) text-5xl font-black italic text-[#0F172A] tracking-tighter pr-2">
              Ө. Хангай
            </h1>
            <div className="w-16 h-1.5 bg-linear-to-r from-[#3B82F6] via-[#F472B6] to-[#FDE047] mx-auto mt-3 rounded-full shadow-lg" />
          </div>

          {/* Title — more refined typography */}
          <div className="flex flex-col gap-0">
            <div className="overflow-hidden">
              <div
                ref={titleLine1}
                className="text-[0.75rem] tracking-[0.5em] uppercase text-[#1E293B] font-black mb-3"
              >
                Нэг насны баяр
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                ref={titleLine2}
                className="hero-line hero-line--coral text-[2.8rem]! sm:text-[4rem]! drop-shadow-sm leading-tight px-4"
              >
                Миний төрсөн өдөр
              </div>
            </div>
            <div
              ref={heroDateRef}
              className="text-[0.9rem] font-bold text-[#1E293B] mt-2 tracking-widest opacity-80"
            >
              5 САРЫН 2
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
          — Миний нэг жилийн аялал —
        </h2>

        <div className="photos-scroll" data-lenis-prevent>
          {PHOTOS.map(({ src, caption }, i) => (
            <figure
              key={src}
              className="polaroid-card"
              style={{ "--rot": `${ROTATIONS[i]}deg` } as React.CSSProperties}
            >
              <div className="tape" />
              <div className="photo-frame">
                <Image
                  src={src}
                  alt={caption}
                  fill
                  sizes="320px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="polaroid-caption text-[0.75rem]! mt-4!">
                {caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Second scroll hint */}
        <div className="mt-12 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#64748B]">
            Доош гүйлгээрэй
          </span>
          <div className="scroll-hint-line" />
        </div>
      </section>

      {/* ══ DETAILS ═══════════════════════════════════ */}
      <section
        ref={detailsRef}
        className="relative z-10 py-20 px-6 max-w-sm mx-auto"
      >
        <div className="detail-grid">
          {/* Date */}
          <div className="detail-card">
            <p className="detail-label">Хэзээ</p>
            <div className="detail-divider" />
            <p className="detail-val">5 сарын 2</p>
            <p className="detail-sub text-[0.65rem] text-[#64748B] italic">
              Бямба
            </p>
          </div>

          {/* Time */}
          <div className="detail-card">
            <p className="detail-label">Хэдэн цагт</p>
            <div className="detail-divider" />
            <p className="detail-val">12:00</p>
            <p className="detail-sub text-[0.65rem] text-[#64748B] italic">
              Үдийн зоог
            </p>
          </div>

          {/* Location */}
          <div className="detail-card detail-card--full">
            <p className="detail-label">Байршил</p>
            <div className="detail-divider" />
            <p className="detail-val text-balance text-[1rem]">
              Зайсан, Хан голомт резиденс
            </p>
            <p className="detail-sub not-italic font-medium mt-1 text-[#64748B] text-[0.75rem]">
              Club House, 1-р давхар
            </p>
            <a
              href="https://www.google.com/maps/search/Khan+Golomt+Residence+Zaisan+Ulaanbaatar"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 text-[#3B82F6] text-[0.65rem] font-bold tracking-widest uppercase border border-[rgba(59,130,246,0.15)] px-4 py-2 rounded-full transition-colors hover:bg-[rgba(59,130,246,0.05)] active:scale-95 mx-auto w-fit"
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
            <p className="font-(family-name:--font-playfair) text-xl italic text-[#0F172A] mb-2">
              Та бүхнийг тэсэн ядан хүлээж байна! 🥳
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

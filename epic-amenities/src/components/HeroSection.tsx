'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { VendingMachineCanvas } from "@/components/three/VendingMachine";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const targets = contentRef.current?.querySelectorAll("[data-animate='fade-up']") ?? [];
      tl.fromTo(
        targets,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        },
      );

      const glowElement = heroRef.current?.querySelector(".hero-glow");
      if (glowElement) {
        tl.fromTo(
          glowElement,
          { opacity: 0 },
          { opacity: 0.65, duration: 1.2, ease: "power2.out" },
          "<",
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative isolate flex min-h-[90vh] flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      <div className="absolute inset-0 hero-glow">
        <div className="gradient-bg absolute inset-0 opacity-60 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 lg:flex-row lg:items-center lg:gap-20 lg:px-10">
        <div ref={contentRef} className="flex-1 space-y-6 text-balance">
          <p
            data-animate="fade-up"
            className="text-xs font-semibold uppercase tracking-[0.45em] text-white/60"
          >
            Premium vending ecosystems
          </p>
          <h1
            data-animate="fade-up"
            className="text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            Epic Amenities orchestrates automated luxury with human-centered AI.
          </h1>
          <p
            data-animate="fade-up"
            className="max-w-xl text-base text-white/60 md:text-lg"
          >
            Deploy immersive, data-fueled vending arenas that mirror your brand, anticipate demand, and deliver concierge-grade experiences—anywhere, any hour.
          </p>
          <div
            data-animate="fade-up"
            className="flex flex-wrap items-center gap-4 text-sm text-white/80"
          >
            <div className="rounded-full border border-white/20 bg-white/5 px-4 py-2">
              AI inventory prediction & biometric orchestration
            </div>
            <div className="rounded-full border border-white/20 bg-white/5 px-4 py-2">
              24/7 concierge service ops
            </div>
          </div>
          <div
            data-animate="fade-up"
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:translate-y-[-2px]"
              data-cursor="interactive"
            >
              Book a private immersion
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                →
              </span>
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
            >
              Explore machine intelligence
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </div>
        </div>

        <div
          data-animate="fade-up"
          className="relative flex-1"
        >
          <div className="pointer-events-none absolute -left-10 -top-12 h-40 w-40 animate-spin-slow rounded-full border border-primary/30" />
          <div className="pointer-events-none absolute -bottom-14 -right-16 h-52 w-52 animate-spin-slow rounded-full border border-secondary/20" />
          <div className="relative rounded-[36px] border border-white/10 bg-white/5 p-4 shadow-panel backdrop-blur">
            <VendingMachineCanvas baseColor="#2563eb" accent="#f59e0b" autoRotate height={520} />
            <div className="absolute inset-x-8 bottom-8 flex items-center justify-between rounded-full bg-black/60 px-6 py-3 text-xs uppercase tracking-[0.35em] text-white/60 backdrop-blur">
              <span>Epic Amenities 3D Showcase</span>
              <span>Real-Time Telemetry</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

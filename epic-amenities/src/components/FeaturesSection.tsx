'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURE_CARDS = [
  {
    title: "Predictive Intelligence Core",
    description:
      "Edge AI forecasts demand by location, weather, and event cadence to auto-adjust inventory, pricing, and dynamic promotions.",
    icon: (
      <svg
        className="h-12 w-12 text-primary"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M24 6v12M24 30v12M36 18l8 6-8 6M12 18l-8 6 8 6" />
        <circle cx="24" cy="24" r="6" />
      </svg>
    ),
    metrics: ["98.5% planogram accuracy", "5k+ data points per hour"],
  },
  {
    title: "Sentry Access Framework",
    description:
      "Biometric identity, proximity sensing, and policy enforcement deliver secure, touchless access with complete audit trails.",
    icon: (
      <svg
        className="h-12 w-12 text-secondary"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M24 6c-6.627 0-12 4.925-12 11v5c0 9 6 15 12 20 6-5 12-11 12-20v-5c0-6.075-5.373-11-12-11Z" />
        <circle cx="24" cy="23" r="5" />
      </svg>
    ),
    metrics: ["< 1s authentication", "Zero-touch compliance logging"],
  },
  {
    title: "Experiential Lighting Suite",
    description:
      "Dynamic lighting, haptics, and spatial audio choreograph micro-moments that guide engagement and reinforce brand identity.",
    icon: (
      <svg
        className="h-12 w-12 text-accent"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="m12 24 12 12 12-12-12-12-12 12Z" />
        <path d="M24 12v-6M12 24H6M24 42v6M42 24h-6" />
      </svg>
    ),
    metrics: ["37% avg engagement lift", "121 curated ambient scenes"],
  },
  {
    title: "Service Intelligence Center",
    description:
      "Real-time monitoring orchestrates predictive maintenance, technician routing, and SLA automation for 24/7 uptime.",
    icon: (
      <svg
        className="h-12 w-12 text-white"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <circle cx="24" cy="24" r="15" />
        <path d="M24 18v9l6 3" />
        <path d="M10 8 8 10" />
      </svg>
    ),
    metrics: ["99.7% uptime guarantee", "22 min mean-time-to-repair"],
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-feature-card]");
      gsap.set(cards, { y: 64, opacity: 0 });
      ScrollTrigger.batch(cards, {
        start: "top 80%",
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative mx-auto mt-12 flex max-w-7xl flex-col gap-12 px-6 py-24 lg:px-10"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl space-y-4 text-balance">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Smart technology
          </p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Purpose-built architecture engineered for precision, emotion, and scale.
          </h2>
          <p className="text-base text-white/60 md:text-lg">
            Epic Amenities fuses predictive AI, biometric security, and sensory design to deliver brand-perfect experiences with measurable impact.
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-primary/20 bg-primary/10 px-6 py-4 text-sm text-primary">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-lg font-bold">
            24/7
          </span>
          <p className="max-w-xs text-xs uppercase tracking-[0.35em] text-primary/70">
            Concierge network with live telemetry & predictive service routing
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {FEATURE_CARDS.map((feature) => (
          <article
            key={feature.title}
            data-feature-card
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:border-primary/40 hover:bg-white/[0.08] hover:shadow-panel"
          >
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-secondary/25 blur-3xl" />
            </div>
            <div className="relative space-y-4">
              {feature.icon}
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-white/65">
                {feature.description}
              </p>
              <ul className="space-y-2 text-xs text-white/50">
                {feature.metrics.map((metric) => (
                  <li key={metric} className="flex items-center gap-2">
                    <span className="inline-flex h-1 w-4 rounded-full bg-accent/70" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

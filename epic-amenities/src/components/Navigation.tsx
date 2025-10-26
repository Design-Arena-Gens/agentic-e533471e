'use client';

import { useEffect, useState } from "react";
import classNames from "classnames";

const SECTIONS = [
  { id: "hero", label: "Vision" },
  { id: "features", label: "Intelligence" },
  { id: "products", label: "Machines" },
  { id: "solutions", label: "Industries" },
  { id: "testimonials", label: "Proof" },
  { id: "about", label: "About" },
  { id: "contact", label: "Connect" },
];

export function Navigation() {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(id);
            }
          });
        },
        { threshold: 0.45 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -88;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[color:rgba(4,5,16,0.82)] backdrop-blur-md border-b border-white/5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/25 text-2xl font-semibold text-primary shadow-glow">
            EA
          </span>
          <div className="leading-tight">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              Epic Amenities
            </p>
            <p className="text-lg font-semibold text-white">
              Automated Luxury, Delivered
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white shadow-panel md:flex">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={classNames(
                "rounded-full px-4 py-2 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                active === id
                  ? "bg-gradient-to-r from-primary/80 to-secondary/80 text-white shadow-glow"
                  : "text-white/70 hover:text-white hover:bg-white/10",
              )}
              aria-label={`Jump to ${label} section`}
            >
              {label}
            </button>
          ))}
        </div>
        <a
          href="#contact"
          className="hidden rounded-full bg-accent px-5 py-2 text-sm font-semibold text-slate-900 transition hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:inline-flex"
        >
          Schedule Immersion
        </a>
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-white/25 hover:bg-white/10 md:hidden"
          onClick={() => scrollTo("contact")}
          aria-label="Jump to contact section"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </button>
      </nav>
    </header>
  );
}

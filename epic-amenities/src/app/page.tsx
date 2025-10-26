'use client';

import { useState } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { LoaderOverlay } from "@/components/LoaderOverlay";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { IndustrySolutions } from "@/components/IndustrySolutions";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <LoaderOverlay onLoaded={() => setIsLoaded(true)} />}
      <CustomCursor />
      <Navigation />
      <div className="noise-overlay fade-mask" aria-hidden />
      <main className="relative flex min-h-screen flex-col gap-16">
        <HeroSection />
        <FeaturesSection />
        <ProductShowcase />
        <IndustrySolutions />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <footer className="relative border-t border-white/10 bg-black/50 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 text-sm text-white/60 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">
              Epic Amenities
            </p>
            <p className="mt-2 text-base text-white/70">
              Automated luxury vending ecosystems engineered for impact.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#hero"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/55 transition hover:border-white/30 hover:text-white/80"
            >
              Back to top
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </a>
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Epic Amenities. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

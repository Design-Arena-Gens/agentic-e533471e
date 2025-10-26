'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-testimonial-card]");
      gsap.set(cards, { y: 80, opacity: 0 });
      ScrollTrigger.batch(cards, {
        start: "top 80%",
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 py-24 lg:px-10"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Verified partnerships
          </p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Operational proof from industry leaders relying on Epic Amenities.
          </h2>
          <p className="text-sm text-white/60 md:text-base">
            Transparent metrics, audited results, and human stories from six sectors proving automation can feel luxurious.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-xs uppercase tracking-[0.35em] text-white/45">
          Avg rating 4.62 · 100% contracts renewed
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.company}
            data-testimonial-card
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 transition hover:border-primary/40 hover:shadow-panel"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-60">
              <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
              <div className="absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-secondary/25 blur-3xl" />
            </div>
            <div className="relative flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/15">
                <Image
                  src={testimonial.author.headshot}
                  alt={`${testimonial.author.name} headshot`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {testimonial.author.name}
                </p>
                <p className="text-xs text-white/60">
                  {testimonial.author.title}
                </p>
              </div>
              <div className="ml-auto rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/45">
                {testimonial.duration}
              </div>
            </div>
            <div className="relative mt-6 flex-1 space-y-4 text-sm text-white/70">
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                {testimonial.company} · {testimonial.industry}
              </p>
              <p className="text-balance leading-relaxed">
                “{testimonial.quote}”
              </p>
              <div className="space-y-2 text-xs uppercase tracking-[0.35em] text-white/45">
                {testimonial.outcome.map((point) => (
                  <p key={point} className="flex items-center gap-2">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{point}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1 text-sm text-white/70">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={index + 1 <= Math.floor(testimonial.rating) ? "#f59e0b" : "none"}
                  stroke="#f59e0b"
                  strokeWidth="1.4"
                >
                  <polygon points="12 3.6 14.9 9.26 21.2 10.09 16.6 14.48 17.9 20.7 12 17.64 6.1 20.7 7.4 14.48 2.8 10.09 9.1 9.26 12 3.6" />
                </svg>
              ))}
              <span className="ml-2 text-xs uppercase tracking-[0.35em] text-white/45">
                {testimonial.rating.toFixed(1)} / 5
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

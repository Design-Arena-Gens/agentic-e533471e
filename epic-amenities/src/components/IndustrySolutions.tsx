'use client';

import { useMemo, useState } from "react";
import classNames from "classnames";
import { solutions } from "@/data/content";

export function IndustrySolutions() {
  const [activeIndustry, setActiveIndustry] = useState(solutions[0].id);

  const activeSolution = useMemo(
    () => solutions.find((solution) => solution.id === activeIndustry) ?? solutions[0],
    [activeIndustry],
  );

  return (
    <section
      id="solutions"
      className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 py-24 lg:px-10"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl space-y-3 text-balance">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Industry programs
          </p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Architected for every environment—from boardroom towers to transit corridors.
          </h2>
          <p className="text-sm text-white/60 md:text-base">
            Each Epic Amenities deployment fuses proprietary hardware, AI telemetry, and hospitality-grade service playbooks tuned to your vertical.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-xs uppercase tracking-[0.35em] text-white/40">
          Swipe or scroll to explore sector blueprints
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-[560px] flex-wrap gap-3 lg:flex-col lg:min-w-0">
            {solutions.map((solution) => {
              const isActive = activeIndustry === solution.id;
              return (
                <button
                  key={solution.id}
                  onClick={() => setActiveIndustry(solution.id)}
                  className={classNames(
                    "flex flex-col gap-2 rounded-3xl border px-5 py-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                    isActive
                      ? "border-primary/50 bg-primary/15 text-white shadow-panel"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/25 hover:text-white",
                  )}
                >
                  <span className="text-xs uppercase tracking-[0.35em]">
                    {solution.id}
                  </span>
                  <span className="text-lg font-semibold">
                    {solution.title}
                  </span>
                  <span className="text-xs text-white/45">
                    {solution.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-panel">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/25 blur-[120px]" />
            <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-secondary/20 blur-[120px]" />
          </div>
          <div className="relative space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                  {activeSolution.id}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                  {activeSolution.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm text-white/65 md:text-base">
                  {activeSolution.narrative}
                </p>
              </div>
              <div className="flex gap-3 text-xs uppercase tracking-[0.3em] text-white/45">
                {activeSolution.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center"
                  >
                    <p className="text-lg font-semibold text-white">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-[11px] text-white/45">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                Activation pillars
              </p>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {activeSolution.focus.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

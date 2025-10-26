'use client';

import { useMemo, useState } from "react";
import classNames from "classnames";
import { FEATURE_TAG_ORDER, INDUSTRY_TAG_ORDER } from "@/components/constants";
import { products, type ProductFeatureTag, type IndustryTag } from "@/data/content";
import { VendingMachineCanvas, InspectMachineCanvas } from "@/components/three/VendingMachine";
import { Modal } from "@/components/Modal";

type ProductType = (typeof products)[number]["type"] | "All";

export function ProductShowcase() {
  const [typeFilter, setTypeFilter] = useState<ProductType>("All");
  const [featureFilters, setFeatureFilters] = useState<ProductFeatureTag[]>([]);
  const [industryFilters, setIndustryFilters] = useState<IndustryTag[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) ?? null,
    [selectedProductId],
  );

  const featureOptions = useMemo(
    () =>
      FEATURE_TAG_ORDER.filter((feature) =>
        products.some((product) => product.features.includes(feature)),
      ),
    [],
  );

  const industryOptions = useMemo(
    () =>
      INDUSTRY_TAG_ORDER.filter((industry) =>
        products.some((product) => product.industries.includes(industry)),
      ),
    [],
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const typeMatches = typeFilter === "All" || product.type === typeFilter;
      const featureMatches =
        featureFilters.length === 0 ||
        featureFilters.every((feature) => product.features.includes(feature));
      const industryMatches =
        industryFilters.length === 0 ||
        industryFilters.some((industry) => product.industries.includes(industry));
      return typeMatches && featureMatches && industryMatches;
    });
  }, [featureFilters, industryFilters, typeFilter]);

  const toggleFilter = <T,>(value: T, current: T[], setter: (value: T[]) => void) => {
    setter(
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  return (
    <section
      id="products"
      className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 py-24 lg:px-10"
    >
      <div className="flex flex-col gap-6 text-balance md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Product intelligence
          </p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Select your signature Epic Amenities ecosystem.
          </h2>
          <p className="text-sm text-white/60 md:text-base">
            Filter by product architecture, feature stack, and deployment verticals to prototype your automated luxury footprint.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/70">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3">
            {filteredProducts.length} curated solutions
          </div>
          <button
            className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/50 transition hover:border-white/40 hover:text-white/80"
            onClick={() => {
              setTypeFilter("All");
              setFeatureFilters([]);
              setIndustryFilters([]);
            }}
          >
            Reset filters
          </button>
        </div>
      </div>

      <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-panel lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/50">
              Product type
            </h3>
            <div className="flex flex-wrap gap-3">
              {["All", "Refreshment", "Hybrid", "Wellness", "Specialty"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type as ProductType)}
                  className={classNames(
                    "rounded-full border px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                    typeFilter === type
                      ? "border-white/60 bg-white/20 text-white shadow-inner"
                      : "border-white/10 bg-white/5 text-white/65 hover:border-white/25 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/50">
              Feature stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {featureOptions.map((feature) => {
                const active = featureFilters.includes(feature);
                return (
                  <button
                    key={feature}
                    onClick={() => toggleFilter(feature, featureFilters, setFeatureFilters)}
                    className={classNames(
                      "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.25em] transition",
                      active
                        ? "border-accent/60 bg-accent/20 text-accent"
                        : "border-white/10 bg-white/5 text-white/55 hover:border-white/30 hover:text-white/80",
                    )}
                  >
                    {feature}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/50">
              Industry alignment
            </h3>
            <div className="flex flex-wrap gap-2">
              {industryOptions.map((industry) => {
                const active = industryFilters.includes(industry);
                return (
                  <button
                    key={industry}
                    onClick={() => toggleFilter(industry, industryFilters, setIndustryFilters)}
                    className={classNames(
                      "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.25em] transition",
                      active
                        ? "border-secondary/60 bg-secondary/20 text-secondary"
                        : "border-white/10 bg-white/5 text-white/55 hover:border-white/30 hover:text-white/80",
                    )}
                  >
                    {industry}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] transition hover:border-primary/40 hover:shadow-panel"
            >
              <div className="relative isolate overflow-hidden bg-[#050819]">
                <div
                  className="absolute inset-0 opacity-50 blur-2xl transition group-hover:opacity-80"
                  style={{
                    background: `radial-gradient(circle at top, ${product.heroColor}44, transparent 70%)`,
                  }}
                />
                <div className="relative mx-auto w-full px-5 pt-8">
                  <VendingMachineCanvas
                    baseColor={product.heroColor}
                    accent={product.accentColor}
                    height={340}
                  />
                </div>
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/60">
                  {product.modelCode}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">
                    {product.name}
                  </h3>
                  <p className="text-sm text-white/60">
                    {product.headline}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs text-white/60">
                  {product.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-lg font-semibold text-white">
                        {stat.value}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40">
                  {product.features.slice(0, 4).map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <button
                    onClick={() => setSelectedProductId(product.id)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                    data-cursor="interactive"
                  >
                    View details
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-1 text-xs text-white/70">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={index + 1 <= Math.floor(product.rating) ? "#f59e0b" : "none"}
                        stroke="#f59e0b"
                        strokeWidth="1.4"
                      >
                        <polygon points="12 3.6 14.9 9.26 21.2 10.09 16.6 14.48 17.9 20.7 12 17.64 6.1 20.7 7.4 14.48 2.8 10.09 9.1 9.26 12 3.6" />
                      </svg>
                    ))}
                    <span className="ml-1 text-white/50">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Modal
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProductId(null)}
        title={selectedProduct?.name ?? "Product details"}
      >
        {selectedProduct && (
          <>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {selectedProduct.modelCode} · {selectedProduct.type}
                </p>
                <h3 className="text-3xl font-semibold text-white">
                  {selectedProduct.name}
                </h3>
                <p className="text-sm text-white/60">
                  {selectedProduct.description}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {selectedProduct.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="text-xl font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">
                  Feature architecture
                </h4>
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-white/55">
                  {selectedProduct.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">
                  Optimized industries
                </h4>
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-white/55">
                  {selectedProduct.industries.map((industry) => (
                    <span
                      key={industry}
                      className="rounded-full border border-secondary/40 bg-secondary/15 px-3 py-1 text-secondary"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <InspectMachineCanvas
                baseColor={selectedProduct.heroColor}
                accent={selectedProduct.accentColor}
                height={420}
              />
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs uppercase tracking-[0.3em] text-white/45">
                <div className="flex flex-col gap-2">
                  <span>Rotate the model to explore thermal zones, sensor clusters, and lighting choreography.</span>
                  <span>Full spec sheet delivered after immersion session.</span>
                </div>
              </div>
              <button
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:translate-y-[-1px]"
                onClick={() => {
                  setSelectedProductId(null);
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                Continue to tailored proposal
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}

'use client';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative mx-auto mt-8 flex max-w-7xl flex-col gap-12 px-6 py-24 lg:px-10"
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            About Epic Amenities
          </p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            A hospitality-first engineering studio reimagining vending as an experiential amenity.
          </h2>
          <p className="text-sm text-white/65 md:text-base">
            Born out of luxury retail and aviation operations, Epic Amenities designs, manufactures, and operates intelligent vending ecosystems for elite campuses, transit hubs, and wellness destinations. We oversee the entire lifecycle—from hardware innovation and AI telemetry to merchandising, servicing, and guest experience strategy.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "Portfolio uptime",
                value: "99.7%",
                note: "monitored in real time by service intelligence center",
              },
              {
                label: "Curated SKUs",
                value: "4,800+",
                note: "with local supplier marketplace and sustainability scoring",
              },
              {
                label: "Cities deployed",
                value: "38",
                note: "spanning North America, Europe, and the Middle East",
              },
              {
                label: "Average ROI",
                value: "14.6 months",
                note: "from contract signing to capital payback",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                  {item.label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {item.value}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.28em] text-white/35">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-10">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-primary/20 blur-[120px]" />
            <div className="absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-secondary/20 blur-[140px]" />
          </div>
          <div className="relative space-y-6">
            <h3 className="text-2xl font-semibold text-white">
              Our playbook
            </h3>
            <ol className="space-y-5 text-sm text-white/70">
              <li className="flex gap-4">
                <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  01
                </span>
                <div>
                  <p className="font-semibold text-white">
                    Immersion labs & data modeling
                  </p>
                  <p className="mt-2 text-sm text-white/65">
                    We map patron journeys, demand curves, and brand sensibilities to craft product architecture, assortment logic, and environmental choreography unique to your environment.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  02
                </span>
                <div>
                  <p className="font-semibold text-white">
                    Deployment & service intelligence
                  </p>
                  <p className="mt-2 text-sm text-white/65">
                    Cross-functional launch pods handle fabrication, installation, and integration. Our telemetry network monitors every interaction with predictive maintenance routing.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  03
                </span>
                <div>
                  <p className="font-semibold text-white">
                    Continuous optimization & storytelling
                  </p>
                  <p className="mt-2 text-sm text-white/65">
                    We orchestrate merchandising refreshes, seasonal storytelling, and data-backed performance reviews to keep every kiosk aligned with your evolving brand goals.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

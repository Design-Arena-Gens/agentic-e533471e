'use client';

import { useEffect, useState } from "react";
import classNames from "classnames";
import { INDUSTRY_TAG_ORDER } from "@/components/constants";

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  industry: string;
  message: string;
  consent: boolean;
}

type FormStatus =
  | { state: "idle" }
  | { state: "error"; message: string }
  | { state: "success"; message: string };

const initialState: ContactFormState = {
  name: "",
  email: "",
  company: "",
  industry: "",
  message: "",
  consent: true,
};

export function ContactSection() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status.state === "idle") return;
    const timeout = setTimeout(() => setStatus({ state: "idle" }), 5000);
    return () => clearTimeout(timeout);
  }, [status]);

  const validate = () => {
    if (!form.name.trim()) {
      return "Please share the name of your program lead.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "We need a valid email to deliver your immersion blueprint.";
    }
    if (!form.company.trim()) {
      return "Let us know which organization we’re elevating.";
    }
    if (!form.industry) {
      return "Select the industry lens so we can assign the right strategist.";
    }
    if (form.message.trim().length < 40) {
      return "Share at least two sentences so our team can prepare meaningful insights.";
    }
    if (!form.consent) {
      return "Please confirm you’re ready for Epic Amenities to connect.";
    }
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const error = validate();
    if (error) {
      setStatus({ state: "error", message: error });
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitting(false);
    setStatus({
      state: "success",
      message: "Immersion request received. A strategist will connect within one business day.",
    });
    setForm(initialState);
  };

  return (
    <section
      id="contact"
      className="relative mx-auto mt-8 flex max-w-7xl flex-col gap-12 px-6 py-24 lg:px-10"
    >
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Contact
          </p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Schedule an Epic Amenities immersion session.
          </h2>
          <p className="text-sm text-white/65 md:text-base">
            We’ll align your brand, guest journey, and operational KPIs with an Epic Amenities blueprint. Expect a curated 45-minute workshop with hardware, merchandising, and telemetry leads.
          </p>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.05] p-6">
            <h3 className="text-sm font-semibold text-white">
              What to expect
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              {[
                "Immersive hardware walk-through tailored to your environment",
                "AI merchandising insights based on your audience and dayparts",
                "Deployment roadmap spanning design, fabrication, and service ops",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-1.5 w-3 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative space-y-6 rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-panel"
          noValidate
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -right-16 top-0 h-64 w-64 rounded-full bg-secondary/15 blur-[120px]" />
            <div className="absolute -left-10 bottom-0 h-72 w-72 rounded-full bg-primary/15 blur-[120px]" />
          </div>
          <div className="relative space-y-5">
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Full name<span className="text-accent"> *</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Who will lead this partnership?"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Email<span className="text-accent"> *</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Organization<span className="text-accent"> *</span>
              </label>
              <input
                type="text"
                value={form.company}
                onChange={(event) => setForm({ ...form, company: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Company or property name"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Industry focus<span className="text-accent"> *</span>
              </label>
              <select
                value={form.industry}
                onChange={(event) => setForm({ ...form, industry: event.target.value })}
                className="mt-2 w-full appearance-none rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white focus:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary/40"
              >
                <option value="">Select your landscape</option>
                {INDUSTRY_TAG_ORDER.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Vision & objectives<span className="text-accent"> *</span>
              </label>
              <textarea
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white focus:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary/40"
                placeholder="Share current amenities, guest expectations, and success metrics."
              />
              <p className="mt-2 text-xs text-white/40">
                {form.message.trim().length} / 800 characters
              </p>
            </div>

            <label className="flex items-start gap-3 text-xs text-white/50">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => setForm({ ...form, consent: event.target.checked })}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-black/30 accent-primary"
              />
              <span>
                I agree to Epic Amenities contacting me with curated insights, case studies, and deployment planning resources.
              </span>
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className={classNames(
                "inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px]",
                isSubmitting && "opacity-70",
              )}
            >
              {isSubmitting ? "Transmitting..." : "Send immersion request"}
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

            <div
              role="status"
              aria-live="assertive"
              className={classNames(
                "overflow-hidden rounded-2xl border px-4 py-3 text-xs uppercase tracking-[0.3em] transition",
                status.state === "idle" && "opacity-0",
                status.state === "error" && "border-red-500/40 bg-red-500/10 text-red-300",
                status.state === "success" && "border-primary/40 bg-primary/20 text-primary/95",
              )}
            >
              {status.state === "error" && status.message}
              {status.state === "success" && status.message}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

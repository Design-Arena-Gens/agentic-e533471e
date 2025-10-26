'use client';

import type { ReactNode } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "md" | "lg";
}

export function Modal({ open, onClose, title, children, size = "lg" }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={classNames(
          "relative m-4 w-full overflow-hidden rounded-3xl border border-white/10 bg-[#070b1b] text-white shadow-panel",
          size === "lg" ? "max-w-5xl" : "max-w-3xl",
        )}
      >
        <button
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:rotate-90 hover:border-white/30 hover:bg-white/20"
        >
          <span className="sr-only">Close</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
        <div className="grid gap-10 p-8 lg:grid-cols-[1.1fr_0.9fr]">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

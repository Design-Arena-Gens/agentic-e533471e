'use client';

import { useEffect, useState } from "react";
import gsap from "gsap";

interface LoaderOverlayProps {
  onLoaded?: () => void;
}

export function LoaderOverlay({ onLoaded }: LoaderOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to({}, {
          duration: 0.25,
          onComplete: () => {
            setVisible(false);
            onLoaded?.();
          },
        });
      },
    });

    tl.to({}, {
      duration: 2.4,
      ease: "power2.out",
      onUpdate: () => {
        const value = Math.round((tl.progress() ?? 0) * 100);
        setProgress(value);
      },
    });

    return () => {
      tl.kill();
    };
  }, [onLoaded]);

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      role="status"
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center overflow-hidden bg-[#040510] text-white"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.35),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(124,58,237,0.35),_transparent_55%),_#040510]" />
      <div className="relative flex w-full max-w-lg flex-col gap-10 px-8 text-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">
            Epic Amenities
          </p>
          <h1 className="text-3xl font-semibold md:text-4xl">
            Calibrating premium dispensing intelligence.
          </h1>
          <p className="text-sm text-white/60 md:text-base">
            Synchronizing AI-driven inventory nodes, biometric access layers, and ambient brand lighting protocols.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            <span>Loading Sequence</span>
            <span>{progress}%</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent shadow-glow transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

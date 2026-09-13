"use client";

import { PRODUCT } from "@/lib/constants";

type LoaderProps = {
  progress: number;
  ready: boolean;
};

export function Loader({ progress, ready }: LoaderProps) {
  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-[var(--bg)] transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        opacity: ready ? 0 : 1,
        pointerEvents: ready ? "none" : "auto",
        visibility: ready ? "hidden" : "visible",
      }}
      aria-hidden={ready}
      role="status"
    >
      <div className="flex w-[min(18rem,70vw)] flex-col items-center gap-6">
        <p className="text-[11px] tracking-[0.32em] text-white/55 uppercase">
          {PRODUCT.name}
        </p>
        <p className="font-mono text-[10px] tracking-[0.24em] text-white/35 uppercase">
          Initializing
        </p>
        <div className="h-px w-full bg-white/10">
          <div
            className="h-full origin-left bg-[var(--accent)] transition-[transform] duration-200 ease-out"
            style={{ transform: `scaleX(${Math.min(progress, 100) / 100})` }}
          />
        </div>
      </div>
    </div>
  );
}

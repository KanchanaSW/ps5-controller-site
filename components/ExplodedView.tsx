"use client";

import { ENGINEERING_LABELS } from "@/lib/constants";

export function ExplodedView() {
  return (
    <div
      data-layer="labels"
      className="pointer-events-none absolute inset-0 z-20 hidden opacity-0 lg:block"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {ENGINEERING_LABELS.map((item) => (
          <line
            key={item.id}
            x1={item.x}
            y1={item.y}
            x2={item.toX}
            y2={item.toY}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="0.6"
          />
        ))}
      </svg>
      {ENGINEERING_LABELS.map((item) => (
        <p
          key={item.id}
          className="absolute max-w-[18vw] font-mono text-[9px] tracking-[0.18em] text-white/65 uppercase"
          style={
            item.side === "right"
              ? { right: "4%", top: `${item.y}%`, textAlign: "right" }
              : { left: "4%", top: `${item.y}%` }
          }
        >
          {item.label}
        </p>
      ))}
    </div>
  );
}

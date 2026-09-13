"use client";

import { CtaLink } from "@/components/CtaLink";
import { scrollToStoryProgress } from "@/lib/scrollState";

type HeroProps = {
  overlay?: boolean;
};

export function Hero({ overlay = false }: HeroProps) {
  return (
    <div
      data-layer="hero"
      className={
        overlay
          ? "pointer-events-none relative z-20 px-6 pb-8 md:absolute md:inset-x-0 md:bottom-0 md:px-12 md:pb-14"
          : "relative z-20 px-6 pb-16 pt-28 md:px-12"
      }
    >
      <div className="pointer-events-auto max-w-xl">
        <h1 className="max-w-5xl text-[clamp(2.6rem,7vw,6.4rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-[var(--fg)]">
          Engineered to play.
        </h1>
        <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-[var(--muted)] md:text-base">
          Precision hardware. Immersive control. Designed from the inside out.
        </p>
        <div className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center">
          <CtaLink
            href="#engineering"
            onClick={(e) => {
              e.preventDefault();
              scrollToStoryProgress(0.22);
            }}
          >
            Explore the engineering
          </CtaLink>
          <CtaLink href="#specs" variant="ghost">
            View specs
          </CtaLink>
        </div>
      </div>
    </div>
  );
}

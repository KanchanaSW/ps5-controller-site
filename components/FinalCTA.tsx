"use client";

import Image from "next/image";
import { CtaLink } from "@/components/CtaLink";
import { MEDIA, PRODUCT } from "@/lib/constants";
import { scrollToStoryProgress } from "@/lib/scrollState";

export function FinalCTA() {
  return (
    <section className="relative z-10 overflow-hidden px-6 pt-16 pb-10 md:px-12 md:pt-24">
      <div className="relative min-h-[88dvh] overflow-hidden">
        <Image
          src={MEDIA.controller}
          alt="Cosmic wireless controller in a dark red studio, ready for play"
          fill
          sizes="100vw"
          className="object-cover object-[center_30%] opacity-80 md:object-contain md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/35 to-transparent" />

        <div className="relative flex min-h-[88dvh] flex-col justify-end pb-16">
          <h2 className="max-w-4xl text-[clamp(2.6rem,7vw,6.2rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-[var(--fg)]">
            Ready for control?
          </h2>
          <p className="mt-5 max-w-[28ch] text-[15px] text-[var(--muted)]">
            Explore every detail.
          </p>
          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row">
            <CtaLink
              href="#product"
              onClick={(e) => {
                e.preventDefault();
                scrollToStoryProgress(0);
              }}
            >
              Explore product
            </CtaLink>
            <CtaLink href="#specs" variant="ghost">
              View specs
            </CtaLink>
          </div>
        </div>
      </div>

      <footer className="mt-16 flex flex-col gap-4 border-t border-white/8 py-8 text-[11px] tracking-[0.16em] text-white/35 uppercase md:flex-row md:items-center md:justify-between">
        <p>{PRODUCT.name} wireless controller</p>
        <p>Designed from the inside out</p>
      </footer>
    </section>
  );
}

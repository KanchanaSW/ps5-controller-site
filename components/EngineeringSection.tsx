"use client";

import { ENGINEERING_CALLOUTS } from "@/lib/constants";

export function EngineeringSection() {
  return (
    <>
      <div
        data-layer="engineering-title"
        className="pointer-events-none absolute inset-x-0 top-24 z-20 px-6 opacity-0 md:px-12"
      >
        <h2 className="max-w-[15ch] text-[clamp(1.8rem,3.4vw,3.4rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-[var(--fg)]">
          Every component has a purpose.
        </h2>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-10 md:px-12 md:pb-14">
        {ENGINEERING_CALLOUTS.map((item) => (
          <article
            key={item.id}
            data-callout={item.id}
            className="absolute inset-x-6 bottom-10 max-w-md opacity-0 md:inset-x-12 md:bottom-14"
          >
            <h3 className="text-2xl tracking-tight text-[var(--fg)] md:text-3xl">
              {item.title}
            </h3>
            <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-[var(--muted)] md:text-[15px]">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </>
  );
}

export function EngineeringStatic() {
  return (
    <section id="engineering-static" className="px-6 py-28 md:px-12 md:py-40">
      <h2 className="max-w-3xl text-[clamp(2rem,5vw,4.4rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-[var(--fg)]">
        Every component has a purpose.
      </h2>
      <div className="mt-16 grid gap-12 md:grid-cols-2">
        {ENGINEERING_CALLOUTS.map((item) => (
          <article key={item.id} className="max-w-md">
            <h3 className="text-2xl tracking-tight text-[var(--fg)]">
              {item.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { SPEC_DETAILS, SPECS } from "@/lib/constants";

export function SpecsSection() {
  const reduce = useReducedMotion();

  return (
    <section id="specs" className="relative z-10 px-6 py-28 md:px-12 md:py-40">
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl text-[clamp(2.2rem,6vw,5.4rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-[var(--fg)]"
      >
        Specified for feel.
      </motion.h2>

      <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-2">
        {SPECS.map((spec, i) => (
          <motion.article
            key={spec.title}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="border border-white/8 bg-[#0b0b0b] px-7 py-8 md:px-10 md:py-10"
          >
            <p className="text-sm text-white/40">{spec.title}</p>
            <p className="mt-4 text-[clamp(1.8rem,3vw,2.8rem)] leading-none tracking-[-0.04em] text-[var(--fg)]">
              {spec.value}
            </p>
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-[var(--muted)]">
              {spec.detail}
            </p>
          </motion.article>
        ))}
      </div>

      <ul className="mt-12 grid gap-x-10 gap-y-4 text-sm text-white/55 md:grid-cols-3">
        {SPEC_DETAILS.map((item) => (
          <li key={item} className="border-t border-white/8 pt-4">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

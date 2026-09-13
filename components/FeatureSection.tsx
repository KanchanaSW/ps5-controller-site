"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { FEATURES, MEDIA } from "@/lib/constants";

export function FeatureSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="features"
      className="relative z-10 px-6 py-28 md:px-12 md:py-40"
    >
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl text-[clamp(2.2rem,6vw,5.4rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-[var(--fg)]"
      >
        Built around control.
      </motion.h2>

      <div className="mt-16 grid grid-flow-dense grid-cols-1 gap-4 md:mt-24 md:grid-cols-12">
        <FeatureCell
          feature={FEATURES[0]}
          className="relative min-h-[28rem] overflow-hidden md:col-span-7 md:row-span-2 md:min-h-[36rem]"
          image={MEDIA.exploded}
          imageAlt="Exploded Cosmic controller showing the logic board, analog modules, and structural frame"
          featured
        />
        <FeatureCell
          feature={FEATURES[1]}
          className="min-h-[18rem] md:col-span-5"
        />
        <FeatureCell
          feature={FEATURES[2]}
          className="min-h-[18rem] md:col-span-5"
        />
        <FeatureCell
          feature={FEATURES[3]}
          className="relative min-h-[20rem] overflow-hidden md:col-span-12"
          image={MEDIA.controller}
          imageAlt="Assembled Cosmic controller on a red studio surface"
        />
      </div>
    </section>
  );
}

function FeatureCell({
  feature,
  className,
  image,
  imageAlt,
  featured = false,
}: {
  feature: (typeof FEATURES)[number];
  className: string;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className={[
        "group border border-white/8 bg-[#0b0b0b] p-7 md:p-10",
        className,
      ].join(" ")}
    >
      {image ? (
        <Image
          src={image}
          alt={imageAlt ?? ""}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className={[
            "pointer-events-none object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]",
            featured ? "opacity-80" : "opacity-50",
          ].join(" ")}
        />
      ) : null}
      {image ? <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-transparent" /> : null}
      <div className="relative flex h-full flex-col justify-end">
        <p className="font-mono text-[10px] tracking-[0.22em] text-white/40">
          {feature.index}
        </p>
        <h3
          className={[
            "mt-4 font-semibold tracking-[-0.04em] text-[var(--fg)]",
            featured
              ? "text-[clamp(2.4rem,5vw,4.6rem)]"
              : "text-[clamp(1.8rem,3vw,2.6rem)]",
          ].join(" ")}
        >
          {feature.title}
        </h3>
        <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-white/70 md:text-[15px]">
          {feature.body}
        </p>
      </div>
    </motion.article>
  );
}

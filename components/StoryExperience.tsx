"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ExplodedView } from "@/components/ExplodedView";
import { EngineeringSection } from "@/components/EngineeringSection";
import { Hero } from "@/components/Hero";
import { ProductVideo } from "@/components/ProductVideo";
import { STORY_SCROLL } from "@/lib/animations";
import { ENGINEERING_CALLOUTS, MEDIA } from "@/lib/constants";
import { scrollState } from "@/lib/scrollState";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProductScene = dynamic(() => import("@/components/ProductScene"), {
  ssr: false,
});

type StoryExperienceProps = {
  reduceMotion: boolean;
  desktop: boolean;
};

export function StoryExperience({
  reduceMotion,
  desktop,
}: StoryExperienceProps) {
  const stageRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduceMotion || !stageRef.current) return;

      const stage = stageRef.current;
      const distance = desktop ? STORY_SCROLL.desktop : STORY_SCROLL.mobile;

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "story",
          trigger: stage,
          start: "top top",
          end: `+=${distance}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            scrollState.storyStart = self.start;
            scrollState.storyEnd = self.end;
          },
          onUpdate: (self) => {
            scrollState.progress = self.progress;
            scrollState.velocity = self.getVelocity();
            scrollState.storyStart = self.start;
            scrollState.storyEnd = self.end;
          },
        },
      });

      tl.to('[data-layer="hero"]', { autoAlpha: 0, y: -28, duration: 0.12 }, 0.08)
        .fromTo(
          ".product-visual",
          { scale: 0.94, y: 18 },
          { scale: 1, y: 0, duration: 0.16, ease: "none" },
          0,
        )
        .to(".product-visual", { scale: 1.03, duration: 0.18, ease: "none" }, 0.16)
        .fromTo(
          '[data-layer="engineering-title"]',
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.08 },
          0.34,
        )
        .fromTo(
          '[data-layer="labels"]',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.08 },
          0.38,
        );

      ENGINEERING_CALLOUTS.forEach((item, index) => {
        const start = 0.42 + index * 0.055;
        tl.fromTo(
          `[data-callout="${item.id}"]`,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.04 },
          start,
        );
        if (index < ENGINEERING_CALLOUTS.length - 1) {
          tl.to(
            `[data-callout="${item.id}"]`,
            { autoAlpha: 0, y: -12, duration: 0.03 },
            start + 0.05,
          );
        }
      });

      tl        .to(
          '[data-layer="engineering-title"]',
          { autoAlpha: 0, duration: 0.05 },
          0.41,
        )
        .to('[data-layer="labels"]', { autoAlpha: 0, duration: 0.06 }, 0.64)
        .to(
          `[data-callout="${ENGINEERING_CALLOUTS[ENGINEERING_CALLOUTS.length - 1].id}"]`,
          { autoAlpha: 0, duration: 0.05 },
          0.66,
        )
        .fromTo(
          '[data-layer="reassemble"]',
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.08 },
          0.7,
        )
        .to('[data-layer="reassemble"]', { autoAlpha: 0, duration: 0.08 }, 0.92);

      const story = ScrollTrigger.getById("story");
      if (story) {
        scrollState.storyStart = story.start;
        scrollState.storyEnd = story.end;
      }

      return () => {
        scrollState.progress = 0;
        scrollState.storyStart = 0;
        scrollState.storyEnd = 0;
      };
    },
    { dependencies: [reduceMotion, desktop], revertOnUpdate: true },
  );

  if (reduceMotion) {
    return (
      <section id="product" className="relative">
        <div className="relative flex min-h-[100dvh] flex-col justify-end">
          <ProductVideo reduceMotion />
          <Hero />
        </div>
        <div id="engineering" className="px-6 py-24 md:px-12">
          <Image
            src={MEDIA.exploded}
            alt="Exploded Cosmic controller with internal board, analog modules, battery, and frame separated"
            width={720}
            height={1280}
            className="mx-auto max-h-[80dvh] w-auto object-contain"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="product"
      ref={stageRef}
      className="relative h-[100dvh] overflow-hidden bg-[var(--bg)]"
    >
      <span id="engineering" className="sr-only">
        Engineering
      </span>
      {desktop ? (
        <div className="pointer-events-none absolute inset-0 z-0">
          <ProductScene />
        </div>
      ) : null}
      <div className="relative z-10 flex h-full flex-col md:block">
        <div className="flex min-h-0 flex-1 items-center justify-center pt-16 md:absolute md:inset-0 md:pt-0">
          <ProductVideo />
        </div>
        <Hero overlay />
      </div>
      <ExplodedView />
      <EngineeringSection />
      <div
        data-layer="reassemble"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-12 opacity-0 md:px-12 md:pb-16"
      >
        <h2 className="max-w-3xl text-[clamp(2rem,5vw,4.6rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-[var(--fg)]">
          Everything works together.
        </h2>
      </div>
    </section>
  );
}

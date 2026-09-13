"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomCursor } from "@/components/CustomCursor";
import { FeatureSection } from "@/components/FeatureSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Grain } from "@/components/Grain";
import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SpecsSection } from "@/components/SpecsSection";
import { StoryExperience } from "@/components/StoryExperience";
import { useAssetLoader } from "@/hooks/useAssetLoader";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function HomeExperience() {
  const { progress, ready } = useAssetLoader();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const desktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!ready) return;
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, [ready]);

  return (
    <>
      <a
        href="#product"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70] focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to product
      </a>
      <div id="top-sentinel" className="h-px w-full" />
      <Loader progress={progress} ready={ready} />
      <Grain />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="w-full max-w-full overflow-x-hidden">
        <StoryExperience reduceMotion={reduceMotion} desktop={desktop} />
        <FeatureSection />
        <SpecsSection />
        <FinalCTA />
      </main>
    </>
  );
}

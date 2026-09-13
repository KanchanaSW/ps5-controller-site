"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { MEDIA } from "@/lib/constants";
import { useVideoScrub } from "@/hooks/useVideoScrub";

type ProductVideoProps = {
  reduceMotion?: boolean;
};

export function ProductVideo({ reduceMotion = false }: ProductVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useVideoScrub(videoRef, imageRef, wrapRef, reduceMotion);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const freeze = () => {
      video.pause();
    };
    video.addEventListener("loadedmetadata", freeze);
    freeze();
    return () => video.removeEventListener("loadedmetadata", freeze);
  }, []);

  return (
    <div className="product-visual relative mx-auto h-[52dvh] max-h-[820px] w-full max-w-[min(52vh,420px)] md:h-[88dvh] md:max-w-[min(62vh,720px)]">
      <div
        ref={wrapRef}
        className="relative h-full w-full"
      >
      <div className="product-halo absolute inset-[-12%] -z-10" />
      <Image
        ref={imageRef}
        src={MEDIA.controller}
        alt="Cosmic wireless controller, fully assembled, in a dark red studio"
        fill
        priority
        sizes="(max-width: 768px) 80vw, 720px"
        className="object-contain"
        style={{
          maskImage:
            "radial-gradient(ellipse 72% 78% at 50% 46%, black 42%, transparent 78%)",
        }}
      />
      {!reduceMotion ? (
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster={MEDIA.assembled}
          className="absolute inset-0 h-full w-full object-contain opacity-0"
          style={{
            maskImage:
              "radial-gradient(ellipse 72% 78% at 50% 46%, black 42%, transparent 78%)",
          }}
          aria-label="Exploded-view animation of the Cosmic wireless controller, showing internal components separating and reassembling"
        >
          <source src={MEDIA.video} type="video/mp4" />
        </video>
      ) : null}
      </div>
    </div>
  );
}

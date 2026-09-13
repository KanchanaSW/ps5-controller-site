"use client";

import { useEffect, type RefObject } from "react";
import { progressToVideoTime, scrollState } from "@/lib/scrollState";

export function useVideoScrub(
  videoRef: RefObject<HTMLVideoElement | null>,
  imageRef: RefObject<HTMLElement | null>,
  wrapRef: RefObject<HTMLElement | null>,
  reduceMotion: boolean,
) {
  useEffect(() => {
    if (reduceMotion) return;

    let raf = 0;
    let lastApplied = -1;
    let idle = 0;
    let waiting = false;

    const tick = () => {
      const video = videoRef.current;
      const image = imageRef.current;
      const wrap = wrapRef.current;
      const progress = scrollState.progress;

      if (video && video.readyState >= 1 && video.duration) {
        const target = progressToVideoTime(progress, video.duration);
        if (Math.abs(target - lastApplied) > 0.035 && !waiting) {
          waiting = true;
          const unlock = () => {
            waiting = false;
            video.removeEventListener("seeked", unlock);
          };
          video.addEventListener("seeked", unlock);
          window.setTimeout(unlock, 90);
          try {
            video.currentTime = target;
            lastApplied = target;
          } catch {
            waiting = false;
          }
        }
      }

      if (image && video) {
        let imageOpacity = 1;
        let videoOpacity = 0;
        if (progress >= 0.16 && progress <= 0.9) {
          if (progress < 0.2) {
            const t = (progress - 0.16) / 0.04;
            imageOpacity = 1 - t;
            videoOpacity = t;
          } else if (progress > 0.86) {
            const t = (progress - 0.86) / 0.04;
            imageOpacity = t;
            videoOpacity = 1 - t;
          } else {
            imageOpacity = 0;
            videoOpacity = 1;
          }
        }
        image.style.opacity = String(imageOpacity);
        video.style.opacity = String(videoOpacity);
      }

      if (wrap) {
        const moving = Math.abs(scrollState.velocity) > 80;
        if (!moving) {
          idle += 0.012;
          const y = Math.sin(idle) * 2.4;
          const r = Math.sin(idle * 0.65) * 0.28;
          wrap.style.transform = `translate3d(0, ${y}px, 0) rotateZ(${r}deg)`;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [imageRef, reduceMotion, videoRef, wrapRef]);
}

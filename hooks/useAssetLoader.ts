"use client";

import { useEffect, useState } from "react";
import { MEDIA } from "@/lib/constants";

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function loadVideoMeta(src: string) {
  return new Promise<void>((resolve) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    const done = () => resolve();
    video.addEventListener("loadeddata", done, { once: true });
    video.addEventListener("error", done, { once: true });
    video.src = src;
    video.load();
  });
}

export function useAssetLoader() {
  const [progress, setProgress] = useState(8);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let value = 8;
    const timer = window.setInterval(() => {
      value = Math.min(value + 2, 86);
      if (!cancelled) setProgress(value);
    }, 90);

    const timeout = window.setTimeout(() => {
      if (!cancelled) {
        setProgress(100);
        setReady(true);
      }
    }, 7000);

    Promise.all([
      loadImage(MEDIA.controller),
      loadImage(MEDIA.exploded),
      loadVideoMeta(MEDIA.video),
    ]).then(() => {
      if (cancelled) return;
      window.clearInterval(timer);
      window.clearTimeout(timeout);
      setProgress(100);
      window.setTimeout(() => {
        if (!cancelled) setReady(true);
      }, 280);
    });

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      window.clearTimeout(timeout);
    };
  }, []);

  return { progress, ready };
}

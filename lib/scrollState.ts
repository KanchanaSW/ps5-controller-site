export const scrollState = {
  progress: 0,
  velocity: 0,
  storyStart: 0,
  storyEnd: 0,
};

export function progressToVideoTime(progress: number, duration: number) {
  if (!duration || Number.isNaN(duration)) return 0;

  const explodeEnd = duration * 0.5;

  if (progress < 0.18) return 0;
  if (progress < 0.4) {
    const t = (progress - 0.18) / 0.22;
    return t * explodeEnd;
  }
  if (progress < 0.66) return explodeEnd;
  if (progress < 0.9) {
    const t = (progress - 0.66) / 0.24;
    return explodeEnd + t * (duration - explodeEnd);
  }

  return Math.max(duration - 0.04, 0);
}

export function scrollToStoryProgress(progress: number) {
  if (scrollState.storyEnd > scrollState.storyStart) {
    const y =
      scrollState.storyStart +
      (scrollState.storyEnd - scrollState.storyStart) * progress;
    window.scrollTo({ top: y, behavior: "smooth" });
    return;
  }

  document.querySelector<HTMLElement>("#product")?.scrollIntoView({
    behavior: "smooth",
  });
}

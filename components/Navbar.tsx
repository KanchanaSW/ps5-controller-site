"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS, PRODUCT } from "@/lib/constants";
import { scrollToStoryProgress } from "@/lib/scrollState";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("product");

  useEffect(() => {
    const sentinel = document.querySelector("#top-sentinel");
    if (!sentinel) {
      const onScroll = () => setScrolled(window.scrollY > 24);
      onScroll();
      const observer = new IntersectionObserver(
        () => setScrolled(window.scrollY > 24),
        { threshold: 0 },
      );
      observer.observe(document.body);
      return () => observer.disconnect();
    }

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = ["features", "specs", "product"];
    const nodes = sections
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { threshold: 0.35 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const go = (item: (typeof NAV_ITEMS)[number]) => {
    setOpen(false);
    if ("story" in item && typeof item.story === "number") {
      scrollToStoryProgress(item.story);
      setActive(item.id);
      return;
    }
    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
    setActive(item.id);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="relative z-50 flex justify-center px-4 pt-4">
      <nav
        className={[
          "pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-4 py-2 transition-[background-color,backdrop-filter,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border border-white/10 bg-[#0a0a0a]/75 backdrop-blur-xl"
            : "border border-transparent bg-transparent",
        ].join(" ")}
        aria-label="Primary"
      >
        <a
          href="#product"
          onClick={(e) => {
            e.preventDefault();
            scrollToStoryProgress(0);
          }}
          className="text-[12px] tracking-[0.28em] text-[var(--fg)] uppercase"
        >
          {PRODUCT.name}
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item)}
                className={[
                  "relative text-[11px] tracking-[0.18em] uppercase transition-colors duration-500",
                  active === item.id
                    ? "text-[var(--fg)]"
                    : "text-white/45 hover:text-white/80",
                ].join(" ")}
              >
                {item.label}
                <span
                  className={[
                    "absolute inset-x-0 -bottom-1 h-px origin-left bg-[var(--accent)] transition-transform duration-500",
                    active === item.id ? "scale-x-100" : "scale-x-0",
                  ].join(" ")}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToStoryProgress(0.22)}
            className="hidden rounded-full bg-[var(--fg)] px-4 py-2 text-[10px] tracking-[0.2em] text-[var(--bg)] uppercase transition-transform duration-500 hover:scale-[1.03] md:inline-flex"
          >
            Explore
          </button>
          <button
            type="button"
            className="relative h-10 w-10 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={[
                "absolute top-[14px] left-2 h-px w-6 bg-white transition-transform duration-500",
                open ? "translate-y-[5px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "absolute top-[24px] left-2 h-px w-6 bg-white transition-transform duration-500",
                open ? "-translate-y-[5px] -rotate-45" : "",
              ].join(" ")}
            />
          </button>
        </div>
      </nav>
      </div>

      <div
        className={[
          "pointer-events-auto fixed inset-0 z-40 bg-[#050505]/92 backdrop-blur-2xl transition-opacity duration-500 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <ul className="flex min-h-[100dvh] flex-col justify-center gap-8 px-8">
          {NAV_ITEMS.map((item, i) => (
            <li
              key={item.id}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              className={[
                "text-4xl tracking-tight text-[var(--fg)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              ].join(" ")}
            >
              <button type="button" onClick={() => go(item)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

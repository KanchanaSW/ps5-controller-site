"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import type { MouseEvent, ReactNode } from "react";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "fill" | "ghost";
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function CtaLink({
  href,
  children,
  variant = "fill",
  onClick,
}: CtaLinkProps) {
  const filled = variant === "fill";

  return (
    <a
      href={href}
      onClick={onClick}
      className={[
        "group inline-flex w-full items-center justify-center gap-3 rounded-full px-5 py-2.5 text-[10px] font-medium tracking-[0.14em] whitespace-nowrap uppercase transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:w-auto sm:text-[11px] sm:tracking-[0.18em] active:scale-[0.98]",
        filled
          ? "bg-[var(--fg)] text-[var(--bg)] hover:bg-white"
          : "border border-white/15 text-[var(--fg)] hover:border-white/40 hover:bg-white/5",
      ].join(" ")}
    >
      <span>{children}</span>
      <span
        className={[
          "grid h-7 w-7 place-items-center rounded-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px",
          filled ? "bg-black/10" : "bg-white/10",
        ].join(" ")}
      >
        <ArrowUpRight size={14} weight="light" />
      </span>
    </a>
  );
}

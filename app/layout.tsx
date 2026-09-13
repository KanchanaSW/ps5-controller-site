import type { Metadata } from "next";
import { Geist_Mono, Outfit } from "next/font/google";
import { MEDIA } from "@/lib/constants";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "COSMIC | Engineered to Play",
  description:
    "Precision hardware. Immersive control. Designed from the inside out.",
  openGraph: {
    title: "COSMIC | Engineered to Play",
    description:
      "Precision hardware. Immersive control. Designed from the inside out.",
    images: [{ url: MEDIA.controller }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" as="image" href={MEDIA.controller} />
      </head>
      <body className="min-h-full bg-[var(--bg)] font-sans text-[var(--fg)]">
        {children}
      </body>
    </html>
  );
}

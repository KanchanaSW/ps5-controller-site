import type { Metadata } from "next";
import { Geist_Mono, Outfit } from "next/font/google";
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
  metadataBase: new URL("https://cosmic-controller.example"),
  title: "COSMIC | Engineered to Play",
  description:
    "Precision hardware. Immersive control. Designed from the inside out.",
  openGraph: {
    title: "COSMIC | Engineered to Play",
    description:
      "Precision hardware. Immersive control. Designed from the inside out.",
    images: [{ url: "/media/controller.jpg" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" as="image" href="/media/controller.jpg" />
      </head>
      <body className="min-h-full bg-[var(--bg)] font-sans text-[var(--fg)]">
        {children}
      </body>
    </html>
  );
}

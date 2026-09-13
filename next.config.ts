import type { NextConfig } from "next";

// GitHub Pages serves project sites from /<repo>, so every URL needs that
// prefix. Left empty for local dev and root-domain hosts.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    // No image optimization server exists on a static host.
    unoptimized: true,
  },
};

export default nextConfig;

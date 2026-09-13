# COSMIC Controller

Scroll-driven product site for the **COSMIC** wireless controller. A pinned story sequence walks through the hardware, then features, specs, and a closing call to action.

**Live site: [kanchanasw.github.io/ps5-controller-site](https://kanchanasw.github.io/ps5-controller-site/)**

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) and React 19
- [Tailwind CSS](https://tailwindcss.com) 4
- [GSAP](https://gsap.com) + ScrollTrigger for the story timeline
- [Three.js](https://threejs.org) via React Three Fiber for the atmosphere layer
- [Motion](https://motion.dev) for UI motion
- Static export deployed to [GitHub Pages](https://pages.github.com)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

Product media lives at `public/media/` (`controller.jpg`, `exploded.jpg`, `assembled.jpg`, `explode.mp4`). Paths are defined in `lib/constants.ts`.

## Site structure

The home page is a single experience assembled in `components/HomeExperience.tsx`:

1. **Loader** — preloads hero image, exploded view, and video
2. **Story** — pinned scroll scene: hero → product visual → engineering callouts
3. **Features** — precision, haptics, ergonomics, durability
4. **Specs** — haptic architecture, triggers, motion, connection
5. **CTA** — closing conversion block

Reduced-motion users skip the pinned story animation. The custom cursor is desktop-only.

```
app/            layout, global styles, home route
components/     experience, sections, 3D scene, chrome
hooks/          asset loader, media query, video scrub
lib/            product copy, media paths, animation and scroll helpers
public/media/   controller stills and explode video
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the static export (`output: "export"`) and publishes `out/` to GitHub Pages at [kanchanasw.github.io/ps5-controller-site](https://kanchanasw.github.io/ps5-controller-site/).

Because Pages serves this as a project site under `/ps5-controller-site`, the workflow sets `NEXT_PUBLIC_BASE_PATH` to that prefix and `NEXT_PUBLIC_SITE_URL` to the origin. `basePath` only rewrites framework URLs, so the paths in `lib/constants.ts` apply the prefix themselves — keep new `public/` references going through `MEDIA` rather than hardcoding `/media/...`. Both variables are unset locally, so `npm run dev` stays at the root.

On a root domain or a custom domain, drop `NEXT_PUBLIC_BASE_PATH`.

`netlify.toml` is kept for Netlify deploys, where it publishes the same `out/` directory and caches `/media/*` as immutable for one year.

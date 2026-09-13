export const PRODUCT = {
  name: "COSMIC",
  model: "Wireless Controller",
} as const;

// `basePath` only rewrites framework URLs, not `public/` asset paths we build
// ourselves, so these carry the prefix explicitly.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const MEDIA = {
  controller: `${BASE_PATH}/media/controller.jpg`,
  assembled: `${BASE_PATH}/media/assembled.jpg`,
  exploded: `${BASE_PATH}/media/exploded.jpg`,
  video: `${BASE_PATH}/media/explode.mp4`,
} as const;

export const NAV_ITEMS = [
  { id: "product", label: "Product", href: "#product", story: 0 },
  { id: "engineering", label: "Engineering", href: "#engineering", story: 0.36 },
  { id: "features", label: "Features", href: "#features" },
  { id: "specs", label: "Specs", href: "#specs" },
] as const;

export const ENGINEERING_CALLOUTS = [
  {
    id: "input",
    title: "Precision Input",
    body: "Responsive control starts with components engineered for accuracy.",
  },
  {
    id: "haptics",
    title: "Haptic Feedback",
    body: "Every vibration is precisely tuned for immersive feedback.",
  },
  {
    id: "power",
    title: "Power",
    body: "High-density energy architecture built for extended sessions.",
  },
  {
    id: "structure",
    title: "Structure",
    body: "A rigid internal architecture keeps every interaction precise.",
  },
] as const;

export const ENGINEERING_LABELS = [
  {
    id: "interface",
    label: "Control Interface",
    side: "left" as const,
    x: "18",
    y: "52",
    toX: "38",
    toY: "32",
  },
  {
    id: "input",
    label: "Precision Input",
    side: "left" as const,
    x: "18",
    y: "64",
    toX: "40",
    toY: "44",
  },
  {
    id: "haptic",
    label: "Haptic Motor",
    side: "left" as const,
    x: "18",
    y: "76",
    toX: "36",
    toY: "56",
  },
  {
    id: "board",
    label: "Main Logic Board",
    side: "right" as const,
    x: "82",
    y: "38",
    toX: "62",
    toY: "48",
  },
  {
    id: "power",
    label: "Power Cell",
    side: "right" as const,
    x: "82",
    y: "56",
    toX: "60",
    toY: "62",
  },
  {
    id: "frame",
    label: "Structural Frame",
    side: "right" as const,
    x: "82",
    y: "74",
    toX: "60",
    toY: "78",
  },
] as const;

export const FEATURES = [
  {
    id: "precision",
    index: "01",
    title: "Precision",
    body: "Every input is engineered to feel immediate.",
  },
  {
    id: "haptics",
    index: "02",
    title: "Haptics",
    body: "Feel every interaction with finely tuned feedback.",
  },
  {
    id: "ergonomics",
    index: "03",
    title: "Ergonomics",
    body: "Balanced geometry designed around natural control.",
  },
  {
    id: "durability",
    index: "04",
    title: "Durability",
    body: "Premium materials built for demanding sessions.",
  },
] as const;

export const SPECS = [
  {
    title: "Haptic Architecture",
    value: "Dual actuators",
    detail: "Independent motors in each grip for directional texture.",
  },
  {
    title: "Trigger System",
    value: "Adaptive",
    detail: "Variable resistance tuned to in-game tension and impact.",
  },
  {
    title: "Motion Sensing",
    value: "Six-axis",
    detail: "Gyroscope and accelerometer tracking for spatial input.",
  },
  {
    title: "Connection",
    value: "Wireless + USB-C",
    detail: "Low-latency wireless with a wired fallback for charging.",
  },
] as const;

export const SPEC_DETAILS = [
  "Built-in microphone and speaker",
  "Capacitive touchpad",
  "Create and options controls",
  "Motion-aware analog sticks",
  "Replaceable USB-C charging",
  "Balanced dual-grip chassis",
] as const;

export const Z = {
  atmosphere: 0,
  product: 10,
  content: 20,
  nav: 40,
  grain: 45,
  cursor: 50,
  loader: 60,
} as const;

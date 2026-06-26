import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "forest-green": { DEFAULT: "#2D4A22", dark: "#1F3318", light: "#3D6230", 50: "#EEF4EC" },
        timber: { DEFAULT: "#8B4513", light: "#A0522D" },
        "ember-orange": { DEFAULT: "#E8821A", light: "#F0943A", dark: "#C96D0F" },
        "warm-white": "#FDFAF7",
        bark: { DEFAULT: "#1C2B1A", light: "#2A3D28" },
        muted: "#6B7280",
        border: "#DDD5CB",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

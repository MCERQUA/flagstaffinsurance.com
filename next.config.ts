import type { NextConfig } from "next";
import path from "path";
const nextConfig: NextConfig = {
  // Static export — REQUIRED for Netlify Forms to capture leads.
  // With the @netlify/plugin-nextjs runtime the Next function answers every
  // POST, so Netlify Forms never sees the submission (host-confirmed 0 captures
  // fleet-wide). Static export emits plain HTML forms the Netlify form backend
  // handles directly. Pair with netlify.toml publish="out" + plugin removed.
  output: "export",
  images: { unoptimized: true },
  // Fix workspace-root inference confusion when multiple lockfiles are present
  // (prevents Next from mis-selecting parent /app/websites/ as the tracing root)
  outputFileTracingRoot: path.join(__dirname),
};
export default nextConfig;

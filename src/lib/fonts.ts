import localFont from "next/font/local";

export const headingFont = localFont({
  src: [
    { path: "./fonts/Raleway-variable.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Raleway-variable.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Raleway-variable.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});

export const bodyFont = localFont({
  src: [
    { path: "./fonts/Lato-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Lato-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

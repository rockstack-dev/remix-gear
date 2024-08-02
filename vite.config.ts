import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import remixConfig from "./remix.config";
import tsconfigPaths from "vite-tsconfig-paths";
import { vercelPreset } from "@vercel/remix/vite";

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tsconfigPaths(),
    remix({
      ...remixConfig,
      presets: [vercelPreset],
    }),
  ],
  ssr: {
    noExternal: ["remix-i18next"],
  },
  resolve: {
    alias: {
      ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js",
    },
  },
});

import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { mockupPreviewPlugin } from "./mockupPreviewPlugin";

function stripSourcemapReferencesPlugin(): Plugin {
  return {
    name: "strip-sourcemap-references",
    enforce: "pre" as const,
    transform(code: string, id: string) {
      if (id.includes("/node_modules/") && /sourceMappingURL=/.test(code)) {
        return {
          code: code
            .replace(/\/\/#[ ]*sourceMappingURL=.*$/gm, "")
            .replace(/\/*# sourceMappingURL=.*\*\//gm, ""),
          map: null,
        };
      }
      return null;
    },
  };
}

const rawPort = process.env.PORT || "3000";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH || "/";
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  base: basePath,
  plugins: [
    stripSourcemapReferencesPlugin(),
    mockupPreviewPlugin(),
    react(),
    tailwindcss(),
    ...(!isProduction ? [runtimeErrorOverlay()] : []),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  root: path.resolve(import.meta.dirname),
  build: {
    sourcemap: false,
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      onwarn(warning, warn) {
        if (
          warning.code === "SOURCEMAP_ERROR" &&
          typeof warning.message === "string" &&
          warning.message.includes("Can't resolve original location of error")
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});

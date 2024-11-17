/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/testing/setup.ts",
    include: ["**/*.test.{ts,tsx}"],
    globals: true,
    css: true,
    coverage: {
      all: true,
      enabled: true,
      provider: "istanbul",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["**/*.test.{ts,tsx}", "src/main.tsx", "**/*.d.ts"],
    },
  },
});

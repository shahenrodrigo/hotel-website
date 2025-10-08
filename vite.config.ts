import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/hotel-website/", // << repo name as base
  build: { outDir: "docs" }, // build straight into /docs
});

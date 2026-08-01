import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 600,
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
});

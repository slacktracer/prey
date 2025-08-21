import { sveltekit } from "@sveltejs/kit/vite";
import devtoolsJson from "vite-plugin-devtools-json";
import wasm from "vite-plugin-wasm";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [devtoolsJson(), sveltekit(), wasm()],

  server: { hmr: false },

  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});

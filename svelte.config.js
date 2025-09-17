import process from "node:process";

import adapter from "@deno/svelte-adapter";
import nodeAdapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const useNodeAdapter = process.env.SVELTE_ADAPTER === "node";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: useNodeAdapter ? nodeAdapter() : adapter(),
  },

  preprocess: vitePreprocess(),
};

export default config;

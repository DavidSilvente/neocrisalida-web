// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Output stays static: pages are prerendered by default and only routes that
  // explicitly `export const prerender = false` are rendered on demand.
  adapter: node({ mode: 'standalone' }),

  vite: {
    plugins: [tailwindcss()],
  },
});

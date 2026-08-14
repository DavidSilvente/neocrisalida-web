// @ts-check
import { defineConfig, envField } from 'astro/config';

import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Output stays static: pages are prerendered by default and only routes that
  // explicitly `export const prerender = false` are rendered on demand.
  // staticHeaders lets the standalone server send Astro-generated headers
  // (such as CSP) for prerendered pages too, not just on-demand routes.
  adapter: node({ mode: 'standalone', staticHeaders: true }),

  // Infrastructure probes only. These are NOT domain configuration: they exist
  // to prove that client-public and server-secret variables stay separated.
  env: {
    schema: {
      HARNESS_PROBE_PUBLIC: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      HARNESS_PROBE_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },

  markdown: {
    // Shiki emits inline styles, which are incompatible with CSP. The harness
    // has no syntax-highlighting requirement, so disable it rather than weaken
    // the policy or pull in a highlighter.
    syntaxHighlight: false,
  },

  security: {
    // checkOrigin stays at its default (true): Astro's CSRF protection for
    // Actions must remain enabled.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});

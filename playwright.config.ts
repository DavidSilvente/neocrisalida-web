import { defineConfig, devices } from '@playwright/test';

const HOST = '127.0.0.1';
const PORT = 4322;
const BASE_URL = `http://${HOST}:${PORT}`;

export default defineConfig({
  testDir: './e2e',

  use: {
    baseURL: BASE_URL,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Serves the built dist/ output via `astro preview`, never `astro dev`.
  // reuseExistingServer is false on purpose: reusing a running dev server
  // would silently test development output instead of the production build.
  webServer: {
    command: `npm run preview -- --host ${HOST} --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: false,
    env: {
      // Astro 7 auto-detects agentic environments and daemonizes `astro preview`
      // into a background process. The CLI would then exit immediately and
      // Playwright would report "Process from config.webServer exited early",
      // leaving an orphaned server behind. This opts back into a foreground
      // process that Playwright owns and can terminate.
      ASTRO_PREVIEW_BACKGROUND: '0',
    },
  },
});

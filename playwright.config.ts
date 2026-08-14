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

  // Runs the real Node server bundle produced by the build, never `astro dev`.
  // `astro preview` only serves static output, so it cannot execute the
  // on-demand routes and actions this suite needs to cover.
  // reuseExistingServer is false on purpose: reusing an already running server
  // would silently test stale output instead of the current production build.
  webServer: {
    command: 'npm run start',
    url: BASE_URL,
    reuseExistingServer: false,
    env: {
      HOST,
      PORT: String(PORT),
    },
  },
});

// CommonJS on purpose: Lighthouse CI loads its config with require().
const { chromium } = require('playwright');

const HOST = '127.0.0.1';
// Dedicated port: 4321 astro dev, 4322 Playwright, 4324 link checker.
const PORT = 4326;
const BASE_URL = `http://${HOST}:${PORT}`;

// The standalone entry reads HOST/PORT from the environment. Setting them here
// (rather than inlining `HOST=… PORT=… node …` in the command) keeps the
// start command portable to shells that do not support env prefixes.
process.env.HOST = HOST;
process.env.PORT = String(PORT);

module.exports = {
  ci: {
    collect: {
      // Lighthouse CI owns the production server lifecycle itself.
      startServerCommand: `node ./dist/server/entry.mjs`,
      startServerReadyPattern: 'Server listening on',
      url: [`${BASE_URL}/`, `${BASE_URL}/action-probe`],
      numberOfRuns: 1,
      // Reuse the Chromium already pinned by Playwright instead of requiring a
      // second browser install. executablePath() is Playwright's public API.
      chromePath: chromium.executablePath(),
    },

    assert: {
      assertions: {
        // ---------------------------------------------------------------
        // A. Objective resource budgets — BLOCKING.
        // Deliberately generous ceilings for a generic page, not tuned to
        // this trivial harness (measured baseline: ~7.4 kB total, 2 requests).
        // Real projects MUST ratchet these down to their own baseline.
        // ---------------------------------------------------------------
        'resource-summary:script:size': ['error', { maxNumericValue: 153600 }],
        'resource-summary:stylesheet:size': [
          'error',
          { maxNumericValue: 76800 },
        ],
        'resource-summary:image:size': ['error', { maxNumericValue: 307200 }],
        'resource-summary:total:size': ['error', { maxNumericValue: 512000 }],
        'resource-summary:total:count': ['error', { maxNumericValue: 25 }],

        // ---------------------------------------------------------------
        // B. Lighthouse category scores — WARNING ONLY.
        // These are observability, not gates: they depend on the machine and
        // on content decisions the harness does not own. Never assert 1.0.
        // ---------------------------------------------------------------
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },

    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci',
    },
  },
};

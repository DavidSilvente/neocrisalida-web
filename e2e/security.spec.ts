import { expect, test } from '@playwright/test';

// Header names are case-insensitive; Playwright lowercases them.
const CSP_HEADER = 'content-security-policy';

// Semantic invariants only: Astro injects build-specific script/style hashes,
// so the full policy string is not stable across builds.
const BASELINE_DIRECTIVES = [
  "default-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
];

const ROUTES = [
  { path: '/', rendering: 'prerendered' },
  { path: '/action-probe', rendering: 'on-demand' },
];

for (const { path, rendering } of ROUTES) {
  test(
    `${rendering} route ${path} sends a CSP header`,
    { tag: '@security' },
    async ({ request }) => {
      const response = await request.get(path);
      expect(response.ok()).toBe(true);

      const csp = response.headers()[CSP_HEADER];
      expect(csp, `${path} must send a ${CSP_HEADER} header`).toBeTruthy();

      for (const directive of BASELINE_DIRECTIVES) {
        expect(csp).toContain(directive);
      }

      // Astro manages script/style hashes itself; assert the protection exists
      // rather than the exact hashes.
      expect(csp).toMatch(/script-src [^;]*'sha256-/);
      expect(csp).toMatch(/style-src [^;]*'self'/);

      // The policy must never be weakened back into inline execution.
      expect(csp).not.toContain('unsafe-inline');
      expect(csp).not.toContain('unsafe-eval');
    },
  );
}

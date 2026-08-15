import { expect, test } from '@playwright/test';

/**
 * The journey line is the surface's signature element: one continuous stroke
 * that draws the whole page.
 *
 * It used to be revealed by CSS scroll-driven animation. That was removed
 * because the engines disagreed on tall subjects — the wide figures sat
 * between 53% and 69% drawn in Chrome at the moment the reader met them, while
 * WebKit completed them. The line now simply exists, in every browser.
 *
 * This guards that invariant: whatever else changes, the drawing must be whole
 * on arrival. A reveal mechanism reintroduced without a guaranteed finished
 * state fails here rather than on someone's phone.
 */

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const MOTION = ['no-preference', 'reduce'] as const;

for (const viewport of VIEWPORTS) {
  for (const motion of MOTION) {
    test(`journey line is whole at ${viewport.name} with motion ${motion} @motion`, async ({
      browser,
    }) => {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: motion,
      });
      const page = await context.newPage();

      try {
        await page.goto('/');
        await page.evaluate(() => document.fonts.ready);

        const state = await page.evaluate(() => {
          const name = (el: Element) =>
            el.closest('svg')?.getAttribute('data-figure') ?? 'spine-run';

          return {
            paths: document.querySelectorAll('.journey path').length,
            // A dashed path is a partly drawn one.
            dashed: [...document.querySelectorAll('.journey path')]
              .filter((el) => getComputedStyle(el).strokeDasharray !== 'none')
              .map(name),
            // Nothing may be clipped away either.
            clipped: [...document.querySelectorAll('.spine-run')]
              .map((el) => getComputedStyle(el).clipPath)
              .filter((value) => value !== 'none'),
            // And nothing may be waiting on an animation to become visible.
            animated: [
              ...document.querySelectorAll('.journey path, .spine-run'),
            ].filter((el) => el.getAnimations().length > 0).length,
          };
        });

        expect(state.paths, 'the journey must actually render').toBeGreaterThan(
          0,
        );
        expect(state.dashed, 'no journey path may be left dashed').toEqual([]);
        expect(state.clipped, 'no spine run may be left clipped').toEqual([]);
        expect(
          state.animated,
          'the line must not depend on an animation to be visible',
        ).toBe(0);
      } finally {
        await context.close();
      }
    });
  }
}

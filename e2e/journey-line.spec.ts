import { expect, test } from '@playwright/test';

/**
 * The journey line is the surface's signature element: one continuous stroke
 * that draws the whole page. It is revealed by CSS scroll-driven animation.
 *
 * A previous build shipped an `animation-range` that mixed two timeline phases.
 * On subjects taller than the scrollport the range degenerated, every path
 * froze part-drawn, and the page rendered as disconnected line fragments with
 * the figures absent. Screenshots taken under `prefers-reduced-motion: reduce`
 * — the one branch where the dash animation never runs — showed nothing wrong,
 * so the defect reached a real device before anyone saw it.
 *
 * This asserts the motion branch specifically, at both target widths.
 */

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

for (const viewport of VIEWPORTS) {
  test(`journey line finishes drawing with motion enabled at ${viewport.name} @motion`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: 'no-preference',
    });
    const page = await context.newPage();

    try {
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);

      const total = await page.evaluate(
        () => document.documentElement.scrollHeight,
      );
      expect(total).toBeGreaterThan(viewport.height);

      // Walk the whole document the way a reader would, so every subject
      // passes through its own view timeline.
      for (let y = 0; y <= total; y += Math.round(viewport.height / 2)) {
        await page.evaluate((offset) => window.scrollTo(0, offset), y);
        await page.waitForTimeout(60);
      }
      await page.waitForTimeout(400);

      const state = await page.evaluate(() => {
        const describe = (el: Element) => {
          const svg = el.closest('svg');
          return svg?.getAttribute('data-figure') ?? 'spine-run';
        };

        return {
          // Stroked paths draw themselves: they must end at dash offset 0.
          undrawn: [...document.querySelectorAll('.journey path:not(.spark)')]
            .filter(
              (el) => parseFloat(getComputedStyle(el).strokeDashoffset) !== 0,
            )
            .map(describe),
          // Sparks are filled and fade in: they must end fully opaque.
          faded: [...document.querySelectorAll('.journey .spark')]
            .filter((el) => parseFloat(getComputedStyle(el).opacity) !== 1)
            .map(describe),
          // Nothing may be left without a running scroll timeline at all.
          // The figures animate on their paths; the straight run animates on
          // its own <svg>, because it is revealed by clip rather than by dash.
          untimed: [
            ...document.querySelectorAll('.journey:not(.spine-run) path'),
            ...document.querySelectorAll('.spine-run'),
          ].filter((el) => el.getAnimations().length === 0).length,
          // The run must end fully revealed, with nothing clipped away.
          clipped: [...document.querySelectorAll('.spine-run')]
            .map((el) => getComputedStyle(el).clipPath)
            .filter((value) => {
              if (value === 'none') return false;
              const insets = value.match(/-?[\d.]+/g) ?? [];
              return insets.some((inset) => parseFloat(inset) !== 0);
            }),
        };
      });

      expect(
        state.untimed,
        'every journey path must carry a scroll-driven animation; a CSS minifier ' +
          'folding animation-timeline into the animation shorthand silently drops them',
      ).toBe(0);
      expect(
        state.undrawn,
        'every stroked journey path must reach dash offset 0 once scrolled past',
      ).toEqual([]);
      expect(state.faded, 'every spark must reach full opacity').toEqual([]);
      expect(
        state.clipped,
        'every spine run must end fully revealed rather than part-clipped',
      ).toEqual([]);
    } finally {
      await context.close();
    }
  });
}

test('journey line is fully drawn when motion is reduced @motion', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();

  try {
    await page.goto('/');

    // No dash animation applies at all, so the stroke exists at rest: the
    // journey survives without motion rather than depending on it.
    const dashed = await page.evaluate(
      () =>
        [...document.querySelectorAll('.journey path')].filter(
          (el) => getComputedStyle(el).strokeDasharray !== 'none',
        ).length,
    );

    expect(dashed, 'reduced motion must leave no path dashed').toBe(0);
  } finally {
    await context.close();
  }
});

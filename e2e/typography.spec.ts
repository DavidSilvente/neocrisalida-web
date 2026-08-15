import { expect, test } from '@playwright/test';

/**
 * Bodoni is a didone: its hairlines are the crossbar of an `A` and the bar of
 * an `e`. Matching the `opsz` axis to the rendered size is the print habit, and
 * it shipped a headline whose `A` had no crossbar at all on Android, because at
 * high optical sizes those strokes fall below one device pixel.
 *
 * The axis is therefore held low on every display role. This guards that,
 * because the defect is invisible at the device pixel ratio of 2 that
 * screenshots default to.
 */
const MAX_OPSZ = 16;

test('display type keeps its optical size low enough for hairlines to survive @type', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  const offenders = await page.evaluate((max) => {
    const roles = [
      '.display-xl',
      '.display-l',
      '.said',
      '.field h3',
      '.wordmark',
    ];
    const out: { role: string; opsz: number; weight: string }[] = [];

    for (const role of roles) {
      for (const el of document.querySelectorAll(role)) {
        const style = getComputedStyle(el);
        // Engines serialise the axis tag with either quote style.
        const match = /["']opsz["']\s+([\d.]+)/.exec(
          style.fontVariationSettings,
        );
        const opsz = match ? parseFloat(match[1]) : Number.NaN;
        if (!Number.isFinite(opsz) || opsz > max) {
          out.push({ role, opsz, weight: style.fontWeight });
        }
      }
    }
    return out;
  }, MAX_OPSZ);

  expect(
    offenders,
    `every Bodoni role must declare 'opsz' at ${MAX_OPSZ} or below; above that the hairlines drop out at DPR 1`,
  ).toEqual([]);
});

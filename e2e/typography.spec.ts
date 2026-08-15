import { expect, test } from '@playwright/test';

/**
 * Bodoni is a didone: its hairlines are the crossbar of an `A` and the bar of
 * an `e`. Those strokes vanish when they fall below one device pixel, which is
 * a function of pixel density — not of the operating system.
 *
 * The stylesheet therefore ships two cuts: a sturdy default, and Bodoni's fine
 * cut restored at `min-resolution: 2dppx`, where the screen has the pixels to
 * render it. Both branches are asserted here, because a change that silently
 * collapses them into one is invisible at whichever density you happen to test.
 */

const ROLES = ['.display-xl', '.display-l', '.said', '.field h3', '.wordmark'];

const readOpsz = () =>
  ['.display-xl', '.display-l', '.said', '.field h3', '.wordmark'].flatMap(
    (role) =>
      [...document.querySelectorAll(role)].map((el) => {
        // Engines serialise the axis tag with either quote style.
        const match = /["']opsz["']\s+([\d.]+)/.exec(
          getComputedStyle(el).fontVariationSettings,
        );
        return { role, opsz: match ? parseFloat(match[1]) : Number.NaN };
      }),
  );

test('low density gets the sturdy cut @type', async ({ browser }) => {
  const context = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await context.newPage();
  try {
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    const offenders = (await page.evaluate(readOpsz)).filter(
      ({ opsz }) => !Number.isFinite(opsz) || opsz > 16,
    );
    expect(
      offenders,
      "below 2dppx every Bodoni role must hold 'opsz' at 16 or under; above that the hairlines drop out",
    ).toEqual([]);
  } finally {
    await context.close();
  }
});

test('high density gets the fine cut back @type', async ({ browser }) => {
  const context = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await context.newPage();
  try {
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    const roles = await page.evaluate(readOpsz);
    expect(roles.length, 'the display roles must render').toBeGreaterThan(0);

    const notFine = roles.filter(
      ({ opsz }) => !Number.isFinite(opsz) || opsz < 18,
    );
    expect(
      notFine,
      "at 2dppx the fine cut must apply: every Bodoni role above 'opsz' 18",
    ).toEqual([]);

    const tooFine = roles.filter(({ opsz }) => opsz > 48);
    expect(tooFine, "the fine cut stops at 'opsz' 48").toEqual([]);
  } finally {
    await context.close();
  }
});

/**
 * Bodoni's ascenders and descenders are long. At leading below 1, the `p` of
 * one line collided with the `h` of the next in the opening headline.
 */
test('display leading clears the face descenders @type', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  const tight = await page.evaluate(
    (roles) =>
      roles
        .flatMap((role) =>
          [...document.querySelectorAll(role)].map((el) => {
            const style = getComputedStyle(el);
            const ratio =
              parseFloat(style.lineHeight) / parseFloat(style.fontSize);
            return { role, ratio: Math.round(ratio * 100) / 100 };
          }),
        )
        .filter(({ ratio }) => Number.isFinite(ratio) && ratio < 1.05),
    [...ROLES, 'h1', 'h2', 'h3'],
  );

  expect(tight, 'display leading must stay at or above 1.05').toEqual([]);
});

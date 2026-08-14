import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Blocking severity policy. This is the single place to tighten the gate:
// add 'moderate' / 'minor' here once a project is ready for them.
const BLOCKING_IMPACTS = ['serious', 'critical'];

test(
  'home page has no blocking accessibility violations',
  { tag: '@a11y' },
  async ({ page }) => {
    await page.goto('/');

    const { violations } = await new AxeBuilder({ page }).analyze();

    const blocking = violations.filter(
      (violation) =>
        violation.impact && BLOCKING_IMPACTS.includes(violation.impact),
    );

    expect(
      blocking,
      `Blocking accessibility violations (${BLOCKING_IMPACTS.join(', ')}):\n` +
        blocking
          .map(
            (v) =>
              `- [${v.impact}] ${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`,
          )
          .join('\n'),
    ).toEqual([]);
  },
);

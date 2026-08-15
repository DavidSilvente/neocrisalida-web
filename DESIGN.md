---
name: NeoCrisálida
description: One continuous 1.5px line draws the whole page, from a chrysalis in the dark to an open hand in the light.
colors:
  ground-1: '#16092b'
  ground-2: '#22103f'
  ground-3: '#301a58'
  ground-4: '#2b3768'
  ground-5: '#2f5578'
  ground-6: '#3f6c8c'
  ground-7: '#f7f3ee'
  violet: '#7b3fa0'
  blue: '#2e6d96'
  fuchsia: '#b0166f'
  fuchsia-lifted: '#f06bb2'
  ink: '#f0eaf8'
  ink-dim: '#c6b8e2'
  ink-dark: '#1d0f3c'
  ink-dark-dim: '#55456f'
  white: '#ffffff'
  line: '#b79ce8'
  line-2: '#7fc0e4'
typography:
  display-xl:
    fontFamily: 'Bodoni Moda, ui-serif, Georgia, serif'
    fontSize: 'clamp(2.75rem, 11vw, 6rem)'
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: '-0.035em'
    fontVariation: "'opsz' 72"
  display-l:
    fontFamily: 'Bodoni Moda, ui-serif, Georgia, serif'
    fontSize: 'clamp(2.15rem, 7vw, 3.75rem)'
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: '-0.028em'
    fontVariation: "'opsz' 48"
  title:
    fontFamily: 'Bodoni Moda, ui-serif, Georgia, serif'
    fontSize: 'clamp(1.25rem, 2.6vw, 1.6rem)'
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: '-0.02em'
    fontVariation: "'opsz' 24"
  said:
    fontFamily: 'Bodoni Moda, ui-serif, Georgia, serif'
    fontSize: 'clamp(1.35rem, 3.4vw, 2rem)'
    fontWeight: 500
    lineHeight: 1.24
    fontVariation: "'opsz' 32"
  field-line:
    fontFamily: 'Karla, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.6
  lede:
    fontFamily: 'Karla, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(1.15rem, 2.4vw, 1.4rem)'
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: 'Karla, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.0625rem'
    fontWeight: 400
    lineHeight: 1.65
  ui:
    fontFamily: 'Karla, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.9375rem'
    fontWeight: 400
    lineHeight: 1.5
  note:
    fontFamily: 'Karla, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.8125rem'
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: 'Karla, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: '0.14em'
rounded:
  none: '0'
  focus: '2px'
  pill: '999px'
spacing:
  gutter: '3.5rem'
  gutter-center: '1.75rem'
  shell: '78rem'
  shell-pad-inline: '1.25rem'
  stage-pad: 'clamp(5.5rem, 14vh, 9rem)'
  stack-tight: 'clamp(1.25rem, 2.5vw, 1.75rem)'
  stack-loose: 'clamp(2rem, 5vw, 3rem)'
  stroke: '1.5px'
components:
  action:
    backgroundColor: '{colors.fuchsia}'
    textColor: '#ffffff'
    typography: '{typography.body}'
    rounded: '{rounded.pill}'
    padding: '0.95rem 1.9rem'
  action-hover:
    backgroundColor: 'color-mix(in oklab, #b0166f 88%, #fff)'
    textColor: '#ffffff'
  action-pending:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    rounded: '{rounded.pill}'
    padding: '0.95rem 1.9rem'
  field:
    backgroundColor: 'transparent'
    textColor: '{colors.ink-dim}'
    rounded: '{rounded.none}'
    padding: '1rem 0 0'
  portrait:
    backgroundColor: 'transparent'
    textColor: '{colors.ink-dim}'
    rounded: '{rounded.none}'
    padding: '1.5rem'
    width: 'min(100%, 22rem)'
  masthead-action:
    backgroundColor: 'transparent'
    textColor: '{colors.ink-dim}'
    typography: '{typography.ui}'
  masthead-action-hover:
    textColor: '{colors.ink}'
  wordmark:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    rounded: '{rounded.none}'
  skip-link:
    backgroundColor: '{colors.fuchsia}'
    textColor: '#ffffff'
    rounded: '{rounded.none}'
    padding: '0.75rem 1.25rem'
---

# Design System: NeoCrisálida

## Overview

**Creative North Star: "The Trace That Completes"**

The whole page is one drawing. A single 1.5px line enters at the top of the
document wound into a chrysalis, runs down the left gutter through every
section, blooms sideways into a lobe, then a wing, then a head with antennae,
and finally leaves the margin altogether to finish as the open hand with the
butterfly lifting off it. Nothing on the page is decorated with a butterfly;
the butterfly is the page's construction. This is why the world can be dark,
quiet and almost imageless and still not feel empty — the line is doing the
work that photography and illustration usually do.

The ground travels with the line. Seven stage grounds move from a nearly black
violet (#16092b) through indigo and slate blue to a warm off-white (#f7f3ee) at
the close, and each stage bleeds into the next with a top gradient so the
sequence reads as one continuous environment rather than seven stacked bands.
Everything else travels with it too: the reading measure widens from 30ch to
56ch, the vertical padding grows stage by stage, and the content column drifts
outward from the spine. The visitor's experience of "opening up" is built from
layout, not from copy telling them it happens.

The register is editorial and restrained: a high-contrast Bodoni Moda for
display against a plain Karla for text, no cards, no rounded panels, no
shadows at rest, no filled shapes anywhere except one accent button and a
handful of four-point sparks. The one saturated colour, fuchsia (#b0166f), is
the colour Carmen actually wears in the published material, and it appears only
where the visitor is meant to act. The build carries zero JavaScript, and the
drawing does not animate: it is whole the moment the page arrives.

**Key Characteristics:**

- One continuous stroke, one weight (1.5px), non-scaling at every size
- A seven-step ground that travels dark→light across the document
- Type set from a spine in the left gutter, never centred
- Flat at rest: no shadows, no cards, no radius except one pill
- Fuchsia as the single live colour, used only for action
- Zero JavaScript; the drawing is static and whole on arrival

## Colors

A violet-to-daylight journey used as one continuous environment, with the brand's
own violet, blue and fuchsia held back as ink and accent.

### Primary

- **Live Fuchsia** (`{colors.fuchsia}`): The only filled, saturated colour in the
  system. It appears on the live action button, the text selection highlight,
  and the skip link — that is, only where the visitor can do something.
- **Lifted Fuchsia** (`{colors.fuchsia-lifted}`): The interaction-state sibling.
  Used exclusively for the focus ring (`2px` outline, `3px` offset) and the text
  caret, so keyboard focus is unmistakable against every ground.

### Secondary

- **Brand Violet** (`{colors.violet}`): The line's true colour, but only on the
  final light stage, where the stroke is finally drawn in the real brand ink.
  Also colours the closing pull-quote.
- **Brand Blue** (`{colors.blue}`): The second ink of the line, carried by the
  `ink-blue` stroke class — the hand in the closing figure is drawn in blue
  while the butterfly above it stays violet.

### Neutral

- **Contained Ground** (`{colors.ground-1}` → `{colors.ground-4}`): The dark half
  of the journey — near-black violet, deep violet, violet, and the indigo where
  the hue starts turning toward blue.
- **Opening Ground** (`{colors.ground-5}`, `{colors.ground-6}`): Slate and dusty
  blue. The world is measurably lighter here, so the ink lifts to compensate.
- **Daylight Ground** (`{colors.ground-7}`): Warm off-white. The only light stage,
  used for the closing call and the footer, and the only place the palette
  inverts to dark ink.
- **Ink** (`{colors.ink}`) and **Dimmed Ink** (`{colors.ink-dim}`): Primary and
  secondary text on the dark half. Dimmed ink is re-declared per stage
  (`#d6cbee` at stage 5, `#eee7fb` at stage 6) so contrast is held as the ground
  lightens rather than assumed.
- **Dark Ink** (`{colors.ink-dark}`, `{colors.ink-dark-dim}`): The inverted text
  pair on the daylight stage.
- **Line** (`{colors.line}`) and **Line Blue** (`{colors.line-2}`): The stroke's
  colour on the dark half — a lilac and a pale blue. Both lift at stage 6
  (`#ded2f8`, `#d3ecfa`) and become the true brand violet and blue at stage 7.

### Named Rules

- **White** (`{colors.white}`): Not a ground and never a surface. It exists only
  as the text colour on fuchsia — the live action, the skip link, and the
  selection highlight.

**The One Live Colour Rule.** Fuchsia is the only saturated fill in the system.
If an element is fuchsia, the visitor can act on it. Never use it for emphasis,
decoration, section headers, or hover states on non-interactive elements.

**The Travelling Ground Rule.** Backgrounds are a sequence, not a set. A new
section takes the next ground in the journey and bleeds from the previous one;
it never reuses an earlier ground or introduces a colour outside the seven.

**The Ink Lifts With The Ground Rule.** Whenever a stage's ground lightens, its
`ink-dim` and `line` values are re-declared on that stage to hold 4.5:1 for body
text and 3:1 for the stroke. Contrast is re-stated per stage, never inherited on
faith.

## Typography

**Display Font:** Bodoni Moda (with `ui-serif`, Georgia, serif)
**Body Font:** Karla (with `ui-sans-serif`, `system-ui`, sans-serif)

Both are self-hosted as variable `woff2` subsets from `public/fonts/` (Latin and
Latin-Extended, roman and italic), with `font-display: swap` and the two roman
Latin subsets preloaded.

**Character:** A high-contrast didone against a plain, slightly quirky grotesque.
Bodoni carries all the emotion — the headings are large, tightly tracked and set
almost solid — while Karla stays completely level and unliterary, so the copy
about difficult subjects never sounds performed.

### Hierarchy

- **Display XL** (`{typography.display-xl}`): The journey's three loudest
  moments only — the opening, the manifesto ("Lo que callamos también necesita
  un lugar."), and the closing question. Set nearly solid (0.98) and tightly
  tracked.
- **Display L** (`{typography.display-l}`): Every stage heading between them.
- **Title** (`{typography.title}`): The situation names inside the list.
- **Said** (`{typography.said}`): Bodoni italic. The pull-quote voice used for the
  short line at the end of a stage that reads as something spoken. Capped at
  26ch and drawn in the line's colour, so it belongs to the drawing rather than
  to the running text.
- **Lede** (`{typography.lede}`): The paragraph directly under a heading.
- **Field Line** (`{typography.field-line}`): The one-line recognition sentence
  under a situation title — a step below body so the title leads.
- **Body** (`{typography.body}`): Running text; steps up to `1.125rem` at 48rem.
- **UI** (`{typography.ui}`): Interface text that is neither content nor
  caption — the masthead links and the colophon.
- **Note** (`{typography.note}`): Captions, figure notes, the button's
  explanatory note. Capped at 34ch.
- **Label** (`{typography.label}`): Uppercase, wide-tracked Karla. Reserved for the
  `Pendiente` marker on placeholder content.

### Named Rules

**The Optical Size Rule.** Every Bodoni role sets `font-variation-settings` with
an `opsz` matched to its rendered size (72 / 48 / 32 / 28 / 24 / 18). A Bodoni
heading without a matched `opsz` is a defect, not a shortcut.

**The Travelling Measure Rule.** The reading measure widens with the journey:
30ch, 34ch, 42ch, 42ch, 48ch, 52ch, 56ch across the seven stages. A new stage
takes the measure of its position; it does not pick a comfortable default.

**The Level Voice Rule.** Karla is never tracked, uppercased, or weighted for
emphasis, with exactly two exceptions: the `Pendiente` placeholder label, and
the single eyebrow above the opening headline, which the brief asks for by name
to orient a visitor arriving from a social bio. No second eyebrow, and no
small-caps section tags anywhere else. _This is the one place the build departs
from the craft floor, which refuses eyebrows outright; it is here because the
brief specified it, not because the pattern was reached for._

## Layout

The page is a stack of full-bleed stages. Inside each stage a `shell` centres a
78rem maximum and lays out a two-column grid: a fixed gutter column
(`3.5rem` → `7.5rem` at 48rem → `10rem` at 80rem) and the content column.
**All content sits in column two.** The gutter is not padding — it is the
corridor the line lives in, and the straight run of the stroke is positioned at
`1.25rem + var(--nc-gutter-center)` so it lands on the same axis at every
breakpoint. Breakpoints are `48rem` and `80rem`; there are no others.

Vertical rhythm is one scale expressed as clamps: stage padding grows stage by
stage (from `clamp(4rem, 9vh, 6rem)` at the opening to `clamp(9.5rem, 22vh, 15rem)`
at the close), more space sits above a heading than below it, and within a group
the lede is `clamp(1.25rem, 2.5vw, 1.75rem)` from its heading while a pull-quote
or an action is `clamp(2rem, 5vw, 3rem)` or more away.

From 48rem up, the content column also drifts away from the spine as the journey
opens: no offset for stages 1–2, then `clamp(0rem, 3vw, 3rem)` at stages 3–4,
6vw at 5, 9vw at 6 and 12vw at 7. The layout widens along with the ground.

The situations list is a deliberately unequal 12-column field, not a card grid:
three widths and two vertical offsets repeating every third item
(`span 5` from column 1, `span 4` from column 7 with a top offset, `span 6` from
column 2), so the rhythm holds whether there are six items or ten. Below 48rem it
collapses to a single stacked column.

### Named Rules

**The Spine Rule.** Content is measured from the left gutter, never centred. A
new section inherits the shell grid and places itself in column two; nothing is
`margin-inline: auto` except the shell and masthead themselves.

**The Outward Drift Rule.** A stage later in the journey sits further from the
spine and reads wider than the one before it. Opening is expressed as geometry
before it is expressed as words.

**The Irregular Field Rule.** Repeating content is laid out as an irregular
field on a 12-column grid, never as equal cards in a row. If a set of items
looks like a card grid, it is wrong.

## Elevation & Depth

The system is flat. There are no resting shadows, no elevated surfaces, no
layered panels, and no `backdrop-filter` anywhere. Depth is built two ways: by
the travelling ground (each stage's `::before` bleeds the previous ground down
`clamp(6rem, 18vh, 14rem)` from the top edge, `clamp(10rem, 30vh, 22rem)` into
the light stage) and by the line, which is the only thing that ever sits in
front of content — and even then it is `pointer-events: none`, `z-index: 0`,
behind the copy.

### Shadow Vocabulary

- **Action lift** (`box-shadow: 0 10px 24px -10px color-mix(in oklab, var(--nc-fuchsia) 75%, transparent)`):
  The only shadow in the system. It exists solely on the live action button's
  hover state, tinted with the button's own colour rather than black.

### Named Rules

**The Flat-At-Rest Rule.** Nothing casts a shadow at rest. A shadow is a response
to pointer state on an interactive element, tinted with that element's own
colour — never a neutral black drop used to separate a surface from its ground.

## Shapes

The form language is a single drawn stroke. Every path in the drawing is
`fill: none`, `stroke-width: 1.5px`, `stroke-linecap: round`,
`stroke-linejoin: round`, with `vector-effect: non-scaling-stroke` so the line
holds exactly 1.5px regardless of how the SVG is scaled — including the vertical
run, which is a non-uniformly scaled `viewBox="0 0 2 100"` path stretched to any
stage height. The only filled marks are the four-point sparks, a shape the
published brand material already uses.

The same 1.5px stroke is the system's rule weight: the top border of a situation
field and the border of the portrait frame are both `var(--nc-stroke)` in the
line's colour at 60% opacity, so a divider is visibly the same line as the
drawing.

Corners are square everywhere. There is exactly one radius in the system — the
`999px` pill on the action button — plus a `2px` rounding on the focus ring.
There are no cards, no rounded containers, no clipped media shapes.

Figures are positioned by CSS custom properties keyed on `data-figure`:
`--spine-x` records where a figure's own spine axis falls as a fraction of its
viewBox width, and the placement rules subtract `--fig-w * --spine-x` so every
figure, whatever its geometry, enters exactly on the spine's axis.

### Named Rules

**The One Stroke Rule.** Every mark in the world is the same 1.5px non-scaling
stroke with round caps and joins. No second weight, no filled illustration, no
outline/solid pairing. New figures extend the existing line; they never start a
second one.

**The No Card Rule.** Content is separated by space and by rules drawn in the
line's own weight, never by a filled or rounded container. The only radius in
the system is the action pill.

**The Spine Entry Rule.** A new figure declares its `--spine-x` and enters on the
spine axis. A figure that floats free of the axis breaks the fiction that the
page is one drawing.

## Components

### Buttons

- **Shape:** Full pill (`999px`), no border, generous horizontal padding
  (`0.95rem 1.9rem`), inline-flex with a `0.75rem` gap for a trailing element.
- **Primary (the live action):** Fuchsia fill, white text, Karla 600 at
  `1.0625rem`. Used twice on the surface: the opening action and the closing
  action.
- **Hover:** Background mixes 12% white in, the button rises `-2px`, and the
  single system shadow appears. All three transition over `380ms` on
  `cubic-bezier(0.16, 1, 0.3, 1)`, and all three are removed entirely under
  `prefers-reduced-motion: reduce`.
- **Focus:** Inherits the global ring — `2px solid` lifted fuchsia at `3px`
  offset.
- **Pending (provisional):** The unresolved closing action is `aria-disabled`
  rather than `disabled`, so it stays focusable and its explanatory note stays
  reachable by keyboard. It is drawn rather than filled (transparent background,
  ink text, `1.5px` border) with hover motion removed, so it can never be
  mistaken for the live action. _Its border is currently dashed — the only dashed
  stroke in a world otherwise built from one continuous line. Treat the
  keep-it-focusable behaviour as the rule and the dashed treatment as an
  unresolved detail, not a pattern to copy._

### Situation Fields

- **Style:** No container. A `1.5px` rule across the top in the line's colour at
  60%, `1rem` of padding beneath it, a Bodoni title and a dimmed Karla line at
  `1rem`/1.6.
- **Layout:** The irregular 12-column field described in Layout.

### Portrait / Media Frame

- **Corner Style:** Square (`0`).
- **Style:** A `4 / 5` frame capped at `22rem`, bordered in the `1.5px` line at
  60%, filled with a 45° hatch drawn from the line colour at 9% over a
  half-transparent dark ground. Content is centred inside `1.5rem` of padding.
- **Role:** This is the placeholder treatment for media that does not exist yet.
  It carries the uppercase `Pendiente` label and a caption saying what is
  missing. It is honest scaffolding, not a decorative frame — a real image
  replaces the whole element.

### Navigation

- **Style:** There is no menu. The page is one journey rather than a set of
  destinations, so the masthead carries the identity and a single quiet action.
  Flat above the first stage — wordmark left, `¿Hablamos?` right,
  baseline-aligned. No bar, no background, no border, not sticky.
- **Wordmark:** Bodoni at `1.35rem` (`opsz` 18) with the second half of the name
  in the line's colour.
- **Masthead action:** Dimmed ink at the UI step, underlined with the world's
  own `1.5px` rule rather than a text-decoration, brightening to full ink over
  `240ms` on hover (removed under reduced motion).
- **Skip link:** Offscreen until focused, then pinned at `0.75rem` in fuchsia on
  white.

### The Journey Line (signature)

The system's defining component, in two parts.

- **The run** (`Spine`): a vertical path in a `viewBox="0 0 2 100"` SVG with
  `preserveAspectRatio="none"`, absolutely positioned in the gutter and stretched
  to the stage's full height. Non-uniform scaling plus a non-scaling stroke gives
  an exact 1.5px line at any height with no hard-coded measurement.
- **The figures** (`JourneyFigure`): seven named moments — `crisalida`,
  `desprendimiento`, `ala`, `antenas`, `simetria`, `apertura`, `mano` — each a
  single unbroken path, wings mirrored by negating x and reversing each cubic's
  control points so symmetry is exact rather than eyeballed. Narrow figures ride
  in the gutter beside the copy (`placement="gutter"`); wide ones leave the
  gutter and take the page as the stage's closing image (`placement="flow"`), so
  the stroke never crosses running text. Every path carries `pathLength="1"` so
  one dash rule draws all of them, and every figure is `aria-hidden`.

**Motion.** None. The drawing is static. It was previously revealed by CSS
scroll-driven animation (`animation-timeline: view()`), which was removed
because Chrome and WebKit resolved the range differently on subjects taller
than the scrollport: the wide figures sat between 53% and 69% drawn in Chrome
at the moment a reader met them, while WebKit completed them. An element that
carries the whole page may not render differently per engine. The interaction
transitions on the action and the masthead link are unaffected and remain.

## Do's and Don'ts

### Do:

- **Do** extend the existing line. New figures are new moments of the same
  continuous stroke, declare a `--spine-x`, and enter on the spine axis.
- **Do** keep every mark at `1.5px` with `vector-effect: non-scaling-stroke`,
  round caps and round joins.
- **Do** take the next ground in the journey for a new section and bleed it from
  the one before, and re-declare that stage's `ink-dim` and `line` if the ground
  has lightened.
- **Do** set content in the shell's second column, measured from the gutter, at
  the measure its position in the journey calls for (30ch → 56ch).
- **Do** match `opsz` to the rendered size on every Bodoni role.
- **Do** put per-instance geometry in the stylesheet keyed on a `data-*`
  attribute. The harness CSP is `default-src 'self'` with no `style-src-attr`
  allowance, so an inline `style` attribute will not apply. This is a hard
  constraint on every future surface.
- **Do** self-host fonts as `woff2` subsets in `public/fonts/` with
  `font-display: swap`, and preload only the roman Latin subsets. `font-src` is
  `'self'`; a Google Fonts link will be blocked.
- **Do** keep the drawing whole on arrival. If a reveal is ever reintroduced,
  it must finish identically in Chrome and WebKit at every subject height, and
  `e2e/journey-line.spec.ts` must be updated to prove it rather than relaxed.
- **Do** mark unresolved content with the uppercase `Pendiente` label plus a
  caption saying what is missing and what will replace it.
- **Do** keep an unresolved action `aria-disabled` and focusable, with its
  explanation wired through `aria-describedby`.

### Don't:

- **Don't** add JavaScript for visual behaviour. The surface ships with zero JS
  and the drawing does not depend on any.
- **Don't** hide any part of the line behind a scroll-driven reveal. It was
  tried; the engines disagreed and readers met half-drawn figures.
- **Don't** use an inline `style` attribute anywhere. It is silently dropped by
  the CSP.
- **Don't** introduce a second stroke weight, a filled illustration, or an
  outline-plus-solid pairing. The only filled marks are the four-point sparks
  and the one fuchsia action.
- **Don't** build a card grid, a rounded panel, or an equal three-across row of
  services. Repeating content is an irregular 12-column field.
- **Don't** add a radius. The pill on the action button and the `2px` focus ring
  are the only two in the system.
- **Don't** add a resting shadow. The only shadow is the action's hover lift,
  tinted with its own colour.
- **Don't** use fuchsia for anything the visitor cannot act on, and don't
  introduce a second accent colour.
- **Don't** centre content or set a heading centred. Everything is measured from
  the spine.
- **Don't** add a second eyebrow, kicker, or uppercase section tag. The opening
  eyebrow is brief-mandated and singular; everywhere else the heading carries
  its own weight.
- **Don't** reintroduce a navigation menu. Sections are reached by scrolling;
  the masthead offers identity and one action, nothing else.
- **Don't** reach for a gradient hero, a stock photograph, or a decorative
  butterfly graphic. The line is the imagery.

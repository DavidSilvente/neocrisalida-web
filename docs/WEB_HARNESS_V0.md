# Web Harness v0

## Purpose

Provide a reusable technical baseline for professional client marketing websites.

This repository is infrastructure, not a website template and not a visual design system.

The harness must provide the tooling, validation, testing, deployment support, and security baseline required to build client websites reliably without imposing visual decisions.

---

## Stack

- Astro
- TypeScript
- Tailwind CSS

---

## Core principles

1. **Infrastructure, not design.**
2. **Deterministic tools verify everything that can be verified deterministically.**
3. **Visual and UX decisions remain outside the harness.**
4. **The harness must not make different client websites look alike.**
5. **Avoid abstractions until repeated real-world use proves they are necessary.**
6. **Production-like validation is more important than dev-server validation.**
7. **The harness should remain small, understandable, and easy for coding agents to modify.**
8. **Every dependency must justify itself against an explicit requirement.**
9. **Do not solve hypothetical future problems.**
10. **The harness is allowed to provide capabilities, but not client-specific decisions.**

---

# Required capabilities

## 1. Foundation

The harness must provide:

- Astro project
- TypeScript in strict mode
- Tailwind CSS
- Local development server
- Production build
- Production preview
- Predictable project structure
- Package scripts for common validation tasks

---

## 2. Code quality

The harness must provide automated support for:

- Type checking
- Linting
- Formatting checks where useful
- Build validation

The long-term target is a single command:

```bash
npm run validate
```

That command should execute the deterministic validations required before a change is considered valid.

A failed deterministic check must return a non-zero exit code.

---

## 3. Testing infrastructure

The harness must provide infrastructure for:

- Unit tests where appropriate
- Integration tests where appropriate
- Browser/E2E testing with Playwright

The harness must not ship with a large generic E2E suite.

Only infrastructure and a minimal proof that the testing system works are required.

Project-specific critical flows will be added by individual websites.

---

## 4. Production-like browser testing

Browser testing must be able to run against a production build rather than relying exclusively on the development server.

Target flow:

```text
build
→ production-like server
→ Playwright
```

This is important because some failures only appear after the production build process.

---

## 5. Accessibility

The harness must provide automated accessibility validation.

Expected capabilities include:

- axe-core or equivalent integration
- detection of common accessibility violations
- support for accessibility checks from browser tests

Automated accessibility tooling does not replace project-specific UX review.

---

## 6. Performance

The harness must provide automated performance validation.

Expected capabilities include:

- Lighthouse CI or equivalent
- configurable performance budgets
- production-build measurement

Performance thresholds should be configurable per project when necessary.

The harness should provide sensible infrastructure, not enforce arbitrary business-independent scores.

---

## 7. Links

The harness must be able to detect relevant broken links.

At minimum:

- broken internal links
- invalid internal routes

External link validation may be handled separately because external services can be unavailable temporarily.

A failing internal link check should be able to fail CI.

---

## 8. Assets

The harness must provide deterministic checks for relevant asset problems.

Examples:

- referenced assets do not exist
- broken images
- invalid asset paths
- missing required image metadata where applicable
- missing `alt` attributes where required

The harness does not provide client assets.

---

# Content infrastructure

## 9. Typed content

The harness must provide infrastructure for structured and validated content using Astro Content Collections and Zod where appropriate.

The objective is to support content such as:

```text
structured content
→ schema validation
→ build
```

The harness should make it possible for each client project to define schemas for:

- page content
- section content
- metadata
- reusable structured data

The harness must not define the final content model for every client.

---

## 10. Content schemas are project-specific

The harness may provide examples or infrastructure showing how schemas work.

It must NOT assume that every website contains:

- the same hero
- the same services structure
- the same testimonials
- the same CTA layout
- the same number of sections

Those decisions belong to the individual project.

---

# Server interaction infrastructure

## 11. Astro Actions

The harness must establish Astro Actions as the preferred technical path for lightweight server interactions when appropriate.

Target architecture:

```text
user input
→ Astro Action
→ Zod validation
→ server-side processing
→ success/error result
```

The harness should make this path easy to adopt.

---

## 12. Zod validation

Server interactions should support validation using Zod.

The intention is to use a consistent validation model across:

- structured content
- server actions
- forms

Schemas do not need to be shared literally when the domain requirements differ.

The value is having a consistent validation approach.

---

## 13. Forms

The harness must provide the infrastructure necessary to build robust forms.

Relevant concerns include:

- server-side validation
- client feedback
- loading state
- success state
- failure state
- spam protection
- rate limiting where appropriate
- privacy consent where required
- safe handling of submitted data
- testing

However:

> **Web Harness v0 must NOT define a universal production contact form.**

A minimal proof-of-concept form/action may exist only to verify that the infrastructure works.

The final reusable form abstraction, if one is eventually justified, should emerge from real client projects.

---

# Security baseline

## 14. General security philosophy

The harness should provide a secure baseline without pretending that a static marketing website has the same threat model as a complex application.

Security requirements should remain proportional to the actual system.

---

## 15. Content Security Policy

The harness should support Astro's native CSP capabilities where appropriate.

The harness must not assume that Astro CSP replaces all host-level HTTP security configuration.

---

## 16. Security headers

The deployment configuration should support relevant security headers where appropriate.

Examples may include:

- Content-Security-Policy
- Strict-Transport-Security
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

Exact policy values may depend on deployment environment and project requirements.

---

## 17. Secrets

The harness must encourage safe secret handling.

Requirements:

- secrets must not be committed to Git
- `.env` files containing secrets must be excluded appropriately
- secret scanning should be supported in CI
- public/client-visible environment variables must be clearly distinguished from server-only secrets

---

## 18. Dependencies

The harness should provide automated dependency/security checking.

The specific tool should be chosen during implementation based on current ecosystem support.

The objective is to detect known vulnerable dependencies without introducing unnecessary tooling duplication.

---

## 19. Third-party scripts

The harness should make third-party scripts explicit.

Examples:

- analytics
- pixels
- chat widgets
- marketing scripts
- embedded services

Third-party scripts must not be silently added as part of the harness.

Each client project should deliberately choose them because they affect:

- privacy
- security
- performance
- CSP
- consent requirements

---

# Design infrastructure

## 20. Tailwind as token infrastructure

The harness provides Tailwind as the mechanism through which a client project can define an executable design system.

The harness itself must NOT ship with a client visual identity.

A project should later be able to define:

- colors
- typography
- spacing rules
- radii
- breakpoints when necessary
- other design tokens

---

## 21. No predefined visual identity

The harness must NOT define:

- brand colors
- client typography
- visual personality
- section aesthetics
- decorative styles
- animation style
- client-facing component design

Different websites created from the harness must not inherit the same aesthetic by default.

---

## 22. Restricting design tokens

Individual projects may later restrict Tailwind's available design tokens.

For example, a project may remove the default color namespace and expose only approved semantic colors.

Projects may also add deterministic checks for:

- arbitrary spacing
- arbitrary colors
- arbitrary radii
- values outside the approved design system

Those restrictions belong to the project design system, not to the generic visual identity of Web Harness v0.

---

# CI

## 23. Continuous Integration

The harness must provide CI capable of running deterministic quality gates automatically.

The exact provider may depend on repository hosting.

CI should eventually be able to run checks such as:

```text
typecheck
lint
tests
build
content validation
accessibility
links
assets
security checks
browser tests
performance checks
```

Not every tool needs to be installed immediately.

Implementation should be incremental.

---

## 24. Deterministic failures

If a deterministic quality gate fails, CI must fail.

An LLM reviewer should not be required to determine whether:

- TypeScript compiles
- lint rules pass
- tests pass
- internal links exist
- schemas validate
- accessibility tooling reports a configured blocking violation

Those decisions belong to tools.

---

# Validation command

## 25. Single local validation entry point

The eventual target is:

```bash
npm run validate
```

This command should provide a convenient way to run the relevant deterministic checks before pushing changes.

It may internally call several smaller scripts.

Example conceptual structure:

```text
validate
├── typecheck
├── lint
├── test
├── build
└── other configured gates
```

The exact implementation will be decided incrementally.

---

# Deployment

## 26. Production preview

The harness must support production-like preview deployments.

Desired flow:

```text
branch / pull request
→ CI
→ production build
→ preview deployment
→ preview URL
```

The application code should avoid unnecessary coupling to a specific hosting provider.

Provider-specific deployment configuration is acceptable when required.

---

## 27. Production build as source of truth

Reviews of the final product should use the production build or a production-like preview whenever possible.

The development server is useful for development, but it is not sufficient as the only validation environment.

---

# Must NOT provide

Web Harness v0 must NOT include any of the following unless real-world use later proves them necessary:

- predefined brand colors
- predefined client typography
- opinionated visual direction
- Hero component
- Services component
- Testimonials component
- Pricing component
- Team component
- FAQ component
- reusable marketing section library
- predefined marketing layouts
- client-facing page templates
- client copy
- client images
- client assets
- client-specific SEO content
- client-specific analytics
- a universal CMS abstraction
- a supposedly universal final contact form
- abstractions justified only by hypothetical future reuse

---

# Explicit non-goals

Web Harness v0 is NOT:

- a website builder
- a visual template
- a component library
- a design system
- a CMS
- an autonomous agent pipeline
- Senku's orchestration system
- Levi's review system
- a replacement for project-specific product decisions
- a replacement for project-specific design decisions
- a replacement for project-specific copy
- a replacement for human approval where authority is required

Those systems may use the harness later.

---

# What may exist as proof of infrastructure

Minimal technical examples are acceptable when required to prove that infrastructure works.

Examples:

- one trivial Content Collection schema
- one trivial Astro Action
- one trivial Playwright test
- one minimal accessibility test
- one minimal page

These examples exist only to test infrastructure.

They must not evolve into client-facing design conventions accidentally.

---

# Visual requirements

There are effectively none.

The example website may be visually trivial.

For example:

```text
Web Harness

Everything works.
```

is sufficient.

Visual quality is explicitly NOT a success criterion for Web Harness v0.

---

# Success criteria

Web Harness v0 is successful when a minimal Astro project can:

1. run locally;
2. use TypeScript strict mode;
3. use Tailwind CSS;
4. build successfully for production;
5. serve or preview the production build;
6. validate structured content;
7. support Astro Actions with Zod validation;
8. execute automated tests;
9. execute browser tests;
10. execute automated accessibility validation;
11. check relevant links/assets;
12. support automated performance validation;
13. apply the defined security baseline;
14. execute deterministic gates in CI;
15. provide a documented local validation command;
16. produce a production-like preview deployment.

---

# Development philosophy

Implementation must be incremental.

Before adding a dependency, abstraction, script, or tool, answer:

1. What explicit requirement does this satisfy?
2. Why is the existing stack insufficient?
3. Is this generic infrastructure or a client-specific concern?
4. Can the same requirement be solved more simply?
5. Are we adding something because we need it now, or because we imagine we may need it later?

If the answer is hypothetical future reuse, do not add it yet.

---

# Current development rule

Do not implement Web Harness v0 in one large change.

First inspect this specification and divide implementation into small, independently verifiable milestones.

Each milestone should have:

- one clear objective;
- explicit dependencies;
- explicit acceptance criteria;
- a deterministic verification method where possible;
- minimal scope.

Do not introduce visual components, client-specific abstractions, or speculative architecture while implementing the harness.

---

# Guiding sentence

> **The harness is infrastructure we can design in advance. The starter is something we will discover from real client websites.**

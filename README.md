# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Runtimes and deployment

The project builds with two adapters, selected by the `DEPLOY_TARGET`
environment variable:

| Context                         | `DEPLOY_TARGET` | Adapter                      |
| :------------------------------ | :-------------- | :--------------------------- |
| Local dev, all gates, GitHub CI | unset           | `@astrojs/node` (standalone) |
| Vercel                          | `vercel`        | `@astrojs/vercel`            |

Vercel sets it through `buildCommand` in `vercel.json`, so the choice is
version-controlled rather than inferred from the environment. Every quality gate
(`test:e2e`, `test:a11y`, `test:security`, `check:links`, `test:perf`) runs
against the Node standalone server and never depends on Vercel being reachable.

Rendering is unchanged by the target: pages are prerendered by default and only
routes that opt out with `export const prerender = false` render on demand.

### Deployments

- Production branch: `master`
- Every branch and pull request gets a **Preview Deployment** through Vercel's
  native Git integration — no GitHub Action deploys anything.
- No custom domain is configured yet; previews use generated `*.vercel.app` URLs.

## Supply chain policy

CI runs three dependency audits with deliberately different severities.

| Audit                                     | Behaviour     | Rationale                                               |
| :---------------------------------------- | :------------ | :------------------------------------------------------ |
| `npm audit --omit=dev --audit-level=high` | **Blocking**  | Anything shipped to users must be free of high/critical |
| `npm audit --audit-level=critical`        | **Blocking**  | A critical advisory anywhere is never acceptable        |
| `npm audit`                               | Informational | Keeps dev-only findings visible without blocking        |

### Known accepted exception

The full tree currently reports **high** advisories reaching us transitively
through `@lhci/cli` (performance tooling). Web Harness v0 accepts them because:

- `npm audit --omit=dev --audit-level=high` is clean — they are dev-only and
  never reach the production runtime or any user.
- No non-breaking upstream fix exists for the installed version; `npm audit fix
--force` would downgrade `@lhci/cli` to `0.1.0`, a breaking change.
- Production high/critical and full-tree critical both remain blocking.

The policy is expressed purely as severity thresholds, with no advisory IDs
hardcoded anywhere. When upstream ships a fix, the informational audit simply
goes clean — nothing needs to be edited or un-suppressed.

CI never mutates dependencies: `npm audit fix` is not run in any workflow.

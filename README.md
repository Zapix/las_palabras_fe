# las_palabras_fe — archived

> **This repository is archived and no longer maintained.**
> The frontend moved to the monorepo **[Zapix/las_palabras_bot](https://github.com/Zapix/las_palabras_bot)**,
> under [`apps/web`](https://github.com/Zapix/las_palabras_bot/tree/main/apps/web).

## What happened

- The code was imported into `las_palabras_bot` with its full git history
  ([PR #87](https://github.com/Zapix/las_palabras_bot/pull/87)). Commit SHAs from this
  repository are unchanged there, so links to old commits still resolve in the monorepo.
- The only open issue (#10) was transferred to
  [Zapix/las_palabras_bot#86](https://github.com/Zapix/las_palabras_bot/issues/86).
- API types are now generated from the committed OpenAPI contract
  (`contracts/openapi/api.json`) instead of a running backend, and CI, linting and the
  pre-commit hook are shared with the API.

## Where to go now

- Code: [`apps/web`](https://github.com/Zapix/las_palabras_bot/tree/main/apps/web)
- Setup and development: [apps/web/README.md](https://github.com/Zapix/las_palabras_bot/blob/main/apps/web/README.md)
- Issues and pull requests: [Zapix/las_palabras_bot](https://github.com/Zapix/las_palabras_bot/issues)

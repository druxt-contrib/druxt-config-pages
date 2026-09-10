# Agent instructions

The DruxtJS Config Pages module: a Druxt module that renders Drupal
`config_pages` entities.

## Rules

- **This repository is public.** Nothing that resolves only on a private
  network may reach a tracked file: no internal URLs, hostnames, repository
  names or issue links, in any file including comments and patch descriptions.
  `yarn lint:private` enforces the URL-shaped half of this and runs in the
  pipeline. It cannot catch an internal name written as prose, so that part is
  on you.
- **Conventional Commits**, and the same for pull request and merge request
  titles. These repositories squash-merge, so the title becomes the commit
  subject, and a prose title breaks the next push to the target branch.
- **The coverage floor in `jest.config.js` goes up, never down.** If a change
  drops coverage, the change needs a test.
- **No AI tool is credited.** No co-author trailer naming an assistant, no
  generated-with footer, no session link, in commits, merge request
  descriptions or tracked files. The work is the author's. The commit-msg hook
  rejects it locally, and `yarn lint:attribution` and the pipeline check
  the rest.
- **Prose is linted with Vale.** The ai-tells style is the minimum, and it
  covers the markdown a change touches, its commit messages and the merge
  request description. `yarn lint:prose:install` once, then
  `yarn lint:prose`.

## Layout

| Path               | Purpose                                                               |
| ------------------ | --------------------------------------------------------------------- |
| `src/`             | The module. `index.js` is the Nuxt module                             |
| `test/`            | Unit tests                                                            |
| `example/`         | A Drupal backend and a Nuxt application that loads the module         |
| `templates/`       | Files the module copies into a consuming application                  |
| `scripts/`         | Repository tooling, excluded from the package                         |
| `.githooks/`       | Committed hooks, enabled by `yarn install`                            |
| `.gitlab/scripts/` | Content checks and merge-request automation, copied from the standard |

## Commands

```bash
yarn install        # dependencies, and enables the git hooks
yarn build          # siroc
yarn test           # jest, coverage floor enforced
yarn lint           # every linter except prose
yarn lint:prose     # Vale, after `yarn lint:prose:install`
```

The `example/` application still targets Drupal 9 through DDEV. Moving it to
the Docker-free Drupal 11 setup the standard expects, and the end-to-end and
visual jobs that run against it, is a separate change.

## Toolchain

Pinned in `.mise.toml`. Node is deliberately held at 16.20.1 to match what the
module's own dependencies support; the lint tooling is pinned to versions that
still run there. Bumping either is a deliberate, coordinated change, not a
routine dependency update, so Renovate is configured not to offer it.

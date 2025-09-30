# Contributor Guide

> Professional contributor documentation. Last updated: 2025-09-30T19:25:00Z

## Welcome Contributors! 🎉

Thanks for helping us transform BuildMean8n into a production-grade automation platform. Phase 1 is focused on establishing a modern monorepo foundation—you can already clone, commit, and push changes as usual while we continue wiring up apps and packages.

## Repository Layout

- `apps/` — Product surfaces (REST API, web UI, workers). Scaffolding lands in phase 1.1.
- `packages/` — Shared TypeScript libraries (core engine, workflow models, UI kit, node catalog).
- `tools/` — Developer tooling (codegen, migration scripts, CLIs).
- `docs/` — Living documentation for architecture, workflows, and contribution guides.

The root `package.json` orchestrates builds, tests, and linting across all workspaces via npm.

## Local Development Setup

1. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/buildmean8n.git
   cd buildmean8n
   ```
2. **Use the right toolchain** — Node.js ≥ 20 and npm ≥ 9 (check via `node -v && npm -v`).
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Bootstrap Husky hooks (optional but recommended)** — automatically handled by `npm install`, or re-run manually with `npm run prepare`.

> **Note:** Workspace packages (`apps/*`, `packages/*`) are being scaffolded incrementally. Until their individual `package.json` files exist, commands like `npm run dev` or `npm run build --workspace @buildmean8n/api` will exit early. Linting, formatting, and TypeScript project references are already wired up.

## Verifying Before You Push

- **Lint & Format**
  ```bash
  npm run lint
  npm run format -- --check
  ```
- **Type-check**
  ```bash
  npm run typecheck
  ```
- **Tests** — App-specific suites will land alongside their scaffolds; for now, legacy tests remain under `test/`.

These checks are optional during the scaffold phase but will become required in CI once the new packages land.

## Git Workflow (Nothing Fancy Required)

1. Create a branch: `git checkout -b feature/short-description`
2. Stage changes: `git add <files>`
3. Commit: `git commit -m "feat(core): describe your change"`
4. Push exactly like before: `git push origin feature/short-description`

Husky hooks are currently informational only—if a check fails you can still push after addressing it or by passing `--no-verify`. CI pipelines will validate the branch after it lands on GitHub.

## Commit Quality Checklist

- Keep commits focused on a single concern.
- Reference GitHub issues/PRs where relevant (`fixes #123`).
- Use conventional commit prefixes (`feat`, `fix`, `docs`, `chore`, etc.).
- Update docs or tests alongside behavior changes.

## Getting Unstuck

- **Tooling issues** — file an issue and tag `tooling`.
- **Architecture questions** — start a discussion in GitHub Discussions.
- **Immediate help** — mention `@buildmean8n/maintainers` on your PR.

## What’s Coming Soon

- `apps/api` Fastify service scaffold
- `apps/web` Vite + React workspace
- Shared workflow engine in `packages/core`
- Automated lint/test pipelines in CI and per-branch status checks

Stay tuned! 🚀

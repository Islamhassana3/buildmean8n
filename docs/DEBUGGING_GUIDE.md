# Debugging Guide

_Last updated: 2025-09-30_

## Goals

1. Provide a repeatable workflow for debugging the existing Express static server during Phase 1.
2. Lay the groundwork for future workspace services (`apps/api`, `apps/web`, workers) so every package has a consistent debug story.
3. Enable container-aware debugging for the `frontend` service when it runs inside Docker or Railway.

## Roadmap

| Phase                     | Focus                                                                                         | Deliverables                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 1. Local Baseline         | Get `server.js` debuggable on any machine.                                                    | VS Code launch configs, npm debug scripts, documentation (this file).                         |
| 2. Workspace Expansion    | Bring the same tooling to new packages/apps as they land.                                     | Per-app launch configs, Turbo pipeline recipes, watch/debug scripts in each workspace.        |
| 3. Cloud & CI Integration | Ensure Railway, GitHub Actions, and other environments expose debugger endpoints when needed. | Railway debug profile, GitHub Actions artifact collection, production-safe inspector toggles. |

## Local Debugging (Today)

### Prerequisites

- Node.js ≥ 20 (project already requires this).
- npm ≥ 9 (ships with Node 20+).
- VS Code with the **JavaScript Debugger** extension enabled (bundled by default).

### npm Scripts

| Script                | Purpose                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| `npm start`           | Run the Express server in production mode.                                                     |
| `npm run start:debug` | Run the server with the Node inspector listening on `0.0.0.0:9229` (used inside Docker/CI).    |
| `npm run dev:server`  | Development mode with `--watch` and inspector exposed on port `9229` for hot-reload debugging. |

### VS Code Configurations

Located in `.vscode/launch.json`:

1. **Launch Server (local)** – Starts `server.js` directly with breakpoints enabled.
2. **Run npm run dev:server** – Executes the watch/inspect script so code changes auto-reload.
3. **Attach to frontend container** – Attaches to a running Docker container that exposes port `9229` (see Docker section below).

> Tip: Set breakpoints in any `.js`/`.ts` file before launching. The debugger stops on the first relevant line.

## Docker Debugging

### Files Added

- `docker-compose.debug.yml` – Overrides the `frontend` service to run `npm run start:debug`, expose port 9229, and mount the project folder for live edits.
- `.vscode/tasks.json` – Adds helper tasks:
  - `docker-compose up frontend (debug)` – Builds the image with the debug overrides and runs it in the background.
  - `docker-compose down (debug)` – Stops and removes the debug stack after you disconnect.

### Workflow

1. **Start the container**
   - Either run the VS Code launch config “Attach to frontend container” (auto-runs the `up` task), or
   - Manually execute `docker compose -f docker-compose.yml -f docker-compose.debug.yml up --build frontend`.
2. **Attach the debugger**
   - Use the same launch config or choose “Attach to frontend container” manually once the service is up.
3. **Tear down**
   - The launch config calls the `docker-compose down (debug)` task automatically when you stop debugging, or run it manually if needed.

### Notes

- The project root is bind-mounted into `/app` so edits on the host instantly reflect in the container.
- `node_modules` remains container-local to avoid native module mismatches (`/app/node_modules` named volume).
- Ensure your host firewall allows connections to port 9229.

## Extending to Future Workspaces

When new apps/packages ship, follow these conventions:

1. **Add npm scripts** per workspace (`start`, `start:debug`, `dev`, etc.) that expose the inspector on a well-known port.
2. **Update `.vscode/launch.json`** with the new script or attach target (e.g., `apps/api` on port 9230).
3. **Create compose overrides** mirroring `docker-compose.debug.yml` for any service that needs container debugging.
4. **Document quirks** in this guide so contributors know how to debug every component.

## Troubleshooting

| Symptom                                 | Fix                                                                                                                                        |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Breakpoints never hit                   | Ensure you’re using the matching launch config and the inspector port isn’t in use. Restart VS Code if Auto Attach was previously enabled. |
| Docker attach fails with `ECONNREFUSED` | Confirm `npm run start:debug` is running inside the container and port `9229` is exposed/bound.                                            |
| Source maps misaligned                  | Run with `--enable-source-maps` (already included in the launch profile) and rebuild if using transpiled TypeScript.                       |
| Node warns about `--watch`              | Requires Node ≥ 18.11; update your runtime to match the repo requirement (≥ 20).                                                           |

---

With these foundations in place, adding app-specific debugging (Fastify API, Vite web UI, workflow workers) is a matter of copying the established patterns and tweaking the port/script names.

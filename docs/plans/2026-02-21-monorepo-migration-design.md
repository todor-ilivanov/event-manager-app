# Monorepo Migration Design

**Date:** 2026-02-21
**Scope:** Merge `event-manager-api` into `event-manager-app` as a yarn workspaces monorepo

## Goal

Consolidate the two separate repositories (`event-manager-app` and `event-manager-api`) into a single monorepo with clean module separation. The `event-manager-api` repo will be deleted after migration.

## Repository Structure

```
event-manager-app/
├── package.json          ← root (private, yarn workspaces config)
├── yarn.lock             ← unified lockfile
├── docs/
│   └── plans/
└── packages/
    ├── app/              ← React UI (former event-manager-app)
    │   ├── package.json
    │   ├── public/
    │   ├── src/
    │   └── tsconfig.json
    └── api/              ← Serverless API (former event-manager-api)
        ├── package.json
        ├── serverless.yml
        ├── src/
        ├── models/
        ├── utils/
        ├── resources/
        ├── tests/
        └── tsconfig.json
```

## Root package.json

```json
{
  "name": "event-manager",
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "start": "yarn workspace app start",
    "build": "yarn workspace app build",
    "test": "yarn workspaces run test",
    "deploy": "yarn workspace api deploy"
  }
}
```

## Decisions

- **Package manager:** yarn workspaces — matches existing toolchain in both repos
- **Folder convention:** `packages/*` — standard monorepo convention
- **Package internals:** unchanged — each package keeps its own `package.json`, `tsconfig.json`, and build tooling
- **No shared packages** — no `packages/shared` introduced; YAGNI

## Migration Steps

1. Clone `event-manager-app` locally
2. Move existing app files → `packages/app/`
3. Fetch `event-manager-api` files via gh CLI → `packages/api/`
4. Add root `package.json` with workspaces config
5. Run `yarn install` to generate unified lockfile
6. Commit and push to `event-manager-app`

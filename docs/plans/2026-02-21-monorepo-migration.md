# Monorepo Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Merge `event-manager-api` into `event-manager-app` as a yarn workspaces monorepo under `packages/app` and `packages/api`.

**Architecture:** Move existing app files into `packages/app/`, pull API repo files into `packages/api/`, replace the root `package.json` with a yarn workspaces config. Each package keeps its own toolchain untouched.

**Tech Stack:** Yarn workspaces, React/TypeScript (app), Serverless Framework/TypeScript/DynamoDB (api)

**Working directory:** `~/dev/event-manager-app`

---

### Task 1: Scaffold packages/app — move existing UI files

**Files:**
- Create: `packages/app/` (directory)
- Move: `src/`, `public/`, `package.json`, `tsconfig.json` → `packages/app/`

**Step 1: Create the packages/app directory**

```bash
mkdir -p ~/dev/event-manager-app/packages/app
```

**Step 2: Move UI files into packages/app**

```bash
cd ~/dev/event-manager-app
mv src public package.json tsconfig.json packages/app/
```

**Step 3: Verify the structure**

```bash
ls packages/app/
```
Expected output: `package.json  public  src  tsconfig.json`

**Step 4: Commit**

```bash
git add -A
git commit -m "refactor: move UI files into packages/app"
```

---

### Task 2: Scaffold packages/api — copy API files from event-manager-api

**Files:**
- Create: `packages/api/` (directory)
- Copy from: cloned `event-manager-api` repo

**Step 1: Clone event-manager-api into a temp location**

```bash
gh repo clone todor-ilivanov/event-manager-api /tmp/event-manager-api
```

**Step 2: Create packages/api directory**

```bash
mkdir -p ~/dev/event-manager-app/packages/api
```

**Step 3: Copy all API files (excluding .git)**

```bash
rsync -av --exclude='.git' --exclude='node_modules' --exclude='yarn.lock' --exclude='package-lock.json' \
  /tmp/event-manager-api/ ~/dev/event-manager-app/packages/api/
```

**Step 4: Verify the structure**

```bash
ls ~/dev/event-manager-app/packages/api/
```
Expected output: `LICENSE  README.md  mockRequests  models  package.json  resources  serverless.yml  src  tests  tsconfig.json  utils`

**Step 5: Commit**

```bash
cd ~/dev/event-manager-app
git add packages/api/
git commit -m "feat: add API source into packages/api"
```

---

### Task 3: Add root package.json with yarn workspaces config

**Files:**
- Create: `package.json` (root)
- Remove: `yarn.lock` (will be regenerated)

**Step 1: Create the root package.json**

```bash
cat > ~/dev/event-manager-app/package.json << 'EOF'
{
  "name": "event-manager",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "start": "yarn workspace app start",
    "build": "yarn workspace app build",
    "test": "yarn workspaces run test",
    "deploy": "yarn workspace api deploy"
  }
}
EOF
```

**Step 2: Remove the old yarn.lock from root (will be regenerated)**

```bash
rm -f ~/dev/event-manager-app/yarn.lock
```

**Step 3: Commit the root package.json**

```bash
cd ~/dev/event-manager-app
git add package.json
git rm --cached yarn.lock 2>/dev/null || true
git commit -m "feat: add root package.json with yarn workspaces config"
```

---

### Task 4: Install dependencies and generate unified lockfile

**Step 1: Run yarn install from the repo root**

```bash
cd ~/dev/event-manager-app && yarn install
```

Expected: yarn resolves all workspaces and generates a single `yarn.lock` at the root. You may see warnings about peer deps — these are fine.

**Step 2: Verify workspaces are recognized**

```bash
cd ~/dev/event-manager-app && yarn workspaces info
```

Expected output includes both `app` and `api` packages with their dependency lists.

**Step 3: Commit the lockfile**

```bash
cd ~/dev/event-manager-app
git add yarn.lock
git commit -m "chore: add unified yarn.lock for workspaces"
```

---

### Task 5: Smoke-test each package

**Step 1: Check the UI package builds**

```bash
cd ~/dev/event-manager-app && yarn workspace app build
```

Expected: React app builds to `packages/app/build/` without errors.

**Step 2: Check the API package tests run**

```bash
cd ~/dev/event-manager-app && yarn workspace api test 2>&1 | head -30
```

Expected: jest runs and either passes or fails on existing tests (not a config/resolution error).

**Step 3: If build or tests pass, commit a note**

```bash
cd ~/dev/event-manager-app
git commit --allow-empty -m "chore: verify monorepo smoke tests pass"
```

---

### Task 6: Update root .gitignore

**Files:**
- Modify: `.gitignore`

**Step 1: Ensure node_modules is ignored at all levels**

Open `~/dev/event-manager-app/.gitignore` and confirm it contains at minimum:

```
node_modules/
packages/app/build/
packages/api/.serverless/
packages/api/.build/
```

Add any missing lines with your editor.

**Step 2: Commit**

```bash
cd ~/dev/event-manager-app
git add .gitignore
git commit -m "chore: update .gitignore for monorepo structure"
```

---

### Task 7: Push to GitHub

**Step 1: Push main branch**

```bash
cd ~/dev/event-manager-app && git push origin main
```

**Step 2: Verify on GitHub**

```bash
gh repo view todor-ilivanov/event-manager-app --web
```

Confirm `packages/app/` and `packages/api/` are visible in the GitHub UI.

---

### Task 8: Clean up

**Step 1: Remove the temp clone**

```bash
rm -rf /tmp/event-manager-api
```

**Step 2: You can now delete the event-manager-api repo on GitHub when ready**

```bash
# Only run this when you are certain the migration is complete
gh repo delete todor-ilivanov/event-manager-api --yes
```

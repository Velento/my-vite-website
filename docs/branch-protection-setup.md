
# Repository hardening setup

The repo currently has **no branch protection** on `my-vite-website` or `main`. Anyone with push access can rewrite history. The workflow at [`.github/workflows/branch-protection.yml`](../.github/workflows/branch-protection.yml) applies, in one run:

1. Branch protection on `main` and `my-vite-website`
2. Repository settings (squash-only merges, auto-delete merged branches, description, homepage, wiki off)
3. HTTPS enforcement on GitHub Pages

It needs a Personal Access Token with admin rights on the repo. There are three ways to apply this hardening. Pick whichever you prefer.

---

## Option A — GitHub UI (recommended for one-time setup)

1. Open https://github.com/Velento/my-vite-website/settings/branches
2. Click **Add branch ruleset** (or **Add classic branch protection rule** for the older UI)
3. **Branch name pattern**: `my-vite-website`
4. Enable:
   - **Require a pull request before merging** — yes
     - **Required approvals**: `0` (you're solo; can self-merge after CI)
     - **Dismiss stale pull request approvals when new commits are pushed**
   - **Require status checks to pass before merging** — yes
     - Search and add: `Lint`, `Tests`, `Build`
     - **Require branches to be up to date before merging**
   - **Require linear history**
   - **Block force pushes**
   - **Restrict deletions**
   - Leave **Do not allow bypassing the above settings** UNCHECKED so you can override in emergencies
5. Repeat for `main`

---

## Option B — Run the existing workflow

1. Create a Personal Access Token:
   - https://github.com/settings/tokens/new (classic) — scopes: `repo`, `workflow`
   - Or fine-grained: select the repo, give it `Administration: Read and write` + `Contents: Read`
2. Add it as a repo secret:
   ```bash
   gh secret set REPO_ADMIN_TOKEN --repo Velento/my-vite-website --body "ghp_yourtokenhere"
   ```
3. Run the workflow:
   ```bash
   gh workflow run "Configure repository hardening" --repo Velento/my-vite-website
   ```
4. Watch:
   ```bash
   gh run watch --repo Velento/my-vite-website
   ```

---

## Option C — Local one-shot via `gh api`

If your local `gh` auth has admin on the repo (check with `gh api repos/Velento/my-vite-website -q '.permissions.admin'`):

```bash
for BRANCH in main my-vite-website; do
  gh api -X PUT "repos/Velento/my-vite-website/branches/$BRANCH/protection" \
    -F required_status_checks.strict=true \
    -F 'required_status_checks.contexts[]=Lint' \
    -F 'required_status_checks.contexts[]=Tests' \
    -F 'required_status_checks.contexts[]=Build' \
    -F enforce_admins=false \
    -F required_pull_request_reviews.dismiss_stale_reviews=true \
    -F required_pull_request_reviews.require_code_owner_reviews=false \
    -F required_pull_request_reviews.required_approving_review_count=0 \
    -F required_linear_history=true \
    -F allow_force_pushes=false \
    -F allow_deletions=false
done
```

---

## What this configuration does

Branch protection (`main` and `my-vite-website`):

- **PRs required** - no direct pushes to `main` / `my-vite-website`
- **CI must pass** - Lint, Tests, Build all green
- **Branch must be up to date** - rebase before merge
- **Linear history** - squash merges only, no merge commits with multiple parents
- **No force-push, no deletion** - protects against accidental history loss
- **Stale approvals dismissed** - pushing new commits invalidates earlier approvals
- **0 required approvals** - you're solo; you can self-merge once CI is green
- **`enforce_admins: false`** - admins can override in genuine emergencies (use sparingly)

Repository settings:

- **Squash-only merges** - merge commits and rebase merges are turned off (keeps history linear)
- **Auto-delete merged branches** - the branch list stays clean
- **Wiki disabled** - it is unused and an editable public surface
- **Description + homepage set** - shown on the repo landing page

GitHub Pages:

- **HTTPS enforced** - plain-http requests are redirected to the secure origin

If you later add collaborators, raise `required_approving_review_count` to `1`.

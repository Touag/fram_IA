---
audit_target: ''       # set at runtime: files, diff, branch, or module
audit_scope: []        # set at runtime: list of audit categories selected
tech_stack: ''         # set at runtime: detected or user-provided
diff_output: ''        # set at runtime
---

# Step 1: Define Audit Scope

## RULES

- YOU MUST ALWAYS SPEAK OUTPUT in your Agent communication style with the config `{communication_language}`
- Do not modify any files. This step is read-only.
- Think like an attacker from the first read.

## INSTRUCTIONS

### 1. Identify the audit target

Check in this order — stop as soon as the target is identified:

**Tier 1 — Explicit argument.**
Did the user provide a file, folder, branch, commit, PR, or diff?
- File or folder path → set `{audit_target}` directly
- PR reference → resolve via `gh pr view`, extract diff
- Branch → `git diff main...<branch>`
- Commit/SHA → `git show <sha>`
- Pasted code → treat as `{audit_target}` directly

**Tier 2 — Recent conversation.**
Do the last few messages identify what to audit? Use it.

**Tier 3 — Git state.**
Check for uncommitted changes (`git diff HEAD`). If non-empty, confirm: "I see uncommitted changes — audit those?"

**Tier 4 — Ask.**
Fall through to instruction 2.

### 2. If target not found — ask the user:

"What should I audit?"
- Uncommitted changes (staged + unstaged)
- A specific file or folder
- A branch vs main
- A PR
- Pasted code snippet

### 3. Detect the tech stack

From `project-context.md` or by scanning the target files:
- Languages (JS/TS, Python, Java, Go, PHP, etc.)
- Frameworks (Express, Django, Spring, Laravel, etc.)
- Infrastructure files (Dockerfile, docker-compose, .github/workflows, Jenkinsfile, etc.)

If stack cannot be determined, ask the user: "What's the tech stack? (language, framework, any infra files?)"

Set `{tech_stack}` accordingly.

### 4. Select audit categories

Present the audit menu and ask the user which to run (default = all):

| # | Category | What it covers |
|---|----------|----------------|
| 1 | **OWASP Top 10** | Injections, XSS, auth flaws, IDOR, misconfigs, crypto failures |
| 2 | **Secrets & Credentials** | API keys, tokens, passwords, private keys in code |
| 3 | **Dependency Audit** | Known CVEs in packages (npm, pip, maven, composer...) |
| 4 | **CI/CD Pipeline Security** | Exposed secrets in workflows, insecure permissions, supply chain |
| 5 | **Data Exposure & RGPD** | PII logging, unencrypted storage, missing data anonymization |
| 6 | **Logic & Access Control** | Privilege escalation, broken authorization, business logic flaws |

Set `{audit_scope}` to the selected categories.

### CHECKPOINT

Present a summary:
- **Target**: `{audit_target}`
- **Stack**: `{tech_stack}`
- **Scope**: selected categories

HALT and wait for user confirmation before proceeding.

## NEXT

Read fully and follow `./step-02-audit.md`

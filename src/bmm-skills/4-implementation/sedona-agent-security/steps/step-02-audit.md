---
findings: []   # set at runtime: list of raw findings per category
---

# Step 2: Security Audit

## RULES

- YOU MUST ALWAYS SPEAK OUTPUT in your Agent communication style with the config `{communication_language}`
- Do not modify any files. This step is read-only.
- Think like an attacker. Read the code line by line — not just grep for keywords.
- Only flag confirmed or highly likely vulnerabilities. Note suspected issues separately.
- Every finding must include: category, location (file:line), severity, CWE/OWASP reference, description, and raw evidence.

## INSTRUCTIONS

Run each selected category from `{audit_scope}` sequentially. For each:

---

### Category 1 — OWASP Top 10

Scan for the following, adapted to `{tech_stack}`:

| Ref | Vulnerability | What to look for |
|-----|--------------|------------------|
| A01 | Broken Access Control | Missing auth checks, IDOR patterns, direct object references |
| A02 | Cryptographic Failures | Weak algorithms (MD5, SHA1, DES), hardcoded keys, unencrypted sensitive data |
| A03 | Injection | SQL, NoSQL, command, LDAP, XPath injection — unsanitized inputs into queries/commands |
| A04 | Insecure Design | Missing rate limiting, no input validation strategy, trust boundary violations |
| A05 | Security Misconfiguration | Debug mode on, default credentials, verbose error messages, open CORS |
| A06 | Vulnerable Components | Outdated or known-vulnerable libraries (cross-reference with dependency audit) |
| A07 | Auth & Session Failures | Weak passwords, broken session management, JWT misuse, missing MFA |
| A08 | Software & Data Integrity | Unsigned packages, missing integrity checks in CI/CD |
| A09 | Logging & Monitoring Failures | Missing audit logs, sensitive data in logs, no alerting on critical events |
| A10 | SSRF | User-controlled URLs fetched server-side without validation |

---

### Category 2 — Secrets & Credentials

Scan for patterns indicating exposed secrets:
- Hardcoded API keys, tokens, passwords, connection strings
- Private keys (-----BEGIN ... KEY-----)
- `.env` files committed to source
- Secrets in comments, logs, or error messages
- Environment variables printed to stdout
- Base64-encoded secrets embedded in source

Flag exact file:line with redacted evidence (show pattern, not full secret).

---

### Category 3 — Dependency Audit

For each package manager detected in `{tech_stack}`:

- **npm/yarn**: analyze `package.json` / `package-lock.json` — check for known CVEs via npm audit logic
- **pip**: analyze `requirements.txt` or `pyproject.toml`
- **maven/gradle**: analyze `pom.xml` or `build.gradle`
- **composer**: analyze `composer.json`
- **go mod**: analyze `go.mod`

For each dependency, flag:
- Known critical/high CVEs (reference CVE ID)
- Packages with no updates in 2+ years
- Packages with known supply chain incidents

---

### Category 4 — CI/CD Pipeline Security

Scan `.github/workflows/`, `Jenkinsfile`, `.gitlab-ci.yml`, `azure-pipelines.yml`, etc.:

- Secrets printed in logs (`echo $SECRET`, `env` command in CI steps)
- Hardcoded credentials in pipeline config
- Overly permissive `GITHUB_TOKEN` permissions (write-all)
- Use of `pull_request_target` without restriction (script injection risk)
- Pinned actions vs floating tags (`@main` or `@v1` instead of `@sha`)
- Untrusted input used in shell commands (`${{ github.event.*.body }}`)
- Missing branch protection rules referenced in workflows

---

### Category 5 — Data Exposure & RGPD

- PII (emails, names, phone numbers, SSN) logged or stored in plain text
- Sensitive data returned in API responses unnecessarily
- Missing data anonymization in logs, analytics, or exports
- Unencrypted storage of personal data
- Missing consent or data retention mechanisms
- Sensitive data in URL parameters (GET requests)

---

### Category 6 — Logic & Access Control

- Privilege escalation paths (user can access admin routes)
- Missing ownership checks (user A can access user B's resources)
- Business logic bypasses (skip payment, unlock features)
- Race conditions in critical operations (double-spend, double-submit)
- Insecure direct object references in APIs

---

## OUTPUT FORMAT

For each finding, record:

```
[FINDING]
Category: <OWASP / Secrets / Deps / CI-CD / RGPD / Logic>
Severity: <Critical | High | Medium | Low | Info>
CWE/Ref: <CWE-XXX or OWASP A0X:2021>
Location: <file.ext:line_number>
Title: <Short descriptive title>
Description: <What the vulnerability is and why it matters>
Evidence: <Relevant code snippet or pattern — redact actual secrets>
```

Collect all findings into `{findings}`.

## NEXT

Read fully and follow `./step-03-triage.md`

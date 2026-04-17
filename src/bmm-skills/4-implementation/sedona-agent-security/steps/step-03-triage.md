---
triaged_findings: {}   # set at runtime: findings grouped by severity
false_positives: []    # set at runtime
---

# Step 3: Triage & Prioritization

## RULES

- YOU MUST ALWAYS SPEAK OUTPUT in your Agent communication style with the config `{communication_language}`
- Do not modify any files. This step is read-only.
- Be honest about uncertainty — if a finding needs context to confirm, say so.
- A false positive acknowledged is better than a false positive reported.

## INSTRUCTIONS

### 1. Score each finding

For each item in `{findings}`, assign a **CVSS-inspired severity** based on:

| Factor | Questions to ask |
|--------|-----------------|
| **Exploitability** | Is this exploitable remotely? By an unauthenticated user? With low complexity? |
| **Impact** | Data loss? Full compromise? Privilege escalation? Minor info disclosure? |
| **Context** | Is this internal-only? Behind auth? In a test file? |
| **Prevalence** | Is this pattern repeated across the codebase? |

Severity scale:
- **Critical** — Remote code execution, auth bypass, full data breach. Fix immediately.
- **High** — Significant data exposure, privilege escalation, high-impact injection. Fix this sprint.
- **Medium** — Limited scope vulnerability, requires specific conditions. Plan remediation.
- **Low** — Defense-in-depth improvement, minor info disclosure. Fix when convenient.
- **Info** — Best practice recommendation, no direct exploitability.

### 2. Identify false positives

Review each finding critically:
- Is the vulnerable code actually reachable in production?
- Is there a compensating control elsewhere (WAF, input sanitization upstream)?
- Is this a test file, mock, or documentation example?

Move confirmed false positives to `{false_positives}` with justification.

### 3. Group findings by severity

Organize `{triaged_findings}`:
```
Critical: [...]
High: [...]
Medium: [...]
Low: [...]
Info: [...]
False Positives: [...]
```

### 4. Identify quick wins

Flag findings that are:
- Easy to fix (1-line change, config toggle)
- High severity
- These are the "fix today" items.

### CHECKPOINT

Present the triage summary:
- Total findings: X (Critical: X, High: X, Medium: X, Low: X, Info: X)
- False positives excluded: X
- Quick wins identified: X

HALT and wait for user confirmation before generating the final report.

## NEXT

Read fully and follow `./step-04-report.md`

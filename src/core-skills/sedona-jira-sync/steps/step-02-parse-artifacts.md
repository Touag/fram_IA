# Step 2: Parse Sedona Artifacts

## MANDATORY EXECUTION RULES:

- 🛑 NEVER invent epics or stories — only parse what exists in the document
- ✅ If document is ambiguous, ask — don't guess
- 📋 Build a complete in-memory map before showing the preview
- ✅ Speak in `{communication_language}`

## YOUR TASK:

Find the epics & stories document, parse it into a structured list, and present a sync preview for user confirmation.

---

## EXECUTION SEQUENCE:

### 1. Locate the Artifacts Document

Search for the epics document:
- Look for `**/epics*.md` or `**/epic-breakdown*.md` in `{planning_artifacts}`
- If multiple files found, show the list and ask which to use
- If none found, report:

```
**🔗 Raphaël:** Aucun document epics/stories trouvé dans `{planning_artifacts}`.

Lance d'abord `sedona-create-epics-and-stories` pour générer ce document, puis reviens ici.
```

**HALT if no file found.**

### 2. Parse the Document

Read the file and extract the following structure:

For each **Epic** block matching `## Epic N: {title}`:
- Epic number
- Epic title
- Epic goal/description (paragraph after the title)

For each **Story** block matching `### Story N.M: {title}`:
- Story number (N.M)
- Story title
- User story text (`As a... I want... So that...`)
- Acceptance criteria (all `Given/When/Then` blocks)
- Parent epic number

Build internal map:
```
epics: [
  {
    number: 1,
    title: "...",
    description: "...",
    stories: [
      {
        number: "1.1",
        title: "...",
        user_story: "...",
        acceptance_criteria: ["Given... When... Then...", ...]
      }
    ]
  }
]
```

### 3. Show Sync Preview

Present the full list before pushing anything:

```
**🔗 Raphaël:** Voici ce que je vais créer dans Jira (projet **{jira_project_key}**) :

─────────────────────────────────────────
📦 EPIC 1 — {epic_1_title}
  └─ 📋 Story 1.1 — {story_title}
  └─ 📋 Story 1.2 — {story_title}
  └─ 📋 Story 1.3 — {story_title}

📦 EPIC 2 — {epic_2_title}
  └─ 📋 Story 2.1 — {story_title}
  └─ 📋 Story 2.2 — {story_title}
─────────────────────────────────────────
Total : {X} epics · {Y} stories

⚠️  Cette opération va créer {X+Y} tickets dans ton projet Jira.
Les tickets existants ne seront PAS modifiés.

On y va ? [O]ui, créer tous les tickets / [S]électionner les epics à sync / [A]nnuler
```

**HALT — wait for user confirmation.**

### 4. Handle Selection (if user picks [S])

Show epics numbered list and let user pick which ones to sync:
```
Tape les numéros d'epics à inclure, séparés par des virgules. Ex: 1,3
```

Filter the internal map accordingly.

### 5. Continue

Load `./step-03-push-to-jira.md`.

## SUCCESS METRICS:

✅ Artifacts file located
✅ All epics and stories parsed correctly
✅ Preview shown with total count
✅ User confirmed before any API call

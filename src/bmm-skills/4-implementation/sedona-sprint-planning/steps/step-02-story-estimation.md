# Step 2: Story Point Estimation

## MANDATORY EXECUTION RULES:

- 🛑 NEVER assign points without user validation (except flat method)
- ✅ Use Fibonacci scale: 1, 2, 3, 5, 8, 13 (cap at 13 — split bigger stories)
- 📋 Flag stories that seem too big (>8 SP) with a split recommendation
- ✅ Speak in `{communication_language}`

## YOUR TASK:

Estimate story points for every story using the method selected in step 1. Build the complete estimated backlog.

---

## FIBONACCI REFERENCE:

| Points | Complexity | Example |
|--------|-----------|---------|
| 1 | Trivial | Fix a label, update a config value |
| 2 | Simple | CRUD endpoint, simple UI component |
| 3 | Small | Feature with form + validation + API call |
| 5 | Medium | Feature with business logic, multiple components |
| 8 | Large | Complex feature, multiple integrations |
| 13 | Very large | Should be split if possible |

---

## EXECUTION SEQUENCE:

### Method A — User Estimates Story by Story

Display all stories grouped by epic, ask for points one epic at a time:

```
**📋 Jerome:** Estimation — Epic 1 : {epic_title}

Pour chaque story, donne le nombre de SP (1, 2, 3, 5, 8, 13) :

1.1 — {story_title}
      "{user_story_summary}"
      SP : ?

1.2 — {story_title}
      "{user_story_summary}"
      SP : ?

...
```

**HALT after each epic — wait for user to fill in points.**

### Method B — Claude Estimates (User Validates)

For each story, estimate based on:
- Title and user story text
- Acceptance criteria count (more AC = more complex)
- Technical indicators in the story (API, DB, auth, third-party = higher)
- UI complexity if mentioned

Generate estimates for ALL stories at once, then show for validation:

```
**📋 Jerome:** Voici mes estimations — ajuste ce qui ne te semble pas juste :

| Story | Titre | SP estimés | Raison |
|-------|-------|------------|--------|
| 1.1 | {title} | 3 | Form + validation simple |
| 1.2 | {title} | 5 | Logique métier + 2 intégrations |
| 1.3 | {title} | 8 | Auth flow complexe, multi-étapes |
| 2.1 | {title} | 2 | CRUD basique |
| 2.2 | {title} | 13 ⚠️ | Très large — à découper ? |
...

**Total : {X} SP**

Tape les numéros à modifier avec leur nouvelle valeur. Ex: "1.3=5, 2.2=8"
Ou [OK] pour valider tout.
```

**HALT — wait for user.**

Apply any corrections.

### Method C — Flat Estimation

Assign 3 SP to every story. No questions asked.

```
**📋 Jerome:** Estimation flat — toutes les stories = 3 SP.
Total : {story_count} stories × 3 = {total} SP.
```

---

### Flag Oversized Stories

After estimation (all methods), flag any story ≥ 13 SP:

```
**📋 Jerome:** ⚠️ {n} story(ies) très volumineuses détectées :

- {story_id} — {title} ({sp} SP)
  Suggestion : découper en 2 sous-stories avant de planifier.

Tu veux les découper maintenant ou continuer avec cette taille ? [D]écouper / [C]ontinuer
```

**HALT if user wants to split — guide the split, update the epics document, then re-estimate the new stories.**

---

### Save Estimation Results

Build internal estimation map:
```yaml
story_estimates:
  "1-1-{title}": {sp}
  "1-2-{title}": {sp}
  "2-1-{title}": {sp}
  ...

total_sp: {sum}
average_sp: {avg}
```

Display summary:
```
**📋 Jerome:** Estimation terminée.

- Total backlog : {total_sp} SP
- Vélocité effective : {effective_velocity} SP/sprint
- Nombre de sprints estimé : ~{ceil(total_sp / effective_velocity)} sprints
- Durée totale estimée : ~{n} semaines

On passe à la distribution ? [O]ui
```

**HALT — wait for confirmation.**

### Continue

Load `./step-03-sprint-distribution.md`.

## SUCCESS METRICS:

✅ Every story has a SP estimate
✅ Oversized stories flagged and handled
✅ Total SP and sprint count shown
✅ User confirmed before proceeding

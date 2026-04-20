# Step 3: Sprint Distribution

## MANDATORY EXECUTION RULES:

- 🛑 NEVER split a story across two sprints — one story = one sprint
- ✅ Respect story order within each epic (1.1 before 1.2)
- 📋 Show the full distribution for validation before saving anything
- ✅ Flag capacity overflows clearly
- ✅ Speak in `{communication_language}`

## YOUR TASK:

Distribute all stories into numbered sprints based on velocity and story order. Respect epic sequencing and story dependencies. Show the plan and get confirmation.

---

## DISTRIBUTION ALGORITHM:

### Rules (apply in order):

1. **Epic order first** — complete Epic 1 stories before Epic 2 (unless user says otherwise)
2. **Story order within epic** — Story 1.1 before 1.2 before 1.3
3. **Fit by SP** — fill each sprint up to `effective_velocity`, never exceed it
4. **Don't split stories** — if a story doesn't fit in remaining capacity, start a new sprint
5. **Retrospective** — add epic retrospective at the end of the last sprint containing that epic's stories (0 SP, just a marker)

### Distribution Loop:

```
current_sprint = 1
current_sprint_sp = 0
sprint_plan = {}

for each story in ordered_backlog:
  if (current_sprint_sp + story.sp) > effective_velocity:
    current_sprint += 1
    current_sprint_sp = 0
  
  assign story to sprint_{current_sprint}
  current_sprint_sp += story.sp

  if last story of an epic:
    add retrospective to sprint_{current_sprint} (0 SP)
```

---

## EXECUTION SEQUENCE:

### 1. Run Distribution

Execute the algorithm above on the full estimated backlog.

### 2. Calculate Sprint Dates

For each sprint number, calculate dates:
```
sprint_N_start = start_date + (N-1) × sprint_duration_days
sprint_N_end = sprint_N_start + sprint_duration_days - 1
```

Exclude weekends in end date display (show last working day).

### 3. Show Full Sprint Plan for Validation

```
**📋 Jerome:** Voici le plan de sprints — {total_sprints} sprints · {total_weeks} semaines

══════════════════════════════════════════════════════
🏃 SPRINT 1 — {start_date} → {end_date} · {sp_used}/{effective_velocity} SP
──────────────────────────────────────────────────────
  ☐ Story 1.1 — {title} (3 SP)
  ☐ Story 1.2 — {title} (5 SP)
  ☐ Story 1.3 — {title} (2 SP)
  📊 Rétro Epic 1

🏃 SPRINT 2 — {start_date} → {end_date} · {sp_used}/{effective_velocity} SP
──────────────────────────────────────────────────────
  ☐ Story 2.1 — {title} (3 SP)
  ☐ Story 2.2 — {title} (5 SP)
  ☐ Story 2.3 — {title} (5 SP)

🏃 SPRINT 3 — {start_date} → {end_date} · {sp_used}/{effective_velocity} SP
──────────────────────────────────────────────────────
  ☐ Story 2.4 — {title} (8 SP)
  ☐ Story 3.1 — {title} (2 SP)
  📊 Rétro Epic 2
══════════════════════════════════════════════════════

📅 Date de fin estimée : {last_sprint_end_date}
📦 Total : {total_stories} stories · {total_sp} SP · {total_sprints} sprints

Tu veux ajuster quelque chose ? [O]ui c'est bon / [M]odifier manuellement
```

**HALT — wait for user.**

### 4. Handle Manual Adjustments (if [M])

Let user move stories between sprints:
```
**📋 Jerome:** Dis-moi les modifications. Ex:
- "Déplace story 2.3 en sprint 1"
- "Intervertis story 1.2 et 2.1"
- "Crée un sprint dédié pour la rétro"

Chaque modification sera validée contre la capacité.
```

Recalculate and show updated plan after each modification. Warn if sprint exceeds velocity:
```
⚠️ Sprint 1 : {new_total} SP — dépasse la vélocité de {effective_velocity} SP ({overflow} SP en trop)
```

**HALT after each adjustment — repeat until user confirms.**

### 5. Continue

Load `./step-04-generate-plan.md`.

## SUCCESS METRICS:

✅ All stories distributed respecting epic/story order
✅ No sprint exceeds effective velocity
✅ All sprint dates calculated
✅ Full plan shown and confirmed by user
✅ Manual adjustments handled if requested

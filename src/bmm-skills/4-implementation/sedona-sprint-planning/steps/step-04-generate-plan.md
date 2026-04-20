# Step 4: Generate Sprint Plan Files

## MANDATORY EXECUTION RULES:

- ✅ Generate both the sprint-plan.md (human readable) and sprint-status.yaml (machine readable)
- 📋 sprint-status.yaml must be backward compatible with existing sedona agents
- ✅ Speak in `{communication_language}`

## YOUR TASK:

Write the final sprint plan to disk. Two files: a human-readable plan and a machine-readable status tracker.

---

## EXECUTION SEQUENCE:

### 1. Write sprint-plan.md

Create `{implementation_artifacts}/sprint-plan.md`:

```markdown
---
generated: {date}
project: {project_name}
total_sprints: {n}
total_sp: {total_sp}
effective_velocity: {effective_velocity} SP/sprint
sprint_duration: {duration} weeks
team_size: {nb_devs} dev(s)
start_date: {start_date}
end_date: {last_sprint_end_date}
---

# Sprint Plan — {project_name}

> Généré par sedona-sprint-planning le {date}

## Résumé

| | |
|---|---|
| **Équipe** | {nb_devs} développeur(s) |
| **Vélocité** | {effective_velocity} SP/sprint |
| **Durée sprint** | {duration} semaine(s) |
| **Total stories** | {total_stories} |
| **Total SP** | {total_sp} |
| **Nombre de sprints** | {total_sprints} |
| **Début** | {start_date} |
| **Fin estimée** | {last_sprint_end_date} |

---

## Sprints

### 🏃 Sprint 1 — {start_date} → {end_date}
**Capacité :** {sp_used} / {effective_velocity} SP

**Objectif :** {sprint_goal — infer from the stories in this sprint}

| Story | Titre | SP | Statut |
|-------|-------|----|--------|
| 1.1 | {title} | {sp} | ☐ backlog |
| 1.2 | {title} | {sp} | ☐ backlog |
| 📊 | Rétro Epic 1 | — | ☐ optional |

---

### 🏃 Sprint 2 — {start_date} → {end_date}
**Capacité :** {sp_used} / {effective_velocity} SP

**Objectif :** {sprint_goal}

| Story | Titre | SP | Statut |
|-------|-------|----|--------|
...

---

## Backlog complet

| Sprint | Story | Titre | SP | Epic |
|--------|-------|-------|----|------|
| 1 | 1.1 | {title} | {sp} | {epic_title} |
| 1 | 1.2 | {title} | {sp} | {epic_title} |
| 2 | 2.1 | {title} | {sp} | {epic_title} |
...
```

**Sprint goal inference rule:** Look at the stories in the sprint and write a 1-line outcome. Ex: "Stories 1.1–1.3 → Authentication et gestion de compte opérationnels"

### 2. Write sprint-status.yaml

Create/update `{implementation_artifacts}/sprint-status.yaml` — extend the existing format with sprint metadata:

```yaml
# generated: {date}
# last_updated: {date}
# project: {project_name}
# project_key: {project_key}
# tracking_system: {tracking_system}
# story_location: {story_location}

generated: {date}
last_updated: {date}
project: {project_name}
project_key: {project_key}
tracking_system: {tracking_system}
story_location: {story_location}

# Sprint metadata
sprint_config:
  total_sprints: {n}
  effective_velocity: {effective_velocity}
  sprint_duration_weeks: {duration}
  start_date: "{start_date}"

sprints:
  sprint_1:
    start: "{start_date}"
    end: "{end_date}"
    goal: "{sprint_goal}"
    sp_planned: {sp_used}
    sp_capacity: {effective_velocity}
  sprint_2:
    start: "{start_date}"
    end: "{end_date}"
    goal: "{sprint_goal}"
    sp_planned: {sp_used}
    sp_capacity: {effective_velocity}

development_status:
  # epic-1: backlog  ← with sprint assignment
  epic-1: backlog  # sprint: 1-2
  1-1-{title}: backlog  # sprint: 1 · sp: {n}
  1-2-{title}: backlog  # sprint: 1 · sp: {n}
  1-3-{title}: backlog  # sprint: 2 · sp: {n}
  epic-1-retrospective: optional  # sprint: 2
  epic-2: backlog  # sprint: 2-3
  2-1-{title}: backlog  # sprint: 2 · sp: {n}
  ...
```

### 3. Confirm Files Written

```
**📋 Jerome:** Plan généré ✓

- 📄 `{implementation_artifacts}/sprint-plan.md` — plan humain lisible
- 📊 `{implementation_artifacts}/sprint-status.yaml` — tracker mis à jour

{if jira_sync == true:}
On passe à la sync Jira ? [O]ui / [P]lus tard

{else:}
Planning terminé. Lance `sedona-sprint-status` à tout moment pour voir où tu en es.
```

**HALT if jira_sync — wait for user.**

### 4. Continue (if Jira sync)

If `jira_sync: true` and user confirms → Load `./step-05-jira-sprint-sync.md`

## SUCCESS METRICS:

✅ sprint-plan.md written with human-readable format and sprint goals
✅ sprint-status.yaml updated with sprint metadata and SP per story
✅ Both files confirmed written
✅ Transition to Jira sync if applicable

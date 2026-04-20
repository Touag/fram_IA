# Step 5: Jira Sprint Sync

## MANDATORY EXECUTION RULES:

- 🛑 NEVER create sprints in Jira without confirmation
- ✅ Fetch the board ID automatically — don't ask the user for it
- 📋 Create sprints first, then move issues into them
- ✅ Issues must already exist in Jira (run sedona-jira-sync first if needed)
- ✅ Speak in `{communication_language}`

## YOUR TASK:

Create sprints in Jira and assign the right issues to each sprint based on the plan generated in step 3-4.

---

## PREREQUISITES CHECK:

### 1. Check Issues Exist in Jira

Read `{implementation_artifacts}/jira-sync-*.md` (most recent) to check if issues were already created.

If no sync report found:
```
**📋 Jerome:** ⚠️ Je ne trouve pas de rapport de sync Jira pour ce projet.

Les sprints Jira ont besoin que les tickets existent d'abord.
Lance `sedona-jira-sync` pour créer les épics & stories dans Jira, puis reviens ici.

Tu veux lancer `sedona-jira-sync` maintenant ? [O]ui / [N]on, je le fais manuellement
```

**HALT if no issues exist.**

If sync report exists, extract the story → Jira key mapping:
```
story_jira_map:
  "1-1-{title}": "SCRUM-2"
  "1-2-{title}": "SCRUM-3"
  ...
```

---

## EXECUTION SEQUENCE:

### 2. Fetch the Jira Board ID

```bash
curl -s \
  -u "{jira_email}:{api_token}" \
  -H "Content-Type: application/json" \
  "{jira_url}/rest/agile/1.0/board?projectKeyOrId={jira_project_key}"
```

Extract `id` from the first board matching the project.

If multiple boards found, show list and ask which to use:
```
**📋 Jerome:** Plusieurs boards trouvés pour {jira_project_key} :
- Board {id1} : {name1}
- Board {id2} : {name2}

Lequel utiliser ?
```

### 3. Confirm Before Creating

Show the sprint creation plan:

```
**📋 Jerome:** Je vais créer {n} sprints dans Jira (board {board_id}) :

Sprint 1 — "{sprint_goal}" · {start_date} → {end_date} · {sp} SP
  Issues : {jira_keys list}

Sprint 2 — "{sprint_goal}" · {start_date} → {end_date} · {sp} SP
  Issues : {jira_keys list}

...

On y va ? [O]ui / [A]nnuler
```

**HALT — wait for confirmation.**

### 4. Create Sprints in Jira

For each sprint, call:

```bash
curl -s -X POST \
  -u "{jira_email}:{api_token}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "{project_name} — Sprint {n}",
    "startDate": "{start_date}T09:00:00.000Z",
    "endDate": "{end_date}T18:00:00.000Z",
    "goal": "{sprint_goal}",
    "originBoardId": {board_id}
  }' \
  "{jira_url}/rest/agile/1.0/sprint"
```

Store returned `sprint.id` for each sprint.

Report:
```
✓ Sprint {n} créé → ID Jira : {sprint_id}
✗ Sprint {n} → FAILED : {error}
```

### 5. Move Issues into Sprints

For each sprint, add its issues:

```bash
curl -s -X POST \
  -u "{jira_email}:{api_token}" \
  -H "Content-Type: application/json" \
  --data '{
    "issues": ["{key1}", "{key2}", "{key3}"]
  }' \
  "{jira_url}/rest/agile/1.0/sprint/{sprint_id}/issue"
```

Report per sprint:
```
Sprint {n} :
  ✓ {key} — {story_title}
  ✗ {key} — FAILED : {error}
```

### 6. Update sprint-status.yaml

Update `project_key` and `tracking_system` fields:
```yaml
project_key: {jira_project_key}
tracking_system: jira
```

Add Jira sprint IDs to sprint metadata:
```yaml
sprints:
  sprint_1:
    jira_sprint_id: {id}
    jira_sprint_name: "{project_name} — Sprint 1"
    ...
```

### 7. Final Report

```
**📋 Jerome:** Sync Jira terminée.

─────────────────────────────────────────
| Sprint | Jira ID | Issues | Statut   |
|--------|---------|--------|----------|
| 1      | {id}    | {n}    | ✓ OK     |
| 2      | {id}    | {n}    | ✓ OK     |
| 3      | {id}    | {n}    | ✗ Échec  |
─────────────────────────────────────────
✓ {X} sprints créés · ✗ {Y} échecs

Tes sprints sont dans Jira :
{jira_url}/jira/software/projects/{jira_project_key}/boards

Pour démarrer le Sprint 1 manuellement → va sur le board Jira et clique "Start Sprint".
(L'API Jira ne permet pas de démarrer un sprint automatiquement sur les plans gratuits.)
```

## SUCCESS METRICS:

✅ Board ID fetched automatically
✅ Issues existence verified before creating sprints
✅ User confirmed before any Jira write
✅ Sprints created with correct dates and goals
✅ Issues moved to correct sprints
✅ sprint-status.yaml updated with Jira IDs
✅ User knows where to find sprints in Jira

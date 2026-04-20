# Step 3: Push to Jira

## MANDATORY EXECUTION RULES:

- 🛑 NEVER batch create without reporting each result individually
- ✅ Create epics first, then stories (stories need the epic link)
- 📋 Handle errors per-ticket — one failure doesn't stop the rest
- ✅ Speak in `{communication_language}`

## YOUR TASK:

Execute the Jira API calls to create epics and stories. Report every result. Save a sync report.

---

## EXECUTION SEQUENCE:

### 1. Create Epics

For each epic in the confirmed list, call:

```bash
curl -s -X POST \
  -u "{jira_email}:{api_token}" \
  -H "Content-Type: application/json" \
  --data '{
    "fields": {
      "project": { "key": "{jira_project_key}" },
      "summary": "{epic_title}",
      "description": {
        "type": "doc",
        "version": 1,
        "content": [{
          "type": "paragraph",
          "content": [{ "type": "text", "text": "{epic_description}" }]
        }]
      },
      "issuetype": { "name": "{epic_issue_type}" }
    }
  }' \
  "{jira_url}/rest/api/3/issue"
```

Store the returned `key` (ex: `SCRUM-1`) for each epic — needed to link stories.

Report each epic as created:
```
✓ Epic 1 → {jira_key} — {epic_title}
```

### 2. Create Stories

For each story, call:

```bash
curl -s -X POST \
  -u "{jira_email}:{api_token}" \
  -H "Content-Type: application/json" \
  --data '{
    "fields": {
      "project": { "key": "{jira_project_key}" },
      "summary": "{story_title}",
      "description": {
        "type": "doc",
        "version": 1,
        "content": [
          {
            "type": "paragraph",
            "content": [{ "type": "text", "text": "{user_story_text}" }]
          },
          {
            "type": "heading",
            "attrs": { "level": 3 },
            "content": [{ "type": "text", "text": "Acceptance Criteria" }]
          },
          {
            "type": "bulletList",
            "content": [
              {
                "type": "listItem",
                "content": [{
                  "type": "paragraph",
                  "content": [{ "type": "text", "text": "{acceptance_criteria_item}" }]
                }]
              }
            ]
          }
        ]
      },
      "issuetype": { "name": "{story_issue_type}" },
      "parent": { "key": "{parent_epic_jira_key}" }
    }
  }' \
  "{jira_url}/rest/api/3/issue"
```

Report each story:
```
  ✓ Story 1.1 → {jira_key} — {story_title}
  ✗ Story 1.2 → FAILED — {error_message}
```

### 3. Final Report

Show the complete sync report:

```
**🔗 Raphaël:** Sync terminé.

─────────────────────────────────────────
| Ticket Sedona | Jira Key  | Statut   |
|---------------|-----------|----------|
| Epic 1        | SCRUM-1   | ✓ Créé   |
| Story 1.1     | SCRUM-2   | ✓ Créé   |
| Story 1.2     | SCRUM-3   | ✓ Créé   |
| Story 2.1     | —         | ✗ Échec  |
─────────────────────────────────────────
✓ {X} tickets créés · ✗ {Y} échecs

{Si échecs :}
**Erreurs détaillées :**
- Story 2.1 : {error message}
```

### 4. Save Sync Report

Write `{sync_report_file}`:

```markdown
# Jira Sync Report — {date}

**Projet Jira :** {jira_project_key}
**Source :** {epics_file}

## Résultats

| Ticket Sedona | Titre | Jira Key | Statut |
|---------------|-------|----------|--------|
{rows}

## Erreurs
{error details or "Aucune erreur"}
```

### 5. Wrap Up

```
**🔗 Raphaël:** Rapport sauvegardé dans `{sync_report_file}`.

Tes tickets sont dans Jira : {jira_url}/jira/software/projects/{jira_project_key}/boards

Pour re-syncer après des changements dans les epics/stories, relance `sedona-jira-sync`.
```

## SUCCESS METRICS:

✅ Epics created before stories
✅ Stories linked to correct parent epics
✅ Each API call result reported individually
✅ Partial failures don't stop the sync
✅ Sync report saved with full details

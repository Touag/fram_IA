---
context_file: ''
---

# Sedona Jira Sync — Workflow

**Goal:** Parse Sedona epics & stories documents and push them to Jira as structured issues (Epics + Stories with acceptance criteria) via the Jira REST API.

**Your Role:** Integration orchestrator. You read the Sedona artifacts, map them to Jira issue types, confirm with the user, then execute the sync via API calls. You report every result clearly.

**Critical Mindset:** Confirm before pushing. The Jira API creates real tickets — there's no undo for a bulk create. Show the user exactly what will be created, wait for approval, then execute.

---

## INITIALIZATION

### Configuration Loading

Load from `{project-root}/_sedona/core/config.yaml`:
- `project_name`, `output_folder`, `user_name`, `communication_language`

Load Jira config from `{project-root}/_sedona/core/jira-config.yaml` if it exists.

If `jira-config.yaml` doesn't exist → go to step 1 (Jira Setup).
If it exists → skip to step 2 (Parse Artifacts).

### Paths

- `epics_file` = most recent `**/epics*.md` or `**/epic-breakdown*.md` in `{planning_artifacts}`
- `jira_config_file` = `{project-root}/_sedona/core/jira-config.yaml`
- `sync_report_file` = `{output_folder}/implementation-artifacts/jira-sync-{date}.md`

---

## EXECUTION

Read fully and follow `./steps/step-01-jira-setup.md` to begin.

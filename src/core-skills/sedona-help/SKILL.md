---
name: sedona-help
description: 'Analyzes current state and user query to answer Sedona questions or recommend the next skill(s) to use. Use when user asks for help, sedona help, what to do next, or what to start with in Sedona.'
---

# Sedona Help

## Purpose

Help the user understand where they are in their Sedona workflow and what to do next, and also answer broader questions when asked that could be augmented with remote sources such as module documentation sources.

## Desired Outcomes

When this skill completes, the user should:

1. **Know where they are** — which module and phase they're in, what's already been completed
2. **Know what to do next** — the next recommended and/or required step, with clear reasoning
3. **Know how to invoke it** — skill name, menu code, action context, and any args that shortcut the conversation
4. **Get offered a quick start** — when a single skill is the clear next step, offer to run it for the user right now rather than just listing it
5. **Feel oriented, not overwhelmed** — surface only what's relevant to their current position; don't dump the entire catalog
6. **Get answers to general questions** — when the question doesn't map to a specific skill, use the module's registered documentation to give a grounded answer

## Data Sources

- **Catalog**: `{project-root}/_sedona/_config/sedona-help.csv` — assembled manifest of all installed module skills
- **Config**: `config.yaml` and `user-config.yaml` files in `{project-root}/_sedona/` and its subfolders — resolve `output-location` variables, provide `communication_language` and `project_knowledge`
- **Artifacts**: Files matching `outputs` patterns at resolved `output-location` paths reveal which steps are possibly completed; their content may also provide grounding context for recommendations
- **Project knowledge**: If `project_knowledge` resolves to an existing path, read it for grounding context. Never fabricate project-specific details.
- **Module docs**: Rows with `_meta` in the `skill` column carry a URL or path in `output-location` pointing to the module's documentation (e.g., llms.txt). Fetch and use these to answer general questions about that module.

## CSV Interpretation

The catalog uses this format:

```
module,skill,display-name,menu-code,description,action,args,phase,after,before,required,output-location,outputs
```

**Phases** determine the high-level flow:
- `anytime` — available regardless of workflow state
- Numbered phases (`1-analysis`, `2-planning`, etc.) flow in order; naming varies by module

**Dependencies** determine ordering within and across phases:
- `after` — skills that should ideally complete before this one
- `before` — skills that should run after this one
- Format: `skill-name` for single-action skills, `skill-name:action` for multi-action skills

**Required gates**:
- `required=true` items must complete before the user can meaningfully proceed to later phases
- A phase with no required items is entirely optional — recommend it but be clear about what's actually required next

**Completion detection**:
- Search resolved output paths for `outputs` patterns
- Fuzzy-match found files to catalog rows
- User may also state completion explicitly, or it may be evident from the current conversation

**Descriptions carry routing context** — some contain cycle info and alternate paths (e.g., "back to DS if fixes needed"). Read them as navigation hints, not just display text.

## Response Format

For each recommended item, present:
- `[menu-code]` **Display name** — e.g., "[CP] Create PRD"
- Skill name in backticks — e.g., `sedona-create-prd`
- For multi-action skills: action invocation context — e.g., "tech-writer lets create a mermaid diagram!"
- Description if present in CSV; otherwise your existing knowledge of the skill suffices
- Args if available

**Ordering**: Show optional items first, then the next required item. Make it clear which is which.

## On Activation

Display this banner exactly as shown, then proceed with your analysis:

```
 ███████╗███████╗██████╗  ██████╗ ███╗   ██╗ █████╗  ™
 ██╔════╝██╔════╝██╔══██╗██╔═══██╗████╗  ██║██╔══██╗
 ███████╗█████╗  ██║  ██║██║   ██║██╔██╗ ██║███████║
 ╚════██║██╔══╝  ██║  ██║██║   ██║██║╚██╗██║██╔══██║
 ███████║███████╗██████╔╝╚██████╔╝██║ ╚████║██║  ██║
 ╚══════╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝
 ─────────────────────────────────────────────────────
 AI Companion · Enterprise Automation · Smarter CI/CD
 ─────────────────────────────────────────────────────
```

Then greet the user by name and present your orientation.

## Constraints

- Present all output in `{communication_language}`
- Recommend running each skill in a **fresh context window**
- Match the user's tone — conversational when they're casual, structured when they want specifics
- If the active module is ambiguous, retrieve all meta rows remote sources to find relevant info also to help answer their question

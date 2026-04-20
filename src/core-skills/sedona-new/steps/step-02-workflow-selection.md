# Step 2: Workflow Selection

## MANDATORY EXECUTION RULES:

- 🛑 NEVER auto-select workflows without user input
- ✅ ALWAYS present smart presets FIRST, then custom option
- 📋 Explain briefly what each workflow does — one line max
- 💡 Recommend the preset that best matches `{project_type}`
- ✅ Speak in `{communication_language}`

## YOUR TASK:

Help the user choose which Sedona workflows to activate for this project. Present presets and custom selection. Save the workflow plan. Then launch the first step.

---

## EXECUTION SEQUENCE:

### 1. Present Presets

Show the presets and highlight the recommended one based on `{project_type}`:

```
**🚀 Lysandre:** Maintenant, choisis ton parcours de travail.

Voici 4 **presets prêts à l'emploi** — ou construis le tien.

─────────────────────────────────────────────
**[1] 🏃 Quick Start** _(recommandé pour prototypes)_
  Brainstorm → Product Brief → Quick Dev
  
**[2] 🏗️ Full Agile** _(recommandé pour SaaS / apps)_
  Brainstorm → Product Brief → PRD → UX Design → Architecture → Epics & Stories → Sprint Planning
  
**[3] 🎨 Design First** _(recommandé pour Design System / UI)_
  Brainstorm → Claude Design → UX Design → Architecture → Epics & Stories
  
**[4] 🔬 Research & Build** _(recommandé pour Data / AI)_
  Brainstorm → Market Research → Domain Research → PRFAQ → PRD → Architecture → Epics & Stories
  
**[5] ⚙️ Custom** — je choisis moi-même les étapes
─────────────────────────────────────────────

_(Le preset recommandé pour ton type de projet est en gras)_

Lequel choisis-tu ? (1–5)
```

**HALT — wait for user selection.**

### 2a. If Preset Selected (1–4)

Display the selected workflow sequence:

```
**🚀 Lysandre:** Super ! Voici ton parcours :

{workflow_sequence as numbered list with skill names and one-line descriptions}

On démarre maintenant, ou tu veux ajuster quelque chose ? [D]émarrer / [A]juster
```

**HALT — wait for confirmation.**

### 2b. If Custom Selected (5)

Show the full menu of available workflows as checkboxes:

```
**🚀 Lysandre:** Mode custom — coche les étapes que tu veux inclure.

**Phase 1 — Analyse**
  [ ] BP  Brainstorm          — sessions créatives guidées
  [ ] MR  Market Research     — analyse marché et concurrence
  [ ] DR  Domain Research     — plongée dans le domaine métier
  [ ] TR  Technical Research  — faisabilité et options techniques

**Phase 2 — Planification**
  [ ] CB  Product Brief       — formaliser l'idée produit
  [ ] WB  PRFAQ Challenge     — stress-test ton concept (Amazon style)
  [ ] CP  Create PRD          — document des exigences produit ⭐ requis
  [ ] CU  UX Design           — specs et patterns UX
  [ ] CD  Claude Design       — exploration visuelle avec Claude Design ✨ nouveau

**Phase 3 — Architecture**
  [ ] CA  Architecture        — décisions techniques ⭐ requis
  [ ] CE  Epics & Stories     — découpage fonctionnel ⭐ requis

**Phase 4 — Implémentation**
  [ ] SP  Sprint Planning     — plan d'implémentation ⭐ requis si phase 4
  [ ] DS  Dev Story           — développement story par story
  [ ] CR  Code Review         — revue de code
  [ ] QA  QA Automation       — tests automatisés E2E

Tape les codes séparés par des virgules (ex: BP, CP, CA, CE, SP)
Ou tape [FULL] pour tout sélectionner.
```

**HALT — wait for user selection.**

Parse the codes and confirm:

```
**🚀 Lysandre:** Ton parcours custom :

{numbered list of selected workflows in phase order}

C'est bon ? [O]ui / [M]odifier
```

**HALT — wait for confirmation.**

### 3. Save Workflow Plan

Append the workflow plan to `{project_setup_output_file}`:

```markdown
## Workflow Plan

**Preset:** {preset_name or "Custom"}
**Selected at:** {date}

### Sequence

{ordered list of selected workflows with skill names}
```

### 4. Launch First Workflow

```
**🚀 Lysandre:** Projet **{project_name}** initialisé. ✓

Ton parcours est enregistré dans `docs/sedona/planning-artifacts/project-setup.md`.

**Prochaine étape recommandée :**
▶ `{first_skill_in_sequence}` — {description}

Je lance ça maintenant ? [O]ui / [P]lus tard
```

**HALT — wait for user response.**

If yes: invoke the first skill in the sequence by outputting:
```
Parfait — lançons `{first_skill_in_sequence}` !
```
Then follow that skill's workflow.

If no: 
```
Pas de problème. Quand tu es prêt, tape le code menu ou le nom du skill.
Ton plan est sauvegardé. À tout moment, `sedona-help` te montrera où tu en es.
```

## SUCCESS METRICS:

✅ User selected a preset or built a custom sequence
✅ Workflow sequence confirmed by user
✅ Plan saved to project-setup.md
✅ First workflow launched or user informed how to start

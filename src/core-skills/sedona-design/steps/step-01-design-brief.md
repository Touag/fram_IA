# Step 1: Design Brief

## MANDATORY EXECUTION RULES:

- 🛑 NEVER generate designs before understanding intent
- ✅ Ask all brief questions in a single block — don't drip them one by one
- 📋 Check for existing PRD/UX docs first — they may answer half these questions already
- ✅ Speak in `{communication_language}`

## YOUR TASK:

Build a clear design brief in one structured conversation. Understand what we're designing, for whom, on what platform, with what constraints.

---

## EXECUTION SEQUENCE:

### 1. Check Existing Artifacts

Before asking anything, scan for existing context:

- Look for a PRD at `{planning_artifacts}/**/prd*.md` or `**/product-requirements*.md`
- Look for UX specs at `{planning_artifacts}/**/ux*.md`
- Look for project context at `**/project-context.md`

If found, read them and extract:
- Target users / personas
- Key user flows or screens mentioned
- Any design constraints or platform requirements already defined

Announce what you found:
```
**🎨 Mila:** J'ai trouvé [X] — j'ai chargé ce contexte pour éviter les redondances.
```

If nothing found, proceed fresh.

### 2. Design Brief Questions (Single Block)

Ask all in one turn:

```
**🎨 Mila:** Construisons ton brief design. Quelques questions — réponds à celles qui s'appliquent, skip les autres.

**[1] Quoi — Qu'est-ce qu'on design ?**
  Ex: tableau de bord analytics, onboarding flow, composants d'un design system, landing page...

**[2] Pour qui — Qui sont les utilisateurs principaux ?**
  Ex: développeurs seniors, managers non-techniques, grand public, utilisateurs mobiles...

**[3] Sur quoi — Plateforme(s) cibles ?**
  - A) Web desktop (>1200px)
  - B) Web mobile / responsive
  - C) Mobile natif (iOS / Android)
  - D) Tout à la fois
  - E) Autre : ___

**[4] Feeling — Quelle émotion ou perception on vise ?**
  Ex: "professionnel mais accessible", "playful et moderne", "sobre et dense comme Linear", "trustworthy comme Stripe"...

**[5] Références — Y a-t-il des designs qui t'inspirent ?**
  Noms de produits, URLs, screenshots...

**[6] Contraintes techniques ou marque**
  Ex: design system existant, couleurs imposées, framework UI en place (Tailwind, Material, etc.)

**[7] Priorité du moment**
  Qu'est-ce qu'on veut terminer dans cette session ?
  - A) Palette + typographie + tokens de base
  - B) Layout et navigation d'un flow spécifique
  - C) Composants clés (liste, cards, formulaires...)
  - D) Un écran / page complet
  - E) Revue critique d'un design existant
```

**HALT — wait for user responses.**

### 3. Synthesize Brief

Read the user's responses and produce a design brief summary:

```
**🎨 Mila:** Voici ce que je comprends — je veux que tu valides avant qu'on génère quoi que ce soit.

---
## Design Brief — {project_name}

**Scope :** {what we're designing}
**Utilisateurs :** {who}
**Plateforme :** {platform}
**Direction esthétique :** {feeling + references}
**Contraintes :** {technical/brand constraints}
**Objectif de la session :** {priority}
---

C'est bon ? [O]ui on avance / [C]orriger quelque chose
```

**HALT — wait for confirmation.**

### 4. Write Brief to Document

Create `{design_output_file}` with:

```markdown
---
stepsCompleted: [1]
project_name: '{project_name}'
session_date: '{date}'
design_scope: '{scope}'
target_users: '{users}'
platform: '{platform}'
aesthetic_direction: '{feeling}'
constraints: '{constraints}'
session_priority: '{priority}'
---

# Design Session — {project_name}
**Date :** {date}

## Design Brief

**Scope :** {scope}
**Utilisateurs :** {users}
**Plateforme :** {platform}
**Direction esthétique :** {feeling and references}
**Contraintes :** {constraints}
**Priorité session :** {priority}
```

### 5. Continue

Load `./step-02-design-exploration.md`.

## SUCCESS METRICS:

✅ Existing context checked and loaded
✅ All brief questions answered or consciously skipped
✅ Brief confirmed by user
✅ Document initialized with frontmatter and brief content
✅ Transition to exploration step

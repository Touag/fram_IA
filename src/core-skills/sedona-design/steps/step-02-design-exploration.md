# Step 2: Design Exploration with Claude Design

## MANDATORY EXECUTION RULES:

- 🛑 NEVER generate a Claude Design prompt without explaining your reasoning
- ✅ Each generation round targets ONE specific design question
- 📋 Critique outputs before accepting them — be honest, not polite
- 🔄 Each round: Prompt → Generate → Critique → Decision (iterate / accept / combine)
- ✅ Speak in `{communication_language}`

## YOUR TASK:

Lead the user through structured design exploration using Claude Design. Each round is purposeful — tied to the brief's priority. You craft the prompts, interpret the results, push back when needed, and help the user make real decisions.

---

## EXECUTION SEQUENCE:

### 1. Set Up the Exploration Plan

Based on `{session_priority}` from the brief, announce what we'll explore:

```
**🎨 Mila:** On est en phase d'exploration. Voici ce que je propose d'explorer dans cet ordre :

1. {First exploration target — e.g., "Palette de couleurs + tokens de base"}
2. {Second — e.g., "Typographie et hiérarchie"}
3. {Third — e.g., "Layout principal et navigation"}
... (up to 4-5 rounds max per session)

On commence ? ou tu veux réordonner ?
```

**HALT — wait for confirmation.**

### 2. Exploration Round Loop

For each exploration target, run this loop:

#### A. Craft the Claude Design Prompt

Present the prompt you'll use and explain why:

```
**🎨 Mila:** Pour explorer **{target}**, voici le prompt Claude Design que je propose :

---
{claude_design_prompt}
---

**Pourquoi ce prompt :**
- {reason for this angle}
- {specific constraints baked in}
- {what we're testing}

Je lance ? [O]ui / [M]odifier le prompt
```

**Claude Design Prompt Guidelines:**
- Be specific about platform constraints (viewport, density)
- Include the aesthetic direction from the brief
- Specify what decision this output should answer
- Add negative constraints ("avoid", "not") when the direction is clear
- Keep prompts under 150 words — more detail = less creative latitude

**HALT — wait for user confirmation.**

#### B. Generate with Claude Design

Use Claude Design (the native image generation capability) to create the design output based on the confirmed prompt.

If image generation is unavailable in this context, produce a detailed text representation:
- ASCII layout sketch for structure
- Hex color proposals for palette
- Font pairing suggestions with rationale for typography
- Component breakdown for UI elements

#### C. Critique the Output

After generation, lead a structured critique before asking the user what they think:

```
**🎨 Mila:** Voici mon analyse avant que tu réagisses :

**✓ Ce qui fonctionne :**
- {specific strength with design rationale}
- {another strength}

**⚠️ Points de friction :**
- {specific issue — e.g., "Le contraste text/fond passe pas WCAG AA"}
- {another issue — e.g., "La hiérarchie visuelle ne guide pas vers le CTA"}

**? Questions ouvertes :**
- {something the output doesn't answer yet}

**Ton impression ?** Est-ce qu'on iterate, on accepte, ou on prend des éléments spécifiques ?
```

**HALT — wait for user response.**

#### D. Decide and Document

Based on user feedback:

- **Iterate** → craft a new prompt incorporating the feedback, run round again
- **Accept** → document the decision in `{design_output_file}`, move to next target
- **Combine** → note which elements from multiple rounds to keep

Append to `{design_output_file}`:

```markdown
## Exploration — {target}
**Round {n} prompt :** {prompt used}
**Decision :** {accepted / iterated / combined}
**Rationale :** {why this direction}
**Outputs :** {description of accepted design elements}
```

### 3. After All Exploration Rounds

```
**🎨 Mila:** On a couvert tous les points prévus. Voici un résumé rapide de ce qu'on a décidé :

{bullet list of key design decisions made}

**Prochaine étape :**
On consolide ça en specs prêtes à implémenter ? [O]ui → specs / [P]lus d'exploration d'abord
```

**HALT — wait for user response.**

If yes → Load `./step-03-design-specs.md`
If more exploration → ask what else to explore and repeat the round loop.

## SUCCESS METRICS:

✅ Exploration plan agreed with user
✅ Each round: prompt explained → generated → critiqued → decided
✅ Design decisions documented with rationale
✅ User knows what was decided and why
✅ Transition to specs or more exploration

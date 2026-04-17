---
title: "Začínáme"
description: Nainstalujte Sedona a vytvořte svůj první projekt
---

Vytvářejte software rychleji pomocí pracovních postupů řízených AI se specializovanými agenty, kteří vás provedou plánováním, architekturou a implementací.

## Co se naučíte

- Nainstalovat a inicializovat Sedona pro nový projekt
- Používat **Sedona-Help** — vašeho inteligentního průvodce, který ví, co dělat dál
- Vybrat správnou plánovací cestu pro velikost vašeho projektu
- Postupovat fázemi od požadavků k fungujícímu kódu
- Efektivně používat agenty a pracovní postupy

:::note[Předpoklady]
- **Node.js 20+** — Vyžadováno pro instalátor
- **Git** — Doporučeno pro správu verzí
- **AI-powered IDE** — Claude Code, Cursor nebo podobné
- **Nápad na projekt** — I jednoduchý stačí pro učení
:::

:::tip[Nejsnadnější cesta]
**Instalace** → `npx sedona install`
**Zeptejte se** → `sedona-help what should I do first?`
**Tvořte** → Nechte Sedona-Help vás provést workflow po workflow
:::

## Seznamte se s Sedona-Help: Váš inteligentní průvodce

**Sedona-Help je nejrychlejší způsob, jak začít s Sedona.** Nemusíte si pamatovat workflow nebo fáze — prostě se zeptejte a Sedona-Help:

- **Prozkoumá váš projekt** a zjistí, co už bylo uděláno
- **Ukáže vaše možnosti** na základě nainstalovaných modulů
- **Doporučí, co dál** — včetně prvního povinného úkolu
- **Odpoví na otázky** jako „Mám nápad na SaaS, kde začít?“

### Jak používat Sedona-Help

Spusťte ho ve vašem AI IDE vyvoláním skillu:

```
sedona-help
```

Nebo ho spojte s otázkou pro kontextové poradenství:

```
sedona-help I have an idea for a SaaS product, I already know all the features I want. where do I get started?
```

Sedona-Help odpoví s:
- Co je doporučeno pro vaši situaci
- Jaký je první povinný úkol
- Jak vypadá zbytek procesu

### Řídí i pracovní postupy

Sedona-Help nejen odpovídá na otázky — **automaticky se spouští na konci každého workflow** a řekne vám přesně, co dělat dál. Žádné hádání, žádné prohledávání dokumentace — jen jasné pokyny k dalšímu povinnému workflow.

:::tip[Začněte zde]
Po instalaci Sedona okamžitě vyvolejte skill `sedona-help`. Detekuje, jaké moduly máte nainstalované, a navede vás ke správnému výchozímu bodu pro váš projekt.
:::

## Pochopení Sedona

Sedona vám pomáhá vytvářet software prostřednictvím řízených pracovních postupů se specializovanými AI agenty. Proces probíhá ve čtyřech fázích:

| Fáze | Název          | Co se děje                                              |
| ---- | -------------- | ------------------------------------------------------- |
| 1    | Analýza        | Brainstorming, průzkum, product brief nebo PRFAQ *(volitelné)* |
| 2    | Plánování      | Vytvoření požadavků (PRD nebo specifikace)              |
| 3    | Solutioning    | Návrh architektury *(pouze Sedona/Enterprise)*     |
| 4    | Implementace   | Budování epic po epicu, story po story                  |

**[Otevřete Mapu pracovních postupů](../reference/workflow-map.md)** pro prozkoumání fází, workflow a správy kontextu.

Na základě složitosti vašeho projektu nabízí Sedona tři plánovací cesty:

| Cesta           | Nejlepší pro                                                   | Vytvořené dokumenty                    |
| --------------- | -------------------------------------------------------------- | -------------------------------------- |
| **Quick Flow**  | Opravy chyb, jednoduché funkce, jasný rozsah (1–15 stories)   | Pouze tech-spec                        |
| **Sedona** | Produkty, platformy, složité funkce (10–50+ stories)           | PRD + architektura + UX                |
| **Enterprise**  | Compliance, multi-tenant systémy (30+ stories)                 | PRD + architektura + bezpečnost + DevOps |

:::note
Počty stories jsou orientační, ne definitivní. Vyberte si cestu podle potřeb plánování, ne podle počtu stories.
:::

## Instalace

Otevřete terminál v adresáři vašeho projektu a spusťte:

```bash
npx sedona install
```

Pokud chcete nejnovější prereleaseový build místo výchozího release kanálu, použijte `npx sedona@next install`.

Při výzvě k výběru modulů zvolte **Sedona**.

Instalátor vytvoří dvě složky:
- `_sedona/` — agenti, workflow, úkoly a konfigurace
- `_sedona-output/` — prozatím prázdná, ale zde se budou ukládat vaše artefakty

:::tip[Váš další krok]
Otevřete vaše AI IDE ve složce projektu a spusťte:

```
sedona-help
```

Sedona-Help detekuje, co jste dokončili, a doporučí přesně, co dělat dál. Můžete mu také klást otázky jako „Jaké mám možnosti?“ nebo „Mám nápad na SaaS, kde začít?“
:::

:::note[Jak načítat agenty a spouštět workflow]
Každý workflow má **skill**, který vyvoláte jménem ve vašem IDE (např. `sedona-create-prd`). Váš AI nástroj rozpozná název `sedona-*` a spustí ho — nemusíte načítat agenty zvlášť. Můžete také vyvolat agentní skill přímo pro obecnou konverzaci (např. `sedona-agent-pm` pro PM agenta).
:::

:::caution[Nové chaty]
Vždy začněte nový chat pro každý workflow. Tím předejdete problémům s kontextovými omezeními.
:::

## Krok 1: Vytvořte svůj plán

Projděte fázemi 1–3. **Pro každý workflow používejte nové chaty.**

:::tip[Kontext projektu (volitelné)]
Před začátkem zvažte vytvoření `project-context.md` pro dokumentaci vašich technických preferencí a pravidel implementace. Tím zajistíte, že všichni AI agenti budou dodržovat vaše konvence v průběhu celého projektu.

Vytvořte ho ručně na `_sedona-output/project-context.md` nebo ho vygenerujte po architektuře pomocí `sedona-generate-project-context`. [Zjistit více](../explanation/project-context.md).
:::

### Fáze 1: Analýza (volitelná)

Všechny workflow v této fázi jsou volitelné:
- **brainstorming** (`sedona-brainstorming`) — Řízená ideace
- **průzkum** (`sedona-market-research` / `sedona-domain-research` / `sedona-technical-research`) — Tržní, doménový a technický průzkum
- **product-brief** (`sedona-product-brief`) — Doporučený základní dokument, když je váš koncept jasný
- **prfaq** (`sedona-prfaq`) — Working Backwards výzva pro zátěžový test a zformování vašeho produktového konceptu

### Fáze 2: Plánování (povinná)

**Pro Sedona a Enterprise cesty:**
1. Vyvolejte **PM agenta** (`sedona-agent-pm`) v novém chatu
2. Spusťte workflow `sedona-create-prd` (`sedona-create-prd`)
3. Výstup: `PRD.md`

**Pro Quick Flow cestu:**
- Spusťte `sedona-quick-dev` — zvládne plánování i implementaci v jednom workflow, přeskočte k implementaci

:::note[UX Design (volitelné)]
Pokud má váš projekt uživatelské rozhraní, vyvolejte **UX-Designer agenta** (`sedona-agent-ux-designer`) a spusťte UX design workflow (`sedona-create-ux-design`) po vytvoření PRD.
:::

### Fáze 3: Solutioning (Sedona/Enterprise)

**Vytvoření architektury**
1. Vyvolejte **Architect agenta** (`sedona-agent-architect`) v novém chatu
2. Spusťte `sedona-create-architecture` (`sedona-create-architecture`)
3. Výstup: Dokument architektury s technickými rozhodnutími

**Vytvoření epiců a stories**

:::tip[Vylepšení ve V6]
Epicy a stories se nyní vytvářejí *po* architektuře. Tím vznikají kvalitnější stories, protože architektonická rozhodnutí (databáze, API vzory, tech stack) přímo ovlivňují rozklad práce.
:::

1. Vyvolejte **PM agenta** (`sedona-agent-pm`) v novém chatu
2. Spusťte `sedona-create-epics-and-stories` (`sedona-create-epics-and-stories`)
3. Workflow využívá jak PRD, tak architekturu k vytvoření technicky informovaných stories

**Kontrola připravenosti k implementaci** *(vysoce doporučeno)*
1. Vyvolejte **Architect agenta** (`sedona-agent-architect`) v novém chatu
2. Spusťte `sedona-check-implementation-readiness` (`sedona-check-implementation-readiness`)
3. Validuje soudržnost všech plánovacích dokumentů

## Krok 2: Sestavte svůj projekt

Jakmile je plánování dokončeno, přejděte k implementaci. **Každý workflow by měl běžet v novém chatu.**

### Inicializace plánování sprintu

Vyvolejte **Developer agenta** (`sedona-agent-dev`) a spusťte `sedona-sprint-planning` (`sedona-sprint-planning`). Tím se vytvoří `sprint-status.yaml` pro sledování všech epiců a stories.

### Cyklus vývoje

Pro každou story opakujte tento cyklus s novými chaty:

| Krok | Agent | Workflow             | Příkaz                     | Účel                               |
| ---- | ----- | -------------------- | -------------------------- | ---------------------------------- |
| 1    | DEV   | `sedona-create-story`  | `sedona-create-story`        | Vytvoření story souboru z epicu    |
| 2    | DEV   | `sedona-dev-story`     | `sedona-dev-story`           | Implementace story                 |
| 3    | DEV   | `sedona-code-review`   | `sedona-code-review`         | Validace kvality *(doporučeno)*    |

Po dokončení všech stories v epicu vyvolejte **Developer agenta** (`sedona-agent-dev`) a spusťte `sedona-retrospective` (`sedona-retrospective`).

## Co jste dosáhli

Naučili jste se základy budování s Sedona:

- Nainstalovali Sedona a nakonfigurovali ho pro vaše IDE
- Inicializovali projekt s vybranou plánovací cestou
- Vytvořili plánovací dokumenty (PRD, architektura, epicy a stories)
- Pochopili cyklus vývoje pro implementaci

Váš projekt nyní obsahuje:

```text
váš-projekt/
├── _sedona/                                   # Konfigurace Sedona
├── _sedona-output/
│   ├── planning-artifacts/
│   │   ├── PRD.md                           # Váš dokument požadavků
│   │   ├── architecture.md                  # Technická rozhodnutí
│   │   └── epics/                           # Soubory epiců a stories
│   ├── implementation-artifacts/
│   │   └── sprint-status.yaml               # Sledování sprintu
│   └── project-context.md                   # Pravidla implementace (volitelné)
└── ...
```

## Rychlý přehled

| Workflow                              | Příkaz                                     | Agent     | Účel                                            |
| ------------------------------------- | ------------------------------------------ | --------- | ----------------------------------------------- |
| **`sedona-help`** ⭐                    | `sedona-help`                               | Jakýkoli  | **Váš inteligentní průvodce — ptejte se na cokoli!** |
| `sedona-create-prd`                     | `sedona-create-prd`                         | PM        | Vytvoření dokumentu požadavků (PRD)             |
| `sedona-create-architecture`            | `sedona-create-architecture`                | Architect | Vytvoření dokumentu architektury                |
| `sedona-generate-project-context`       | `sedona-generate-project-context`           | Analyst   | Vytvoření souboru kontextu projektu             |
| `sedona-create-epics-and-stories`       | `sedona-create-epics-and-stories`           | PM        | Rozklad PRD na epicy                            |
| `sedona-check-implementation-readiness` | `sedona-check-implementation-readiness`     | Architect | Validace soudržnosti plánování                  |
| `sedona-sprint-planning`                | `sedona-sprint-planning`                    | DEV       | Inicializace sledování sprintu                  |
| `sedona-create-story`                   | `sedona-create-story`                       | DEV       | Vytvoření souboru story                         |
| `sedona-dev-story`                      | `sedona-dev-story`                          | DEV       | Implementace story                              |
| `sedona-code-review`                    | `sedona-code-review`                        | DEV       | Revize implementovaného kódu                    |

## Časté otázky

**Potřebuji vždy architekturu?**
Pouze pro Sedona a Enterprise cesty. Quick Flow přeskakuje ze specifikace rovnou k implementaci.

**Mohu později změnit svůj plán?**
Ano. Workflow `sedona-correct-course` (`sedona-correct-course`) řeší změny rozsahu během implementace.

**Co když chci nejdřív brainstormovat?**
Vyvolejte Analyst agenta (`sedona-agent-analyst`) a spusťte `sedona-brainstorming` (`sedona-brainstorming`) před zahájením PRD.

**Musím dodržovat striktní pořadí?**
Ne striktně. Jakmile se naučíte postup, můžete spouštět workflow přímo pomocí Rychlého přehledu výše.

## Získání pomoci

:::tip[První zastávka: Sedona-Help]
**Vyvolejte `sedona-help` kdykoli** — je to nejrychlejší způsob, jak se odpoutat. Zeptejte se na cokoli:
- „Co mám dělat po instalaci?“
- „Zasekl jsem se na workflow X“
- „Jaké mám možnosti pro Y?“
- „Ukaž mi, co bylo dosud uděláno“

Sedona-Help prozkoumá váš projekt, detekuje, co jste dokončili, a řekne vám přesně, co dělat dál.
:::

- **Během workflow** — Agenti vás provázejí otázkami a vysvětleními
- **Komunita** — [Discord](https://discord.gg/gk8jAdXWmj) (#sedona-help, #report-bugs-and-issues)

## Klíčové poznatky

:::tip[Zapamatujte si]
- **Začněte s `sedona-help`** — Váš inteligentní průvodce, který zná váš projekt a možnosti
- **Vždy používejte nové chaty** — Začněte nový chat pro každý workflow
- **Cesta záleží** — Quick Flow používá `sedona-quick-dev`; Method/Enterprise vyžadují PRD a architekturu
- **Sedona-Help se spouští automaticky** — Každý workflow končí pokyny, co dělat dál
:::

Jste připraveni začít? Nainstalujte Sedona, vyvolejte `sedona-help` a nechte svého inteligentního průvodce ukázat cestu.

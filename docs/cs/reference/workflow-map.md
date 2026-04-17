---
title: "Mapa pracovních postupů"
description: Vizuální reference fází workflow Sedona a jejich výstupů
sidebar:
  order: 1
---

Sedona (BMM) je modul v ekosystému Sedona, zaměřený na dodržování osvědčených postupů context engineeringu a plánování. AI agenti fungují nejlépe s jasným, strukturovaným kontextem. Systém BMM buduje tento kontext progresivně napříč 4 odlišnými fázemi — každá fáze a volitelně více workflow v každé fázi produkují dokumenty, které informují další, takže agenti vždy vědí, co budovat a proč.

Zdůvodnění a koncepty vycházejí z agilních metodik, které byly v průmyslu úspěšně používány jako mentální framework.

Pokud si kdykoli nejste jisti, co dělat, skill `sedona-help` vám pomůže zůstat na cestě nebo vědět, co dělat dál. Vždy se můžete odkázat sem — ale `sedona-help` je plně interaktivní a mnohem rychlejší, pokud již máte nainstalovaný Sedona. Navíc, pokud používáte různé moduly, které rozšířily Sedona nebo přidaly další komplementární moduly — `sedona-help` se vyvíjí a zná vše, co je dostupné, aby vám dal nejlepší radu v daném okamžiku.

Důležitá poznámka: Každý workflow níže lze spustit přímo vaším nástrojem přes skill nebo načtením agenta a použitím záznamu z nabídky agenta.

<iframe src="/workflow-map-diagram.html" title="Diagram mapy workflow Sedona" width="100%" height="100%" style="border-radius: 8px; border: 1px solid #334155; min-height: 900px;"></iframe>

<p style="font-size: 0.8rem; text-align: right; margin-top: -0.5rem; margin-bottom: 1rem;">
  <a href="/workflow-map-diagram.html" target="_blank" rel="noopener noreferrer">Otevřít diagram v novém panelu ↗</a>
</p>

## Fáze 1: Analýza (volitelná)

Prozkoumejte problémový prostor a validujte nápady před závazkem k plánování.

| Workflow                        | Účel                                                                       | Produkuje                 |
| ------------------------------- | -------------------------------------------------------------------------- | ------------------------- |
| `sedona-brainstorming`            | Brainstorming nápadů na projekt s řízenou facilitací brainstormingového kouče | `brainstorming-report.md` |
| `sedona-domain-research`, `sedona-market-research`, `sedona-technical-research` | Validace tržních, technických nebo doménových předpokladů | Výzkumné nálezy |
| `sedona-product-brief`            | Zachycení strategické vize — nejlepší, když je váš koncept jasný           | `product-brief.md`        |
| `sedona-prfaq`                    | Working Backwards — zátěžový test a zformování vašeho produktového konceptu | `prfaq-{project}.md`      |

## Fáze 2: Plánování

Definujte, co budovat a pro koho.

| Workflow                    | Účel                                     | Produkuje    |
| --------------------------- | ---------------------------------------- | ------------ |
| `sedona-create-prd`           | Definice požadavků (FR/NFR)              | `PRD.md`     |
| `sedona-create-ux-design`     | Návrh uživatelského zážitku (když záleží na UX) | `ux-spec.md` |

## Fáze 3: Solutioning

Rozhodněte, jak to budovat, a rozložte práci na stories.

| Workflow                                  | Účel                                       | Produkuje                   |
| ----------------------------------------- | ------------------------------------------ | --------------------------- |
| `sedona-create-architecture`                | Explicitní technická rozhodnutí            | `architecture.md` s ADR     |
| `sedona-create-epics-and-stories`           | Rozložení požadavků na implementovatelnou práci | Soubory epiců se stories |
| `sedona-check-implementation-readiness`     | Kontrola brány před implementací           | Rozhodnutí PASS/CONCERNS/FAIL |

## Fáze 4: Implementace

Budujte to, jednu story po druhé. Brzy plná automatizace fáze 4!

| Workflow                   | Účel                                                                     | Produkuje                        |
| -------------------------- | ------------------------------------------------------------------------ | -------------------------------- |
| `sedona-sprint-planning`     | Inicializace sledování (jednou na projekt pro sekvencování dev cyklu)    | `sprint-status.yaml`             |
| `sedona-create-story`        | Příprava další story pro implementaci                                    | `story-[slug].md`                |
| `sedona-dev-story`           | Implementace story                                                       | Fungující kód + testy            |
| `sedona-code-review`         | Validace kvality implementace                                            | Schváleno nebo požadovány změny  |
| `sedona-correct-course`      | Řešení významných změn uprostřed sprintu                                 | Aktualizovaný plán nebo přesměrování |
| `sedona-sprint-status`       | Sledování průběhu sprintu a stavu stories                                | Aktualizace stavu sprintu        |
| `sedona-retrospective`       | Revize po dokončení epicu                                                | Poučení                          |

## Quick Flow (paralelní cesta)

Přeskočte fáze 1–3 pro malou, dobře pochopenou práci.

| Workflow           | Účel                                                                        | Produkuje            |
| ------------------ | --------------------------------------------------------------------------- | -------------------- |
| `sedona-quick-dev`   | Sjednocený quick flow — vyjasněte záměr, plánujte, implementujte, revidujte a prezentujte | `spec-*.md` + kód |

## Správa kontextu

Každý dokument se stává kontextem pro další fázi. PRD říká architektovi, jaká omezení záleží. Architektura říká dev agentovi, jaké vzory následovat. Soubory stories poskytují zaměřený, kompletní kontext pro implementaci. Bez této struktury agenti dělají nekonzistentní rozhodnutí.

### Kontext projektu

:::tip[Doporučeno]
Vytvořte `project-context.md` pro zajištění toho, aby AI agenti dodržovali pravidla a preference vašeho projektu. Tento soubor funguje jako ústava vašeho projektu — vede implementační rozhodnutí napříč všemi workflow. Tento volitelný soubor lze vygenerovat na konci tvorby architektury, nebo u existujícího projektu ho lze také vygenerovat pro zachycení toho, co je důležité pro zachování souladu se současnými konvencemi.
:::

**Jak ho vytvořit:**

- **Ručně** — Vytvořte `_sedona-output/project-context.md` s vaším technologickým stackem a pravidly implementace
- **Vygenerujte ho** — Spusťte `sedona-generate-project-context` pro automatické generování z vaší architektury nebo kódové báze

[**Zjistit více o project-context.md**](../explanation/project-context.md)

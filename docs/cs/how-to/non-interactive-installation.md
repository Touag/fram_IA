---
title: Neinteraktivní instalace
description: Instalace Sedona pomocí příznaků příkazové řádky pro CI/CD pipelines a automatizované nasazení
sidebar:
  order: 2
---

Použijte příznaky příkazové řádky k neinteraktivní instalaci Sedona. To je užitečné pro:

## Kdy to použít

- Automatizovaná nasazení a CI/CD pipelines
- Skriptované instalace
- Hromadné instalace napříč více projekty
- Rychlé instalace se známými konfiguracemi

:::note[Předpoklady]
Vyžaduje [Node.js](https://nodejs.org) v20+ a `npx` (součástí npm).
:::

## Dostupné příznaky

### Možnosti instalace

| Příznak | Popis | Příklad |
|---------|-------|---------|
| `--directory <cesta>` | Instalační adresář | `--directory ~/projects/myapp` |
| `--modules <moduly>` | Čárkou oddělená ID modulů | `--modules bmm,bmb` |
| `--tools <nástroje>` | Čárkou oddělená ID nástrojů/IDE (použijte `none` pro přeskočení) | `--tools claude-code,cursor` nebo `--tools none` |
| `--action <typ>` | Akce pro existující instalace: `install` (výchozí), `update` nebo `quick-update` | `--action quick-update` |

### Základní konfigurace

| Příznak | Popis | Výchozí |
|---------|-------|---------|
| `--user-name <jméno>` | Jméno, které agenti použijí | Systémové uživatelské jméno |
| `--communication-language <jazyk>` | Jazyk komunikace agentů | English |
| `--document-output-language <jazyk>` | Jazyk výstupních dokumentů | English |
| `--output-folder <cesta>` | Cesta k výstupní složce | _sedona-output |

### Další možnosti

| Příznak | Popis |
|---------|-------|
| `-y, --yes` | Přijmout všechna výchozí nastavení a přeskočit výzvy |
| `-d, --debug` | Povolit ladící výstup pro generování manifestu |

## ID modulů

Dostupná ID modulů pro příznak `--modules`:

- `bmm` — Sedona Master
- `bmb` — Sedona Builder

Zkontrolujte [registr Sedona](https://github.com/sedona-code-org) pro dostupné externí moduly.

## ID nástrojů/IDE

Dostupná ID nástrojů pro příznak `--tools`:

**Preferované:** `claude-code`, `cursor`

Spusťte `npx sedona install` interaktivně jednou pro zobrazení aktuálního seznamu podporovaných nástrojů, nebo zkontrolujte [konfiguraci kódů platforem](https://github.com/sedona-code-org/SEDONA/blob/main/tools/cli/installers/lib/ide/platform-codes.yaml).

## Režimy instalace

| Režim | Popis | Příklad |
|-------|-------|---------|
| Plně neinteraktivní | Zadejte všechny příznaky pro přeskočení výzev | `npx sedona install --directory . --modules bmm --tools claude-code --yes` |
| Polo-interaktivní | Zadejte některé příznaky; Sedona se zeptá na zbytek | `npx sedona install --directory . --modules bmm` |
| Pouze výchozí | Přijměte vše výchozí s `-y` | `npx sedona install --yes` |
| Bez nástrojů | Přeskočte konfiguraci nástrojů/IDE | `npx sedona install --modules bmm --tools none` |

## Příklady

### Instalace v CI/CD pipeline

```bash
#!/bin/bash
# install-sedona.sh

npx sedona install \
  --directory "${GITHUB_WORKSPACE}" \
  --modules bmm \
  --tools claude-code \
  --user-name "CI Bot" \
  --communication-language English \
  --document-output-language English \
  --output-folder _sedona-output \
  --yes
```

### Aktualizace existující instalace

```bash
npx sedona install \
  --directory ~/projects/myapp \
  --action update \
  --modules bmm,bmb,custom-module
```

### Rychlá aktualizace (zachování nastavení)

```bash
npx sedona install \
  --directory ~/projects/myapp \
  --action quick-update
```

## Co získáte

- Plně nakonfigurovaný adresář `_sedona/` ve vašem projektu
- Agenty a workflow nakonfigurované pro vybrané moduly a nástroje
- Složku `_sedona-output/` pro generované artefakty

## Validace a zpracování chyb

Sedona validuje všechny zadané příznaky:

- **Adresář** — Musí být platná cesta s oprávněním k zápisu
- **Moduly** — Upozorní na neplatná ID modulů (ale nespadne)
- **Nástroje** — Upozorní na neplatná ID nástrojů (ale nespadne)
- **Vlastní obsah** — Každá cesta musí obsahovat platný soubor `module.yaml`
- **Akce** — Musí být jedna z: `install`, `update`, `quick-update`

Neplatné hodnoty buď:
1. Zobrazí chybu a ukončí se (pro kritické možnosti jako adresář)
2. Zobrazí varování a přeskočí (pro volitelné položky jako vlastní obsah)
3. Přepnou na interaktivní výzvy (pro chybějící povinné hodnoty)

:::tip[Osvědčené postupy]
- Používejte absolutní cesty pro `--directory` pro zamezení nejednoznačnosti
- Otestujte příznaky lokálně před použitím v CI/CD pipelines
- Kombinujte s `-y` pro skutečně bezobslužné instalace
- Použijte `--debug` pokud narazíte na problémy během instalace
:::

## Řešení problémů

### Instalace selže s „Invalid directory“

- Cesta k adresáři musí existovat (nebo musí existovat jeho nadřazený adresář)
- Potřebujete oprávnění k zápisu
- Cesta musí být absolutní nebo správně relativní k aktuálnímu adresáři

### Modul nenalezen

- Ověřte, že ID modulu je správné
- Externí moduly musí být dostupné v registru

:::note[Stále jste uvízli?]
Spusťte s `--debug` pro detailní výstup, zkuste interaktivní režim pro izolaci problému, nebo nahlaste na <https://github.com/sedona-code-org/SEDONA/issues>.
:::

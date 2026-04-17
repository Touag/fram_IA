---
title: "Jak nainstalovat Sedona"
description: Průvodce instalací Sedona ve vašem projektu krok za krokem
sidebar:
  order: 1
---

Použijte příkaz `npx sedona install` k nastavení Sedona ve vašem projektu s výběrem modulů a AI nástrojů.

Pokud chcete použít neinteraktivní instalátor a zadat všechny možnosti na příkazové řádce, podívejte se na [tento návod](./non-interactive-installation.md).

## Kdy to použít

- Začínáte nový projekt s Sedona
- Přidáváte Sedona do existující kódové báze
- Aktualizujete stávající instalaci Sedona

:::note[Předpoklady]
- **Node.js** 20+ (vyžadováno pro instalátor)
- **Git** (doporučeno)
- **AI nástroj** (Claude Code, Cursor nebo podobný)
:::

## Kroky

### 1. Spusťte instalátor

```bash
npx sedona install
```

:::tip[Chcete nejnovější prereleaseový build?]
Použijte dist-tag `next`:
```bash
npx sedona@next install
```

Získáte novější změny dříve, s vyšší šancí na nestabilitu oproti výchozí instalaci.
:::

:::tip[Bleeding edge]
Pro instalaci nejnovější verze z hlavní větve (může být nestabilní):
```bash
npx github:sedona-code-org/SEDONA install
```
:::

### 2. Zvolte umístění instalace

Instalátor se zeptá, kam nainstalovat soubory Sedona:

- Aktuální adresář (doporučeno pro nové projekty, pokud jste adresář vytvořili sami a spouštíte z něj)
- Vlastní cesta

### 3. Vyberte své AI nástroje

Vyberte, které AI nástroje používáte:

- Claude Code
- Cursor
- Ostatní

Každý nástroj má svůj vlastní způsob integrace skills. Instalátor vytvoří drobné prompt soubory pro aktivaci workflow a agentů — jednoduše je umístí tam, kde je váš nástroj očekává.

:::note[Povolení skills]
Některé platformy vyžadují explicitní povolení skills v nastavení, než se zobrazí. Pokud nainstalujete Sedona a nevidíte skills, zkontrolujte nastavení vaší platformy nebo se zeptejte svého AI asistenta, jak skills povolit.
:::

### 4. Zvolte moduly

Instalátor zobrazí dostupné moduly. Vyberte ty, které potřebujete — většina uživatelů chce pouze **Sedona** (modul pro vývoj softwaru).

### 5. Následujte výzvy

Instalátor vás provede zbytkem — vlastní obsah, nastavení atd.

## Co získáte

```text
váš-projekt/
├── _sedona/
│   ├── bmm/            # Vaše vybrané moduly
│   │   └── config.yaml # Nastavení modulu (pokud byste ho někdy potřebovali změnit)
│   ├── core/           # Povinný základní modul
│   └── ...
├── _sedona-output/       # Generované artefakty
├── .claude/            # Claude Code skills (pokud používáte Claude Code)
│   └── skills/
│       ├── sedona-help/
│       ├── sedona-persona/
│       └── ...
└── .cursor/            # Cursor skills (pokud používáte Cursor)
    └── skills/
        └── ...
```

## Ověření instalace

Spusťte `sedona-help` pro ověření, že vše funguje, a zjistěte, co dělat dál.

**Sedona-Help je váš inteligentní průvodce**, který:
- Potvrdí, že vaše instalace funguje
- Ukáže, co je dostupné na základě nainstalovaných modulů
- Doporučí váš první krok

Můžete mu také klást otázky:
```
sedona-help I just installed, what should I do first?
sedona-help What are my options for a SaaS project?
```

## Řešení problémů

**Instalátor vyhodí chybu** — Zkopírujte výstup do svého AI asistenta a nechte ho to vyřešit.

**Instalátor fungoval, ale něco nefunguje později** — Vaše AI potřebuje kontext Sedona, aby pomohla. Podívejte se na [Jak získat odpovědi o Sedona](./get-answers-about-sedona.md) pro návod, jak nasměrovat AI na správné zdroje.

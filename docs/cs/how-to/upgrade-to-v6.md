---
title: "Jak upgradovat na v6"
description: Migrace z Sedona v4 na v6
sidebar:
  order: 3
---

Použijte instalátor Sedona pro upgrade z v4 na v6, který zahrnuje automatickou detekci starších instalací a asistenci při migraci.

## Kdy to použít

- Máte nainstalovaný Sedona v4 (složka `.sedona`)
- Chcete migrovat na novou architekturu v6
- Máte existující plánovací artefakty k zachování

:::note[Předpoklady]
- Node.js 20+
- Existující instalace Sedona v4
:::

## Kroky

### 1. Spusťte instalátor

Postupujte podle [instrukcí instalátoru](./install-sedona.md).

### 2. Zpracování starší instalace

Když je detekována v4, můžete:

- Nechat instalátor zálohovat a odstranit `.sedona`
- Ukončit a zpracovat vyčištění ručně

Pokud jste pojmenovali složku sedona method jinak, musíte ji odstranit ručně.

### 3. Vyčištění IDE skills

Ručně odstraňte starší v4 IDE příkazy/skills — například pokud máte Claude Code, hledejte vnořené složky začínající na sedona a odstraňte je:

- `.claude/commands/`

Nové v6 skills se instalují do:

- `.claude/skills/`

### 4. Migrace plánovacích artefaktů

**Pokud máte plánovací dokumenty (Brief/PRD/UX/Architektura):**

Přesuňte je do `_sedona-output/planning-artifacts/` s popisnými názvy:

- Zahrňte `PRD` v názvu souboru pro PRD dokumenty
- Zahrňte `brief`, `architecture` nebo `ux-design` odpovídajícím způsobem
- Rozdělené dokumenty mohou být v pojmenovaných podsložkách

**Pokud jste uprostřed plánování:** Zvažte restart s v6 workflow. Použijte existující dokumenty jako vstupy — nové workflow s progresivním objevováním, webovým vyhledáváním a plan mode IDE produkují lepší výsledky.

### 5. Migrace probíhajícího vývoje

Pokud máte vytvořené nebo implementované stories:

1. Dokončete instalaci v6
2. Umístěte `epics.md` nebo `epics/epic*.md` do `_sedona-output/planning-artifacts/`
3. Spusťte workflow `sedona-sprint-planning` Scrum Mastera
4. Řekněte SM, které epicy/stories jsou již dokončené

## Co získáte

**Sjednocená struktura v6:**

```text
váš-projekt/
├── _sedona/               # Jedna instalační složka
│   ├── _config/         # Vaše přizpůsobení
│   │   └── agents/      # Soubory přizpůsobení agentů
│   ├── core/            # Univerzální základní framework
│   ├── bmm/             # Modul Sedona
│   ├── bmb/             # Sedona Builder
│   └── cis/             # Creative Intelligence Suite
└── _sedona-output/        # Výstupní složka (v4 to byla složka dokumentů)
```

## Migrace modulů

| Modul v4                      | Stav v6                            |
| ----------------------------- | ---------------------------------- |
| `.sedona-2d-phaser-game-dev`    | Integrován do modulu BMGD          |
| `.sedona-2d-unity-game-dev`     | Integrován do modulu BMGD          |
| `.sedona-godot-game-dev`        | Integrován do modulu BMGD          |
| `.sedona-infrastructure-devops` | Zastaralý — nový DevOps agent brzy |
| `.sedona-creative-writing`      | Neadaptován — nový v6 modul brzy   |

## Klíčové změny

| Koncept         | v4                                   | v6                                     |
| --------------- | ------------------------------------ | -------------------------------------- |
| **Core**        | `_sedona-core` byl vlastně Sedona | `_sedona/core/` je univerzální framework |
| **Method**      | `_sedona`                       | `_sedona/bmm/`                           |
| **Konfigurace** | Přímá editace souborů                | `config.yaml` pro každý modul          |
| **Dokumenty**   | Vyžadované nastavení shardů          | Plně flexibilní, auto-skenování        |

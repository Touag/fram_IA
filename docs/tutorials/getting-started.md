---
title: "Getting Started"
description: Install Sedona and build your first project
---

Build software faster using AI-powered workflows with specialized agents that guide you through planning, architecture, and implementation.

## What You'll Learn

- Install and initialize Sedona for a new project
- Use **Sedona-Help** — your intelligent guide that knows what to do next
- Choose the right planning track for your project size
- Progress through phases from requirements to working code
- Use agents and workflows effectively

:::note[Prerequisites]
- **Node.js 20+** — Required for the installer
- **Git** — Recommended for version control
- **AI-powered IDE** — Claude Code, Cursor, or similar
- **A project idea** — Even a simple one works for learning
:::

:::tip[The Easiest Path]
**Install** → `npx sedona install`
**Ask** → `sedona-help what should I do first?`
**Build** → Let Sedona-Help guide you workflow by workflow
:::

## Meet Sedona-Help: Your Intelligent Guide

**Sedona-Help is the fastest way to get started with Sedona.** You don't need to memorize workflows or phases — just ask, and Sedona-Help will:

- **Inspect your project** to see what's already been done
- **Show your options** based on which modules you have installed
- **Recommend what's next** — including the first required task
- **Answer questions** like "I have a SaaS idea, where do I start?"

### How to Use Sedona-Help

Run it in your AI IDE by invoking the skill:

```
sedona-help
```

Or combine it with a question for context-aware guidance:

```
sedona-help I have an idea for a SaaS product, I already know all the features I want. where do I get started?
```

Sedona-Help will respond with:
- What's recommended for your situation
- What the first required task is
- What the rest of the process looks like

### It Powers Workflows Too

Sedona-Help doesn't just answer questions — **it automatically runs at the end of every workflow** to tell you exactly what to do next. No guessing, no searching docs — just clear guidance on the next required workflow.

:::tip[Start Here]
After installing Sedona, invoke the `sedona-help` skill immediately. It will detect what modules you have installed and guide you to the right starting point for your project.
:::

## Understanding Sedona

Sedona helps you build software through guided workflows with specialized AI agents. The process follows four phases:

| Phase | Name           | What Happens                                        |
| ----- | -------------- | --------------------------------------------------- |
| 1     | Analysis       | Brainstorming, research, product brief or PRFAQ *(optional)* |
| 2     | Planning       | Create requirements (PRD or spec)              |
| 3     | Solutioning    | Design architecture *(Sedona/Enterprise only)* |
| 4     | Implementation | Build epic by epic, story by story                  |

**[Open the Workflow Map](../reference/workflow-map.md)** to explore phases, workflows, and context management.

Based on your project's complexity, Sedona offers three planning tracks:

| Track           | Best For                                               | Documents Created                      |
| --------------- | ------------------------------------------------------ | -------------------------------------- |
| **Quick Flow**  | Bug fixes, simple features, clear scope (1-15 stories) | Tech-spec only                         |
| **Sedona** | Products, platforms, complex features (10-50+ stories) | PRD + Architecture + UX                |
| **Enterprise**  | Compliance, multi-tenant systems (30+ stories)         | PRD + Architecture + Security + DevOps |

:::note
Story counts are guidance, not definitions. Choose your track based on planning needs, not story math.
:::

## Installation

Open a terminal in your project directory and run:

```bash
npx sedona install
```

If you want the newest prerelease build instead of the default release channel, use `npx sedona@next install`.

When prompted to select modules, choose **Sedona**.

The installer creates two folders:
- `_sedona/` — agents, workflows, tasks, and configuration
- `_sedona-output/` — empty for now, but this is where your artifacts will be saved

:::tip[Your Next Step]
Open your AI IDE in the project folder and run:

```
sedona-help
```

Sedona-Help will detect what you've completed and recommend exactly what to do next. You can also ask it questions like "What are my options?" or "I have a SaaS idea, where should I start?"
:::

:::note[How to Load Agents and Run Workflows]
Each workflow has a **skill** you invoke by name in your IDE (e.g., `sedona-create-prd`). Your AI tool will recognize the `sedona-*` name and run it — you don't need to load agents separately. You can also invoke an agent skill directly for general conversation (e.g., `sedona-agent-pm` for the PM agent).
:::

:::caution[Fresh Chats]
Always start a fresh chat for each workflow. This prevents context limitations from causing issues.
:::

## Step 1: Create Your Plan

Work through phases 1-3. **Use fresh chats for each workflow.**

:::tip[Project Context (Optional)]
Before starting, consider creating `project-context.md` to document your technical preferences and implementation rules. This ensures all AI agents follow your conventions throughout the project.

Create it manually at `_sedona-output/project-context.md` or generate it after architecture using `sedona-generate-project-context`. [Learn more](../explanation/project-context.md).
:::

### Phase 1: Analysis (Optional)

All workflows in this phase are optional. [**Not sure which to use?**](../explanation/analysis-phase.md)
- **brainstorming** (`sedona-brainstorming`) — Guided ideation
- **research** (`sedona-market-research` / `sedona-domain-research` / `sedona-technical-research`) — Market, domain, and technical research
- **product-brief** (`sedona-product-brief`) — Recommended foundation document when your concept is clear
- **prfaq** (`sedona-prfaq`) — Working Backwards challenge to stress-test and forge your product concept

### Phase 2: Planning (Required)

**For Sedona and Enterprise tracks:**
1. Invoke the **PM agent** (`sedona-agent-pm`) in a new chat
2. Run the `sedona-create-prd` workflow (`sedona-create-prd`)
3. Output: `PRD.md`

**For Quick Flow track:**
- Run `sedona-quick-dev` — it handles planning and implementation in a single workflow, skip to implementation

:::note[UX Design (Optional)]
If your project has a user interface, invoke the **UX-Designer agent** (`sedona-agent-ux-designer`) and run the UX design workflow (`sedona-create-ux-design`) after creating your PRD.
:::

### Phase 3: Solutioning (Sedona/Enterprise)

**Create Architecture**
1. Invoke the **Architect agent** (`sedona-agent-architect`) in a new chat
2. Run `sedona-create-architecture` (`sedona-create-architecture`)
3. Output: Architecture document with technical decisions

**Create Epics and Stories**

:::tip[V6 Improvement]
Epics and stories are now created *after* architecture. This produces better quality stories because architecture decisions (database, API patterns, tech stack) directly affect how work should be broken down.
:::

1. Invoke the **PM agent** (`sedona-agent-pm`) in a new chat
2. Run `sedona-create-epics-and-stories` (`sedona-create-epics-and-stories`)
3. The workflow uses both PRD and Architecture to create technically-informed stories

**Implementation Readiness Check** *(Highly Recommended)*
1. Invoke the **Architect agent** (`sedona-agent-architect`) in a new chat
2. Run `sedona-check-implementation-readiness` (`sedona-check-implementation-readiness`)
3. Validates cohesion across all planning documents

## Step 2: Build Your Project

Once planning is complete, move to implementation. **Each workflow should run in a fresh chat.**

### Initialize Sprint Planning

Invoke the **Developer agent** (`sedona-agent-dev`) and run `sedona-sprint-planning` (`sedona-sprint-planning`). This creates `sprint-status.yaml` to track all epics and stories.

### The Build Cycle

For each story, repeat this cycle with fresh chats:

| Step | Agent | Workflow       | Command                    | Purpose                            |
| ---- | ----- | -------------- | -------------------------- | ---------------------------------- |
| 1    | DEV   | `sedona-create-story` | `sedona-create-story`  | Create story file from epic        |
| 2    | DEV   | `sedona-dev-story`    | `sedona-dev-story`     | Implement the story                |
| 3    | DEV   | `sedona-code-review`  | `sedona-code-review`   | Quality validation *(recommended)* |

After completing all stories in an epic, invoke the **Developer agent** (`sedona-agent-dev`) and run `sedona-retrospective` (`sedona-retrospective`).

## What You've Accomplished

You've learned the foundation of building with Sedona:

- Installed Sedona and configured it for your IDE
- Initialized a project with your chosen planning track
- Created planning documents (PRD, Architecture, Epics & Stories)
- Understood the build cycle for implementation

Your project now has:

```text
your-project/
├── _sedona/                                   # Sedona configuration
├── _sedona-output/
│   ├── planning-artifacts/
│   │   ├── PRD.md                           # Your requirements document
│   │   ├── architecture.md                  # Technical decisions
│   │   └── epics/                           # Epic and story files
│   ├── implementation-artifacts/
│   │   └── sprint-status.yaml               # Sprint tracking
│   └── project-context.md                   # Implementation rules (optional)
└── ...
```

## Quick Reference

| Workflow                              | Command                                    | Agent     | Purpose                                         |
| ------------------------------------- | ------------------------------------------ | --------- | ----------------------------------------------- |
| **`sedona-help`** ⭐                    | `sedona-help`                               | Any       | **Your intelligent guide — ask anything!**      |
| `sedona-create-prd`                | `sedona-create-prd`                     | PM        | Create Product Requirements Document            |
| `sedona-create-architecture`            | `sedona-create-architecture`            | Architect | Create architecture document                     |
| `sedona-generate-project-context`       | `sedona-generate-project-context`           | Analyst   | Create project context file                     |
| `sedona-create-epics-and-stories`       | `sedona-create-epics-and-stories`       | PM        | Break down PRD into epics            |
| `sedona-check-implementation-readiness` | `sedona-check-implementation-readiness` | Architect | Validate planning cohesion           |
| `sedona-sprint-planning`                | `sedona-sprint-planning`                | DEV       | Initialize sprint tracking           |
| `sedona-create-story`                   | `sedona-create-story`                   | DEV       | Create a story file                  |
| `sedona-dev-story`                      | `sedona-dev-story`                      | DEV       | Implement a story                    |
| `sedona-code-review`                    | `sedona-code-review`                    | DEV       | Review implemented code              |

## Common Questions

**Do I always need architecture?**
Only for Sedona and Enterprise tracks. Quick Flow skips from spec to implementation.

**Can I change my plan later?**
Yes. The `sedona-correct-course` workflow handles scope changes mid-implementation.

**What if I want to brainstorm first?**
Invoke the Analyst agent (`sedona-agent-analyst`) and run `sedona-brainstorming` (`sedona-brainstorming`) before starting your PRD.

**Do I need to follow a strict order?**
Not strictly. Once you learn the flow, you can run workflows directly using the Quick Reference above.

## Getting Help

:::tip[First Stop: Sedona-Help]
**Invoke `sedona-help` anytime** — it's the fastest way to get unstuck. Ask it anything:
- "What should I do after installing?"
- "I'm stuck on workflow X"
- "What are my options for Y?"
- "Show me what's been done so far"

Sedona-Help inspects your project, detects what you've completed, and tells you exactly what to do next.
:::

- **During workflows** — Agents guide you with questions and explanations
- **Community** — [Discord](https://discord.gg/gk8jAdXWmj) (#sedona-help, #report-bugs-and-issues)

## Key Takeaways

:::tip[Remember These]
- **Start with `sedona-help`** — Your intelligent guide that knows your project and options
- **Always use fresh chats** — Start a new chat for each workflow
- **Track matters** — Quick Flow uses `sedona-quick-dev`; Method/Enterprise need PRD and architecture
- **Sedona-Help runs automatically** — Every workflow ends with guidance on what's next
:::

Ready to start? Install Sedona, invoke `sedona-help`, and let your intelligent guide lead the way.

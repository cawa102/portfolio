# Statement of Work: PluginArena

**Project Name:** PluginArena
**Version:** 0.1.0 (Beta)
**Repository:** https://github.com/cawa102/PluginArena
**Live Site:** https://plugin-arena.vercel.app
**License:** MIT

---

## 1. Executive Summary

PluginArena is a community-driven ranking platform for Claude Code extensions—MCP servers, skills, hooks, and commands. Inspired by LMArena's pairwise comparison approach, it combines community votes with GitHub metrics to surface the most useful tools for AI-assisted development.

---

## 2. Project Objectives

| Objective | Description |
|-----------|-------------|
| **Discovery** | Help developers find the best Claude Code extensions |
| **Community** | Enable community-driven quality assessment |
| **Transparency** | Provide open, reproducible ranking algorithms |
| **Automation** | Auto-discover plugins from GitHub |

---

## 3. Problem Statement

The Claude Code ecosystem is growing fast, but finding quality extensions is challenging:

| Problem | Description |
|---------|-------------|
| **Star Inflation** | GitHub stars don't reflect real utility |
| **Stale Lists** | "Awesome" lists can't keep pace |
| **No Comparison** | Hard to choose between similar plugins |

### Solution

PluginArena asks: **"Which plugin do you prefer?"**

By aggregating pairwise comparisons from developers who've actually used these tools, rankings reflect real-world utility.

---

## 4. Technical Architecture

```
GitHub Discovery          Community Votes           Combined Rankings
      │                         │                         │
      ▼                         ▼                         ▼
+-----------+            +-----------+            +-----------+
│ Stars     │            │ Pairwise  │            │ Now       │ ← Best overall
│ Metadata  │──────┬────▶│ ELO       │──────┬────▶│ Trend     │ ← Rising stars
│ Topics    │      │     │ Scores    │      │     │ Classic   │ ← All-time best
+-----------+      │     +-----------+      │     +-----------+
                   │                        │
              Daily Sync              Real-time
```

### ELO System

Based on the Bradley-Terry model (same as chess ratings and LMArena):
- **Initial rating:** 1500
- **K-factor:** 32
- Higher-rated wins → small change; underdog wins → bigger change

### Hybrid Scoring (Now Ranking)

```
Score = (Normalized ELO × 0.6) + (Normalized Stars × 0.4)
```

---

## 5. Technology Stack

| Component | Technology |
|-----------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |
| i18n | next-intl |
| Testing | Playwright E2E |

---

## 6. Key Deliverables

| Deliverable | Description | Status |
|-------------|-------------|--------|
| Ranking System | 3 views (Now, Trend, Classic) | Complete |
| Pairwise Voting | A/B comparison interface | Complete |
| GitHub Discovery | Auto-fetch Claude Code plugins | Complete |
| Category Filtering | MCP, Skills, Hooks, Commands | Complete |
| Responsive UI | Mobile-friendly design | Complete |
| Vercel Deployment | Production hosting | Complete |

---

## 7. Features

### Three Ranking Views

| View | Question It Answers | Based On |
|------|---------------------|----------|
| **Now** | What should I adopt today? | ELO (60%) + GitHub stars (40%) |
| **Trend** | What's gaining momentum? | 60-day star growth + recent votes |
| **Classic** | What's stood the test of time? | All-time GitHub stars |

### Four Plugin Categories

| Category | What It Is | Examples |
|----------|------------|----------|
| **MCP Servers** | Model Context Protocol integrations | Database connectors, API wrappers |
| **Skills** | Specialized agent behaviors | Code review, documentation generators |
| **Hooks** | Workflow automation | Pre-commit checks, auto-formatting |
| **Commands** | Slash commands | Project scaffolding, deployment tools |

### Voting System

- **Simple A/B choices** — Pick preferred plugin or skip
- **No account required** — Anonymous voting
- **Smart matchmaking** — Pair plugins at similar skill levels
- **Keyboard shortcuts** — `1`/`2` or Arrow keys

---

## 8. Database Schema

### Core Tables

| Table | Purpose |
|-------|---------|
| `plugins` | Plugin metadata, GitHub stats, ELO scores |
| `votes` | Pairwise comparison results |
| `github_metrics_history` | Daily star snapshots |

### Key Fields (plugins)

```sql
id, name, description, github_url, category,
stars, forks, elo_score, vote_count,
created_at, updated_at, last_synced_at
```

---

## 9. API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/plugins` | GET | List plugins with filtering |
| `/api/plugins/[id]` | GET | Single plugin details |
| `/api/vote` | POST | Submit pairwise vote |
| `/api/matchup` | GET | Get next voting pair |
| `/api/admin/sync` | POST | Trigger GitHub sync |

---

## 10. Current Status & Roadmap

### Current Status: Beta v0.1.0

| Milestone | Status |
|-----------|--------|
| Core ranking system | Complete |
| Pairwise voting | Complete |
| GitHub discovery | Complete |
| Vercel deployment | Complete |
| Daily metrics sync | Complete |

### Roadmap

- [ ] GitHub OAuth authentication
- [ ] Manual plugin submission
- [ ] Individual plugin detail pages
- [ ] X/Twitter mention tracking for trends
- [ ] Public API for rankings
- [ ] Browser extension for inline GitHub recommendations

---

## 11. Self-Hosting

```bash
git clone https://github.com/cawa102/PluginArena.git
cd PluginArena
npm install
cp .env.example .env.local
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxx...
ADMIN_TOKEN=your-secure-admin-token
GITHUB_TOKEN=ghp_xxx  # Optional, increases rate limits
```

---

## 12. Use Cases

| Persona | Use Case |
|---------|----------|
| **New User** | Check Classic ranking for battle-tested plugins |
| **Trend Watcher** | Check Trend ranking for rising stars |
| **Decision Maker** | Compare ELO scores of similar plugins |
| **Plugin Author** | Auto-discovery if GitHub repo has Claude Code keywords |

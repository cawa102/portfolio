# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website for **cawa1 (Kyosuke Kawai)** — a single-page application showcasing 4 open-source security/AI projects. Dark-themed creative design targeting tech recruiters. All content is static (no backend, no API routes, no database).

Full specification: `spec.md` (841 lines, the source of truth for all requirements).
Project SOWs for the 4 showcased projects: `docs/01-04_*.md`.

## Tech Stack

- **Framework:** Next.js 15+ (App Router, Static Site Generation)
- **UI:** React 19, Tailwind CSS 4, Framer Motion 11+
- **Language:** TypeScript 5.x
- **Particles:** @tsparticles/react + @tsparticles/slim
- **Icons:** Lucide React
- **Package Manager:** pnpm 9+
- **Deploy:** Vercel
- **Linting:** ESLint 9+

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server
pnpm build            # Production build (SSG)
pnpm lint             # Run ESLint
```

## Architecture

Single-page SSG app. No dynamic routes, no server components fetching data, no API routes.

```
src/
├── app/
│   ├── layout.tsx        # Root layout + metadata + Navbar/Footer wrapper
│   ├── page.tsx           # Orchestrates all section components (≤50 lines)
│   └── globals.css        # CSS variables + Tailwind directives
├── components/
│   ├── layout/            # Navbar.tsx, Footer.tsx
│   ├── sections/          # Hero, About, Projects, Skills, Education, Blog, Contact
│   └── ui/                # ProjectCard, SkillBadge, TypingEffect, ParticleBackground, ScrollAnimation
├── data/                  # Static readonly TypeScript arrays (projects, skills, links)
└── lib/
    └── constants.ts       # Section IDs, animation config
```

**Key constraints from spec:**
- Section components: ≤150 lines | UI components: ≤100 lines | Data files: ≤80 lines
- `ParticleBackground` must use `next/dynamic` with `{ ssr: false }`
- All data arrays/objects use `as const` or `readonly` (immutable)

## Design System

**Colors (CSS custom properties in globals.css):**
- Background: `#0a0a0a` (primary), `#111827` (cards), `#1f2937` (hover)
- Text: `#e2e8f0` (headings), `#94a3b8` (body), `#64748b` (muted)
- Accents: `#00d4ff` (cyan primary), `#7c3aed` (purple), `#22c55e` (Release badge), `#f59e0b` (Beta badge)

**Typography:** Space Grotesk (headings), Inter (body), JetBrains Mono (code)

**Breakpoints:** Mobile (<640px) → sm (640px) → md (768px, 2-col grid) → lg (1024px) → xl (1280px, max-width)

## Performance & Accessibility Targets

- Lighthouse: 90+ all categories
- FCP <1.5s, LCP <2.5s, CLS <0.1, bundle <150kB gzipped
- WCAG 2.1 AA, keyboard navigable, `prefers-reduced-motion` support, 4.5:1 contrast ratio

## Implementation Phases

1. Project setup + dependencies + data files
2. Layout (Navbar/Footer) + Hero section (particles + typing)
3. Content sections (About, Projects, Skills)
4. Supporting sections (Education, Blog, Contact)
5. Framer Motion scroll animations + polish
6. SEO (Open Graph, JSON-LD, sitemap, robots.txt)
7. Vercel deployment

---

## エージェント (Subagents)

| エージェント | 用途 | いつ使う |
|-------------|------|---------|
| `everything-claude-code:code-reviewer` | コード品質・セキュリティ・保守性レビュー | **コード作成・変更後に必ず使用**。git diffで変更を確認し、Critical/High/Medium優先度で問題を報告 |
| `everything-claude-code:security-reviewer` | 脆弱性検出・OWASP Top 10チェック | 認証/認可コード作成時、ユーザー入力処理時、APIエンドポイント作成時、機密データ・決済処理時、外部API連携時。シークレット漏洩、SSRF、インジェクション、XSSを検出 |
| `everything-claude-code:tdd-guide` | テスト駆動開発・80%+カバレッジ確保 | 新機能実装時、バグ修正時、リファクタリング時。テストを先に書く→失敗確認→実装→成功確認→リファクタのサイクルを強制 |
| `everything-claude-code:planner` | 実装計画・ステップ分解・リスク特定 | 複雑な機能実装時、アーキテクチャ変更時、大規模リファクタリング時。要件→アーキテクチャ→ステップ→テスト戦略→リスクの順で計画作成 |
| `everything-claude-code:architect` | システム設計・スケーラビリティ・技術決定 | 新機能のアーキテクチャ設計時、技術選定時、スケーラビリティ検討時。トレードオフ分析とADR（Architecture Decision Records）作成 |
| `everything-claude-code:build-error-resolver` | ビルド・TypeScriptエラーの迅速修正 | `npm run build`失敗時、`tsc --noEmit`エラー時、型エラーでブロック時。**最小限の変更のみ**でビルドを通す。リファクタ・設計変更はしない |
| `everything-claude-code:e2e-runner` | E2Eテスト生成・実行・アーティファクト管理 | 重要なユーザーフロー検証時、テストジャーニー作成時。Vercel Agent Browser優先、Playwright fallback。スクリーンショット/動画/トレース取得 |
| `everything-claude-code:database-reviewer` | PostgreSQL最適化・スキーマ設計・RLS | SQL作成時、マイグレーション作成時、スキーマ設計時、遅いクエリのトラブルシュート時。インデックス戦略、RLSポリシー、N+1防止、Supabaseベストプラクティス |
| `everything-claude-code:refactor-cleaner` | デッドコード削除・重複統合 | コードクリーンアップ時。knip/depcheck/ts-pruneで分析→安全確認→削除→DELETION_LOG.md記録。**アクティブ開発中・本番デプロイ直前は使わない** |
| `everything-claude-code:doc-updater` | コードマップ・ドキュメント更新 | コードマップ更新時、README更新時、docs/CODEMAPS/*生成時。ts-morphでAST解析、依存関係マッピング、ドキュメント自動生成 |

## スキル (Skills)

| スキル | 用途 | いつ使う |
|-------|------|---------|
| `security-review` | セキュリティチェックリスト・パターン集 | 認証実装時、ユーザー入力処理時、シークレット扱い時、APIエンドポイント作成時、決済機能実装時、機密データ送受信時。シークレット管理、入力検証、SQLi/XSS/CSRF防止、レート制限のパターン提供 |
| `tdd-workflow` | TDD強制ワークフロー | 新機能作成時、バグ修正時、リファクタ時。ユーザージャーニー→テストケース生成→テスト失敗確認→実装→テスト成功→カバレッジ検証の流れを強制 |
| `postgres-patterns` | PostgreSQL最適化クイックリファレンス | SQL作成時、インデックス設計時、RLS実装時、パフォーマンス改善時。インデックス種類選択、データ型選択、RLSポリシー最適化、アンチパターン検出のチートシート |
| `backend-patterns` | バックエンド設計パターン集 | API設計時、リポジトリ/サービスレイヤー実装時、キャッシュ戦略検討時、エラーハンドリング設計時、認証/認可実装時。RESTful設計、N+1防止、リトライ、レート制限パターン |
| `frontend-patterns` | フロントエンド設計パターン集 | Reactコンポーネント設計時、カスタムフック作成時、状態管理実装時、パフォーマンス最適化時、フォーム処理時。Composition、Context+Reducer、メモ化、仮想化リストパターン |
| `coding-standards` | コーディング規約・ベストプラクティス | TypeScript/JavaScript/React開発全般。命名規則、ファイル構成、エラーハンドリング、型定義のベストプラクティス |
| `continuous-learning` | セッションからパターン自動抽出 | セッション終了時に自動実行（Stopフック）。エラー解決、ユーザー修正、ワークアラウンドを検出し`~/.claude/skills/learned/`に保存 |
| `strategic-compact` | 論理的タイミングでのコンパクト提案 | 探索フェーズ後→実行フェーズ前、マイルストーン完了後、大きなコンテキストシフト前。任意タイミングの自動コンパクトより効果的 |

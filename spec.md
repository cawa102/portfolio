# Statement of Work: Portfolio Website

**Project Name:** cawa1 Portfolio
**Version:** 1.0.0
**Author:** cawa1 (Kyosuke Kawai)
**Repository:** https://github.com/cawa102 (to be created)
**License:** MIT

---

## 1. Executive Summary

This project builds a personal portfolio website for cawa1 (Kyosuke Kawai), a Master's student in CyberSecurity based in the UK. The website serves as the primary tool for attracting recruiters at tech companies by showcasing expertise across three domains: AI agent development, security engineering, and full-stack development.

The site is a single-page application (SPA) built with Next.js and Tailwind CSS 4, featuring a dark-themed creative design with interactive elements including particle backgrounds, typing animations, and scroll-triggered transitions. It presents four production-grade open-source projects developed between November 2025 and February 2026, each linking directly to its GitHub repository.

---

## 2. Project Objectives

| Objective | Description | Success Criteria |
|-----------|-------------|------------------|
| **Recruiter Engagement** | Capture recruiter attention within the first 5 seconds of page load | Hero section with particle animation, typing effect, and clear value proposition |
| **Project Showcase** | Present 4 open-source projects as evidence of technical ability | Card-based project display with descriptions, tech tags, and direct GitHub links |
| **Skill Demonstration** | The portfolio itself demonstrates frontend engineering capability | Smooth animations, responsive design, clean architecture, and performance scores |
| **Discoverability** | Ensure the portfolio is easily shareable and SEO-optimized | Open Graph meta tags, JSON-LD structured data, semantic HTML |
| **Accessibility** | Accessible to all users including those with assistive technologies | WCAG 2.1 AA compliance, keyboard navigation, reduced motion support |

---

## 3. Scope of Work

### 3.1 In Scope

| Deliverable | Description |
|-------------|-------------|
| SPA Website | Single-page portfolio with 7 content sections + navigation + footer |
| Responsive Design | Mobile-first layout supporting 640px to 1280px+ viewports |
| Interactive Animations | Particle background, typing effect, scroll animations, hover effects |
| Project Cards | Clickable cards linking to GitHub repositories with metadata display |
| Skills Visualization | Categorized skill badges grouped by domain |
| SEO Optimization | Meta tags, Open Graph, JSON-LD, sitemap, robots.txt |
| Vercel Deployment | Production deployment with CI/CD from GitHub |

### 3.2 Out of Scope

| Item | Reason |
|------|--------|
| Dark/Light mode toggle | v1.0 ships dark mode only to maintain design consistency |
| Contact form with backend | No server-side processing; use mailto and social links instead |
| Medium API integration | Blog section links to Medium externally; no RSS/API fetching |
| CMS integration | All content is hardcoded in TypeScript data files for simplicity |
| Analytics dashboard | No analytics tracking in v1.0 |
| Multi-language (i18n) | English only; targeting global tech recruiters |
| User authentication | No login or user accounts required |
| GitHub API runtime calls | Star counts and metadata are hardcoded, not fetched at runtime |

---

## 4. Technical Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     Vercel (Hosting)                      │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │              Next.js App Router (SSG)                │  │
│  │                                                      │  │
│  │  ┌───────────────────────────────────────────────┐   │  │
│  │  │              Layout (layout.tsx)               │   │  │
│  │  │  ┌─────────┐                    ┌──────────┐  │   │  │
│  │  │  │ Navbar  │                    │  Footer  │  │   │  │
│  │  │  └─────────┘                    └──────────┘  │   │  │
│  │  │                                               │   │  │
│  │  │  ┌─────────────────────────────────────────┐  │   │  │
│  │  │  │           Page (page.tsx)                │  │   │  │
│  │  │  │                                         │  │   │  │
│  │  │  │  ┌─────────────────────────────────┐    │  │   │  │
│  │  │  │  │  Hero (particles + typing)      │    │  │   │  │
│  │  │  │  ├─────────────────────────────────┤    │  │   │  │
│  │  │  │  │  About Me                       │    │  │   │  │
│  │  │  │  ├─────────────────────────────────┤    │  │   │  │
│  │  │  │  │  Projects (card grid)           │    │  │   │  │
│  │  │  │  ├─────────────────────────────────┤    │  │   │  │
│  │  │  │  │  Skills (categorized badges)    │    │  │   │  │
│  │  │  │  ├─────────────────────────────────┤    │  │   │  │
│  │  │  │  │  Education                      │    │  │   │  │
│  │  │  │  ├─────────────────────────────────┤    │  │   │  │
│  │  │  │  │  Blog (Medium link)             │    │  │   │  │
│  │  │  │  ├─────────────────────────────────┤    │  │   │  │
│  │  │  │  │  Contact (social links)         │    │  │   │  │
│  │  │  │  └─────────────────────────────────┘    │  │   │  │
│  │  │  └─────────────────────────────────────────┘  │   │  │
│  │  └───────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  Static Data │  │  UI Comps    │  │  Animations  │    │
│  │  (TypeScript) │  │  (React 19) │  │(Framer Motion)│   │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└──────────────────────────────────────────────────────────┘
```

### 4.1 Rendering Strategy

| Strategy | Reason |
|----------|--------|
| **Static Site Generation (SSG)** | All content is static; no server-side data fetching needed |
| **Client-side animations** | Framer Motion and tsparticles run in the browser |
| **No API routes** | No backend logic; all data hardcoded in TypeScript files |

### 4.2 Data Flow

```
src/data/projects.ts ──┐
src/data/skills.ts   ──┤──▶ Section Components ──▶ Rendered HTML
src/data/links.ts    ──┘
```

All content is defined as typed TypeScript constants. There are no runtime API calls, no database connections, and no external data fetching. This ensures:
- Zero loading states for content
- Predictable rendering at build time
- No external service dependencies

---

## 5. Technology Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Framework | Next.js | 15+ (App Router) | React framework with SSG support |
| UI Library | React | 19 | Component-based UI |
| Language | TypeScript | 5.x | Type-safe development |
| Styling | Tailwind CSS | 4 | Utility-first CSS framework |
| Animation | Framer Motion | 11+ | Scroll animations, transitions, hover effects |
| Particles | @tsparticles/react + @tsparticles/slim | Latest | Animated particle background in Hero |
| Icons | Lucide React | Latest | Consistent icon set for UI and social links |
| Font | next/font (Google Fonts) | - | Inter, Space Grotesk, JetBrains Mono |
| Linting | ESLint | 9+ | Code quality enforcement |
| Deploy | Vercel | - | Hosting, CI/CD, CDN |
| Package Manager | pnpm | 9+ | Fast, disk-efficient dependency management |

---

## 6. Key Deliverables

| # | Deliverable | Description | Priority |
|---|-------------|-------------|----------|
| 1 | Project Setup | Next.js + Tailwind CSS + TypeScript + all dependencies initialized | High |
| 2 | Layout Components | Navbar (sticky, blur) + Footer | High |
| 3 | Hero Section | Particle background + typing effect + CTA buttons | High |
| 4 | About Section | Self-introduction with scroll fade-in animation | High |
| 5 | Projects Section | 4 project cards in responsive grid with hover effects | High |
| 6 | Skills Section | Categorized tech skill badges with stagger animation | High |
| 7 | Education Section | Academic background display | Medium |
| 8 | Blog Section | Medium link with description | Medium |
| 9 | Contact Section | Social link icons (GitHub, LinkedIn, Medium, Email) | High |
| 10 | Scroll Animations | Framer Motion scroll-triggered animations on all sections | Medium |
| 11 | SEO & Meta | Open Graph, JSON-LD, sitemap, robots.txt | Medium |
| 12 | Performance Optimization | Lighthouse 90+, lazy loading, code splitting | Medium |
| 13 | Accessibility | WCAG 2.1 AA, keyboard nav, reduced motion | Medium |
| 14 | Vercel Deployment | Production deploy with custom domain support | High |

---

## 7. Design Specifications

### 7.1 Design Tone

**Creative & Interactive** — The portfolio itself is a demonstration of frontend engineering skill. Every section features animation, every interactive element has a polished response, and the overall aesthetic communicates technical sophistication.

### 7.2 Color System

All colors are defined as CSS custom properties in `globals.css` and referenced via Tailwind config.

| Token | Hex Value | Usage |
|-------|-----------|-------|
| `--bg-primary` | `#0a0a0a` | Page background |
| `--bg-secondary` | `#111827` | Card backgrounds, elevated surfaces |
| `--bg-tertiary` | `#1f2937` | Hover states, borders |
| `--text-primary` | `#e2e8f0` | Headings, primary text |
| `--text-secondary` | `#94a3b8` | Body text, descriptions |
| `--text-muted` | `#64748b` | Captions, metadata |
| `--accent-cyan` | `#00d4ff` | Primary accent — links, highlights, particle color |
| `--accent-purple` | `#7c3aed` | Secondary accent — gradients, badges |
| `--accent-green` | `#22c55e` | Status badges (Release), success states |
| `--accent-amber` | `#f59e0b` | Status badges (Beta) |
| `--gradient-primary` | `#00d4ff → #7c3aed` | Hero text gradient, card glow borders |
| `--gradient-bg` | `#0a0a0a → #1a1a2e` | Page background gradient |

### 7.3 Typography

| Element | Font Family | Weight | Size (Desktop) | Size (Mobile) |
|---------|-------------|--------|----------------|---------------|
| h1 (Hero name) | Space Grotesk | 700 | 4rem (64px) | 2.5rem (40px) |
| h2 (Section title) | Space Grotesk | 700 | 2.25rem (36px) | 1.75rem (28px) |
| h3 (Card title) | Inter | 600 | 1.25rem (20px) | 1.125rem (18px) |
| Body text | Inter | 400 | 1rem (16px) | 0.875rem (14px) |
| Small / metadata | Inter | 400 | 0.875rem (14px) | 0.75rem (12px) |
| Code snippets | JetBrains Mono | 400 | 0.875rem (14px) | 0.75rem (12px) |

Font loading: Use `next/font/google` for automatic optimization. All fonts are loaded with `display: 'swap'` to prevent FOIT (Flash of Invisible Text).

### 7.4 Spacing System

Follow Tailwind CSS default spacing scale. Key section spacings:

| Element | Spacing |
|---------|---------|
| Section vertical padding | `py-20` (80px) on desktop, `py-12` (48px) on mobile |
| Section max-width | `max-w-6xl` (1152px) centered with `mx-auto` |
| Section horizontal padding | `px-4` (16px) on mobile, `px-6` (24px) on desktop |
| Card gap | `gap-6` (24px) |
| Card internal padding | `p-6` (24px) |

### 7.5 Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Default (mobile) | < 640px | Single column, smaller typography, hamburger nav |
| `sm` | 640px+ | Minor adjustments |
| `md` | 768px+ | 2-column project grid, expanded nav |
| `lg` | 1024px+ | Full desktop layout, all nav items visible |
| `xl` | 1280px+ | Max-width container, larger spacing |

---

## 8. Section Specifications

### 8.1 Navigation Bar

**Position:** Fixed at top (`sticky top-0 z-50`)
**Height:** 64px
**Background:** Transparent initially, `bg-[#0a0a0a]/80 backdrop-blur-md` after scrolling past 50px

| Element | Desktop Behavior | Mobile Behavior |
|---------|-----------------|-----------------|
| Logo/Name | Left-aligned, text "cawa1" in accent gradient | Same |
| Nav Links | Horizontal row: About, Projects, Skills, Education, Blog, Contact | Hidden; hamburger menu icon toggles mobile menu |
| Mobile Menu | N/A | Full-width dropdown below navbar, animated slide-down |
| Active State | Accent color underline on current section (based on scroll position) | Same |

**Scroll behavior:** Clicking a nav link smooth-scrolls to the target section's `id` attribute using `scroll-behavior: smooth` or Framer Motion `scrollIntoView`.

### 8.2 Hero Section

**Height:** `min-h-screen` (full viewport)
**Layout:** Centered vertically and horizontally using flexbox

```
┌─────────────────────────────────────────┐
│          [Particle Background]          │
│                                         │
│                                         │
│            Hi, I'm cawa1                │  ← gradient text
│                                         │
│     [AI Agent Developer|]               │  ← typing effect with cursor
│                                         │
│   Master's Student in CyberSecurity     │  ← subtitle
│            Based in UK                  │
│                                         │
│   [View Projects]  [Contact Me]         │  ← CTA buttons
│                                         │
│                                         │
│              ↓ scroll                   │  ← animated scroll indicator
└─────────────────────────────────────────┘
```

#### 8.2.1 Particle Background

| Property | Value |
|----------|-------|
| Library | `@tsparticles/react` + `@tsparticles/slim` |
| Particle count | 60-80 (desktop), 30-40 (mobile) |
| Particle color | `#00d4ff` (accent cyan) with 50% opacity |
| Particle size | 1-3px |
| Line connections | Enabled, max distance 150px, color `#00d4ff` at 20% opacity |
| Movement | Random drift, speed 0.5-1.0 |
| Mouse interaction | Particles repel from cursor (mode: "repulse", distance: 100px) |
| Z-index | Behind all content (`z-0`), content is `z-10` |
| Rendering | Canvas element, hardware-accelerated |

#### 8.2.2 Typing Effect

| Property | Value |
|----------|-------|
| Phrases | `["AI Agent Developer", "Security Engineer", "Full-Stack Developer"]` |
| Typing speed | 100ms per character |
| Deleting speed | 50ms per character |
| Pause after typing | 2000ms |
| Pause after deleting | 500ms |
| Cursor | `|` character, blinks at 530ms interval using CSS animation |
| Loop | Infinite |

Implementation: Custom React component with `useState` + `useEffect` + `setTimeout`. No external typing library needed.

#### 8.2.3 CTA Buttons

| Button | Style | Action |
|--------|-------|--------|
| "View Projects" | Solid accent gradient background (`cyan → purple`), white text | Smooth scroll to `#projects` |
| "Contact Me" | Outlined, border accent cyan, transparent background | Smooth scroll to `#contact` |

Both buttons: `rounded-lg px-6 py-3`, hover scale `1.05` with transition.

#### 8.2.4 Scroll Indicator

Animated chevron icon at bottom center. CSS animation: `translateY(0) → translateY(8px)`, infinite, 1.5s ease-in-out.

### 8.3 About Me Section

**Section ID:** `#about`

Content (hardcoded in component):

> I'm a CyberSecurity Master's student based in the UK, passionate about building AI-powered security tools. Over the past 4 months, I've shipped 4 production-grade open-source projects spanning AI agent orchestration, vulnerability detection, community platforms, and security scanning — all focused on the intersection of AI and cybersecurity.

**Layout:** Text-centered, max-width `max-w-3xl` for readability.
**Animation:** Fade-in from bottom on scroll (`opacity: 0, y: 20` → `opacity: 1, y: 0`).

### 8.4 Projects Section

**Section ID:** `#projects`
**Heading:** "Projects"
**Subheading:** "Open-source tools built at the intersection of AI and security"

**Layout:**
- Desktop (md+): 2-column CSS Grid (`grid-cols-2`)
- Mobile: 1-column (`grid-cols-1`)
- Gap: `gap-6`

#### 8.4.1 Project Card Component

Each card is an `<a>` element wrapping the card content, with `target="_blank"` and `rel="noopener noreferrer"`.

```
┌─────────────────────────────────────┐
│  [Status Badge: v2.0 Beta]          │  ← top-right, colored badge
│                                     │
│  VibeHackAI                         │  ← h3, font-semibold
│                                     │
│  Human-led AI Penetration Testing   │  ← description, text-secondary
│  Framework with 5 coordinated       │
│  agents                             │
│                                     │
│  [Python] [Claude Code] [Docker]    │  ← tech stack badges
│  [MCP]                              │
│                                     │
└─────────────────────────────────────┘
```

| Element | Styling |
|---------|---------|
| Card container | `bg-[--bg-secondary] rounded-xl p-6 border border-[--bg-tertiary]` |
| Status badge | Pill shape: `Release` → green bg, `Beta` → amber bg. Positioned top-right |
| Title | `text-xl font-semibold text-[--text-primary]` |
| Description | `text-sm text-[--text-secondary] mt-2`, 2-3 lines max |
| Tech badges | `inline-flex` pills, `text-xs px-2 py-1 rounded-full bg-[--bg-tertiary] text-[--text-muted]`, gap-2, flex-wrap |
| Hover effect | `translateY(-4px)`, `box-shadow: 0 0 20px rgba(0, 212, 255, 0.15)`, border color transitions to `--accent-cyan` at 40% opacity |
| Transition | `transition-all duration-300 ease-out` |
| Cursor | `cursor-pointer` |

#### 8.4.2 Project Data

Defined in `src/data/projects.ts`:

```typescript
interface Project {
  readonly title: string
  readonly description: string
  readonly techStack: readonly string[]
  readonly status: 'Release' | 'Beta'
  readonly version: string
  readonly repoUrl: string
}
```

| # | title | description | techStack | status | version | repoUrl |
|---|-------|-------------|-----------|--------|---------|---------|
| 1 | VibeHackAI | Human-led AI penetration testing framework with 5 coordinated agents and MCP integration | `["Python", "Claude Code", "Docker", "MCP"]` | Beta | v2.0 | `https://github.com/cawa102/VibeHackAI` |
| 2 | cveSentinel | AI-powered vulnerability detection combining NVD and Google OSV with zero false positives | `["Python", "NVD API", "Google OSV", "PyPI"]` | Beta | v0.2.0 | `https://github.com/cawa102/cveSentinel` |
| 3 | PluginArena | Community-driven Claude Code extension ranking platform with ELO-based pairwise voting | `["Next.js", "React", "Supabase", "Tailwind CSS"]` | Beta | v0.1.0 | `https://github.com/cawa102/PluginArena` |
| 4 | SkillGate | 6-layer defense-in-depth security scanner for Claude Code extensions with policy enforcement | `["TypeScript", "Node.js", "Vitest", "Zod"]` | Release | v1.0.0 | `https://github.com/cawa102/SkillGate` |

#### 8.4.3 Scroll Animation

Cards animate in with a staggered effect:
- Container: `staggerChildren: 0.15`
- Each card: `opacity: 0, y: 30` → `opacity: 1, y: 0`, duration `0.6s`, ease `easeOut`
- Trigger: `whileInView`, viewport `once: true, amount: 0.2`

### 8.5 Skills Section

**Section ID:** `#skills`
**Heading:** "Skills & Technologies"

**Layout:** Skills grouped by category. Each category is a vertical group with a category label and a flex-wrap row of skill badges.

#### 8.5.1 Skill Categories and Items

Defined in `src/data/skills.ts`:

```typescript
interface SkillCategory {
  readonly name: string
  readonly skills: readonly string[]
}
```

| Category | Skills |
|----------|--------|
| **Languages** | Python, TypeScript, JavaScript |
| **Frontend** | Next.js, React, Tailwind CSS |
| **Backend** | Node.js, Supabase, PostgreSQL |
| **AI / LLM** | Claude Code, MCP, Multi-Agent Orchestration |
| **Security** | Penetration Testing, Vulnerability Detection, Static Analysis, DevSecOps |
| **DevOps** | Docker, Vercel, GitHub Actions, CI/CD |
| **Testing** | Vitest, Playwright, pytest |

#### 8.5.2 Skill Badge Styling

| Element | Styling |
|---------|---------|
| Category label | `text-sm font-medium text-[--accent-cyan] uppercase tracking-wider mb-3` |
| Badge | `px-3 py-1.5 rounded-lg bg-[--bg-secondary] border border-[--bg-tertiary] text-sm text-[--text-primary]` |
| Badge hover | Border color transitions to `--accent-cyan` at 50% opacity |
| Badge layout | `flex flex-wrap gap-2` |
| Category gap | `gap-8` between category groups |

#### 8.5.3 Scroll Animation

- Category groups stagger in: `staggerChildren: 0.1`
- Each group: `opacity: 0, y: 20` → `opacity: 1, y: 0`, duration `0.5s`
- Trigger: `whileInView`, viewport `once: true, amount: 0.2`

### 8.6 Education Section

**Section ID:** `#education`
**Heading:** "Education"

**Layout:** Simple card display.

```
┌─────────────────────────────────────┐
│  🎓  Master's in CyberSecurity     │  ← title
│      University in the UK           │  ← institution
│      2025 - Present                 │  ← period
└─────────────────────────────────────┘
```

Note: The graduation cap icon (`GraduationCap` from Lucide React) is used instead of emoji.

| Element | Styling |
|---------|---------|
| Card | `bg-[--bg-secondary] rounded-xl p-6 border border-[--bg-tertiary] max-w-lg mx-auto` |
| Icon | `w-8 h-8 text-[--accent-cyan]` |
| Degree title | `text-lg font-semibold text-[--text-primary]` |
| Institution | `text-sm text-[--text-secondary]` |
| Period | `text-sm text-[--text-muted]` |

**Animation:** Fade-in on scroll.

### 8.7 Blog Section

**Section ID:** `#blog`
**Heading:** "Blog"
**Subheading:** "I write about AI, security, and software engineering on Medium"

**Layout:** Centered text with a single CTA link button.

| Element | Specification |
|---------|---------------|
| Description | 1-2 sentences encouraging visitors to read articles |
| CTA Button | "Read on Medium →" linking to `https://medium.com/@ccawa102`, styled as outlined button similar to Hero |
| Target | `target="_blank" rel="noopener noreferrer"` |

**Animation:** Fade-in on scroll.

### 8.8 Contact Section

**Section ID:** `#contact`
**Heading:** "Get in Touch"
**Subheading:** "Feel free to reach out for collaboration or opportunities"

**Layout:** Horizontally centered row of icon links.

#### 8.8.1 Contact Links

Defined in `src/data/links.ts`:

```typescript
interface ContactLink {
  readonly name: string
  readonly url: string
  readonly icon: string  // Lucide icon name
}
```

| Name | URL | Lucide Icon |
|------|-----|-------------|
| GitHub | `https://github.com/cawa102` | `Github` |
| LinkedIn | `https://www.linkedin.com/in/kyosuke-kawai-68919b389` | `Linkedin` |
| Medium | `https://medium.com/@ccawa102` | `BookOpen` |
| Email | `mailto:ccawa102@gmail.com` (TBD — placeholder) | `Mail` |

#### 8.8.2 Icon Button Styling

| Element | Styling |
|---------|---------|
| Container | `flex items-center justify-center gap-6` |
| Icon wrapper | `w-12 h-12 rounded-full bg-[--bg-secondary] border border-[--bg-tertiary] flex items-center justify-center` |
| Icon | `w-5 h-5 text-[--text-secondary]` |
| Hover | Background transitions to `--accent-cyan` at 10% opacity, icon color transitions to `--accent-cyan`, border color to `--accent-cyan` at 40% opacity, `scale(1.1)` |
| Link | `target="_blank" rel="noopener noreferrer"`, `aria-label` for accessibility |

**Animation:** Staggered fade-in on scroll, `staggerChildren: 0.1`.

### 8.9 Footer

**Position:** Bottom of page, not fixed.
**Background:** `bg-[--bg-primary]` with top border `border-t border-[--bg-tertiary]`.
**Content:** `© 2026 cawa1. All rights reserved.`
**Styling:** `text-center text-sm text-[--text-muted] py-8`

---

## 9. Interactive Elements Specification

### 9.1 Particle Background

| Property | Value |
|----------|-------|
| Scope | Hero section only (`position: absolute, inset: 0`) |
| Library | `@tsparticles/react` with `@tsparticles/slim` engine |
| Rendering | Canvas-based, GPU-accelerated |
| Lazy loading | Dynamic import with `next/dynamic` to avoid SSR issues |
| Mobile optimization | Reduce particle count to 30-40 on screens < 768px |
| Performance | `fpsLimit: 60`, `detectRetina: true` |

### 9.2 Typing Effect

| Property | Value |
|----------|-------|
| Scope | Hero section, below the name |
| Implementation | Custom React hook `useTypingEffect` |
| State management | `useState` for current text, `useEffect` for timer cycle |
| SSR handling | Effect only runs on client (`useEffect`) |

### 9.3 Scroll Animations (Framer Motion)

Reusable wrapper component `ScrollAnimation.tsx`:

```typescript
interface ScrollAnimationProps {
  readonly children: React.ReactNode
  readonly direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  readonly delay?: number
  readonly duration?: number
  readonly className?: string
}
```

Default values:
- `direction: 'up'`
- `delay: 0`
- `duration: 0.6`
- Viewport: `{ once: true, amount: 0.2 }`
- Easing: `easeOut`

### 9.4 Reduced Motion Support

When `prefers-reduced-motion: reduce` is detected:
- Particle background: Static or hidden
- Typing effect: Show first phrase without animation
- Scroll animations: Instant appearance without motion
- Hover effects: Color changes only, no transforms

Implementation: `useReducedMotion()` hook from Framer Motion.

---

## 10. File Structure

```
portfolio/
├── public/
│   ├── favicon.ico                    # Site favicon
│   └── og-image.png                   # Open Graph preview image (1200x630)
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout: fonts, metadata, Navbar, Footer
│   │   ├── page.tsx                   # Main page: composes all section components
│   │   └── globals.css                # CSS custom properties, Tailwind directives, base styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx             # Sticky navigation with mobile menu
│   │   │   └── Footer.tsx             # Page footer with copyright
│   │   ├── sections/
│   │   │   ├── Hero.tsx               # Hero section with particles + typing
│   │   │   ├── About.tsx              # About me section
│   │   │   ├── Projects.tsx           # Project cards grid
│   │   │   ├── Skills.tsx             # Categorized skill badges
│   │   │   ├── Education.tsx          # Education display
│   │   │   ├── Blog.tsx               # Medium blog link
│   │   │   └── Contact.tsx            # Social link icons
│   │   └── ui/
│   │       ├── ProjectCard.tsx        # Individual project card component
│   │       ├── SkillBadge.tsx         # Individual skill badge component
│   │       ├── TypingEffect.tsx       # Typing animation component
│   │       ├── ParticleBackground.tsx # tsparticles wrapper (dynamic import)
│   │       └── ScrollAnimation.tsx    # Framer Motion scroll trigger wrapper
│   ├── data/
│   │   ├── projects.ts               # Project data array (readonly)
│   │   ├── skills.ts                  # Skill categories array (readonly)
│   │   └── links.ts                   # Contact links array (readonly)
│   └── lib/
│       └── constants.ts               # Shared constants (section IDs, animation config)
├── docs/                              # Existing project documentation (unchanged)
│   ├── 00_portfolio_overview.md
│   ├── 01_vibehackai_sow.md
│   ├── 02_cvesentinel_sow.md
│   ├── 03_pluginarena_sow.md
│   └── 04_skillgate_sow.md
├── spec.md                            # This file
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── .gitignore
```

### 10.1 File Size Guidelines

| File | Max Lines | Rationale |
|------|-----------|-----------|
| Section components | 150 | Each section is self-contained |
| UI components | 100 | Small, focused, reusable |
| Data files | 80 | Static data definitions only |
| Layout components | 120 | Navbar may be larger due to mobile menu logic |
| page.tsx | 50 | Thin orchestration layer, imports sections |
| layout.tsx | 60 | Font config, metadata, wrapping |

---

## 11. SEO Specification

### 11.1 Meta Tags

```typescript
export const metadata: Metadata = {
  title: 'cawa1 | AI Agent Developer & Security Engineer',
  description: 'Portfolio of cawa1 (Kyosuke Kawai) — CyberSecurity Master\'s student building AI-powered security tools. Featuring VibeHackAI, cveSentinel, PluginArena, and SkillGate.',
  keywords: ['AI agent', 'security engineer', 'portfolio', 'penetration testing', 'Claude Code', 'cybersecurity'],
  authors: [{ name: 'cawa1', url: 'https://github.com/cawa102' }],
  openGraph: {
    title: 'cawa1 | AI Agent Developer & Security Engineer',
    description: 'CyberSecurity Master\'s student building AI-powered security tools.',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cawa1 | AI Agent Developer & Security Engineer',
    description: 'CyberSecurity Master\'s student building AI-powered security tools.',
    images: ['/og-image.png'],
  },
}
```

### 11.2 Structured Data (JSON-LD)

Inject a `Person` schema in `layout.tsx`:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Kyosuke Kawai",
  "alternateName": "cawa1",
  "url": "https://cawa1.dev",
  "sameAs": [
    "https://github.com/cawa102",
    "https://www.linkedin.com/in/kyosuke-kawai-68919b389",
    "https://medium.com/@ccawa102"
  ],
  "jobTitle": "CyberSecurity Master's Student",
  "knowsAbout": ["AI Agent Development", "Penetration Testing", "Full-Stack Development"]
}
```

### 11.3 Semantic HTML

| Section | HTML Element | Heading Level |
|---------|-------------|---------------|
| Navbar | `<nav>` | N/A |
| Hero | `<section id="hero">` | `<h1>` for name |
| About | `<section id="about">` | `<h2>` |
| Projects | `<section id="projects">` | `<h2>`, `<h3>` per card |
| Skills | `<section id="skills">` | `<h2>` |
| Education | `<section id="education">` | `<h2>` |
| Blog | `<section id="blog">` | `<h2>` |
| Contact | `<section id="contact">` | `<h2>` |
| Footer | `<footer>` | N/A |

---

## 12. Performance Requirements

| Metric | Target | Measurement Tool |
|--------|--------|-----------------|
| Lighthouse Performance Score | 90+ | Chrome Lighthouse |
| First Contentful Paint (FCP) | < 1.5s | Chrome Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Chrome Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Chrome Lighthouse |
| Total Blocking Time (TBT) | < 200ms | Chrome Lighthouse |
| Bundle Size (First Load JS) | < 150kB gzipped | `next build` output |

### 12.1 Optimization Strategies

| Strategy | Implementation |
|----------|----------------|
| Dynamic imports | `ParticleBackground` loaded via `next/dynamic` with `{ ssr: false }` |
| Image optimization | `next/image` with WebP format, proper `width`/`height` attributes |
| Font optimization | `next/font/google` with `display: 'swap'`, subsetted to `latin` |
| Code splitting | Next.js automatic code splitting per route (single route in this case) |
| CSS optimization | Tailwind CSS purges unused styles at build time |
| Lazy rendering | Below-fold sections rendered on scroll via Framer Motion `whileInView` |

---

## 13. Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Keyboard navigation | All interactive elements (nav links, buttons, cards) focusable and operable via keyboard |
| Focus indicators | Visible `outline` or `ring` on focus for all interactive elements |
| Heading hierarchy | Single `<h1>` in Hero, `<h2>` for each section, `<h3>` for cards |
| Alt text | All decorative images use `alt=""`, meaningful images use descriptive alt text |
| Color contrast | Text-to-background contrast ratio meets WCAG AA (4.5:1 for normal text, 3:1 for large text) |
| Reduced motion | `prefers-reduced-motion: reduce` disables all motion animations |
| ARIA labels | Social link icons include `aria-label` (e.g., `aria-label="Visit GitHub profile"`) |
| Skip to content | Hidden "Skip to main content" link before navbar for keyboard users |
| Semantic roles | `<main>` wraps page content, `<nav>` for navigation, `<section>` for content blocks |

---

## 14. Implementation Phases

### Phase 1: Project Setup (Priority: High)

| Task | Detail |
|------|--------|
| Initialize Next.js project | `pnpm create next-app@latest` with TypeScript, Tailwind CSS, App Router, ESLint |
| Install dependencies | `framer-motion`, `@tsparticles/react`, `@tsparticles/slim`, `lucide-react` |
| Configure Tailwind | Extend theme with custom colors matching Section 7.2 color tokens |
| Setup globals.css | CSS custom properties, base styles, font imports |
| Create data files | `projects.ts`, `skills.ts`, `links.ts` with all static content |
| Setup constants | Section IDs, animation config defaults in `lib/constants.ts` |

### Phase 2: Layout + Hero (Priority: High)

| Task | Detail |
|------|--------|
| Build Navbar | Sticky nav with blur background, desktop links, mobile hamburger menu |
| Build Footer | Simple copyright footer |
| Build Hero section | Full viewport, centered content layout |
| Integrate ParticleBackground | Dynamic import, tsparticles config per Section 8.2.1 |
| Build TypingEffect | Custom component per Section 8.2.2 |
| Add CTA buttons | Styled per Section 8.2.3, smooth scroll to targets |
| Add scroll indicator | Animated chevron at bottom |

### Phase 3: Content Sections (Priority: High)

| Task | Detail |
|------|--------|
| Build About section | Text content with scroll animation |
| Build ProjectCard component | Card UI per Section 8.4.1 spec |
| Build Projects section | Grid layout, map over project data, render cards |
| Build SkillBadge component | Badge UI per Section 8.5.2 spec |
| Build Skills section | Category groups, map over skill data, render badges |

### Phase 4: Supporting Sections (Priority: Medium)

| Task | Detail |
|------|--------|
| Build Education section | Card layout per Section 8.6 spec |
| Build Blog section | CTA link to Medium per Section 8.7 spec |
| Build Contact section | Icon link buttons per Section 8.8 spec |

### Phase 5: Animation & Polish (Priority: Medium)

| Task | Detail |
|------|--------|
| Build ScrollAnimation wrapper | Reusable Framer Motion component per Section 9.3 |
| Apply scroll animations | Wrap all sections with ScrollAnimation |
| Add hover effects | Project cards, skill badges, contact icons |
| Add reduced motion support | `useReducedMotion` hook integration |
| Mobile responsive testing | Verify all breakpoints per Section 7.5 |

### Phase 6: SEO & Performance (Priority: Medium)

| Task | Detail |
|------|--------|
| Configure metadata | `layout.tsx` metadata export per Section 11.1 |
| Add JSON-LD structured data | Person schema per Section 11.2 |
| Add sitemap | `next-sitemap` or manual `public/sitemap.xml` |
| Add robots.txt | `public/robots.txt` allowing all crawlers |
| Create OG image | 1200x630 preview image for social sharing |
| Lighthouse audit | Verify 90+ score, fix any issues |

### Phase 7: Deployment (Priority: High)

| Task | Detail |
|------|--------|
| Push to GitHub | Create repository, push codebase |
| Deploy to Vercel | Connect GitHub repo, configure build settings |
| Verify production | Test all sections, animations, responsiveness, SEO meta |
| Custom domain (optional) | Configure custom domain in Vercel if available |

---

## 15. Acceptance Criteria

| # | Criteria | Verification Method |
|---|----------|-------------------|
| 1 | All 7 content sections render correctly on desktop and mobile | Manual browser testing at 375px, 768px, 1024px, 1280px |
| 2 | Particle background animates in Hero without blocking interaction | Visual verification + click-through test |
| 3 | Typing effect cycles through 3 role titles continuously | Visual verification over 30+ seconds |
| 4 | All 4 project cards display correct data and link to GitHub repos | Click each card, verify correct repo opens in new tab |
| 5 | Navbar smooth-scrolls to correct section on click | Click each nav link, verify scroll target |
| 6 | Mobile hamburger menu opens/closes and links work | Test on mobile viewport |
| 7 | Scroll animations trigger when sections enter viewport | Scroll through page, verify animations fire once |
| 8 | Lighthouse Performance score is 90+ | Run Lighthouse audit on production URL |
| 9 | All interactive elements are keyboard-accessible | Tab through entire page |
| 10 | `prefers-reduced-motion` disables animations | Enable reduced motion in OS settings, verify |
| 11 | Open Graph preview shows correct title, description, image | Share URL on social media preview tool |
| 12 | Site loads and renders correctly on Vercel production | Access production URL |

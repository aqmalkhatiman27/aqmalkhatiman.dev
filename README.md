# aqmalkhatiman.dev — Digital Garden & Portfolio

A personal portfolio and digital garden for Aqmal Khatiman — professional
showcase, technical resource hub, and a public record of a career pivot into
full-stack .NET/C# engineering.

## 🏛️ Brand Pillars
1. **Technology** — System architecture, applied AI workflows, cloud infrastructure.
2. **Education** — Andragogy, technical training design, instructional systems.
3. **Inclusivity** — Advocacy and operational scaling via lived experience (Cerebral Palsy & OCD).
4. **Business** — Operational breakdown of the Serumpun ventures.

## 🛠️ Architecture
Deliberately constrained stack — no database, no CMS, no runtime dependencies
beyond the framework.

- **Framework:** Next.js 16 (App Router) with React Server Components.
- **Styling:** Tailwind CSS v4 (config in `globals.css` via `@theme`). Minimalist, high-contrast.
- **Content Engine:** Local MDX, compiled at render time. `remark-gfm` (GitHub-flavoured
  markdown) + `rehype-pretty-code` (syntax highlighting, Shiki transitively).
- **Content Layer:** `lib/mdx.ts` — file discovery, frontmatter parsing, validation,
  and public fetchers. Routing shells stay thin; logic is centralised here.
- **Taxonomy Routing:** Dynamic tag aggregation via `app/tags/[tag]`, derived
  entirely from post frontmatter (no separate tag store).
- **SEO:** Next.js Metadata API + `@vercel/og` for dynamic OpenGraph cards.
- **Deployment:** Vercel.

### ⚠️ Architecture migration in progress
The published URL structure currently uses a catch-all `/notes/[...slug]` route
mapped to a P.A.R.A. directory structure. This is being migrated to a flat,
reader-intent taxonomy (`/essays/[slug]`, `/case-studies/[slug]`, `/reference/[slug]`)
using an expand-then-contract pattern — new routes are built alongside the old
before anything is removed, with 301 redirects preserving existing URLs.

P.A.R.A. remains the *authoring* workflow; it is being decoupled from the
*published* URL structure.

## 🤝 Development Workflow
Built without inline AI code generation. No Copilot, no Cursor, no inline
completion — the editor is VS Code, unaugmented.

AI assistance is conversational and externally mediated: Claude acts as tutor,
reviewer, and Socratic sparring partner for architectural decisions. Every line
in this repository is hand-typed, and every design decision is reasoned through
before implementation. Commit history reflects that process.

Commits follow [Conventional Commits](https://www.conventionalcommits.org/).

## 💻 Local Setup (strictly `npm`)
```bash
npm install
npm run dev
```

## 📂 Content Authoring
Articles live in `content/` and must end in `.mdx` with valid frontmatter:

```yaml
---
title: "Article Title"
date: "YYYY-MM-DD"
tags: ["Tag1", "Tag2"]
status: "Draft" | "Published"
excerpt: "Optional short summary."
contentType: "essay" | "case-study" | "reference" | "note"
---
```

`title` and `date` are required and fail the build if missing or malformed.
`contentType` is currently optional during the architecture migration; an
invalid value fails fast, a missing value is tolerated.

---

**Current state:** v1.5.0-dev — Phase 1 refactor (content-type data layer landed;
routing migration pending).
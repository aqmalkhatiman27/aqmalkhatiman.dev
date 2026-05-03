# aqmalkhatiman.dev — Digital Garden & Portfolio

A dynamic, high-performance personal portfolio and digital garden for Aqmal Khatiman (Solihin). Built to serve as a professional showcase, a technical resource hub, and an automated PR engine.

## 🏛️ Core Brand Pillars
1. **IT/Technology:** System Architecture, Applied AI Workflows, and Cloud Infrastructure.
2. **Disability/Inclusivity:** Advocacy and operational scaling via lived experience (Cerebral Palsy & OCD).
3. **Finance/Business:** Wealth generation and operational breakdown of Serumpun businesses.

## 🛠️ The "Hybrid Flex" Architecture
This project operates on a strictly constrained, highly optimized tech stack designed for speed and maintainability without database bloat.

- **Framework:** Next.js (App Router) with React Server Components.
- **Styling:** Tailwind CSS (Strict minimalist, Apple-esque, high-contrast UI).
- **Content Engine:** Local MDX parsed via `rehype-pretty-code` (Syntax Highlighting) and `remark-gfm`.
- **Information Architecture:** Statically routed using Catch-all segments (`app/notes/[...slug]`) mapping directly to a strict **P.A.R.A methodology** directory structure (`content/1-Projects`, `content/3-Resources`, etc.).
- **SEO & Discovery:** Custom Next.js Metadata API and `@vercel/og` engine dynamically generating OpenGraph image cards from MDX frontmatter.
- **CI/CD Pipeline:** Automated Edge deployment via Vercel.

## 🚀 Development Workflow: Multi-AI Vibe Coding
This codebase is actively developed using a dual-AI workflow:
- **Macro-Architect:** Google Gemini (Handles system blueprinting, constraints, and architecture planning).
- **Micro-Executor:** Anthropic Claude via Cursor IDE Agent (Handles localized code generation and implementation).

## 💻 Local Setup (Strictly `npm`)

To run the development server locally, please ensure you use `npm` to avoid lockfile conflicts (`yarn.lock` or `pnpm-lock.yaml` are strictly prohibited).

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

## 📂 Content Management (P.A.R.A)
All articles and technical notes must be added to the content/ directory. Files must end in .mdx and contain the following strict frontmatter:

```YAML
---
title: "Article Title"
date: "YYYY-MM-DD"
tags: ["Tag1", "Tag2"]
status: "Draft" | "Published"
---
```

---

Current Architectural State: v1.3.0 (Enhanced MDX Ecosystem)
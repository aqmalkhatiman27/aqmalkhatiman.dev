---
version: 1.3.0
last_updated: 2026-05-03
last_updater: Gemini
---

# PROJECT MASTER CONTEXT: aqmalkhatiman.dev

## 1. Project Overview
A dynamic, high-performance personal portfolio and digital garden for Aqmal Khatiman (Solihin). The platform serves as a professional showcase, a technical resource hub for students, and an automated PR engine built around three core brand pillars:
- **Pillar 1: IT/Technology** (System Architecture, AI/ML, Cloud)
- **Pillar 2: Disability/Inclusivity** (Advocacy via lived experience with Cerebral Palsy & OCD)
- **Pillar 3: Finance/Business** (Serumpun Kitchen & Academy, wealth generation)

## 2. Tech Stack & Infrastructure (The "Hybrid Flex")
- **Frontend & Routing:** Next.js (App Router) with React Server Components.
- **Deployment (Frontend):** Vercel (optimized for CI/CD speed and edge delivery).
- **Styling:** Tailwind CSS (strict minimalist, Apple-esque design language).
- **Content Engine:** MDX (Markdown + JSX) for dynamic case studies and tutorials. Content structure must strictly follow the P.A.R.A. directory methodology (1-Projects, 2-Areas, 3-Resources, 4-Archives).
- **Cloud Infrastructure (Media & DNS):** AWS Route 53 (DNS), AWS S3 + CloudFront (for heavy media assets, PDFs, and high-res diagrams).

## 3. UI/UX Design Language
- **Aesthetic:** Strict minimalist, Apple-esque design language.
- **Typography:** `Inter` (or similar clean sans-serif). High contrast for readability.
- **Components:** Clean borders, subtle hover transitions, ample whitespace, and zero bloated drop-shadows.

## 4. Site Architecture & Navigation
1.  **`/` (Home):** Executive summary, "The Trinity" pillar grid, and a dynamic feed of the 3 latest MDX entries.
2.  **`/about`:** Academic background, neurodiversity journey, and business trajectory.
3.  **`/training`:** Dynamic grid of `<CourseCard />` components mapping to active/past modules.
4.  **`/notes`:** The MDX digital garden (Technical teardowns, AWS/ZTM study notes, reflections). MUST strictly use Catch-all Segments (`app/notes/[...slug]`) for P.A.R.A directory routing.
5.  **`/ventures`:** Professional showcase of operational businesses (Serumpun).

## 5. Phase 1.3.0 Blueprint: Enhanced MDX Ecosystem
**Objective:** Upgrade the internal reading experience for technical deep-dives. Transform raw Markdown into a premium, VS Code-like reading environment suitable for an IT Professional and System Architect.

- **5.1 Syntax Highlighting (`rehype-pretty-code`):** Integrate `rehype-pretty-code` into the MDX compilation pipeline (via `next-mdx-remote` or `@mdx-js/mdx`). Configure a clean, high-contrast dark theme (e.g., `github-dark` or `one-dark-pro`) for all code blocks to match the minimalist aesthetic.
- **5.2 Extended Markdown Support (`remark-gfm`):** Add `remark-gfm` to support GitHub Flavored Markdown (tables, task lists, strikethrough, autolinks) essential for robust technical documentation.
- **5.3 Custom MDX Components:** 
  - Build a custom React `<Callout />` component (styled with Tailwind) to highlight warnings, tips, or important architectural notes.
  - Map this component, along with styled HTML defaults (e.g., `<pre>`, `<code>`), directly into the MDX provider so they can be seamlessly used inside any `.mdx` file.
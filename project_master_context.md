---
version: 1.4.0
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
- **Deployment:** Vercel (Edge delivery).
- **Styling:** Tailwind CSS (strict minimalist, Apple-esque design language).
- **Content Engine:** MDX parsed via `rehype-pretty-code` and `remark-gfm`. Content structure strictly follows the P.A.R.A. methodology (1-Projects, 2-Areas, 3-Resources, 4-Archives).
- **Cloud Infrastructure:** AWS Route 53 (DNS), AWS S3 + CloudFront (for heavy media assets).

## 3. UI/UX Design Language
- **Aesthetic:** Strict minimalist, Apple-esque design language.
- **Typography:** `Inter` (or similar clean sans-serif). High contrast for readability.
- **Components:** Clean borders, subtle hover transitions, custom `<Callout />` components for technical notes. Zero bloated drop-shadows.

## 4. Site Architecture & Navigation
1.  **`/` (Home):** Executive summary, "The Trinity" pillar grid, and latest MDX entries.
2.  **`/about`:** Academic background, neurodiversity journey, and business trajectory.
3.  **`/training`:** Dynamic grid of `<CourseCard />` components.
4.  **`/notes`:** The MDX digital garden. Strictly uses Catch-all Segments (`app/notes/[...slug]`).
5.  **`/ventures`:** Professional showcase of operational businesses.
6.  **`/tags` (NEW):** Master taxonomy page listing all available tags and their post counts.
7.  **`/tags/[tag]` (NEW):** Dynamic route filtering notes by a specific tag.

## 5. Phase 1.4.0 Blueprint: Taxonomy & Tag Routing
**Objective:** Transform flat metadata into an interconnected web of knowledge. Allow recruiters, clients, and students to navigate the digital garden by specific technical subjects and brand pillars.

- **5.1 Data Layer Extension (`lib/mdx.ts`):** 
  - Build robust utility functions to extract, deduplicate, and count all unique tags across the P.A.R.A directory (`getAllTags`).
  - Build a filtering function to retrieve posts matching a specific tag (`getPostsByTag`).
  - *Crucial:* Ensure tags are properly slugified or URL-encoded (e.g., "System Architecture" -> "system-architecture") to prevent routing 404 errors.
- **5.2 Dynamic Tag Routing:**
  - Build `app/tags/page.tsx`: A clean, high-contrast index listing all active tags.
  - Build `app/tags/[tag]/page.tsx`: A dynamic feed that lists all articles under that specific tag, reusing the existing minimalist article card layout for UI consistency.
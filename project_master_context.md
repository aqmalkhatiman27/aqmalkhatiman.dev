---
version: 1.2.0
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
4.  **`/notes`:** The MDX digital garden (Technical teardowns, AWS/ZTM study notes, reflections).
5.  **`/ventures`:** Professional showcase of operational businesses (Serumpun).

## 5. Phase 1.2.0 Blueprint: SEO, OpenGraph & Metadata Engine
**Objective:** Transform `aqmalkhatiman.dev` into a highly discoverable, shareable brand asset. Every generated page must possess comprehensive metadata and dynamically generated OpenGraph (OG) images for premium social media unfurling.

- **5.1 Global Metadata Configuration (`app/layout.tsx`):** Implement Next.js Metadata API globally. Define `metadataBase`, default title templates, descriptions, and Twitter/OG baseline tags.
- **5.2 Dynamic Metadata Generation (`app/notes/[slug]/page.tsx`):** Use `generateMetadata` to parse MDX frontmatter (Title, Date, Description, Tags) and map dynamically to the page's metadata object.
- **5.3 Dynamic OpenGraph Image Generation (`@vercel/og`):** Use `app/api/og/route.tsx` to programmatically generate 1200x630px minimalist OG images extracting Article Title, Author Name, and primary Tag.
- **5.4 Automated Site Mapping:** Implement `app/sitemap.ts` to crawl P.A.R.A. folders and `app/robots.ts` for search engine indexing.
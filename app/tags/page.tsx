import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Tags",
  description:
    "Browse all topics and pillars used across notes on aqmalkhatiman.dev—architecture, applied AI, teaching, and execution logs.",
  alternates: {
    canonical: "/tags",
  },
};

export default async function TagsIndexPage() {
  const tags = await getAllTags();

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-20 md:py-28">
        <p className="text-sm font-medium tracking-wide text-muted uppercase">
          Taxonomy
        </p>
        <h1 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Tags
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl">
          Explore notes by subject. Each tag aggregates every note that references it
          in frontmatter.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex w-fit text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
        >
          Back to Home
        </Link>

        <section className="mt-12" aria-labelledby="tags-index-heading">
          <h2 id="tags-index-heading" className="sr-only">
            All tags
          </h2>

          {tags.length === 0 ? (
            <p className="border border-border rounded-lg bg-surface px-6 py-8 text-sm text-muted">
              No tags are defined in published notes yet.
            </p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {tags.map((tag) => (
                <li key={tag.slug}>
                  <Link
                    href={`/tags/${tag.slug}`}
                    className="group flex items-center justify-between gap-4 border border-border rounded-lg bg-surface px-5 py-4 transition-colors hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                  >
                    <span className="text-base font-semibold tracking-tight text-foreground">
                      {tag.label}
                    </span>
                    <span className="shrink-0 tabular-nums text-sm text-muted">
                      {tag.count} {tag.count === 1 ? "note" : "notes"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

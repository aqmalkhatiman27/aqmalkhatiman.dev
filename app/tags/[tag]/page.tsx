import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllTags,
  getPostsByTag,
  normalizeTagSlugFromParam,
} from "@/lib/mdx";

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
}

type TagFeedPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({
  params,
}: TagFeedPageProps): Promise<Metadata> {
  const rawTag = (await params).tag;
  const normalized = normalizeTagSlugFromParam(rawTag);
  const tags = await getAllTags();
  const entry = tags.find((t) => t.slug === normalized);

  if (!entry) {
    return {
      title: "Tag",
      description:
        "Browse technical notes, architecture write-ups, and execution logs on aqmalkhatiman.dev.",
      robots: { index: false, follow: true },
    };
  }

  const title = `Tag: ${entry.label}`;
  const description = `${entry.count} ${entry.count === 1 ? "note" : "notes"} tagged “${entry.label}” in the digital garden.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/tags/${entry.slug}`,
    },
    openGraph: {
      type: "website",
      url: `/tags/${entry.slug}`,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function TagFeedPage({ params }: TagFeedPageProps) {
  const rawTag = (await params).tag;
  const normalized = normalizeTagSlugFromParam(rawTag);
  const tags = await getAllTags();
  const entry = tags.find((t) => t.slug === normalized);

  if (!entry) {
    notFound();
  }

  const posts = await getPostsByTag(rawTag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-20 md:py-28">
        <p className="text-sm font-medium tracking-wide text-muted uppercase">
          Tag
        </p>
        <h1 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {entry.label}
        </h1>
        <p className="mt-4 text-sm text-muted">
          {posts.length} {posts.length === 1 ? "note" : "notes"}
        </p>

        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link
            href="/tags"
            className="text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
          >
            All tags
          </Link>
          <span className="text-border" aria-hidden>
            ·
          </span>
          <Link
            href="/"
            className="text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
          >
            Home
          </Link>
        </div>

        <section className="mt-12" aria-labelledby="tag-feed-heading">
          <h2 id="tag-feed-heading" className="sr-only">
            Notes tagged {entry.label}
          </h2>

          <div className="border border-border rounded-lg bg-surface">
            <ol className="divide-y divide-border">
              {posts.map((post) => (
                <li key={post.slug} className="px-6 py-5">
                  <article className="space-y-2">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      <Link
                        href={`/notes/${encodeURIComponent(post.slug)}`}
                        className="inline-flex transition-colors hover:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                      <div className="flex items-center gap-2">
                        <dt className="sr-only">Date</dt>
                        <dd>{formatDate(post.date)}</dd>
                      </div>
                      <div className="flex items-center gap-2">
                        <dt className="sr-only">Status</dt>
                        <dd>{post.status ?? "Published"}</dd>
                      </div>
                    </dl>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
}

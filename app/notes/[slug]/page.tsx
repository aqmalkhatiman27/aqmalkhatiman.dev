import { compile, run } from "@mdx-js/mdx";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import * as runtime from "react/jsx-runtime";
import { getPostBySlug } from "@/lib/mdx";

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
}

const getMdxComponent = cache(async (source: string) => {
  const compiled = await compile(source, {
    outputFormat: "function-body",
  });

  return run(String(compiled), {
    ...runtime,
    baseUrl: import.meta.url,
  });
});

type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function normalizeDescription(excerpt: string | undefined, content: string): string {
  if (excerpt && excerpt.trim().length > 0) {
    return excerpt.trim();
  }

  const collapsed = content
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (collapsed.length <= 160) {
    return collapsed;
  }

  return `${collapsed.slice(0, 157)}...`;
}

function encodeSlugPath(slug: string): string {
  return slug
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  try {
    const post = await getPostBySlug(decodedSlug);
    const description = normalizeDescription(post.excerpt, post.content);
    const primaryTag = post.tags[0] ?? "Notes";
    const notePath = `/notes/${encodeSlugPath(post.slug)}`;
    const ogImage = `/api/og?title=${encodeURIComponent(post.title)}&tag=${encodeURIComponent(primaryTag)}`;

    return {
      title: post.title,
      description,
      keywords: post.tags,
      alternates: {
        canonical: notePath,
      },
      openGraph: {
        type: "article",
        url: notePath,
        title: post.title,
        description,
        publishedTime: post.date,
        authors: ["Aqmal Khatiman"],
        tags: post.tags,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: `${post.title} — ${primaryTag}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description,
        images: [ogImage],
      },
    };
  } catch {
    return {
      title: "Note Not Found",
      description: "The requested note could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  try {
    const post = await getPostBySlug(decodedSlug);
    const mdxModule = await getMdxComponent(post.content);
    const Content = mdxModule.default;

    return (
      <main className="flex flex-1 flex-col">
        <article className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16 md:py-20">
          <Link
            href="/"
            className="inline-flex w-fit text-sm text-muted transition-colors hover:text-foreground"
          >
            Back to Home
          </Link>

          <header className="mt-8 border-b border-border pb-8">
            <p className="text-sm text-muted">
              {formatDate(post.date)}
              {post.status ? ` · ${post.status}` : ""}
            </p>
            <h1 className="mt-3 text-pretty text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {post.title}
            </h1>
          </header>

          <div className="mt-10 max-w-none text-[1.02rem] leading-8 text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_h1]:mt-10 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_li]:my-1 [&_p]:my-5 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6">
            <Content />
          </div>
        </article>
      </main>
    );
  } catch {
    notFound();
  }
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getArticleMdxComponents } from "@/components/mdx/article-mdx-components";
import { compileMdxSource } from "@/lib/mdx-compile";
import { getPostBySlug, type Post } from "@/lib/mdx";

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
}

const articleMdxComponents = getArticleMdxComponents();

const getMdxComponent = cache(async (source: string) => {
  return compileMdxSource(source);
});

type NotePageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

function stripMdxToPlainText(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/[*_~>#|]/g, " ")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function ensureDescriptionLength(text: string): string {
  const cleaned = text.trim();
  if (cleaned.length === 0) {
    return "Technical note and execution log from aqmalkhatiman.dev on architecture, cloud, and applied AI workflows.";
  }

  if (cleaned.length < 100) {
    return `${cleaned} This note covers practical implementation details, execution context, and outcomes for reproducible learning.`;
  }

  if (cleaned.length <= 150) {
    return cleaned;
  }

  const sliced = cleaned.slice(0, 150);
  const lastSpace = sliced.lastIndexOf(" ");
  const sentence = lastSpace > 100 ? sliced.slice(0, lastSpace) : sliced;
  return `${sentence}...`;
}

function normalizeDescription(
  excerpt: string | undefined,
  content: string,
): string {
  const preferred = excerpt?.trim() ?? "";
  if (preferred.length >= 100 && preferred.length <= 150) {
    return preferred;
  }

  if (preferred.length > 150) {
    return ensureDescriptionLength(preferred);
  }

  const plainContent = stripMdxToPlainText(content);
  const combined = preferred.length > 0 ? `${preferred} ${plainContent}` : plainContent;
  return ensureDescriptionLength(combined);
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
  const decodedSlug = (await params).slug.map(decodeURIComponent).join("/");

  try {
    const post = await getPostBySlug(decodedSlug);
    const description = normalizeDescription(post.excerpt, post.content);
    const primaryTag = post.tags[0] ?? "Notes";
    const notePath = `/notes/${encodeSlugPath(post.slug)}`;
    const ogImage = `https://aqmalkhatiman.dev/api/og?title=${encodeURIComponent(post.title)}&tag=${encodeURIComponent(primaryTag)}`;

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
      description:
        "The requested note could not be found in the current knowledge base. Explore the latest technical notes, architecture write-ups, and execution logs on aqmalkhatiman.dev.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

async function loadPost(slug: string): Promise<Post> {
  try {
    return await getPostBySlug(slug);
  } catch {
    notFound();
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const decodedSlug = (await params).slug.map(decodeURIComponent).join("/");
  const post = await loadPost(decodedSlug);
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
          <Content components={articleMdxComponents} />
        </div>
      </article>
    </main>
  );
}

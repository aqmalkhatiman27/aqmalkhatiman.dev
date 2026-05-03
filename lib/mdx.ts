import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const MDX_EXTENSION = ".mdx";

type FrontmatterRecord = Record<string, unknown>;

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  status?: string;
  excerpt?: string;
}

export interface Post extends PostMetadata {
  content: string;
}

/** URL-safe slug from a tag string (lowercase, non-alphanumeric → hyphens). */
export interface TagSummary {
  slug: string;
  /** Human-readable label from the first occurrence mapped to this slug. */
  label: string;
  /** Number of distinct posts that include this tag. */
  count: number;
}

export function slugifyTag(raw: string): string {
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed) {
    return "";
  }

  return trimmed
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Normalizes a tag segment from the URL (e.g. `system-architecture`, `next-js`)
 * so it matches {@link slugifyTag} output derived from frontmatter.
 */
export function normalizeTagSlugFromParam(param: string): string {
  const decoded = decodeURIComponent(param.trim());
  return slugifyTag(decoded.replace(/-/g, " "));
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseTags(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isNonEmptyString).map((tag) => tag.trim());
}

function parseDate(value: unknown, sourcePath: string): string {
  if (!isNonEmptyString(value)) {
    throw new Error(`Missing or invalid 'date' in frontmatter: ${sourcePath}`);
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid date format in frontmatter: ${sourcePath}`);
  }

  return value;
}

function parseMetadata(data: FrontmatterRecord, slug: string, sourcePath: string): PostMetadata {
  if (!isNonEmptyString(data.title)) {
    throw new Error(`Missing or invalid 'title' in frontmatter: ${sourcePath}`);
  }

  return {
    slug,
    title: data.title.trim(),
    date: parseDate(data.date, sourcePath),
    tags: parseTags(data.tags),
    status: isNonEmptyString(data.status) ? data.status.trim() : undefined,
    excerpt: isNonEmptyString(data.excerpt) ? data.excerpt.trim() : undefined,
  };
}

function createSlugFromRelativePath(relativeFilePath: string): string {
  return relativeFilePath.slice(0, -MDX_EXTENSION.length).split(path.sep).join("/");
}

function slugToAbsolutePath(slug: string): string {
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, "");
  if (!normalizedSlug) {
    throw new Error("Slug cannot be empty");
  }

  const segments = normalizedSlug.split("/");
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    throw new Error(`Invalid slug: ${slug}`);
  }

  const absolutePath = path.resolve(CONTENT_DIR, `${segments.join(path.sep)}${MDX_EXTENSION}`);
  const contentRoot = `${CONTENT_DIR}${path.sep}`;

  if (!absolutePath.startsWith(contentRoot)) {
    throw new Error(`Invalid slug path traversal attempt: ${slug}`);
  }

  return absolutePath;
}

async function getAllMdxFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return getAllMdxFiles(fullPath);
      }
      if (entry.isFile() && entry.name.endsWith(MDX_EXTENSION)) {
        return [fullPath];
      }
      return [];
    }),
  );

  return files.flat();
}

async function readPostFile(filePath: string): Promise<Post> {
  const rawFile = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(rawFile);

  const relativePath = path.relative(CONTENT_DIR, filePath);
  const slug = createSlugFromRelativePath(relativePath);
  const metadata = parseMetadata(data as FrontmatterRecord, slug, filePath);

  return {
    ...metadata,
    content,
  };
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  try {
    const mdxFiles = await getAllMdxFiles(CONTENT_DIR);
    const posts = await Promise.all(mdxFiles.map(readPostFile));

    return posts
      .map((full) => {
        const { content, ...metadata } = full;
        void content;
        return metadata;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const filePath = slugToAbsolutePath(slug);

  try {
    return await readPostFile(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error(`Post not found for slug: ${slug}`);
    }
    throw error;
  }
}

export async function getAllTags(): Promise<TagSummary[]> {
  const posts = await getAllPosts();
  const aggregate = new Map<string, { label: string; count: number }>();

  for (const post of posts) {
    const seenInPost = new Set<string>();

    for (const tag of post.tags) {
      const slug = slugifyTag(tag);
      if (!slug || seenInPost.has(slug)) {
        continue;
      }

      seenInPost.add(slug);

      const existing = aggregate.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        aggregate.set(slug, { label: tag.trim(), count: 1 });
      }
    }
  }

  return [...aggregate.entries()]
    .map(([slug, { label, count }]) => ({ slug, label, count }))
    .sort((a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" }));
}

export async function getPostsByTag(tagParam: string): Promise<PostMetadata[]> {
  const targetSlug = normalizeTagSlugFromParam(tagParam);
  if (!targetSlug) {
    return [];
  }

  const posts = await getAllPosts();
  return posts.filter((post) => {
    const slugs = new Set(post.tags.map((t) => slugifyTag(t)).filter(Boolean));
    return slugs.has(targetSlug);
  });
}

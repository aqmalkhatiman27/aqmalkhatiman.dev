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
  return path.join(CONTENT_DIR, `${normalizedSlug}${MDX_EXTENSION}`);
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
      .map(({ content: _content, ...metadata }) => metadata)
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

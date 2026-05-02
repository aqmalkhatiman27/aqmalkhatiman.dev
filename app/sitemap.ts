import { promises as fs } from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";

const SITE_URL = "https://aqmalkhatiman.dev";
const CONTENT_DIR = path.join(process.cwd(), "content");
const PARA_FOLDERS = ["1-Projects", "2-Areas", "3-Resources", "4-Archives"] as const;

type MdxFileRecord = {
  slug: string;
  lastModified: Date;
};

function encodeSlugPath(slug: string): string {
  return slug
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

async function getMdxFilesInDirectory(directory: string): Promise<MdxFileRecord[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const records = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return getMdxFilesInDirectory(absolutePath);
      }

      if (entry.isFile() && entry.name.endsWith(".mdx")) {
        const stats = await fs.stat(absolutePath);
        const relativePath = path.relative(CONTENT_DIR, absolutePath);
        const slug = relativePath.slice(0, -".mdx".length).split(path.sep).join("/");
        return [{ slug, lastModified: stats.mtime }];
      }

      return [];
    }),
  );

  return records.flat();
}

async function getParaMdxRecords(): Promise<MdxFileRecord[]> {
  const folders = await Promise.all(
    PARA_FOLDERS.map(async (folderName) => {
      const folderPath = path.join(CONTENT_DIR, folderName);
      try {
        return await getMdxFilesInDirectory(folderPath);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
          return [];
        }
        throw error;
      }
    }),
  );

  return folders.flat();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/training`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/notes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/ventures`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const mdxRecords = await getParaMdxRecords();
  const noteRoutes: MetadataRoute.Sitemap = mdxRecords.map((record) => ({
    url: `${SITE_URL}/notes/${encodeSlugPath(record.slug)}`,
    lastModified: record.lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...noteRoutes];
}

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  cover?: string;
  published: boolean;
  body: string;
};

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDir)) return [];

  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, "");
      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        summary: String(data.summary ?? ""),
        cover: data.cover ? String(data.cover) : undefined,
        published: data.published !== false,
        body: content.trim(),
      } satisfies BlogPost;
    })
    .filter((post) => post.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getBlogPost(slug: string): BlogPost | null {
  return getBlogPosts().find((post) => post.slug === slug) ?? null;
}

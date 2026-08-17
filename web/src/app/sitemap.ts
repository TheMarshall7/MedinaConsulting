import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/about", "/blog", "/faq", "/contact"];
  const pages = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" || route === "/blog"
      ? "weekly"
      : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const posts = getBlogPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}

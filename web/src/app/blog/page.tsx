import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { BlogIndex } from "@/components/BlogIndex";
import { CtaBand } from "@/components/CtaBand";
import { formatPostDate, getBlogPosts, readingTime } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on grant readiness, funder storytelling, and nonprofit funding strategy from Medina Consulting.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getBlogPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    dateLabel: formatPostDate(post.date),
    summary: post.summary,
    cover: post.cover,
    read: readingTime(post.body),
    search: [post.title, post.summary, post.body].join(" ").toLowerCase(),
  }));

  return (
    <>
      <PageHeader
        eyebrow="Notes"
        title="From the funding desk"
        intro="Readiness, proposals, and the conversations that get funders to yes — written the way we work with you."
      />

      <BlogIndex posts={posts} />

      <CtaBand />
    </>
  );
}

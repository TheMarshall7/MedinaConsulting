import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Markdown } from "@/components/Markdown";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { getBlogPost, getBlogPosts } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post" };

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(+date)) return value;
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <article className="mx-auto w-full max-w-[88rem] px-6 pb-16 pt-16 sm:px-10 lg:px-14 lg:pb-24 lg:pt-24">
        <Reveal stagger className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-ink/50 transition hover:text-pink"
          >
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>
          <p className="eyebrow mt-10 text-pink">{formatDate(post.date)}</p>
          <h1 className="display-1 mt-6 text-balance text-ink">{post.title}</h1>
          <p className="lede mt-8 text-pretty text-ink/60">{post.summary}</p>
        </Reveal>

        {post.cover ? (
          <Reveal className="relative mx-auto mt-12 aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl bg-paper-soft">
            <Image
              src={post.cover}
              alt=""
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </Reveal>
        ) : null}

        <Reveal className="mx-auto mt-14 max-w-3xl">
          <Markdown content={post.body} />
        </Reveal>
      </article>

      <CtaBand
        title="Want help with your next grant?"
        body="Book a consultation and we will help you clarify readiness, strategy, and next steps."
      />
    </>
  );
}

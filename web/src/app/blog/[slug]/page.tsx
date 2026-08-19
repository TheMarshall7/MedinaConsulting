import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Markdown } from "@/components/Markdown";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { siteConfig } from "@/lib/site";
import {
  formatPostDate,
  getBlogPost,
  getBlogPosts,
  readingTime,
} from "@/lib/content";

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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const others = getBlogPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <article className="mx-auto w-full max-w-[88rem] px-6 pb-16 pt-16 sm:px-10 lg:px-14 lg:pb-24 lg:pt-24">
        <Reveal stagger className="mx-auto flex max-w-3xl flex-col">
          <Link
            href="/blog"
            className="nav-link inline-flex w-fit items-center gap-2 text-sm text-ink/50 transition hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            All notes
          </Link>

          <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-hairline pb-6">
            <p className="eyebrow text-pink">{formatPostDate(post.date)}</p>
            <span className="h-px w-8 bg-pink/50" aria-hidden />
            <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-ink/40">
              {readingTime(post.body)}
            </p>
            <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-ink/40">
              {siteConfig.shortName}
            </p>
          </div>

          <h1 className="display-1 mt-8 text-balance text-ink">{post.title}</h1>
          <p className="lede mt-8 max-w-2xl text-pretty text-ink/60">
            {post.summary}
          </p>
        </Reveal>

        {post.cover ? (
          <Reveal className="clip-accent relative mx-auto mt-14 aspect-[16/9] max-w-5xl overflow-hidden bg-paper-soft">
            <Image
              src={post.cover}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </Reveal>
        ) : null}

        <Reveal className="mx-auto mt-16 max-w-[40rem]">
          <Markdown content={post.body} />
        </Reveal>

        <Reveal className="mx-auto mt-20 max-w-[40rem] border-t border-hairline pt-10">
          <p className="eyebrow text-ink/40">Written by</p>
          <p className="mt-4 text-xl font-medium tracking-tight text-ink">
            Musa
          </p>
          <p className="mt-1 text-sm font-light text-ink/50">
            {siteConfig.name}
          </p>
        </Reveal>
      </article>

      {others.length > 0 ? (
        <section className="mx-auto w-full max-w-[88rem] px-6 pb-16 sm:px-10 lg:px-14 lg:pb-24">
          <Reveal stagger className="mx-auto max-w-3xl border-t border-hairline">
            <p className="eyebrow py-8 text-ink/40">More notes</p>
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group flex items-baseline justify-between gap-8 border-t border-hairline py-7"
              >
                <span>
                  <span className="block text-[0.6875rem] uppercase tracking-[0.2em] text-ink/40">
                    {formatPostDate(item.date)}
                  </span>
                  <span className="mt-3 block text-xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-pink">
                    {item.title}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/30 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-pink" />
              </Link>
            ))}
          </Reveal>
        </section>
      ) : null}

      <CtaBand
        title="Want help with your next grant?"
        body="Book a consultation and we will help you clarify readiness, strategy, and next steps."
      />
    </>
  );
}

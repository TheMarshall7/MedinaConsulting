"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Search, X } from "lucide-react";

export type BlogIndexItem = {
  slug: string;
  title: string;
  dateLabel: string;
  summary: string;
  cover?: string;
  read: string;
  search: string;
};

export function BlogIndex({ posts }: { posts: BlogIndexItem[] }) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!needle) return posts;
    return posts.filter((post) => post.search.includes(needle));
  }, [needle, posts]);

  const [featured, ...rest] = posts;
  const searching = needle.length > 0;

  return (
    <section className="mx-auto w-full max-w-[88rem] px-6 pb-24 sm:px-10 lg:px-14 lg:pb-32">
      <div className="max-w-xl border-b border-hairline">
        <label className="sr-only" htmlFor="blog-search">
          Search notes
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35"
            aria-hidden
          />
          <input
            id="blog-search"
            type="text"
            role="searchbox"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes"
            autoComplete="off"
            className="w-full bg-transparent py-4 pl-8 pr-10 text-[0.9375rem] font-light text-ink outline-none placeholder:text-ink/35"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-ink/35 transition hover:text-ink"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {searching
          ? `${results.length} ${results.length === 1 ? "note" : "notes"} found`
          : ""}
      </p>

      {posts.length === 0 ? (
        <p className="body-sm mt-10 text-ink/55">
          Posts will appear here once they are published in the CMS.
        </p>
      ) : searching ? (
        <div className="mt-10 border-t border-hairline">
          <p className="eyebrow py-8 text-ink/40">
            {results.length === 0
              ? "No matches"
              : `${results.length} ${results.length === 1 ? "note" : "notes"}`}
          </p>
          {results.length === 0 ? (
            <p className="body-sm pb-8 text-ink/55">
              Nothing matches “{query.trim()}”. Try another word or phrase.
            </p>
          ) : (
            results.map((post, i) => (
              <ResultRow key={post.slug} post={post} index={i} />
            ))
          )}
        </div>
      ) : (
        <>
          {featured ? <FeaturedPost post={featured} /> : null}
          {rest.length > 0 ? (
            <div className="mt-20 border-t border-hairline">
              <p className="eyebrow py-8 text-ink/40">Archive</p>
              {rest.map((post, i) => (
                <ResultRow key={post.slug} post={post} index={i + 1} />
              ))}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}

function FeaturedPost({ post }: { post: BlogIndexItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group mt-10 grid grid-cols-1 items-end gap-10 border-t border-hairline pt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16"
    >
      <div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="eyebrow text-pink">Latest</p>
          <span className="h-px w-8 bg-pink/50" aria-hidden />
          <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-ink/40">
            {post.dateLabel}
          </p>
          <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-ink/30">
            {post.read}
          </p>
        </div>
        <h2 className="display-2 mt-7 max-w-3xl text-balance text-ink transition-colors duration-300 group-hover:text-pink">
          {post.title}
        </h2>
        <p className="lede mt-7 max-w-xl text-pretty text-ink/60">
          {post.summary}
        </p>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink">
          Read the note
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      {post.cover ? (
        <div className="clip-accent relative aspect-[5/4] overflow-hidden bg-paper-soft">
          <Image
            src={post.cover}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            priority
          />
        </div>
      ) : (
        <div className="clip-accent relative hidden min-h-[18rem] overflow-hidden bg-paper-soft lg:block">
          <span className="absolute bottom-6 right-8 text-[clamp(5rem,10vw,8rem)] font-medium leading-none tracking-tight text-ink/[0.07]">
            01
          </span>
        </div>
      )}
    </Link>
  );
}

function ResultRow({
  post,
  index,
}: {
  post: BlogIndexItem;
  index: number;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-[auto_1fr] items-baseline gap-6 border-t border-hairline py-8 transition-colors duration-300 hover:bg-surface/50 sm:grid-cols-[4.5rem_1fr_1.15fr] sm:gap-10"
    >
      <span className="text-[0.6875rem] tracking-[0.2em] text-ink/30">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-ink/40">
          {post.dateLabel}
        </p>
        <h2 className="mt-3 text-xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-pink sm:text-2xl">
          {post.title}
        </h2>
      </div>
      <p className="body-sm col-span-2 max-w-md text-ink/55 sm:col-span-1">
        {post.summary}
      </p>
    </Link>
  );
}

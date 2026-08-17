import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on grant readiness, funder storytelling, and nonprofit funding strategy from Medina Consulting.",
  alternates: { canonical: "/blog" },
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(+date)) return value;
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes from the funding desk"
        intro="Practical writing on readiness, proposals, and the conversations that get funders to yes."
      />

      <section className="mx-auto w-full max-w-[88rem] px-6 pb-24 sm:px-10 lg:px-14 lg:pb-32">
        {posts.length === 0 ? (
          <p className="body-sm text-ink/55">
            Posts will appear here once they are published in the CMS.
          </p>
        ) : (
          <Reveal stagger className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-hairline bg-white/70 transition duration-500 hover:-translate-y-1 hover:shadow-[0_2rem_5rem_rgba(19,16,23,0.08)]"
              >
                {post.cover ? (
                  <div className="relative aspect-[16/10] bg-paper-soft">
                    <Image
                      src={post.cover}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 44vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
                <div className="p-7 sm:p-8">
                  <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-ink/40">
                    {formatDate(post.date)}
                  </p>
                  <h2 className="mt-4 text-2xl font-medium tracking-tight text-ink transition-colors group-hover:text-pink">
                    {post.title}
                  </h2>
                  <p className="body-sm mt-4 text-ink/60">{post.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
                    Read
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>
        )}
      </section>

      <CtaBand />
    </>
  );
}

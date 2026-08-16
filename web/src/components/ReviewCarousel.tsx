"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { reviews } from "@/lib/site";

export function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  function go(delta: number) {
    setFading(true);
    window.setTimeout(() => {
      setIndex((i) => (i + delta + reviews.length) % reviews.length);
      setFading(false);
    }, 220);
  }

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(timer);
  }, []);

  const item = reviews[index];

  return (
    <div>
      <div className="flex items-center gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-pink text-pink" />
        ))}
        <span className="ml-2 text-xs uppercase tracking-[0.2em] text-ink/40">
          5.0 · 9 Google reviews
        </span>
      </div>

      <blockquote
        className={`mt-10 max-w-4xl text-balance text-2xl font-light leading-[1.45] tracking-tight text-ink transition-opacity duration-200 sm:text-3xl lg:text-[2.5rem] ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        “{item.quote}”
      </blockquote>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-8">
        <div
          className={`flex items-center gap-4 transition-opacity duration-200 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="h-px w-12 bg-ink/30" />
          <cite className="text-sm font-normal not-italic text-ink">
            {item.author}
          </cite>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-2 sm:flex">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show review ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-px w-8 transition-all duration-300 ${
                  i === index ? "bg-ink" : "bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => go(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline text-ink transition hover:bg-ink hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next review"
              onClick={() => go(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline text-ink transition hover:bg-ink hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

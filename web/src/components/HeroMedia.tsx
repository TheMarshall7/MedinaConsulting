"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Star } from "lucide-react";
import { YouTubeFacade } from "@/components/YouTubeFacade";
import { StatCounter } from "@/components/StatCounter";
import { fundsSecured } from "@/lib/site";

export function HeroMedia() {
  const [playing, setPlaying] = useState(false);

  return (
    <div data-hero-media className="relative">
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden bg-ink shadow-[0_2.5rem_6rem_rgba(19,16,23,0.18)] transition-[clip-path] duration-500 ease-out ${
          playing ? "rounded-2xl" : "clip-hero"
        }`}
      >
        <YouTubeFacade
          title="Meet the founder"
          onPlay={() => setPlaying(true)}
        />
      </div>

      {!playing && (
        <Link
          href="/about#founder"
          className="group absolute -bottom-[72px] left-0 z-10 flex w-[17rem] flex-col gap-3 rounded-2xl border border-hairline bg-white/90 p-6 shadow-[0_1.5rem_4rem_rgba(19,16,23,0.1)] backdrop-blur-md transition duration-500 hover:-translate-y-1 sm:w-[20rem]"
        >
          <span className="eyebrow text-ink/40">Meet the founder</span>
          <span className="flex items-center justify-between gap-4 text-lg font-medium tracking-tight text-ink">
            Musa
            <ArrowUpRight className="h-4 w-4 text-pink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          <span className="flex items-center justify-between gap-3 border-t border-hairline pt-3">
            <span className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-pink text-pink" />
              ))}
              <span className="ml-1 text-xs text-ink/45">5.0</span>
            </span>
            <span className="text-right">
              <span className="block text-sm font-medium tracking-tight text-ink">
                <StatCounter
                  value={fundsSecured.value}
                  prefix={fundsSecured.prefix}
                />
              </span>
              <span className="block text-[0.625rem] uppercase tracking-[0.16em] text-ink/40">
                {fundsSecured.label}
              </span>
            </span>
          </span>
        </Link>
      )}

      <div className="pointer-events-none absolute left-[calc(100%+1.25rem)] top-10 hidden flex-col items-center gap-3 text-[0.625rem] uppercase tracking-[0.3em] text-ink/35 xl:flex">
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <ArrowDown className="h-4 w-4" />
      </div>
    </div>
  );
}

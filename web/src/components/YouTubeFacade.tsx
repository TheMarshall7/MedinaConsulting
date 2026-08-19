"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { siteConfig } from "@/lib/site";

type Props = {
  title: string;
  className?: string;
  onPlay?: () => void;
};

export function YouTubeFacade({ title, className = "", onPlay }: Props) {
  const [active, setActive] = useState(false);
  const id = siteConfig.founderVideoId;
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  if (active) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        className={`h-full w-full ${className}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setActive(true);
        onPlay?.();
      }}
      className={`group relative block h-full w-full overflow-hidden ${className}`}
      aria-label={`Play video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt=""
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-black/25" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface/95 text-pink shadow-lg transition group-hover:scale-105">
          <Play className="ml-1 h-7 w-7 fill-current" />
        </span>
      </span>
    </button>
  );
}

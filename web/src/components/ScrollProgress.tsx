"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    if (!document.documentElement.classList.contains("motion-ready")) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { scrub: 0.35, start: 0, end: "max" },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-hairline"
      aria-hidden
    >
      <div
        ref={fillRef}
        className="h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-pink via-pink to-pink-deep shadow-[0_0_12px_rgba(255,133,178,0.45)]"
      />
    </div>
  );
}

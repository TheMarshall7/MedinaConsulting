"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!document.documentElement.classList.contains("motion-ready")) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { scrub: 0.25, start: 0, end: "max" },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-pink to-pink-deep"
      aria-hidden
    />
  );
}

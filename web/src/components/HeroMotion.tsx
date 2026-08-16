"use client";

import { useEffect } from "react";
import gsap from "gsap";

/**
 * Hero intro + rotating word. Everything runs inside a gsap.context that is
 * reverted on cleanup, so React's double-mount in development cannot leave
 * elements stranded at zero opacity.
 */
export function HeroMotion({ scopeId }: { scopeId: string }) {
  useEffect(() => {
    const scope = document.getElementById(scopeId);
    if (!scope) return;

    const animate = document.documentElement.classList.contains("motion-ready");
    let interval: number | undefined;

    const ctx = gsap.context(() => {
      if (animate) {
        const items = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
        if (items.length) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 34, filter: "blur(10px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.1,
              stagger: 0.09,
              ease: "power3.out",
              clearProps: "filter",
            },
          );
        }

        const media = gsap.utils.toArray<HTMLElement>("[data-hero-media]");
        if (media.length) {
          gsap.fromTo(
            media,
            { opacity: 0, scale: 0.94, filter: "blur(14px)" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.4,
              delay: 0.25,
              ease: "power3.out",
              clearProps: "filter,transform",
            },
          );
        }
      }

      const rotators = gsap.utils.toArray<HTMLElement>("[data-rotator]");
      if (!animate || rotators.length < 2) return;

      let index = 0;
      gsap.set(rotators, { yPercent: 100, opacity: 0 });
      gsap.set(rotators[0], { yPercent: 0, opacity: 1 });

      interval = window.setInterval(() => {
        const next = (index + 1) % rotators.length;
        gsap.to(rotators[index], {
          yPercent: -100,
          opacity: 0,
          duration: 0.75,
          ease: "power3.inOut",
        });
        gsap.fromTo(
          rotators[next],
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.75, ease: "power3.inOut" },
        );
        index = next;
      }, 2800);
    }, scope);

    return () => {
      if (interval) window.clearInterval(interval);
      ctx.revert();
    };
  }, [scopeId]);

  return null;
}

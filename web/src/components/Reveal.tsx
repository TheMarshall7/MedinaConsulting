"use client";

import {
  createElement,
  ElementType,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate direct children in sequence instead of the wrapper itself. */
  stagger?: boolean;
  delay?: number;
  distance?: number;
  id?: string;
};

let fontsReadyHooked = false;

function refreshAfterFonts() {
  if (fontsReadyHooked || typeof document === "undefined") return;
  fontsReadyHooked = true;
  void document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
  });
}

/**
 * Elements start visible in the server HTML. The `.motion-ready` gate in
 * globals.css only hides them once the inline script confirms animation will
 * run, and every tween is a `fromTo` so a killed tween can never strand an
 * element at zero opacity.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  stagger = false,
  delay = 0,
  distance = 48,
  id,
}: RevealProps) {
  const scope = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    if (!document.documentElement.classList.contains("motion-ready")) return;

    gsap.registerPlugin(ScrollTrigger);
    refreshAfterFonts();

    const ctx = gsap.context(() => {
      const targets = stagger
        ? Array.from(el.children).filter(
            (c): c is HTMLElement => c instanceof HTMLElement,
          )
        : [el];

      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y: distance, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          delay,
          stagger: stagger ? 0.09 : 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          onStart: () => el.classList.add("is-revealed"),
          onComplete: () => {
            el.classList.add("is-revealed");
            gsap.set(targets, { clearProps: "filter,transform" });
          },
        },
      );
    }, scope);

    return () => ctx.revert();
  }, [stagger, delay, distance]);

  return createElement(
    Tag,
    { ref: scope, id, "data-reveal": true, className },
    children,
  );
}

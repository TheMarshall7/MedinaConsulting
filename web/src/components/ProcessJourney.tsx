"use client";

import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { processSteps } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const INTERVAL_MS = 6500;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ProcessJourney() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const paused = useRef(false);
  const inView = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  const go = useCallback((index: number) => {
    setActive((index + processSteps.length) % processSteps.length);
  }, []);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;

    const timer = window.setInterval(() => {
      if (paused.current || !inView.current) return;
      setActive((i) => (i + 1) % processSteps.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [reduced]);

  function pause() {
    paused.current = true;
  }

  function resume() {
    paused.current = false;
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  }

  const step = processSteps[active];

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-[88rem] px-6 pb-24 sm:px-10 lg:px-14 lg:pb-32"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <Reveal stagger className="max-w-3xl">
        <p className="eyebrow text-pink">How we work</p>
        <h2 className="display-2 mt-7 text-balance text-ink">
          Collaborative from the first conversation
        </h2>
      </Reveal>

      {reduced ? (
        <div className="mt-14 divide-y divide-hairline border-y border-hairline">
          {processSteps.map((item) => (
            <article key={item.num} className="grid gap-4 py-8 sm:grid-cols-[4rem_1fr]">
              <p className="text-[0.6875rem] tracking-[0.22em] text-pink">
                {item.num}
              </p>
              <div>
                <h3 className="text-xl font-medium tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="body-sm mt-3 max-w-xl text-ink/55">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-1 items-stretch gap-10 lg:mt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div
            role="tablist"
            aria-label="How we work"
            className="relative flex flex-col justify-center"
            onKeyDown={onKeyDown}
          >
            <div className="absolute bottom-6 left-0 top-6 hidden w-px bg-hairline lg:block" aria-hidden />
            <div
              className="absolute left-0 top-6 hidden w-px bg-pink transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block"
              style={{
                height: `calc(${(active / Math.max(processSteps.length - 1, 1)) * 100}% - 0px)`,
                maxHeight: "calc(100% - 3rem)",
              }}
              aria-hidden
            />

            <div className="divide-y divide-hairline border-y border-hairline">
              {processSteps.map((item, i) => {
                const isActive = i === active;
                return (
                  <div key={item.num}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-pressed={isActive}
                      aria-controls={`process-panel-${item.num}`}
                      id={`process-tab-${item.num}`}
                      onClick={() => go(i)}
                      onMouseEnter={() => go(i)}
                      className="group relative grid w-full grid-cols-[3rem_1fr] gap-5 py-7 text-left transition-colors duration-300 lg:grid-cols-[4.5rem_1fr] lg:pl-8"
                    >
                      <span
                        className={`pt-1 text-[0.6875rem] tracking-[0.22em] transition-colors duration-300 ${
                          isActive ? "text-pink" : "text-ink/30"
                        }`}
                      >
                        {item.num}
                      </span>
                      <span>
                        <span
                          className={`block text-lg font-medium tracking-tight transition-colors duration-300 sm:text-xl ${
                            isActive ? "text-ink" : "text-ink/40 group-hover:text-ink/70"
                          }`}
                        >
                          {item.title}
                        </span>
                        <span
                          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                            isActive
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <span className="overflow-hidden">
                            <span className="body-sm mt-3 block max-w-md pb-1 text-ink/55">
                              {item.body}
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>

                    <div
                      id={`process-panel-${item.num}`}
                      role="tabpanel"
                      aria-labelledby={`process-tab-${item.num}`}
                      hidden={!isActive}
                      className="pb-7 lg:hidden"
                    >
                      {isActive && <ScenePanel step={item} />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3 lg:pl-8">
              {processSteps.map((_, i) => (
                <button
                  key={processSteps[i].num}
                  type="button"
                  aria-label={`Go to step ${processSteps[i].num}`}
                  onClick={() => go(i)}
                  className={`h-px transition-all duration-500 ${
                    i === active ? "w-10 bg-pink" : "w-5 bg-ink/20 hover:bg-ink/40"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[28rem] lg:block">
            {processSteps.map((item, i) => (
              <div
                key={item.num}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                  i === active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                aria-hidden={i !== active}
              >
                <ScenePanel step={item} featured={i === 0} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keep active step available for screen readers on desktop */}
      <p className="sr-only" aria-live="polite">
        Step {step.num}: {step.title}
      </p>
    </section>
  );
}

function ScenePanel({
  step,
  featured = false,
}: {
  step: (typeof processSteps)[number];
  featured?: boolean;
}) {
  return (
    <div
      className={`on-ink relative h-full min-h-[22rem] overflow-hidden bg-paper-soft lg:min-h-0 ${
        featured ? "clip-accent" : "rounded-[1.25rem]"
      }`}
    >
      <Image
        src={step.image}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <p className="text-[0.625rem] uppercase tracking-[0.28em] text-pink">
          {step.scene}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-5">
          {step.cues.map((cue) => (
            <span
              key={cue}
              className="text-[0.8125rem] font-light tracking-wide text-white/80"
            >
              {cue}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

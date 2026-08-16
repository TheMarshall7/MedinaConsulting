import { trustPoints } from "@/lib/site";

export function TrustMarquee() {
  const items = [...trustPoints, ...trustPoints];

  return (
    <section
      aria-label="Organizations we support"
      className="border-y border-hairline py-6"
    >
      <div className="relative overflow-hidden">
        <div className="marquee-track gap-14 pr-14">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-14 text-[0.8125rem] uppercase tracking-[0.22em] text-ink/40"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-pink/60" aria-hidden />
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent" />
      </div>
    </section>
  );
}

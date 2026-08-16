import type { Metadata } from "next";
import { YouTubeFacade } from "@/components/YouTubeFacade";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { StatCounter } from "@/components/StatCounter";
import { CtaBand } from "@/components/CtaBand";
import { aboutCopy, siteConfig, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Medina Grant Writing & Consulting — a boutique agency helping Canadian nonprofits secure sustainable funding.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A boutique agency for lasting impact"
        intro={aboutCopy.overview}
      >
        <p className="lede mt-5 max-w-2xl text-pretty text-ink/60">
          {aboutCopy.focus}
        </p>
      </PageHeader>

      <section className="mx-auto w-full max-w-[88rem] px-6 pb-24 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal stagger>
            <p className="eyebrow text-pink">Our approach</p>
            <h2 className="display-2 mt-7 text-balance text-ink">
              With culturally grounded insight, we help you
            </h2>
            <p className="lede mt-8 max-w-lg text-pretty text-ink/60">
              {aboutCopy.empower}
            </p>
          </Reveal>

          <Reveal stagger className="border-t border-hairline">
            {aboutCopy.helpYou.map((item, i) => (
              <div
                key={item}
                className="flex items-baseline gap-8 border-b border-hairline py-7"
              >
                <span className="text-[0.6875rem] tracking-[0.2em] text-pink">
                  0{i + 1}
                </span>
                <p className="text-lg font-light leading-relaxed tracking-tight text-ink/80">
                  {item}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        <Reveal className="ink-section rounded-[1.75rem] px-8 py-16 sm:px-14 lg:px-20 lg:py-20">
          <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-8 md:py-0 ${i === 0 ? "md:pr-12" : i === 1 ? "md:px-12" : "md:pl-12"}`}
              >
                <p className="text-[clamp(2.75rem,5vw,4.25rem)] font-medium leading-none tracking-tight text-white">
                  <StatCounter
                    value={stat.value}
                    prefix={"prefix" in stat ? String(stat.prefix) : ""}
                    suffix={"suffix" in stat ? String(stat.suffix) : ""}
                  />
                </p>
                <p className="mt-5 max-w-[16rem] text-sm font-light leading-relaxed text-white/55">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section
        id="founder"
        className="mx-auto w-full max-w-[88rem] px-6 py-24 sm:px-10 lg:px-14 lg:py-32"
      >
        <Reveal stagger className="max-w-3xl">
          <p className="eyebrow text-pink">The founder</p>
          <h2 className="display-2 mt-7 text-balance text-ink">Meet Musa</h2>
          <p className="lede mt-8 max-w-2xl text-pretty text-ink/60">
            {aboutCopy.founderNote}
          </p>
        </Reveal>

        <Reveal className="clip-accent relative mt-14 aspect-video w-full overflow-hidden rounded-2xl bg-ink shadow-[0_2.5rem_6rem_rgba(19,16,23,0.18)]">
          <YouTubeFacade title={`Meet Musa, founder of ${siteConfig.name}`} />
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}

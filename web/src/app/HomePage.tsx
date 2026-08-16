import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { HeroMotion } from "@/components/HeroMotion";
import { HeroMedia } from "@/components/HeroMedia";
import { Reveal } from "@/components/Reveal";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { TrustMarquee } from "@/components/TrustMarquee";
import { StatCounter } from "@/components/StatCounter";
import { CtaBand } from "@/components/CtaBand";
import { ProcessJourney } from "@/components/ProcessJourney";
import {
  aboutCopy,
  heroMeta,
  services,
  siteConfig,
  stats,
} from "@/lib/site";

const rotatingWords = ["partners.", "strategy.", "advantage."];

export default function HomePage() {
  const featured = services.filter((s) => "image" in s && s.image);
  const secondary = services.filter((s) => !("image" in s && s.image));

  return (
    <>
      <HeroMotion scopeId="hero" />

      {/* Hero */}
      <section
        id="hero"
        className="mx-auto grid w-full max-w-[88rem] grid-cols-1 items-center gap-14 px-6 pb-16 pt-10 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-14 lg:pb-24 lg:pt-16"
      >
        <div>
          <p data-hero-item className="eyebrow text-pink">
            {siteConfig.tagline}
          </p>

          <h1
            data-hero-item
            className="display-1 mt-8 text-ink"
            aria-label={siteConfig.heroLine}
          >
            <span aria-hidden>Your trusted fundraising </span>
            <span
              className="relative inline-grid h-[1.15em] overflow-hidden align-bottom"
              aria-hidden
            >
              {rotatingWords.map((word, i) => (
                <span
                  key={word}
                  data-rotator
                  className={`col-start-1 row-start-1 inline-block whitespace-nowrap pb-[0.18em] text-pink ${
                    i === 0 ? "" : "opacity-0"
                  }`}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          <p data-hero-item className="lede mt-9 max-w-xl text-pretty text-ink/60">
            {siteConfig.description}
          </p>

          <div data-hero-item className="mt-11 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn btn-primary group">
              Book a Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link href="/services" className="btn btn-ghost">
              Explore services
            </Link>
          </div>

          <dl
            data-hero-item
            className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-hairline pt-7 text-xs uppercase tracking-[0.18em] text-ink/45"
          >
            {heroMeta.map((meta) => (
              <div key={meta} className="flex items-center gap-8">
                <dt className="sr-only">Detail</dt>
                <dd>{meta}</dd>
              </div>
            ))}
            <div className="flex items-center gap-8">
              <dt className="sr-only">Phone</dt>
              <dd>
                <a
                  href={siteConfig.phoneHref}
                  className="transition hover:text-pink"
                >
                  {siteConfig.phone}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <HeroMedia />
      </section>

      <div className="mt-14 lg:mt-8">
        <TrustMarquee />
      </div>

      {/* About */}
      <section
        id="about"
        className="mx-auto w-full max-w-[88rem] px-6 py-24 sm:px-10 lg:px-14 lg:py-32"
      >
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal stagger>
            <p className="eyebrow text-pink">Who we are</p>
            <h2 className="display-2 mt-7 max-w-xl text-balance text-ink">
              A boutique agency for organizations that carry real weight
            </h2>
            <p className="lede mt-8 max-w-lg text-pretty text-ink/60">
              {aboutCopy.overview}
            </p>
            <p className="lede mt-5 max-w-lg text-pretty text-ink/60">
              {aboutCopy.focus}
            </p>
            <div className="mt-10">
              <Link href="/about" className="btn btn-ghost group">
                More about Medina
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Reveal className="clip-accent relative aspect-[4/5] overflow-hidden rounded-lg bg-paper-soft sm:mt-12">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
                alt="Community partners in conversation"
                fill
                sizes="(max-width: 640px) 100vw, 28vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal
              delay={0.1}
              className="relative aspect-[4/5] overflow-hidden rounded-lg bg-paper-soft"
            >
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80"
                alt="Team reviewing a funding strategy"
                fill
                sizes="(max-width: 640px) 100vw, 28vw"
                className="object-cover"
              />
            </Reveal>

            <Reveal
              stagger
              className="sm:col-span-2 rounded-2xl border border-hairline bg-white/60 p-8 backdrop-blur-sm"
            >
              <p className="eyebrow text-ink/40">With culturally grounded insight</p>
              <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {aboutCopy.helpYou.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-4 text-[0.9375rem] font-light leading-relaxed text-ink/75"
                  >
                    <span className="pt-1 text-[0.6875rem] tracking-[0.2em] text-pink">
                      0{i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats — ink section */}
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

      {/* Services */}
      <section
        id="services"
        className="mx-auto w-full max-w-[88rem] px-6 py-24 sm:px-10 lg:px-14 lg:py-32"
      >
        <Reveal stagger className="max-w-3xl">
          <p className="eyebrow text-pink">What we do</p>
          <h2 className="display-2 mt-7 text-balance text-ink">
            Everything that gets a funder to yes
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {featured.map((service, i) => (
            <Reveal
              key={service.slug}
              delay={(i % 2) * 0.08}
              className={`group overflow-hidden rounded-2xl border border-hairline bg-white/70 backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:shadow-[0_2rem_5rem_rgba(19,16,23,0.1)] ${
                i === 0 ? "clip-accent" : ""
              } ${i % 2 === 1 ? "md:mt-14" : ""}`}
            >
              {"image" in service && service.image && (
                <div className="relative aspect-[16/10] overflow-hidden bg-paper-soft">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 44vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
              )}
              <div className="flex items-start justify-between gap-6 p-8">
                <div>
                  <h3 className="display-3 text-ink">{service.title}</h3>
                  <p className="body-sm mt-4 max-w-md text-ink/60">
                    {service.summary}
                  </p>
                </div>
                <span className="mt-2 text-[0.6875rem] tracking-[0.2em] text-ink/30">
                  0{i + 1}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal stagger className="mt-20 border-t border-hairline">
          {secondary.map((service, i) => (
            <div
              key={service.slug}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-hairline py-8 transition-colors duration-300 hover:bg-white/50 sm:grid-cols-[4rem_1fr_1.1fr] sm:gap-10"
            >
              <span className="text-[0.6875rem] tracking-[0.2em] text-ink/30">
                0{featured.length + i + 1}
              </span>
              <h3 className="text-xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-pink">
                {service.title}
              </h3>
              <p className="body-sm col-span-2 text-ink/60 sm:col-span-1">
                {service.summary}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      <ProcessJourney />

      {/* Reviews */}
      <section className="border-y border-hairline bg-paper-soft/50">
        <div className="mx-auto w-full max-w-[88rem] px-6 py-24 sm:px-10 lg:px-14 lg:py-28">
          <Reveal>
            <ReviewCarousel />
          </Reveal>
        </div>
      </section>

      <div className="pt-24 lg:pt-32">
        <CtaBand />
      </div>
    </>
  );
}

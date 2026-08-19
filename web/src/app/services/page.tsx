import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { ProcessJourney } from "@/components/ProcessJourney";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Grant writing, proposal review, program design, readiness audits, and more for Canadian nonprofits and charities.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const featured = services.filter((s) => "image" in s && s.image);
  const secondary = services.filter((s) => !("image" in s && s.image));

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      description: service.summary,
    })),
  };

  return (
    <>
      <JsonLd data={serviceLd} />

      <PageHeader
        eyebrow="Services"
        title="What we help you do"
        intro="Beyond writing grants — we review proposals, coach through funder dynamics, and strengthen your readiness so your organization can grow sustainably."
      />

      <section className="mx-auto grid w-full max-w-[88rem] grid-cols-1 gap-8 px-6 pb-20 sm:px-10 md:grid-cols-2 lg:px-14">
        {featured.map((service, i) => (
          <Reveal
            key={service.slug}
            delay={(i % 2) * 0.08}
            className={`group overflow-hidden rounded-2xl border border-hairline bg-surface/70 backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:shadow-[0_2rem_5rem_rgba(19,16,23,0.1)] ${
              i === 0 ? "clip-accent" : ""
            }`}
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
                <h2 className="display-3 text-ink">{service.title}</h2>
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
      </section>

      <section className="mx-auto w-full max-w-[88rem] px-6 pb-24 sm:px-10 lg:px-14">
        <Reveal stagger className="border-t border-hairline">
          {secondary.map((service, i) => (
            <div
              key={service.slug}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-hairline py-8 transition-colors duration-300 hover:bg-surface/50 sm:grid-cols-[4rem_1fr_1.1fr] sm:gap-10"
            >
              <span className="text-[0.6875rem] tracking-[0.2em] text-ink/30">
                0{featured.length + i + 1}
              </span>
              <h2 className="text-xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-pink">
                {service.title}
              </h2>
              <p className="body-sm col-span-2 text-ink/60 sm:col-span-1">
                {service.summary}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      <ProcessJourney />

      <CtaBand
        title="Not sure which service you need?"
        body="Start with a consultation. We will assess your readiness and point you to the work that moves the needle first."
      />
    </>
  );
}

import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers about hiring a grant writer, fees, win rates, grant database coverage, and Medina’s collaborative approach.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqLd} />

      <PageHeader
        eyebrow="FAQs"
        title="Questions, answered plainly"
        intro="The things organizations ask us most often before we start working together."
      />

      <section className="mx-auto w-full max-w-[88rem] px-6 pb-24 sm:px-10 lg:px-14 lg:pb-32">
        <Reveal stagger className="mx-auto max-w-4xl border-t border-hairline">
          {faqs.map((faq, i) => (
            <details
              key={faq.q}
              className="group border-b border-hairline py-7"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-8">
                <span className="flex gap-6">
                  <span className="pt-2 text-[0.6875rem] tracking-[0.2em] text-pink">
                    0{i + 1}
                  </span>
                  <span className="text-xl font-normal tracking-tight text-ink transition-colors duration-300 group-hover:text-pink sm:text-2xl">
                    {faq.q}
                  </span>
                </span>
                <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline text-ink transition-transform duration-300 group-open:-rotate-180">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <p className="body-sm mt-5 max-w-3xl pl-0 text-ink/60 sm:pl-12">
                {faq.a}
              </p>
            </details>
          ))}
        </Reveal>
      </section>

      <CtaBand
        title="Still have a question?"
        body="Send it over. We are happy to talk through your situation before you commit to anything."
      />
    </>
  );
}

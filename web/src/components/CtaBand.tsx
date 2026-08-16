import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

type Props = {
  title?: string;
  body?: string;
};

export function CtaBand({
  title = "Ready to talk funding?",
  body = "Book a consultation and we will help you clarify readiness, strategy, and the next grant worth pursuing.",
}: Props) {
  return (
    <section className="mx-auto w-full max-w-[88rem] px-6 pb-24 sm:px-10 lg:px-14">
      <Reveal className="ink-section rounded-[1.75rem] px-8 py-16 sm:px-14 lg:px-20 lg:py-24">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow text-pink">Start here</p>
            <h2 className="display-2 mt-6 max-w-2xl text-balance text-white">
              {title}
            </h2>
            <p className="lede mt-6 max-w-xl text-pretty text-white/60">{body}</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end">
            <Link href="/contact" className="btn btn-light group">
              Book a Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="btn border border-white/15 text-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

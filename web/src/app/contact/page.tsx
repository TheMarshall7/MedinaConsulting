import type { Metadata } from "next";
import { Phone, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import {
  LinkedInIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/SocialIcons";
import { siteConfig, heroMeta } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consultation with Medina Grant Writing & Consulting. Call, WhatsApp, or send a message.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    label: "Call us",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
    Icon: Phone,
    external: false,
  },
  {
    label: "WhatsApp",
    value: "Message us directly",
    href: siteConfig.whatsapp,
    Icon: WhatsAppIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "Follow our work",
    href: siteConfig.linkedin,
    Icon: LinkedInIcon,
    external: true,
  },
  {
    label: "YouTube",
    value: "Watch our videos",
    href: siteConfig.youtube,
    Icon: YouTubeIcon,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-[88rem] px-6 pb-24 pt-16 sm:px-10 lg:px-14 lg:pb-32 lg:pt-24">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal stagger>
            <p className="eyebrow text-pink">Contact</p>
            <h1 className="display-1 mt-7 text-balance text-ink">
              Book a consultation
            </h1>
            <p className="lede mt-8 max-w-md text-pretty text-ink/60">
              Tell us about your organization. We will follow up on WhatsApp to
              find a time that works.
            </p>
          </Reveal>

          <Reveal stagger className="mt-12 border-t border-hairline">
            {channels.map(({ label, value, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center justify-between gap-6 border-b border-hairline py-6 transition-colors duration-300 hover:text-pink"
              >
                <span className="flex items-center gap-5">
                  <Icon className="h-5 w-5 text-ink/40 transition-colors duration-300 group-hover:text-pink" />
                  <span>
                    <span className="block text-[0.6875rem] uppercase tracking-[0.2em] text-ink/40">
                      {label}
                    </span>
                    <span className="mt-1 block text-base font-normal tracking-tight">
                      {value}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </a>
            ))}
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-ink/40">
            {heroMeta.map((meta) => (
              <span key={meta}>{meta}</span>
            ))}
          </Reveal>
        </div>

        <Reveal className="rounded-2xl border border-hairline bg-surface/70 p-8 backdrop-blur-sm sm:p-10">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { ArrowUpRight } from "lucide-react";
import {
  LinkedInIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/SocialIcons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { siteConfig } from "@/lib/site";

const explore = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  {
    label: "WhatsApp",
    href: siteConfig.whatsapp,
    Icon: WhatsAppIcon,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    Icon: LinkedInIcon,
  },
  {
    label: "YouTube",
    href: siteConfig.youtube,
    Icon: YouTubeIcon,
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto w-full max-w-[88rem] px-6 pb-10 pt-16 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
          <div className="md:border-r md:border-hairline md:pr-10">
            <Link
              href="/"
              aria-label={`${siteConfig.shortName} home`}
              className="inline-flex transition-opacity duration-300 hover:opacity-80"
            >
              <BrandMark
                variant="lockup"
                alt={siteConfig.name}
                width={260}
                height={86}
                className="h-16 w-auto sm:h-20"
              />
            </Link>
            <p className="lede mt-7 max-w-sm text-ink/55">
              {siteConfig.heroLine} {siteConfig.tagline}
            </p>
            <div className="mt-8 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  aria-label={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink transition hover:bg-ink hover:text-white"
                >
                  <Icon className="h-[1.15rem] w-[1.15rem]" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:border-r md:border-hairline md:px-10">
            <h3 className="eyebrow text-ink/45">Explore</h3>
            <ul className="mt-7 space-y-4 text-[0.9375rem] font-light text-ink/70">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 transition hover:text-pink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:pl-10">
            <h3 className="eyebrow text-ink/45">Contact</h3>
            <ul className="mt-7 space-y-4 text-[0.9375rem] font-light text-ink/70">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="transition hover:text-pink"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition hover:text-pink"
                >
                  WhatsApp
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li className="text-ink/50">{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-hairline pt-7 text-xs font-light text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ThemeToggle />
          <p className="tracking-[0.2em] uppercase">{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

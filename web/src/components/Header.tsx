"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-hairline bg-paper/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-[88rem] items-center justify-between px-6 transition-all duration-500 sm:px-10 lg:px-14 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <Link
          href="/"
          aria-label={`${siteConfig.shortName} home`}
          className="inline-flex items-center transition-opacity duration-300 hover:opacity-80"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/Medina.png"
            alt="medina"
            width={200}
            height={50}
            priority
            className={`w-auto transition-all duration-500 ${
              scrolled ? "h-7" : "h-8 sm:h-9"
            }`}
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-11 text-[0.8125rem] tracking-wide text-ink/70 lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={pathname === link.href}
              className="nav-link transition-colors duration-300 hover:text-ink data-[active=true]:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 xl:gap-5">
          <a
            href={siteConfig.phoneHref}
            className="hidden items-center gap-2 pr-1 text-[0.8125rem] text-ink/70 transition hover:text-ink xl:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
          <Link
            href="/contact"
            className="btn btn-primary-soft hidden !py-3 !pl-5 !pr-5 !text-[0.8125rem] sm:inline-flex"
          >
            Book a Consultation
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink transition hover:bg-ink hover:text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-[4.5rem] z-50 flex flex-col justify-between bg-paper px-6 pb-10 pt-8 sm:px-10 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-hairline py-5 text-3xl font-medium tracking-tight text-ink transition hover:text-pink"
                onClick={() => setOpen(false)}
              >
                <span className="mr-4 align-middle text-xs font-normal tracking-[0.2em] text-ink/35">
                  0{i + 1}
                </span>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="space-y-4">
            <Link
              href="/contact"
              className="btn btn-primary w-full"
              onClick={() => setOpen(false)}
            >
              Book a Consultation
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="flex items-center justify-center gap-2 text-sm text-ink/70"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

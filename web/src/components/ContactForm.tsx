"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const text = [
      "Hello Medina — I would like to book a consultation.",
      `Name: ${name}`,
      phone ? `Phone: ${phone}` : "",
      `Email: ${email}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    setStatus("sent");
    window.open(
      `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setTimeout(() => setStatus("idle"), 4000);
  }

  const field =
    "mt-2 w-full rounded-xl border border-hairline bg-surface/80 px-4 py-3.5 text-sm font-light text-ink outline-none transition focus:border-pink focus:ring-1 focus:ring-pink";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <p className="eyebrow text-ink/40">Send a message</p>
      <label className="block text-sm">
        <span className="text-[0.8125rem] font-medium tracking-wide">Name *</span>
        <input
          type="text"
          name="name"
          required
          maxLength={100}
          placeholder="Your name"
          className={field}
        />
      </label>
      <label className="block text-sm">
        <span className="text-[0.8125rem] font-medium tracking-wide">Phone number</span>
        <input
          type="tel"
          name="phone"
          maxLength={40}
          placeholder="Optional"
          className={field}
        />
      </label>
      <label className="block text-sm">
        <span className="text-[0.8125rem] font-medium tracking-wide">Email *</span>
        <input
          type="email"
          name="email"
          required
          placeholder="you@organization.org"
          className={field}
        />
      </label>
      <label className="block text-sm">
        <span className="text-[0.8125rem] font-medium tracking-wide">Message *</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your organization and what you need help with."
          className={`${field} resize-y`}
        />
      </label>
      <button type="submit" className="btn btn-primary group w-full">
        Send on WhatsApp
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
      <p
        className={`text-xs font-medium text-ink/60 transition-opacity ${
          status === "sent" ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
      >
        Opening WhatsApp with your message…
      </p>
    </form>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuraCanvas } from "@/components/AuraCanvas";
import { ScrollProgress } from "@/components/ScrollProgress";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "grant writing",
    "grant writer Canada",
    "nonprofit funding",
    "charity grant consultant",
    "Toronto grant writing",
    "proposal review",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: "/Medina-Logo.png", alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/Medina-Logo.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  foundingDate: String(siteConfig.founded),
  areaServed: "Canada",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressCountry: "CA",
  },
  sameAs: [siteConfig.linkedin, siteConfig.youtube],
  slogan: siteConfig.tagline,
  image: `${siteConfig.url}/Medina-Logo.png`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "9",
    bestRating: "5",
  },
};

// Runs before paint so revealed content never flashes in and then hides.
const motionGate = `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion-ready')}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-full overflow-x-hidden bg-paper text-ink">
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
        <JsonLd data={organizationLd} />
        <ScrollProgress />
        <AuraCanvas />
        <div
          className="grain pointer-events-none fixed inset-0 z-0 opacity-[0.05]"
          aria-hidden
        />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

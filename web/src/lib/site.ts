import settings from "../../content/settings.json";
import reviewsFile from "../../content/reviews.json";

export const siteConfig = {
  name: "Medina Grant Writing & Consulting",
  shortName: "Medina",
  tagline: settings.tagline,
  heroLine: settings.heroLine,
  description: settings.description,
  url: "https://medinaconsulting.ca",
  phone: settings.phone,
  phoneHref: settings.phoneHref,
  whatsapp: settings.whatsapp,
  whatsappNumber: settings.whatsappNumber,
  linkedin: settings.linkedin,
  youtube: settings.youtube,
  founderVideoId: settings.founderVideoId,
  founded: 2025,
  location: settings.location,
} as const;

export const aboutCopy = {
  overview:
    "Medina Grant Writing & Consulting is a boutique agency helping nonprofits and charities across Canada secure sustainable funding, strengthen relationships with funders, and build lasting impact.",
  focus:
    "Our focus goes beyond writing grants — we specialize in reviewing proposals, coaching organizations through funder dynamics, and simulating site visits to prepare for the realities of the funding landscape.",
  empower:
    "We empower you to own your voice — and support you in aligning it with what funders need to see and feel to say “yes.”",
  helpYou: [
    "Write and refine proposals with a funder’s lens",
    "Build stronger relationships with current and prospective funders",
    "Strengthen your internal systems and readiness",
    "Design programs with funder-conscious strategy from the start",
  ],
  founderNote: settings.founderNote,
} as const;

export const services = [
  {
    slug: "grant-writing-strategy",
    title: "Grant Writing & Strategy",
    summary:
      "Write and refine proposals with a funder’s lens from the first draft.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "proposal-review-editing",
    title: "Funding Proposal Review & Editing",
    summary: "Strengthen applications before they reach the review table.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "program-design",
    title: "Program Design & Theory of Change",
    summary:
      "Design programs with funder-conscious strategy from the start.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "readiness-audits",
    title: "Organizational Readiness Audits",
    summary:
      "Strengthen internal systems and readiness before you apply.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "storytelling",
    title: "Culturally Competent Storytelling",
    summary:
      "Culturally grounded insight so your story lands with the people who fund it.",
  },
  {
    slug: "partnerships",
    title: "Strategic Partnerships",
    summary:
      "Build stronger relationships with current and prospective funders.",
  },
  {
    slug: "sector-expertise",
    title: "Nonprofit & Charitable Sector Expertise",
    summary:
      "Deep sector experience for registered charities and community organizations.",
  },
  {
    slug: "evaluation",
    title: "Evaluation & Impact Reporting",
    summary:
      "Show funders the outcomes they need to see — clearly and credibly.",
  },
] as const;

export const processSteps = [
  {
    num: "01",
    title: "Consult & assess readiness",
    body: "Clients come to us with different levels of readiness. We don’t expect everything to be in place — we meet you where you are and strengthen internal systems first.",
    scene: "Listen first",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    cues: ["Internal systems", "Organization voice", "Funder fit"],
  },
  {
    num: "02",
    title: "Write with a funder’s lens",
    body: "We guide you through the process, keep you involved at every stage, and make sure your organization’s voice is clear and authentic in every application.",
    scene: "Stay in the room",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    cues: ["Draft together", "Funder lens", "Authentic voice"],
  },
  {
    num: "03",
    title: "Coach through funder dynamics",
    body: "We coach organizations through funder conversations and simulate site visits so you are prepared for the realities of the funding landscape.",
    scene: "Rehearse the yes",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    cues: ["Site-visit rehearsal", "Funder questions", "Follow-up"],
  },
] as const;

export const faqs = [
  {
    q: "Why hire a grant writer?",
    a: "Our clients hire us to save time, save money, and build capacity.",
  },
  {
    q: "Do you take a percentage if we win the grant?",
    a: "No. All funds awarded to our clients belong to our clients.",
  },
  {
    q: "What are the chances of us winning a grant?",
    a: "When it comes to grants, it depends. Decisions are made based on the amount of funds available, how competitive the applicant pool is, your project’s alignment with funding priorities, and the strength of the application. It’s impossible to guarantee funding, but a well-aligned and well-prepared application will significantly improve your odds.",
  },
  {
    q: "How many grants do you have visibility on?",
    a: "Our current database holds over 1,500 grant opportunities for registered charities and non-profits, with nearly 60% based in Canada. We also maintain an internal database that is updated regularly to ensure no relevant opportunity is overlooked for our clients.",
  },
  {
    q: "What is your approach to working on projects?",
    a: "Our approach is collaborative. Clients come to us with different levels of readiness, and we adapt to meet those needs. We don’t expect everything to be in place. We guide our clients through the process, keep them involved at every stage, and ensure their organization’s voice is clear and authentic in every application.",
  },
] as const;

export const reviews = [...reviewsFile.reviews].sort(
  (a, b) => (a.order ?? 99) - (b.order ?? 99),
);

export const stats = [
  {
    value: settings.fundsSecured,
    prefix: "$",
    label: "Funds secured for clients",
  },
  {
    value: 1500,
    suffix: "+",
    label: "Grant opportunities tracked in our database",
  },
  {
    value: 60,
    prefix: "~",
    suffix: "%",
    label: "Canada-based opportunities, updated regularly",
  },
] as const;

export const fundsSecured = {
  value: settings.fundsSecured,
  prefix: "$",
  label: "funds secured",
} as const;

export const trustPoints = [
  "Registered charities",
  "Grassroots nonprofits",
  "Community organizations",
  "Faith-based initiatives",
  "Social enterprises",
  "Arts & culture groups",
  "Youth programs",
  "Newcomer services",
] as const;

export const heroMeta = [
  "Toronto, Canada",
  "Founded 2025",
  "Serving all provinces",
] as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact", label: "Contact" },
] as const;

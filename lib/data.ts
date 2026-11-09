import type { StaticImageData } from "next/image";
import curaImg from "@/public/cura.png";
import attrybImg from "@/public/attryb.png";
import autoPitchImg from "@/public/autopitch.png";

export const profile = {
  name: "Qitmeer Raza",
  email: "iamqitmeeer@gmail.com",
  linkedin: "https://www.linkedin.com/in/iamqitmeer",
  github: "https://github.com/iamqitmeer",
  augere: "https://augerelabs.com",
  resume: "/QitmeerRaza_FullStack_MERN_ReactNative.pdf",
  location: "Karachi, Pakistan",
};

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/about" },
  { label: "Journey", href: "/journey" },
] as const;

export type Venture = {
  name: string;
  role: string;
  since?: string;
  short: string;
  text: string;
  href?: string;
};

export const ventures: Venture[] = [
  {
    name: "Augere Labs",
    role: "Founder",
    short: "A senior product studio for founders",
    text: "I work with founders to plan, design and build software products: understanding the problem, making product decisions, choosing the technology, writing the code and getting it ready for launch.",
    href: "https://augerelabs.com",
  },
  {
    name: "Rembly",
    role: "Product",
    since: "Jun 2026",
    short: "Your digital memory",
    text: "A personal AI memory, built to hold on to what you would otherwise lose.",
  },
  {
    name: "Hearlist",
    role: "Engineering",
    since: "Aug 2026",
    short: "Engineering, from day one",
    text: "Building the engineering side of Hearlist alongside my other work.",
  },
  {
    name: "AngleBrackets",
    role: "Forward Deployed Engineer",
    since: "Jul 2026",
    short: "Between clients and engineering",
    text: "I lead client calls, shape technical solutions, keep projects moving and support performance marketing: Google Ads, conversion tracking and campaign optimisation.",
  },
];

/** Career rail under the hero. */
export const milestones = [
  { year: "2023", title: "First production code", note: "Frontend at Dawat-e-Islami" },
  { year: "2024", title: "Full stack", note: "MERN and Next.js at Zenth, POX" },
  { year: "2025", title: "Backend and product", note: "System design at prAIsm" },
  { year: "2025", title: "AngleBrackets", note: "AI SaaS and marketing tech" },
  { year: "2026", title: "Founder", note: "Augere Labs, Rembly, Hearlist" },
] as const;

export const stats = [
  { value: 2023, label: "Writing production code since" },
  { value: 7, label: "Teams I've shipped with" },
  { value: 3, label: "Products I'm building now" },
  { value: 5, label: "Disciplines, product to ad tech" },
] as const;

export const practiceData = [
  {
    area: "Product & engineering",
    text: "Turning a rough idea into a scoped MVP, then designing the architecture and writing the code across the whole stack.",
    items: ["Product planning", "MVP development", "System architecture", "Full-stack development"],
  },
  {
    area: "Web & mobile",
    text: "Fast, typed apps for the browser and the phone, sharing as much code and thinking as makes sense.",
    items: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "NestJS", "React Native"],
  },
  {
    area: "Backend & data",
    text: "Databases and server-side logic that stay stable when many people use the product at once.",
    items: ["Python", "PostgreSQL", "MongoDB", "Supabase"],
  },
  {
    area: "AI & automation",
    text: "AI features people actually use, and workflows that take repetitive work off a team's plate.",
    items: ["AI integrations", "AI-powered apps", "APIs", "Workflow automation"],
  },
  {
    area: "Marketing technology",
    text: "Clean data signals from the product to the ad platforms, so campaigns optimise on real outcomes.",
    items: ["Google Ads API", "Meta Ads API", "Google Tag Manager", "Server-side tracking"],
  },
] as const;

export const stack = [
  "TypeScript",
  "Next.js",
  "React Native",
  "NestJS",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Supabase",
  "MongoDB",
  "OpenAI",
  "Google Ads API",
  "Meta Ads API",
  "Tailwind",
] as const;

export type Project = {
  title: string;
  label: string;
  headline: string;
  description: string;
  stack: string;
  url: string;
  urlLabel: string;
  image: StaticImageData;
};

export const projectsData: Project[] = [
  {
    title: "Attryb",
    label: "Attryb, D2C personalisation",
    headline: "AI personalisation for D2C brands",
    description:
      "Visitor profiling and no-code tools that let marketers build custom user journeys without waiting on engineering.",
    stack: "Next.js, AI integration, Tailwind CSS",
    url: "https://attryb.com",
    urlLabel: "attryb.com",
    image: attrybImg,
  },
  {
    title: "AutoPitch.ai",
    label: "AutoPitch.ai, sales intelligence SaaS",
    headline: "Sales pitches written from six data sources",
    description:
      "Pulls signal from six-plus sources and writes personalised tech sales pitches, so sales teams spend less time on research.",
    stack: "Next.js, OpenAI API, MongoDB, Express, Node.js",
    url: "https://autopitch.ai",
    urlLabel: "autopitch.ai",
    image: autoPitchImg,
  },
  {
    title: "Cura AI",
    label: "Cura AI, healthtech",
    headline: "Symptom-to-guidance in plain language",
    description:
      "Suggests medicines from a list of symptoms, with a mobile-first interface designed with accessibility in mind.",
    stack: "Next.js, React, AI integration",
    url: "https://cura-ai.vercel.app",
    urlLabel: "cura-ai.vercel.app",
    image: curaImg,
  },
];

export const sideProject = {
  title: "Log Vwer",
  description:
    "An open-source logging tool for Node.js: live logs on a web dashboard, with filtering and storage in MongoDB, files or memory.",
};

export type Role = { title: string; dates: string; text?: string };
export type Company = { company: string; place: string; roles: Role[] };

export const experienceData: Company[] = [
  {
    company: "Hearlist",
    place: "Remote",
    roles: [{ title: "Engineering", dates: "Aug 2026 – Present" }],
  },
  {
    company: "AngleBrackets.io",
    place: "Karachi",
    roles: [
      {
        title: "Forward Deployed Engineer",
        dates: "Jul 2026 – Present",
        text: "Lead client calls, define solutions with the development team and connect the technical and business sides, while supporting Google Ads, conversion tracking and campaign optimisation.",
      },
      {
        title: "Software Engineer",
        dates: "Oct 2025 – Present",
        text: "Rebuilding the foundation of an AI SaaS platform with Next.js, React Native, OpenAI, MERN and Supabase. Wire Google Tag Manager, Google Ads API and Meta Ads API to the backend with custom scripts for cleaner ad data.",
      },
    ],
  },
  {
    company: "Rembly",
    place: "Remote",
    roles: [{ title: "Product", dates: "Jun 2026 – Present" }],
  },
  {
    company: "prAIsm",
    place: "Remote",
    roles: [
      { title: "Software Engineer", dates: "Feb 2026 – Apr 2026" },
      {
        title: "Back End Developer",
        dates: "Mar 2025 – Feb 2026",
        text: "Project manager and UI advisor on a fitness AI app: oversaw backend development and system architecture, and shaped the interface direction.",
      },
    ],
  },
  {
    company: "Zynix Solutions",
    place: "Karachi",
    roles: [
      {
        title: "Software Engineer, co-founder",
        dates: "Oct 2025 – Mar 2026",
        text: "A service company building MVPs, SaaS, CRM systems and web and mobile apps. We delivered work for several clients, then closed the company to move on to new opportunities.",
      },
    ],
  },
  {
    company: "Appollon Digitals",
    place: "Karachi",
    roles: [
      {
        title: "Frontend Developer",
        dates: "Jan 2025 – Sep 2025",
        text: "Built responsive interfaces for forex web applications.",
      },
    ],
  },
  {
    company: "Zenth Solutions",
    place: "Karachi",
    roles: [
      {
        title: "Full Stack Developer",
        dates: "Jan 2024 – Apr 2025",
        text: "Built and maintained production MERN and Next.js apps, and ran the company's branding and social media.",
      },
    ],
  },
  {
    company: "POX Solutions",
    place: "Karachi",
    roles: [
      {
        title: "Full Stack Developer",
        dates: "Oct 2023 – Jul 2024",
        text: "Shipped login, two-step authentication, chat, forms, a blog and an admin panel across four Node.js, Next.js and Supabase projects.",
      },
    ],
  },
  {
    company: "Dawat-e-Islami",
    place: "Karachi",
    roles: [
      {
        title: "Internship Trainee",
        dates: "Mar 2023 – Oct 2023",
        text: "Built reusable frontend components in HTML, CSS, JavaScript and React for the IT department.",
      },
    ],
  },
];

/* ---------- About page ---------- */

export const aboutIntro = [
  "I'm a software engineer and founder who enjoys taking products from an early idea to something people can actually use.",
  "I founded Augere Labs, where I work with founders to plan, design and build software products. My work covers everything from understanding the problem and making product decisions to choosing the right technology, writing code and getting products ready for launch.",
  "Alongside Augere Labs, I'm building Rembly, a personal AI memory product, and working on Hearlist. I also work as a Forward Deployed Engineer at AngleBrackets, where I sit between clients, business needs and engineering.",
];

export const dayToDay = [
  {
    title: "Understand the problem",
    text: "Lead the client conversation, find out what the business actually needs and get everyone aligned on what we're building and why.",
  },
  {
    title: "Shape the solution",
    text: "Make the product decisions, choose the technology and design an architecture that stays fast and stable as usage grows.",
  },
  {
    title: "Build it",
    text: "Write the code across web, mobile and backend: TypeScript, React, Next.js, NestJS, React Native, Python, PostgreSQL and Supabase.",
  },
  {
    title: "Ship and measure",
    text: "Get it ready for launch, then wire up tracking and the ad platforms so the product and the marketing data work together.",
  },
] as const;

export const builtKinds = [
  "SaaS platforms",
  "AI applications",
  "CRM systems",
  "Mobile apps",
  "Business automation",
  "Marketing technology",
] as const;

/* ---------- Journey page ---------- */

export type Chapter = {
  period: string;
  place: string;
  title: string;
  story: string;
  tags: string[];
  current?: boolean;
};

export const chapters: Chapter[] = [
  {
    period: "2023",
    place: "Dawat-e-Islami",
    title: "Learning to ship as part of a team",
    story:
      "An internship in the IT department. I built reusable frontend components in HTML, CSS, JavaScript and React and handed them to senior developers for larger projects. It taught me better frontend habits, how real teams work and the confidence to build for production.",
    tags: ["HTML & CSS", "JavaScript", "React"],
  },
  {
    period: "2023 – 2024",
    place: "POX Solutions",
    title: "Going full stack",
    story:
      "A full-stack internship where I worked on login, signup, two-step authentication, chat, forms, a blog and an admin panel, contributing to four full-stack projects with Node.js, Next.js and Supabase.",
    tags: ["Node.js", "Next.js", "Supabase"],
  },
  {
    period: "2024 – 2025",
    place: "Zenth Solutions",
    title: "Production apps, and the brand around them",
    story:
      "My first full-time role: developing and maintaining production web apps with the MERN stack and Next.js, while also running the company's branding and social media.",
    tags: ["MERN", "Next.js", "Branding"],
  },
  {
    period: "2025",
    place: "Appollon Digitals",
    title: "Interfaces for forex products",
    story:
      "Frontend work on forex web applications, building responsive interfaces with a cross-functional team.",
    tags: ["React", "Frontend", "Fintech"],
  },
  {
    period: "2025 – 2026",
    place: "prAIsm",
    title: "Backend, architecture and product",
    story:
      "On a fitness AI app I moved from backend developer to project manager and UI advisor: overseeing backend development and system architecture, shaping the interface and aligning the build with business goals.",
    tags: ["NestJS", "System design", "Product"],
  },
  {
    period: "2025 – 2026",
    place: "Zynix Solutions",
    title: "Co-founding a company, and closing it",
    story:
      "We started a service company to build MVPs, SaaS, CRM systems and web and mobile apps. We delivered quality work for several clients and gained a lot of experience, but couldn't stand out in the market, so we decided to close it and move on.",
    tags: ["Co-founder", "MVPs", "Client work"],
  },
  {
    period: "2025 – now",
    place: "AngleBrackets",
    title: "Between clients and engineering",
    story:
      "I joined as a software engineer rebuilding the foundation of an AI SaaS platform and wiring marketing data with Google Tag Manager, Google Ads API and Meta Ads API. Since July 2026 I've been a Forward Deployed Engineer: leading client calls, shaping solutions and keeping projects moving.",
    tags: ["AI SaaS", "Ad tech", "Client leadership"],
    current: true,
  },
  {
    period: "2026 – now",
    place: "Augere Labs, Rembly, Hearlist",
    title: "Building my own",
    story:
      "I founded Augere Labs to help founders take products from idea to launch, and I'm building Rembly, a personal AI memory, and working on Hearlist.",
    tags: ["Founder", "AI products", "Studio"],
    current: true,
  },
];

import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import curaImg from "@/public/cura.png";
import attrybImg from "@/public/attryb.png";
import autoPitchImg from "@/public/autopitch.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Software Engineer",
    location: "Zynix Solutions, Karachi",
    description:
      "Full-stack developer at a service-based company offering MVP development, SaaS solutions, CRM systems, and web and mobile development. Contributing across the stack to deliver high-quality, scalable client solutions and in-house products.",
    icon: React.createElement(CgWorkAlt),
    date: "Oct 2025 – Present",
  },
  {
    title: "Software Engineer",
    location: "AngleBracket.io, Karachi",
    description:
      "Building AI-based web applications with Next.js, React, React Native, OpenAI, and agentic AI. Rebuilding the foundation of a SaaS platform focused on AI. Researching GTM, Google Ads, and Meta Ads to wire technical integrations for customers and automate marketing tasks. Contributing to architecture-level decisions and scalable application design.",
    icon: React.createElement(CgWorkAlt),
    date: "Oct 2025 – Present",
  },
  {
    title: "Software Engineer",
    location: "prAIsm (formerly AFA Innovations), Remote",
    description:
      "Project Manager & UI Advisor on a Fitness AI application in active development. Overseeing backend development and system architecture while guiding UI direction, cross-functional collaboration, and alignment with business goals.",
    icon: React.createElement(CgWorkAlt),
    date: "Feb 2026 – Apr 2026",
  },
  {
    title: "Back End Developer",
    location: "prAIsm (formerly AFA Innovations), Remote",
    description:
      "Backend development and system design for a Fitness AI app. Handled Nest.js services, scalability, and collaboration on UI/UX decisions so the product runs smoothly and scales well.",
    icon: React.createElement(CgWorkAlt),
    date: "Mar 2025 – Feb 2026",
  },
  {
    title: "Frontend Developer",
    location: "Appollon Digitals, Karachi",
    description:
      "Designed and built FOREX web applications with intuitive, responsive interfaces. Collaborated with cross-functional teams to ship production-ready solutions.",
    icon: React.createElement(CgWorkAlt),
    date: "Jan 2025 – Sep 2025",
  },
  {
    title: "Full Stack Developer",
    location: "Zenth Solutions, Karachi",
    description:
      "Developed and maintained production MERN and Next.js applications across front end and back end. Oversaw branding and social media to strengthen the company’s online presence. Collaborated with the team to deliver scalable client solutions.",
    icon: React.createElement(FaReact),
    date: "Jan 2024 – Apr 2025",
  },
  {
    title: "Full Stack Developer (Node.js, Next.js, Supabase)",
    location: "POX Solutions, Karachi",
    description:
      "Full-stack internship building login, signup, two-step authentication, chat, forms, blog, and admin panel features. Contributed to four full-stack projects and gained practical real-world development experience.",
    icon: React.createElement(CgWorkAlt),
    date: "Oct 2023 – Jul 2024",
  },
  {
    title: "Internship Trainee",
    location: "Dawat-e-Islami, Karachi",
    description:
      "Built reusable frontend components with HTML, CSS, JavaScript, and React for the IT department. Focused on UI development and handing components to senior developers for integration into larger projects.",
    icon: React.createElement(CgWorkAlt),
    date: "Mar 2023 – Oct 2023",
  },
] as const;

export const projectsData = [
  {
    title: "Log Vwer",
    description:
      "Open-source logging tool for Node.js developers. Live logs on a web dashboard with filtering and storage in MongoDB, files, or memory — making debugging faster and cleaner.",
    tags: ["Node.js", "MongoDB", "Web Dashboard", "Open Source"],
    imageUrl: autoPitchImg,
  },
  {
    title: "Attryb",
    description:
      "AI-powered D2C personalization platform in Next.js. Visitor profiling and no-code tools for custom user journeys.",
    tags: ["Next.js", "AI Integration", "Full-Stack Development", "Tailwind CSS"],
    imageUrl: attrybImg,
  },
  {
    title: "AutoPitch.ai",
    description:
      "SaaS that creates personalized tech sales pitches by analyzing data from 6+ sources. AI-based pitch generation to help sales teams close deals faster.",
    tags: ["Next.js", "OpenAI API", "MERN Stack", "SaaS"],
    imageUrl: autoPitchImg,
  },
  {
    title: "Cura AI",
    description:
      "AI tool that recommends medicines based on symptoms. Mobile-responsive UI with a strong focus on accessibility.",
    tags: ["Next.js", "AI Integration", "React.js", "Tailwind CSS"],
    imageUrl: curaImg,
  },
] as const;

export const skillsData = [
  "Web Engineering",
  "Software Systems Engineering",
  "Software Design",
  "JavaScript",
  "TypeScript",
  "Python",
  "React.js",
  "Next.js",
  "React Native",
  "Node.js",
  "Nest.js",
  "Express.js",
  "MERN Stack",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "REST APIs",
  "Tailwind CSS",
  "AI & Machine Learning",
  "OpenAI / Agentic AI",
  "Architectural Design",
  "Git",
] as const;

import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
// Assuming you still want to use these placeholder images, or replace them with actual project images.
import attrybImg from "@/public/attryb.png"; 
import autoPitchImg from "@/public/autopitch.png";
import curaImg from "@/public/cura.png";

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
    title: "Open-Source Creator & Developer",
    location: "Remote",
    description:
      "Built and published three NPM packages: log-vwer, country-x, and safe-env, solving developer issues with logging, environment management, and country data access. Designed log-vwer as a plug-and-play dashboard for real-time log viewing and filtering in Node.js apps with MongoDB support.",
    icon: React.createElement(FaReact), // Using FaReact as a generic development icon
    date: "May 2025 – Present",
  },
  {
    title: "Frontend Developer (React, Next.js, React Native)",
    location: "Karachi, Pakistan",
    description:
      "Built intuitive and responsive SaaS/CRM UIs using React, Next.js, and Tailwind CSS. Integrated AI-driven personalization features to increase conversion and retention. Worked in cross-functional teams to deliver production-ready solutions.",
    icon: React.createElement(CgWorkAlt),
    date: "Apr 2025 – Present",
  },
  {
    title: "Full Stack Developer",
    location: "Karachi, Pakistan",
    description:
      "Built and maintained MERN/Next.js full-stack apps with high performance and scalability. Led branding and social media strategy to increase company visibility. Delivered clean code and seamless UI/UX across client projects.",
    icon: React.createElement(FaReact),
    date: "Jul 2024 – Apr 2025",
  },
  {
    title: "Frontend Web Developer (React/Next.js) - Internship",
    location: "Remote",
    description:
      "Completed a frontend internship, learning web development and working on full-stack projects. Developed website features including login, signup, two-step authentication, chat, form handling, blog, and admin panel. Contributed to two full-stack projects: an invoice app and a video downloader.",
    icon: React.createElement(LuGraduationCap),
    date: "Aug 2024 – Nov 2024",
  },
] as const;

export const projectsData = [
  {
    title: "Attryb",
    description:
      "Developed an AI-powered D2C personalization platform in Next.js. Built visitor profiling and no-code tools for custom user journeys.",
    tags: ["Next.js", "AI Integration", "Full-Stack Development", "Tailwind CSS"],
    imageUrl: attrybImg, // Placeholder, replace with actual project image
  },
  {
    title: "AutoPitch.ai",
    description:
      "Built a SaaS that creates personalized tech sales pitches by analyzing data from 6+ sources. Implemented AI-based pitch generation to help sales teams close deals faster.",
    tags: ["Next.js", "OpenAI API", "MERN Stack", "SaaS"],
    imageUrl: autoPitchImg, // Placeholder, replace with actual project image
  },
  {
    title: "Cura AI",
    description:
      "Developed an AI tool that recommends medicines based on symptoms. Designed mobile-responsive UI with a strong focus on accessibility.",
    tags: ["Next.js", "AI Integration", "React.js", "Tailwind CSS"],
    imageUrl: curaImg, // Placeholder, replace with actual project image
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "React Native",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "REST APIs",
  "OpenAI API",
  "Firebase",
  "Supabase",
  "Git",
  "SaaS Development",
  "CRM Systems",
  "AI Integration",
  "Framer Motion", // Added based on original data, assuming it's still relevant
] as const;
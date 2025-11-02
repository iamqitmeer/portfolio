import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";

// Import project images - Make sure you have these in your /public folder
import curaImg from "@/public/cura.png"; // **ADD THIS IMAGE TO YOUR /public FOLDER**
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
    title: "Frontend Developer",
    location: "Appollon Digitals, Karachi",
    description:
      "Designing and developing FOREX web applications with a focus on intuitive and responsive user interfaces. Collaborating with cross-functional teams to deliver high-quality, production-ready solutions.",
    icon: React.createElement(CgWorkAlt),
    date: "Apr 2025 – Present",
  },
  {
    title: "Back End Developer (Part-Time/Freelance)",
    location: "AFA Innovations, Remote",
    description:
      "Overseeing backend development (Nest.js) and system architecture for a Fitness AI Application. Also contributing to UI/UX direction to ensure the product is scalable, reliable, and aligns with business goals.",
    icon: React.createElement(CgWorkAlt),
    date: "Mar 2025 – Present",
  },
  {
    title: "Creator - Open Source",
    location: "Remote",
    description:
      "Built and published Log Vwer, a simple and powerful logging tool for Node.js developers. It provides a clean web dashboard for live log viewing, filtering, and storage.",
    icon: React.createElement(FaReact),
    date: "May 2025 – Present",
  },
  {
    title: "Full Stack Developer",
    location: "Zenth Solutions, Karachi",
    description:
      "Developed and maintained production-level MERN/Next.js full-stack applications with a focus on high performance and scalability. Led branding and social media strategy to increase the company’s online presence.",
    icon: React.createElement(FaReact),
    date: "Jul 2024 – Apr 2025",
  },
  {
    title: "Full Stack Developer (Node.js, Next.js, Supabase)",
    location: "POX Solutions, Remote",
    description:
      "Worked on features like login, two-step authentication, chat, and admin panels. Contributed to two full-stack projects: a finance app and a video downloader.",
    icon: React.createElement(CgWorkAlt),
    date: "Oct 2023 – Jul 2024",
  },
  {
    title: "Internship Trainee",
    location: "Dawat-e-Islami, Karachi",
    description:
      "Contributed by building reusable frontend components using HTML, CSS, JavaScript, and basic React. This role helped improve my frontend coding practices and understanding of team workflows.",
    icon: React.createElement(CgWorkAlt),
    date: "Mar 2023 – Oct 2023",
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
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "React Native",
  "Node.js",
  "Nest.js",
  "Express.js",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
  "REST APIs",
  "Firebase",
  "Supabase",
  "Architectural Design",
  "Server-Side Programming",
  "Git",
  "AI Integration",
] as const;
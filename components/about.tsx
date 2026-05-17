"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        My name is Qitmeer. I am a{" "}
        <span className="font-medium">Full Stack Developer</span> from Karachi,
        Pakistan. I build web apps, mobile apps, CRM systems, and SaaS products
        that are fast and easy to use, mainly with{" "}
        <span className="font-medium">JavaScript and TypeScript</span> — React,
        Next.js, Node.js, Nest.js, and React Native — plus{" "}
        <span className="font-medium">PostgreSQL and MongoDB</span>.
      </p>

      <p className="mb-3">
        I am a{" "}
        <span className="font-medium">Software Engineer at AngleBracket.io</span>
        , working on AI-based web applications with Next.js, React Native,
        OpenAI, and agentic AI, including rebuilding the foundation of an
        AI-focused SaaS platform. I also contribute at{" "}
        <span className="font-medium">Zynix Solutions</span> on full-stack MVP,
        SaaS, and CRM delivery. At{" "}
        <span className="font-medium">prAIsm</span> (formerly AFA Innovations), I
        serve as Project Manager & UI Advisor on a Fitness AI app — overseeing
        backend architecture, system design, and product direction.
      </p>

      <p className="mb-3">
        I created{" "}
        <span className="font-medium">Log Vwer</span>, an open-source logging
        tool for Node.js with live dashboard views, filtering, and storage in
        MongoDB, files, or memory. Previously I was a Frontend Developer at{" "}
        <span className="font-medium">Appollon Digitals</span> (FOREX web apps)
        and a Full Stack Developer at{" "}
        <span className="font-medium">Zenth Solutions</span>. I started with
        internships at POX Solutions and Dawat-e-Islami, and have freelanced for
        30+ clients delivering SaaS, web, mobile, and CRM systems on time and to a
        high standard.
      </p>

      <p>
        I studied Full Stack Web and Mobile App Development at SMIT and Expertizo
        University, completed graphic design training, and earned a professional
        IT certificate from SIMSAT. Based in{" "}
        <span className="font-medium">Korangi Industrial Area, Karachi</span>.
        Open to connecting — reach me via the contact section below.
      </p>
    </motion.section>
  );
}

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
        I am a{" "}
        <span className="font-medium">Full-Stack Software Developer</span> from
        Karachi, Pakistan, specializing in building modern, fast, and
        user-friendly websites, mobile applications, CRM systems, and SaaS
        products. I am proficient in both{" "}
        <span className="font-medium">JavaScript and TypeScript</span>, using my
        skills to turn complex problems into clean, scalable solutions.
      </p>

      <p className="mb-3">
        My main stack includes{" "}
        <span className="font-medium">
          React, Next.js, Node.js, Nest.js, and React Native
        </span>
        , alongside databases like{" "}
        <span className="font-medium">PostgreSQL and MongoDB</span>. I am
        passionate about open-source and have built{" "}
        <span className="font-medium">Log Vwer</span>, a real-time logging tool
        for Node.js developers. I also contribute as a part-time Back-End
        Developer and Project Manager at AFA Innovations on a Fitness AI
        Application, where I oversee backend development and system
        architecture.
      </p>

      <p>
        I am always learning and currently exploring{" "}
        <span className="font-medium">DevOps, Cloud & Web3</span> to build smarter
        applications .
      </p>
    </motion.section>
  );
}

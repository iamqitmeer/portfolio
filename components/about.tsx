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
        I love building fast, easy-to-use, and scalable websites, SaaS
        platforms, and CRM tools. With{" "}
        <span className="font-medium">2.5 years of experience</span>, my journey
        started with a simple question: “How does the internet work?” That
        curiosity led me to learn{" "}
        <span className="font-medium">
          JavaScript, TypeScript, and the MERN stack
        </span>
        . At first, I focused on creating reusable UI components. Over time, I
        started building complete full-stack systems and added AI to make apps
        smarter and more useful. I’ve also created three helpful
        <span className="font-medium"> NPM packages</span> to solve common
        problems developers face. I enjoy turning complex problems into simple,
        clean solutions, always keeping the user experience in mind.
      </p>

      <p>
        My core stack for development includes{" "}
        <span className="font-medium">
          React.js, Next.js, React Native, Node.js, Express.js, and MongoDB
        </span>
        . I am also highly proficient in{" "}
        <span className="font-medium">TypeScript and Tailwind CSS</span>. I'm
        always eager to expand my knowledge and am currently diving deeper into{" "}
        <span className="font-medium">AI, ML, and Data Science</span> to
        integrate even smarter solutions into applications. I'm actively sharing
        my insights on platforms like{" "}
        <a className="underline" href="https://www.linkedin.com/in/iamqitmeer/">LinkedIn</a> and{" "}
        <a className="underline" href="https://www.x.com/iamqitmeer/">X</a>.
      </p>
    </motion.section>
  );
}

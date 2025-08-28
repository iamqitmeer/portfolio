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
        I enjoy building fast, user-friendly, and scalable websites, SaaS
        platforms, and CRM tools. With{" "}
        <span className="font-medium">2.5 years of experience</span>, I have
        worked with{" "}
        <span className="font-medium">
          JavaScript, TypeScript, and the MERN stack
        </span>{" "}
        to create both front-end and full-stack applications. I also developed
        three helpful <span className="font-medium">NPM packages</span> to solve
        common developer challenges. My focus is on turning complex problems
        into simple, clean solutions with a great user experience.
      </p>

      <p>
        My main stack includes{" "}
        <span className="font-medium">
          React.js, Next.js, React Native, Node.js, Express.js, and MongoDB
        </span>
        . I am also skilled in{" "}
        <span className="font-medium">TypeScript and Tailwind CSS</span>. I am
        always learning and currently exploring{" "}
        <span className="font-medium">AI, ML, and Data Science</span> to build
        even smarter applications. I regularly share my learnings and insights
        on{" "}
        <a
          className="underline"
          href="https://www.linkedin.com/in/iamqitmeer/"
          target="_blank"
        >
          LinkedIn
        </a>{" "}
        and{" "}
        <a
          className="underline"
          href="https://www.x.com/iamqitmeer/"
          target="_blank"
        >
          X
        </a>
        .
      </p>
    </motion.section>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { dayToDay } from "@/lib/data";
import SectionHead from "./section-head";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** The four steps really are a sequence, so they're numbered and joined by a line that draws in. */
export default function DayToDay() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ".steps", start: "top 75%" } })
          .fromTo(".steps-line", { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "power2.inOut" })
          .fromTo(
            ".step-dot",
            { scale: 0 },
            { scale: 1, duration: 0.5, stagger: 0.38, ease: "back.out(3)" },
            0.05
          )
          .fromTo(
            ".step-body",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.38, ease: "expo.out" },
            0.1
          );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="day-title" className="border-t border-line">
      <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
        <SectionHead
          id="day-title"
          title="From the first call to launch"
          aside="My role changes with the project, but the work usually moves through these four steps, and I stay with it through all of them."
        />

        <ol className="steps relative mt-16 grid gap-10 md:mt-24 md:grid-cols-4 md:gap-8">
          <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-paper/10 md:block" />
          <span aria-hidden className="steps-line absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-gradient-to-r from-lilac-deep via-lilac to-signal md:block" />
          {dayToDay.map((s, i) => (
            <li key={s.title} className="relative">
              <span
                aria-hidden
                className={`step-dot relative z-10 block h-[15px] w-[15px] rounded-full border-2 ${
                  i === dayToDay.length - 1 ? "border-signal bg-signal" : "border-lilac bg-ink"
                }`}
              />
              <div className="step-body">
                <p className="mt-6 font-mono text-[0.8125rem] text-faint">Step {i + 1}</p>
                <h3 className="mt-2 font-brand text-[1.6rem] font-bold leading-tight tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-3 leading-[1.65] text-dim">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { stack } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Marquee() {
  const root = useRef<HTMLElement>(null);

  // Endless drift; scrolling speeds it up and flips direction with you.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const loop = gsap.to(".marquee-track", {
          xPercent: -50,
          duration: 40,
          ease: "none",
          repeat: -1,
        });
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity() / 300;
            gsap.to(loop, {
              timeScale: self.direction * Math.max(1, Math.min(Math.abs(v), 5)),
              duration: 0.3,
              overwrite: true,
              onComplete: () => {
                gsap.to(loop, { timeScale: self.direction, duration: 1.2 });
              },
            });
          },
        });
      });
    },
    { scope: root }
  );

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {stack.map((s) => (
        <li key={s} className="flex items-center">
          <span className="px-6 font-brand text-[clamp(2.4rem,5.4vw,4.75rem)] font-bold leading-none tracking-[-0.035em] text-paper/90 md:px-9">
            {s}
          </span>
          <span aria-hidden className="font-brand text-[clamp(2.4rem,5.4vw,4.75rem)] font-light text-lilac-deep/70">
            /
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section ref={root} aria-labelledby="stack-title" className="overflow-hidden border-t border-line py-20 md:py-28">
      <div className="mx-auto mb-10 flex max-w-[80rem] items-end justify-between gap-6 px-5 md:mb-14 md:px-10">
        <h2 id="stack-title" className="h-section">
          The stack I ship on
        </h2>
        <p className="hidden max-w-[22rem] text-right text-dim md:block">
          Chosen per project, but this is where I&apos;m fastest.
        </p>
      </div>
      <div className="flex w-max">
        <div className="marquee-track flex">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}

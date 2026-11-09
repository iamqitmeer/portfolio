"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { practiceData } from "@/lib/data";
import SectionHead from "./section-head";

gsap.registerPlugin(useGSAP);

export default function Practice() {
  const panel = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const area = practiceData[active];

  // Panel content re-enters whenever the active area changes
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".panel-item",
          { opacity: 0, y: 12, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.05, ease: "expo.out" }
        );
      });
    },
    { scope: panel, dependencies: [active], revertOnUpdate: true }
  );

  return (
    <section id="practice" aria-labelledby="practice-title" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
        <SectionHead
          id="practice-title"
          title={
            <>
              One person for product,
              <br className="hidden sm:block" /> code, AI and growth
            </>
          }
          aside="I enjoy problems that need both product thinking and technical execution. These are the areas I work across day to day."
        />

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-14">
          <ul className="border-t border-line md:col-span-6" role="tablist" aria-label="Practice areas">
            {practiceData.map((p, i) => {
              const on = i === active;
              return (
                <li key={p.area} className="border-b border-line">
                  <button
                    type="button"
                    role="tab"
                    id={`tab-${i}`}
                    aria-selected={on}
                    aria-controls="practice-panel"
                    onClick={() => setActive(i)}
                    onPointerEnter={() => setActive(i)}
                    className="group flex w-full items-center gap-4 py-5 text-left md:py-6"
                  >
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${
                        on ? "bg-signal" : "bg-faint/50"
                      }`}
                    />
                    <span
                      className={`font-brand text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-none tracking-[-0.03em] transition-colors duration-300 ${
                        on ? "text-paper" : "text-faint group-hover:text-dim"
                      }`}
                    >
                      {p.area}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            ref={panel}
            id="practice-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            className="panel flex flex-col justify-between gap-10 overflow-hidden bg-gradient-to-b from-raised to-ink p-7 md:sticky md:top-28 md:col-span-6 md:min-h-[24rem] md:self-start md:p-10"
          >
            <div>
              <p className="panel-item font-mono text-[0.8125rem] text-faint">
                {String(active + 1).padStart(2, "0")} / {String(practiceData.length).padStart(2, "0")}
              </p>
              <h3 className="panel-item mt-4 font-brand text-[clamp(1.9rem,3vw,2.5rem)] font-bold leading-none tracking-[-0.03em] text-lilac">
                {area.area}
              </h3>
              <p className="panel-item mt-5 max-w-[42ch] text-[1.0625rem] leading-[1.65] text-dim">
                {area.text}
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {area.items.map((item) => (
                <li
                  key={item}
                  className="panel-item rounded-full border border-line bg-paper/[0.03] px-3.5 py-1.5 text-[0.875rem]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

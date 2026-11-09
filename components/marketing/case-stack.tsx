"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { marketingResults } from "@/lib/marketing";
import Compare from "./compare";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Client results as cards that stack on scroll: each new card slides over the last, which recedes. */
export default function CaseStack() {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".case-card");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          // explicit start values: GSAP can't interpolate from filter "none"
          gsap.fromTo(
            card.querySelector(".case-inner"),
            { scale: 1, filter: "brightness(1) blur(0px)" },
            {
              scale: 0.93,
              filter: "brightness(0.55) blur(1.5px)",
              ease: "none",
              scrollTrigger: { trigger: next, start: "top 85%", end: "top 140px", scrub: true },
            }
          );
        });
      });
    },
    { scope: root }
  );

  return (
    <ol ref={root} className="mt-14 space-y-6 md:mt-20 md:space-y-[18vh]">
      {marketingResults.map((c, i) => (
        <li key={c.client} className="case-card md:sticky" style={{ top: `${110 + i * 14}px` }}>
          <article className="case-inner panel origin-top overflow-hidden bg-gradient-to-br from-raised via-raised to-ink p-7 shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.9)] md:p-12">
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.75rem] text-faint">Case {String(i + 1).padStart(2, "0")}</span>
                  <span className="rounded-full border border-signal/30 bg-signal/10 px-2.5 py-0.5 text-[0.75rem] font-medium text-signal">
                    {c.industry}
                  </span>
                </div>
                <h3 className="mt-4 font-brand text-[clamp(1.9rem,3.2vw,2.75rem)] font-bold leading-[1.02] tracking-[-0.035em] [text-wrap:balance]">
                  {c.client}
                </h3>
                {c.metrics.length ? (
                  <div className="mt-8 space-y-8">
                    {c.metrics.map((m) => (
                      <Compare key={m.label} m={m} compact />
                    ))}
                  </div>
                ) : null}
              </div>
              <ul className="space-y-5 md:col-span-6 md:col-start-7 md:pt-10">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-4 text-[1.0625rem] leading-[1.65] text-dim">
                    <span aria-hidden className="mt-[0.7rem] h-px w-5 shrink-0 bg-lilac" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}

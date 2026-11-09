"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { stats } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const statement =
  "Most of my work sits between clients, business needs and engineering. I like understanding why something needs to be built just as much as figuring out how to build it.";

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Words light up as you read down
        gsap.fromTo(
          ".reveal-word",
          { color: "rgb(132 126 152 / 0.45)" },
          {
            color: "rgb(242 239 250)",
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: ".statement",
              start: "top 78%",
              end: "bottom 45%",
              scrub: true,
            },
          }
        );

        // Count the numbers up once
        gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
          const target = Number(el.dataset.value);
          const from = target > 1000 ? target - 40 : 0;
          const obj = { v: from };
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v));
            },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-label="How I think about the work" className="border-t border-line">
      <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-36">
        <p className="statement max-w-[24ch] font-brand text-[clamp(2rem,4.6vw,3.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
          {statement.split(" ").map((w, i) => (
            <span key={i} className="reveal-word">
              {w}{" "}
            </span>
          ))}
        </p>

        <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 md:mt-28 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-t border-line pt-5">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span
                  className="stat-num block font-brand text-[clamp(2.5rem,4.4vw,3.5rem)] font-bold leading-none tracking-[-0.04em] tabular-nums"
                  data-value={s.value}
                >
                  {s.value}
                </span>
                <span aria-hidden className="mt-3 block text-[0.9375rem] text-dim">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

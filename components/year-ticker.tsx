"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { chapters, profile } from "@/lib/data";
import Age from "./age";

gsap.registerPlugin(useGSAP);

/** Big year that counts from the first freelance year up to this year, with a filling bar. */
export default function YearTicker() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const now = new Date().getFullYear();
  const from = profile.buildingSince;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const o = { v: from };
        const el = num.current;
        if (el) el.textContent = String(from);
        gsap
          .timeline({ delay: 0.5 })
          .to(o, {
            v: now,
            duration: 2.2,
            ease: "power3.inOut",
            onUpdate: () => {
              if (el) el.textContent = String(Math.round(o.v));
            },
          })
          .fromTo(".tick-bar", { scaleX: 0 }, { scaleX: 1, duration: 2.2, ease: "power3.inOut" }, 0)
          .fromTo(".tick-dot", { scale: 0 }, { scale: 1, duration: 0.3, stagger: 2.2 / (now - from + 1), ease: "back.out(3)" }, 0);
      });
    },
    { scope: root }
  );

  const years = Array.from({ length: now - from + 1 }, (_, i) => from + i);

  return (
    <div ref={root} className="panel relative ml-auto max-w-[26rem] overflow-hidden p-7">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-lilac-deep/20 blur-3xl" />
      <p className="relative font-mono text-[0.75rem] text-faint">building since {from}</p>
      <p className="relative mt-3 font-brand text-[clamp(4rem,8vw,6rem)] font-bold leading-none tracking-[-0.05em] tabular-nums">
        <span ref={num} suppressHydrationWarning>
          {now}
        </span>
      </p>

      <div className="relative mt-6">
        <div className="relative h-px bg-paper/10">
          <div className="tick-bar absolute inset-0 origin-left bg-gradient-to-r from-lilac-deep via-lilac to-signal" />
        </div>
        <ol className="mt-3 flex justify-between font-mono text-[0.6875rem] text-faint" aria-hidden>
          {years.map((y, i) => (
            <li key={y} className="flex flex-col items-center gap-1.5">
              <span className={`tick-dot -mt-[1.05rem] h-2 w-2 rounded-full ${i === years.length - 1 ? "bg-signal" : "bg-lilac"}`} />
              {String(y).slice(2)}
            </li>
          ))}
        </ol>
      </div>

      <dl className="relative mt-7 grid grid-cols-3 gap-4 border-t border-line pt-5">
        {(
          [
            [String(now - from), "years building"],
            [String(chapters.length), "chapters"],
            [<Age key="a" />, "years old"],
          ] as [React.ReactNode, string][]
        ).map(([v, l]) => (
          <div key={l}>
            <dt className="sr-only">{l}</dt>
            <dd>
              <span className="block font-brand text-[1.6rem] font-bold leading-none tracking-[-0.03em]">{v}</span>
              <span aria-hidden className="mt-1 block text-[0.75rem] text-dim">
                {l}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

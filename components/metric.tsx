"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Metric as MetricT } from "@/lib/marketing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const fmt = (n: number, m: MetricT) =>
  `${m.prefix ?? ""}${n.toLocaleString("en-US", {
    minimumFractionDigits: m.decimals ?? 0,
    maximumFractionDigits: m.decimals ?? 0,
  })}${m.suffix ?? ""}`;

/**
 * A number that counts from its "before" value to its "after" value when it
 * scrolls into view. The before value stays visible, struck through.
 */
export default function Metric({ m, size = "lg" }: { m: MetricT; size?: "lg" | "md" }) {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = num.current;
        if (!el) return;
        const obj = { v: m.from ?? 0 };
        el.textContent = fmt(obj.v, m);
        gsap.to(obj, {
          v: m.to,
          duration: m.from !== undefined ? 1.8 : 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = fmt(obj.v, m);
          },
        });
        gsap.fromTo(
          ".metric-before",
          { opacity: 0, x: -8 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <p className="flex flex-wrap items-baseline gap-x-3">
        <span
          ref={num}
          className={`font-brand font-bold leading-none tracking-[-0.04em] tabular-nums ${
            size === "lg" ? "text-[clamp(2.8rem,5vw,4.25rem)]" : "text-[clamp(2rem,3.2vw,2.75rem)]"
          } ${m.from !== undefined ? "text-lilac" : "text-paper"}`}
        >
          {fmt(m.to, m)}
        </span>
        {m.from !== undefined ? (
          <span className="metric-before text-[1rem] text-faint line-through decoration-signal/70 decoration-2">
            from {fmt(m.from, m)}
          </span>
        ) : null}
      </p>
      <p className="mt-3 font-medium">{m.label}</p>
      {m.note ? <p className="mt-1 text-[0.9375rem] text-dim">{m.note}</p> : null}
    </div>
  );
}

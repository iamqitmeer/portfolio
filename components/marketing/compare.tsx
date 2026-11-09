"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Metric } from "@/lib/marketing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const fmt = (n: number, m: Metric) =>
  `${m.prefix ?? ""}${n.toLocaleString("en-US", {
    minimumFractionDigits: m.decimals ?? 0,
    maximumFractionDigits: m.decimals ?? 0,
  })}${m.suffix ?? ""}`;

/** Change from before to after: percentage points for % metrics, relative % otherwise. */
function delta(m: Metric) {
  if (m.from === undefined) return null;
  if (m.suffix === "%") {
    const d = m.to - m.from;
    return { text: `${d > 0 ? "+" : ""}${d} pts`, good: d > 0 };
  }
  const d = Math.round(((m.to - m.from) / m.from) * 100);
  // for costs, lower is better
  return { text: `${d > 0 ? "+" : ""}${d}%`, good: d < 0 };
}

/** Before/after bars that animate in, with a counting "after" number and the change. */
export default function Compare({ m, compact = false }: { m: Metric; compact?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const d = delta(m);
  const max = Math.max(m.from ?? 0, m.to);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: root.current, start: "top 85%", once: true };
        const tl = gsap.timeline({ scrollTrigger: st, defaults: { ease: "expo.out" } });
        tl.fromTo(".bar-before", { scaleX: 0 }, { scaleX: 1, duration: 0.9 })
          .fromTo(".bar-after", { scaleX: 0 }, { scaleX: 1, duration: 1.2 }, 0.35)
          .fromTo(".delta", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(3)" }, 1);
        const el = num.current;
        if (el) {
          const o = { v: m.from ?? 0 };
          tl.to(o, { v: m.to, duration: 1.4, onUpdate: () => (el.textContent = fmt(o.v, m)) }, 0.35);
        }
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span
          ref={num}
          className={`font-brand font-bold leading-none tracking-[-0.04em] tabular-nums text-lilac ${
            compact ? "text-[clamp(1.9rem,3vw,2.5rem)]" : "text-[clamp(2.6rem,4.6vw,3.9rem)]"
          }`}
        >
          {fmt(m.to, m)}
        </span>
        {d ? (
          <span
            className={`delta rounded-full px-2.5 py-1 font-mono text-[0.75rem] font-semibold ${
              d.good ? "bg-lilac/15 text-lilac" : "bg-signal/15 text-signal"
            }`}
          >
            {d.text}
          </span>
        ) : null}
      </div>
      <p className="mt-2 font-medium">{m.label}</p>

      {m.from !== undefined ? (
        <div className="mt-4 space-y-2" aria-hidden>
          <div className="flex items-center gap-3">
            <span className="w-12 shrink-0 font-mono text-[0.6875rem] text-faint">before</span>
            <span className="h-2 flex-1 rounded-full bg-paper/[0.05]">
              <span className="bar-before block h-full origin-left rounded-full bg-paper/25" style={{ width: `${(m.from / max) * 100}%` }} />
            </span>
            <span className="w-14 shrink-0 text-right font-mono text-[0.75rem] text-faint">{fmt(m.from, m)}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-12 shrink-0 font-mono text-[0.6875rem] text-faint">after</span>
            <span className="h-2 flex-1 rounded-full bg-paper/[0.05]">
              <span
                className="bar-after block h-full origin-left rounded-full bg-gradient-to-r from-lilac-deep to-lilac shadow-[0_0_14px_rgb(var(--lilac)/0.35)]"
                style={{ width: `${(m.to / max) * 100}%` }}
              />
            </span>
            <span className="w-14 shrink-0 text-right font-mono text-[0.75rem] text-paper">{fmt(m.to, m)}</span>
          </div>
        </div>
      ) : null}
      {m.note ? <p className="mt-3 text-[0.875rem] text-dim">{m.note}</p> : null}
    </div>
  );
}

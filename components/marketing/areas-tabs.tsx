"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { marketingAreas } from "@/lib/marketing";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The six areas of work as tabs: a sliding pill marks the active one, the panel cross-fades. */
export default function AreasTabs() {
  const [active, setActive] = useState(0);
  const area = marketingAreas[active];

  return (
    <div className="mt-14 md:mt-20">
      <div role="tablist" aria-label="Areas of work" className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
        {marketingAreas.map((a, i) => (
          <button
            key={a.title}
            role="tab"
            id={`area-tab-${i}`}
            aria-selected={i === active}
            aria-controls="area-panel"
            onClick={() => setActive(i)}
            className={`relative shrink-0 rounded-full px-4 py-2.5 text-[0.9375rem] font-medium transition-colors duration-300 ${
              i === active ? "text-ink" : "text-dim hover:text-paper"
            }`}
          >
            {i === active ? (
              <motion.span layoutId="area-pill" className="absolute inset-0 rounded-full bg-lilac" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
            ) : null}
            <span className="relative">{a.title}</span>
          </button>
        ))}
      </div>

      <div id="area-panel" role="tabpanel" aria-labelledby={`area-tab-${active}`} className="panel relative mt-6 overflow-hidden p-7 md:p-12">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-lilac-deep/15 blur-3xl" />
        <AnimatePresence mode="wait">
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative grid gap-10 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <p className="font-mono text-[0.75rem] text-signal">
                {String(active + 1).padStart(2, "0")} / {String(marketingAreas.length).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-brand text-[clamp(1.9rem,3vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em] [text-wrap:balance]">
                {area.title}
              </h3>
            </div>
            <ul className="space-y-5 md:col-span-8">
              {area.points.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.45, ease: EASE }}
                  className="flex gap-4 text-[1.0625rem] leading-[1.65] text-dim"
                >
                  <span aria-hidden className="mt-[0.7rem] h-px w-6 shrink-0 bg-lilac" />
                  {p}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

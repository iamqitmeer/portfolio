"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(useGSAP);

// The "full loop" from the marketing summary, in order.
const steps = [
  { title: "Strategy & build", text: "Campaign structure planned around business goals, not platform defaults." },
  { title: "Daily optimisation", text: "Search terms, negatives, placements and bid strategy, every week." },
  { title: "Tracking & attribution", text: "Offline conversions from the CRM so bidding learns from real outcomes." },
  { title: "Budget", text: "Daily budgets inside portfolio limits, moved toward what produces revenue." },
  { title: "Creative", text: "Compliant ad copy and AI UGC-style video with Google Veo." },
  { title: "Reporting", text: "Weekly updates built on CRM data, with honest notes on risk." },
];

const R = 150; // ring radius in the 400×400 viewBox
const C = 200;

export default function LoopDiagram() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // A comet travels the ring; the step it passes becomes active.
  useGSAP(
    () => {
      const comet = root.current?.querySelector<SVGGElement>(".comet");
      if (!comet) return;
      const place = (a: number) => {
        const rad = (a - 90) * (Math.PI / 180);
        comet.setAttribute("transform", `translate(${C + Math.cos(rad) * R} ${C + Math.sin(rad) * R}) rotate(${a})`);
      };
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const s = { a: 0 };
        gsap.to(s, {
          a: 360,
          duration: 18,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            place(s.a);
            setActive(Math.floor((((s.a + 30) % 360) / 360) * steps.length) % steps.length);
          },
        });
        gsap.fromTo(".loop-node", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.7, stagger: 0.08, ease: "back.out(2.5)", delay: 0.4 });
        gsap.fromTo(".loop-ring", { strokeDashoffset: 943 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => place(0));
    },
    { scope: root }
  );

  const step = steps[active];

  return (
    <div ref={root} className="relative mx-auto aspect-square w-full max-w-[20rem] sm:max-w-[26rem]">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <radialGradient id="loopGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(143 127 224 / 0.22)" />
            <stop offset="100%" stopColor="rgb(143 127 224 / 0)" />
          </radialGradient>
          <linearGradient id="cometTail" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="rgb(255 181 71 / 0)" />
            <stop offset="1" stopColor="rgb(255 181 71 / 0.9)" />
          </linearGradient>
        </defs>
        <circle cx={C} cy={C} r={R + 40} fill="url(#loopGlow)" />
        <circle
          className="loop-ring"
          cx={C}
          cy={C}
          r={R}
          fill="none"
          stroke="rgb(218 209 249 / 0.25)"
          strokeWidth="1.5"
          strokeDasharray="943"
        />
        <circle cx={C} cy={C} r={R - 22} fill="none" stroke="rgb(218 209 249 / 0.07)" strokeDasharray="2 6" />

        {steps.map((s, i) => {
          const a = (i / steps.length) * 360;
          const rad = (a - 90) * (Math.PI / 180);
          const x = C + Math.cos(rad) * R;
          const y = C + Math.sin(rad) * R;
          const on = i === active;
          return (
            <g key={s.title} className="loop-node" transform={`translate(${x} ${y})`}>
              <circle r={on ? 9 : 6} fill={on ? "rgb(218 209 249)" : "rgb(12 11 18)"} stroke="rgb(218 209 249 / 0.8)" strokeWidth="1.5" style={{ transition: "r .4s, fill .4s" }} />
              {on ? <circle r="18" fill="none" stroke="rgb(218 209 249 / 0.25)" /> : null}
            </g>
          );
        })}

        <g className="comet">
          <rect x="-34" y="-1.5" width="34" height="3" rx="1.5" fill="url(#cometTail)" transform="rotate(0)" />
          <circle r="5" fill="rgb(255 181 71)" style={{ filter: "drop-shadow(0 0 6px rgb(255 181 71))" }} />
        </g>
      </svg>

      {/* step labels around the ring */}
      {steps.map((s, i) => {
        const a = (i / steps.length) * 360;
        const rad = (a - 90) * (Math.PI / 180);
        const x = 50 + Math.cos(rad) * 49;
        const y = 50 + Math.sin(rad) * 49;
        const right = Math.cos(rad) > 0.2;
        const left = Math.cos(rad) < -0.2;
        return (
          <button
            key={s.title}
            type="button"
            onClick={() => setActive(i)}
            className={`absolute hidden whitespace-nowrap rounded-full px-2.5 py-1 sm:block text-[0.75rem] font-medium transition-colors duration-300 md:text-[0.8125rem] ${
              i === active ? "bg-lilac text-ink" : "text-dim hover:text-paper"
            }`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(${right ? "12px" : left ? "calc(-100% - 12px)" : "-50%"}, ${
                Math.sin(rad) < -0.8 ? "calc(-100% - 10px)" : Math.sin(rad) > 0.8 ? "10px" : "-50%"
              })`,
            }}
          >
            {s.title}
          </button>
        );
      })}

      {/* centre: what this step means */}
      <div className="absolute inset-[24%] grid place-items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.35 }}
          >
            <p className="font-mono text-[0.6875rem] text-signal">
              {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </p>
            <p className="mt-2 font-brand text-[1.35rem] font-bold leading-tight tracking-[-0.02em]">{step.title}</p>
            <p className="mt-2 text-[0.8125rem] leading-snug text-dim">{step.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

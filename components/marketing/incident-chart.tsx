"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { budgetIncident } from "@/lib/marketing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Illustrative shape only: steady at about $0.50, a spike past $12, back to normal the same day.
const W = 640;
const H = 220;
const yOf = (cpc: number) => H - 24 - (cpc / 13) * (H - 48);
const pts: [number, number][] = [
  [0, 0.5], [70, 0.52], [140, 0.48], [210, 0.5], [250, 0.55], [285, 6.5], [320, 12.2], [355, 11.6],
  [390, 3.2], [420, 0.6], [470, 0.5], [540, 0.49], [600, 0.5], [640, 0.51],
];
const d = pts.map(([x, c], i) => `${i ? "L" : "M"}${x} ${yOf(c).toFixed(1)}`).join(" ");

export default function IncidentChart() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const path = root.current?.querySelector<SVGPathElement>(".inc-line");
      if (!path) return;
      const len = path.getTotalLength();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top 75%" } })
          .fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" })
          .fromTo(".inc-note", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.5 }, 0.9)
          .fromTo(".inc-area", { opacity: 0 }, { opacity: 1, duration: 1 }, 0.6);
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="panel grid gap-8 overflow-hidden bg-gradient-to-br from-raised to-signal/[0.05] p-7 md:grid-cols-12 md:items-center md:p-10">
      <div className="md:col-span-4">
        <p className="flex items-baseline gap-3 font-brand font-bold tracking-[-0.04em]">
          <span className="text-[clamp(1.9rem,3vw,2.6rem)] text-faint line-through decoration-2">$0.50</span>
          <span className="text-[clamp(2.6rem,4.4vw,3.75rem)] text-signal">$12+</span>
        </p>
        <h3 className="mt-4 font-brand text-[1.6rem] font-bold tracking-[-0.03em]">{budgetIncident.title}</h3>
        <p className="mt-3 leading-[1.65] text-dim">{budgetIncident.text}</p>
      </div>

      <figure className="md:col-span-8">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible" role="img" aria-label="Illustration: cost per click steady near $0.50, spiking above $12, restored the same day">
          <defs>
            <linearGradient id="incFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="rgb(255 181 71 / 0.35)" />
              <stop offset="1" stopColor="rgb(255 181 71 / 0)" />
            </linearGradient>
          </defs>
          {[0.5, 6, 12].map((v) => (
            <g key={v}>
              <line x1="0" x2={W} y1={yOf(v)} y2={yOf(v)} stroke="rgb(236 232 255 / 0.07)" strokeDasharray="3 5" />
              <text x={W} y={yOf(v) - 6} textAnchor="end" fill="rgb(132 126 152)" fontSize="11" fontFamily="Geist Mono Variable, monospace">
                ${v.toFixed(2)}
              </text>
            </g>
          ))}
          <path className="inc-area" d={`${d} L${W} ${H - 24} L0 ${H - 24} Z`} fill="url(#incFill)" />
          <path className="inc-line" d={d} fill="none" stroke="rgb(255 181 71)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          <g className="inc-note">
            <circle cx="320" cy={yOf(12.2)} r="5" fill="rgb(255 181 71)" />
            <text x="334" y={yOf(12.2) + 4} fill="rgb(242 239 250)" fontSize="13" fontWeight="600">
              Budget pushed up 25×
            </text>
          </g>
          <g className="inc-note">
            <circle cx="420" cy={yOf(0.6)} r="5" fill="rgb(218 209 249)" />
            <text x="432" y={yOf(0.6) - 12} fill="rgb(218 209 249)" fontSize="13" fontWeight="600">
              Split restored, same day
            </text>
          </g>
        </svg>
        <figcaption className="mt-3 text-[0.75rem] text-faint">Illustration of the incident, not exact data.</figcaption>
      </figure>
    </div>
  );
}

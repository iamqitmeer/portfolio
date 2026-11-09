"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ventures } from "@/lib/data";

gsap.registerPlugin(useGSAP);

const CX = 420;
const CY = 300;
const RX = 370;
const RY = 205;
const DOTS = 30;
// Every 7th dot is a "venture" node and drawn larger.
const isMajor = (i: number) => i % 7 === 0;

// Deterministic star field, so server and client render the same thing.
const stars = Array.from({ length: 70 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  // Rounded so server and client markup match exactly
  const q = (n: number) => Math.round(n * 10) / 10;
  return { x: q(r(1) * 840), y: q(r(2) * 600), o: q(0.15 + r(3) * 0.45), s: r(4) > 0.9 ? 1.4 : 0.8 };
});

export default function Orbit() {
  const root = useRef<HTMLDivElement>(null);
  const dots = useRef<(SVGCircleElement | null)[]>([]);
  const [idx, setIdx] = useState(0);

  // Dots travel around a tilted ellipse; front-facing dots are bigger and brighter.
  useGSAP(
    () => {
      const place = (t: number) => {
        dots.current.forEach((dot, i) => {
          if (!dot) return;
          const a = (i / DOTS + t) * Math.PI * 2;
          const depth = (Math.sin(a) + 1) / 2; // 0 back, 1 front
          const base = isMajor(i) ? 9 : 3.6;
          dot.setAttribute("cx", (CX + Math.cos(a) * RX).toFixed(2));
          dot.setAttribute("cy", (CY + Math.sin(a) * RY).toFixed(2));
          dot.setAttribute("r", (base * (0.55 + depth * 0.65)).toFixed(2));
          dot.style.opacity = (0.25 + depth * 0.75).toFixed(2);
        });
      };
      place(0);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const proxy = { t: 0 };
        gsap.to(proxy, {
          t: 1,
          duration: 90,
          ease: "none",
          repeat: -1,
          onUpdate: () => place(proxy.t),
        });
        gsap.from(".orbit-svg", { opacity: 0, scale: 0.92, duration: 2, ease: "expo.out", delay: 0.3 });
      });
    },
    { scope: root }
  );

  // Status card cycles through what I'm working on; the bar shows time left.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ onComplete: () => setIdx((i) => (i + 1) % ventures.length) })
          .fromTo(".card-body", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" })
          .fromTo(".card-bar", { scaleX: 0 }, { scaleX: 1, duration: 4, ease: "none" }, 0)
          .to(".card-body", { opacity: 0, y: -8, duration: 0.35, ease: "power2.in" });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".card-bar", { scaleX: 1 });
      });
    },
    { scope: root, dependencies: [idx], revertOnUpdate: true }
  );

  const v = ventures[idx];

  return (
    <div ref={root} className="pointer-events-none relative h-full w-full select-none" aria-hidden>
      <div className="dot-grid absolute inset-0" />
      <svg viewBox="0 0 840 600" className="orbit-svg absolute inset-0 h-full w-full overflow-visible">
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.s} fill="rgb(var(--paper))" opacity={s.o * 0.5} />
        ))}
        <g transform={`rotate(-14 ${CX} ${CY})`}>
          <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="rgb(var(--lilac) / 0.22)" strokeWidth="1" />
          {Array.from({ length: DOTS }, (_, i) => (
            <circle
              key={i}
              ref={(el) => {
                dots.current[i] = el;
              }}
              fill={isMajor(i) ? "rgb(var(--lilac))" : "rgb(var(--lilac-deep))"}
            />
          ))}
        </g>
      </svg>

      <div className="pointer-events-auto absolute bottom-[8%] right-[30%] w-[16.5rem] xl:right-[22%] rounded-2xl border border-line bg-raised/80 p-5 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] backdrop-blur-md">
        <div className="card-body">
          <div className="flex items-center justify-between text-[0.8125rem] text-dim">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_rgb(var(--signal))]" />
              {v.since ? `Since ${v.since}` : "Founder"}
            </span>
            <span className="font-mono tabular-nums text-faint">
              {String(idx + 1).padStart(2, "0")}/{String(ventures.length).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-3 font-brand text-[1.75rem] font-bold leading-none tracking-[-0.03em]">
            {v.name}
          </p>
          <p className="mt-2 text-[0.9375rem] font-semibold">{v.role}</p>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-dim">{v.short}</p>
        </div>
        <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-paper/10">
          <div className="card-bar h-full origin-left rounded-full bg-gradient-to-r from-lilac-deep to-signal" />
        </div>
      </div>
    </div>
  );
}

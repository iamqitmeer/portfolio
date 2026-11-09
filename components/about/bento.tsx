"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { chapters, profile } from "@/lib/data";
import Age from "../age";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const YEAR_MS = 365.2425 * 24 * 3600 * 1000;
const birth = () => new Date(profile.born.year, profile.born.month, profile.born.day).getTime();

/** Age in years with eight decimals, ticking live. */
function LiveAge() {
  const [v, setV] = useState<string | null>(null);
  useEffect(() => {
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () => {
      setV(((Date.now() - birth()) / YEAR_MS).toFixed(8));
      if (!reduce) raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <span className="tabular-nums">{v ?? "…"}</span>;
}

// Rough positions for an abstract lat/long plot (not a map outline)
const KHI = { lon: 67.0, lat: 24.86 };
const GDH = { lon: 73.62, lat: 22.78 };
const proj = (p: { lon: number; lat: number }) => ({ x: 50 + (p.lon - 65) * 28, y: 140 - (p.lat - 20) * 16 });

export default function AboutBento() {
  const root = useRef<HTMLElement>(null);
  const now = new Date().getFullYear();
  const years = Array.from({ length: now - profile.buildingSince + 1 }, (_, i) => profile.buildingSince + i);
  // How many journey chapters were running in each year (real data, gaps included)
  const perYear = years.map((y) =>
    chapters.filter((c) => {
      const [a, b] = (c.period.match(/\d{4}/g) ?? []).map(Number);
      const end = /now/i.test(c.period) ? now : b ?? a;
      return y >= a && y <= end;
    }).length
  );
  const maxPer = Math.max(...perYear, 1);
  const k = proj(KHI);
  const g = proj(GDH);
  const arc = `M${g.x} ${g.y} Q ${(g.x + k.x) / 2} ${Math.min(g.y, k.y) - 48} ${k.x} ${k.y}`;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".bento-tile",
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: root.current, start: "top 80%" },
          }
        );
        const path = root.current?.querySelector<SVGPathElement>(".roots-arc");
        if (path) {
          const len = path.getTotalLength();
          gsap
            .timeline({ scrollTrigger: { trigger: path, start: "top 85%" } })
            .fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" })
            .fromTo(".roots-dot", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.5, stagger: 1.2, ease: "back.out(3)" }, 0);
        }
        gsap.fromTo(
          ".year-bar",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.8, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: ".year-bars", start: "top 90%" } }
        );
      });
    },
    { scope: root }
  );

  const tile = "bento-tile panel relative overflow-hidden p-6 md:p-7";

  return (
    <section ref={root} aria-label="Quick facts" className="border-t border-line">
      <div className="mx-auto grid max-w-[80rem] gap-4 px-5 py-16 md:grid-cols-6 md:px-10 md:py-20">
        {/* Age */}
        <div className={`${tile} md:col-span-2`}>
          <p className="font-mono text-[0.75rem] text-faint">Age</p>
          <p className="mt-4 font-brand text-[4.5rem] font-bold leading-none tracking-[-0.05em]">
            <Age />
          </p>
          <p className="mt-3 font-mono text-[0.8125rem] text-lilac">
            <LiveAge /> years
          </p>
        </div>

        {/* Born */}
        <div className={`${tile} md:col-span-2`}>
          <p className="font-mono text-[0.75rem] text-faint">Born</p>
          <p className="mt-4 font-brand text-[2.4rem] font-bold leading-[1.02] tracking-[-0.04em]">
            19 October
            <br />
            2008
          </p>
          <p className="mt-3 text-dim">{profile.born.place}</p>
        </div>

        {/* Teaching at 13 */}
        <div className={`${tile} bg-gradient-to-br from-signal/[0.14] to-raised md:col-span-2`}>
          <p className="font-mono text-[0.75rem] text-signal">Achievement</p>
          <p className="mt-4 font-brand text-[2.4rem] font-bold leading-[1.02] tracking-[-0.04em]">
            Teaching
            <br />
            at 13
          </p>
          <p className="mt-3 text-dim">SIMSAT Computer Academy, Feb 2022 to Mar 2023</p>
        </div>

        {/* Roots */}
        <div className={`${tile} md:col-span-3`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[0.75rem] text-faint">Roots</p>
              <p className="mt-4 font-brand text-[2.4rem] font-bold leading-none tracking-[-0.04em]">Gujarati</p>
              <p className="mt-3 text-dim">Family from Godhra, Gujarat, India. Born and raised in Karachi.</p>
            </div>
          </div>
          <svg viewBox="0 0 340 170" className="mt-4 h-auto w-full" role="img" aria-label="Arc from Godhra in Gujarat, India, to Karachi, Pakistan">
            {Array.from({ length: 9 }, (_, i) => (
              <line key={`v${i}`} x1={40 + i * 34} x2={40 + i * 34} y1="10" y2="160" stroke="rgb(236 232 255 / 0.05)" />
            ))}
            {Array.from({ length: 6 }, (_, i) => (
              <line key={`h${i}`} x1="10" x2="330" y1={20 + i * 26} y2={20 + i * 26} stroke="rgb(236 232 255 / 0.05)" />
            ))}
            <path className="roots-arc" d={arc} fill="none" stroke="url(#rootsGrad)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 6" />
            <defs>
              <linearGradient id="rootsGrad" x1={g.x} x2={k.x} y1="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="rgb(255 181 71)" />
                <stop offset="1" stopColor="rgb(218 209 249)" />
              </linearGradient>
            </defs>
            <g className="roots-dot">
              <circle cx={g.x} cy={g.y} r="5" fill="rgb(255 181 71)" />
              <circle cx={g.x} cy={g.y} r="11" fill="none" stroke="rgb(255 181 71 / 0.35)" />
              <text x={g.x} y={g.y + 24} textAnchor="middle" fill="rgb(242 239 250)" fontSize="12" fontWeight="600">
                Godhra
              </text>
            </g>
            <g className="roots-dot">
              <circle cx={k.x} cy={k.y} r="5" fill="rgb(218 209 249)" />
              <circle cx={k.x} cy={k.y} r="11" fill="none" stroke="rgb(218 209 249 / 0.35)" />
              <text x={k.x} y={k.y + 24} textAnchor="middle" fill="rgb(242 239 250)" fontSize="12" fontWeight="600">
                Karachi
              </text>
            </g>
          </svg>
        </div>

        {/* Building since */}
        <div className={`${tile} md:col-span-3`}>
          <p className="font-mono text-[0.75rem] text-faint">Building since</p>
          <p className="mt-4 font-brand text-[2.4rem] font-bold leading-none tracking-[-0.04em]">{profile.buildingSince}</p>
          <p className="mt-3 text-dim">Started with freelancing. The bars show how many chapters of my journey were running each year.</p>
          <div className="year-bars mt-6 flex h-32 items-stretch gap-2" aria-hidden>
            {years.map((y, i) => (
              <div key={y} className="flex h-full flex-1 flex-col items-center gap-2">
                <span className="flex w-full flex-1 items-end">
                <span
                  className={`year-bar block w-full origin-bottom rounded-t-md ${
                    i === years.length - 1 ? "bg-gradient-to-t from-signal/60 to-signal" : "bg-gradient-to-t from-lilac-deep/40 to-lilac/80"
                  }`}
                  style={{ height: `${(perYear[i] / maxPer) * 100}%`, minHeight: perYear[i] ? 6 : 2 }}
                  title={`${y}: ${perYear[i]} running`}
                />
                </span>
                <span className="font-mono text-[0.6875rem] text-dim">{perYear[i]}</span>
                <span className="font-mono text-[0.6875rem] text-faint">{String(y).slice(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

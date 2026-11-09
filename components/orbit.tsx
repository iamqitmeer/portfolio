"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ventures } from "@/lib/data";

gsap.registerPlugin(useGSAP);

// three.js only loads in the browser, after the page is interactive
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

export default function Orbit() {
  const root = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  // The scene is only shown at lg and up; don't download three.js or open a WebGL context below that.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

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
      {wide ? <HeroScene /> : null}

      <div className="pointer-events-auto absolute bottom-[8%] right-[30%] w-[16.5rem] rounded-2xl border border-line bg-raised/70 p-5 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] backdrop-blur-md xl:right-[22%]">
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
          <p className="mt-3 font-brand text-[1.75rem] font-bold leading-none tracking-[-0.03em]">{v.name}</p>
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

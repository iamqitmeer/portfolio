"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/*
 * Privacy-safe tracking, shown as a pipeline: the website emits signals, a
 * consent-aware tag layer decides what may pass, ad platforms receive only
 * click IDs and neutral step codes. Health data never passes the gate.
 */

type Packet = { label: string; allowed: boolean; lane: number };
const packets: Packet[] = [
  { label: "click ID", allowed: true, lane: 0 },
  { label: "step: qualified", allowed: true, lane: 1 },
  { label: "health data", allowed: false, lane: 2 },
  { label: "step: booked", allowed: true, lane: 0 },
];

export default function DataFlow() {
  const root = useRef<HTMLDivElement>(null);
  const [consent, setConsent] = useState(true);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = root.current?.querySelector<HTMLElement>(".flow-track");
        if (!track) return;
        const w = () => track.getBoundingClientRect().width;

        gsap.utils.toArray<HTMLElement>(".packet").forEach((el, i) => {
          const p = packets[i];
          const passes = consent && p.allowed;
          const tl = gsap.timeline({ repeat: -1, delay: i * 1.1, repeatDelay: 1.4 });
          tl.set(el, { x: 0, opacity: 0, scale: 1 })
            .to(el, { opacity: 1, duration: 0.25 })
            .to(el, { x: () => w() * 0.46, duration: 1.4, ease: "power1.inOut" });
          if (passes) {
            tl.to(el, { x: () => w() * 0.92, duration: 1.3, ease: "power1.inOut" }).to(el, { opacity: 0, duration: 0.3 });
          } else {
            tl.to(el, { scale: 0.7, opacity: 0, duration: 0.45, ease: "power2.in" }, "+=0.15");
            tl.fromTo(
              el.parentElement!.querySelector(".blocked"),
              { opacity: 0, scale: 0.4 },
              { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)", yoyo: true, repeat: 1, repeatDelay: 0.5 },
              "<"
            );
          }
        });
      });
    },
    { scope: root, dependencies: [consent], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="panel relative overflow-hidden p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-brand text-[1.35rem] font-bold tracking-[-0.02em]">How the signal travels</p>
        <button
          type="button"
          role="switch"
          aria-checked={consent}
          onClick={() => setConsent((c) => !c)}
          className="flex items-center gap-3 rounded-full border border-line bg-ink/60 py-1.5 pl-4 pr-1.5 text-[0.875rem]"
        >
          Visitor consent
          <span className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${consent ? "bg-lilac" : "bg-paper/15"}`}>
            <span
              className={`absolute left-0 top-0.5 h-5 w-5 rounded-full bg-ink transition-transform duration-300 ease-out-expo ${
                consent ? "translate-x-[1.375rem]" : "translate-x-0.5"
              }`}
            />
          </span>
        </button>
      </div>

      <div className="relative mt-10">
        {/* stations */}
        <div className="grid grid-cols-3 text-center text-[0.8125rem] md:text-[0.9375rem]">
          {[
            ["Website", "Forms, bookings, CRM"],
            ["Tag layer", "GTM, Segment, consent"],
            ["Ad platforms", "Google Ads, Meta"],
          ].map(([t, s], i) => (
            <div key={t} className={i === 0 ? "text-left" : i === 2 ? "text-right" : ""}>
              <p className="font-semibold">{t}</p>
              <p className="mt-1 text-dim">{s}</p>
            </div>
          ))}
        </div>

        <div className="flow-track relative mt-6 h-[9.5rem]">
          {/* lanes */}
          {[0, 1, 2].map((l) => (
            <span key={l} aria-hidden className="absolute left-0 right-0 h-px bg-gradient-to-r from-paper/20 via-paper/10 to-paper/20" style={{ top: `${18 + l * 32}%` }} />
          ))}
          {/* gate */}
          <span
            aria-hidden
            className={`absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 rounded-full transition-colors duration-500 ${
              consent ? "bg-gradient-to-b from-lilac via-lilac/50 to-lilac" : "bg-signal shadow-[0_0_16px_rgb(var(--signal)/0.6)]"
            }`}
          />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap pt-2 font-mono text-[0.6875rem] text-faint">
            {consent ? "consent: granted" : "consent: not given, nothing passes"}
          </span>

          {packets.map((p, i) => (
            <div key={p.label + i} className="absolute left-0 w-full" style={{ top: `${18 + p.lane * 32}%` }}>
              <span
                className={`packet absolute top-0 -translate-y-1/2 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[0.6875rem] font-semibold opacity-0 ${
                  p.allowed ? "bg-lilac text-ink shadow-[0_0_16px_rgb(var(--lilac)/0.5)]" : "bg-signal text-ink shadow-[0_0_16px_rgb(var(--signal)/0.5)]"
                }`}
              >
                {p.label}
              </span>
              <span className="blocked absolute left-1/2 top-0 grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-signal font-bold text-ink opacity-0">
                ×
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-12 max-w-[60ch] text-[0.9375rem] leading-relaxed text-dim">
        Ad platforms only ever see click IDs and neutral step codes, so bidding can learn from real outcomes without
        receiving anything sensitive. Toggle consent to see the FINRA consent-only setup: until the visitor agrees,
        nothing fires.
      </p>
    </div>
  );
}

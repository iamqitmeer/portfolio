"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { chapters } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const chapterWords: Record<number, string> = { 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten", 11: "Eleven", 12: "Twelve" };
const firstYear = (period: string) => period.match(/\d{4}/)?.[0] ?? period;

export default function JourneyTrack() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const pinST = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scroll the chapters sideways
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;

        const scroll = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".journey-pin",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(".journey-progress", { scaleX: self.progress });
            },
          },
        });
        pinST.current = scroll.scrollTrigger ?? null;

        gsap.utils.toArray<HTMLElement>(".chapter").forEach((ch, i) => {
          gsap.fromTo(
            ch.querySelector(".chapter-period"),
            { xPercent: 8 },
            {
              xPercent: -6,
              ease: "none",
              scrollTrigger: { trigger: ch, containerAnimation: scroll, start: "left right", end: "right left", scrub: true },
            }
          );
          ScrollTrigger.create({
            trigger: ch,
            containerAnimation: scroll,
            start: "left 55%",
            end: "right 45%",
            toggleClass: { targets: ch, className: "is-active" },
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
        return () => {
          pinST.current = null;
        };
      });

      // Mobile: chapters rise in, the spine fills as you read
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".chapter").forEach((ch, i) => {
          gsap.fromTo(
            ch,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "expo.out",
              scrollTrigger: { trigger: ch, start: "top 85%", onEnter: () => setActive(i), onEnterBack: () => setActive(i) },
            }
          );
        });
        gsap.fromTo(
          ".spine-fill",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: track.current, start: "top 70%", end: "bottom 70%", scrub: true } }
        );
      });
    },
    { scope: root }
  );

  // Jump to a chapter: on desktop scroll the page to that point of the pinned track
  const goTo = (i: number) => {
    const st = pinST.current;
    const card = track.current?.querySelectorAll<HTMLElement>(".chapter")[i];
    if (st && card && track.current) {
      const distance = track.current.scrollWidth - window.innerWidth;
      const pad = parseFloat(getComputedStyle(track.current).paddingLeft);
      const target = Math.min(distance, Math.max(0, card.offsetLeft - pad - window.innerWidth * 0.05));
      window.scrollTo({ top: st.start + (target / distance) * (st.end - st.start), behavior: "smooth" });
    } else {
      card?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section ref={root} aria-label="Chapters" className="border-t border-line">
      <div className="journey-pin relative flex flex-col justify-center overflow-hidden md:h-screen">
        {/* giant year of the active chapter, behind everything */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden items-center justify-end overflow-hidden pr-[4vw] md:flex">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={firstYear(chapters[active].period)}
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -60, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-brand text-[28vw] font-bold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(236_232_255/0.07)]"
            >
              {firstYear(chapters[active].period)}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="relative mx-auto w-full max-w-[80rem] px-5 pt-20 md:px-10 md:pt-24">
          <div className="flex items-end justify-between gap-6">
            <h2 className="h-section">{chapterWords[chapters.length] ?? chapters.length} chapters</h2>
            <p className="hidden font-mono text-[0.8125rem] text-faint md:block">scroll to move through time</p>
          </div>
        </div>

        <ol
          ref={track}
          className="relative mt-10 flex flex-col gap-5 pb-20 pl-12 pr-5 md:mt-12 md:w-max md:flex-row md:gap-6 md:pb-0 md:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] md:pr-10"
        >
          {/* mobile spine */}
          <span aria-hidden className="absolute bottom-24 left-5 top-4 w-px bg-paper/10 md:hidden" />
          <span aria-hidden className="spine-fill absolute bottom-24 left-5 top-4 w-px origin-top bg-gradient-to-b from-lilac-deep via-lilac to-signal md:hidden" />

          {chapters.map((c, i) => (
            <li
              key={c.place}
              className="chapter panel group relative flex flex-col overflow-visible p-7 transition-[border-color,background-color,transform,opacity] duration-700 ease-out-expo md:h-[min(34rem,62vh)] md:w-[30rem] md:overflow-hidden md:p-9 md:[&:not(.is-active)]:scale-[0.94] md:[&:not(.is-active)]:opacity-50 [&.is-active]:border-lilac/30 [&.is-active]:bg-gradient-to-b [&.is-active]:from-raised [&.is-active]:to-lilac-deep/[0.1]"
            >
              {/* mobile spine dot */}
              <span
                aria-hidden
                className={`absolute -left-[2.1rem] top-9 h-3 w-3 rounded-full border-2 md:hidden ${
                  c.current ? "border-signal bg-signal" : i <= active ? "border-lilac bg-lilac" : "border-faint bg-ink"
                }`}
              />
              <div className="flex items-center justify-between text-[0.8125rem]">
                <span className="font-mono text-faint">Chapter {String(i + 1).padStart(2, "0")}</span>
                {c.current ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-1 font-semibold text-signal">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
                    Now
                  </span>
                ) : null}
              </div>

              <p className="chapter-period mt-6 whitespace-nowrap font-brand text-[clamp(2.6rem,4vw,3.75rem)] font-bold leading-none tracking-[-0.045em] text-lilac">
                {c.period}
              </p>

              <div className="mt-auto pt-10">
                <p className="text-[0.9375rem] text-dim">{c.place}</p>
                <h3 className="mt-2 font-brand text-[1.65rem] font-bold leading-[1.1] tracking-[-0.03em] [text-wrap:balance]">{c.title}</h3>
                <p className="mt-4 text-[0.9875rem] leading-[1.65] text-dim">{c.story}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <li key={t} className="rounded-full border border-line px-3 py-1 text-[0.8125rem]">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          <li aria-hidden className="hidden w-[20vw] shrink-0 md:block" />
        </ol>

        {/* progress + chapter navigation */}
        <nav aria-label="Chapters" className="relative mx-auto mt-10 hidden w-full max-w-[80rem] px-10 md:block">
          <div className="relative h-px bg-paper/10">
            <div className="journey-progress absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-lilac-deep via-lilac to-signal" />
          </div>
          <ol className="mt-4 flex justify-between">
            {chapters.map((c, i) => (
              <li key={c.place}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === active ? "step" : undefined}
                  className={`group flex flex-col items-start gap-1 rounded-md px-1 text-left transition-colors duration-300 ${
                    i === active ? "text-paper" : "text-faint hover:text-dim"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "scale-150 bg-signal shadow-[0_0_10px_rgb(var(--signal))]" : i < active ? "bg-lilac" : "bg-paper/20"
                    }`}
                  />
                  <span className="font-mono text-[0.6875rem]">{firstYear(c.period)}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

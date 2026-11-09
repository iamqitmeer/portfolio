"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { chapters } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function JourneyTrack() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);

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
          },
        });

        gsap.fromTo(
          ".journey-progress",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".journey-pin",
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );

        // Inside each chapter, the big period drifts against the scroll
        gsap.utils.toArray<HTMLElement>(".chapter").forEach((ch) => {
          gsap.fromTo(
            ch.querySelector(".chapter-period"),
            { xPercent: 8 },
            {
              xPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: ch,
                containerAnimation: scroll,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
          ScrollTrigger.create({
            trigger: ch,
            containerAnimation: scroll,
            start: "left 60%",
            end: "right 40%",
            toggleClass: { targets: ch, className: "is-active" },
          });
        });
      });

      // Mobile: chapters rise in as you reach them
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".chapter").forEach((ch) => {
          gsap.fromTo(
            ch,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: ch, start: "top 85%" } }
          );
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-label="Chapters" className="border-t border-line">
      <div className="journey-pin relative flex flex-col justify-center overflow-hidden md:h-screen">
        <div className="mx-auto w-full max-w-[80rem] px-5 pt-20 md:px-10 md:pt-24">
          <div className="flex items-end justify-between gap-6">
            <h2 className="h-section">Eight chapters</h2>
            <p className="hidden font-mono text-[0.8125rem] text-faint md:block">scroll to move through time</p>
          </div>
        </div>

        <ol
          ref={track}
          className="mt-10 flex flex-col gap-5 px-5 pb-20 md:mt-12 md:w-max md:flex-row md:gap-6 md:px-10 md:pb-0 md:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
        >
          {chapters.map((c, i) => (
            <li
              key={c.place}
              className="chapter panel group relative flex flex-col overflow-hidden p-7 transition-[border-color,background-color] duration-500 md:h-[min(34rem,62vh)] md:w-[30rem] md:p-9 [&.is-active]:border-lilac/30 [&.is-active]:bg-gradient-to-b [&.is-active]:from-raised [&.is-active]:to-lilac-deep/[0.08]"
            >
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
                <h3 className="mt-2 font-brand text-[1.65rem] font-bold leading-[1.1] tracking-[-0.03em] [text-wrap:balance]">
                  {c.title}
                </h3>
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
          {/* trailing space so the last card can reach the centre */}
          <li aria-hidden className="hidden w-[20vw] shrink-0 md:block" />
        </ol>

        <div aria-hidden className="mx-auto mt-10 hidden w-full max-w-[80rem] px-10 md:block">
          <div className="relative h-px bg-paper/10">
            <div className="journey-progress absolute inset-0 origin-left bg-gradient-to-r from-lilac-deep via-lilac to-signal" />
          </div>
          <div className="mt-3 flex justify-between font-mono text-[0.75rem] text-faint">
            <span>2023, first component</span>
            <span className="text-signal">Now, building my own</span>
          </div>
        </div>
      </div>
    </section>
  );
}

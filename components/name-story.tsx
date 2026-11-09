"use client";

import "@fontsource/amiri/arabic-700.css";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { nameStory, profile } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function NameStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The Arabic name fills in right to left, the way it is read
        gsap.fromTo(
          ".name-ar",
          { backgroundSize: "0% 100%" },
          {
            backgroundSize: "100% 100%",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 70%", end: "center 45%", scrub: 0.6 },
          }
        );
        gsap.fromTo(
          ".story-p",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: { trigger: ".story-body", start: "top 75%" },
          }
        );
        gsap.fromTo(
          ".story-ref",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: ".story-refs", start: "top 85%" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="name" aria-labelledby="name-title" className="relative scroll-mt-24 overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-lilac-deep/10 blur-[120px]" />
      <div className="relative mx-auto grid max-w-[80rem] gap-14 px-5 py-24 md:grid-cols-12 md:gap-10 md:px-10 md:py-36">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <p
              lang="ar"
              dir="rtl"
              className="name-ar text-right font-['Amiri'] text-[clamp(6.5rem,15vw,11.5rem)] font-bold leading-[1.15] md:text-left"
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px rgb(var(--lilac) / 0.85)",
                backgroundImage: "linear-gradient(90deg, rgb(var(--lilac)), rgb(var(--lilac)))",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right top",
                backgroundSize: "100% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {nameStory.arabic}
            </p>
            <div className="mt-6 flex items-baseline gap-4 border-t border-line pt-5">
              <span className="font-brand text-[2rem] font-bold tracking-[-0.03em]">
                {profile.name.split(" ")[0]}
              </span>
              <span className="text-dim">from the Arabic qitmir</span>
            </div>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-faint">
              Named by {nameStory.givenBy}, {nameStory.givenByRole}.
            </p>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <h2 id="name-title" className="h-section">
            The story of <span className="text-lilac">my name</span>
          </h2>
          <div className="story-body mt-10 space-y-6 text-[1.1875rem] leading-[1.7] text-dim">
            {nameStory.paragraphs.map((p, i) => (
              <p key={i} className={`story-p ${i === 0 ? "text-paper" : ""}`}>
                {p}
              </p>
            ))}
          </div>

          <ul className="story-refs mt-12 space-y-4">
            {nameStory.references.map((r) => {
              // Split the verse around the highlighted word, if any
              const parts = r.highlight ? r.arabic.split(r.highlight) : [r.arabic];
              return (
                <li key={r.ref} className="story-ref panel overflow-hidden">
                  <figure>
                    <blockquote
                      lang="ar"
                      dir="rtl"
                      className="border-b border-line bg-gradient-to-l from-lilac-deep/[0.08] to-transparent px-6 py-7 text-right font-['Amiri'] text-[clamp(1.6rem,2.6vw,2.1rem)] font-bold leading-[1.9] md:px-8"
                    >
                      {parts[0]}
                      {r.highlight ? (
                        <>
                          <span className="text-lilac [text-shadow:0_0_24px_rgb(var(--lilac)/0.45)]">{r.highlight}</span>
                          {parts[1]}
                        </>
                      ) : null}
                    </blockquote>
                    <figcaption className="px-6 py-5 md:px-8">
                      <p className="leading-relaxed text-paper/90">{r.translation}</p>
                      <p className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[0.9375rem]">
                        <span>
                          <cite className="font-brand text-[1.1rem] font-bold not-italic tracking-[-0.01em]">{r.label}</cite>
                          <span className="text-faint">, {r.note.toLowerCase()}</span>
                        </span>
                        <span className="font-mono text-[0.8125rem] text-signal">{r.ref}</span>
                      </p>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-[0.8125rem] text-faint">Excerpts of the verses. Translation: Sahih International.</p>
        </div>
      </div>
    </section>
  );
}

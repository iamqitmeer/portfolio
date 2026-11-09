"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight } from "react-icons/fi";
import { milestones, profile } from "@/lib/data";
import Orbit from "./orbit";
import Age from "./age";
import { Magnetic } from "./fx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// His own summary. "an early idea" starts as an outline (a wireframe) and
// fills in as you scroll; the last line is set in lilac.
const lines: { text: string; idea?: boolean; tone?: "lilac" }[][] = [
  [{ text: "I take products from" }],
  [{ text: "an early idea", idea: true }, { text: "to" }],
  [{ text: "something people can actually use.", tone: "lilac" }],
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(
          ".word-inner",
          // y: 0 clears the pre-paint CSS translate that GSAP would read as px
          { y: 0, yPercent: 110 },
          { y: 0, yPercent: 0, duration: 1.3, stagger: 0.05 }
        )
          .fromTo(
            ".hero-fade",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.08 },
            0.35
          )
          .fromTo(".rail-fill", { scaleX: 0 }, { scaleX: 1, duration: 2.4, ease: "power2.inOut" }, 0.6)
          .fromTo(
            ".rail-node",
            { scale: 0.4, opacity: 0.3 },
            { scale: 1, opacity: 1, duration: 0.6, stagger: 0.48, ease: "back.out(3)" },
            0.6
          );

        // A solid fill sweeps through the outlined words, one after another
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=320",
              scrub: 0.6,
            },
          })
          .fromTo(
            ".idea",
            { backgroundSize: "0% 100%" },
            { backgroundSize: "100% 100%", ease: "none", stagger: 1, duration: 1 }
          );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="top" className="hero relative overflow-hidden pt-28 md:pt-32">
      <div className="absolute right-[-16rem] top-20 hidden h-[44rem] w-[58rem] lg:block xl:right-[-9rem]">
        <Orbit />
      </div>

      <div className="relative mx-auto max-w-[80rem] px-5 md:px-10">
        <a
          href={profile.augere}
          target="_blank"
          rel="noreferrer"
          className="hero-fade group inline-flex items-center gap-3 rounded-full border border-line bg-raised/60 p-1 pr-4 text-[0.875rem] backdrop-blur transition-colors hover:border-paper/20"
        >
          <span className="flex items-center gap-2 rounded-full bg-paper/[0.06] px-3 py-1 font-semibold text-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            Founder, Augere Labs
          </span>
          <span className="hidden text-dim transition-colors group-hover:text-paper sm:inline">
            Building Rembly and Hearlist
          </span>
          <FiArrowUpRight className="text-dim transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>

        <h1 className="display mt-8 max-w-[15ch] text-[clamp(2.75rem,6.4vw,5.6rem)]">
          {lines.map((line, li) => (
            <span key={li} className={line[0].tone === "lilac" ? "block text-lilac" : "block"}>
              {line.map((seg, si) =>
                seg.text.split(" ").map((word, wi) => (
                  <span key={`${si}-${wi}`}>
                    <span className="word">
                      <span className={seg.idea ? "word-inner idea" : "word-inner"}>{word}</span>
                    </span>{" "}
                  </span>
                ))
              )}
            </span>
          ))}
        </h1>

        <p className="hero-fade mt-8 max-w-[34rem] text-[1.1875rem] leading-[1.6] text-dim">
          I&apos;m {profile.name}, <Age />, a software engineer and founder from Korangi, Karachi. I founded
          Augere Labs, I&apos;m building Rembly and Hearlist, and I&apos;m a Lead at
          AngleBrackets, across engineering and performance marketing.
        </p>

        <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a href={`mailto:${profile.email}`} className="btn-primary">
              Email me
            </a>
          </Magnetic>
          <a href={profile.resume} download className="btn-ghost">
            Download résumé
          </a>
        </div>

        <div className="hero-fade mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9375rem]">
          <span className="flex items-center gap-3 text-dim">
            <Image
              src="/qitmeer.jpg"
              alt=""
              width={64}
              height={64}
              priority
              className="h-8 w-8 rounded-full object-cover ring-2 ring-ink"
            />
            Products I&apos;ve shipped include
          </span>
          {["Attryb", "AutoPitch.ai", "Cura AI"].map((p) => (
            <a key={p} href="#work" className="font-brand text-[1.0625rem] font-bold tracking-[-0.02em] text-paper/80 transition-colors hover:text-paper">
              {p}
            </a>
          ))}
        </div>

        {/* Career rail */}
        <ol className="relative mt-20 grid grid-cols-2 gap-y-10 pb-16 sm:grid-cols-3 md:mt-24 md:grid-cols-6 md:pb-24">
          <span aria-hidden className="absolute left-2 right-0 top-[7px] hidden h-px bg-paper/15 md:block" />
          <span aria-hidden className="rail-fill absolute left-2 right-0 top-[7px] hidden h-px origin-left bg-gradient-to-r from-lilac-deep via-lilac to-signal md:block" />
          {milestones.map((m, i) => {
            const last = i === milestones.length - 1;
            return (
              <li key={m.title} className="relative pr-4">
                <span
                  aria-hidden
                  className={`rail-node relative z-10 block h-[15px] w-[15px] rounded-full border-2 ${
                    last
                      ? "border-signal bg-signal shadow-[0_0_16px_rgb(var(--signal)/0.7)]"
                      : "border-lilac bg-ink"
                  }`}
                />
                <p className="mt-5 font-brand text-[clamp(1.6rem,2.6vw,2.1rem)] font-bold leading-none tracking-[-0.03em]">
                  {m.year}
                </p>
                <p className="mt-2 font-semibold">{m.title}</p>
                <p className="mt-1 text-[0.875rem] leading-snug text-dim">{m.note}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

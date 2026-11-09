"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight } from "react-icons/fi";
import { projectsData, sideProject } from "@/lib/data";
import SectionHead from "./section-head";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Work() {
  const root = useRef<HTMLElement>(null);

  // Screenshots drift inside their frames and the frames unclip as they arrive.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".case-frame").forEach((frame) => {
          gsap.fromTo(
            frame,
            { clipPath: "inset(12% 6% 12% 6% round 20px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 20px)",
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top 95%", end: "top 45%", scrub: 0.6 },
            }
          );
          gsap.fromTo(
            frame.querySelector(".case-img"),
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
        <SectionHead
          id="work-title"
          title={
            <>
              Products I&apos;ve put
              <br className="hidden sm:block" /> into the world
            </>
          }
          aside="A few products I designed and built end to end, from the first scope to launch."
        />

        <div className="mt-16 space-y-24 md:mt-24 md:space-y-36">
          {projectsData.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={p.title} className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${p.title}`}
                  className={`case-frame group relative block aspect-[16/10] overflow-hidden rounded-[20px] border border-line bg-raised md:col-span-7 ${
                    flip ? "md:order-2" : ""
                  }`}
                >
                  <Image
                    src={p.image}
                    alt={`${p.title} landing page`}
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="case-img absolute inset-x-0 top-[-6%] h-[112%] w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-3.5 py-1.5 text-[0.875rem] font-medium backdrop-blur">
                    Case study: {p.title}
                  </span>
                </a>

                <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
                  <p className="text-[0.9375rem] text-dim">{p.label}</p>
                  <h3 className="mt-3 font-brand text-[clamp(1.75rem,2.8vw,2.35rem)] font-bold leading-[1.05] tracking-[-0.03em] [text-wrap:balance]">
                    {p.headline}
                  </h3>
                  <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-[1.65] text-dim">
                    {p.description}
                  </p>
                  <div className="mt-7 border-t border-line pt-5 text-[0.875rem] text-faint">
                    Built with {p.stack}
                  </div>
                  <a href={p.url} target="_blank" rel="noreferrer" className="link mt-5 font-medium text-paper">
                    {p.urlLabel}
                    <FiArrowUpRight aria-hidden />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="panel mt-24 flex flex-col gap-3 p-7 md:mt-32 md:flex-row md:items-center md:justify-between md:p-9">
          <div>
            <p className="text-[0.875rem] text-dim">Also built, open source</p>
            <h3 className="mt-2 font-brand text-[1.75rem] font-bold tracking-[-0.03em]">
              {sideProject.title}
            </h3>
          </div>
          <p className="max-w-[52ch] leading-[1.6] text-dim">{sideProject.description}</p>
        </div>
      </div>
    </section>
  );
}

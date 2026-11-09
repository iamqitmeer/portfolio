"use client";

import { FiArrowUpRight } from "react-icons/fi";
import { ventures } from "@/lib/data";
import SectionHead from "./section-head";

/** Cards track the pointer so a soft light follows it (see .glow in globals.css). */
function track(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Now() {
  return (
    <section id="now" aria-labelledby="now-title" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
        <SectionHead
          id="now-title"
          title="What I'm building now"
          aside="One studio, two products and a client-facing engineering role. Each one feeds the others."
        />

        <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3">
          {ventures.map((v, i) => {
            const Tag = v.href ? "a" : "div";
            return (
              <li key={v.name} className={i === 0 ? "md:col-span-3" : ""}>
                <Tag
                  {...(v.href ? { href: v.href, target: "_blank", rel: "noreferrer" } : {})}
                  onPointerMove={track}
                  className={`panel glow group flex h-full flex-col justify-between gap-10 p-7 transition-colors duration-300 hover:border-paper/20 md:p-9 ${
                    i === 0 ? "bg-gradient-to-br from-raised via-raised to-lilac-deep/[0.12] md:min-h-[20rem]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between text-[0.875rem] text-dim">
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-signal" : "bg-lilac"}`}
                      />
                      {v.role}
                    </span>
                    <span className="font-mono text-[0.8125rem] text-faint">
                      {v.since ? `since ${v.since}` : "augerelabs.com"}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`flex items-start justify-between gap-4 font-brand font-bold leading-none tracking-[-0.035em] ${
                        i === 0 ? "text-[clamp(2.6rem,5vw,4.25rem)]" : "text-[clamp(2rem,3vw,2.6rem)]"
                      }`}
                    >
                      {v.name}
                      {v.href ? (
                        <FiArrowUpRight
                          aria-hidden
                          className="mt-1 h-6 w-6 shrink-0 text-dim transition-transform duration-300 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal"
                        />
                      ) : null}
                    </h3>
                    <p className="mt-4 max-w-[40ch] leading-[1.6] text-dim">{v.text}</p>
                  </div>
                </Tag>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

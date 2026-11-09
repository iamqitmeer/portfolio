"use client";

import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { experienceData, profile } from "@/lib/data";
import { duration, formatMonth, parseRange } from "@/lib/dates";
import SectionHead from "./section-head";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FIRST_YEAR = 2023;

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const { rows, start, end, now, years } = useMemo(() => {
    const today = new Date();
    const nowIdx = today.getFullYear() * 12 + today.getMonth();
    const rows = experienceData.map((c) => {
      const spans = c.roles.map((r) => parseRange(r.dates, today));
      const s = Math.min(...spans.map((x) => x[0]));
      const e = Math.max(...spans.map((x) => x[1]));
      return { ...c, s, e, live: c.roles.some((r) => /present/i.test(r.dates)) };
    });
    const start = FIRST_YEAR * 12;
    const end = (today.getFullYear() + 1) * 12; // through the end of this year
    const years = Array.from({ length: today.getFullYear() - FIRST_YEAR + 1 }, (_, i) => FIRST_YEAR + i);
    return { rows, start, end, now: nowIdx, years };
  }, []);

  const pct = (m: number) => ((m - start) / (end - start)) * 100;
  const chartRows = [...rows].sort((a, b) => a.s - b.s);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ".gantt", start: "top 75%" } })
          .fromTo(".gantt-bar", { scaleX: 0 }, { scaleX: 1, duration: 1.1, stagger: 0.08, ease: "expo.out" });

        gsap.utils.toArray<HTMLElement>(".xp-row").forEach((row) => {
          gsap.fromTo(
            row.querySelector(".xp-line"),
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { trigger: row, start: "top 85%", end: "top 55%", scrub: true },
            }
          );
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="experience" aria-labelledby="xp-title" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
        <SectionHead
          id="xp-title"
          title="Where I've worked"
          aside={
            <>
              Since 2023, often more than one thing at once. The full story is on the{" "}
              <Link href="/journey" className="text-paper underline decoration-lilac/50 underline-offset-4 hover:decoration-lilac">
                journey page
              </Link>
              .
            </>
          }
        />

        {/* Timeline chart */}
        <figure className="gantt panel mt-14 p-5 md:mt-20 md:p-8" aria-label="Timeline of roles from 2023 to today">
          <div className="grid grid-cols-[6.5rem_1fr] gap-x-4 md:grid-cols-[11rem_1fr] md:gap-x-6">
            <div />
            <div className="relative h-6">
              {years.map((y) => (
                <span
                  key={y}
                  className="absolute top-0 font-mono text-[0.75rem] text-faint"
                  style={{ left: `${pct(y * 12)}%` }}
                >
                  {y}
                </span>
              ))}
            </div>

            {chartRows.map((r) => {
              const on = hovered === r.company;
              return (
                <div key={r.company} className="contents">
                  <div
                    className={`truncate py-2 text-[0.8125rem] transition-colors duration-300 md:text-[0.9375rem] ${
                      on ? "text-paper" : "text-dim"
                    }`}
                  >
                    {r.company}
                  </div>
                  <div className="relative py-2">
                    {/* year gridlines */}
                    {years.map((y) => (
                      <span key={y} aria-hidden className="absolute inset-y-0 w-px bg-paper/[0.06]" style={{ left: `${pct(y * 12)}%` }} />
                    ))}
                    <div
                      className="gantt-bar relative h-full min-h-[0.875rem] origin-left"
                      style={{ marginLeft: `${pct(r.s)}%`, width: `${pct(r.e + 1) - pct(r.s)}%` }}
                      title={`${formatMonth(r.s)} – ${r.live ? "Present" : formatMonth(r.e)}`}
                    >
                      <span
                        className={`absolute inset-0 rounded-full transition-[background-color,box-shadow,opacity] duration-300 ${
                          r.live
                            ? "bg-gradient-to-r from-lilac-deep to-lilac"
                            : on
                            ? "bg-lilac/70"
                            : "bg-lilac/25"
                        } ${on ? "shadow-[0_0_18px_rgb(var(--lilac)/0.45)]" : ""}`}
                      />
                      {r.live ? (
                        <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_10px_rgb(var(--signal))]" />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Today marker */}
          <div aria-hidden className="pointer-events-none relative -mt-2 grid grid-cols-[6.5rem_1fr] gap-x-4 md:grid-cols-[11rem_1fr] md:gap-x-6">
            <div />
            <div className="relative h-6">
              <span className="absolute top-1 -translate-x-1/2 font-mono text-[0.75rem] text-signal" style={{ left: `${pct(now)}%` }}>
                now
              </span>
            </div>
          </div>
          <figcaption className="sr-only">
            {chartRows.map((r) => `${r.company}: ${formatMonth(r.s)} to ${r.live ? "present" : formatMonth(r.e)}`).join("; ")}
          </figcaption>
        </figure>

        {/* Detail rows */}
        <ol className="mt-16 md:mt-24">
          {rows.map((item) => (
            <li
              key={item.company}
              onPointerEnter={() => setHovered(item.company)}
              onPointerLeave={() => setHovered(null)}
              className="xp-row group relative grid gap-x-10 gap-y-5 py-10 md:grid-cols-12 md:py-12"
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
              <span aria-hidden className="xp-line absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-lilac via-lilac-deep/60 to-transparent" />

              <div className="md:col-span-4">
                <p className="font-mono text-[0.8125rem] tabular-nums text-faint">
                  {formatMonth(item.s)} – {item.live ? "Present" : formatMonth(item.e)}
                </p>
                <p className="mt-1 text-[0.875rem] text-dim">
                  {duration(item.s, item.e)}, {item.place}
                </p>
              </div>

              <div className="md:col-span-8">
                <h3 className="flex flex-wrap items-center gap-3 font-brand text-[clamp(1.75rem,3vw,2.4rem)] font-bold leading-none tracking-[-0.035em] transition-colors duration-300 group-hover:text-lilac">
                  {item.company}
                  {item.live ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-1 font-sans text-[0.75rem] font-semibold tracking-normal text-signal">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
                      Now
                    </span>
                  ) : null}
                </h3>

                <div className="mt-6 space-y-5">
                  {item.roles.map((role, i) => (
                    <div key={role.title + role.dates} className={i > 0 ? "border-t border-line pt-5" : ""}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <p className="text-[1.0625rem] font-semibold">{role.title}</p>
                        <p className="font-mono text-[0.8125rem] tabular-nums text-faint">{role.dates}</p>
                      </div>
                      {role.text ? <p className="mt-2 max-w-[62ch] leading-[1.65] text-dim">{role.text}</p> : null}
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-10">
          <Link href="/journey" className="btn-primary">
            Read the full journey
          </Link>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
            LinkedIn profile
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { experienceData, kindMeta, profile, type Kind } from "@/lib/data";
import { duration, formatMonth, parseRange } from "@/lib/dates";
import SectionHead from "./section-head";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Bar colours per kind of work
const kindStyle: Record<Kind, { bar: string; dot: string; glow: string }> = {
  teaching: { bar: "from-signal/80 to-signal", dot: "bg-signal", glow: "rgb(var(--signal) / 0.55)" },
  internship: { bar: "from-paper/40 to-paper/70", dot: "bg-paper/70", glow: "rgb(var(--paper) / 0.35)" },
  engineering: { bar: "from-lilac-deep to-lilac", dot: "bg-lilac", glow: "rgb(var(--lilac) / 0.5)" },
  founding: { bar: "from-lilac to-signal", dot: "bg-gradient-to-r from-lilac to-signal", glow: "rgb(var(--lilac) / 0.5)" },
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(experienceData[0].company);

  // Tooltip follows the pointer on a spring
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const sx = useSpring(tx, { stiffness: 500, damping: 40 });
  const sy = useSpring(ty, { stiffness: 500, damping: 40 });

  const { rows, start, end, now, years, liveCount } = useMemo(() => {
    const today = new Date();
    const rows = experienceData.map((c) => {
      const spans = c.roles.map((r) => parseRange(r.dates, today));
      const s = Math.min(...spans.map((x) => x[0]));
      const e = Math.max(...spans.map((x) => x[1]));
      return { ...c, s, e, live: c.roles.some((r) => /present/i.test(r.dates)) };
    });
    const firstYear = Math.floor(Math.min(...rows.map((r) => r.s)) / 12);
    const years = Array.from({ length: today.getFullYear() - firstYear + 1 }, (_, i) => firstYear + i);
    return {
      rows,
      start: firstYear * 12,
      end: (today.getFullYear() + 1) * 12,
      now: today.getFullYear() * 12 + today.getMonth(),
      years,
      liveCount: rows.filter((r) => r.live).length,
    };
  }, []);

  const pct = (m: number) => ((m - start) / (end - start)) * 100;
  const chartRows = useMemo(() => [...rows].sort((a, b) => a.s - b.s), [rows]);
  const hoveredRow = rows.find((r) => r.company === hovered);

  // Playhead sweeps from the first month to today; each bar fills as it passes.
  useGSAP(
    () => {
      const chart = root.current?.querySelector<HTMLElement>(".gantt");
      if (!chart) return;
      const bars = gsap.utils.toArray<HTMLElement>(".gantt-bar", chart);
      const label = chart.querySelector<HTMLElement>(".ph-label");
      const head = chart.querySelector<HTMLElement>(".ph");
      const state = { m: start };

      const apply = () => {
        const m = state.m;
        if (head) head.style.left = `${pct(m)}%`;
        if (label) {
          label.textContent = formatMonth(Math.min(Math.floor(m), now));
          // near the right edge, hang the label to the left of the line
          const edge = pct(m) > 85;
          label.style.left = edge ? "auto" : "50%";
          label.style.right = edge ? "-1px" : "auto";
          label.style.transform = edge ? "none" : "translateX(-50%)";
        }
        bars.forEach((b) => {
          const s = Number(b.dataset.s);
          const e = Number(b.dataset.e) + 1;
          const lit = gsap.utils.clamp(0, 1, (m - s) / (e - s));
          b.style.setProperty("--lit", lit.toFixed(3));
          b.closest(".gantt-row")?.classList.toggle("is-lit", lit > 0);
        });
      };

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        state.m = start;
        apply();
        gsap.to(state, {
          m: now + 0.999,
          ease: "none",
          onUpdate: apply,
          scrollTrigger: {
            trigger: chart,
            start: "top 110px",
            end: "+=900",
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
          },
        });
      });
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        state.m = start;
        apply();
        gsap.to(state, {
          m: now + 0.999,
          duration: 2.6,
          ease: "power2.inOut",
          onUpdate: apply,
          scrollTrigger: { trigger: chart, start: "top 70%" },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        state.m = now + 0.999;
        apply();
      });
    },
    { scope: root }
  );

  const openRow = (company: string) => {
    setOpen(company);
    requestAnimationFrame(() =>
      document.getElementById(`xp-${slug(company)}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
    );
  };

  return (
    <section ref={root} id="experience" aria-labelledby="xp-title" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
        <SectionHead
          id="xp-title"
          title="Where I've worked"
          aside={
            <>
              Teaching since 2022, building with teams since 2023, often more than one thing at once. The full story is
              on the{" "}
              <Link href="/journey" className="text-paper underline decoration-lilac/50 underline-offset-4 hover:decoration-lilac">
                journey page
              </Link>
              .
            </>
          }
        />

        {/* ---------- Timeline chart ---------- */}
        <figure className="gantt panel relative mt-14 overflow-hidden md:mt-20" aria-label={`Timeline of roles from ${years[0]} to today`}>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,rgb(var(--lilac-deep)/0.12),transparent)]"
          />

          {/* header: quick facts + legend */}
          <div className="relative flex flex-wrap items-end justify-between gap-6 border-b border-line px-5 py-6 md:px-8">
            <dl className="flex gap-8">
              {(
                [
                  [rows.length, "places"],
                  [liveCount, "running now"],
                  [years[0], "first role"],
                ] as const
              ).map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd>
                    <span className="block font-brand text-[1.9rem] font-bold leading-none tracking-[-0.04em]">{v}</span>
                    <span aria-hidden className="mt-1 block text-[0.8125rem] text-dim">
                      {l}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem] text-dim" aria-label="Legend">
              {(Object.keys(kindMeta) as Kind[]).map((k) => (
                <li key={k} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${kindStyle[k].dot}`} />
                  {kindMeta[k].label}
                </li>
              ))}
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-signal shadow-[0_0_8px_rgb(var(--signal))]" />
                Live
              </li>
            </ul>
          </div>

          <div
            className="relative px-5 pb-8 pt-4 md:px-8"
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              tx.set(Math.min(e.clientX - r.left + 18, r.width - 290));
              ty.set(e.clientY - r.top + 18);
            }}
          >
            <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 md:grid-cols-[12rem_1fr] md:gap-x-6">
              {/* year axis */}
              <div />
              <div className="relative h-8" aria-hidden>
                {years.map((y) => (
                  <span key={y} className="absolute top-1 font-mono text-[0.75rem] text-faint" style={{ left: `${pct(y * 12)}%` }}>
                    {y}
                  </span>
                ))}
              </div>

              {chartRows.map((r) => {
                const on = hovered === r.company;
                return (
                  <button
                    key={r.company}
                    type="button"
                    onClick={() => openRow(r.company)}
                    onPointerEnter={() => setHovered(r.company)}
                    onPointerLeave={() => setHovered(null)}
                    onFocus={() => setHovered(r.company)}
                    onBlur={() => setHovered(null)}
                    aria-label={`${r.company}, ${formatMonth(r.s)} to ${r.live ? "present" : formatMonth(r.e)}. Show details.`}
                    className="gantt-row group col-span-2 grid items-center text-left"
                    style={{ gridTemplateColumns: "subgrid" }}
                  >
                    <span
                      className={`flex items-center gap-2 py-2.5 text-[0.8125rem] transition-colors duration-300 md:text-[0.9375rem] ${
                        on ? "text-paper" : "text-faint group-[.is-lit]:text-dim"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${kindStyle[r.kind].dot}`} />
                      <span className="truncate">{r.company}</span>
                    </span>
                    <span className="relative block py-2.5">
                      {years.map((y) => (
                        <span key={y} aria-hidden className="absolute inset-y-0 w-px bg-paper/[0.05]" style={{ left: `${pct(y * 12)}%` }} />
                      ))}
                      <span
                        className="gantt-bar relative block h-3.5 [--lit:1]"
                        data-s={r.s}
                        data-e={r.e}
                        style={{ marginLeft: `${pct(r.s)}%`, width: `${pct(r.e + 1) - pct(r.s)}%` }}
                      >
                        <span className="absolute inset-0 rounded-full bg-paper/[0.07]" />
                        <span
                          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${kindStyle[r.kind].bar} transition-[filter,box-shadow] duration-300`}
                          style={{
                            width: "calc(var(--lit) * 100%)",
                            boxShadow: on ? `0 0 22px ${kindStyle[r.kind].glow}` : undefined,
                            filter: hovered && !on ? "saturate(0.4) brightness(0.65)" : undefined,
                          }}
                        />
                        {r.live ? (
                          <span
                            className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_10px_rgb(var(--signal))]"
                            style={{ opacity: "calc(var(--lit) * 2 - 1)" }}
                          />
                        ) : null}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* playhead: spans the bar area only */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[9.75rem] right-5 md:left-[15.5rem] md:right-8">
              <div className="ph absolute bottom-6 top-12 w-px bg-gradient-to-b from-signal via-signal/60 to-transparent" style={{ left: "100%" }}>
                <span className="ph-label absolute -top-7 whitespace-nowrap rounded-full bg-signal px-2.5 py-0.5 font-mono text-[0.6875rem] font-semibold text-ink">
                  {formatMonth(now)}
                </span>
              </div>
            </div>

            {/* tooltip */}
            <AnimatePresence>
              {hoveredRow ? (
                <motion.div
                  key="tip"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.18 }}
                  style={{ x: sx, y: sy }}
                  className="pointer-events-none absolute left-0 top-0 z-20 hidden w-[17rem] rounded-2xl border border-line bg-ink/90 p-4 shadow-[0_20px_50px_-15px_rgb(0_0_0/0.8)] backdrop-blur-md md:block"
                >
                  <p className="flex items-center gap-2 text-[0.75rem] text-dim">
                    <span className={`h-1.5 w-1.5 rounded-full ${kindStyle[hoveredRow.kind].dot}`} />
                    {kindMeta[hoveredRow.kind].label}
                    {hoveredRow.live ? <span className="text-signal">Now</span> : null}
                  </p>
                  <p className="mt-2 font-brand text-[1.25rem] font-bold leading-tight tracking-[-0.02em]">{hoveredRow.company}</p>
                  <ul className="mt-2 space-y-1.5">
                    {hoveredRow.roles.map((role) => (
                      <li key={role.title + role.dates} className="text-[0.8125rem]">
                        <span className="font-medium">{role.title}</span>
                        <span className="block font-mono text-[0.6875rem] text-faint">{role.dates}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 border-t border-line pt-2 text-[0.75rem] text-dim">
                    {duration(hoveredRow.s, hoveredRow.e)}. Click for details.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <figcaption className="sr-only">
            {chartRows.map((r) => `${r.company}: ${formatMonth(r.s)} to ${r.live ? "present" : formatMonth(r.e)}`).join("; ")}
          </figcaption>
        </figure>

        {/* ---------- Details (accordion) ---------- */}
        <ol className="mt-16 border-t border-line md:mt-24">
          {rows.map((item) => {
            const isOpen = open === item.company;
            const panelId = `xp-panel-${slug(item.company)}`;
            return (
              <li key={item.company} id={`xp-${slug(item.company)}`} className="scroll-mt-28 border-b border-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : item.company)}
                  className="group grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 py-7 text-left md:grid-cols-12 md:py-8"
                >
                  <span className="flex flex-wrap items-center gap-3 md:order-2 md:col-span-8">
                    <span className="font-brand text-[clamp(1.6rem,2.8vw,2.3rem)] font-bold leading-none tracking-[-0.035em] transition-colors duration-300 group-hover:text-lilac">
                      {item.company}
                    </span>
                    {item.live ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-1 text-[0.75rem] font-semibold text-signal">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
                        Now
                      </span>
                    ) : null}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[0.75rem] text-dim">
                      <span className={`h-1.5 w-1.5 rounded-full ${kindStyle[item.kind].dot}`} />
                      {kindMeta[item.kind].label}
                    </span>
                  </span>
                  <span className="grid h-10 w-10 place-items-center justify-self-end rounded-full border border-line transition-colors duration-300 group-hover:border-paper/30 md:order-3 md:col-span-1">
                    <FiChevronDown
                      aria-hidden
                      className={`h-4 w-4 transition-transform duration-500 ease-out-expo ${isOpen ? "rotate-180" : ""}`}
                    />
                  </span>
                  <span className="col-span-2 font-mono text-[0.8125rem] tabular-nums text-faint md:order-1 md:col-span-3">
                    {formatMonth(item.s)} – {item.live ? "Present" : formatMonth(item.e)}
                    <span className="block font-sans text-[0.875rem] text-dim">
                      {duration(item.s, item.e)}, {item.place}
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ height: { duration: 0.5, ease: EASE }, opacity: { duration: 0.3 } }}
                      className="overflow-hidden"
                    >
                      <div className="grid pb-10 md:grid-cols-12">
                        <div className="space-y-6 md:col-span-8 md:col-start-4">
                          {item.roles.map((role, i) => (
                            <motion.div
                              key={role.title + role.dates}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: EASE }}
                              className={i > 0 ? "border-t border-line pt-6" : ""}
                            >
                              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                                <p className="text-[1.0625rem] font-semibold">{role.title}</p>
                                <p className="font-mono text-[0.8125rem] tabular-nums text-faint">{role.dates}</p>
                              </div>
                              {role.text ? <p className="mt-2 max-w-[62ch] leading-[1.65] text-dim">{role.text}</p> : null}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
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

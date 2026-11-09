"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUp, FiArrowUpRight, FiCheck, FiCopy } from "react-icons/fi";
import { profile, ventures } from "@/lib/data";
import { Magnetic } from "./fx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pages = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Journey", href: "/journey" },
  { label: "Marketing", href: "/marketing" },
  { label: "Experience", href: "/#experience" },
];

const elsewhere = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
  { label: "Augere Labs", href: profile.augere },
];

const BASE_W = 560; // resting weight of the big name
const PEAK_W = 800; // weight of the letter right under the pointer

/** Current time in Karachi, rendered only after mount to avoid hydration mismatch. */
function KarachiTime({ withZone = true }: { withZone?: boolean }) {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit" });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="tabular-nums">
      {t ?? "--:--"}
      {withZone ? " PKT" : null}
    </span>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : `Copy ${profile.email}`}
      className="group inline-flex items-center gap-3 rounded-full border border-line bg-raised/60 py-2 pl-5 pr-2 text-[0.9375rem] transition-colors duration-300 hover:border-paper/25"
    >
      <span className="break-all text-left">{profile.email}</span>
      <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-paper/[0.06] transition-colors group-hover:bg-lilac group-hover:text-ink">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span key="ok" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}>
              <FiCheck aria-hidden />
            </motion.span>
          ) : (
            <motion.span key="copy" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}>
              <FiCopy aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const nameWrap = useRef<HTMLDivElement>(null);
  const spot = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGCircleElement>(null);

  useGSAP(
    (_, contextSafe) => {
      // Back-to-top ring shows how far down the page you are
      if (ring.current) {
        const C = 2 * Math.PI * 22;
        gsap.set(ring.current, { strokeDasharray: C, strokeDashoffset: C });
        gsap.to(ring.current, { strokeDashoffset: 0, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
      }

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".ft-reveal",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 85%" } }
        );
        gsap.fromTo(
          ".fl",
          { yPercent: 105 },
          { yPercent: 0, duration: 1.2, stagger: 0.035, ease: "expo.out", scrollTrigger: { trigger: ".name-wrap", start: "top 95%" } }
        );
      });

      // Liquid type: letters near the pointer get heavier; a lilac spotlight follows.
      mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const wrap = nameWrap.current;
        const el = spot.current;
        if (!wrap || !el || !contextSafe) return;
        const n = profile.name.length;
        const pairs = Array.from({ length: n }, (_, i) => wrap.querySelectorAll<HTMLElement>(`[data-i="${i}"]`));
        const setters = pairs.map((p) => gsap.quickTo(Array.from(p), "--w", { duration: 0.5, ease: "power3" }));
        const xTo = gsap.quickTo(el, "--sx", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(el, "--sy", { duration: 0.5, ease: "power3" });

        const onMove = contextSafe((e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
          gsap.to(el, { "--sr": 300, duration: 0.4, overwrite: "auto" });
          pairs.forEach((p, i) => {
            const b = p[0].getBoundingClientRect();
            const d = Math.abs(e.clientX - (b.left + b.width / 2));
            const f = Math.max(0, 1 - d / 260);
            setters[i](BASE_W + (PEAK_W - BASE_W) * f * f);
          });
        });
        const onLeave = contextSafe(() => {
          gsap.to(el, { "--sr": 0, duration: 0.5 });
          setters.forEach((s) => s(BASE_W));
        });
        wrap.addEventListener("pointermove", onMove);
        wrap.addEventListener("pointerleave", onLeave);
        return () => {
          wrap.removeEventListener("pointermove", onMove);
          wrap.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope: root }
  );

  const letters = (cls: string) =>
    profile.name.split("").map((ch, i) => (
      <span key={i} className="inline-block overflow-y-clip pb-[0.16em] align-bottom">
        <span
          data-i={i}
          className={`fl -mb-[0.22em] inline-block pb-[0.22em] ${cls}`}
          style={{ ["--w" as string]: BASE_W, fontVariationSettings: '"wght" var(--w)' }}
        >
          {ch === " " ? " " : ch}
        </span>
      </span>
    ));

  const colTitle = "font-mono text-[0.75rem] text-faint";
  const linkCls = "group inline-flex items-center gap-1.5 text-dim transition-colors duration-200 hover:text-paper";

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-[100%] bg-lilac-deep/10 blur-[110px]" />

      <div className="relative mx-auto max-w-[80rem] px-5 pt-20 md:px-10 md:pt-24">
        {/* ---------- CTA + status ---------- */}
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="ft-reveal md:col-span-7">
            <h2 className="font-brand text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1] tracking-[-0.04em] [text-wrap:balance]">
              Starting something? <span className="text-lilac">Let&apos;s build it.</span>
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.25}>
                <a href={`mailto:${profile.email}`} className="btn-primary">
                  Email me
                </a>
              </Magnetic>
              <CopyEmail />
            </div>
          </div>

          <div className="ft-reveal panel relative overflow-hidden p-6 md:col-span-5">
            <div className="flex items-center justify-between text-[0.8125rem]">
              <span className="flex items-center gap-2 text-dim">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                </span>
                Karachi, Pakistan
              </span>
              <span className="font-mono text-faint">GMT+5</span>
            </div>
            <p className="mt-3 font-brand text-[2.6rem] font-bold leading-none tracking-[-0.04em]">
              <KarachiTime withZone={false} />
            </p>
            <p className="mt-1 text-[0.875rem] text-dim">local time where I work</p>
            <div className="mt-5 border-t border-line pt-4">
              <p className="font-mono text-[0.75rem] text-faint">Currently building</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {ventures.map((v) => (
                  <li key={v.name}>
                    {v.href ? (
                      <a href={v.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[0.8125rem] transition-colors hover:border-lilac/40 hover:text-lilac">
                        {v.name}
                        <FiArrowUpRight aria-hidden className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="inline-flex rounded-full border border-line px-3 py-1 text-[0.8125rem]">{v.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ---------- Links ---------- */}
        <div className="ft-reveal mt-20 grid grid-cols-2 gap-10 border-t border-line pt-12 md:mt-24 md:grid-cols-12">
          <nav aria-label="Pages" className="md:col-span-3">
            <p className={colTitle}>Pages</p>
            <ul className="mt-4 space-y-2.5">
              {pages.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="group inline-flex items-center text-dim transition-colors duration-200 hover:text-paper">
                    <span className="h-px w-0 bg-lilac transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Elsewhere" className="md:col-span-3">
            <p className={colTitle}>Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {elsewhere.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer" className={linkCls}>
                    {l.label}
                    <FiArrowUpRight aria-hidden className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-2 md:col-span-4">
            <p className={colTitle}>About this site</p>
            <p className="mt-4 max-w-[34ch] leading-relaxed text-dim">
              Built with Next.js, GSAP, Three.js and Framer Motion. Type set in Bricolage
              Grotesque and Geist.
            </p>
          </div>
          <div className="col-span-2 flex items-start md:col-span-2 md:justify-end">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="group relative grid h-[3.75rem] w-[3.75rem] place-items-center rounded-full"
            >
              <svg viewBox="0 0 50 50" className="absolute inset-0 -rotate-90" aria-hidden>
                <circle cx="25" cy="25" r="22" fill="none" stroke="rgb(236 232 255 / 0.12)" strokeWidth="2" />
                <circle ref={ring} cx="25" cy="25" r="22" fill="none" stroke="url(#ringGrad)" strokeWidth="2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="rgb(143 127 224)" />
                    <stop offset="1" stopColor="rgb(255 181 71)" />
                  </linearGradient>
                </defs>
              </svg>
              <FiArrowUp aria-hidden className="h-5 w-5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Big name: liquid weight + spotlight ---------- */}
      <div ref={nameWrap} className="name-wrap relative mx-auto mt-16 max-w-[90rem] select-none px-3 md:mt-20" aria-hidden>
        <p className="whitespace-nowrap text-center font-brand text-[13.4vw] leading-[0.82] tracking-[-0.055em] 2xl:text-[12.2rem]">
          {letters("bg-gradient-to-b from-paper/[0.3] via-paper/[0.12] to-paper/[0.04] bg-clip-text text-transparent")}
        </p>
        <div
          ref={spot}
          className="pointer-events-none absolute inset-0 px-3 [--sr:0] [--sx:0] [--sy:0]"
          style={{
            WebkitMaskImage:
              "radial-gradient(calc(var(--sr) * 1px) circle at calc(var(--sx) * 1px) calc(var(--sy) * 1px), #000 0%, transparent 100%)",
            maskImage:
              "radial-gradient(calc(var(--sr) * 1px) circle at calc(var(--sx) * 1px) calc(var(--sy) * 1px), #000 0%, transparent 100%)",
          }}
        >
          <p className="whitespace-nowrap text-center font-brand text-[13.4vw] leading-[0.82] tracking-[-0.055em] 2xl:text-[12.2rem]">
            {letters("bg-gradient-to-br from-lilac via-lilac-deep to-signal bg-clip-text text-transparent")}
          </p>
        </div>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="relative mx-auto flex max-w-[80rem] flex-col gap-2 border-t border-line px-5 py-6 text-[0.8125rem] text-faint sm:flex-row sm:items-center sm:justify-between md:px-10">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="flex items-center gap-2">
          Made in Korangi, Karachi
          <span aria-hidden className="h-1 w-1 rounded-full bg-faint" />
          <KarachiTime />
        </p>
      </div>
    </footer>
  );
}

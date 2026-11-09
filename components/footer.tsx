"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowUp, FiArrowUpRight } from "react-icons/fi";
import { profile } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const columns = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Journey", href: "/journey" },
      { label: "Marketing", href: "/marketing" },
      { label: "Work", href: "/#work" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "LinkedIn", href: profile.linkedin, external: true },
      { label: "GitHub", href: profile.github, external: true },
      { label: "Augere Labs", href: profile.augere, external: true },
    ],
  },
] as const;

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const spot = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Letters rise into place when the footer arrives
        gsap.fromTo(
          ".fl",
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.035,
            ease: "expo.out",
            scrollTrigger: { trigger: ".name-wrap", start: "top 95%" },
          }
        );
      });

      // A lilac spotlight follows the pointer across the name
      const el = spot.current;
      if (!el || !contextSafe) return;
      const xTo = gsap.quickTo(el, "--sx", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(el, "--sy", { duration: 0.5, ease: "power3" });
      const onMove = contextSafe((e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
        gsap.to(el, { "--sr": 260, duration: 0.4, overwrite: "auto" });
      });
      const onLeave = contextSafe(() => gsap.to(el, { "--sr": 0, duration: 0.5 }));
      const wrap = el.parentElement!;
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);
      return () => {
        wrap.removeEventListener("pointermove", onMove);
        wrap.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: root }
  );

  const letters = (cls: string) =>
    profile.name.split("").map((ch, i) => (
      <span key={i} className="inline-block overflow-y-clip pb-[0.16em] align-bottom">
        {/* bottom padding extends the gradient box so the Q's tail gets painted */}
        <span className={`fl -mb-[0.22em] inline-block pb-[0.22em] ${cls}`}>{ch === " " ? " " : ch}</span>
      </span>
    ));

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-[80rem] px-5 pt-16 md:px-10 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-brand text-[1.75rem] font-bold leading-tight tracking-[-0.03em]">
              Starting something? <span className="text-lilac">Let&apos;s talk.</span>
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-flex items-center gap-1.5 text-dim transition-colors hover:text-paper"
            >
              {profile.email} <FiArrowUpRight aria-hidden />
            </a>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="md:col-span-2">
              <p className="font-mono text-[0.75rem] text-faint">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"external" in l ? (
                      <a href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-dim transition-colors hover:text-paper">
                        {l.label} <FiArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <Link href={l.href} className="text-dim transition-colors hover:text-paper">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-3 md:justify-self-end">
            <a href="#top" className="btn-ghost" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              Back to top <FiArrowUp aria-hidden />
            </a>
          </div>
        </div>
      </div>

      {/* Big name: faint base layer, plus a lilac copy revealed under the pointer */}
      <div className="name-wrap relative mx-auto mt-20 max-w-[90rem] select-none px-3 md:mt-28" aria-hidden>
        <p className="whitespace-nowrap text-center font-brand text-[13.4vw] font-bold leading-[0.82] tracking-[-0.055em] 2xl:text-[12.2rem]">
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
          <p className="whitespace-nowrap text-center font-brand text-[13.4vw] font-bold leading-[0.82] tracking-[-0.055em] 2xl:text-[12.2rem]">
            {letters("bg-gradient-to-br from-lilac via-lilac-deep to-signal bg-clip-text text-transparent")}
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[80rem] flex-col gap-2 border-t border-line px-5 py-6 text-[0.8125rem] text-faint sm:flex-row sm:justify-between md:px-10">
        <p>&copy; {new Date().getFullYear()} {profile.name}. Karachi, Pakistan.</p>
        <p>Built with Next.js and GSAP</p>
      </div>
    </footer>
  );
}

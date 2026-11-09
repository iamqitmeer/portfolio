"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { navLinks, profile } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Label = (typeof navLinks)[number]["label"] | null;

export default function SiteHeader() {
  const root = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<Label>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const [open, setOpen] = useState(false);

  // Progress line, "scrolled" state and the active home section.
  // Rebuilt on every route change because page height and sections differ.
  useGSAP(
    () => {
      gsap.fromTo(
        ".nav-progress",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } }
      );
      ScrollTrigger.create({
        start: 40,
        end: "max",
        onToggle: (self) => setScrolled(self.isActive),
      });

      if (pathname === "/about") setActive("About");
      else if (pathname === "/journey") setActive("Journey");
      else if (pathname === "/marketing") setActive("Marketing");
      else {
        // On home, the active link is whichever section spans the viewport middle
        const sections = [
          ["#work", "Work"],
          ["#experience", "Experience"],
        ] as const;
        const update = () => {
          const mid = window.innerHeight / 2;
          const hit = sections.find(([sel]) => {
            const r = document.querySelector(sel)?.getBoundingClientRect();
            return r ? r.top <= mid && r.bottom >= mid : false;
          });
          setActive(hit ? hit[1] : null);
        };
        update();
        ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update });
      }
      // Let the new page lay out before measuring
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: root, dependencies: [pathname], revertOnUpdate: true }
  );

  // Slide the pill under the active link
  useLayoutEffect(() => {
    const el = active ? linkRefs.current[active] : null;
    setPill(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [active]);

  // Close the mobile menu on navigation; lock scroll while it's open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  useGSAP(
    () => {
      if (!open) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline()
          .fromTo(".menu-sheet", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.out" })
          .fromTo(".menu-item", { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.06, ease: "expo.out" }, 0.15)
          .fromTo(".menu-foot", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.45);
      });
    },
    { scope: root, dependencies: [open], revertOnUpdate: true }
  );

  return (
    <header ref={root} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <div
        className={`relative z-20 mx-auto flex h-[3.75rem] max-w-[80rem] items-center justify-between gap-4 rounded-2xl border pl-4 pr-2 transition-[background-color,border-color,box-shadow] duration-500 ease-out-expo md:pl-5 ${
          scrolled || open
            ? "border-line bg-ink/75 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.6)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${profile.name}, home`}>
          <Mark />
          <span className="font-brand text-[1.15rem] font-bold tracking-[-0.03em]">{profile.name}</span>
        </Link>

        <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <ul className="relative flex items-center rounded-full border border-line bg-raised/50 p-1 text-[0.9375rem] font-medium">
            <span
              aria-hidden
              className="absolute bottom-1 left-0 top-1 rounded-full bg-paper/[0.08] transition-[transform,width,opacity] duration-500 ease-out-expo"
              style={{
                width: pill?.w ?? 0,
                transform: `translateX(${pill?.x ?? 0}px)`,
                opacity: pill ? 1 : 0,
              }}
            />
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  ref={(el) => {
                    linkRefs.current[link.label] = el;
                  }}
                  aria-current={active === link.label ? (link.href.startsWith("/#") ? "location" : "page") : undefined}
                  className={`block rounded-full px-4 py-1.5 transition-colors duration-300 ${
                    active === link.label ? "text-paper" : "text-dim hover:text-paper"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn-primary hidden h-11 px-5 sm:inline-flex">
            Let&apos;s talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-line md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-[1.5px] w-5 rounded bg-paper transition-transform duration-500 ease-out-expo ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-5 rounded bg-paper transition-transform duration-500 ease-out-expo ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
          </button>
        </div>

        <span
          aria-hidden
          className={`nav-progress absolute bottom-[-1px] left-5 right-5 h-px origin-left bg-gradient-to-r from-lilac-deep via-lilac to-signal transition-opacity duration-500 ${
            scrolled && !open ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {open ? (
        <div id="mobile-menu" className="menu-sheet fixed inset-0 z-10 flex flex-col bg-ink px-5 pb-8 pt-28 md:hidden">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {[{ label: "Home", href: "/" }, ...navLinks, { label: "Contact", href: "#contact" }].map((l) => (
                <li key={l.label} className="overflow-hidden">
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="menu-item block py-1 font-brand text-[3rem] font-bold leading-[1.1] tracking-[-0.035em]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu-foot mt-auto space-y-4">
            <a href={`mailto:${profile.email}`} className="btn-primary w-full">
              Email me
            </a>
            <div className="flex justify-between text-dim">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={profile.augere} target="_blank" rel="noreferrer">Augere Labs</a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

/** Mark: a lilac tile with a bold up-right arrow, echoing the Augere Labs logo. */
function Mark() {
  return (
    <span className="grid h-7 w-7 place-items-center rounded-lg bg-lilac text-ink transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg] group-hover:scale-105">
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <path d="M3 11 L11 3 M4.5 3 H11 V9.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </span>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = {
  title: string;
  accent: string;
  lead: string;
  aside?: React.ReactNode;
};

/** Page opener: two-tone display heading whose words rise in, a lead, optional right column. */
export default function PageHero({ title, accent, lead, aside }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(".word-inner", { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 1.2, stagger: 0.05 })
          .fromTo(".hero-fade", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.3);
      });
    },
    { scope: root }
  );

  const words = (text: string) =>
    text.split(" ").map((w, i) => (
      <span key={i}>
        <span className="word">
          <span className="word-inner">{w}</span>
        </span>{" "}
      </span>
    ));

  return (
    <section ref={root} className="hero relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
      <div aria-hidden className="dot-grid absolute inset-0 opacity-70" />
      <div className="relative mx-auto grid max-w-[80rem] gap-14 px-5 md:grid-cols-12 md:items-end md:px-10">
        <div className={aside ? "md:col-span-7" : "md:col-span-10"}>
          <h1 className="display text-[clamp(2.75rem,6.4vw,5.4rem)] [text-wrap:balance]">
            <span className="block">{words(title)}</span>
            <span className="block text-lilac">{words(accent)}</span>
          </h1>
          <p className="hero-fade mt-8 max-w-[38rem] text-[1.1875rem] leading-[1.6] text-dim">{lead}</p>
        </div>
        {aside ? <div className="hero-fade md:col-span-5">{aside}</div> : null}
      </div>
    </section>
  );
}

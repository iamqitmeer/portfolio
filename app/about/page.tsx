import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import PageHero from "@/components/page-hero";
import DayToDay from "@/components/day-to-day";
import Practice from "@/components/practice";
import Marquee from "@/components/marquee";
import Contact from "@/components/contact";
import SectionHead from "@/components/section-head";
import NameStory from "@/components/name-story";
import Age from "@/components/age";
import { aboutIntro, builtKinds, profile, ventures } from "@/lib/data";

export const metadata = {
  title: "About Qitmeer Raza",
  description:
    "Software engineer and founder from Korangi, Karachi. Born in 2008, building since 2020, and the story behind the name Qitmeer.",
};

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        title="Product thinking and"
        accent="technical execution."
        lead="I enjoy working on problems that need both. I like understanding why something needs to be built just as much as figuring out how to build it."
        aside={
          <figure className="panel relative ml-auto max-w-[24rem] overflow-hidden p-2">
            <Image
              src="/qitmeer.jpg"
              alt="Portrait of Qitmeer Raza"
              width={400}
              height={400}
              priority
              className="aspect-square w-full rounded-[14px] object-cover"
            />
            <figcaption className="flex items-center justify-between px-3 pb-2 pt-4 text-[0.875rem]">
              <span className="font-semibold">{profile.name}</span>
              <span className="flex items-center gap-2 text-dim">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                Korangi, Karachi
              </span>
            </figcaption>
          </figure>
        }
      />

      {/* Quick facts */}
      <section aria-label="Quick facts" className="border-t border-line">
        <dl className="mx-auto grid max-w-[80rem] grid-cols-2 md:grid-cols-4">
          {(
            [
              ["Born", "19 October 2008", profile.born.place],
              ["Age", <Age key="age" />, "Years old"],
              ["Roots", "Gujarati", "Family from Godhra, Gujarat, India"],
              ["Building since", String(profile.buildingSince), "Started with freelancing"],
            ] as [string, React.ReactNode, string][]
          ).map(([label, value, note], i) => (
            <div
              key={label}
              className={`px-5 py-8 md:px-10 md:py-10 ${i % 2 === 1 ? "border-l border-line" : ""} ${
                i > 1 ? "border-t border-line md:border-t-0" : ""
              } ${i === 2 ? "md:border-l" : ""}`}
            >
              <dt className="font-mono text-[0.75rem] text-faint">{label}</dt>
              <dd className="mt-3">
                <span className="block font-brand text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold leading-none tracking-[-0.03em]">
                  {value}
                </span>
                <span className="mt-2 block text-[0.9375rem] text-dim">{note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Story */}
      <section aria-label="About me" className="border-t border-line">
        <div className="mx-auto grid max-w-[80rem] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <p className="font-brand text-[clamp(1.75rem,3vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.025em] md:col-span-5">
            {aboutIntro[0]}
          </p>
          <div className="space-y-6 text-[1.125rem] leading-[1.7] text-dim md:col-span-6 md:col-start-7">
            {aboutIntro.slice(1).map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
            <p>
              Over the years I&apos;ve worked on{" "}
              <span className="text-paper">{builtKinds.slice(0, -1).join(", ").toLowerCase()}</span>{" "}
              and <span className="text-paper">{builtKinds[builtKinds.length - 1].toLowerCase()}</span>.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Link href="/journey" className="btn-primary">
                Read my journey
              </Link>
              <a href={profile.resume} download className="btn-ghost">
                Download résumé
              </a>
            </div>
          </div>
        </div>
      </section>

      <NameStory />

      <DayToDay />

      {/* Currently building */}
      <section aria-labelledby="building-title" className="border-t border-line">
        <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
          <SectionHead id="building-title" title="Currently building" aside="Augere Labs, Rembly and Hearlist, alongside my role at AngleBrackets." />
          <ul className="mt-14 border-t border-line md:mt-20">
            {ventures.map((v) => {
              const inner = (
                <>
                  <span className="font-brand text-[clamp(2rem,4.4vw,3.6rem)] font-bold leading-none tracking-[-0.04em] transition-colors duration-300 group-hover:text-lilac md:col-span-5">
                    {v.name}
                  </span>
                  <span className="text-dim md:col-span-3">{v.role}</span>
                  <span className="flex items-center justify-between gap-4 text-dim md:col-span-4">
                    {v.short}
                    {v.href ? (
                      <FiArrowUpRight aria-hidden className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" />
                    ) : null}
                  </span>
                </>
              );
              const cls = "group grid items-center gap-x-8 gap-y-2 border-b border-line py-8 md:grid-cols-12";
              return (
                <li key={v.name}>
                  {v.href ? (
                    <a href={v.href} target="_blank" rel="noreferrer" className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Practice />
      <Marquee />
      <Contact />
    </main>
  );
}

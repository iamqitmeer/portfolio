import Link from "next/link";
import PageHero from "@/components/page-hero";
import JourneyTrack from "@/components/journey-track";
import Manifesto from "@/components/manifesto";
import Contact from "@/components/contact";
import Age from "@/components/age";
import { chapters, profile } from "@/lib/data";

export const metadata = {
  title: "Journey of Qitmeer Raza",
  description:
    "From freelancing in 2020 to founding Augere Labs: the chapters of my work as a software engineer and founder from Korangi, Karachi.",
};

export default function JourneyPage() {
  const facts: [React.ReactNode, string][] = [
    [String(profile.buildingSince), "First freelance work"],
    [String(chapters.length), "Chapters so far"],
    [<Age key="age" />, "Years old, from Korangi"],
    ["Now", "Founder, Augere Labs"],
  ];

  return (
    <main id="main">
      <PageHero
        title="From freelancing in 2020"
        accent="to my own studio."
        lead="Freelance projects, teaching at 13, internships, full-stack roles, a company I co-founded and closed, client-facing engineering and now my own products. Here's how each step led to the next."
        aside={
          <dl className="ml-auto grid max-w-[24rem] grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-line bg-line">
            {facts.map(([v, l]) => (
              <div key={l} className="bg-ink p-5">
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="block font-brand text-[2rem] font-bold leading-none tracking-[-0.04em]">{v}</span>
                  <span aria-hidden className="mt-2 block text-[0.875rem] text-dim">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
        }
      />
      <JourneyTrack />
      <Manifesto />
      <section className="border-t border-line">
        <div className="mx-auto flex max-w-[80rem] flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="font-brand text-[1.75rem] font-bold tracking-[-0.03em]">
            Where the name comes from is a story too.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/about#name" className="btn-primary">
              Read the story of my name
            </Link>
            <Link href="/#work" className="btn-ghost">
              Selected work
            </Link>
          </div>
        </div>
      </section>
      <Contact />
    </main>
  );
}

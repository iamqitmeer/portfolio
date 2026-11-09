import Link from "next/link";
import PageHero from "@/components/page-hero";
import JourneyTrack from "@/components/journey-track";
import Manifesto from "@/components/manifesto";
import Contact from "@/components/contact";

export const metadata = {
  title: "Journey of Qitmeer Raza",
  description:
    "From a frontend internship in 2023 to founding Augere Labs: the chapters of my work as a software engineer and founder.",
};

export default function JourneyPage() {
  return (
    <main id="main">
      <PageHero
        title="From my first component"
        accent="to my own studio."
        lead="Internships, full-stack roles, a company I co-founded and closed, client-facing engineering and now my own products. Here's how each step led to the next."
        aside={
          <dl className="ml-auto grid max-w-[24rem] grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-line bg-line">
            {[
              ["2023", "First production code"],
              ["8", "Chapters so far"],
              ["2", "Companies founded"],
              ["Now", "Founder, Augere Labs"],
            ].map(([v, l]) => (
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
          <p className="font-brand text-[1.75rem] font-bold tracking-[-0.03em]">See what came out of it.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#work" className="btn-primary">
              Selected work
            </Link>
            <Link href="/about" className="btn-ghost">
              About me
            </Link>
          </div>
        </div>
      </section>
      <Contact />
    </main>
  );
}

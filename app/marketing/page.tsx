import PageHero from "@/components/page-hero";
import SectionHead from "@/components/section-head";
import Contact from "@/components/contact";
import LoopDiagram from "@/components/marketing/loop-diagram";
import Compare from "@/components/marketing/compare";
import AreasTabs from "@/components/marketing/areas-tabs";
import CaseStack from "@/components/marketing/case-stack";
import DataFlow from "@/components/marketing/data-flow";
import IncidentChart from "@/components/marketing/incident-chart";
import { headlineMetrics, industries, marketingIntro, marketingTools, privacyTracking } from "@/lib/marketing";

export const metadata = {
  title: "Performance marketing by Qitmeer Raza",
  description:
    "Paid acquisition across Google, Meta and LinkedIn Ads for legal, fintech, B2B SaaS, events and healthcare clients: strategy, optimisation, offline attribution, budgets, AI video creative and reporting.",
};

export default function MarketingPage() {
  return (
    <main id="main">
      <PageHero
        title="Performance marketing,"
        accent="judged on real revenue."
        lead="Google, Meta and LinkedIn Ads for clients in legal, fintech, B2B SaaS, events and healthcare. I run the whole loop, and measure it against what the CRM says, not just the ad platform."
        aside={<LoopDiagram />}
      />

      {/* Industries strip */}
      <section aria-label="Industries" className="overflow-hidden border-y border-line bg-raised/40">
        <ul className="mx-auto flex max-w-[80rem] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-6 md:px-10">
          {industries.map((i) => (
            <li key={i} className="flex items-center gap-3 font-brand text-[1.15rem] font-bold tracking-[-0.02em] text-paper/85 md:text-[1.35rem]">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
              {i}
            </li>
          ))}
        </ul>
      </section>

      {/* Headline numbers */}
      <section aria-labelledby="numbers-title" className="border-b border-line">
        <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
          <SectionHead
            id="numbers-title"
            title={
              <>
                Numbers that moved <span className="text-lilac">the right way</span>
              </>
            }
            aside="Three of the clearest before-and-afters from accounts I manage. Lower cost, more of the brand searches that convert."
          />
          <div className="panel mt-14 grid md:mt-20 md:grid-cols-3">
            {headlineMetrics.map((m, i) => (
              <div key={m.label} className={`p-7 md:p-10 ${i > 0 ? "border-t border-line md:border-l md:border-t-0" : ""}`}>
                <Compare m={m} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro + areas */}
      <section aria-labelledby="do-title" className="border-b border-line">
        <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
          <p className="max-w-[46ch] font-brand text-[clamp(1.45rem,2.4vw,2rem)] font-semibold leading-[1.3] tracking-[-0.025em] text-dim">
            <span className="text-paper">{marketingIntro.split(".")[0]}.</span>
            {marketingIntro.slice(marketingIntro.indexOf(".") + 1)}
          </p>
          <h2 id="do-title" className="h-section mt-20 md:mt-28">
            What I do
          </h2>
          <AreasTabs />
        </div>
      </section>

      {/* Results */}
      <section aria-labelledby="results-title" className="border-b border-line">
        <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
          <SectionHead
            id="results-title"
            title="Selected results"
            aside="Client names withheld. Every number is from an account I manage."
          />
          <CaseStack />
        </div>
      </section>

      {/* Privacy-safe tracking */}
      <section aria-labelledby="privacy-title" className="border-b border-line">
        <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
          <SectionHead
            id="privacy-title"
            title={
              <>
                Tracking that <span className="text-lilac">respects regulation</span>
              </>
            }
            aside="Offline conversions and click IDs give bidding real outcomes to learn from, without sending what shouldn't leave the site."
          />
          <div className="mt-14 md:mt-20">
            <DataFlow />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {privacyTracking.map((p) => (
              <div key={p.title} className="panel p-7">
                <h3 className="font-brand text-[1.3rem] font-bold tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-3 leading-[1.6] text-dim">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <IncidentChart />
          </div>
        </div>
      </section>

      {/* Tools */}
      <section aria-labelledby="tools-title">
        <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-28">
          <SectionHead id="tools-title" title="Tools" aside="Platforms, tracking and creative tools I use every week." />
          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
            {marketingTools.map((t) => (
              <li key={t} className="group bg-ink px-5 py-6 transition-colors duration-300 hover:bg-raised [&:last-child:nth-child(odd)]:col-span-2 sm:[&:last-child:nth-child(odd)]:col-span-1">
                <span className="font-medium transition-colors duration-300 group-hover:text-lilac">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact />
    </main>
  );
}

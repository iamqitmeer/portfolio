import PageHero from "@/components/page-hero";
import SectionHead from "@/components/section-head";
import Metric from "@/components/metric";
import Contact from "@/components/contact";
import {
  budgetIncident,
  headlineMetrics,
  industries,
  marketingAreas,
  marketingIntro,
  marketingResults,
  marketingTools,
  privacyTracking,
} from "@/lib/marketing";

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
        lead="Google, Meta and LinkedIn Ads for clients in legal, fintech, B2B SaaS, events and healthcare. I run the whole loop, and I measure it against what the CRM says, not just the ad platform."
        aside={
          <div className="panel ml-auto max-w-[24rem] p-6">
            <p className="font-mono text-[0.75rem] text-faint">Industries</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {industries.map((i) => (
                <li key={i} className="rounded-full border border-line bg-paper/[0.03] px-3.5 py-1.5 text-[0.9375rem]">
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-5 text-[0.9375rem] leading-relaxed text-dim">
              Channels: Google Search, Performance Max, Demand Gen, Brand, Meta and LinkedIn.
            </p>
          </div>
        }
      />

      {/* Headline numbers */}
      <section aria-label="Headline results" className="border-t border-line">
        <div className="mx-auto grid max-w-[80rem] md:grid-cols-3">
          {headlineMetrics.map((m, i) => (
            <div key={m.label} className={`px-5 py-10 md:px-10 md:py-14 ${i > 0 ? "border-t border-line md:border-l md:border-t-0" : ""}`}>
              <Metric m={m} />
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section aria-label="Overview" className="border-t border-line">
        <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
          <p className="max-w-[42ch] font-brand text-[clamp(1.5rem,2.6vw,2.15rem)] font-semibold leading-[1.25] tracking-[-0.03em]">
            {marketingIntro}
          </p>
        </div>
      </section>

      {/* What I do */}
      <section aria-labelledby="do-title" className="border-t border-line">
        <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
          <SectionHead
            id="do-title"
            title="What I do"
            aside="Structure around business goals, not platform defaults, so every campaign can be judged on its own."
          />
          <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2">
            {marketingAreas.map((a, i) => (
              <article key={a.title} className="panel p-7 md:p-9">
                <p className="font-mono text-[0.75rem] text-faint">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-brand text-[1.6rem] font-bold leading-tight tracking-[-0.03em]">{a.title}</h3>
                <ul className="mt-5 space-y-3">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-3 leading-[1.6] text-dim">
                      <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-lilac-deep" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section aria-labelledby="results-title" className="border-t border-line">
        <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
          <SectionHead id="results-title" title="Selected results" aside="Client names withheld. Numbers are from the accounts I manage." />
          <ol className="mt-14 md:mt-20">
            {marketingResults.map((c) => (
              <li key={c.client} className="grid gap-8 border-t border-line py-12 md:grid-cols-12 md:gap-10 md:py-16">
                <div className="md:col-span-4">
                  <p className="text-[0.9375rem] text-signal">{c.industry}</p>
                  <h3 className="mt-2 font-brand text-[clamp(1.75rem,2.8vw,2.3rem)] font-bold leading-[1.05] tracking-[-0.03em] [text-wrap:balance]">
                    {c.client}
                  </h3>
                  {c.metrics.length ? (
                    <div className="mt-8 space-y-7">
                      {c.metrics.map((m) => (
                        <Metric key={m.label} m={m} size="md" />
                      ))}
                    </div>
                  ) : null}
                </div>
                <ul className="space-y-4 md:col-span-7 md:col-start-6">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-4 text-[1.0625rem] leading-[1.65] text-dim">
                      <span aria-hidden className="mt-[0.7rem] h-px w-5 shrink-0 bg-lilac" />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Privacy-safe tracking + incident */}
      <section aria-labelledby="privacy-title" className="border-t border-line">
        <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
          <SectionHead
            id="privacy-title"
            title="Tracking that respects regulation"
            aside="Offline conversions and click IDs give bidding real outcomes to learn from, without sending what shouldn't leave the site."
          />
          <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3">
            {privacyTracking.map((p) => (
              <div key={p.title} className="panel p-7">
                <h3 className="font-brand text-[1.35rem] font-bold tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-3 leading-[1.6] text-dim">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="panel mt-4 grid gap-8 overflow-hidden bg-gradient-to-r from-raised to-signal/[0.06] p-7 md:grid-cols-12 md:items-center md:p-10">
            <div className="md:col-span-5">
              <p className="flex items-baseline gap-3 font-brand font-bold tracking-[-0.04em]">
                <span className="text-[clamp(2.2rem,4vw,3.25rem)] text-faint line-through decoration-2">$0.50</span>
                <span className="text-[clamp(2.8rem,5vw,4.25rem)] text-signal">$12+</span>
              </p>
              <p className="mt-2 text-dim">Cost per click after a 25× budget jump</p>
            </div>
            <div className="md:col-span-7">
              <h3 className="font-brand text-[1.6rem] font-bold tracking-[-0.03em]">{budgetIncident.title}</h3>
              <p className="mt-3 text-[1.0625rem] leading-[1.65] text-dim">{budgetIncident.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section aria-labelledby="tools-title" className="border-t border-line">
        <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-28">
          <h2 id="tools-title" className="h-section">Tools</h2>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {marketingTools.map((t) => (
              <li key={t} className="rounded-full border border-line px-4 py-2 text-[1rem] transition-colors hover:border-lilac/40 hover:text-lilac">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact />
    </main>
  );
}

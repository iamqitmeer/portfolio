import Link from "next/link";
import { headlineMetrics } from "@/lib/marketing";
import Metric from "./metric";
import SectionHead from "./section-head";

/** Home-page summary of the performance marketing work, linking to /marketing. */
export default function MarketingTeaser() {
  return (
    <section id="marketing" aria-labelledby="mkt-title" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-[80rem] px-5 py-24 md:px-10 md:py-32">
        <SectionHead
          id="mkt-title"
          title={
            <>
              I also run <span className="text-lilac">paid acquisition</span>
            </>
          }
          aside="Google, Meta and LinkedIn Ads for clients in legal services, fintech, B2B SaaS, events and healthcare, from campaign build to offline attribution."
        />

        <div className="panel mt-14 grid md:mt-20 md:grid-cols-3">
          {headlineMetrics.map((m, i) => (
            <div key={m.label} className={`p-7 md:p-10 ${i > 0 ? "border-t border-line md:border-l md:border-t-0" : ""}`}>
              <Metric m={m} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/marketing" className="btn-primary">
            See the marketing work
          </Link>
        </div>
      </div>
    </section>
  );
}

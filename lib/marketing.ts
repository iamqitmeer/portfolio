/* Performance marketing content. Client names are withheld on purpose. */

export const marketingIntro =
  "I manage paid acquisition for a portfolio of clients across legal services, fintech, B2B SaaS, events and hospitality, and healthcare. My work covers the full loop: campaign strategy and build, daily optimisation, conversion tracking and offline attribution, budget management, creative production, and clear reporting to clients.";

export const industries = [
  "Legal services",
  "Fintech",
  "B2B SaaS",
  "Events & hospitality",
  "Healthcare",
] as const;

/** A metric. If `from` is set, it animates from the before value to `to`. */
export type Metric = {
  label: string;
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  note?: string;
};

export const headlineMetrics: Metric[] = [
  { label: "Search cost per click", from: 20, to: 4, prefix: "$", note: "In two days, for a regulated marketplace" },
  { label: "Cost per purchase", from: 268, to: 177, prefix: "$", note: "First five days, travel advisor SaaS" },
  { label: "Brand impression share", from: 61, to: 81, suffix: "%", note: "While brand CPC fell from $0.58 to $0.13" },
];

export type CaseResult = {
  client: string;
  industry: string;
  metrics: Metric[];
  points: string[];
};

export const marketingResults: CaseResult[] = [
  {
    client: "Real estate investment marketplace",
    industry: "Fintech, FINRA-regulated",
    metrics: [
      { label: "Search cost per click", from: 20, to: 4, prefix: "$" },
      { label: "Junk placements removed", to: 10000, suffix: "+" },
    ],
    points: [
      "Cut search cost per click from about $20 to about $4 in two days by moving to capped-CPC bidding and cleaning up search terms, which doubled click volume on the same budget.",
      "Found Performance Max ads running on kids' and sleep videos and removed more than 10,000 junk placements.",
      "Paused a social campaign spending almost entirely on low-quality app inventory, and set up consent-only tracking to meet compliance requirements.",
    ],
  },
  {
    client: "Employment law firm",
    industry: "Legal, three states",
    metrics: [
      { label: "Managed daily", to: 1000, prefix: "$", suffix: "/day" },
      { label: "Google campaigns", to: 9 },
    ],
    points: [
      "Manage about $1,000/day across 9 Google campaigns in three states, with cost per form fill around $25 to $40.",
      "Moved bidding to value-based optimisation using real case outcomes from the CRM: qualified lead, agreement signed, case accepted.",
      "Removed AI-generated ad text that was getting flagged, excluded hundreds of low-quality placements, and proposed a dedicated brand campaign after finding brand clicks were being lost to budget limits.",
    ],
  },
  {
    client: "Travel advisor SaaS",
    industry: "B2B SaaS",
    metrics: [
      { label: "Cost per purchase", from: 268, to: 177, prefix: "$" },
      { label: "Brand impression share", from: 61, to: 81, suffix: "%" },
      { label: "Brand cost per click", from: 0.58, to: 0.13, prefix: "$", decimals: 2 },
    ],
    points: [
      "Brought cost per purchase down from about $268 to about $177 in the first five days after fixing the conversion goals and restructuring brand bidding.",
      "Raised brand impression share from 61% to 81% while cutting brand cost per click from $0.58 to $0.13.",
      "Excluded about 3,000 low-quality placements and proposed a competitor test based on 90 days of search data.",
    ],
  },
  {
    client: "Luxury catering and events company",
    industry: "Events & hospitality",
    metrics: [],
    points: [
      "Restored lead flow after finding that a landing page change and blocked brand keywords had halved leads. Early results: more leads on lower spend.",
      "Built an offline feed so quotes and bookings from the booking system flow back to Google Ads as revenue.",
      "Launched city-level and competitor keyword tests, and ran a landing page A/B test for seasonal campaigns.",
    ],
  },
  {
    client: "Startup legal and equity software",
    industry: "Legal tech",
    metrics: [{ label: "Meta cost per lead", to: 11, prefix: "$", suffix: "–13" }],
    points: [
      "Ran Meta lead generation at about $11 to $13 per lead, identified the winning creative, and cut spend on ad sets that weren't getting enough budget to learn.",
      "Diagnosed why purchases weren't being credited to Meta (browser-only tracking and test traffic firing the live pixel) and scoped a server-side Conversions API fix with the client's developers.",
      "Planned a new product campaign after the main landing page was blocked by a Google policy, including tracking, keyword research and ad copy.",
    ],
  },
];

export const marketingAreas = [
  {
    title: "Campaign strategy and management",
    points: [
      "Run Google Search, Performance Max, Demand Gen and Brand campaigns, plus Meta and LinkedIn campaigns, often for the same client at once.",
      "Plan campaign structure around business goals, not platform defaults: brand, non-brand, competitor and audience campaigns kept separate so each can be judged on its own.",
      "Write and A/B test ad copy and landing page combinations, including split tests between a product page and a direct inquiry form.",
    ],
  },
  {
    title: "Optimisation and account hygiene",
    points: [
      "Weekly search term reviews and negative keywords to cut spend on job seekers, DIY researchers, competitors' customers and consumer searches for B2B products.",
      "Placement cleanup for Performance Max and Display: thousands of low-quality apps, sites and YouTube videos excluded, including kids' content, sleep and white-noise videos and game sites.",
      "Bid strategy changes based on data, and a critical read of Google's recommendations: apply what fits the business, reject what only raises spend or hurts brand quality.",
    ],
  },
  {
    title: "Conversion tracking and attribution",
    points: [
      "Audit conversion setups so bidding learns from real outcomes: purchases, qualified leads and booked revenue as primary goals, button clicks and page views secondary.",
      "Value-based bidding with stage values for each step of the funnel: lead, qualified, agreement signed, case accepted.",
      "Offline conversion pipelines from HubSpot, event booking software and spreadsheets back to Google Ads and Meta, using click IDs and the Conversions API.",
    ],
  },
  {
    title: "Budget management",
    points: [
      "Manage daily budgets across channels inside fixed portfolio limits, and rebalance toward what produces revenue.",
      "Catch budget problems quickly and fix them the same day.",
    ],
  },
  {
    title: "Creative and AI video",
    points: [
      "Produce AI-generated UGC-style video ads with Google Veo, including prompt systems, voice consistency rules and quality checks for lip sync and pronunciation.",
      "Write compliant ad copy for regulated industries (financial services and legal advertising) and check it against platform policies.",
    ],
  },
  {
    title: "Reporting and client communication",
    points: [
      "Weekly performance updates built on CRM data, not just platform numbers, that separate each channel's real leads from mixed totals.",
      "Proposals and approval requests that recommend tests, give the numbers behind them, and are honest about risks and small sample sizes.",
      "Diagnose sudden drops (billing holds, policy disapprovals, tracking breaks, landing page changes) and explain the cause and fix in plain language.",
    ],
  },
] as const;

export const privacyTracking = [
  {
    title: "FINRA-regulated firm",
    text: "Consent-only tags, so nothing fires until the visitor agrees.",
  },
  {
    title: "Healthcare startup",
    text: "A HIPAA-conscious design that sends only click IDs and neutral step codes to ad platforms, with no health data.",
  },
  {
    title: "With client developers",
    text: "Google Tag Manager, Segment, form hidden fields and click ID capture, built together with the client's own engineers.",
  },
] as const;

export const budgetIncident = {
  title: "A budget bug, fixed the same day",
  text: "An automated reallocation pushed one campaign's budget up 25 times and sent cost per click from $0.50 to over $12. I restored the budget split the same day.",
};

export const marketingTools = [
  "Google Ads",
  "Performance Max",
  "Demand Gen",
  "Data Manager API",
  "Meta Ads Manager",
  "Conversions API",
  "LinkedIn Campaign Manager",
  "Google Tag Manager",
  "GA4",
  "Segment",
  "HubSpot",
  "Google Ads API & scripts",
  "Google Flow (Veo)",
  "CapCut",
  "ElevenLabs",
] as const;

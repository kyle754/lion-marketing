/** Site-wide copy, links, and SEO constants */
export const SITE = {
  name: "Lion Marketing",
  legalName: "Lion Marketing LLC",
  url: "https://lionmarketingai.com",
  bookingUrl: "https://lionmarketingai.com/booking",
  email: "hello@lionmarketingai.com",
  phone: "",
  tagline:
    "Client acquisition infrastructure for established insurance producers and advisors",
  description:
    "Lion Marketing helps established insurance agents and financial advisors add a scalable client acquisition channel with exclusive, intent-aligned opportunities, verified contact data, and real-time delivery nationwide.",
} as const;

export const NAV_LINKS = [
  { label: "Our Approach", href: "#approach" },
  { label: "The System", href: "#process" },
  { label: "Quality", href: "#standards" },
  { label: "FAQ", href: "#faq" },
  { label: "Book a Call", href: "#book" },
] as const;

export const HERO = {
  eyebrow: "Built for established agents, producers & advisors",
  headline: "A modern acquisition channel for",
  headlineAccent: "predictable production growth.",
  subhead:
    "Add exclusive, intent-aligned life insurance opportunities to the business you have already built. More qualified conversations. More consistent pipeline. A growth channel you can plan around.",
  ctaPrimary: "Book a Strategy Call",
  ctaSecondary: "Model Your Growth",
  footnote:
    "Complements referrals and existing marketing · Exclusive delivery · Nationwide",
  pillars: [
    {
      title: "Qualified conversations",
      detail: "Prospects screened for intent and alignment before they reach you",
    },
    {
      title: "Pipeline you can model",
      detail: "Stable inputs make production forecasting more realistic",
    },
    {
      title: "Time well spent",
      detail: "Verified contact data supports efficient follow-up and outreach",
    },
  ],
} as const;

export const TRUST_ITEMS = [
  { label: "Exclusive", detail: "One producer per opportunity" },
  { label: "Intent-aligned", detail: "Screened before delivery" },
  { label: "Verified contact", detail: "Phone confirmed at opt-in" },
  { label: "Real-time", detail: "Delivered while interest is fresh" },
] as const;

export const GROWTH_SECTION = {
  id: "approach",
  eyebrow: "The growth challenge",
  headline: "Referrals are valuable.",
  headlineLine2: "They are not a scalable system on their own.",
  body: "Most established producers already have a foundation. What they want is another reliable way to create conversations without rebuilding their entire business.",
  body2:
    "The opportunity is not more volume for its own sake. It is more qualified intent flowing into a process that already works for you.",
  contrasts: [
    {
      label: "What slows growth",
      items: [
        "Inconsistent conversation flow month to month",
        "Over-reliance on referrals alone",
        "Time spent on low-intent outreach",
      ],
    },
    {
      label: "What scalable acquisition looks like",
      items: [
        "Steady qualified opportunities",
        "Clear standards you can trust",
        "A channel that complements what you already do",
      ],
    },
  ],
} as const;

export const ADDITIVE_SECTION = {
  eyebrow: "Scalable growth",
  headline: "Keep what's already working.",
  headlineAccent: "Add a more predictable growth channel.",
  body: "Top producers don't rely on a single source. They combine referrals, marketing, and structured acquisition. Lion Marketing adds a scalable layer without disrupting what's already working.",
  venn: {
    left: { label: "Referrals", sub: "Trusted relationships" },
    center: { label: "Lion Marketing", sub: "Qualified acquisition" },
    right: { label: "Your Marketing", sub: "Current growth channels" },
    badge: "Predictable momentum",
  },
  benefits: [
    {
      title: "More qualified conversations",
      body: "Speak with consumers actively exploring coverage, not cold lists that waste your time.",
      icon: "conversation",
    },
    {
      title: "Momentum beyond referrals",
      body: "Create a steady flow of opportunities alongside the relationships you already have.",
      icon: "network",
    },
    {
      title: "Scalable pipeline growth",
      body: "A predictable channel you can layer into your production plan as your business grows.",
      icon: "growth",
    },
  ],
} as const;

export const OUTCOMES_SECTION = {
  eyebrow: "What changes",
  headline: "More control over how growth happens.",
  subhead:
    "When acquisition becomes more predictable, the business feels more professional and more scalable.",
} as const;

export const OUTCOMES = [
  {
    title: "More qualified conversations",
    body: "Opportunities arrive with intent, context, and verified contact information so your team can focus on real sales activity.",
  },
  {
    title: "More predictable pipeline",
    body: "When opportunity flow stabilizes, you can forecast production with more confidence and less guesswork.",
  },
  {
    title: "Better use of your time",
    body: "Your time is valuable. Structured screening and verification help you spend it on prospects worth pursuing.",
  },
  {
    title: "Long-term production momentum",
    body: "A reliable acquisition channel supports compounding growth, not one-off spikes that disappear next month.",
  },
] as const;

export const PROCESS_SECTION = {
  eyebrow: "The system",
  headline: "Acquisition infrastructure, managed for you.",
  subhead:
    "We operate the front end of the funnel so you receive exclusive opportunities ready for your follow-up process.",
} as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Intent-based demand",
    body: "Prospects request life insurance information through compliant digital channels.",
  },
  {
    step: "02",
    title: "Alignment screening",
    body: "Each prospect completes product-relevant questions so conversations start closer to fit.",
  },
  {
    step: "03",
    title: "Contact verification",
    body: "Phone numbers are confirmed at submission to improve reachability and data quality.",
  },
  {
    step: "04",
    title: "Exclusive delivery",
    body: "Qualified opportunities route to you in real time. One producer. One prospect.",
  },
] as const;

export const WHO_SECTION = {
  eyebrow: "Who we work with",
  headline: "Established producers building toward the next level.",
  body: "Lion Marketing is a strong fit for agents and advisors who value their time, care about ROI, and want a professional acquisition partner rather than a commodity vendor.",
  traits: [
    "You have a working sales process and follow-up discipline",
    "You want more conversations and more consistency, not a magic shortcut",
    "You may rely on referrals today and want a scalable complement",
    "You evaluate partners on quality, clarity, and long-term fit",
  ],
  callNote:
    "On a strategy call, we review your goals, markets, and production math together. The goal is alignment, not pressure.",
} as const;

export const STANDARDS_SECTION = {
  eyebrow: "Quality standards",
  headline: "Clear criteria. Professional delivery.",
  body: "Every opportunity includes verified data, documented consent, and completed screening. Standards are objective and consistent so you know exactly what you are receiving.",
  productsHeadline: "Life insurance lines we support",
  productsBody:
    "Screening aligns with the product categories you target, from final expense to permanent and IUL solutions.",
  geoNote:
    "Serving independent agents and financial advisors nationwide across all 50 states.",
} as const;

export const LEAD_STANDARDS = [
  "Full name and verified U.S. phone number",
  "Email, age, state, and timestamp",
  "Documented consumer consent",
  "Completed product-alignment screening",
] as const;

export const PRODUCTS = [
  "Final Expense",
  "Term Life",
  "Mortgage Protection",
  "Permanent Life",
  "IUL",
  "Whole Life",
] as const;

export const FORECAST_CTA = {
  eyebrow: "Plan with clarity",
  headline: "See the production math before you scale",
  body: "Use our ROI forecast tool to model revenue, profit, and break-even based on your real numbers. A calm, data-led way to evaluate whether this channel fits your goals.",
  button: "Open Growth Forecast",
  link: "Explore the model →",
} as const;

export const FINAL_CTA = {
  eyebrow: "Next step",
  headline: "Explore whether this fits your growth plan",
  body: "Book a brief strategy call. We will review your current production, target markets, and goals, then outline how Lion Marketing could support your pipeline.",
  button: "Book a Strategy Call",
  assurances: [
    { label: "Consultative conversation", detail: "Focused on fit and clarity" },
    { label: "Pay per opportunity", detail: "No retainers or ad spend required" },
    { label: "Professional standards", detail: "Exclusive, verified delivery" },
  ],
} as const;

export const FAQ_SECTION = {
  eyebrow: "FAQ",
  headline: "Clear answers before you decide",
} as const;

export const FAQ_ITEMS = [
  {
    q: "Who is Lion Marketing best suited for?",
    a: "Established insurance agents, producers, and financial advisors who want a scalable complement to referrals and existing marketing. You should have a working follow-up process and a genuine interest in building predictable pipeline.",
  },
  {
    q: "Does this replace referrals or my current marketing?",
    a: "No. This is designed to add a reliable acquisition channel alongside what already works. Many producers use Lion Marketing to create consistency between referral cycles.",
  },
  {
    q: "Are opportunities exclusive?",
    a: "Yes. Each prospect is delivered to one producer only. We do not share or resell the same opportunity.",
  },
  {
    q: "How is contact information verified?",
    a: "Prospects confirm their phone number during submission. This improves data quality and supports more efficient outreach.",
  },
  {
    q: "What happens before an opportunity is delivered?",
    a: "Prospects complete product-relevant screening questions and provide consent through compliant opt-in flows. This aligns conversations with the products you sell.",
  },
  {
    q: "What results should I expect?",
    a: "Results depend on your follow-up, speed to contact, product mix, and market. We focus on intent, verification, and consistent standards so you can evaluate performance with clarity over time.",
  },
  {
    q: "Are these appointments or live transfers?",
    a: "No. You receive exclusive opportunities in real time and manage outreach within your own process.",
  },
  {
    q: "How is pricing structured?",
    a: "Pay-per-opportunity pricing varies by product, targeting, state, and volume. We discuss alignment on your strategy call after understanding your goals.",
  },
  {
    q: "How should I evaluate performance?",
    a: "Treat this like any serious growth channel. Review contact patterns, conversations, and production over a meaningful window with consistent follow-up.",
  },
  {
    q: "Do you work in my state?",
    a: "Yes. Lion Marketing serves producers nationwide. We review state availability and demand during your strategy call.",
  },
] as const;

export const FOOTER = {
  blurb:
    "Client acquisition infrastructure for established insurance producers and advisors. Exclusive opportunities, verified contact data, and professional delivery nationwide.",
  tagline: "Qualified conversations. Predictable growth. A channel you can trust.",
} as const;

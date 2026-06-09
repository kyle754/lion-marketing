/** Site-wide copy, links, and SEO constants */
export const SITE = {
  name: "Lion Marketing",
  legalName: "Lion Marketing LLC",
  url: "https://lionmarketingai.com",
  bookingUrl: "https://lionmarketingai.com/booking",
  email: "hello@lionmarketingai.com",
  phone: "",
  tagline:
    "Client acquisition for established insurance producers and advisors",
  description:
    "Lion Marketing helps established insurance agents and financial advisors add a scalable client acquisition channel with exclusive, intent-aligned opportunities and verified contact data nationwide.",
} as const;

export const BOOKING_CTA = "Book a Strategy Call" as const;

export const NAV_LINKS = [
  { label: "The Problem", href: "#approach" },
  { label: "How It Works", href: "#process" },
  { label: "Who It's For", href: "#fit" },
  { label: "FAQ", href: "#faq" },
  { label: "Book a Call", href: "#book" },
] as const;

export const HERO = {
  eyebrow: "For established agents & advisors",
  headline: "A growth channel you can",
  headlineAccent: "actually plan around.",
  subhead:
    "Lion Marketing adds exclusive, intent-aligned life insurance opportunities to the business you've already built — without replacing referrals or changing how you sell.",
  ctaPrimary: BOOKING_CTA,
  ctaSecondary: "Model Your Growth",
  footnote:
    "Nationwide · Exclusive delivery · Pay per opportunity",
} as const;

export const TRUST_ITEMS = [
  { label: "Exclusive", detail: "One producer per lead" },
  { label: "Screened", detail: "Intent checked before delivery" },
  { label: "Verified", detail: "Phone confirmed at opt-in" },
  { label: "Real-time", detail: "Sent while interest is fresh" },
] as const;

export const GROWTH_SECTION = {
  id: "approach",
  eyebrow: "The problem",
  headline: "Referrals are valuable.",
  headlineLine2: "They aren't a system.",
  body: "Most established producers aren't short on skill. They're short on consistency — conversation volume swings month to month, and there's no reliable way to fill the gaps between referral cycles.",
  contrasts: [
    {
      label: "Without a second channel",
      items: [
        "Pipeline dips when referrals slow down",
        "Hard to forecast production month to month",
        "Time lost on low-intent outreach",
      ],
    },
    {
      label: "With structured acquisition",
      items: [
        "Steady flow of screened opportunities",
        "Inputs you can plug into a forecast",
        "Follow-up with people who opted in",
      ],
    },
  ],
} as const;

export const ADDITIVE_SECTION = {
  id: "solution",
  eyebrow: "Where we fit",
  headline: "Add a channel.",
  headlineAccent: "Keep everything else.",
  body: "Lion Marketing sits alongside referrals and your existing marketing — not instead of them. You get a predictable layer of qualified opportunities without rebuilding your business.",
  venn: {
    left: { label: "Referrals", sub: "What you trust today" },
    center: { label: "Lion Marketing", sub: "Structured acquisition" },
    right: { label: "Your marketing", sub: "What you're already running" },
    badge: "Works together",
  },
  benefits: [
    {
      title: "Better conversations",
      body: "Prospects requested life insurance information. You're not working a cold list.",
      icon: "conversation",
    },
    {
      title: "Forecastable pipeline",
      body: "When lead flow stabilizes, production math gets simpler. You can plan around it.",
      icon: "growth",
    },
    {
      title: "Less wasted time",
      body: "Screening and verification happen before delivery, so follow-up starts closer to fit.",
      icon: "network",
    },
  ],
} as const;

export const PROCESS_SECTION = {
  eyebrow: "How it works",
  headline: "From interest to your inbox",
  subhead:
    "We operate the front of the funnel. You receive exclusive opportunities and run follow-up your way.",
} as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Prospect opts in",
    body: "Consumers request life insurance information through compliant digital channels.",
  },
  {
    step: "02",
    title: "We screen for fit",
    body: "Product-relevant questions filter out misaligned interest before anything is sent.",
  },
  {
    step: "03",
    title: "Contact is verified",
    body: "Phone numbers are confirmed at submission so you're not chasing bad data.",
  },
  {
    step: "04",
    title: "Exclusive delivery",
    body: "The opportunity routes to you in real time. One producer, one prospect.",
  },
] as const;

export const LEAD_STANDARDS = [
  "Name and verified U.S. phone number",
  "Email, age, state, and timestamp",
  "Documented consumer consent",
  "Completed product-alignment screening",
] as const;

export const STANDARDS_SECTION = {
  eyebrow: "What you receive",
  headline: "Every opportunity includes",
  productsHeadline: "Life insurance lines we support",
  productsBody:
    "Screening aligns with the products you sell — from final expense through permanent and IUL.",
  geoNote: "Serving independent agents and advisors in all 50 states.",
} as const;

export const PRODUCTS = [
  "Final Expense",
  "Term Life",
  "Mortgage Protection",
  "Permanent Life",
  "IUL",
  "Whole Life",
] as const;

export const WHO_SECTION = {
  id: "fit",
  eyebrow: "Who it's for",
  headline: "Established producers ready for the next level",
  body: "This is a strong fit if you have a working sales process, value your time, and want a professional acquisition partner — not a commodity lead vendor.",
  traits: [
    "You follow up consistently and close what you work",
    "You want more volume without sacrificing quality",
    "Referrals work, but you need something more predictable",
    "You evaluate partners on clarity and long-term fit",
  ],
  callNote:
    "On a strategy call we review your markets, goals, and production math together. No pressure — just alignment.",
} as const;

export const FORECAST_CTA = {
  eyebrow: "Before you commit",
  headline: "Run your own numbers first",
  body: "Use the growth forecast tool to model revenue, profit, and break-even from your actual inputs. It's a straightforward way to see if the channel fits your plan.",
  button: "Open Growth Forecast",
  link: "Try the model →",
} as const;

export const FINAL_CTA = {
  eyebrow: "Next step",
  headline: "See if this fits your plan",
  body: "Book a short strategy call. We'll walk through your goals and outline how Lion Marketing could support your pipeline.",
  button: BOOKING_CTA,
} as const;

export const FAQ_SECTION = {
  eyebrow: "FAQ",
  headline: "Questions we hear often",
} as const;

export const FAQ_ITEMS = [
  {
    q: "Does this replace my referrals or marketing?",
    a: "No. Lion Marketing is designed to complement what already works. Most producers use it to smooth out the gaps between referral cycles.",
  },
  {
    q: "Are opportunities exclusive?",
    a: "Yes. Each prospect goes to one producer only. We don't share or resell the same lead.",
  },
  {
    q: "Are these appointments or live transfers?",
    a: "No. You receive the opportunity in real time and contact the prospect on your schedule, using your process.",
  },
  {
    q: "How is pricing structured?",
    a: "Pay-per-opportunity pricing depends on product, targeting, state, and volume. We cover specifics on your strategy call once we understand your goals.",
  },
  {
    q: "What results should I expect?",
    a: "Outcomes depend on your follow-up speed, product mix, and market. We focus on intent and data quality — you control the rest.",
  },
  {
    q: "Do you work in my state?",
    a: "Yes. We serve producers nationwide and confirm state availability during your strategy call.",
  },
] as const;

export const FOOTER = {
  blurb:
    "Structured client acquisition for established insurance producers and advisors.",
} as const;

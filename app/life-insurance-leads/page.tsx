import type { Metadata } from "next";
import { PillarPage, type PillarPageData } from "../components/pillar-page";

export const metadata: Metadata = {
  title: "Life Insurance Leads for Agents | Lion Marketing",
  description: "A practical guide to buying life insurance leads: lead types, exclusivity, verification, pricing variables, delivery, and follow-up for agents and teams.",
  alternates: { canonical: "https://lionmarketingai.com/life-insurance-leads" },
  openGraph: {
    title: "Life Insurance Leads for Agents | Lion Marketing",
    description: "Understand how life insurance leads are generated, screened, delivered, priced, and worked.",
    url: "https://lionmarketingai.com/life-insurance-leads",
  },
};

const data: PillarPageData = {
  slug: "life-insurance-leads",
  eyebrow: "A practical buyer’s guide",
  title: "Life Insurance Leads for Agents",
  intro: "Life insurance leads connect agents with consumers who have asked for information about coverage. The right lead source should fit your product, licensed states, team capacity, and follow-up process—not force your team into a generic campaign.",
  shortAnswer: "Lion Marketing leads are prequalified against the minimum criteria agreed for each campaign. Prospects who do not meet those requirements are filtered out before delivery. Campaign qualification does not mean carrier approval or a guaranteed sale.",
  keyPoints: [
    "Match the campaign to the product you sell",
    "Know whether each lead is shared or exclusive",
    "Confirm how identity and phone data are checked",
    "Buy only the volume your team can contact quickly",
  ],
  sections: [
    {
      kicker: "Start with the model",
      title: "What are life insurance leads?",
      paragraphs: [
        "Life insurance leads are contact records from people who have expressed interest in learning about a policy. Depending on the campaign, the consumer may have answered questions about age, location, coverage goals, product interest, or other eligibility factors before submitting a request.",
        "The lead gives an agent a relevant reason to begin a conversation. It does not mean the consumer has completed underwriting, agreed to an appointment, or committed to buying. That distinction matters because lead generation and sales conversion are two separate parts of the process.",
      ],
      bullets: [
        "Raw leads provide contact information and form answers for agent follow-up.",
        "Live transfers connect an available consumer directly to an agent by phone.",
        "Appointments include a scheduled meeting but usually cost more and can still no-show.",
      ],
    },
    {
      kicker: "Evaluate quality",
      title: "What should agents look for in a lead provider?",
      paragraphs: [
        "Useful quality standards are specific and observable. Lion Marketing agrees on minimum campaign criteria before launch, applies those questions to each inquiry, and filters out prospects who do not meet the standard before delivery. Agents should also understand how phone numbers are checked, how quickly records are delivered, and whether the same inquiry is sold to other agents.",
        "Also ask how invalid data is handled. A fair replacement policy should define objective issues such as disconnected numbers, duplicate records, or information that falls outside the campaign criteria. A lead should not be judged solely by whether an agent closes it, because contact strategy, speed, persistence, licensing, underwriting, and sales skill all affect the outcome.",
      ],
      bullets: [
        "Documented targeting and screening criteria",
        "Clear shared-versus-exclusive delivery terms",
        "Transparent pricing and volume expectations",
        "Objective lead-validity and replacement rules",
      ],
    },
    {
      kicker: "Plan the economics",
      title: "How life insurance lead pricing works",
      paragraphs: [
        "Life insurance lead prices vary because not every campaign targets the same consumer or asks the same questions. Product category, geography, age range, exclusivity, screening depth, traffic costs, and available volume can all affect the price of a lead.",
        "Cost per lead is only one input. Agents should also track contact rate, quote rate, application rate, placement rate, revenue, and the time required to work each record. A cheaper lead can become expensive if poor data consumes agent hours; a higher-priced lead can still underperform when follow-up is slow or inconsistent.",
      ],
    },
    {
      kicker: "Turn demand into production",
      title: "A simple follow-up system beats a complicated promise",
      paragraphs: [
        "Fresh inquiries are most useful when an agent can respond quickly, clearly identify the request, and continue following up across more than one attempt. Teams should assign ownership, establish contact windows, use compliant calling and texting practices, and record outcomes consistently.",
        "Lion Marketing helps agents shape lead flow around the products and states they want to grow. Leads are delivered in real time, one agent at a time, with product-fit questions and phone verification. Your team keeps control of the dialer, script, sales process, and final recommendation.",
      ],
      bullets: [
        "Route every new lead to a named owner",
        "Respond while the consumer’s request is still fresh",
        "Use a repeatable multi-touch follow-up cadence",
        "Review outcomes by campaign, product, and state",
      ],
    },
  ],
  faqs: [
    { question: "How many life insurance leads should a new agent buy?", answer: "Start with a volume you can contact quickly and follow up consistently. The right number depends on your schedule, contact cadence, close rate, and cash flow. A smaller, fully worked test is usually more informative than buying a large batch your process cannot absorb." },
    { question: "Are life insurance leads guaranteed to convert?", answer: "No. A lead represents consumer interest and usable contact data, not a guaranteed conversation, application, or policy. Conversion also depends on speed, persistence, product fit, underwriting, sales skill, and market conditions." },
    { question: "What is the difference between shared and exclusive life insurance leads?", answer: "A shared lead may be sold to several agents, creating immediate competition. An exclusive lead is delivered to one buyer only. Exclusivity reduces vendor-created competition but does not prevent a consumer from researching elsewhere." },
    { question: "Does Lion Marketing sell life insurance leads nationwide?", answer: "Availability varies by product, state, targeting criteria, and current consumer demand. Lion Marketing reviews your licensed states and volume goals before confirming campaign fit and pricing." },
  ],
};

export default function LifeInsuranceLeadsPage() {
  return <PillarPage data={data} />;
}

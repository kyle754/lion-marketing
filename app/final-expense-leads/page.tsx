import { PillarPage, type PillarPageData } from "../components/pillar-page";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Final Expense Leads for Agents | Lion Marketing",
  description: "A practical guide to final expense leads: campaign targeting, prospect screening, phone verification, real-time delivery, pricing, and follow-up.",
  pathname: "/final-expense-leads",
  socialDescription: "Understand how final expense leads are generated, screened, delivered, and worked.",
});

const data: PillarPageData = {
  slug: "final-expense-leads",
  eyebrow: "For final expense producers",
  title: "Final Expense Leads for Agents",
  intro: "Final expense leads come from consumers who request information about life insurance intended to help cover funeral costs, burial expenses, and other end-of-life bills. A useful campaign aligns the inquiry with your states, sales process, and underwriting market.",
  shortAnswer: "A final expense lead is prequalified against agreed campaign criteria before delivery. That means the prospect meets the minimum requirements for the campaign—not that a carrier has completed underwriting or approved a policy.",
  keyPoints: [
    "Consumer interest tied to final expense coverage",
    "Campaign criteria aligned before launch",
    "Verified phone and completed screening answers",
    "Exclusive delivery to one agent in real time",
  ],
  sections: [
    {
      kicker: "Know the audience",
      title: "What are final expense leads?",
      paragraphs: [
        "Final expense leads are inquiries from consumers exploring a smaller life insurance policy designed to help loved ones handle funeral, burial, medical, or related end-of-life costs. The campaign may collect age, state, desired coverage, tobacco use, current insurance, or other answers relevant to the products an agent represents.",
        "Those answers help an agent begin a more relevant conversation, but they are not underwriting approval. The carrier determines eligibility, price, and coverage after the application and underwriting process.",
      ],
    },
    {
      kicker: "Build the campaign",
      title: "How final expense leads are generated and screened",
      paragraphs: [
        "A consumer typically encounters an online message about final expense coverage, visits a form, reviews the request, and submits contact details with consent to be contacted. Product-specific questions test the agreed minimum criteria, and inquiries that do not meet them are filtered out before delivery.",
        "Phone verification adds another checkpoint. Requiring a one-time passcode helps reduce typing errors and low-effort fake submissions, although no verification method can guarantee that every prospect will answer or ultimately qualify.",
      ],
      bullets: [
        "Product-focused consumer message and request form",
        "Required contact, age, state, and coverage fields",
        "Questions selected for the campaign and market",
        "Phone confirmation before the inquiry is accepted",
      ],
    },
    {
      kicker: "Assess the offer",
      title: "What determines final expense lead cost and fit?",
      paragraphs: [
        "Pricing can change with state, age criteria, available demand, exclusivity, verification, screening depth, and volume. The most useful comparison is not the headline cost alone; it is the relationship between lead cost, contact rate, application rate, placement, agent time, and expected commission economics.",
        "Fit also depends on operations. A campaign can produce valid demand and still struggle when leads wait too long for a call, move between agents without ownership, or receive only one contact attempt. Before increasing volume, make sure your team can consistently work the volume it already receives.",
      ],
    },
    {
      kicker: "Create a repeatable motion",
      title: "How agents should follow up with final expense prospects",
      paragraphs: [
        "Open by reconnecting the consumer to the request they made and the reason they were exploring coverage. Use their submitted answers as context, then complete your normal fact-finding, suitability, and carrier-specific process. Keep the language simple and avoid implying approval before underwriting.",
        "Lion Marketing works with final expense agents and teams to align lead criteria, target states, and available volume before launch. Each accepted inquiry is delivered exclusively in real time so the agent can begin follow-up while the request is still recent.",
      ],
      bullets: [
        "Reference the consumer’s recent coverage request",
        "Confirm needs and information instead of assuming eligibility",
        "Use a consistent call, text, and voicemail cadence where permitted",
        "Track contact, quote, application, and placement outcomes",
      ],
    },
  ],
  faqs: [
    { question: "Are final expense leads prequalified?", answer: "Yes—to the minimum criteria agreed for the campaign. Prospects who do not meet those requirements are filtered out before delivery. This campaign qualification is not carrier underwriting, policy approval, or a guarantee that a policy will be issued." },
    { question: "Are Lion Marketing final expense leads exclusive?", answer: "Yes. Each accepted lead is delivered to one agent only. Lion Marketing does not resell the same accepted record to multiple agents." },
    { question: "What information comes with a final expense lead?", answer: "A valid lead includes the consumer’s name, verified U.S. phone number, email, age, state, consent timestamp, and completed campaign screening answers." },
    { question: "Which states are available for final expense leads?", answer: "Availability changes with targeting, current consumer demand, and campaign criteria. Lion Marketing reviews your licensed states and desired volume before confirming fit and pricing." },
  ],
};

export default function FinalExpenseLeadsPage() {
  return <PillarPage data={data} />;
}

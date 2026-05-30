import { Accordion } from "@/components/ui/Accordion";
import type { AccordionItem } from "@/components/ui/Accordion";

const faqItems: AccordionItem[] = [
  {
    question: "Are these appointments or live transfers?",
    answer:
      "These are pay-per-lead, not appointments or live transfers. You receive the lead information and contact the prospect directly on your own schedule.",
  },
  {
    question: "Are the leads exclusive?",
    answer:
      "Yes. Leads are delivered exclusively to you. Each prospect is sent to one agent or team, not resold or shared.",
  },
  {
    question: "How are phone numbers verified?",
    answer:
      "Prospects confirm their phone number using a one-time passcode sent to that number during the form flow. This helps eliminate fake numbers, typos, and automated submissions.",
  },
  {
    question: 'What does "screened" mean?',
    answer:
      "Prospects complete basic eligibility questions (e.g., age range, general health context, coverage interest) before the lead is delivered. The form is also designed to reduce accidental or low-effort submissions.",
  },
  {
    question: "Do you guarantee sales or conversions?",
    answer:
      "No. Sales outcomes depend on many factors. We focus on lead quality—complete, verified information—not sales results. The goal is better inputs, not perfect outcomes.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-content">
        <h2 className="mb-10 text-2xl font-medium tracking-tight text-off-white md:text-3xl">
          FAQ
        </h2>
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}

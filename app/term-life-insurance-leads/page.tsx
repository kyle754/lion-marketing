import type { Metadata } from "next";
import { PillarPage } from "../components/pillar-page";
import { termLifeLeadsData } from "../lib/product-page-data";

export const metadata: Metadata = {
  title: "Term Life Insurance Leads for Agents | Lion Marketing",
  description: "A practical guide to term life insurance leads: consumer intent, campaign screening, phone verification, exclusive delivery, pricing, and follow-up.",
  alternates: { canonical: "https://lionmarketingai.com/term-life-insurance-leads" },
  openGraph: { title: "Term Life Insurance Leads for Agents | Lion Marketing", description: "Understand how term life leads are generated, screened, delivered, and worked.", url: "https://lionmarketingai.com/term-life-insurance-leads" },
};

export default function TermLifeLeadsPage() { return <PillarPage data={termLifeLeadsData} />; }

import type { Metadata } from "next";
import { PillarPage } from "../components/pillar-page";
import { mortgageProtectionLeadsData } from "../lib/product-page-data";

export const metadata: Metadata = {
  title: "Mortgage Protection Leads for Agents | Lion Marketing",
  description: "A practical guide to mortgage protection leads: homeowner intent, campaign screening, phone verification, exclusive delivery, and agent follow-up.",
  alternates: { canonical: "https://lionmarketingai.com/mortgage-protection-leads" },
  openGraph: { title: "Mortgage Protection Leads for Agents | Lion Marketing", description: "Understand how mortgage protection leads are generated, screened, delivered, and worked.", url: "https://lionmarketingai.com/mortgage-protection-leads" },
};

export default function MortgageProtectionLeadsPage() { return <PillarPage data={mortgageProtectionLeadsData} />; }

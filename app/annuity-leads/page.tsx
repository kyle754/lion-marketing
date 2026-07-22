import type { Metadata } from "next";
import { PillarPage } from "../components/pillar-page";
import { annuityLeadsData } from "../lib/product-page-data";

export const metadata: Metadata = {
  title: "Annuity Leads for Agents | Lion Marketing",
  description: "A practical guide to annuity leads: retirement-focused consumer intent, campaign screening, phone verification, exclusive delivery, and agent follow-up.",
  alternates: { canonical: "https://lionmarketingai.com/annuity-leads" },
  openGraph: { title: "Annuity Leads for Agents | Lion Marketing", description: "Understand how annuity leads are generated, screened, delivered, and worked.", url: "https://lionmarketingai.com/annuity-leads" },
};

export default function AnnuityLeadsPage() { return <PillarPage data={annuityLeadsData} />; }

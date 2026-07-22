import type { Metadata } from "next";
import { PillarPage } from "../components/pillar-page";
import { wholeLifeLeadsData } from "../lib/product-page-data";

export const metadata: Metadata = {
  title: "Whole Life Insurance Leads for Agents | Lion Marketing",
  description: "A practical guide to whole life insurance leads: permanent coverage intent, screening, verification, exclusive delivery, and agent follow-up.",
  alternates: { canonical: "https://lionmarketingai.com/whole-life-insurance-leads" },
  openGraph: { title: "Whole Life Insurance Leads for Agents | Lion Marketing", description: "Understand how whole life leads are generated, screened, delivered, and worked.", url: "https://lionmarketingai.com/whole-life-insurance-leads" },
};

export default function WholeLifeLeadsPage() { return <PillarPage data={wholeLifeLeadsData} />; }

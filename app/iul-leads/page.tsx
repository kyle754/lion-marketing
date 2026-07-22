import type { Metadata } from "next";
import { PillarPage } from "../components/pillar-page";
import { iulLeadsData } from "../lib/product-page-data";

export const metadata: Metadata = {
  title: "IUL Leads for Agents | Lion Marketing",
  description: "A practical guide to IUL leads: indexed universal life consumer intent, screening, verification, exclusive delivery, and compliant follow-up.",
  alternates: { canonical: "https://lionmarketingai.com/iul-leads" },
  openGraph: { title: "IUL Leads for Agents | Lion Marketing", description: "Understand how indexed universal life leads are generated, screened, delivered, and worked.", url: "https://lionmarketingai.com/iul-leads" },
};

export default function IulLeadsPage() { return <PillarPage data={iulLeadsData} />; }

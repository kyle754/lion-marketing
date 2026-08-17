import { PillarPage } from "../components/pillar-page";
import { termLifeLeadsData } from "../lib/product-page-data";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Exclusive Term Life Insurance Leads for Agents | Lion Marketing",
  description: "Exclusive term life insurance leads for agents, with campaign screening, phone verification, real-time delivery, pricing context, and practical follow-up guidance.",
  pathname: "/term-life-insurance-leads",
  socialDescription: "Understand how exclusive term life leads are generated, screened, delivered, and worked.",
});

export default function TermLifeLeadsPage() { return <PillarPage data={termLifeLeadsData} />; }

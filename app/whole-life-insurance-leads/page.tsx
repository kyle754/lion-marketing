import { PillarPage } from "../components/pillar-page";
import { wholeLifeLeadsData } from "../lib/product-page-data";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Whole Life Insurance Leads for Agents | Lion Marketing",
  description: "A practical guide to whole life insurance leads: permanent coverage intent, screening, verification, exclusive delivery, and agent follow-up.",
  pathname: "/whole-life-insurance-leads",
  socialDescription: "Understand how whole life leads are generated, screened, delivered, and worked.",
});

export default function WholeLifeLeadsPage() { return <PillarPage data={wholeLifeLeadsData} />; }

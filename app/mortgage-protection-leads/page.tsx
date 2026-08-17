import { PillarPage } from "../components/pillar-page";
import { mortgageProtectionLeadsData } from "../lib/product-page-data";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Mortgage Protection Leads for Agents | Lion Marketing",
  description: "A practical guide to mortgage protection leads: homeowner intent, campaign screening, phone verification, exclusive delivery, and agent follow-up.",
  pathname: "/mortgage-protection-leads",
  socialDescription: "Understand how mortgage protection leads are generated, screened, delivered, and worked.",
});

export default function MortgageProtectionLeadsPage() { return <PillarPage data={mortgageProtectionLeadsData} />; }

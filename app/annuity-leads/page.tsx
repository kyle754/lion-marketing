import { PillarPage } from "../components/pillar-page";
import { annuityLeadsData } from "../lib/product-page-data";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Annuity Leads for Agents | Lion Marketing",
  description: "A practical guide to annuity leads: retirement-focused consumer intent, campaign screening, phone verification, exclusive delivery, and agent follow-up.",
  pathname: "/annuity-leads",
  socialDescription: "Understand how annuity leads are generated, screened, delivered, and worked.",
});

export default function AnnuityLeadsPage() { return <PillarPage data={annuityLeadsData} />; }

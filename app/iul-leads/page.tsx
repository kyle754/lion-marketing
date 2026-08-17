import { PillarPage } from "../components/pillar-page";
import { iulLeadsData } from "../lib/product-page-data";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "IUL Leads for Agents | Lion Marketing",
  description: "A practical guide to IUL leads: indexed universal life consumer intent, screening, verification, exclusive delivery, and compliant follow-up.",
  pathname: "/iul-leads",
  socialDescription: "Understand how indexed universal life leads are generated, screened, delivered, and worked.",
});

export default function IulLeadsPage() { return <PillarPage data={iulLeadsData} />; }

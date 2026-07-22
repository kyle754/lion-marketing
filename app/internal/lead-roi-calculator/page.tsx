import type { Metadata } from "next";
import { LeadRoiCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "Lead ROI Calculator | Lion Marketing Internal",
  description: "Internal Lion Marketing lead package forecast tool.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function LeadRoiCalculatorPage() {
  return <LeadRoiCalculator />;
}

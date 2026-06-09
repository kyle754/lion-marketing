import { AdditiveSection } from "@/components/site/AdditiveSection";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { FitSection } from "@/components/site/FitSection";
import { ForecastCTA } from "@/components/site/ForecastCTA";
import { GrowthSection } from "@/components/site/GrowthSection";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";

export default function Home() {
  return (
    <main>
      <Hero />
      <GrowthSection />
      <AdditiveSection />
      <HowItWorks />
      <FitSection />
      <ForecastCTA />
      <FAQ />
      <FinalCTA />
    </main>
  );
}

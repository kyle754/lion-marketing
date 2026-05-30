import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-content text-center">
        <h2 className="mb-4 text-2xl font-medium tracking-tight text-off-white md:text-3xl">
          Want to See If This Fits How You Sell?
        </h2>
        <p className="mx-auto mb-8 max-w-[600px] text-body-gray text-[17px] leading-relaxed">
          If you're currently buying life insurance leads and want to understand whether this model fits your
          sales process, we can walk through it.
        </p>
        <Button href="#calendar">See If This Is a Fit</Button>
        <p className="mt-3 text-sm text-body-gray">Quick call. Straight answers.</p>
      </div>
    </section>
  );
}

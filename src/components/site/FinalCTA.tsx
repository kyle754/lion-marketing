import { FINAL_CTA, SITE } from "@/config/site";
import { Reveal } from "./motion/Reveal";
import { Button } from "./Button";

export function FinalCTA() {
  return (
    <section
      id="book"
      className="relative scroll-mt-20 overflow-hidden bg-forecast-text py-16 text-forecast-bg md:py-24"
    >
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative mx-auto max-w-content px-4 text-center md:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {FINAL_CTA.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            {FINAL_CTA.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-forecast-bg/80">{FINAL_CTA.body}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={SITE.bookingUrl}
              external
              className="min-w-[240px] bg-gold text-charcoal-dark hover:bg-gold-hover"
            >
              {FINAL_CTA.button}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

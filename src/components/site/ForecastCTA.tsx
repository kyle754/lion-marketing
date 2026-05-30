import Link from "next/link";
import { FORECAST_CTA } from "@/config/site";
import { ForecastSparkGraphic } from "./graphics/SiteGraphics";
import { Reveal } from "./motion/Reveal";
import { Button } from "./Button";

export function ForecastCTA() {
  return (
    <section className="relative overflow-hidden border-b border-forecast-border bg-gradient-to-br from-gold/10 via-forecast-surface to-forecast-bg py-16 md:py-20">
      <div className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />

      <div className="mx-auto max-w-content px-4 md:px-6">
        <div className="grid items-center gap-6 overflow-hidden rounded-2xl border border-gold/25 bg-forecast-surface shadow-forecast-lg md:grid-cols-[1fr_1.05fr] md:gap-8">
          <Reveal className="order-2 px-5 py-6 md:order-1 md:p-10">
            <div className="mx-auto w-full max-w-md md:max-w-none">
              <ForecastSparkGraphic className="min-h-[160px] md:min-h-0" />
            </div>
          </Reveal>

          <Reveal delay={90} className="order-1 px-5 py-6 md:order-2 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {FORECAST_CTA.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-forecast-text md:text-3xl">
              {FORECAST_CTA.headline}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-forecast-muted md:text-base">
              {FORECAST_CTA.body}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/forecast">{FORECAST_CTA.button}</Button>
              <Link
                href="/forecast"
                className="text-sm font-medium text-gold hover:underline"
              >
                {FORECAST_CTA.link}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

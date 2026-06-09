import { HERO, SITE, TRUST_ITEMS } from "@/config/site";
import { PipelineFlowGraphic } from "./graphics/SiteGraphics";
import { Reveal, RevealStagger } from "./motion/Reveal";
import { Button } from "./Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-forecast-border bg-gradient-to-b from-forecast-surface via-forecast-elevated to-forecast-bg">
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -left-16 bottom-12 h-56 w-56 rounded-full bg-gold/5 blur-2xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mesh-glow"
        aria-hidden
      />

      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 md:gap-12 md:px-6 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <div className="max-w-hero-copy">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {HERO.eyebrow}
            </p>
            <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-forecast-text md:text-5xl lg:text-[3.1rem]">
              {HERO.headline}{" "}
              <span className="bg-gradient-to-r from-gold via-gold-hover to-gold bg-clip-text text-transparent">
                {HERO.headlineAccent}
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-forecast-muted">
              {HERO.subhead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={SITE.bookingUrl} external>
                {HERO.ctaPrimary}
              </Button>
              <Button href="/forecast" variant="secondary">
                {HERO.ctaSecondary}
              </Button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-forecast-muted">
              {HERO.footnote}
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-2xl border border-forecast-border bg-forecast-surface p-4 shadow-forecast-lg sm:p-5 md:p-6">
            <div className="mb-3 flex items-center justify-end gap-3 sm:absolute sm:right-4 sm:top-4 sm:mb-0">
              <span className="shrink-0 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
                Live flow
              </span>
            </div>
            <PipelineFlowGraphic className="mt-1 sm:mt-2" />
          </div>
        </Reveal>
      </div>

      <div className="border-t border-forecast-border bg-forecast-surface/80 backdrop-blur-sm">
        <RevealStagger
          className="mx-auto grid max-w-content grid-cols-2 gap-3 px-4 py-5 md:grid-cols-4 md:gap-4 md:px-6"
          staggerMs={70}
        >
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-transparent px-3 py-2.5 text-center transition-colors hover:border-forecast-border hover:bg-forecast-bg md:text-left"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-forecast-text">
                {item.label}
              </p>
              <p className="mt-1 text-xs text-forecast-muted">{item.detail}</p>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

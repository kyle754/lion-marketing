import { GROWTH_SECTION } from "@/config/site";
import { GrowthWaveGraphic } from "./graphics/SiteGraphics";
import { Reveal, RevealStagger } from "./motion/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

export function GrowthSection() {
  return (
    <section
      id={GROWTH_SECTION.id}
      className="scroll-mt-20 border-b border-forecast-border bg-forecast-bg py-16 md:py-24"
    >
      <div className="mx-auto max-w-content px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <SectionHeader
              eyebrow={GROWTH_SECTION.eyebrow}
              title={
                <>
                  {GROWTH_SECTION.headline}
                  <span className="mt-2 block text-forecast-muted">
                    {GROWTH_SECTION.headlineLine2}
                  </span>
                </>
              }
              description={GROWTH_SECTION.body}
            />
          </Reveal>

          <Reveal delay={100} className="w-full">
            <GrowthWaveGraphic />
          </Reveal>
        </div>

        <RevealStagger
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2"
          staggerMs={90}
        >
          {GROWTH_SECTION.contrasts.map((col, colIndex) => (
            <div
              key={col.label}
              className={`rounded-2xl p-6 md:p-7 card-lift ${
                colIndex === 0
                  ? "border border-dashed border-forecast-border bg-forecast-surface/70"
                  : "border border-forecast-text/10 bg-forecast-text text-forecast-bg shadow-forecast-lg"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wider ${
                  colIndex === 0 ? "text-forecast-muted" : "text-gold"
                }`}
              >
                {col.label}
              </p>
              <div className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <div
                    key={item}
                    className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                      colIndex === 0
                        ? "bg-forecast-bg text-forecast-text"
                        : "bg-white/5 text-forecast-bg/90"
                    }`}
                  >
                    {colIndex === 0 ? (
                      <span className="mr-2 text-forecast-muted/40">·</span>
                    ) : (
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle" />
                    )}
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

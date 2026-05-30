import { LEAD_STANDARDS, PRODUCTS, STANDARDS_SECTION } from "@/config/site";
import {
  IconCheck,
  IconDocument,
  IconShield,
  IconUser,
} from "./graphics/SiteGraphics";
import { Reveal, RevealStagger } from "./motion/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const standardIcons = [IconUser, IconShield, IconDocument, IconCheck];

export function Standards() {
  return (
    <section
      id="standards"
      className="scroll-mt-20 border-b border-forecast-border bg-forecast-bg py-16 md:py-24"
    >
      <div className="mx-auto max-w-content px-4 md:px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <SectionHeader
                eyebrow={STANDARDS_SECTION.eyebrow}
                title={STANDARDS_SECTION.headline}
                description={STANDARDS_SECTION.body}
              />
            </Reveal>

            <RevealStagger
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
              staggerMs={75}
            >
              {LEAD_STANDARDS.map((item, i) => {
                const Icon = standardIcons[i] ?? IconCheck;
                return (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-forecast-border bg-forecast-surface p-4 shadow-sm card-lift"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                      <Icon />
                    </span>
                    <p className="text-sm leading-snug text-forecast-text">{item}</p>
                  </div>
                );
              })}
            </RevealStagger>
          </div>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-forecast-border bg-forecast-surface p-6 shadow-forecast-lg md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Products supported
              </p>
              <h3 className="mt-3 text-2xl font-bold text-forecast-text">
                {STANDARDS_SECTION.productsHeadline}
              </h3>
              <p className="mt-3 text-sm text-forecast-muted">
                {STANDARDS_SECTION.productsBody}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
                {PRODUCTS.map((product) => (
                  <span
                    key={product}
                    className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-forecast-border bg-forecast-bg px-4 py-2 text-center text-sm font-medium leading-tight text-forecast-text shadow-sm transition-colors hover:border-gold/30 hover:bg-forecast-elevated"
                  >
                    {product}
                  </span>
                ))}
              </div>

              <p className="mt-8 rounded-xl bg-forecast-bg px-4 py-3 text-center text-xs text-forecast-muted">
                {STANDARDS_SECTION.geoNote}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

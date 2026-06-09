import {
  LEAD_STANDARDS,
  PROCESS_SECTION,
  PROCESS_STEPS,
  PRODUCTS,
  STANDARDS_SECTION,
} from "@/config/site";
import {
  IconCheck,
  IconDocument,
  IconShield,
  IconUser,
  ProcessIcons,
} from "./graphics/SiteGraphics";
import { Reveal, RevealStagger } from "./motion/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const standardIcons = [IconUser, IconShield, IconDocument, IconCheck];

export function HowItWorks() {
  return (
    <section
      id="process"
      className="scroll-mt-20 border-b border-forecast-border bg-forecast-bg py-16 md:py-24"
    >
      <div className="mx-auto max-w-content px-4 md:px-6">
        <Reveal>
          <SectionHeader
            eyebrow={PROCESS_SECTION.eyebrow}
            title={PROCESS_SECTION.headline}
            description={PROCESS_SECTION.subhead}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        {/* Desktop: horizontal timeline */}
        <div className="relative mt-16 hidden lg:block">
          <div
            className="absolute left-[12.5%] right-[12.5%] top-[2.75rem] h-px bg-gradient-to-r from-forecast-border via-gold/50 to-forecast-border"
            aria-hidden
          />
          <RevealStagger className="grid grid-cols-4 gap-6" staggerMs={110}>
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-forecast-border bg-forecast-surface text-gold shadow-forecast card-lift">
                  <ProcessIcons step={step.step} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-forecast-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-forecast-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </RevealStagger>
        </div>

        {/* Mobile: numbered step cards for easier scanning */}
        <RevealStagger className="mt-12 space-y-4 lg:hidden" staggerMs={90}>
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.step}
              className="relative flex gap-4 rounded-2xl border border-forecast-border bg-forecast-surface p-5 shadow-forecast card-lift"
            >
              {index < PROCESS_STEPS.length - 1 && (
                <span
                  className="absolute bottom-0 left-9 top-[4.5rem] w-px bg-forecast-border"
                  aria-hidden
                />
              )}
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-forecast-text text-gold">
                <span className="text-[9px] font-semibold uppercase leading-none opacity-80">
                  Step
                </span>
                <span className="text-sm font-bold leading-none">
                  {index + 1}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-forecast-text">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-forecast-muted">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </RevealStagger>

        {/* Lead standards + products (merged from former Standards section) */}
        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <SectionHeader
                eyebrow={STANDARDS_SECTION.eyebrow}
                title={STANDARDS_SECTION.headline}
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

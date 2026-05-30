import { PROCESS_SECTION, PROCESS_STEPS } from "@/config/site";
import { ProcessIcons } from "./graphics/SiteGraphics";
import { Reveal, RevealStagger } from "./motion/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

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
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forecast-text text-gold">
                <ProcessIcons step={step.step} />
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
      </div>
    </section>
  );
}

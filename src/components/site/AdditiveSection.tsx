import { ADDITIVE_SECTION } from "@/config/site";
import {
  GrowthChannelMobileStack,
  GrowthChannelVennGraphic,
  IconBarChart,
  IconConversation,
  IconNetwork,
} from "./graphics/SiteGraphics";
import { Reveal, RevealStagger } from "./motion/Reveal";

const benefitIcons = {
  conversation: IconConversation,
  network: IconNetwork,
  growth: IconBarChart,
} as const;

export function AdditiveSection() {
  return (
    <section className="relative overflow-hidden border-b border-forecast-border bg-[#FCFBF7] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-content px-4 md:px-6">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {ADDITIVE_SECTION.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-forecast-text md:text-4xl md:leading-tight">
              {ADDITIVE_SECTION.headline}{" "}
              <span className="text-gold">{ADDITIVE_SECTION.headlineAccent}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-forecast-muted">
              {ADDITIVE_SECTION.body}
            </p>
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-10 md:mt-14">
          <GrowthChannelMobileStack className="md:hidden" />
          <GrowthChannelVennGraphic className="hidden md:block" />
        </Reveal>

        <RevealStagger
          className="mx-auto mt-10 grid max-w-5xl gap-4 md:mt-14 md:grid-cols-3 md:gap-6"
          staggerMs={90}
        >
          {ADDITIVE_SECTION.benefits.map((benefit) => {
            const Icon = benefitIcons[benefit.icon];

            return (
              <article
                key={benefit.title}
                className="flex flex-col items-center rounded-2xl border border-forecast-border/80 bg-forecast-surface px-5 py-7 text-center shadow-forecast card-lift md:px-6 md:py-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-forecast-text md:mt-5">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-forecast-muted">
                  {benefit.body}
                </p>
              </article>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}

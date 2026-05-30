import { OUTCOMES, OUTCOMES_SECTION } from "@/config/site";
import {
  IconConversation,
  IconMomentum,
  IconPipeline,
  IconTime,
} from "./graphics/SiteGraphics";
import { Reveal, RevealStagger } from "./motion/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const outcomeIcons = [
  IconConversation,
  IconPipeline,
  IconTime,
  IconMomentum,
] as const;

export function Outcomes() {
  return (
    <section className="border-b border-forecast-border bg-forecast-surface py-16 md:py-24">
      <div className="mx-auto max-w-content px-4 md:px-6">
        <Reveal>
          <SectionHeader
            eyebrow={OUTCOMES_SECTION.eyebrow}
            title={OUTCOMES_SECTION.headline}
            description={OUTCOMES_SECTION.subhead}
          />
        </Reveal>

        <RevealStagger
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-[auto_auto_auto] md:gap-5"
          staggerMs={85}
        >
          {OUTCOMES.map((item, i) => {
            const Icon = outcomeIcons[i];
            const isFeatured = i === 0;
            const isWide = i === 3;

            return (
              <article
                key={item.title}
                className={[
                  "flex flex-col rounded-2xl border border-forecast-border bg-[#F5F2EA] p-6 shadow-forecast card-lift md:p-7",
                  isFeatured ? "md:row-span-2" : "",
                  isWide ? "md:col-span-2" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-forecast-border/60 bg-forecast-surface text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-forecast-text">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-forecast-muted">
                  {item.body}
                </p>
              </article>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}

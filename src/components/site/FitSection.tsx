import { WHO_SECTION } from "@/config/site";
import { Reveal, RevealStagger } from "./motion/Reveal";

export function FitSection() {
  return (
    <section
      id={WHO_SECTION.id}
      className="scroll-mt-20 border-b border-forecast-border bg-forecast-surface py-16 md:py-24"
    >
      <div className="mx-auto max-w-content px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {WHO_SECTION.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-forecast-text md:text-4xl">
              {WHO_SECTION.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-forecast-muted">
              {WHO_SECTION.body}
            </p>
            <blockquote className="mt-8 border-l-2 border-gold pl-5 text-sm italic leading-relaxed text-forecast-muted">
              {WHO_SECTION.callNote}
            </blockquote>
          </Reveal>

          <RevealStagger
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4"
            staggerMs={95}
          >
            {WHO_SECTION.traits.map((item) => (
              <figure
                key={item}
                className="flex h-full min-h-[5.5rem] items-center rounded-2xl border border-forecast-border bg-[#F5F2EA] p-5 shadow-sm card-lift"
              >
                <figcaption className="text-sm leading-relaxed text-forecast-text">
                  {item}
                </figcaption>
              </figure>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}

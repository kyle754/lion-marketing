import { CALENDAR_EMBED_HTML } from "@/config/calendar";

type CalendarEmbedProps = {
  embedHtml?: string | null;
};

export function CalendarEmbed({ embedHtml }: CalendarEmbedProps) {
  const html = embedHtml ?? CALENDAR_EMBED_HTML;
  const hasEmbed = html && !html.includes("Paste your Calendly");

  return (
    <section id="calendar" className="scroll-mt-20 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-content">
        {hasEmbed ? (
          <div
            className="calendar-embed min-h-[400px] w-full"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-lg border border-charcoal-card/60 bg-charcoal-card/30 py-16 text-center">
            <p className="mb-2 text-body-gray">Calendar will be embedded here</p>
            <p className="text-body-gray/80 text-sm">
              Add your embed code to <code className="rounded bg-charcoal-medium px-1.5 py-0.5 text-[13px]">src/config/calendar.ts</code> (CALENDAR_EMBED_HTML)
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

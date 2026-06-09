const CHECKLIST = [
  "Contact new leads quickly",
  "Make multiple follow-up attempts",
  "Track appointments, shows, and sales",
  "Use a clear script or appointment-setting process",
  "Have enough capacity to work the leads during the pacing window",
] as const;

export function SuccessChecklist() {
  return (
    <section className="rounded-xl border border-forecast-border bg-forecast-surface p-6 shadow-forecast">
      <h3 className="text-base font-semibold text-forecast-text">
        What Has to Happen on Your Side
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-forecast-muted">
        The best results usually come when leads are worked quickly,
        consistently, and with a clear sales process.
      </p>
      <ul className="mt-5 space-y-3">
        {CHECKLIST.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-forecast-text">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-xs text-gold"
              aria-hidden
            >
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

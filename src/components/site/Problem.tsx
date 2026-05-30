export function Problem() {
  const pains = [
    "40% of “exclusive” leads never answer",
    "Prospects who don’t remember opting in",
    "Obvious disqualifications wasting your afternoon",
    "Unstable contact rate — and unstable income",
  ];

  return (
    <section id="why" className="scroll-mt-20 border-b border-forecast-border bg-forecast-bg py-16 md:py-24">
      <div className="mx-auto max-w-content px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            The real problem
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-forecast-text md:text-4xl">
            Most agents don&apos;t lack skill. They lack reliable inputs.
          </h2>
          <p className="mt-4 text-forecast-muted">
            When contact rate drops, everything feels unstable. Is it your script?
            Your follow-up? Or the lead source? We fix what can be fixed{" "}
            <em>before</em> the lead reaches your CRM.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pains.map((pain) => (
            <div
              key={pain}
              className="rounded-xl border border-forecast-border bg-forecast-surface p-5 shadow-forecast"
            >
              <span className="text-gold">—</span>
              <p className="mt-2 text-sm font-medium leading-snug text-forecast-text">
                {pain}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

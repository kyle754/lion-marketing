const checklist = [
  "Full name",
  "Verified US phone number",
  "Email address",
  "Age",
  "State",
  "Timestamp",
  "Consumer consent",
  "Completed screening questions",
];

export function LeadStandards() {
  return (
    <section id="lead-standards" className="scroll-mt-20 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-content">
        <h2 className="mb-4 text-2xl font-medium tracking-tight text-off-white md:text-3xl">
          Clear Lead Standards
        </h2>
        <p className="mb-8 text-body-gray text-[17px] leading-relaxed">
          To keep expectations aligned, lead validity is based on complete, verified information.
        </p>
        <div className="mb-8 rounded-lg border border-charcoal-card/60 bg-charcoal-card/50 p-6 md:p-8">
          <ul className="grid gap-3 sm:grid-cols-2">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="shrink-0 text-gold" aria-hidden>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-body-gray text-[15px]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-body-gray text-[17px] leading-relaxed">
          Sales outcomes depend on many factors. Lead standards are based on data quality, not sales results.
        </p>
      </div>
    </section>
  );
}

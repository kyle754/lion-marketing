const problems = [
  "Phone numbers that don't connect",
  "Prospects who don't remember opting in",
  "Submissions that clearly don't fit the product",
  "Conversations that end immediately",
];

export function Problem() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-content">
        <h2 className="mb-4 text-2xl font-medium tracking-tight text-off-white md:text-3xl">
          Why Most Life Insurance Leads Break Down on the First Call
        </h2>
        <p className="mb-8 max-w-[640px] text-body-gray text-[17px] leading-relaxed">
          Most agents don't struggle because they can't sell. They struggle because too many leads were never
          solid to begin with.
        </p>
        <ul className="mb-8 space-y-3">
          {problems.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 shrink-0 text-gold" aria-hidden>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </span>
              <span className="text-body-gray text-[17px]">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-body-gray text-[17px] leading-relaxed">
          Our focus is removing the problems that can be fixed before a lead ever reaches you.
        </p>
      </div>
    </section>
  );
}

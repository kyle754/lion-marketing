const benefits = [
  "More conversations that actually get going",
  "Fewer calls wasted on people who were never a fit",
  "Better use of your follow-up time",
  "Less frustration dialing through obvious junk",
];

export function Benefits() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-content">
        <h2 className="mb-8 text-2xl font-medium tracking-tight text-off-white md:text-3xl">
          What This Means for You
        </h2>
        <ul className="mb-8 space-y-3">
          {benefits.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 text-gold" aria-hidden>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-body-gray text-[17px]">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-body-gray text-[17px] leading-relaxed">
          Whether you're an individual agent or part of a brokerage, cleaner leads make selling simpler.
        </p>
      </div>
    </section>
  );
}

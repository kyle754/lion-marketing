const products = [
  "Final Expense Life Insurance",
  "Term Life Insurance",
  "Additional life insurance products added selectively",
];

export function ProductScope() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-content">
        <h2 className="mb-6 text-2xl font-medium tracking-tight text-off-white md:text-3xl">
          Life Insurance Products We Support
        </h2>
        <ul className="mb-6 space-y-2">
          {products.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 shrink-0 text-gold" aria-hidden>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-body-gray text-[17px]">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-body-gray text-[15px] leading-relaxed italic">
          Each product uses its own screening logic and delivery controls.
        </p>
      </div>
    </section>
  );
}

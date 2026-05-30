const steps = [
  "A consumer requests information about life insurance",
  "They complete basic eligibility questions",
  "They verify their phone number via one-time passcode",
  "Leads are delivered exclusively, in real time",
  "You pay per lead — not per appointment or transfer",
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-content">
        <h2 className="mb-12 text-2xl font-medium tracking-tight text-off-white md:text-3xl">
          How the Leads Are Generated and Delivered
        </h2>
        <ol className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold text-sm font-medium"
                aria-hidden
              >
                {i + 1}
              </span>
              <span className="text-body-gray text-[15px] leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
        <p className="border-t border-charcoal-card/50 pt-8 text-center text-body-gray text-[17px] leading-relaxed">
          You handle the calls and follow-up. We handle the screening and verification.
        </p>
      </div>
    </section>
  );
}

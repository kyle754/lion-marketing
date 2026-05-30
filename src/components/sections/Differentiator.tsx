const cards = [
  {
    title: "Phone Verification",
    text: "Every prospect confirms their phone number using a one-time passcode. This helps eliminate fake numbers, typos, and automated submissions.",
  },
  {
    title: "Basic Eligibility Screening",
    text: "Prospects answer a short set of life-insurance-specific questions, such as age range, general health context, and coverage interest.",
  },
  {
    title: "Intent Confirmation",
    text: "The form flow is designed to reduce accidental or low-effort submissions, so fewer calls end in immediate confusion.",
  },
];

export function Differentiator() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-content">
        <h2 className="mb-12 text-2xl font-medium tracking-tight text-off-white md:text-3xl">
          What We Filter Before a Lead Reaches You
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-lg border border-charcoal-card/60 bg-charcoal-medium/80 p-6 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-charcoal-card hover:shadow-lg"
            >
              <h3 className="mb-3 font-medium tracking-tight text-off-white">{card.title}</h3>
              <p className="text-body-gray text-[15px] leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-body-gray text-[17px] leading-relaxed md:max-w-[700px] md:mx-auto">
          This doesn't mean every prospect will buy. It means fewer calls end before they even start.
        </p>
      </div>
    </section>
  );
}

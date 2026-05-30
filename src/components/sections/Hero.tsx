import { Button } from "@/components/ui/Button";

const trustItems = [
  "Verified phone numbers",
  "Basic eligibility screening",
  "Exclusive delivery",
];

export function Hero() {
  return (
    <section className="px-4 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-content">
        <h1 className="mb-6 max-w-[700px] text-3xl font-medium tracking-tight text-off-white md:text-4xl lg:text-5xl">
          High-Quality Life Insurance Leads You Can Call
        </h1>
        <p className="mb-8 max-w-hero-copy text-lg text-body-gray leading-relaxed md:text-[18px]">
          We provide pay-per-lead life insurance leads that are verified and screened before delivery, so agents
          spend less time dialing bad numbers and more time talking to real prospects.
        </p>
        <ul className="mb-10 flex flex-wrap gap-x-6 gap-y-2 text-body-gray">
          {trustItems.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="text-gold" aria-hidden>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div>
          <Button href="#calendar">See If This Is a Fit</Button>
          <p className="mt-3 text-sm text-body-gray">
            For agents and teams actively working inbound leads
          </p>
        </div>
      </div>
    </section>
  );
}

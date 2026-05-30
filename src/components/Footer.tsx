import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-charcoal-dark border-t border-charcoal-card/50 py-16">
      <div className="mx-auto max-w-content px-4 md:px-6">
        <Image
          src="/images/logo-horizontal-dark.png"
          alt="Lion Marketing"
          width={120}
          height={32}
          className="mb-6 h-8 w-auto"
        />
        <p className="max-w-[560px] text-body-gray text-[15px] leading-relaxed">
          Lion Marketing provides exclusive, pay-per-lead life insurance leads for agents and brokerages nationwide.
          Phone-verified. Screened before delivery. Built for inbound sales teams.
        </p>
      </div>
    </footer>
  );
}

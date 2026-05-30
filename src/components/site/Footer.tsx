import Image from "next/image";
import Link from "next/link";
import { FOOTER, PRODUCTS, SITE } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-forecast-border bg-forecast-bg py-12">
      <div className="mx-auto max-w-content px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Image
              src="/images/logo-horizontal-dark.png"
              alt={SITE.name}
              width={120}
              height={32}
              className="h-7 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-forecast-muted">
              {FOOTER.blurb}
            </p>
            <p className="mt-3 text-xs text-gold/80">{FOOTER.tagline}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-forecast-text">
              Products supported
            </p>
            <ul className="mt-3 space-y-2 text-sm text-forecast-muted">
              {PRODUCTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-forecast-text">
              Company
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#approach" className="text-forecast-muted hover:text-gold">
                  Our Approach
                </a>
              </li>
              <li>
                <a href="#process" className="text-forecast-muted hover:text-gold">
                  The System
                </a>
              </li>
              <li>
                <a href="#faq" className="text-forecast-muted hover:text-gold">
                  FAQ
                </a>
              </li>
              <li>
                <Link href="/forecast" className="text-forecast-muted hover:text-gold">
                  Growth Forecast
                </Link>
              </li>
              <li>
                <a
                  href={SITE.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forecast-muted hover:text-gold"
                >
                  Book a Call
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-forecast-border pt-8 text-xs text-forecast-muted md:flex-row">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p className="text-center md:text-right">
            Client acquisition for insurance producers &amp; advisors nationwide
          </p>
        </div>
      </div>
    </footer>
  );
}

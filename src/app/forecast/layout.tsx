import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lead Package Forecast | Lion Marketing",
  description:
    "Estimate whether a lead package can pay for itself using your real conversion numbers.",
};

export default function ForecastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-forecast-bg">
      <header className="sticky top-0 z-50 border-b border-forecast-border bg-forecast-surface/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 md:px-6">
          <Link href="/forecast" className="flex items-center gap-3">
            <Image
              src="/images/logo-horizontal-dark.png"
              alt="Lion Marketing"
              width={120}
              height={32}
              className="h-7 w-auto"
              priority
            />
            <span className="hidden border-l border-forecast-border pl-3 text-sm font-medium text-gold sm:inline">
              Package Forecast
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-forecast-muted transition-colors hover:text-forecast-text"
          >
            ← Back to site
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}

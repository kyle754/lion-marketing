"use client";

import Link from "next/link";
import { SITE } from "@/config/site";
import type { ForecastSnapshot } from "@/lib/forecast/types";
import { formatCurrency, formatNumber } from "@/lib/forecast/format";

interface RecommendedPackageProps {
  leadsPerPackage: number;
  pacingDays: number;
  snapshot: ForecastSnapshot;
  onAdjustPackage?: () => void;
}

export function RecommendedPackage({
  leadsPerPackage,
  pacingDays,
  snapshot,
  onAdjustPackage,
}: RecommendedPackageProps) {
  return (
    <div className="rounded-xl border border-gold/30 bg-forecast-surface p-6 shadow-forecast-lg">
      <h3 className="text-base font-semibold text-forecast-text">
        Recommended Starting Package
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-forecast-muted">
        Based on these numbers, the cleanest test is{" "}
        <span className="font-medium text-forecast-text">
          {leadsPerPackage.toLocaleString()} leads
        </span>{" "}
        over{" "}
        <span className="font-medium text-forecast-text">{pacingDays} days</span>
        .
      </p>

      <dl className="mt-5 space-y-3 text-sm">
        <Row label="Lead package" value={`${leadsPerPackage.toLocaleString()} leads`} />
        <Row
          label="Estimated investment"
          value={formatCurrency(snapshot.totalLeadInvestment)}
        />
        <Row
          label="Break-even point"
          value={`${snapshot.breakEvenSales} sales`}
        />
        <Row
          label="Modeled outcome"
          value={`${formatNumber(snapshot.salesClosed, 1)} sales`}
        />
        <Row
          label="Estimated projected profit"
          value={formatCurrency(snapshot.profit)}
          highlight
        />
      </dl>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={SITE.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-charcoal-dark shadow-sm transition-colors hover:bg-gold/90"
        >
          Start This Lead Package
        </Link>
        {onAdjustPackage ? (
          <button
            type="button"
            onClick={onAdjustPackage}
            className="text-sm font-medium text-forecast-muted underline-offset-4 transition-colors hover:text-forecast-text hover:underline"
          >
            Adjust package size
          </button>
        ) : null}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-forecast-border/60 pb-3 last:border-0 last:pb-0">
      <dt className="text-forecast-muted">{label}</dt>
      <dd
        className={`font-medium ${highlight ? "text-gold" : "text-forecast-text"}`}
      >
        {value}
      </dd>
    </div>
  );
}

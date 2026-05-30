"use client";

import type { ForecastSnapshot } from "@/lib/forecast/types";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/forecast/format";

interface KpiGridProps {
  snapshot: ForecastSnapshot;
}

const KPIS = [
  {
    key: "revenue",
    label: "12-Mo Revenue",
    sublabel: "All packages combined",
    format: "currency" as const,
  },
  { key: "profit", label: "Projected Profit", format: "currency" as const },
  {
    key: "roi",
    label: "ROI",
    sublabel: "Revenue ÷ investment",
    format: "percent" as const,
  },
  { key: "salesClosed", label: "Total Sales", format: "number" as const },
  { key: "appointmentsBooked", label: "Appointments", format: "number" as const },
  {
    key: "totalLeadInvestment",
    label: "Lead Investment",
    format: "currency" as const,
  },
];

export function KpiGrid({ snapshot }: KpiGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {KPIS.map((kpi, i) => {
        const raw = snapshot[kpi.key as keyof ForecastSnapshot] as number;
        const display =
          kpi.format === "currency"
            ? formatCurrency(raw)
            : kpi.format === "percent"
              ? formatPercent(raw)
              : formatNumber(raw, 1);

        return (
          <div
            key={kpi.key}
            className={`rounded-xl border border-forecast-border bg-forecast-surface p-5 shadow-forecast ${
              i < 3 ? "shadow-forecast-lg" : ""
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-forecast-muted">
              {kpi.label}
              {"sublabel" in kpi && (
                <span className="mt-0.5 block font-normal normal-case tracking-normal text-forecast-muted/80">
                  {kpi.sublabel}
                </span>
              )}
            </p>
            <p
              className={`mt-2 font-semibold tracking-tight ${
                i < 3 ? "text-3xl text-gold" : "text-2xl text-forecast-text"
              }`}
            >
              {display}
            </p>
          </div>
        );
      })}
    </div>
  );
}

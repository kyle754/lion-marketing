"use client";

import type { ForecastSnapshot } from "@/lib/forecast/types";
import {
  formatCurrency,
  formatMultiple,
  formatNumber,
} from "@/lib/forecast/format";

interface KpiGridProps {
  snapshot: ForecastSnapshot;
}

const KPIS = [
  {
    key: "totalLeadInvestment",
    label: "Lead Investment",
    format: "currency" as const,
    emphasis: false,
  },
  {
    key: "revenue",
    label: "Expected Revenue",
    format: "currency" as const,
    emphasis: false,
  },
  {
    key: "profit",
    label: "Expected Profit After Lead Cost",
    format: "currency" as const,
    emphasis: true,
  },
  {
    key: "salesClosed",
    label: "Estimated Sales",
    format: "number" as const,
    emphasis: false,
  },
  {
    key: "breakEvenSales",
    label: "Break-even Sales Needed",
    format: "integer" as const,
    emphasis: true,
  },
  {
    key: "revenueMultiple",
    label: "Revenue Multiple",
    sublabel: "Revenue ÷ investment",
    format: "multiple" as const,
    emphasis: false,
  },
] as const;

export function KpiGrid({ snapshot }: KpiGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {KPIS.map((kpi) => {
        const raw = snapshot[kpi.key as keyof ForecastSnapshot] as number;
        const display =
          kpi.format === "currency"
            ? formatCurrency(raw)
            : kpi.format === "multiple"
              ? formatMultiple(raw)
              : kpi.format === "integer"
                ? String(Math.round(raw))
                : formatNumber(raw, 1);

        return (
          <div
            key={kpi.key}
            className={`rounded-xl border border-forecast-border bg-forecast-surface p-5 shadow-forecast ${
              kpi.emphasis ? "shadow-forecast-lg" : ""
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-forecast-muted">
              {kpi.label}
              {"sublabel" in kpi && kpi.sublabel && (
                <span className="mt-0.5 block font-normal normal-case tracking-normal text-forecast-muted/80">
                  {kpi.sublabel}
                </span>
              )}
            </p>
            <p
              className={`mt-2 font-semibold tracking-tight ${
                kpi.emphasis
                  ? "text-3xl text-gold"
                  : "text-2xl text-forecast-text"
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

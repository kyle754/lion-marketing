"use client";

import type { ForecastSnapshot } from "@/lib/forecast/types";
import { SCENARIO_LABELS } from "@/lib/forecast/scenarios";
import { formatCurrency, formatPercent } from "@/lib/forecast/format";

interface ScenarioCompareProps {
  scenarios: Record<"conservative" | "expected" | "aggressive", ForecastSnapshot>;
}

export function ScenarioCompare({ scenarios }: ScenarioCompareProps) {
  const keys = ["conservative", "expected", "aggressive"] as const;

  return (
    <div className="rounded-xl border border-forecast-border bg-forecast-surface p-5 shadow-forecast">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-forecast-muted">
        Scenario Comparison
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-forecast-border text-left text-forecast-muted">
              <th className="pb-3 pr-4 font-medium">Metric</th>
              {keys.map((k) => (
                <th key={k} className="pb-3 pr-4 font-medium">
                  {SCENARIO_LABELS[k]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-forecast-text">
            <CompareRow label="Revenue" scenarios={scenarios} field="revenue" format="currency" />
            <CompareRow label="Profit" scenarios={scenarios} field="profit" format="currency" />
            <CompareRow label="ROI (Rev÷Inv)" scenarios={scenarios} field="roi" format="percent" />
            <CompareRow label="Sales" scenarios={scenarios} field="salesClosed" format="number" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CompareRow({
  label,
  scenarios,
  field,
  format,
}: {
  label: string;
  scenarios: ScenarioCompareProps["scenarios"];
  field: keyof ForecastSnapshot;
  format: "currency" | "percent" | "number";
}) {
  const keys = ["conservative", "expected", "aggressive"] as const;
  const fmt = (v: number) =>
    format === "currency"
      ? formatCurrency(v)
      : format === "percent"
        ? formatPercent(v)
        : v.toFixed(1);

  return (
    <tr className="border-b border-forecast-border/60">
      <td className="py-3 pr-4 text-forecast-muted">{label}</td>
      {keys.map((k) => (
        <td
          key={k}
          className={`py-3 pr-4 ${k === "expected" ? "font-medium text-gold" : ""}`}
        >
          {fmt(scenarios[k][field] as number)}
        </td>
      ))}
    </tr>
  );
}

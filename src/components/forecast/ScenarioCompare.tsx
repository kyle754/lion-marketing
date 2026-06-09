"use client";

import type { ForecastSnapshot } from "@/lib/forecast/types";
import { SCENARIO_LABELS } from "@/lib/forecast/scenarios";
import {
  formatCurrency,
  formatMultiple,
  formatNumber,
} from "@/lib/forecast/format";

interface ScenarioCompareProps {
  scenarios: Record<"conservative" | "expected" | "aggressive", ForecastSnapshot>;
}

const SCENARIO_KEYS = ["conservative", "expected", "aggressive"] as const;

const METRICS = [
  { label: "Revenue", field: "revenue" as const, format: "currency" as const },
  { label: "Profit", field: "profit" as const, format: "currency" as const },
  {
    label: "Revenue Multiple",
    field: "revenueMultiple" as const,
    format: "multiple" as const,
  },
  { label: "Sales", field: "salesClosed" as const, format: "number" as const },
];

function formatValue(
  value: number,
  format: "currency" | "multiple" | "number"
): string {
  if (format === "currency") return formatCurrency(value);
  if (format === "multiple") return formatMultiple(value);
  return formatNumber(value, 1);
}

export function ScenarioCompare({ scenarios }: ScenarioCompareProps) {
  return (
    <section className="min-w-0 rounded-xl border border-forecast-border bg-forecast-surface p-5 shadow-forecast">
      <h3 className="text-base font-semibold text-forecast-text">
        Scenario Comparison
      </h3>
      <p className="mt-1 text-sm text-forecast-muted">
        Conservative, expected, and strong outcomes using the same package
      </p>

      <div className="mt-5 space-y-3 sm:hidden">
        {SCENARIO_KEYS.map((key) => (
          <div
            key={key}
            className={`rounded-lg border border-forecast-border bg-forecast-bg p-3 ${
              key === "expected" ? "ring-1 ring-gold/30" : ""
            }`}
          >
            <p
              className={`mb-2 text-xs font-semibold uppercase tracking-wider ${
                key === "expected" ? "text-gold" : "text-forecast-muted"
              }`}
            >
              {SCENARIO_LABELS[key]}
            </p>
            <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              {METRICS.map(({ label, field, format }) => (
                <div key={field}>
                  <dt className="text-xs text-forecast-muted">{label}</dt>
                  <dd className="font-medium text-forecast-text">
                    {formatValue(scenarios[key][field] as number, format)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="mt-5 hidden overflow-x-auto sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-forecast-border text-left text-forecast-muted">
              <th className="pb-3 pr-4 font-medium">Metric</th>
              {SCENARIO_KEYS.map((k) => (
                <th key={k} className="pb-3 pr-4 font-medium">
                  {SCENARIO_LABELS[k]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-forecast-text">
            {METRICS.map(({ label, field, format }) => (
              <CompareRow
                key={field}
                label={label}
                scenarios={scenarios}
                field={field}
                format={format}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
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
  format: "currency" | "multiple" | "number";
}) {
  return (
    <tr className="border-b border-forecast-border/60">
      <td className="py-3 pr-4 text-forecast-muted">{label}</td>
      {SCENARIO_KEYS.map((k) => (
        <td
          key={k}
          className={`py-3 pr-4 ${k === "expected" ? "font-medium text-gold" : ""}`}
        >
          {formatValue(scenarios[k][field] as number, format)}
        </td>
      ))}
    </tr>
  );
}

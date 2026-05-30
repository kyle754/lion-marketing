"use client";

import type {
  ReverseForecastResult,
  ReverseTarget,
  ReverseTargetKey,
} from "@/lib/forecast/types";
import { formatCurrency, formatNumber } from "@/lib/forecast/format";
import { InputField } from "./InputField";

interface ReverseForecastPanelProps {
  target: ReverseTarget;
  onChange: (target: ReverseTarget) => void;
  result: ReverseForecastResult | null;
}

const TARGET_FIELDS: {
  key: ReverseTargetKey;
  label: string;
  prefix?: string;
  step?: number;
}[] = [
  { key: "targetRevenue", label: "Target revenue", prefix: "$", step: 1000 },
  { key: "targetProfit", label: "Target profit", prefix: "$", step: 1000 },
  { key: "targetSales", label: "Target sales", step: 1 },
  { key: "targetAppointments", label: "Target appointments", step: 1 },
];

export function ReverseForecastPanel({
  target,
  onChange,
  result,
}: ReverseForecastPanelProps) {
  const setTarget = (key: ReverseTargetKey, value: number) => {
    if (value <= 0) {
      onChange({});
      return;
    }
    onChange({
      active: key,
      targetRevenue: key === "targetRevenue" ? value : undefined,
      targetProfit: key === "targetProfit" ? value : undefined,
      targetSales: key === "targetSales" ? value : undefined,
      targetAppointments: key === "targetAppointments" ? value : undefined,
    });
  };

  return (
    <div className="rounded-xl border border-gold/30 bg-gradient-to-br from-forecast-surface to-amber-50/40 p-5 shadow-forecast">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
        Reverse Forecast
      </h3>
      <p className="mt-1 mb-4 text-xs text-forecast-muted">
        Enter one annual target — we calculate required leads & investment
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {TARGET_FIELDS.map((field) => (
          <InputField
            key={field.key}
            label={field.label}
            prefix={field.prefix}
            value={target[field.key] ?? 0}
            onChange={(v) => setTarget(field.key, v)}
            step={field.step}
          />
        ))}
      </div>

      {result ? (
        <div className="mt-5 grid gap-3 border-t border-forecast-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
          <ResultItem label="Annual leads required" value={formatNumber(result.requiredLeads)} />
          <ResultItem
            label="Annual lead investment"
            value={formatCurrency(result.requiredInvestment)}
          />
          <ResultItem
            label="Appointments needed"
            value={formatNumber(result.requiredAppointments, 0)}
          />
          <ResultItem
            label="Sales needed"
            value={formatNumber(result.requiredSales, 1)}
          />
        </div>
      ) : target.active ? (
        <p className="mt-4 text-sm text-amber-700">
          This target isn&apos;t achievable at current conversion rates and lead
          cost. Try lowering the target or improving rates.
        </p>
      ) : null}
    </div>
  );
}

function ResultItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-forecast-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold text-forecast-text">{value}</p>
    </div>
  );
}

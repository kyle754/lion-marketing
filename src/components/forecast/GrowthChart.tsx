"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DEFAULT_FIRST_LEAD_BUSINESS_DAYS } from "@/lib/forecast/engine";
import { CHART } from "@/lib/forecast/chartTheme";
import type { PeriodProjection } from "@/lib/forecast/types";
import { formatCurrency } from "@/lib/forecast/format";

interface GrowthChartProps {
  data: PeriodProjection[];
  breakEvenPeriod: number | null;
  fulfillmentPacingDays: number;
  salesCycleDays: number;
}

/** ~ calendar days from purchase until revenue from first drip slice (order of magnitude) */
function approxCycleHint(pacingDays: number, salesCycle: number): number {
  const approxFirstCal = Math.ceil(
    (Math.max(0, DEFAULT_FIRST_LEAD_BUSINESS_DAYS) * 7) / 5
  );
  return approxFirstCal + Math.ceil(pacingDays / 2) + salesCycle;
}

export function GrowthChart({
  data,
  breakEvenPeriod,
  fulfillmentPacingDays,
  salesCycleDays,
}: GrowthChartProps) {
  const hintMo = Math.round(
    approxCycleHint(fulfillmentPacingDays, salesCycleDays) / 30
  );

  return (
    <div className="rounded-xl border border-forecast-border bg-forecast-surface p-5 shadow-forecast">
      <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-forecast-muted">
        Growth Projection
      </h3>
      <p className="mb-4 text-xs text-forecast-muted">
        Revenue trails purchases: leads drip across {fulfillmentPacingDays}{" "}
        pacing days, then {salesCycleDays}d lead → close. Activity flattens
        without new packages.
        {hintMo > 0 && (
          <span>
            {" "}
            · Midpoint cash ~{hintMo} mo from buy (illustrative).
          </span>
        )}
        {breakEvenPeriod && (
          <span className="ml-1 font-medium text-gold">
            · Break-even: period {breakEvenPeriod}
          </span>
        )}
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART.gold} stopOpacity={0.35} />
              <stop offset="100%" stopColor={CHART.gold} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={CHART.grid} strokeDasharray="3 3" />
          <XAxis dataKey="label" tick={{ fill: CHART.axis, fontSize: 11 }} />
          <YAxis
            tick={{ fill: CHART.axis, fontSize: 11 }}
            tickFormatter={(v) => formatCurrency(v, true)}
          />
          <Tooltip
            contentStyle={{
              background: CHART.tooltipBg,
              border: `1px solid ${CHART.tooltipBorder}`,
              borderRadius: 8,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            formatter={(value) => formatCurrency(Number(value))}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: CHART.axis }} />
          <Area
            type="monotone"
            dataKey="cumulativeRevenue"
            name="Revenue"
            stroke={CHART.gold}
            fill="url(#revenueGrad)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="cumulativeProfit"
            name="Profit"
            stroke={CHART.charcoal}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="cumulativeInvestment"
            name="Investment"
            stroke={CHART.muted}
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART } from "@/lib/forecast/chartTheme";
import type { PeriodProjection } from "@/lib/forecast/types";
import { formatCurrency } from "@/lib/forecast/format";

interface CompoundingChartProps {
  data: PeriodProjection[];
}

export function CompoundingChart({ data }: CompoundingChartProps) {
  const chartData = data.map((d) => ({
    label: d.label,
    value: d.cumulativeProfit,
  }));

  return (
    <div className="rounded-xl border border-forecast-border bg-forecast-surface p-5 shadow-forecast">
      <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-forecast-muted">
        Compounding Growth
      </h3>
      <p className="mb-4 text-xs text-forecast-muted">
        Cumulative profit from recurring lead investment
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="compoundGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART.gold} stopOpacity={0.45} />
              <stop offset="100%" stopColor={CHART.gold} stopOpacity={0.05} />
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
            }}
            formatter={(value) => formatCurrency(Number(value))}
          />
          <Area
            type="monotone"
            dataKey="value"
            name="Cumulative Profit"
            stroke={CHART.gold}
            fill="url(#compoundGrad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

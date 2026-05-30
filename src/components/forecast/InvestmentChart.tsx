"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART } from "@/lib/forecast/chartTheme";
import type { PeriodProjection } from "@/lib/forecast/types";
import { formatCurrency } from "@/lib/forecast/format";

interface InvestmentChartProps {
  data: PeriodProjection[];
}

export function InvestmentChart({ data }: InvestmentChartProps) {
  const chartData = data.map((d) => ({
    label: d.label,
    investment: d.investment,
    return: d.revenue,
    net: d.profit,
  }));

  return (
    <div className="rounded-xl border border-forecast-border bg-forecast-surface p-5 shadow-forecast">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-forecast-muted">
        Investment vs Return
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart data={chartData}>
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
          <Legend wrapperStyle={{ fontSize: 12, color: CHART.axis }} />
          <Bar dataKey="investment" name="Investment" fill="#D4D0C8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="return" name="Return" fill={CHART.gold} radius={[4, 4, 0, 0]} />
          <Line
            type="monotone"
            dataKey="net"
            name="Net"
            stroke={CHART.charcoal}
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

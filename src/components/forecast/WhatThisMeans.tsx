"use client";

import type { ForecastSnapshot } from "@/lib/forecast/types";
import { formatCurrency, formatNumber } from "@/lib/forecast/format";

interface WhatThisMeansProps {
  snapshot: ForecastSnapshot;
  costPerLead: number;
  dealSize: number;
}

export function WhatThisMeans({
  snapshot,
  costPerLead,
  dealSize,
}: WhatThisMeansProps) {
  const leads = Math.round(snapshot.leads);
  const investment = formatCurrency(snapshot.totalLeadInvestment);

  return (
    <div className="rounded-xl border border-forecast-border bg-forecast-elevated px-5 py-5 shadow-forecast">
      <h3 className="text-sm font-semibold text-forecast-text">
        What This Means
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-forecast-text">
        Based on your numbers,{" "}
        <strong>{leads.toLocaleString()} leads</strong> at{" "}
        <strong>{formatCurrency(costPerLead)}/lead</strong> equals a{" "}
        <strong>{investment}</strong> lead investment. At a{" "}
        <strong>{formatCurrency(dealSize)}</strong> average deal size, you need
        about <strong>{snapshot.breakEvenSales}</strong> sales to break even.
        This model estimates about{" "}
        <strong>{formatNumber(snapshot.salesClosed, 1)}</strong> sales, leaving
        approximately <strong>{formatCurrency(snapshot.profit)}</strong> in
        projected profit after lead cost.
      </p>
      <p className="mt-3 text-xs leading-relaxed text-forecast-muted">
        This is not a guarantee. It shows what the package needs to produce
        based on the assumptions entered.
      </p>
    </div>
  );
}

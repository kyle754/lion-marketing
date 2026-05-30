"use client";

import type { ForecastSnapshot } from "@/lib/forecast/types";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
} from "@/lib/forecast/format";

interface FunnelVizProps {
  snapshot: ForecastSnapshot;
  dealSize: number;
  packageCount: number;
  /** Cost per lead — shown so viewers don&apos;t confuse with profit metrics */
  costPerLead: number;
}

const FUNNEL_STAGES = [
  { key: "leads", label: "Leads", color: "bg-stone-200" },
  { key: "appointmentsBooked", label: "Appointments", color: "bg-stone-300" },
  { key: "appointmentsHeld", label: "Shows", color: "bg-gold/40" },
  { key: "salesClosed", label: "Sales", color: "bg-gold/70" },
] as const;

function barWidthPercent(value: number, max: number): number {
  return Math.min(100, Math.max(10, (value / max) * 100));
}

export function FunnelViz({
  snapshot,
  dealSize,
  packageCount,
  costPerLead,
}: FunnelVizProps) {
  const values: Record<string, number> = {
    leads: snapshot.leads,
    appointmentsBooked: snapshot.appointmentsBooked,
    appointmentsHeld: snapshot.appointmentsHeld,
    salesClosed: snapshot.salesClosed,
  };

  const max = snapshot.leads || 1;

  return (
    <div className="rounded-xl border border-forecast-border bg-forecast-surface p-5 shadow-forecast">
      <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-forecast-muted">
        Conversion Funnel
      </h3>
      <p className="mb-4 text-xs text-forecast-muted">
        {packageCount === 1
          ? "One package — full funnel from lead to sale"
          : `${packageCount} packages — combined 12-month funnel`}
      </p>

      <div className="space-y-2.5">
        {FUNNEL_STAGES.map((stage, i) => {
          const value = values[stage.key];
          const width = barWidthPercent(value, max);
          const display = formatNumber(
            value,
            stage.key === "salesClosed" ? 1 : 0
          );

          return (
            <div key={stage.key} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-xs font-medium text-forecast-muted">
                {stage.label}
              </span>
              <div className="relative min-w-0 flex-1 overflow-hidden rounded-lg bg-forecast-bg">
                <div
                  className={`h-9 ${stage.color} transition-all duration-300`}
                  style={{ width: `${width}%` }}
                />
                <span className="absolute inset-y-0 flex items-center px-3 text-sm font-semibold text-forecast-text">
                  {display}
                </span>
              </div>
              {i < FUNNEL_STAGES.length - 1 && (
                <span className="hidden shrink-0 text-gold sm:inline">↓</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative mt-6 overflow-hidden rounded-xl border border-gold/40 bg-gradient-to-br from-gold via-[#d4af37] to-[#b8941f] px-5 py-4 shadow-forecast-lg">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
        <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-dark/70">
          Revenue from your leads
        </p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-charcoal-dark md:text-4xl">
          {formatCurrency(snapshot.revenue)}
        </p>
        <div className="mt-4 space-y-2 border-t border-charcoal-dark/15 pt-4">
          <p className="text-sm font-semibold text-charcoal-dark">
            Net profit per lead:&nbsp;
            <span className="text-xl">
              {formatCurrency(snapshot.profitPerLead)}
            </span>
            <span className="font-normal text-charcoal-dark/75">
              &nbsp;(after modeled CPL)
            </span>
          </p>
          <p className="text-xs leading-relaxed text-charcoal-dark/85">
            Your modeled cost per lead is{" "}
            <strong>{formatCurrency(costPerLead)}</strong> — the line above is
            <strong> not</strong> per-lead spend; it is{" "}
            <strong>net margin per lead</strong> (revenue minus lead cost ÷ leads)
            once deals close from this funnel.
          </p>
          <p className="text-sm text-charcoal-dark/80">
            Revenue per lead: {formatCurrency(snapshot.revenuePerLead)} · Lead → sale:{" "}
            {formatPercent(snapshot.leadToSaleRate, 1)}
          </p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-forecast-muted">
        {formatCurrency(dealSize)} average deal · KPI cards above show ROI &
        totals
      </p>
    </div>
  );
}

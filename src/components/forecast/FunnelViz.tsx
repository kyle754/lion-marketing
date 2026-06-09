"use client";

import type { ForecastSnapshot } from "@/lib/forecast/types";
import type { EffectiveRates } from "@/lib/forecast/types";
import { formatNumber, formatPercent } from "@/lib/forecast/format";

interface FunnelVizProps {
  snapshot: ForecastSnapshot;
  rates: EffectiveRates;
}

export function FunnelViz({ snapshot, rates }: FunnelVizProps) {
  const stages = [
    {
      label: "Leads",
      count: snapshot.leads,
      decimals: 0,
      rateLabel: null as string | null,
    },
    {
      label: "Appointments",
      count: snapshot.appointmentsBooked,
      decimals: 0,
      rateLabel: `${formatPercent(rates.bookingRate, 1)} book rate`,
    },
    {
      label: "Held Appointments",
      count: snapshot.appointmentsHeld,
      decimals: 0,
      rateLabel: `${formatPercent(rates.showRate, 1)} show rate`,
    },
    {
      label: "Sales",
      count: snapshot.salesClosed,
      decimals: 1,
      rateLabel: `${formatPercent(rates.closeRate, 1)} close rate`,
    },
  ];

  const max = snapshot.leads || 1;

  return (
    <section className="min-w-0 rounded-xl border border-forecast-border bg-forecast-surface p-5 shadow-forecast sm:p-6">
      <h3 className="text-base font-semibold text-forecast-text">
        How the Package Turns Into Sales
      </h3>
      <p className="mt-1 text-sm text-forecast-muted">
        A simple view of volume and conversion at each step
      </p>

      <div className="mt-6 space-y-4">
        {stages.map((stage, i) => {
          const width = Math.min(
            100,
            Math.max(12, (stage.count / max) * 100)
          );
          const display = formatNumber(stage.count, stage.decimals);

          return (
            <div key={stage.label}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex w-full items-baseline justify-between gap-2 sm:w-40 sm:shrink-0 sm:flex-col sm:items-start">
                  <span className="text-sm font-medium text-forecast-text">
                    {stage.label}
                  </span>
                  {stage.rateLabel && (
                    <span className="text-xs text-forecast-muted">
                      {stage.rateLabel}
                    </span>
                  )}
                </div>
                <div className="relative min-w-0 flex-1 overflow-hidden rounded-lg bg-forecast-bg">
                  <div
                    className={`h-10 transition-all duration-300 ${
                      i === stages.length - 1 ? "bg-gold/60" : "bg-stone-200"
                    }`}
                    style={{ width: `${width}%` }}
                  />
                  <span className="absolute inset-y-0 flex items-center px-3 text-sm font-semibold text-forecast-text">
                    {display}
                    {i === 0 ? " leads" : ""}
                  </span>
                </div>
              </div>
              {i < stages.length - 1 && (
                <p className="mt-2 hidden pl-[11rem] text-xs text-gold sm:block">
                  ↓
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

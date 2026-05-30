"use client";

import { FORECAST_DISCLAIMER } from "@/lib/forecast/disclaimer";

export function ForecastDisclaimer() {
  return (
    <aside
      className="rounded-xl border border-forecast-border bg-forecast-elevated px-5 py-4 text-xs leading-relaxed text-forecast-muted"
      role="note"
      aria-label="Legal disclaimer"
    >
      <p className="mb-2 font-semibold uppercase tracking-wider text-forecast-text">
        Important disclaimer
      </p>
      <p>{FORECAST_DISCLAIMER}</p>
    </aside>
  );
}

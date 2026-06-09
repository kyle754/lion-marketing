"use client";

import { FORECAST_DISCLAIMER } from "@/lib/forecast/disclaimer";
import { ForecastCollapsible } from "./ForecastCollapsible";

const FORECAST_NOTE =
  "This forecast is for illustrative purposes only and is based on the numbers entered. Results are not guaranteed. Actual performance depends on follow-up, sales process, market conditions, and other factors outside our control.";

export function ForecastDisclaimer() {
  return (
    <div className="space-y-4">
      <aside
        className="rounded-xl border border-forecast-border bg-forecast-elevated px-5 py-4"
        role="note"
        aria-label="Forecast note"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-forecast-text">
          Forecast note
        </p>
        <p className="mt-2 text-xs leading-relaxed text-forecast-muted">
          {FORECAST_NOTE}
        </p>
      </aside>

      <ForecastCollapsible title="Full disclaimer" subtitle="Legal terms">
        <p className="text-xs leading-relaxed text-forecast-muted">
          {FORECAST_DISCLAIMER}
        </p>
      </ForecastCollapsible>
    </div>
  );
}

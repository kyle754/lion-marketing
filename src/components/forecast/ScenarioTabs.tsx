"use client";

import { getEffectiveRates } from "@/lib/forecast/engine";
import { SCENARIO_LABELS } from "@/lib/forecast/scenarios";
import type { ForecastInputs, ScenarioKey } from "@/lib/forecast/types";
import { formatPercent } from "@/lib/forecast/format";

interface ScenarioTabsProps {
  active: ScenarioKey;
  inputs: ForecastInputs;
  onChange: (scenario: ScenarioKey) => void;
}

const SCENARIOS: ScenarioKey[] = ["conservative", "expected", "aggressive"];

export function ScenarioTabs({ active, inputs, onChange }: ScenarioTabsProps) {
  const rates = getEffectiveRates(inputs, active);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-medium uppercase tracking-wider text-forecast-muted">
        Viewing
      </span>
      <div className="flex flex-wrap gap-2">
        {SCENARIOS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:py-2 sm:text-sm ${
              active === key
                ? "bg-gold text-charcoal-dark shadow-sm"
                : "border border-forecast-border bg-forecast-surface text-forecast-muted hover:border-gold/40 hover:text-forecast-text"
            }`}
          >
            {SCENARIO_LABELS[key]}
          </button>
        ))}
      </div>
      {active !== "expected" && (
        <p className="w-full text-xs text-forecast-muted sm:w-auto">
          Effective rates: {formatPercent(rates.bookingRate, 1)} booking ·{" "}
          {formatPercent(rates.showRate, 1)} show ·{" "}
          {formatPercent(rates.closeRate, 1)} close
        </p>
      )}
    </div>
  );
}

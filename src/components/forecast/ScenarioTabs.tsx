"use client";

import { getEffectiveRates } from "@/lib/forecast/engine";
import {
  SCENARIO_DESCRIPTIONS,
  SCENARIO_DETAIL,
  SCENARIO_LABELS,
} from "@/lib/forecast/scenarios";
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
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {SCENARIOS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              active === key
                ? "bg-gold text-charcoal-dark shadow-md"
                : "border border-forecast-border bg-forecast-surface text-forecast-muted shadow-sm hover:border-gold/40 hover:text-forecast-text"
            }`}
          >
            {SCENARIO_LABELS[key]}
          </button>
        ))}
      </div>
      <div className="rounded-lg border border-forecast-border bg-forecast-elevated px-4 py-3 text-xs leading-relaxed text-forecast-muted">
        <p className="font-medium text-forecast-text">
          {SCENARIO_LABELS[active]}: {SCENARIO_DESCRIPTIONS[active]}
        </p>
        <p className="mt-2">{SCENARIO_DETAIL[active]}</p>
        {active !== "expected" && (
          <p className="mt-2 text-forecast-text">
            Effective: {formatPercent(rates.bookingRate, 1)} booking ·{" "}
            {formatPercent(rates.showRate, 1)} show (unchanged) ·{" "}
            {formatPercent(rates.closeRate, 1)} close
          </p>
        )}
      </div>
    </div>
  );
}

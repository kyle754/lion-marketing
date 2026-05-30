"use client";

import { useForecast } from "@/hooks/useForecast";
import { SCENARIO_LABELS } from "@/lib/forecast/scenarios";
import type { TimeGranularity } from "@/lib/forecast/types";
import { CompoundingChart } from "./CompoundingChart";
import { ExportPdfButton } from "./ExportPdfButton";
import { FunnelViz } from "./FunnelViz";
import { GrowthChart } from "./GrowthChart";
import { InputPanel } from "./InputPanel";
import { InvestmentChart } from "./InvestmentChart";
import { KpiGrid } from "./KpiGrid";
import { ReverseForecastPanel } from "./ReverseForecastPanel";
import { ScenarioCompare } from "./ScenarioCompare";
import { ForecastDisclaimer } from "./ForecastDisclaimer";
import { ScenarioTabs } from "./ScenarioTabs";

export function ForecastDashboard() {
  const {
    inputs,
    updateInput,
    scenario,
    setScenario,
    granularity,
    setGranularity,
    reverseTarget,
    setReverseTarget,
    snapshot,
    allScenarios,
    projections,
    breakEvenPeriod,
    reverseResult,
  } = useForecast();

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-6 md:py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-forecast-text md:text-3xl">
            Lead Generation ROI Forecast
          </h1>
          <p className="mt-2 max-w-xl text-sm text-forecast-muted">
            12-month outlook from discrete lead packages — built for live sales
            conversations.
          </p>
        </div>
        <ExportPdfButton
          inputs={inputs}
          snapshot={snapshot}
          scenarios={allScenarios}
          projections={projections}
          scenarioLabel={SCENARIO_LABELS[scenario]}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <InputPanel inputs={inputs} onChange={updateInput} />

        <div className="min-w-0 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <ScenarioTabs
              active={scenario}
              inputs={inputs}
              onChange={setScenario}
            />
            <GranularityToggle value={granularity} onChange={setGranularity} />
          </div>

          <KpiGrid snapshot={snapshot} />

          <div className="grid gap-6 xl:grid-cols-2">
            <FunnelViz
              snapshot={snapshot}
              dealSize={inputs.dealSize}
              packageCount={inputs.leadPackagesPerYear}
              costPerLead={inputs.costPerLead}
            />
            <ScenarioCompare scenarios={allScenarios} />
          </div>

          <ReverseForecastPanel
            target={reverseTarget}
            onChange={setReverseTarget}
            result={reverseResult}
          />

          <GrowthChart
            data={projections}
            breakEvenPeriod={breakEvenPeriod}
            firstLeadBusinessDays={inputs.firstLeadBusinessDays}
            fulfillmentPacingDays={inputs.fulfillmentPacingDays}
            salesCycleDays={inputs.salesCycleDays}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <InvestmentChart data={projections} />
            <CompoundingChart data={projections} />
          </div>

          <CostSummary snapshot={snapshot} inputs={inputs} />

          <ForecastDisclaimer />
        </div>
      </div>
    </div>
  );
}

function GranularityToggle({
  value,
  onChange,
}: {
  value: TimeGranularity;
  onChange: (g: TimeGranularity) => void;
}) {
  return (
    <div className="flex shrink-0 rounded-lg border border-forecast-border bg-forecast-surface p-0.5 shadow-sm">
      {(["monthly", "weekly"] as const).map((g) => (
        <button
          key={g}
          type="button"
          onClick={() => onChange(g)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize ${
            value === g
              ? "bg-gold/15 text-forecast-text ring-1 ring-gold/30"
              : "text-forecast-muted hover:text-forecast-text"
          }`}
        >
          {g}
        </button>
      ))}
    </div>
  );
}

function CostSummary({
  snapshot,
  inputs,
}: {
  snapshot: ReturnType<typeof useForecast>["snapshot"];
  inputs: ReturnType<typeof useForecast>["inputs"];
}) {
  return (
    <div className="rounded-xl border border-forecast-border bg-forecast-surface p-5 shadow-forecast">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-forecast-muted">
        Cost Efficiency
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniStat label="Cost per appointment" value={snapshot.costPerAppointment} />
        <MiniStat label="Cost per held appt" value={snapshot.costPerHeldAppointment} />
        <MiniStat label="CAC (cost per sale)" value={snapshot.costPerSale} />
        <MiniStat label="Revenue per lead" value={snapshot.revenuePerLead} />
      </div>
      <p className="mt-3 text-xs text-forecast-muted">
        {inputs.leadPackagesPerYear} package purchase
        {inputs.leadPackagesPerYear === 1 ? "" : "s"} · first lead ~{" "}
        {inputs.firstLeadBusinessDays} BD · {inputs.fulfillmentPacingDays}-day
        pacing · {inputs.salesCycleDays}d lead-to-close (charts)
        {inputs.teamSize > 1 && ` · ${inputs.teamSize}× team scaling`}
      </p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

  return (
    <div>
      <p className="text-xs text-forecast-muted">{label}</p>
      <p className="mt-1 font-medium text-forecast-text">{formatted}</p>
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { useForecast } from "@/hooks/useForecast";
import {
  computeSinglePackageSnapshot,
  getEffectiveRates,
} from "@/lib/forecast/engine";
import { SCENARIO_LABELS } from "@/lib/forecast/scenarios";
import { CompoundingChart } from "./CompoundingChart";
import { ExportPdfButton } from "./ExportPdfButton";
import { ForecastCollapsible } from "./ForecastCollapsible";
import { ForecastDisclaimer } from "./ForecastDisclaimer";
import { FunnelViz } from "./FunnelViz";
import { GrowthChart } from "./GrowthChart";
import { InputPanel } from "./InputPanel";
import { InvestmentChart } from "./InvestmentChart";
import { KpiGrid } from "./KpiGrid";
import { PackageIncludes } from "./PackageIncludes";
import { RecommendedPackage } from "./RecommendedPackage";
import { ReverseForecastPanel } from "./ReverseForecastPanel";
import { ScenarioCompare } from "./ScenarioCompare";
import { ScenarioTabs } from "./ScenarioTabs";
import { SuccessChecklist } from "./SuccessChecklist";
import { WhatThisMeans } from "./WhatThisMeans";
import { formatCurrency } from "@/lib/forecast/format";

const TRUST_ITEMS = [
  "Exclusive leads",
  "OTP verified",
  "Real-time delivery",
  "Built around your sales process",
] as const;

export function ForecastDashboard() {
  const {
    inputs,
    updateInput,
    scenario,
    setScenario,
    reverseTarget,
    setReverseTarget,
    snapshot,
    allScenarios,
    projections,
    breakEvenPeriod,
    reverseResult,
  } = useForecast();

  const effectiveRates = useMemo(
    () => getEffectiveRates(inputs, scenario),
    [inputs, scenario]
  );

  const startingPackage = useMemo(() => {
    const pkg = computeSinglePackageSnapshot(inputs, scenario);
    return {
      leadsPerPackage: pkg.leadsInPackage,
      investment: pkg.totalLeadInvestment,
      breakEvenSales: pkg.breakEvenSales,
      salesClosed: pkg.salesClosed,
      profit: pkg.profit,
    };
  }, [inputs, scenario]);

  const scrollToPackage = () => {
    document
      .getElementById("lead-package")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 md:px-6 md:py-10">
      <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight text-forecast-text md:text-3xl lg:text-4xl">
            Can a Lead Package Pay for Itself?
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-forecast-muted md:text-base">
            Use your real numbers to estimate appointments, sales, revenue,
            profit, and break-even point before you buy.
          </p>
          <div className="mt-5 text-xs text-forecast-muted md:text-sm">
            {TRUST_ITEMS.join(" · ")}
          </div>
        </div>
        <ExportPdfButton
          inputs={inputs}
          snapshot={snapshot}
          scenarios={allScenarios}
          projections={projections}
          scenario={scenario}
          scenarioLabel={SCENARIO_LABELS[scenario]}
        />
      </header>

      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        <InputPanel inputs={inputs} onChange={updateInput} />

        <div className="min-w-0 space-y-8">
          <ScenarioTabs
            active={scenario}
            inputs={inputs}
            onChange={setScenario}
          />

          <KpiGrid snapshot={snapshot} />

          <WhatThisMeans
            snapshot={snapshot}
            costPerLead={inputs.costPerLead}
            dealSize={inputs.dealSize}
          />

          <FunnelViz snapshot={snapshot} rates={effectiveRates} />

          <ScenarioCompare scenarios={allScenarios} />

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <RecommendedPackage
              leadsPerPackage={startingPackage.leadsPerPackage}
              pacingDays={inputs.fulfillmentPacingDays}
              snapshot={{
                ...snapshot,
                totalLeadInvestment: startingPackage.investment,
                breakEvenSales: startingPackage.breakEvenSales,
                salesClosed: startingPackage.salesClosed,
                profit: startingPackage.profit,
              }}
              onAdjustPackage={scrollToPackage}
            />
            <PackageIncludes />
          </div>

          <SuccessChecklist />

          <ForecastDisclaimer />

          <ForecastCollapsible
            title="Advanced Forecast"
            subtitle="Growth projection, investment charts, reverse forecast, and cost efficiency"
          >
            <div className="space-y-6">
              <GrowthChart
                data={projections}
                breakEvenPeriod={breakEvenPeriod}
                fulfillmentPacingDays={inputs.fulfillmentPacingDays}
                salesCycleDays={inputs.salesCycleDays}
              />

              <div className="grid gap-6 lg:grid-cols-2">
                <InvestmentChart data={projections} />
                <CompoundingChart data={projections} />
              </div>

              <ReverseForecastPanel
                target={reverseTarget}
                onChange={setReverseTarget}
                result={reverseResult}
              />

              <CostSummary snapshot={snapshot} inputs={inputs} />
            </div>
          </ForecastCollapsible>
        </div>
      </div>
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
    <div className="rounded-xl border border-forecast-border bg-forecast-bg p-5">
      <h3 className="mb-3 text-sm font-semibold text-forecast-text">
        Cost Efficiency
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniStat
          label="Cost per appointment"
          value={snapshot.costPerAppointment}
        />
        <MiniStat
          label="Cost per held appt"
          value={snapshot.costPerHeldAppointment}
        />
        <MiniStat label="CAC (cost per sale)" value={snapshot.costPerSale} />
        <MiniStat label="Revenue per lead" value={snapshot.revenuePerLead} />
      </div>
      <p className="mt-3 text-xs text-forecast-muted">
        {inputs.leadPackagesPerYear} package purchase
        {inputs.leadPackagesPerYear === 1 ? "" : "s"} ·{" "}
        {inputs.fulfillmentPacingDays}-day pacing · {inputs.salesCycleDays}d
        lead-to-close
        {inputs.teamSize > 1 && ` · ${inputs.teamSize}× team scaling`}
      </p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-xs text-forecast-muted">{label}</p>
      <p className="mt-1 font-medium text-forecast-text">
        {formatCurrency(value)}
      </p>
    </div>
  );
}

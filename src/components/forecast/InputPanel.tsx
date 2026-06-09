"use client";

import type { ForecastInputs } from "@/lib/forecast/types";
import { ForecastCollapsible } from "./ForecastCollapsible";
import { InputField } from "./InputField";
import { PackagePurchaseSelect } from "./LeadFrequencySelect";

interface InputPanelProps {
  inputs: ForecastInputs;
  onChange: <K extends keyof ForecastInputs>(
    key: K,
    value: ForecastInputs[K]
  ) => void;
  packageSectionId?: string;
}

export function InputPanel({
  inputs,
  onChange,
  packageSectionId = "lead-package",
}: InputPanelProps) {
  const totalLeads =
    inputs.leads *
    Math.max(1, inputs.teamSize) *
    Math.max(1, inputs.leadPackagesPerYear);

  return (
    <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
      <div>
        <h2 className="text-lg font-semibold text-forecast-text">
          Your Numbers
        </h2>
        <p className="mt-1 text-sm text-forecast-muted">
          Enter the prospect&apos;s real conversion and deal economics
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-forecast-border bg-forecast-surface p-4 shadow-forecast">
        <p className="text-xs font-semibold uppercase tracking-wider text-forecast-muted">
          Your Sales Numbers
        </p>
        <InputField
          label="Average deal size / commission"
          prefix="$"
          value={inputs.dealSize}
          onChange={(v) => onChange("dealSize", v)}
          step={100}
        />
        <InputField
          label="Lead-to-appointment rate"
          hint="% of leads → appts"
          suffix="%"
          value={inputs.bookingRate}
          onChange={(v) => onChange("bookingRate", v)}
          max={100}
          step={0.5}
        />
        <InputField
          label="Appointment show rate"
          hint="% of booked → held"
          suffix="%"
          value={inputs.showRate}
          onChange={(v) => onChange("showRate", v)}
          max={100}
          step={0.5}
        />
        <InputField
          label="Close rate"
          hint="% of held → sales"
          suffix="%"
          value={inputs.closeRate}
          onChange={(v) => onChange("closeRate", v)}
          max={100}
          step={0.5}
        />
      </div>

      <div
        id={packageSectionId}
        className="space-y-4 rounded-xl border border-forecast-border bg-forecast-surface p-4 shadow-forecast scroll-mt-24"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-forecast-muted">
          Lead Package
        </p>
        <div className="rounded-lg border border-dashed border-forecast-border bg-forecast-bg px-3 py-2.5">
          <p className="text-sm font-medium text-forecast-text">Lead type</p>
          <p className="mt-0.5 text-xs text-forecast-muted">
            Life insurance / IUL — exclusive intent leads
          </p>
        </div>
        <InputField
          label="Leads per package"
          hint="Per rep, before team scale"
          value={inputs.leads}
          onChange={(v) => onChange("leads", v)}
          step={10}
        />
        <InputField
          label="Cost per lead"
          prefix="$"
          value={inputs.costPerLead}
          onChange={(v) => onChange("costPerLead", v)}
          step={1}
        />
        <InputField
          label="Package pacing window"
          hint="Days to drip full package"
          suffix="days"
          value={inputs.fulfillmentPacingDays}
          onChange={(v) =>
            onChange("fulfillmentPacingDays", Math.max(1, Math.round(v)))
          }
          min={1}
          step={1}
        />
        <p className="rounded-lg bg-forecast-bg px-3 py-2 text-xs text-forecast-muted">
          <span className="font-medium text-forecast-text">
            {totalLeads.toLocaleString()} leads
          </span>{" "}
          modeled across {inputs.leadPackagesPerYear} purchase
          {inputs.leadPackagesPerYear === 1 ? "" : "s"} in 12 months
        </p>
      </div>

      <ForecastCollapsible
        title="Advanced assumptions"
        subtitle="Team size, sales cycle, and purchase count"
      >
        <div className="space-y-4">
          <InputField
            label="Team size"
            hint="Scales projection"
            value={inputs.teamSize}
            onChange={(v) => onChange("teamSize", Math.max(1, Math.round(v)))}
            min={1}
            step={1}
          />
          <InputField
            label="Sales cycle"
            hint="Lead generated → deal closed"
            suffix="days"
            value={inputs.salesCycleDays}
            onChange={(v) => onChange("salesCycleDays", v)}
            step={1}
          />
          <PackagePurchaseSelect
            value={inputs.leadPackagesPerYear}
            onChange={(v) => onChange("leadPackagesPerYear", v)}
          />
          <p className="text-xs leading-relaxed text-forecast-muted">
            Example: {inputs.leads} leads over {inputs.fulfillmentPacingDays}{" "}
            pacing days ≈{" "}
            {((inputs.leads * 7) / inputs.fulfillmentPacingDays).toFixed(1)}{" "}
            leads/week (approx.).
          </p>
        </div>
      </ForecastCollapsible>
    </aside>
  );
}

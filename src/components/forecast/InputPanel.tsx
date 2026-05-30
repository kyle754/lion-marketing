"use client";

import type { ForecastInputs } from "@/lib/forecast/types";
import { InputField } from "./InputField";
import { PackagePurchaseSelect } from "./LeadFrequencySelect";

interface InputPanelProps {
  inputs: ForecastInputs;
  onChange: <K extends keyof ForecastInputs>(
    key: K,
    value: ForecastInputs[K]
  ) => void;
}

export function InputPanel({ inputs, onChange }: InputPanelProps) {
  const totalLeads =
    inputs.leads *
    Math.max(1, inputs.teamSize) *
    Math.max(1, inputs.leadPackagesPerYear);

  const approxFirstCalendar = Math.ceil((inputs.firstLeadBusinessDays * 7) / 5);

  return (
    <aside className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-forecast-text">
          Business Metrics
        </h2>
        <p className="mt-1 text-sm text-forecast-muted">
          Enter the prospect&apos;s real numbers
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-forecast-border bg-forecast-surface p-4 shadow-forecast">
        <InputField
          label="Average deal size"
          prefix="$"
          value={inputs.dealSize}
          onChange={(v) => onChange("dealSize", v)}
          step={100}
        />
        <InputField
          label="Booking rate"
          hint="% of leads → appts"
          suffix="%"
          value={inputs.bookingRate}
          onChange={(v) => onChange("bookingRate", v)}
          max={100}
          step={0.5}
        />
        <InputField
          label="Show rate"
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
        <InputField
          label="Team size"
          hint="Scales projection"
          value={inputs.teamSize}
          onChange={(v) => onChange("teamSize", Math.max(1, Math.round(v)))}
          min={1}
          step={1}
        />
        <InputField
          label="First lead delivery"
          hint="Biz days after signup (we model delivery)"
          suffix=" BD"
          value={inputs.firstLeadBusinessDays}
          onChange={(v) => onChange("firstLeadBusinessDays", Math.max(0, v))}
          min={0}
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
        <InputField
          label="Sales cycle"
          hint="Lead generated → deal closed"
          suffix="days"
          value={inputs.salesCycleDays}
          onChange={(v) => onChange("salesCycleDays", v)}
          step={1}
        />
        <p className="rounded-lg bg-forecast-bg px-3 py-2 text-xs text-forecast-muted">
          Example: {inputs.leads} leads over {inputs.fulfillmentPacingDays}{" "}
          pacing days ≈{" "}
          {((inputs.leads * 7) / inputs.fulfillmentPacingDays).toFixed(1)}{" "}
          leads/week (approx.). First modeled delivery ≈{" "}
          <span className="font-medium text-forecast-text">
            {approxFirstCalendar} calendar days
          </span>{" "}
          (~{inputs.firstLeadBusinessDays} business days).
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-forecast-text">
          Lead Package
        </h2>
        <p className="mt-1 text-sm text-forecast-muted">
          One purchase — not an annual bundle
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-forecast-border bg-forecast-surface p-4 shadow-forecast">
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
        <PackagePurchaseSelect
          value={inputs.leadPackagesPerYear}
          onChange={(v) => onChange("leadPackagesPerYear", v)}
        />
        <p className="rounded-lg bg-forecast-bg px-3 py-2 text-xs text-forecast-muted">
          <span className="font-medium text-forecast-text">
            {totalLeads.toLocaleString()} leads
          </span>{" "}
          across {inputs.leadPackagesPerYear} purchase
          {inputs.leadPackagesPerYear === 1 ? "" : "s"} in 12 months
          {inputs.leadPackagesPerYear === 1 && (
            <span className="mt-1 block">
              Timeline tapers after pacing + close — no more packages unless you
              add purchases above.
            </span>
          )}
        </p>
      </div>
    </aside>
  );
}

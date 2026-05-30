"use client";

interface InputFieldProps {
  label: string;
  hint?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}

export function InputField({
  label,
  hint,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  prefix,
  suffix,
}: InputFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-forecast-text">{label}</span>
        {hint && <span className="text-xs text-forecast-muted">{hint}</span>}
      </span>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-forecast-muted">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className={`w-full rounded-lg border border-forecast-border bg-forecast-elevated px-3 py-2.5 text-sm text-forecast-text shadow-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20 ${
            prefix ? "pl-7" : ""
          } ${suffix ? "pr-10" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-forecast-muted">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

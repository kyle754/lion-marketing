"use client";

const PRESETS = [
  { label: "1 package", value: 1 },
  { label: "4 / year", value: 4 },
  { label: "12 / year", value: 12 },
  { label: "52 / year", value: 52 },
] as const;

interface PackagePurchaseSelectProps {
  value: number;
  onChange: (count: number) => void;
}

export function PackagePurchaseSelect({
  value,
  onChange,
}: PackagePurchaseSelectProps) {
  const isPreset = PRESETS.some((p) => p.value === value);

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-forecast-text">
        Package purchases (12 mo)
      </span>
      <p className="text-xs text-forecast-muted">
        How many separate lead packages you plan to buy this year — not a
        subscription
      </p>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.value}
            type="button"
            onClick={() => onChange(preset.value)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              value === preset.value
                ? "bg-gold text-charcoal-dark shadow-sm"
                : "border border-forecast-border bg-forecast-elevated text-forecast-muted hover:border-gold/40 hover:text-forecast-text"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <label className="flex items-center gap-2 text-xs text-forecast-muted">
        <span>Custom count:</span>
        <input
          type="number"
          min={1}
          max={365}
          value={value}
          onChange={(e) =>
            onChange(Math.max(1, Math.round(parseFloat(e.target.value) || 1)))
          }
          className={`w-16 rounded border border-forecast-border bg-forecast-elevated px-2 py-1 text-forecast-text ${
            isPreset ? "" : "ring-2 ring-gold/30"
          }`}
        />
      </label>
    </div>
  );
}

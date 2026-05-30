"use client";

import { useState } from "react";
import type { ForecastInputs, ForecastSnapshot, PeriodProjection } from "@/lib/forecast/types";

interface ExportPdfButtonProps {
  inputs: ForecastInputs;
  snapshot: ForecastSnapshot;
  scenarios: Record<"conservative" | "expected" | "aggressive", ForecastSnapshot>;
  projections: PeriodProjection[];
  scenarioLabel: string;
}

export function ExportPdfButton(props: ExportPdfButtonProps) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { ForecastPdfDocument } = await import("./pdf/ForecastPdfDocument");

      const doc = <ForecastPdfDocument {...props} />;
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `lion-marketing-roi-forecast-${Date.now()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={exporting}
      className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-charcoal-dark transition-all hover:bg-gold-hover hover:shadow-[0_0_24px_rgba(201,162,39,0.25)] disabled:opacity-60"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {exporting ? "Generating…" : "Export PDF Report"}
    </button>
  );
}

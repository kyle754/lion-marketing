import type { ScenarioKey, ScenarioMultipliers } from "./types";

/** Multipliers applied only to booking and close rates (show rate is unchanged) */
export const SCENARIO_MULTIPLIERS: Record<ScenarioKey, ScenarioMultipliers> = {
  conservative: {
    bookingRate: 0.85,
    closeRate: 0.85,
  },
  expected: {
    bookingRate: 1,
    closeRate: 1,
  },
  aggressive: {
    bookingRate: 1.12,
    closeRate: 1.15,
  },
};

export const SCENARIO_LABELS: Record<ScenarioKey, string> = {
  conservative: "Conservative",
  expected: "Expected",
  aggressive: "Strong",
};

export const SCENARIO_DESCRIPTIONS: Record<ScenarioKey, string> = {
  conservative:
    "Booking × 0.85 · Close × 0.85 — show rate unchanged (stress-test downside)",
  expected: "Your entered booking and close rates exactly as entered",
  aggressive:
    "Booking × 1.12 · Close × 1.15 — show rate unchanged (upside case)",
};

export const SCENARIO_DETAIL: Record<ScenarioKey, string> = {
  conservative:
    "Reduces booking rate by 15% and close rate by 15%. Show rate stays at what the prospect entered — show rates are harder to move and we don't inflate them.",
  expected:
    "No adjustment — baseline model built entirely from the prospect's numbers.",
  aggressive:
    "Increases booking rate by 12% and close rate by 15%. Show rate is held constant to keep projections credible.",
};

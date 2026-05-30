"use client";

import { useMemo, useState } from "react";
import {
  computeForecast,
  computePeriodProjections,
  computeReverseForecast,
  DEFAULT_INPUTS,
  findBreakEvenPeriod,
} from "@/lib/forecast/engine";
import type {
  ForecastInputs,
  ReverseTarget,
  ScenarioKey,
  TimeGranularity,
} from "@/lib/forecast/types";

export function useForecast() {
  const [inputs, setInputs] = useState<ForecastInputs>(DEFAULT_INPUTS);
  const [scenario, setScenario] = useState<ScenarioKey>("expected");
  const [granularity, setGranularity] = useState<TimeGranularity>("monthly");
  const [reverseTarget, setReverseTarget] = useState<ReverseTarget>({});

  const snapshot = useMemo(
    () => computeForecast(inputs, scenario),
    [inputs, scenario]
  );

  const allScenarios = useMemo(
    () => ({
      conservative: computeForecast(inputs, "conservative"),
      expected: computeForecast(inputs, "expected"),
      aggressive: computeForecast(inputs, "aggressive"),
    }),
    [inputs]
  );

  const projections = useMemo(
    () => computePeriodProjections(inputs, scenario, granularity),
    [inputs, scenario, granularity]
  );

  const breakEvenPeriod = useMemo(
    () => findBreakEvenPeriod(projections),
    [projections]
  );

  const reverseResult = useMemo(
    () => computeReverseForecast(inputs, reverseTarget, scenario),
    [inputs, reverseTarget, scenario]
  );

  const updateInput = <K extends keyof ForecastInputs>(
    key: K,
    value: ForecastInputs[K]
  ) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return {
    inputs,
    setInputs,
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
  };
}

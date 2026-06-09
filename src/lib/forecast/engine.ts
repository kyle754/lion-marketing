import type {
  EffectiveRates,
  ForecastInputs,
  ForecastSnapshot,
  PeriodProjection,
  ReverseForecastResult,
  ReverseTarget,
  ScenarioKey,
  TimeGranularity,
} from "./types";
import { SCENARIO_MULTIPLIERS } from "./scenarios";

function clampRate(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function getEffectiveRates(
  inputs: ForecastInputs,
  scenario: ScenarioKey = "expected"
): EffectiveRates {
  const mult = SCENARIO_MULTIPLIERS[scenario];
  return {
    bookingRate: clampRate(inputs.bookingRate * mult.bookingRate),
    showRate: inputs.showRate,
    closeRate: clampRate(inputs.closeRate * mult.closeRate),
  };
}

function applyScenarioRates(
  inputs: ForecastInputs,
  scenario: ScenarioKey
): ForecastInputs {
  const rates = getEffectiveRates(inputs, scenario);
  return { ...inputs, ...rates };
}

function conversionMultiplier(rates: EffectiveRates): number {
  return (
    (rates.bookingRate / 100) *
    (rates.showRate / 100) *
    (rates.closeRate / 100)
  );
}

function packageVolume(inputs: ForecastInputs): {
  team: number;
  packages: number;
  leadsPerPackage: number;
  totalLeads: number;
} {
  const team = Math.max(1, inputs.teamSize);
  const packages = Math.max(1, inputs.leadPackagesPerYear);
  const leadsPerPackage = inputs.leads * team;
  const totalLeads = leadsPerPackage * packages;
  return { team, packages, leadsPerPackage, totalLeads };
}

/** Delay (calendar days): how many period slots before an event lands (floor = start of horizon) */
function delayToPeriodStartOffset(
  calendarDays: number,
  granularity: TimeGranularity,
  horizonPeriods: number
): number {
  if (calendarDays <= 0) return 0;
  const block = granularity === "monthly" ? 30 : 7;
  return Math.min(horizonPeriods - 1, Math.floor(calendarDays / block));
}

/** Pacing duration: how many periods the package is spread across (ceil = cover full span) */
function pacingDaysToPeriodSpan(
  calendarDays: number,
  granularity: TimeGranularity,
  horizonPeriods: number
): number {
  if (calendarDays <= 0) return 1;
  const block = granularity === "monthly" ? 30 : 7;
  return Math.max(
    1,
    Math.min(horizonPeriods, Math.ceil(calendarDays / block))
  );
}

/** Legacy export used elsewhere */
export function daysToPeriods(
  days: number,
  granularity: TimeGranularity,
  horizonPeriods = 52
): number {
  if (days <= 0) return 0;
  const perBlock = granularity === "monthly" ? 30 : 7;
  return Math.min(horizonPeriods - 1, Math.ceil(days / perBlock));
}

/** Business days → approximate calendar days (5 BD ≈ 7 calendar days) */
function businessDaysToApproxCalendarDays(bd: number): number {
  if (bd <= 0) return 0;
  return Math.ceil((bd * 7) / 5);
}

/** Equal split of integer count across n buckets; sums to total */
function distributeEvenlyAcrossPeriods(total: number, n: number): number[] {
  if (n <= 0 || total <= 0) return [];
  const base = Math.floor(total / n);
  const remainder = total - base * n;
  return Array.from({ length: n }, (_, i) => base + (i < remainder ? 1 : 0));
}

export function getPackagePurchasePeriods(
  packageCount: number,
  periods: number
): number[] {
  const count = Math.max(1, packageCount);
  if (count === 1) return [0];
  return Array.from({ length: count }, (_, i) =>
    Math.min(periods - 1, Math.floor((i * periods) / count))
  );
}

/** Outcomes from one fully delivered package */
export function computeSinglePackageSnapshot(
  inputs: ForecastInputs,
  scenario: ScenarioKey
): Omit<ForecastSnapshot, "leads"> & { leadsInPackage: number } {
  const adjusted = applyScenarioRates(inputs, scenario);
  const { leadsPerPackage } = packageVolume(adjusted);
  const conv = conversionMultiplier(adjusted);

  const appointmentsBooked = leadsPerPackage * (adjusted.bookingRate / 100);
  const appointmentsHeld = appointmentsBooked * (adjusted.showRate / 100);
  const salesClosed = appointmentsHeld * (adjusted.closeRate / 100);
  const investment = leadsPerPackage * adjusted.costPerLead;
  const revenue = salesClosed * adjusted.dealSize;
  const profit = revenue - investment;

  return {
    leadsInPackage: leadsPerPackage,
    appointmentsBooked,
    appointmentsHeld,
    salesClosed,
    leadToSaleRate:
      leadsPerPackage > 0 ? (salesClosed / leadsPerPackage) * 100 : 0,
    totalLeadInvestment: investment,
    costPerAppointment:
      appointmentsBooked > 0 ? investment / appointmentsBooked : 0,
    costPerHeldAppointment:
      appointmentsHeld > 0 ? investment / appointmentsHeld : 0,
    costPerSale: salesClosed > 0 ? investment / salesClosed : 0,
    revenue,
    profit,
    breakEvenSales:
      adjusted.dealSize > 0 ? Math.ceil(investment / adjusted.dealSize) : 0,
    revenueMultiple: investment > 0 ? revenue / investment : 0,
    trueRoi: investment > 0 ? (profit / investment) * 100 : 0,
    revenuePerLead: leadsPerPackage > 0 ? revenue / leadsPerPackage : 0,
    profitPerLead: leadsPerPackage > 0 ? profit / leadsPerPackage : 0,
    revenuePerAppointment:
      appointmentsBooked > 0 ? revenue / appointmentsBooked : 0,
  };
}

export function computeForecast(
  inputs: ForecastInputs,
  scenario: ScenarioKey = "expected"
): ForecastSnapshot {
  const pkg = computeSinglePackageSnapshot(inputs, scenario);
  const { totalLeads, packages } = packageVolume(inputs);

  const appointmentsBooked = pkg.appointmentsBooked * packages;
  const appointmentsHeld = pkg.appointmentsHeld * packages;
  const salesClosed = pkg.salesClosed * packages;
  const totalLeadInvestment = pkg.totalLeadInvestment * packages;
  const revenue = pkg.revenue * packages;
  const profit = revenue - totalLeadInvestment;

  return {
    leads: totalLeads,
    appointmentsBooked,
    appointmentsHeld,
    salesClosed,
    leadToSaleRate: totalLeads > 0 ? (salesClosed / totalLeads) * 100 : 0,
    totalLeadInvestment,
    costPerAppointment:
      appointmentsBooked > 0 ? totalLeadInvestment / appointmentsBooked : 0,
    costPerHeldAppointment:
      appointmentsHeld > 0 ? totalLeadInvestment / appointmentsHeld : 0,
    costPerSale: salesClosed > 0 ? totalLeadInvestment / salesClosed : 0,
    revenue,
    profit,
    breakEvenSales:
      inputs.dealSize > 0
        ? Math.ceil(totalLeadInvestment / inputs.dealSize)
        : 0,
    revenueMultiple:
      totalLeadInvestment > 0 ? revenue / totalLeadInvestment : 0,
    trueRoi:
      totalLeadInvestment > 0 ? (profit / totalLeadInvestment) * 100 : 0,
    revenuePerLead: totalLeads > 0 ? revenue / totalLeads : 0,
    profitPerLead: totalLeads > 0 ? profit / totalLeads : 0,
    revenuePerAppointment:
      appointmentsBooked > 0 ? revenue / appointmentsBooked : 0,
  };
}

export function computeReverseForecast(
  inputs: ForecastInputs,
  target: ReverseTarget,
  scenario: ScenarioKey = "expected"
): ReverseForecastResult | null {
  const adjusted = applyScenarioRates(inputs, scenario);
  const { team, packages, leadsPerPackage } = packageVolume(adjusted);
  const conv = conversionMultiplier(adjusted);
  const bookingRate = adjusted.bookingRate / 100;
  const showRate = adjusted.showRate / 100;
  const closeRate = adjusted.closeRate / 100;

  if (bookingRate <= 0 || showRate <= 0 || closeRate <= 0) return null;

  const profitPerLeadInPackage =
    conv * adjusted.dealSize - adjusted.costPerLead;

  let requiredSales = 0;
  const active = target.active;

  if (
    active === "targetSales" &&
    target.targetSales != null &&
    target.targetSales > 0
  ) {
    requiredSales = target.targetSales;
  } else if (
    active === "targetRevenue" &&
    target.targetRevenue != null &&
    target.targetRevenue > 0
  ) {
    requiredSales = target.targetRevenue / adjusted.dealSize;
  } else if (
    active === "targetProfit" &&
    target.targetProfit != null &&
    target.targetProfit > 0
  ) {
    if (profitPerLeadInPackage <= 0) return null;
    const profitPerPackage = profitPerLeadInPackage * (adjusted.leads * team);
    const packagesNeeded = Math.ceil(target.targetProfit / profitPerPackage);
    const leadsPerPkg = adjusted.leads;
    const snapshot = computeForecast(
      { ...adjusted, leadPackagesPerYear: packagesNeeded, leads: leadsPerPkg },
      scenario
    );
    return {
      requiredLeads: leadsPerPkg * team * packagesNeeded,
      requiredInvestment: snapshot.totalLeadInvestment,
      requiredAppointments: snapshot.appointmentsBooked,
      requiredSales: snapshot.salesClosed,
      annualizedRevenue: snapshot.revenue,
      annualizedProfit: snapshot.profit,
    };
  } else if (
    active === "targetAppointments" &&
    target.targetAppointments != null &&
    target.targetAppointments > 0
  ) {
    const requiredBooked = target.targetAppointments;
    const requiredHeld = requiredBooked * showRate;
    requiredSales = requiredHeld * closeRate;
  } else {
    return null;
  }

  const requiredHeld = requiredSales / closeRate;
  const requiredBooked = requiredHeld / showRate;
  const annualLeadsNeeded = Math.ceil(requiredBooked / bookingRate);
  const packagesNeeded = Math.ceil(annualLeadsNeeded / leadsPerPackage);
  const leadsPerPkg = Math.ceil(annualLeadsNeeded / (team * packagesNeeded));

  const snapshot = computeForecast(
    {
      ...adjusted,
      leads: leadsPerPkg,
      leadPackagesPerYear: packagesNeeded,
    },
    scenario
  );

  return {
    requiredLeads: annualLeadsNeeded,
    requiredInvestment: snapshot.totalLeadInvestment,
    requiredAppointments: requiredBooked,
    requiredSales,
    annualizedRevenue: snapshot.revenue,
    annualizedProfit: snapshot.profit,
  };
}

/**
 * For each package: investment at purchase; leads drip from first BD after signup
 * through pacing calendar days; revenue from each period's slice after sales cycle.
 */
export function computePeriodProjections(
  inputs: ForecastInputs,
  scenario: ScenarioKey,
  granularity: TimeGranularity = "monthly"
): PeriodProjection[] {
  const periods = granularity === "monthly" ? 12 : 52;
  const adjusted = applyScenarioRates(inputs, scenario);
  const { packages, leadsPerPackage } = packageVolume(adjusted);
  const conv = conversionMultiplier(adjusted);

  const purchasePeriods = getPackagePurchasePeriods(packages, periods);

  const firstLeadCalendarApprox = businessDaysToApproxCalendarDays(
    DEFAULT_FIRST_LEAD_BUSINESS_DAYS
  );
  const firstLeadPeriodOffset = delayToPeriodStartOffset(
    firstLeadCalendarApprox,
    granularity,
    periods
  );
  const pacingPeriodCount = pacingDaysToPeriodSpan(
    adjusted.fulfillmentPacingDays,
    granularity,
    periods
  );

  const salesCycleDelay = daysToPeriods(
    adjusted.salesCycleDays,
    granularity,
    periods
  );

  const investmentPerPeriod = Array.from({ length: periods }, () => 0);
  const revenuePerPeriod = Array.from({ length: periods }, () => 0);
  const leadsPerPeriod = Array.from({ length: periods }, () => 0);

  const investmentPerPackage = leadsPerPackage * adjusted.costPerLead;

  for (const purchasePeriod of purchasePeriods) {
    investmentPerPeriod[purchasePeriod] += investmentPerPackage;

    const pacingStart =
      Math.min(
        periods - 1,
        purchasePeriod + firstLeadPeriodOffset
      );
    const pacingEnd =
      Math.min(periods - 1, pacingStart + pacingPeriodCount - 1);
    const nSlices = pacingEnd - pacingStart + 1;

    const sliceLeads =
      leadsPerPackage > 0
        ? distributeEvenlyAcrossPeriods(leadsPerPackage, nSlices)
        : [];

    for (let s = 0; s < nSlices; s++) {
      const t = pacingStart + s;
      const L = sliceLeads[s] ?? 0;
      if (L <= 0) continue;
      leadsPerPeriod[t] += L;
      const rev = L * conv * adjusted.dealSize;
      const revIdx = Math.min(periods - 1, t + salesCycleDelay);
      revenuePerPeriod[revIdx] += rev;
    }
  }

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  let cumulativeInvestment = 0;
  let cumulativeRevenue = 0;
  let cumulativeProfit = 0;

  return Array.from({ length: periods }, (_, i) => {
    const investment = investmentPerPeriod[i];
    const revenue = revenuePerPeriod[i];
    const profit = revenue - investment;

    cumulativeInvestment += investment;
    cumulativeRevenue += revenue;
    cumulativeProfit += profit;

    return {
      period: i + 1,
      label: granularity === "monthly" ? monthNames[i] : `W${i + 1}`,
      leads: leadsPerPeriod[i],
      investment,
      revenue,
      profit,
      cumulativeInvestment,
      cumulativeRevenue,
      cumulativeProfit,
    };
  });
}

export function findBreakEvenPeriod(
  projections: PeriodProjection[]
): number | null {
  for (let i = 0; i < projections.length; i++) {
    if (projections[i].cumulativeProfit >= 0) {
      return i + 1;
    }
  }
  return null;
}

/** Fixed model assumption — not exposed as a user input */
export const DEFAULT_FIRST_LEAD_BUSINESS_DAYS = 5;

export const DEFAULT_INPUTS: ForecastInputs = {
  dealSize: 2500,
  bookingRate: 33,
  showRate: 65,
  closeRate: 20,
  teamSize: 1,
  fulfillmentPacingDays: 30,
  salesCycleDays: 14,
  leads: 200,
  costPerLead: 45,
  leadPackagesPerYear: 1,
};

export type ScenarioKey = "conservative" | "expected" | "aggressive";

export type TimeGranularity = "monthly" | "weekly";

export type ReverseTargetKey =
  | "targetRevenue"
  | "targetProfit"
  | "targetSales"
  | "targetAppointments";

export interface BusinessInputs {
  dealSize: number;
  bookingRate: number;
  showRate: number;
  closeRate: number;
  teamSize: number;
  /** Business days until the first lead from a new package is delivered */
  firstLeadBusinessDays: number;
  /** Calendar days over which the full package is paced (e.g. 100 leads over 30 days) */
  fulfillmentPacingDays: number;
  /** Days from lead generated to deal closed */
  salesCycleDays: number;
}

export interface LeadInputs {
  /** Leads included in a single package purchase (per rep) */
  leads: number;
  costPerLead: number;
  /** Number of separate package purchases modeled over 12 months */
  leadPackagesPerYear: number;
}

export interface ForecastInputs extends BusinessInputs, LeadInputs {}

export interface FunnelMetrics {
  leads: number;
  appointmentsBooked: number;
  appointmentsHeld: number;
  salesClosed: number;
  leadToSaleRate: number;
}

export interface CostMetrics {
  totalLeadInvestment: number;
  costPerAppointment: number;
  costPerHeldAppointment: number;
  costPerSale: number;
}

export interface RevenueMetrics {
  revenue: number;
  profit: number;
  /** Revenue ÷ investment × 100 */
  roi: number;
  revenuePerLead: number;
  /** Net profit ÷ total leads */
  profitPerLead: number;
  revenuePerAppointment: number;
}

export interface ForecastSnapshot extends FunnelMetrics, CostMetrics, RevenueMetrics {}

export interface PeriodProjection {
  period: number;
  label: string;
  leads: number;
  investment: number;
  revenue: number;
  profit: number;
  cumulativeInvestment: number;
  cumulativeRevenue: number;
  cumulativeProfit: number;
}

export interface ReverseTarget {
  active?: ReverseTargetKey;
  targetRevenue?: number;
  targetProfit?: number;
  targetSales?: number;
  targetAppointments?: number;
}

export interface ReverseForecastResult {
  requiredLeads: number;
  requiredInvestment: number;
  requiredAppointments: number;
  requiredSales: number;
  annualizedRevenue: number;
  annualizedProfit: number;
}

export interface ScenarioMultipliers {
  bookingRate: number;
  closeRate: number;
}

export interface EffectiveRates {
  bookingRate: number;
  showRate: number;
  closeRate: number;
}

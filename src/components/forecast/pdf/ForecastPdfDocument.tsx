import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type {
  ForecastInputs,
  ForecastSnapshot,
  PeriodProjection,
  ScenarioKey,
} from "@/lib/forecast/types";
import { FORECAST_DISCLAIMER } from "@/lib/forecast/disclaimer";
import { SCENARIO_LABELS } from "@/lib/forecast/scenarios";
import {
  computeSinglePackageSnapshot,
  getEffectiveRates,
} from "@/lib/forecast/engine";

const C = {
  paper: "#FAF8F4",
  surface: "#FFFFFF",
  border: "#E8E4DC",
  muted: "#6B7280",
  text: "#0B0D10",
  gold: "#B8941F",
  goldTint: "#F5F0E6",
};

const PACKAGE_INCLUDES = [
  "Exclusive lead delivery",
  "OTP phone verification",
  "Real-time delivery",
  "Life insurance / IUL intent",
  "Delivered over selected pacing window",
  "No shared lead competition",
] as const;

const SUCCESS_CHECKLIST = [
  "Contact new leads quickly",
  "Make multiple follow-up attempts",
  "Track appointments, held appointments, and sales",
  "Use a clear script or appointment-setting process",
  "Have enough capacity to work the leads during the pacing window",
] as const;

const FORECAST_NOTE =
  "This forecast is for illustrative purposes only and is based on the numbers entered. Results are not guaranteed. Actual performance depends on follow-up, sales process, market conditions, and other factors outside our control.";

const FOOTER_LINE =
  "Exclusive leads · OTP verified · real-time delivery · forecast based on entered assumptions";

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    paddingTop: 36,
    paddingBottom: 44,
    backgroundColor: C.paper,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: C.text,
  },
  accent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: C.gold,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  brand: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 2.5,
    color: C.text,
  },
  headerMeta: {
    alignItems: "flex-end",
    maxWidth: "58%",
  },
  headerTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: C.text,
    marginBottom: 3,
  },
  muted: {
    fontSize: 8,
    color: C.muted,
    lineHeight: 1.4,
  },
  preparedFor: {
    fontSize: 8,
    color: C.muted,
    marginBottom: 14,
    lineHeight: 1.4,
  },
  scenarioBadge: {
    marginTop: 5,
    backgroundColor: C.goldTint,
    borderWidth: 1,
    borderColor: C.gold,
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  scenarioBadgeText: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.text,
    marginBottom: 8,
  },
  execSummary: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 4,
    padding: 14,
    marginBottom: 16,
  },
  execSummaryText: {
    fontSize: 8.5,
    color: C.text,
    lineHeight: 1.55,
  },
  kpiRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  kpi: {
    flex: 1,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 4,
    padding: 10,
  },
  kpiHighlight: {
    flex: 1,
    backgroundColor: C.goldTint,
    borderWidth: 1.5,
    borderColor: C.gold,
    borderRadius: 4,
    padding: 12,
  },
  kpiLabel: {
    fontSize: 7,
    color: C.muted,
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    color: C.text,
  },
  kpiValueGold: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
  },
  kpiValueLarge: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
  },
  kpiHint: {
    fontSize: 7,
    color: C.muted,
    marginTop: 3,
  },
  recommendBox: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.gold,
    borderRadius: 4,
    padding: 14,
    marginTop: 8,
    marginBottom: 12,
  },
  recommendTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.text,
    marginBottom: 10,
  },
  recommendNote: {
    fontSize: 7.5,
    color: C.muted,
    lineHeight: 1.45,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  twoCol: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  col: {
    flex: 1,
  },
  card: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 4,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  rowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  rowLabel: {
    fontSize: 8,
    color: C.muted,
    flex: 1,
    paddingRight: 8,
  },
  rowValue: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.text,
    textAlign: "right",
    maxWidth: "55%",
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: C.goldTint,
    marginHorizontal: -10,
    paddingHorizontal: 10,
    marginTop: -2,
    marginBottom: 2,
  },
  tableHeaderCell: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: C.muted,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  tableRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  tableCell: {
    fontSize: 8,
    color: C.text,
  },
  tableCellMuted: {
    fontSize: 8,
    color: C.muted,
  },
  scenarioBlock: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  scenarioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  highlightRow: {
    backgroundColor: C.goldTint,
    marginHorizontal: -10,
    paddingHorizontal: 10,
    borderBottomWidth: 0,
  },
  summaryCard: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 8,
    color: C.muted,
    lineHeight: 1.5,
  },
  bulletList: {
    marginTop: 6,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 5,
    paddingRight: 4,
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
    color: C.gold,
    fontFamily: "Helvetica-Bold",
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    color: C.text,
    lineHeight: 1.4,
  },
  checkItem: {
    flexDirection: "row",
    marginBottom: 6,
    paddingRight: 4,
  },
  checkMark: {
    width: 12,
    fontSize: 8,
    color: C.gold,
    fontFamily: "Helvetica-Bold",
  },
  forecastNote: {
    fontSize: 7.5,
    color: C.muted,
    lineHeight: 1.5,
    marginBottom: 12,
  },
  disclaimerLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.muted,
    marginBottom: 6,
  },
  disclaimerText: {
    fontSize: 6.5,
    color: C.muted,
    lineHeight: 1.45,
    textAlign: "justify",
  },
  footerLine: {
    fontSize: 7,
    color: C.muted,
    textAlign: "center",
    marginTop: 10,
  },
  pageNum: {
    position: "absolute",
    bottom: 22,
    right: 40,
    fontSize: 7,
    color: C.muted,
  },
});

function fmtCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtMultiple(n: number) {
  return `${n.toFixed(2)}x`;
}

function fmtPct(n: number) {
  return `${n.toFixed(0)}%`;
}

function fmtCount(n: number, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(n);
}

interface ForecastPdfDocumentProps {
  inputs: ForecastInputs;
  snapshot: ForecastSnapshot;
  scenarios: Record<ScenarioKey, ForecastSnapshot>;
  projections: PeriodProjection[];
  scenario: ScenarioKey;
  scenarioLabel: string;
  preparedFor?: string;
}

export function ForecastPdfDocument({
  inputs,
  projections,
  scenario,
  scenarioLabel,
  preparedFor,
}: ForecastPdfDocumentProps) {
  const pkg = computeSinglePackageSnapshot(inputs, scenario);
  const rates = getEffectiveRates(inputs, scenario);
  const packageScenarios = {
    conservative: computeSinglePackageSnapshot(inputs, "conservative"),
    expected: computeSinglePackageSnapshot(inputs, "expected"),
    aggressive: computeSinglePackageSnapshot(inputs, "aggressive"),
  };

  const breakEvenPeriod =
    projections.findIndex((p) => p.cumulativeProfit >= 0) + 1;
  const endProfit =
    projections[projections.length - 1]?.cumulativeProfit ?? 0;
  const dateStr = new Date().toLocaleDateString("en-US", {
    dateStyle: "long",
  });

  const leads = pkg.leadsInPackage;
  const estimatedSalesRounded = Math.round(pkg.salesClosed * 10) / 10;

  const executiveSummary = `Based on the numbers entered, a ${fmtCount(leads)}-lead package at ${fmtCurrency(inputs.costPerLead)}/lead represents a ${fmtCurrency(pkg.totalLeadInvestment)} lead investment. With a ${fmtCurrency(inputs.dealSize)} average deal size, this package needs about ${pkg.breakEvenSales} sales to break even. The expected scenario models approximately ${fmtCount(estimatedSalesRounded, estimatedSalesRounded % 1 === 0 ? 0 : 1)} sales, ${fmtCurrency(pkg.revenue)} in revenue, and ${fmtCurrency(pkg.profit)} in projected profit after lead cost.`;

  const preparedLine = preparedFor?.trim()
    ? `Prepared for ${preparedFor.trim()}`
    : "Custom forecast based on entered sales assumptions.";

  return (
    <Document>
      {/* Page 1 — Executive Business Case */}
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.accent} fixed />

        <View style={styles.header}>
          <Text style={styles.brand}>LION MARKETING</Text>
          <View style={styles.headerMeta}>
            <Text style={styles.headerTitle}>Lead Package Forecast</Text>
            <Text style={styles.muted}>{dateStr}</Text>
            <View style={styles.scenarioBadge}>
              <Text style={styles.scenarioBadgeText}>
                {scenarioLabel} scenario
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.preparedFor}>{preparedLine}</Text>

        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <View style={styles.execSummary}>
          <Text style={styles.execSummaryText}>{executiveSummary}</Text>
        </View>

        <View style={styles.kpiRow}>
          <View style={styles.kpi}>
            <Text style={styles.kpiLabel}>Lead investment</Text>
            <Text style={styles.kpiValue}>
              {fmtCurrency(pkg.totalLeadInvestment)}
            </Text>
          </View>
          <View style={styles.kpiHighlight}>
            <Text style={styles.kpiLabel}>Break-even sales</Text>
            <Text style={styles.kpiValueLarge}>
              {String(pkg.breakEvenSales)}
            </Text>
            <Text style={styles.kpiHint}>Sales needed to recover lead cost</Text>
          </View>
          <View style={styles.kpi}>
            <Text style={styles.kpiLabel}>Estimated sales</Text>
            <Text style={styles.kpiValueGold}>
              {fmtCount(pkg.salesClosed, 1)}
            </Text>
          </View>
        </View>

        <View style={styles.kpiRow}>
          <View style={styles.kpi}>
            <Text style={styles.kpiLabel}>Expected revenue</Text>
            <Text style={styles.kpiValue}>{fmtCurrency(pkg.revenue)}</Text>
          </View>
          <View style={styles.kpi}>
            <Text style={styles.kpiLabel}>Expected profit after lead cost</Text>
            <Text style={styles.kpiValueGold}>{fmtCurrency(pkg.profit)}</Text>
          </View>
          <View style={styles.kpi}>
            <Text style={styles.kpiLabel}>Revenue multiple</Text>
            <Text style={styles.kpiValue}>
              {fmtMultiple(pkg.revenueMultiple)}
            </Text>
            <Text style={styles.kpiHint}>Revenue / investment</Text>
          </View>
        </View>

        <View style={styles.recommendBox}>
          <Text style={styles.recommendTitle}>Recommended Starting Package</Text>
          <Row label="Lead package" value={`${fmtCount(leads)} exclusive leads`} />
          <Row
            label="Delivery"
            value={`over ${inputs.fulfillmentPacingDays} calendar days`}
          />
          <Row
            label="Estimated investment"
            value={fmtCurrency(pkg.totalLeadInvestment)}
          />
          <Row
            label="Break-even point"
            value={`${pkg.breakEvenSales} sales`}
          />
          <Row
            label="Expected outcome"
            value={`${fmtCount(estimatedSalesRounded, estimatedSalesRounded % 1 === 0 ? 0 : 1)} sales`}
          />
          <Row
            label="Projected profit after lead cost"
            value={fmtCurrency(pkg.profit)}
            last
          />
          <Text style={styles.recommendNote}>
            Recommended next step: Start with this package, track
            lead-to-appointment rate, show rate, and sales, then decide whether
            to scale.
          </Text>
        </View>

        <Text style={styles.footerLine}>{FOOTER_LINE}</Text>
        <Text style={styles.pageNum} fixed>
          1 / 3
        </Text>
      </Page>

      {/* Page 2 — Forecast Details */}
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.accent} fixed />

        <View style={styles.header}>
          <Text style={styles.brand}>LION MARKETING</Text>
          <View style={styles.headerMeta}>
            <Text style={styles.headerTitle}>Forecast Details</Text>
            <Text style={styles.muted}>{dateStr}</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>How This Forecast Was Built</Text>
          <Text style={styles.summaryText}>
            This report uses the sales assumptions entered in the forecast tool:
            package size, cost per lead, booking rate, show rate, close rate,
            average deal size, and delivery timing. The forecast shows what the
            package would need to produce to break even and what it may produce
            under the selected scenario.
          </Text>
        </View>

        <View style={[styles.summaryCard, { marginBottom: 14 }]}>
          <Text style={styles.sectionTitle}>Expected Scenario Summary</Text>
          <View style={styles.card}>
            <Row label="Revenue" value={fmtCurrency(pkg.revenue)} />
            <Row label="Profit" value={fmtCurrency(pkg.profit)} />
            <Row
              label="Revenue multiple"
              value={fmtMultiple(pkg.revenueMultiple)}
            />
            <Row
              label="Break-even sales"
              value={String(pkg.breakEvenSales)}
            />
            <Row
              label="Lead-to-sale rate"
              value={fmtPct(pkg.leadToSaleRate)}
              last
            />
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Funnel</Text>
            <View style={styles.card}>
              <FunnelTable
                rows={[
                  {
                    stage: "Leads",
                    count: fmtCount(leads),
                    assumption: "Starting package",
                  },
                  {
                    stage: "Appointments",
                    count: fmtCount(Math.round(pkg.appointmentsBooked)),
                    assumption: `${fmtPct(rates.bookingRate)} booking rate`,
                  },
                  {
                    stage: "Held Appointments",
                    count: fmtCount(Math.round(pkg.appointmentsHeld)),
                    assumption: `${fmtPct(rates.showRate)} show rate`,
                  },
                  {
                    stage: "Sales",
                    count: fmtCount(pkg.salesClosed, 1),
                    assumption: `${fmtPct(rates.closeRate)} close rate`,
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Economics</Text>
            <View style={styles.card}>
              <Row
                label="Lead investment"
                value={fmtCurrency(pkg.totalLeadInvestment)}
              />
              <Row
                label="Net profit per lead"
                value={fmtCurrency(pkg.profitPerLead)}
              />
              <Row
                label="Modeled CPL"
                value={fmtCurrency(inputs.costPerLead)}
              />
              <Row
                label="Cost per sale"
                value={fmtCurrency(pkg.costPerSale)}
              />
              {pkg.revenuePerLead > 0 ? (
                <Row
                  label="Revenue per lead"
                  value={fmtCurrency(pkg.revenuePerLead)}
                  last
                />
              ) : (
                <Row label="Revenue per lead" value="N/A" last />
              )}
            </View>
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Your Inputs</Text>
            <View style={styles.card}>
              <Row label="Deal size" value={fmtCurrency(inputs.dealSize)} />
              <Row
                label="Booking, show, close"
                value={`${inputs.bookingRate}% / ${inputs.showRate}% / ${inputs.closeRate}%`}
              />
              <Row
                label="Package"
                value={`${fmtCount(inputs.leads)} leads @ ${fmtCurrency(inputs.costPerLead)}`}
              />
              <Row
                label="Purchases (12 mo)"
                value={String(inputs.leadPackagesPerYear)}
              />
              <Row label="Team" value={String(inputs.teamSize)} last />
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Delivery and Timing</Text>
            <View style={styles.card}>
              <Row
                label="Package pacing"
                value={`${inputs.fulfillmentPacingDays} calendar days`}
              />
              <Row
                label="Lead-to-close"
                value={`${inputs.salesCycleDays} days`}
              />
              <Row
                label="Break-even"
                value={
                  breakEvenPeriod > 0
                    ? `Period ${breakEvenPeriod}`
                    : "Beyond 12 months"
                }
              />
              <Row
                label="Year-end profit"
                value={fmtCurrency(endProfit)}
                last
              />
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Scenario Comparison</Text>
        <View style={styles.scenarioBlock}>
          {(["conservative", "expected", "aggressive"] as const).map(
            (key, i, arr) => (
              <View
                key={key}
                style={[
                  styles.scenarioRow,
                  key === scenario ? styles.highlightRow : {},
                  i === arr.length - 1 ? { borderBottomWidth: 0 } : {},
                ]}
              >
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: "Helvetica-Bold",
                    color: C.text,
                    width: "32%",
                  }}
                >
                  {SCENARIO_LABELS[key]}
                </Text>
                <Text
                  style={{ fontSize: 8, color: C.muted, textAlign: "right" }}
                >
                  {fmtCurrency(packageScenarios[key].revenue)} /{" "}
                  {fmtMultiple(packageScenarios[key].revenueMultiple)}
                </Text>
              </View>
            )
          )}
        </View>

        <Text style={styles.footerLine}>{FOOTER_LINE}</Text>
        <Text style={styles.pageNum} fixed>
          2 / 3
        </Text>
      </Page>

      {/* Page 3 — Fit, Success Factors, Disclaimer */}
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.accent} fixed />

        <View style={styles.header}>
          <Text style={styles.brand}>LION MARKETING</Text>
          <View style={styles.headerMeta}>
            <Text style={styles.headerTitle}>Package Fit and Next Steps</Text>
            <Text style={styles.muted}>{dateStr}</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>What the Package Includes</Text>
          <View style={styles.bulletList}>
            {PACKAGE_INCLUDES.map((item) => (
              <View key={item} style={styles.bulletItem}>
                <Text style={styles.bulletDot}>{"\u2022"}</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>
            What Has to Happen on Your Side
          </Text>
          <Text style={styles.summaryText}>
            The best results usually come when leads are worked quickly,
            consistently, and with a clear sales process.
          </Text>
          <View style={[styles.bulletList, { marginTop: 10 }]}>
            {SUCCESS_CHECKLIST.map((item) => (
              <View key={item} style={styles.checkItem}>
                <Text style={styles.checkMark}>{"\u2713"}</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.summaryCard, { marginBottom: 10 }]}>
          <Text style={styles.sectionTitle}>Forecast Note</Text>
          <Text style={styles.forecastNote}>{FORECAST_NOTE}</Text>
          <Text style={styles.disclaimerLabel}>Important Disclaimer</Text>
          <Text style={styles.disclaimerText}>{FORECAST_DISCLAIMER}</Text>
        </View>

        <Text style={styles.footerLine}>{FOOTER_LINE}</Text>
        <Text style={styles.pageNum} fixed>
          3 / 3
        </Text>
      </Page>
    </Document>
  );
}

function Row({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.row, last ? styles.rowLast : {}]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

function FunnelTable({
  rows,
}: {
  rows: { stage: string; count: string; assumption: string }[];
}) {
  return (
    <View>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { width: "34%" }]}>Stage</Text>
        <Text style={[styles.tableHeaderCell, { width: "22%" }]}>Count</Text>
        <Text style={[styles.tableHeaderCell, { width: "44%" }]}>
          Assumption
        </Text>
      </View>
      {rows.map((row, i) => (
        <View
          key={row.stage}
          style={[
            styles.tableRow,
            i === rows.length - 1 ? styles.tableRowLast : {},
          ]}
        >
          <Text style={[styles.tableCell, { width: "34%" }]}>{row.stage}</Text>
          <Text
            style={[
              styles.tableCell,
              { width: "22%", fontFamily: "Helvetica-Bold" },
            ]}
          >
            {row.count}
          </Text>
          <Text style={[styles.tableCellMuted, { width: "44%" }]}>
            {row.assumption}
          </Text>
        </View>
      ))}
    </View>
  );
}

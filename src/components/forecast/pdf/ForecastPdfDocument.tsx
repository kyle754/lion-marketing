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
} from "@/lib/forecast/types";
import { FORECAST_DISCLAIMER } from "@/lib/forecast/disclaimer";
import { SCENARIO_LABELS } from "@/lib/forecast/scenarios";

const C = {
  paper: "#FAF8F4",
  surface: "#FFFFFF",
  border: "#E8E4DC",
  muted: "#6B7280",
  text: "#0B0D10",
  gold: "#B8941F",
  goldTint: "#F5F0E6",
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    paddingTop: 36,
    paddingBottom: 40,
    backgroundColor: C.paper,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: C.text,
  },
  page2: {
    paddingHorizontal: 40,
    paddingTop: 36,
    paddingBottom: 36,
    backgroundColor: C.paper,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: C.text,
    position: "relative",
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
    marginBottom: 20,
    paddingBottom: 14,
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
  },
  headerTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: C.text,
    marginBottom: 4,
  },
  muted: {
    fontSize: 8,
    color: C.muted,
  },
  scenarioBadge: {
    marginTop: 6,
    backgroundColor: C.goldTint,
    borderWidth: 1,
    borderColor: C.gold,
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  scenarioBadgeText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
  },
  kpiRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  kpi: {
    flex: 1,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 4,
    padding: 12,
  },
  kpiLabel: {
    fontSize: 7,
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
  },
  kpiHint: {
    fontSize: 7,
    color: C.muted,
    marginTop: 3,
  },
  twoCol: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 14,
  },
  col: {
    flex: 1,
  },
  sectionLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
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
  scenarioBlock: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
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
  page2Body: {
    flex: 1,
    minHeight: 520,
  },
  summaryCard: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 4,
    padding: 14,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.text,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 8,
    color: C.muted,
    lineHeight: 1.45,
  },
  disclaimerWrap: {
    position: "absolute",
    bottom: 36,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 14,
  },
  disclaimerLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 7,
    color: C.muted,
    lineHeight: 1.5,
    textAlign: "justify",
  },
  pageNum: {
    position: "absolute",
    bottom: 20,
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

function fmtPct(n: number) {
  return `${n.toFixed(0)}%`;
}

interface ForecastPdfDocumentProps {
  inputs: ForecastInputs;
  snapshot: ForecastSnapshot;
  scenarios: Record<"conservative" | "expected" | "aggressive", ForecastSnapshot>;
  projections: PeriodProjection[];
  scenarioLabel: string;
}

export function ForecastPdfDocument({
  inputs,
  snapshot,
  scenarios,
  projections,
  scenarioLabel,
}: ForecastPdfDocumentProps) {
  const breakEven = projections.findIndex((p) => p.cumulativeProfit >= 0) + 1;
  const endProfit =
    projections[projections.length - 1]?.cumulativeProfit ?? 0;
  const dateStr = new Date().toLocaleDateString("en-US", {
    dateStyle: "long",
  });

  return (
    <Document>
      {/* Page 1 — executive summary only */}
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.accent} fixed />

        <View style={styles.header}>
          <Text style={styles.brand}>LION MARKETING</Text>
          <View style={styles.headerMeta}>
            <Text style={styles.headerTitle}>ROI Growth Projection</Text>
            <Text style={styles.muted}>{dateStr}</Text>
            <View style={styles.scenarioBadge}>
              <Text style={styles.scenarioBadgeText}>{scenarioLabel} scenario</Text>
            </View>
          </View>
        </View>

        <View style={styles.kpiRow}>
          <View style={styles.kpi}>
            <Text style={styles.kpiLabel}>12-month revenue</Text>
            <Text style={styles.kpiValue}>{fmtCurrency(snapshot.revenue)}</Text>
            <Text style={styles.kpiHint}>All packages combined</Text>
          </View>
          <View style={styles.kpi}>
            <Text style={styles.kpiLabel}>Net profit</Text>
            <Text style={styles.kpiValue}>{fmtCurrency(snapshot.profit)}</Text>
            <Text style={styles.kpiHint}>After lead investment</Text>
          </View>
          <View style={styles.kpi}>
            <Text style={styles.kpiLabel}>ROI</Text>
            <Text style={styles.kpiValue}>{fmtPct(snapshot.roi)}</Text>
            <Text style={styles.kpiHint}>Revenue ÷ investment</Text>
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.sectionLabel}>Funnel</Text>
            <View style={styles.card}>
              <Row label="Leads" value={String(Math.round(snapshot.leads))} />
              <Row
                label="Appointments"
                value={String(Math.round(snapshot.appointmentsBooked))}
              />
              <Row
                label="Shows"
                value={String(Math.round(snapshot.appointmentsHeld))}
              />
              <Row
                label="Sales"
                value={snapshot.salesClosed.toFixed(1)}
                last
              />
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.sectionLabel}>Economics</Text>
            <View style={styles.card}>
              <Row
                label="Lead investment"
                value={fmtCurrency(snapshot.totalLeadInvestment)}
              />
              <Row
                label="Net profit / lead"
                value={fmtCurrency(snapshot.profitPerLead)}
              />
              <Row label="CPL modeled" value={fmtCurrency(inputs.costPerLead)} />
              <Row
                label="Cost per sale"
                value={fmtCurrency(snapshot.costPerSale)}
                last
              />
            </View>
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.sectionLabel}>Your inputs</Text>
            <View style={styles.card}>
              <Row label="Deal size" value={fmtCurrency(inputs.dealSize)} />
              <Row
                label="Booking · show · close"
                value={`${inputs.bookingRate}% · ${inputs.showRate}% · ${inputs.closeRate}%`}
              />
              <Row
                label="Package"
                value={`${inputs.leads} leads @ ${fmtCurrency(inputs.costPerLead)}`}
              />
              <Row
                label="Purchases (12 mo)"
                value={String(inputs.leadPackagesPerYear)}
              />
              <Row label="Team" value={String(inputs.teamSize)} last />
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.sectionLabel}>Delivery & timing</Text>
            <View style={styles.card}>
              <Row
                label="First lead"
                value={`${inputs.firstLeadBusinessDays} business days`}
              />
              <Row
                label="Package pacing"
                value={`${inputs.fulfillmentPacingDays} calendar days`}
              />
              <Row
                label="Lead → closed"
                value={`${inputs.salesCycleDays} days`}
              />
              <Row
                label="Break-even"
                value={
                  breakEven > 0 ? `Period ${breakEven}` : "Beyond 12 months"
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

        <Text style={styles.sectionLabel}>Scenario comparison</Text>
        <View style={styles.scenarioBlock}>
          {(["conservative", "expected", "aggressive"] as const).map(
            (key, i, arr) => (
              <View
                key={key}
                style={[
                  styles.scenarioRow,
                  key === "expected" ? styles.highlightRow : {},
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
                <Text style={{ fontSize: 8, color: C.muted, textAlign: "right" }}>
                  {fmtCurrency(scenarios[key].revenue)} · {fmtPct(scenarios[key].roi)} ROI
                </Text>
              </View>
            )
          )}
        </View>

        <Text style={[styles.muted, { textAlign: "center", marginTop: 4 }]}>
          Discrete lead packages · paced delivery · not an annual subscription
        </Text>

        <Text style={styles.pageNum} fixed>
          1 / 2
        </Text>
      </Page>

      {/* Page 2 — brief context + disclaimer pinned to bottom */}
      <Page size="A4" style={styles.page2} wrap={false}>
        <View style={styles.accent} fixed />

        <View style={styles.header}>
          <Text style={styles.brand}>LION MARKETING</Text>
          <View style={styles.headerMeta}>
            <Text style={styles.muted}>Projection report</Text>
            <Text style={styles.muted}>{dateStr}</Text>
          </View>
        </View>

        <View style={styles.page2Body}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>How to read this report</Text>
            <Text style={styles.summaryText}>
              Figures reflect the {scenarioLabel.toLowerCase()} scenario using
              your entered conversion rates, package size, purchase count, and
              timing assumptions. Revenue and profit scale with additional
              packages purchased within the 12-month window. Timeline charts in
              the live tool model leads dripping across your pacing window after
              first delivery, then revenue after your lead-to-close cycle.
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Active scenario snapshot</Text>
            <View style={styles.card}>
              <Row label="Revenue" value={fmtCurrency(snapshot.revenue)} />
              <Row label="Profit" value={fmtCurrency(snapshot.profit)} />
              <Row label="ROI" value={fmtPct(snapshot.roi)} />
              <Row
                label="Lead → sale rate"
                value={fmtPct(snapshot.leadToSaleRate)}
                last
              />
            </View>
          </View>
        </View>

        <View style={styles.disclaimerWrap} fixed>
          <Text style={styles.disclaimerLabel}>Important disclaimer</Text>
          <Text style={styles.disclaimerText}>{FORECAST_DISCLAIMER}</Text>
        </View>

        <Text style={styles.pageNum} fixed>
          2 / 2
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

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./calculator.module.css";

const productOptions = [
  "Final Expense",
  "Term Life",
  "IUL",
  "Whole Life",
  "Mortgage Protection",
  "Annuity",
  "Other Life Insurance",
];

const defaults = {
  prospectName: "",
  product: "Final Expense",
  leads: 200,
  costPerLead: 45,
  commission: 2500,
  appointmentRate: 33,
  showRate: 65,
  closeRate: 20,
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

function safeRate(value: number) {
  return Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));
}

function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <span className={styles.inputWrap}>
        {prefix && <i>{prefix}</i>}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        {suffix && <i>{suffix}</i>}
      </span>
    </label>
  );
}

export function LeadRoiCalculator() {
  const [prospectName, setProspectName] = useState(defaults.prospectName);
  const [product, setProduct] = useState(defaults.product);
  const [leads, setLeads] = useState(defaults.leads);
  const [costPerLead, setCostPerLead] = useState(defaults.costPerLead);
  const [commission, setCommission] = useState(defaults.commission);
  const [appointmentRate, setAppointmentRate] = useState(defaults.appointmentRate);
  const [showRate, setShowRate] = useState(defaults.showRate);
  const [closeRate, setCloseRate] = useState(defaults.closeRate);

  const forecast = useMemo(() => {
    const safeLeads = Math.max(0, Number.isFinite(leads) ? leads : 0);
    const safeCost = Math.max(0, Number.isFinite(costPerLead) ? costPerLead : 0);
    const safeCommission = Math.max(0, Number.isFinite(commission) ? commission : 0);
    const appointments = safeLeads * (safeRate(appointmentRate) / 100);
    const held = appointments * (safeRate(showRate) / 100);
    const sales = held * (safeRate(closeRate) / 100);
    const investment = safeLeads * safeCost;
    const revenue = sales * safeCommission;
    const profit = revenue - investment;
    const revenueMultiple = investment > 0 ? revenue / investment : 0;
    const returnOnSpend = revenueMultiple * 100;
    const breakEvenSales = safeCommission > 0 ? Math.ceil(investment / safeCommission) : 0;
    const finalConversion = (safeRate(appointmentRate) / 100) * (safeRate(showRate) / 100) * (safeRate(closeRate) / 100);
    const breakEvenLeads = finalConversion > 0 ? Math.ceil(breakEvenSales / finalConversion) : 0;

    return {
      leads: safeLeads,
      appointments,
      held,
      sales,
      investment,
      revenue,
      profit,
      returnOnSpend,
      revenueMultiple,
      breakEvenSales,
      breakEvenLeads,
    };
  }, [leads, costPerLead, commission, appointmentRate, showRate, closeRate]);

  const reset = () => {
    setProspectName(defaults.prospectName);
    setProduct(defaults.product);
    setLeads(defaults.leads);
    setCostPerLead(defaults.costPerLead);
    setCommission(defaults.commission);
    setAppointmentRate(defaults.appointmentRate);
    setShowRate(defaults.showRate);
    setCloseRate(defaults.closeRate);
  };

  const funnel = [
    { label: "Qualified leads", value: forecast.leads, rate: "100%" },
    { label: "Appointments", value: forecast.appointments, rate: `${safeRate(appointmentRate)}% book rate` },
    { label: "Held appointments", value: forecast.held, rate: `${safeRate(showRate)}% show rate` },
    { label: "Estimated sales", value: forecast.sales, rate: `${safeRate(closeRate)}% close rate` },
  ];

  const preparedFor = prospectName.trim() || "Prospective Partner";
  const preparedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(new Date());

  return (
    <div className={styles.page}>
      <div className={styles.interactiveCalculator}>
        <header className={styles.topbar}>
          <Link className={styles.brand} href="/" aria-label="Lion Marketing home">
            <span>LM</span>
            <strong>Lion Marketing</strong>
          </Link>
          <div>
            <span className={styles.internalBadge}>Internal tool</span>
            <button className={styles.resetButton} type="button" onClick={reset}>Reset</button>
            <button className={styles.exportButton} type="button" onClick={() => window.print()}>
              Export PDF report
            </button>
          </div>
        </header>

        <main className={styles.calculatorShell}>
          <div className={styles.intro}>
            <p>Lead package forecast</p>
            <h1>Plug in the numbers. <em>See the return.</em></h1>
            <span>A simple planning model for insurance lead campaigns.</span>
          </div>

          <div className={styles.workspace}>
            <aside className={styles.inputsPanel}>
              <div className={styles.panelLabel}><i /> Package assumptions</div>

              <label className={styles.textField}>
                <span>Prepared for</span>
                <input
                  type="text"
                  value={prospectName}
                  placeholder="Prospect or agency name"
                  onChange={(event) => setProspectName(event.target.value)}
                />
              </label>

              <label className={styles.textField}>
                <span>Lead product</span>
                <select value={product} onChange={(event) => setProduct(event.target.value)}>
                  {productOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>

              <div className={styles.fieldGroup}>
                <p>Lead package</p>
                <InputField label="Number of leads" value={leads} onChange={setLeads} min={1} />
                <InputField label="Cost per lead" value={costPerLead} onChange={setCostPerLead} prefix="$" min={0} step={1} />
                <InputField label="Average commission per sale" value={commission} onChange={setCommission} prefix="$" min={0} step={100} />
              </div>

              <div className={styles.fieldGroup}>
                <p>Conversion rates</p>
                <InputField label="Lead to appointment" value={appointmentRate} onChange={setAppointmentRate} suffix="%" min={0} max={100} />
                <InputField label="Appointment show rate" value={showRate} onChange={setShowRate} suffix="%" min={0} max={100} />
                <InputField label="Close rate" value={closeRate} onChange={setCloseRate} suffix="%" min={0} max={100} />
              </div>

              <p className={styles.inputNote}>Use the prospect’s real numbers. Forecasts update instantly.</p>
            </aside>

            <section className={styles.resultsPanel} aria-live="polite">
              <div className={styles.heroResult}>
                <div>
                  <span>Projected profit after lead cost</span>
                  <strong className={forecast.profit < 0 ? styles.negative : ""}>{money.format(forecast.profit)}</strong>
                  <p>Based on {number.format(forecast.sales)} estimated sales from {number.format(forecast.leads)} qualified {product.toLowerCase()} leads.</p>
                </div>
                <div className={styles.roiResult}>
                  <strong>{number.format(forecast.returnOnSpend)}%</strong>
                  <span>return on lead spend</span>
                </div>
              </div>

              <div className={styles.metricsGrid}>
                <article><span>Lead investment</span><strong>{money.format(forecast.investment)}</strong></article>
                <article><span>Projected revenue</span><strong>{money.format(forecast.revenue)}</strong></article>
                <article><span>Estimated sales</span><strong>{number.format(forecast.sales)}</strong></article>
                <article><span>Revenue multiple</span><strong>{number.format(forecast.revenueMultiple)}×</strong></article>
              </div>

              <div className={styles.funnelCard}>
                <div className={styles.cardHeading}>
                  <div><span>The funnel</span><h2>How the package turns into sales</h2></div>
                  <p>Break even at <strong>{forecast.breakEvenSales} sales</strong></p>
                </div>
                <div className={styles.funnelRows}>
                  {funnel.map((stage) => {
                    const width = forecast.leads > 0 ? Math.max((stage.value / forecast.leads) * 100, stage.value > 0 ? 2 : 0) : 0;
                    return (
                      <div className={styles.funnelRow} key={stage.label}>
                        <div><strong>{stage.label}</strong><span>{stage.rate}</span></div>
                        <div className={styles.barTrack}><i style={{ width: `${Math.min(width, 100)}%` }} /></div>
                        <b>{number.format(stage.value)}</b>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.summaryCard}>
                <div>
                  <span>What this means</span>
                  <p>
                    A {number.format(forecast.leads)}-lead package at {money.format(costPerLead)} per lead requires approximately <strong>{forecast.breakEvenSales} sales to recover the lead investment</strong>. At the entered conversion rates, the model estimates {number.format(forecast.sales)} sales and {money.format(forecast.profit)} in profit after lead cost.
                  </p>
                </div>
                <div>
                  <span>Break-even volume</span>
                  <strong>{number.format(forecast.breakEvenLeads)} leads</strong>
                </div>
              </div>

              <p className={styles.disclaimer}>Illustrative forecast only. Results are not guaranteed and depend on follow-up, sales process, product fit, underwriting, market conditions, and other factors.</p>
            </section>
          </div>
        </main>
      </div>

      <section className={styles.printReport} aria-label="Client lead ROI report">
        <header className={styles.printHeader}>
          <div className={styles.printBrand}><span>LM</span><div><strong>Lion Marketing</strong><small>Lead performance forecast</small></div></div>
          <div><span>Prepared for</span><strong>{preparedFor}</strong><small>{preparedDate}</small></div>
        </header>

        <div className={styles.printTitle}>
          <p>{product} lead package</p>
          <h1>A practical path from qualified leads to production.</h1>
          <span>This forecast uses the conversion rates and economics provided for planning purposes.</span>
        </div>

        <div className={styles.printHero}>
          <div><span>Projected profit after lead cost</span><strong>{money.format(forecast.profit)}</strong><p>{number.format(forecast.sales)} estimated sales · {number.format(forecast.returnOnSpend)}% return on lead spend</p></div>
          <div><span>Lead investment</span><strong>{money.format(forecast.investment)}</strong><p>{number.format(forecast.leads)} campaign-qualified leads</p></div>
        </div>

        <div className={styles.printMetrics}>
          <div><span>Projected revenue</span><strong>{money.format(forecast.revenue)}</strong></div>
          <div><span>Revenue multiple</span><strong>{number.format(forecast.revenueMultiple)}×</strong></div>
          <div><span>Break-even point</span><strong>{forecast.breakEvenSales} sales</strong></div>
          <div><span>Cost per lead</span><strong>{money.format(costPerLead)}</strong></div>
        </div>

        <div className={styles.printBody}>
          <div className={styles.printFunnel}>
            <p>Modeled sales funnel</p>
            {funnel.map((stage, index) => (
              <div key={stage.label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage.label}</strong><small>{stage.rate}</small><b>{number.format(stage.value)}</b></div>
            ))}
          </div>
          <div className={styles.printAssumptions}>
            <p>Forecast assumptions</p>
            <dl>
              <div><dt>Average commission</dt><dd>{money.format(commission)}</dd></div>
              <div><dt>Appointment rate</dt><dd>{safeRate(appointmentRate)}%</dd></div>
              <div><dt>Show rate</dt><dd>{safeRate(showRate)}%</dd></div>
              <div><dt>Close rate</dt><dd>{safeRate(closeRate)}%</dd></div>
            </dl>
            <span>Every Lion Marketing campaign begins with agreed minimum qualification criteria. Prospects who do not meet them are filtered out before delivery.</span>
          </div>
        </div>

        <div className={styles.printNextStep}>
          <div><span>Recommended starting point</span><strong>{number.format(forecast.leads)} {product} leads</strong></div>
          <p>Lead volume and availability vary by product, state, targeting criteria, and current demand.</p>
          <div><strong>lionmarketingai.com</strong><span>Exclusive · Campaign-qualified · Phone verified</span></div>
        </div>

        <footer className={styles.printFooter}>
          <strong>Forecast note</strong>
          <p>This illustration is based entirely on the assumptions entered above and is not a guarantee of appointments, sales, revenue, profit, policy approval, or future performance. Actual results depend on speed to lead, follow-up consistency, sales skill, product fit, carrier underwriting, market conditions, and other factors.</p>
        </footer>
      </section>
    </div>
  );
}

import { SiteFooter, SiteHeader } from "./components/site-chrome";

const CALENDAR_URL =
  "https://link.lionmarketingai.com/widget/booking/19xLmsQpIvEy1VHenF6x";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://lionmarketingai.com/#organization",
      name: "Lion Marketing",
      url: "https://lionmarketingai.com/",
      description:
        "Lion Marketing is a life insurance lead generation partner helping independent agents and agencies build steadier production with exclusive, pay-per-lead prospects.",
      areaServed: "United States",
      knowsAbout: [
        "Life insurance leads",
        "Final expense leads",
        "Mortgage protection leads",
        "Term life insurance leads",
        "IUL leads",
        "Whole life insurance leads",
        "Annuity leads",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://lionmarketingai.com/#website",
      url: "https://lionmarketingai.com/",
      name: "Lion Marketing",
      publisher: { "@id": "https://lionmarketingai.com/#organization" },
    },
    {
      "@type": "Service",
      "@id": "https://lionmarketingai.com/#service",
      name: "Exclusive life insurance leads",
      serviceType: "Life insurance lead generation",
      provider: { "@id": "https://lionmarketingai.com/#organization" },
      areaServed: "United States",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Independent life insurance agents and agencies",
      },
      description:
        "Exclusive, pay-per-lead life insurance prospects that meet agreed campaign criteria, complete phone verification, and are delivered in real time.",
    },
  ],
};

const processSteps = [
  {
    number: "01",
    title: "Consumer intent",
    body: "A prospect asks for life insurance information through a compliant online form.",
  },
  {
    number: "02",
    title: "Minimum-criteria qualification",
    body: "Prospects must meet the campaign criteria agreed before launch. Those who do not qualify are filtered out before delivery.",
  },
  {
    number: "03",
    title: "Phone verification",
    body: "The prospect confirms their phone number with a one-time passcode before acceptance.",
  },
  {
    number: "04",
    title: "Exclusive delivery",
    body: "The lead is routed to one agent in real time, while the request is still fresh.",
  },
];

const standards = [
  "Full name",
  "Verified U.S. phone number",
  "Email address",
  "Age and state",
  "Consent timestamp",
  "Completed screening answers",
];

const products = [
  { name: "Final Expense", href: "/final-expense-leads" },
  { name: "Term Life", href: "/term-life-insurance-leads" },
  { name: "Mortgage Protection", href: "/mortgage-protection-leads" },
  { name: "Annuities", href: "/annuity-leads" },
  { name: "IUL", href: "/iul-leads" },
  { name: "Whole Life", href: "/whole-life-insurance-leads" },
];

const faqs = [
  {
    question: "Are Lion Marketing leads prequalified?",
    answer:
      "Yes—to the minimum campaign criteria agreed before launch. Prospects who do not meet those requirements are filtered out before delivery, so you pay only for accepted leads that satisfy the campaign standard. Campaign qualification is not the same as carrier underwriting, policy approval, or a guaranteed sale.",
  },
  {
    question: "Are Lion Marketing leads exclusive?",
    answer:
      "Yes. Each accepted lead is delivered to one agent only. We do not resell the same lead to multiple agents.",
  },
  {
    question: "How are phone numbers verified?",
    answer:
      "Before a submission is accepted, the prospect confirms their phone number using a one-time passcode. This helps reduce typos, fake numbers, and low-effort submissions.",
  },
  {
    question: "Are these live transfers or appointments?",
    answer:
      "They are exclusive, real-time raw life insurance leads—not live transfers or preset appointments. Your team controls the dialing, follow-up, and closing process.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Lion Marketing uses pay-per-lead pricing. Cost varies by product, target states, criteria, and volume. We review your goals first so pricing and available volume are clear before you begin.",
  },
  {
    question: "Who is the best fit?",
    answer:
      "Lion Marketing is built for independent agents and telesales teams that follow up consistently and want a steadier way to keep their pipeline full without building an ad operation in-house.",
  },
  {
    question: "How does Lion Marketing help support steady production?",
    answer:
      "We start with your product focus, target states, sales capacity, and lead volume goals. That lets us align available demand with the way your team actually works instead of dropping a generic batch of leads into your pipeline.",
  },
];

const leadGuides = [
  {
    href: "/life-insurance-leads",
    number: "01",
    title: "Life Insurance Leads",
    copy: "Understand lead types, delivery, quality standards, pricing variables, and what to evaluate before you buy.",
  },
  {
    href: "/exclusive-life-insurance-leads",
    number: "02",
    title: "Exclusive Leads",
    copy: "Learn what exclusivity changes, what it does not guarantee, and how teams can get more from fresh demand.",
  },
  {
    href: "/final-expense-leads",
    number: "03",
    title: "Final Expense Leads",
    copy: "See how final expense prospects are targeted, screened, verified, and routed to an agent.",
  },
];

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Exclusive life insurance leads</p>
          <h1>
            More conversations.
            <br />
            <em>Less wasted dial time.</em>
          </h1>
          <p className="hero-lede">
            Lion Marketing helps life insurance agents and teams keep their
            pipeline moving with exclusive, campaign-qualified prospects. Tell
            us what you sell, where you sell it, and the minimum criteria a
            prospect must meet—we filter out mismatches before delivery.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#book">
              See volume &amp; pricing <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href="#how-it-works">
              See how the lead flow works <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="trust-row" aria-label="Core lead standards">
            <span><i aria-hidden="true">✓</i> Qualified to agreed criteria</span>
            <span><i aria-hidden="true">✓</i> Exclusive to your team</span>
            <span><i aria-hidden="true">✓</i> Delivered in real time</span>
          </div>
        </div>

        <div className="signal-wrap" aria-label="Example of a verified lead record">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="signal-panel">
            <div className="signal-topline">
              <span>Lead quality signal</span>
              <span className="live"><i /> Live</span>
            </div>
            <div className="lead-card">
              <div className="lead-heading">
                <div className="lead-avatar">AJ</div>
                <div>
                  <strong>New qualified prospect</strong>
                  <span>Final Expense · Texas</span>
                </div>
                <span className="verified-badge">Qualified</span>
              </div>
              <dl className="lead-details">
                <div><dt>Phone</dt><dd>OTP confirmed</dd></div>
                <div><dt>Intent</dt><dd>Coverage requested</dd></div>
                <div><dt>Delivery</dt><dd>Exclusive to you</dd></div>
              </dl>
            </div>
            <div className="quality-score">
              <div className="score-copy">
                <span>Qualification complete</span>
                <strong>3 / 3 checks</strong>
              </div>
              <div className="score-bars" aria-hidden="true">
                <i /><i /><i /><i /><i /><i />
              </div>
            </div>
            <p className="signal-note">Minimum criteria met before delivery.</p>
          </div>
        </div>
      </section>

      <section className="proof-bar" aria-label="Lion Marketing lead model">
        <p>Lead flow built around your production goals</p>
        <div className="proof-items">
          <span><strong>01</strong> Target-state planning</span>
          <span><strong>02</strong> Minimum-criteria qualification</span>
          <span><strong>03</strong> Volume matched to capacity</span>
        </div>
      </section>

      <section className="section problem-section">
        <div className="section-kicker">A steadier way to buy life insurance leads</div>
        <div className="problem-grid">
          <h2>Buying leads shouldn’t feel like <em>starting over every week.</em></h2>
          <div className="problem-copy">
            <p>
              When lead supply is inconsistent, production gets harder to plan.
              Your agents either run short on people to call or waste time sorting
              through prospects that never fit the campaign in the first place.
            </p>
            <p className="emphasis-copy">
              Lion Marketing gives you a practical way to turn lead flow up when
              your team has room—and keep it aligned with the products and markets
              you want to grow.
            </p>
          </div>
        </div>
      </section>

      <section className="section process-section" id="how-it-works">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> How Lion Marketing leads work</p>
            <h2>Life insurance leads built for your pipeline.</h2>
          </div>
          <p>
            We combine campaign targeting, product-fit questions, phone
            verification, and exclusive delivery so your team gets a more useful
            starting point for follow-up.
          </p>
        </div>
        <div className="process-grid">
          {processSteps.map((step) => (
            <article className="process-card" key={step.number}>
              <span className="step-number">{step.number}</span>
              <div className="step-rule"><i /></div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section standards-section" id="standards">
        <div className="standards-copy">
          <p className="eyebrow light"><span /> A lead partner with clear standards</p>
          <h2>Know what is coming into your pipeline.</h2>
          <p>
            We agree on the product, geography, qualification criteria, and
            expected volume before launch. Prospects who do not meet those
            minimum requirements are filtered out before delivery, so you pay
            only for accepted leads that satisfy the campaign standard.
          </p>
          <a className="button button-light" href="#book">
            Talk through your lead plan <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="standards-list">
          <p className="list-label">Every accepted, qualified lead includes</p>
          <ul>
            {standards.map((standard, index) => (
              <li key={standard}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {standard}
                <i aria-hidden="true">✓</i>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section fit-section">
        <div className="fit-card fit-copy">
          <p className="eyebrow"><span /> More than a one-off lead order</p>
          <h2>A lead partner that helps keep production moving.</h2>
          <p>
            You bring the sales process. We help keep the top of the funnel fed
            with lead volume shaped around your product, states, and team capacity.
          </p>
          <ul className="fit-checks">
            <li><i>✓</i> Turn lead flow on when your agents have capacity</li>
            <li><i>✓</i> Expand by product or target state as demand allows</li>
            <li><i>✓</i> Keep your existing dialer, scripts, and follow-up process</li>
          </ul>
        </div>
        <div className="fit-card product-card">
          <p className="list-label">Supported lead categories</p>
          <div className="product-grid">
            {products.map((product, index) => (
              <a href={product.href} key={product.href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{product.name}</strong>
              </a>
            ))}
          </div>
          <p className="product-note">
            Each product campaign has agreed minimum criteria. Inquiries that do
            not meet them are filtered out before they reach your pipeline.
          </p>
        </div>
      </section>

      <section className="section guide-section" aria-labelledby="lead-guides-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> Life insurance lead resources</p>
            <h2 id="lead-guides-heading">Straightforward guides for buying and working leads.</h2>
          </div>
          <p>
            No vague promises. These guides explain the lead models, tradeoffs,
            and operating details agents should understand before adding volume.
          </p>
        </div>
        <div className="guide-grid">
          {leadGuides.map((guide) => (
            <a className="guide-card" href={guide.href} key={guide.href}>
              <span>{guide.number}</span>
              <h3>{guide.title}</h3>
              <p>{guide.copy}</p>
              <strong>Read the guide <i aria-hidden="true">→</i></strong>
            </a>
          ))}
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="faq-intro">
          <p className="eyebrow"><span /> Straight answers</p>
          <h2>Frequently asked questions.</h2>
          <p>
            The practical details agents and agencies usually want to know before
            adding a new life insurance lead source.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>
                <span>{faq.question}</span>
                <i aria-hidden="true">+</i>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta" id="book">
        <div className="cta-line"><span>Your products</span><i /><span>Your markets</span><i /><span>Your volume goals</span></div>
        <h2>See if Lion Marketing fits your production plan.</h2>
        <p>
          Pick a time below. We’ll review your product focus, target states, team
          capacity, current pricing, and realistic lead volume—then tell you
          plainly whether we can help.
        </p>
        <div className="calendar-shell">
          <iframe
            src={CALENDAR_URL}
            title="Schedule a lead volume and pricing call with Lion Marketing"
            id="19xLmsQpIvEy1VHenF6x_1784589844943"
            scrolling="yes"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <span className="cta-caption">30-minute fit call · Clear next steps · No obligation</span>
      </section>

      <SiteFooter />
    </main>
  );
}

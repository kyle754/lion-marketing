const productNavigation = [
  { href: "/final-expense-leads", label: "Final Expense" },
  { href: "/term-life-insurance-leads", label: "Term Life" },
  { href: "/iul-leads", label: "IUL" },
  { href: "/whole-life-insurance-leads", label: "Whole Life" },
  { href: "/mortgage-protection-leads", label: "Mortgage Protection" },
  { href: "/annuity-leads", label: "Annuity" },
];

const resourceNavigation = [
  { href: "/life-insurance-leads", label: "Life Insurance Lead Guide" },
  { href: "/exclusive-life-insurance-leads", label: "Exclusive Lead Guide" },
];

const companyNavigation = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#standards", label: "Qualification Standards" },
  { href: "/#faq", label: "Frequently Asked Questions" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Lion Marketing home">
        <span className="brand-mark">LM</span>
        <span className="brand-name">
          <strong>Lion</strong>
          <span>Marketing</span>
        </span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        <a href="/life-insurance-leads">Life Insurance Leads</a>
        <details className="product-nav">
          <summary>Lead Products <span aria-hidden="true">+</span></summary>
          <nav aria-label="Lead products">
            {productNavigation.map((item) => (
              <a href={item.href} key={item.href}>{item.label} Leads</a>
            ))}
          </nav>
        </details>
        <a href="/exclusive-life-insurance-leads">Exclusive Leads</a>
        <a href="/#how-it-works">How It Works</a>
      </nav>

      <div className="nav-actions">
        <a className="login-link" href="https://app.thelistinglion.com">
          Agent login
        </a>
        <details className="mobile-nav">
          <summary>Menu <span aria-hidden="true">+</span></summary>
          <nav className="mobile-nav-panel" aria-label="Mobile navigation">
            <a className="mobile-nav-home" href="/">Home</a>
            <details className="mobile-nav-group" open>
              <summary>Lead Products <span aria-hidden="true">+</span></summary>
              <div>
                {productNavigation.map((item) => (
                  <a href={item.href} key={item.href}>{item.label} Leads</a>
                ))}
              </div>
            </details>
            <details className="mobile-nav-group">
              <summary>Lead Guides <span aria-hidden="true">+</span></summary>
              <div>
                {resourceNavigation.map((item) => (
                  <a href={item.href} key={item.href}>{item.label}</a>
                ))}
              </div>
            </details>
            <details className="mobile-nav-group">
              <summary>About Lion Marketing <span aria-hidden="true">+</span></summary>
              <div>
                {companyNavigation.map((item) => (
                  <a href={item.href} key={item.href}>{item.label}</a>
                ))}
                <a href="https://app.thelistinglion.com">Agent Login</a>
              </div>
            </details>
          </nav>
        </details>
        <a className="button button-small" href="/#book">
          Check availability <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand-block">
          <a className="brand footer-brand" href="/" aria-label="Lion Marketing home">
            <span className="brand-mark">LM</span>
            <span className="brand-name"><strong>Lion</strong><span>Marketing</span></span>
          </a>
          <p>
            Exclusive, campaign-qualified insurance leads built around your
            product, markets, and team capacity.
          </p>
          <span className="footer-standard">Minimum criteria · Phone verified · Real-time delivery</span>
        </div>

        <nav className="footer-column" aria-label="Lead products">
          <p className="footer-heading">Lead Products</p>
          {productNavigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label} Leads</a>
          ))}
        </nav>

        <nav className="footer-column" aria-label="Lead resources">
          <p className="footer-heading">Lead Resources</p>
          {resourceNavigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
          <a href="/#standards">Qualification Standards</a>
          <a href="/#faq">Frequently Asked Questions</a>
        </nav>

        <nav className="footer-column" aria-label="Lion Marketing links">
          <p className="footer-heading">Lion Marketing</p>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#book">Check Availability</a>
          <a href="https://app.thelistinglion.com">Agent Login</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Lion Marketing LLC. All rights reserved.</span>
        <div>
          <a href="https://lionmarketingai.com/privacy-policy">Privacy</a>
          <a href="https://lionmarketingai.com/terms-of-service">Terms</a>
        </div>
      </div>
    </footer>
  );
}

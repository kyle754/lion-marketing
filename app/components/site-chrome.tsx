import Link from "next/link";

const CUSTOMER_PORTAL_URL = "https://app.lionmarketingai.com";

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
      <Link className="brand" href="/" aria-label="Lion Marketing home">
        <span className="brand-mark">LM</span>
        <span className="brand-name">
          <strong>Lion</strong>
          <span>Marketing</span>
        </span>
      </Link>

      <nav className="nav-links" aria-label="Primary navigation">
        <Link href="/life-insurance-leads">Life Insurance Leads</Link>
        <details className="product-nav">
          <summary>Lead Products <span aria-hidden="true">+</span></summary>
          <nav aria-label="Lead products">
            {productNavigation.map((item) => (
              <Link href={item.href} key={item.href}>{item.label} Leads</Link>
            ))}
          </nav>
        </details>
        <Link href="/exclusive-life-insurance-leads">Exclusive Leads</Link>
        <Link href="/#how-it-works">How It Works</Link>
      </nav>

      <div className="nav-actions">
        <a className="login-link" href={CUSTOMER_PORTAL_URL}>
          Agent login
        </a>
        <details className="mobile-nav">
          <summary>Menu <span aria-hidden="true">+</span></summary>
          <nav className="mobile-nav-panel" aria-label="Mobile navigation">
            <Link className="mobile-nav-home" href="/">Home</Link>
            <details className="mobile-nav-group" open>
              <summary>Lead Products <span aria-hidden="true">+</span></summary>
              <div>
                {productNavigation.map((item) => (
                  <Link href={item.href} key={item.href}>{item.label} Leads</Link>
                ))}
              </div>
            </details>
            <details className="mobile-nav-group">
              <summary>Lead Guides <span aria-hidden="true">+</span></summary>
              <div>
                {resourceNavigation.map((item) => (
                  <Link href={item.href} key={item.href}>{item.label}</Link>
                ))}
              </div>
            </details>
            <details className="mobile-nav-group">
              <summary>About Lion Marketing <span aria-hidden="true">+</span></summary>
              <div>
                {companyNavigation.map((item) => (
                  <Link href={item.href} key={item.href}>{item.label}</Link>
                ))}
                <a href={CUSTOMER_PORTAL_URL}>Agent Login</a>
              </div>
            </details>
          </nav>
        </details>
        <Link className="button button-small" href="/#book">
          Check availability <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand-block">
          <Link className="brand footer-brand" href="/" aria-label="Lion Marketing home">
            <span className="brand-mark">LM</span>
            <span className="brand-name"><strong>Lion</strong><span>Marketing</span></span>
          </Link>
          <p>
            Exclusive, campaign-qualified insurance leads built around your
            product, markets, and team capacity.
          </p>
          <span className="footer-standard">Minimum criteria · Phone verified · Real-time delivery</span>
        </div>

        <nav className="footer-column" aria-label="Lead products">
          <p className="footer-heading">Lead Products</p>
          {productNavigation.map((item) => (
            <Link href={item.href} key={item.href}>{item.label} Leads</Link>
          ))}
        </nav>

        <nav className="footer-column" aria-label="Lead resources">
          <p className="footer-heading">Lead Resources</p>
          {resourceNavigation.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
          <Link href="/#standards">Qualification Standards</Link>
          <Link href="/#faq">Frequently Asked Questions</Link>
        </nav>

        <nav className="footer-column" aria-label="Lion Marketing links">
          <p className="footer-heading">Lion Marketing</p>
          <Link href="/#how-it-works">How It Works</Link>
          <Link href="/#book">Check Availability</Link>
          <Link href="/contact">Contact</Link>
          <a href={CUSTOMER_PORTAL_URL}>Agent Login</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Lion Marketing LLC. All rights reserved.</span>
        <div>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms-of-service">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

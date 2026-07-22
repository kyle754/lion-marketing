import { SiteFooter, SiteHeader } from "./site-chrome";

export type PillarPageData = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  shortAnswer: string;
  keyPoints: string[];
  relatedSlugs?: string[];
  sections: Array<{
    kicker: string;
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  faqs: Array<{ question: string; answer: string }>;
};

const relatedPages = [
  {
    href: "/life-insurance-leads",
    title: "Life Insurance Leads",
    copy: "A practical guide to lead types, buying criteria, delivery, and follow-up.",
  },
  {
    href: "/exclusive-life-insurance-leads",
    title: "Exclusive Life Insurance Leads",
    copy: "What exclusivity changes—and what agents still need to do to convert demand.",
  },
  {
    href: "/final-expense-leads",
    title: "Final Expense Leads",
    copy: "How final expense campaigns are targeted, screened, delivered, and worked.",
  },
  {
    href: "/term-life-insurance-leads",
    title: "Term Life Insurance Leads",
    copy: "How term life inquiries are generated, screened, delivered, and worked.",
  },
  {
    href: "/iul-leads",
    title: "IUL Leads",
    copy: "A practical guide to inquiries from consumers exploring indexed universal life.",
  },
  {
    href: "/whole-life-insurance-leads",
    title: "Whole Life Insurance Leads",
    copy: "What agents should know about permanent coverage inquiries and follow-up.",
  },
  {
    href: "/mortgage-protection-leads",
    title: "Mortgage Protection Leads",
    copy: "How homeowner-focused coverage campaigns create and route consumer demand.",
  },
  {
    href: "/annuity-leads",
    title: "Annuity Leads",
    copy: "How to evaluate retirement-income inquiries, screening, delivery, and fit.",
  },
];

export function PillarPage({ data }: { data: PillarPageData }) {
  const canonical = `https://lionmarketingai.com/${data.slug}`;
  const selectedRelatedPages = relatedPages
    .filter((page) => page.href !== `/${data.slug}`)
    .filter((page) => !data.relatedSlugs || data.relatedSlugs.includes(page.href.slice(1)))
    .slice(0, 2);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: data.title,
        description: data.intro,
        isPartOf: { "@id": "https://lionmarketingai.com/#website" },
        about: { "@id": "https://lionmarketingai.com/#service" },
        dateModified: "2026-07-20",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://lionmarketingai.com/" },
          { "@type": "ListItem", position: 2, name: data.title, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />
      <article className="pillar-page">
        <header className="pillar-hero">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><span>{data.title}</span>
          </nav>
          <div className="pillar-hero-grid">
            <div>
              <p className="eyebrow"><span /> {data.eyebrow}</p>
              <h1>{data.title}</h1>
              <p className="pillar-intro">{data.intro}</p>
              <a className="button button-primary" href="/#book">
                Check lead availability <span aria-hidden="true">↗</span>
              </a>
            </div>
            <aside className="answer-card" aria-label="Quick answer">
              <p className="list-label">The short answer</p>
              <p>{data.shortAnswer}</p>
              <ul>
                {data.keyPoints.map((point) => <li key={point}><i>✓</i>{point}</li>)}
              </ul>
            </aside>
          </div>
        </header>

        <section className="qualification-band" aria-label="Lion Marketing qualification standard">
          <span>Campaign-qualified</span>
          <p>
            Every campaign starts with agreed minimum criteria. Prospects who do
            not meet those criteria are filtered out before delivery, so agents
            pay only for accepted leads that satisfy the campaign standard.
          </p>
          <small>Qualification is based on campaign criteria—not carrier underwriting or a guaranteed sale.</small>
        </section>

        <div className="pillar-content">
          {data.sections.map((section, index) => (
            <section className="pillar-section" key={section.title}>
              <div className="pillar-section-label">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{section.kicker}</p>
              </div>
              <div className="pillar-section-copy">
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        <section className="related-section" aria-labelledby="related-heading">
          <p className="eyebrow"><span /> Keep exploring</p>
          <h2 id="related-heading">Related insurance lead guides.</h2>
          <div className="related-grid">
            {selectedRelatedPages.map((page) => (
              <a href={page.href} className="related-card" key={page.href}>
                <span>Guide</span>
                <h3>{page.title}</h3>
                <p>{page.copy}</p>
                <strong>Read the guide <i aria-hidden="true">→</i></strong>
              </a>
            ))}
          </div>
        </section>

        <section className="pillar-faq" aria-labelledby="pillar-faq-heading">
          <div>
            <p className="eyebrow light"><span /> Practical answers</p>
            <h2 id="pillar-faq-heading">Frequently asked questions.</h2>
          </div>
          <div className="faq-list">
            {data.faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary><span>{faq.question}</span><i aria-hidden="true">+</i></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="pillar-cta">
          <p className="eyebrow"><span /> Your product · Your states · Your capacity</p>
          <h2>Build a lead flow your team can actually work.</h2>
          <p>Tell us what you sell and how much volume your agents can handle. We’ll walk through fit, availability, and pricing without overcomplicating it.</p>
          <a className="button button-primary button-large" href="/#book">Talk through your lead plan <span aria-hidden="true">↗</span></a>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}

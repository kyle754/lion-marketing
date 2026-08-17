import { ContentPage } from "../components/content-page";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Terms of Service | Lion Marketing",
  description: "Review the terms governing use of the Lion Marketing website and requests for life insurance lead campaign information.",
  pathname: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <ContentPage
      eyebrow="Effective August 17, 2026"
      title="Terms of Service"
      intro="These terms govern access to the Lion Marketing website. Campaign pricing, qualification criteria, volume, delivery, and replacement terms are established separately in the applicable service agreement."
    >
      <section>
        <h2>Website information</h2>
        <p>
          Website content is provided for general business and educational
          purposes. It is not legal, tax, financial, insurance, underwriting, or
          compliance advice and does not create an agent, carrier, or consumer
          relationship.
        </p>
      </section>
      <section>
        <h2>No guaranteed outcomes</h2>
        <p>
          A lead represents a consumer inquiry that met the agreed minimum
          campaign criteria. It is not a guaranteed conversation, appointment,
          application, sale, underwriting approval, policy issuance, or revenue
          result. Outcomes depend on factors outside Lion Marketing’s control.
        </p>
      </section>
      <section>
        <h2>Permitted use</h2>
        <p>
          You may use this website for lawful business evaluation and
          communication. You may not interfere with the website, attempt
          unauthorized access, misuse submitted information, or copy site content
          in a way that infringes applicable rights.
        </p>
      </section>
      <section>
        <h2>Third-party services</h2>
        <p>
          The website may link to or embed services operated by third parties,
          including scheduling tools. Lion Marketing is not responsible for the
          availability, content, or independent practices of those services.
        </p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>
          We may update this website and these terms over time. Continued use of
          the website after an update constitutes acceptance of the revised terms.
        </p>
      </section>
    </ContentPage>
  );
}

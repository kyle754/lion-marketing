import { ContentPage } from "../components/content-page";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy | Lion Marketing",
  description: "Learn how Lion Marketing handles information submitted through its website and campaign inquiry process.",
  pathname: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <ContentPage
      eyebrow="Effective August 17, 2026"
      title="Privacy Policy"
      intro="This policy explains the information Lion Marketing may collect through this website, how it may be used, and the choices available to visitors."
    >
      <section>
        <h2>Information we collect</h2>
        <p>
          We may receive information you choose to provide when requesting
          information or scheduling a call, such as your name, contact details,
          business information, licensed states, product interests, and campaign
          preferences. We may also collect standard technical information such as
          browser type, device information, referring pages, and website usage.
        </p>
      </section>
      <section>
        <h2>How information is used</h2>
        <p>
          Information may be used to respond to inquiries, evaluate campaign fit,
          schedule conversations, provide requested services, improve the website,
          protect against misuse, and comply with applicable legal obligations.
          We do not sell website visitor information as a standalone data product.
        </p>
      </section>
      <section>
        <h2>Service providers and scheduling</h2>
        <p>
          We may use service providers for hosting, analytics, communications,
          scheduling, and business operations. Those providers may process
          information only as needed to perform services on our behalf and under
          their own applicable privacy terms.
        </p>
      </section>
      <section>
        <h2>Data choices</h2>
        <p>
          You may decline to provide information, although that may limit our
          ability to respond. You may also request access, correction, or deletion
          of information you previously submitted by contacting Lion Marketing
          through the scheduling and contact page.
        </p>
      </section>
      <section>
        <h2>Policy updates</h2>
        <p>
          We may update this policy as our services or legal obligations change.
          The effective date above identifies the current version.
        </p>
      </section>
    </ContentPage>
  );
}

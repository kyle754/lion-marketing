import Link from "next/link";
import { ContentPage } from "../components/content-page";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy | Lion Marketing",
  description:
    "Learn how Lion Marketing collects, uses, discloses, and protects information across its website and insurance lead-generation services.",
  pathname: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <ContentPage
      eyebrow="Last updated August 27, 2026"
      title="Privacy Policy"
      intro="This policy explains how Lion Marketing handles personal information across our website, insurance inquiry forms, agent services, and related lead-generation activities."
    >
      <section>
        <p>
          Lion Marketing LLC (“Lion Marketing,” “we,” “us,” or “our”) respects
          your privacy. This Privacy Policy applies to lionmarketingai.com and
          any website, form, landing page, portal, or other online service that
          links to this policy, together with our related lead-generation and
          marketing services (collectively, the “Services”).
        </p>
        <p>
          This policy applies to consumers who request information about
          insurance products, insurance agents and agencies that inquire about
          or purchase leads, website visitors, and others who interact with us.
          It does not apply to a third party’s website, service, or privacy
          practices, even when that third party receives information from us or
          is linked from the Services.
        </p>
      </section>

      <section>
        <h2>1. Our role</h2>
        <p>
          Lion Marketing operates a lead-generation service. Consumers may
          submit a request for information about life insurance or related
          products through an online form. We may screen the request against
          campaign criteria, verify the submitted telephone number, and deliver
          an accepted inquiry to an independent insurance agent or agency (a
          “Lead Buyer”) for follow-up.
        </p>
        <p>
          Lion Marketing is not an insurance carrier and does not make
          underwriting, coverage, pricing, suitability, or policy-issuance
          decisions. Lead Buyers are independent businesses. Once a Lead Buyer
          receives personal information, its own privacy notice and legal
          obligations govern its independent processing of that information.
        </p>
      </section>

      <section>
        <h2>2. Personal information we collect</h2>
        <p>
          The personal information we collect depends on how you interact with
          the Services and may include:
        </p>
        <ul>
          <li>
            <strong>Contact and identity information,</strong> such as name,
            email address, telephone number, mailing address, state of residence,
            date of birth or age range, and online identifiers.
          </li>
          <li>
            <strong>Insurance inquiry and screening information,</strong> such
            as the type of insurance requested, desired coverage, product
            interests, screening answers, timing, state, and other information
            submitted with a request for information.
          </li>
          <li>
            <strong>Verification and consent information,</strong> such as
            one-time-passcode verification status, the telephone number verified,
            form language presented, consent selections, timestamps, IP address,
            source URL, and related records.
          </li>
          <li>
            <strong>Agent, agency, and business information,</strong> such as
            company name, role, business contact details, licensed states,
            product focus, team size, desired lead volume, campaign criteria,
            and account information.
          </li>
          <li>
            <strong>Transaction and commercial information,</strong> such as
            services requested or purchased, order and campaign details,
            invoices, payment status, and transaction history. Payment-card
            information may be collected directly by a payment processor under
            that provider’s privacy policy.
          </li>
          <li>
            <strong>Communications,</strong> such as contact-form messages,
            support requests, emails, call notes, survey responses, and call
            recordings when notice or consent is provided as required by law.
          </li>
          <li>
            <strong>Device, internet, and usage information,</strong> such as IP
            address, browser and device type, operating system, referring page,
            pages viewed, links clicked, session activity, cookie or advertising
            identifiers, and approximate location inferred from IP address.
          </li>
          <li>
            <strong>Potentially sensitive information,</strong> only when a form
            expressly requests it or you choose to provide it, such as account
            credentials, financial ranges, or health- and lifestyle-related
            screening responses relevant to an insurance inquiry. Please do not
            submit Social Security numbers, full financial-account numbers,
            medical records, or information we have not specifically requested.
          </li>
          <li>
            <strong>Inferences,</strong> such as likely product interest,
            campaign eligibility, or preferences derived from the information
            above.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. How we collect personal information</h2>
        <p>We may collect personal information:</p>
        <ul>
          <li>
            directly from you when you visit the Services, submit a form, verify
            a telephone number, create or use an account, schedule a call,
            communicate with us, or purchase Services;
          </li>
          <li>
            automatically from your browser or device through cookies, pixels,
            tags, logs, and similar technologies;
          </li>
          <li>
            from advertising networks, analytics providers, marketing partners,
            form hosts, scheduling providers, customer-relationship platforms,
            and other service providers;
          </li>
          <li>from Lead Buyers, business partners, and referral sources; and</li>
          <li>
            from public or commercially available business sources where
            permitted by law.
          </li>
        </ul>
        <p>
          If you provide personal information about another person, you
          represent that you have authority to do so and to permit us to process
          it as described in this policy.
        </p>
      </section>

      <section>
        <h2>4. How we use personal information</h2>
        <p>We may use personal information to:</p>
        <ul>
          <li>operate, maintain, and improve the Services;</li>
          <li>
            respond to requests, provide customer service, and communicate about
            accounts, orders, campaigns, or Services;
          </li>
          <li>
            verify contact information and maintain records of a consumer’s
            request and consent choices;
          </li>
          <li>screen insurance inquiries against disclosed campaign criteria;</li>
          <li>
            match and deliver accepted inquiries to a Lead Buyer based on
            product, location, licensing, campaign criteria, availability, and
            capacity;
          </li>
          <li>process transactions, manage billing, and administer accounts;</li>
          <li>
            personalize content, measure traffic and campaign performance, and
            understand how the Services are used;
          </li>
          <li>
            advertise or market our Services, subject to applicable law and
            available choices;
          </li>
          <li>
            detect, investigate, and prevent fraud, abuse, security incidents,
            and violations of our terms;
          </li>
          <li>
            comply with law, respond to lawful requests, establish or defend
            legal claims, and enforce agreements; and
          </li>
          <li>
            carry out a merger, financing, acquisition, reorganization,
            bankruptcy, or sale of all or part of our business.
          </li>
        </ul>
        <p>
          Campaign screening determines whether an inquiry meets agreed
          lead-delivery criteria. It is not insurance underwriting, does not
          determine eligibility for coverage, and is not a decision by an
          insurance carrier.
        </p>
      </section>

      <section>
        <h2>5. How we disclose personal information</h2>
        <p>We may disclose personal information to:</p>
        <ul>
          <li>
            <strong>Lead Buyers.</strong> If you submit an insurance inquiry, we
            may provide your contact information, inquiry details, screening
            answers, and consent and verification records to an independent
            insurance agent or agency so it can respond to your request.
          </li>
          <li>
            <strong>Service providers and contractors.</strong> These may include
            hosting, cloud storage, security, analytics, communications,
            telephone verification, form, scheduling, customer-relationship
            management, payment, support, and professional-service providers
            that process information for us.
          </li>
          <li>
            <strong>Advertising and analytics partners.</strong> We may permit
            partners to collect device and usage information for measurement,
            attribution, analytics, fraud prevention, and interest-based or
            targeted advertising, subject to applicable law.
          </li>
          <li>
            <strong>Business and transaction counterparties.</strong> We may
            disclose information in connection with due diligence, financing, a
            merger, acquisition, reorganization, bankruptcy, or sale of assets.
          </li>
          <li>
            <strong>Authorities and other parties for legal or safety reasons.</strong>{" "}
            We may disclose information when we believe it is necessary to
            comply with law or legal process; protect rights, safety, or
            property; investigate fraud or unlawful activity; or enforce our
            agreements.
          </li>
          <li>
            <strong>Parties you direct.</strong> We may disclose information with
            your direction or consent.
          </li>
        </ul>
        <p>
          We may also use and disclose information that has been aggregated or
          deidentified so it cannot reasonably be linked to you. We will not
          attempt to reidentify deidentified information except as permitted by
          law.
        </p>
      </section>

      <section>
        <h2>6. Sale, sharing, and targeted advertising</h2>
        <p>
          Delivering consumer inquiries to Lead Buyers is a core part of our
          Services. A Lead Buyer pays Lion Marketing for an accepted lead, and
          Lion Marketing provides that Lead Buyer with the consumer’s inquiry
          information. Even when a lead is delivered exclusively to one Lead
          Buyer and is not resold by Lion Marketing to multiple buyers, this
          transfer may be considered a “sale” of personal information under
          California or other state privacy laws.
        </p>
        <p>
          Our use of certain advertising or analytics technologies may also be
          considered “sharing,” “targeted advertising,” or a sale under
          applicable state law.
        </p>
        <p>
          Where required, you may opt out through our{" "}
          <a href="mailto:kyle@thelistinglion.com?subject=Privacy%20Choices">
            Privacy Choices
          </a>{" "}
          email link or by submitting a request through our{" "}
          <Link href="/contact">contact page</Link>. We also process legally
          recognized browser-based opt-out preference signals, such as Global
          Privacy Control, as required by applicable law. An opt-out applies to
          future activity and may not reverse a disclosure already made in
          response to a request you submitted.
        </p>
        <p>
          We do not knowingly sell or share the personal information of anyone
          under 18 years old.
        </p>
      </section>

      <section>
        <h2>7. Cookies and similar technologies</h2>
        <p>
          We and our partners may use cookies, pixels, tags, software development
          kits, and similar technologies to operate the Services, remember
          preferences, understand traffic, measure campaign performance, secure
          the Services, and support advertising.
        </p>
        <p>
          You can adjust browser settings to block or delete cookies. Some parts
          of the Services may not function properly if you block necessary
          cookies. Where required by law, we will ask for consent before using
          nonessential cookies. You may also use the Privacy Choices link to
          submit an applicable opt-out request.
        </p>
      </section>

      <section>
        <h2>8. Communications and consent choices</h2>
        <p>
          If you ask to be contacted about insurance, Lion Marketing or the Lead
          Buyer identified in the form may contact you as described in the
          disclosure presented when you submit the form. The exact scope of your
          consent is governed by that disclosure and applicable law; this policy
          does not expand it.
        </p>
        <p>
          You may ask a caller not to call again. You may opt out of text messages
          by replying <strong>STOP</strong> or using another reasonable method
          communicated to you. You may unsubscribe from marketing emails through
          the link in the email. We may still send nonmarketing messages needed
          to respond to a request, administer an account, or complete a
          transaction.
        </p>
        <p>
          Consent to marketing is not a condition of purchasing any insurance
          product or service.
        </p>
      </section>

      <section>
        <h2>9. Data retention</h2>
        <p>
          We retain personal information only for as long as reasonably necessary
          for the purposes described in this policy, including providing the
          Services, maintaining consent and transaction records, complying with
          legal and accounting obligations, resolving disputes, preventing
          fraud, and enforcing agreements. Retention periods vary based on the
          type and sensitivity of the information, the nature of our relationship,
          legal requirements, and operational needs. We may retain aggregated or
          deidentified information for longer periods.
        </p>
      </section>

      <section>
        <h2>10. Security</h2>
        <p>
          We use reasonable administrative, technical, and physical safeguards
          designed to protect personal information. No method of transmission or
          storage is completely secure, and we cannot guarantee absolute
          security. You are responsible for maintaining the confidentiality of
          account credentials and notifying us if you suspect unauthorized use.
        </p>
      </section>

      <section>
        <h2>11. Your privacy rights</h2>
        <p>
          Depending on where you live and subject to legal exceptions, you may
          have the right to:
        </p>
        <ul>
          <li>know whether we process your personal information;</li>
          <li>access or obtain a portable copy of personal information;</li>
          <li>correct inaccurate personal information;</li>
          <li>delete personal information;</li>
          <li>
            opt out of the sale of personal information, sharing for
            cross-context behavioral advertising, targeted advertising, or
            certain profiling;
          </li>
          <li>
            limit certain uses or disclosures of sensitive personal information;
          </li>
          <li>withdraw consent where processing is based on consent; and</li>
          <li>appeal a decision we make about a privacy request.</li>
        </ul>
        <p>
          You may exercise a right through our <Link href="/contact">contact page</Link>,
          by emailing <a href="mailto:kyle@thelistinglion.com">kyle@thelistinglion.com</a>,
          or by calling <a href="tel:+17145007784">+1 714-500-7784</a>. Please
          state that your request concerns privacy and identify the right you
          wish to exercise.
        </p>
        <p>
          We may take reasonable steps to verify your identity and request. We
          will use information provided for verification only for that purpose.
          An authorized agent may submit a request where permitted by law, but we
          may request proof of authorization and verification of the consumer’s
          identity. If we deny a request, you may appeal by contacting us and
          writing “Privacy Appeal” in your message.
        </p>
        <p>
          We will not unlawfully discriminate against you for exercising a
          privacy right.
        </p>
      </section>

      <section>
        <h2>12. California disclosures</h2>
        <p>
          For purposes of California law, the categories of personal information
          we may have collected during the preceding 12 months include
          identifiers; personal information described in California Civil Code
          section 1798.80; characteristics of protected classifications, such as
          age; commercial information; internet or other electronic network
          activity; approximate geolocation; audio or electronic information;
          professional or employment-related information; inferences; and
          sensitive personal information when supplied in connection with an
          inquiry or account.
        </p>
        <p>
          We collect these categories from the sources described in Section 3,
          use them for the purposes described in Section 4, and disclose them to
          the recipients described in Section 5. We may sell or share identifiers,
          insurance inquiry information, internet or device activity, approximate
          geolocation, and inferences through lead delivery or advertising
          technologies as described in Section 6. We do not use or disclose
          sensitive personal information for purposes that require a right to
          limit under California law unless we provide that right.
        </p>
        <p>
          California’s “Shine the Light” law may allow California residents to
          request certain information about disclosures of personal information
          to third parties for their own direct-marketing purposes. You may
          submit such a request using the methods in Section 11.
        </p>
      </section>

      <section>
        <h2>13. Children’s privacy</h2>
        <p>
          The Services are intended for adults and are not directed to children
          under 13. We do not knowingly collect personal information from
          children under 13. Insurance inquiry and lead-purchasing Services are
          intended only for people 18 or older. If you believe a child has
          provided personal information to us, contact us so we can review and
          address the request.
        </p>
      </section>

      <section>
        <h2>14. Third-party services</h2>
        <p>
          The Services may link to or integrate with third-party websites,
          portals, calendars, payment tools, or platforms. We do not control
          those third parties, and their privacy policies govern their
          processing. Review their policies before providing personal
          information.
        </p>
      </section>

      <section>
        <h2>15. Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will post the
          revised version and update the “Last updated” date. If required by law,
          we will provide additional notice or request consent before a material
          change takes effect.
        </p>
      </section>

      <section>
        <h2>16. Contact us</h2>
        <p>
          <strong>Lion Marketing LLC</strong>
          <br />
          Privacy contact:{" "}
          <a href="mailto:kyle@thelistinglion.com">kyle@thelistinglion.com</a>
          <br />
          Telephone: <a href="tel:+17145007784">+1 714-500-7784</a>
          <br />
          Mailing address: 2108 N Street, Suite N, Sacramento, CA 95816
          <br />
          <Link href="/contact">Contact form</Link>
        </p>
      </section>
    </ContentPage>
  );
}

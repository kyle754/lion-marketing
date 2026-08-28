import Link from "next/link";
import { ContentPage } from "../components/content-page";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Terms and Conditions | Lion Marketing",
  description:
    "Review the terms governing Lion Marketing’s website, insurance inquiry process, and lead-generation services for agents and agencies.",
  pathname: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <ContentPage
      eyebrow="Last updated August 27, 2026"
      title="Terms and Conditions"
      intro="These terms govern Lion Marketing’s website, consumer insurance inquiries, and lead-generation services for agents and agencies."
    >
      <section>
        <p>
          These Terms and Conditions (the “Terms”) govern access to and use of
          lionmarketingai.com, any portal, form, landing page, or online service
          that links to these Terms, and the lead-generation and related services
          provided by Lion Marketing LLC (“Lion Marketing,” “we,” “us,” or “our”)
          (collectively, the “Services”).
        </p>
        <p>
          By accessing or using the Services, creating an account, submitting an
          inquiry, or purchasing Services, you agree to these Terms. If you use
          the Services on behalf of a company or other organization, you
          represent that you have authority to bind that organization, and “you”
          includes that organization. If you do not agree, do not use the
          Services.
        </p>
      </section>

      <section>
        <h2>1. Eligibility</h2>
        <p>
          You must be at least 18 years old and legally capable of entering into
          a binding contract to use the Services. You may use the Services only
          in compliance with applicable law.
        </p>
      </section>

      <section>
        <h2>2. What Lion Marketing provides</h2>
        <p>
          Lion Marketing provides marketing and lead-generation services for
          insurance agents and agencies. Our Services may include campaign
          targeting, online consumer inquiry forms, campaign-specific screening,
          telephone-number verification, and delivery of accepted inquiries to
          a participating agent or agency.
        </p>
        <p>
          Lion Marketing is not an insurance carrier, insurance agency, broker,
          or financial adviser unless expressly stated in a separate written
          agreement. We do not issue insurance, bind coverage, make underwriting
          or suitability decisions, quote final premiums, or guarantee that an
          application will be approved or a policy will be issued.
        </p>
        <p>
          Website content is general information and is not insurance, legal,
          tax, investment, or financial advice.
        </p>
      </section>

      <section>
        <h2>3. Consumer insurance inquiries</h2>
        <p>When a consumer submits an insurance inquiry:</p>
        <ul>
          <li>
            the submission is a request to receive information and is not an
            insurance application, offer, binder, or contract;
          </li>
          <li>
            submitting an inquiry does not guarantee contact, a quote,
            eligibility, coverage, a particular premium, or policy issuance;
          </li>
          <li>
            campaign screening is limited to the criteria stated for that
            campaign and is not carrier underwriting or a suitability
            determination;
          </li>
          <li>
            Lion Marketing may verify the submitted telephone number and provide
            the inquiry to an independent insurance agent or agency for
            follow-up; and
          </li>
          <li>
            the agent or agency is independently responsible for its
            communications, advice, licensing, privacy practices, sales process,
            and legal compliance.
          </li>
        </ul>
        <p>
          Any consent to receive calls, texts, or emails is governed by the
          disclosure presented at the time of submission and applicable law.
          These Terms do not enlarge the consent a consumer provided. Consent to
          marketing is not a condition of purchasing an insurance product or
          service.
        </p>
      </section>

      <section>
        <h2>4. Services for agents and agencies</h2>
        <p>
          Additional terms may appear in an order form, insertion order, service
          agreement, campaign brief, pricing schedule, replacement policy,
          data-processing agreement, or other written agreement between Lion
          Marketing and a customer (each, an “Order”). An Order is incorporated
          into these Terms. If an Order conflicts with these Terms, the Order
          controls for that transaction.
        </p>
        <p>
          Customers must provide accurate information about their product focus,
          licensed jurisdictions, desired volume, capacity, and campaign
          requirements. Availability, pricing, targeting, screening fields,
          delivery methods, volume, billing, replacement eligibility, and
          campaign timing are determined by the applicable Order.
        </p>
        <p>
          We may use service providers to operate the Services. Features or
          delivery methods may change as reasonably necessary to maintain,
          secure, or improve the Services, provided that material commercial
          commitments remain governed by the applicable Order.
        </p>
      </section>

      <section>
        <h2>5. Lead standards and expectations</h2>
        <p>Unless an Order expressly states otherwise:</p>
        <ul>
          <li>
            <strong>Exclusive</strong> means Lion Marketing will deliver an
            accepted lead to one customer and will not intentionally resell that
            same accepted record to multiple Lion Marketing customers. It does
            not guarantee that the consumer has not independently submitted
            another request elsewhere or been contacted through another source.
          </li>
          <li>
            <strong>Campaign-qualified</strong> or <strong>prequalified</strong>{" "}
            means only that the submitted information met the minimum screening
            criteria agreed for the campaign at the time of acceptance. It does
            not mean the consumer has been underwritten, approved by a carrier,
            determined suitable, or guaranteed to purchase.
          </li>
          <li>
            <strong>Verified telephone number</strong> means the number passed
            the verification method described for the campaign, such as a
            one-time passcode. Verification does not guarantee that a consumer
            will answer, remain reachable, or engage with a customer.
          </li>
          <li>
            <strong>Real-time delivery</strong> means delivery is initiated
            promptly after acceptance through the configured method. Internet,
            platform, carrier, integration, or other technical delays may occur.
          </li>
          <li>
            A <strong>lead</strong> is an inquiry, not an appointment, live
            transfer, completed sale, or guaranteed conversation unless an Order
            specifically says otherwise.
          </li>
        </ul>
        <p>
          Sales outcomes depend on factors outside Lion Marketing’s control,
          including speed and method of follow-up, customer licensing and
          compliance, agent skill, consumer circumstances, underwriting, carrier
          rules, pricing, product fit, and market conditions. Lion Marketing does
          not guarantee contact rates, applications, sales, placement, revenue,
          return on investment, or any other business result.
        </p>
        <p>
          Replacement or credit requests are governed solely by the written
          policy in the applicable Order. A consumer’s failure to answer,
          respond, qualify under carrier underwriting, purchase, or remain
          interested does not by itself make a lead invalid.
        </p>
      </section>

      <section>
        <h2>6. Customer compliance obligations</h2>
        <p>
          Each agent, agency, or other business customer is solely responsible
          for its use of leads and must:
        </p>
        <ul>
          <li>
            maintain all licenses, appointments, registrations, and approvals
            required for the products and jurisdictions involved;
          </li>
          <li>
            use lead information only for the specific consumer request and
            lawful campaign purpose for which it was provided;
          </li>
          <li>
            comply with all applicable federal and state insurance, advertising,
            privacy, data-security, telemarketing, call-recording, email,
            text-message, do-not-call, and consumer-protection laws and carrier
            rules;
          </li>
          <li>
            independently determine whether and how it may call, text, email, or
            otherwise contact a consumer, including whether additional consent
            is required for the technology, content, timing, or party making the
            communication;
          </li>
          <li>
            accurately identify itself and the purpose of its communication and
            avoid deceptive, misleading, high-pressure, or abusive practices;
          </li>
          <li>
            honor opt-outs, do-not-call requests, consent revocations, and other
            consumer choices promptly and maintain appropriate suppression
            records;
          </li>
          <li>
            use reasonable safeguards to protect lead information and limit
            access to personnel who need it for the authorized purpose;
          </li>
          <li>
            not sell, sublicense, post, disclose, or transfer a lead to another
            person except as expressly permitted in an Order and by applicable
            law;
          </li>
          <li>
            maintain records reasonably sufficient to demonstrate compliance;
            and
          </li>
          <li>
            cooperate with reasonable compliance investigations involving leads
            supplied by Lion Marketing.
          </li>
        </ul>
        <p>
          Consent and verification records supplied with a lead document the
          information captured by Lion Marketing. They are not legal advice or a
          warranty that a particular customer’s communication method, technology,
          script, timing, or campaign complies with every applicable law.
          Customers should obtain their own legal advice and maintain their own
          compliance program.
        </p>
      </section>

      <section>
        <h2>7. Accounts and security</h2>
        <p>
          You must provide accurate, current, and complete account information;
          keep login credentials confidential; and promptly notify us of
          suspected unauthorized access. You are responsible for activity under
          your account unless prohibited by law. We may require identity,
          authority, payment, licensing, or business verification before enabling
          or continuing access.
        </p>
        <p>
          You may not share account access outside your organization, circumvent
          access controls, or use another person’s credentials without
          authorization.
        </p>
      </section>

      <section>
        <h2>8. Fees, payment, and taxes</h2>
        <p>
          Prices, deposits, billing frequency, payment methods, minimums, and
          cancellation terms are stated in the applicable Order. Unless an Order
          says otherwise, fees are due when invoiced and are nonrefundable except
          for an approved credit or replacement under the applicable written
          policy.
        </p>
        <p>
          You authorize Lion Marketing and its payment processor to charge the
          approved payment method for amounts due under an Order. You are
          responsible for applicable taxes, duties, or government charges other
          than taxes on Lion Marketing’s net income. Overdue amounts may result
          in paused delivery, suspended access, collection costs, and any lawful
          interest stated in the Order.
        </p>
        <p>
          You must raise a billing dispute promptly and in accordance with the
          Order. Initiating a chargeback does not cancel amounts validly owed or
          waive our right to contest the chargeback and recover permitted costs.
        </p>
      </section>

      <section>
        <h2>9. Acceptable use</h2>
        <p>You may not:</p>
        <ul>
          <li>
            use the Services or personal information obtained through them for
            an unlawful, deceptive, discriminatory, abusive, or unauthorized
            purpose;
          </li>
          <li>
            impersonate another person, misrepresent affiliation, submit false
            information, or manufacture inquiries;
          </li>
          <li>
            scrape, harvest, copy, or extract data from the Services except as
            expressly permitted;
          </li>
          <li>
            reverse engineer, probe, scan, or test the vulnerability of the
            Services, or bypass security or rate limits;
          </li>
          <li>
            upload malicious code or interfere with the integrity, availability,
            or operation of the Services;
          </li>
          <li>
            infringe intellectual-property, privacy, publicity, or other rights;
          </li>
          <li>
            use the Services to develop or train a competing lead database or
            service without written permission; or
          </li>
          <li>allow another person to do any of the foregoing.</li>
        </ul>
        <p>
          We may investigate suspected misuse and suspend or terminate access
          when reasonably necessary to protect consumers, customers, Lion
          Marketing, or the Services.
        </p>
      </section>

      <section>
        <h2>10. Intellectual property</h2>
        <p>
          The Services, including their software, design, text, graphics, logos,
          databases, compilations, and other content, are owned by Lion Marketing
          or its licensors and are protected by intellectual-property laws.
          Subject to these Terms, Lion Marketing grants you a limited, revocable,
          nonexclusive, nontransferable license to access and use the Services
          for their intended purpose.
        </p>
        <p>
          No right is granted to use Lion Marketing’s names, trademarks, logos,
          or branding without prior written permission. If you provide feedback
          or suggestions, you grant Lion Marketing a perpetual, worldwide,
          royalty-free right to use them without restriction or compensation,
          provided we do not publicly identify you without permission.
        </p>
      </section>

      <section>
        <h2>11. Privacy</h2>
        <p>
          Our <Link href="/privacy-policy">Privacy Policy</Link> explains how
          Lion Marketing processes personal information. By using the Services,
          you acknowledge that you have reviewed it.
        </p>
        <p>
          Business customers that receive personal information through the
          Services act as independent businesses with respect to their use of
          that information unless a separate written agreement expressly states
          otherwise. Each business customer is responsible for providing any
          notice and obtaining any consent required for its own processing.
        </p>
      </section>

      <section>
        <h2>12. Third-party services and links</h2>
        <p>
          The Services may link to or integrate with third-party portals,
          calendars, payment services, communications tools, websites, or
          platforms. Lion Marketing does not control and is not responsible for
          third-party services, content, terms, security, availability, or
          privacy practices. Your use of a third-party service is governed by
          its terms.
        </p>
      </section>

      <section>
        <h2>13. Suspension and termination</h2>
        <p>
          You may stop using the Services at any time, subject to any Order. Lion
          Marketing may suspend or terminate access, pause lead delivery, or
          reject an inquiry if we reasonably believe that you violated these
          Terms or an Order, created legal or security risk, failed to pay
          amounts due, misused personal information, or could harm a consumer,
          customer, third party, or Lion Marketing.
        </p>
        <p>
          Upon termination, rights granted to you end, but payment obligations
          and provisions that by their nature should survive will remain in
          effect, including provisions concerning ownership, confidentiality,
          disclaimers, limitations of liability, indemnity, and disputes.
        </p>
      </section>

      <section>
        <h2>14. Disclaimers</h2>
        <p>
          <strong>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED “AS
            IS” AND “AS AVAILABLE.” LION MARKETING DISCLAIMS ALL EXPRESS,
            IMPLIED, AND STATUTORY WARRANTIES, INCLUDING WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE,
            NON-INFRINGEMENT, ACCURACY, AVAILABILITY, AND RESULTS.
          </strong>
        </p>
        <p>
          <strong>
            LION MARKETING DOES NOT WARRANT THAT THE SERVICES WILL BE
            UNINTERRUPTED OR ERROR-FREE; THAT EVERY INQUIRY WILL CONTAIN ACCURATE
            INFORMATION; THAT A CONSUMER WILL RESPOND, QUALIFY, APPLY, PURCHASE,
            OR REMAIN INTERESTED; OR THAT USE OF A LEAD WILL COMPLY WITH LAW IN
            EVERY CUSTOMER-SPECIFIC CONTEXT.
          </strong>
        </p>
        <p>
          Nothing in these Terms excludes a warranty or right that cannot
          lawfully be excluded.
        </p>
      </section>

      <section>
        <h2>15. Limitation of liability</h2>
        <p>
          <strong>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, LION MARKETING AND ITS
            AFFILIATES, OWNERS, OFFICERS, EMPLOYEES, CONTRACTORS, AND SERVICE
            PROVIDERS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL,
            EXEMPLARY, CONSEQUENTIAL, OR PUNITIVE DAMAGES; LOST PROFITS,
            REVENUE, BUSINESS, DATA, OR GOODWILL; OR THE COST OF SUBSTITUTE
            SERVICES, ARISING OUT OF OR RELATED TO THE SERVICES OR THESE TERMS,
            EVEN IF ADVISED OF THE POSSIBILITY.
          </strong>
        </p>
        <p>
          <strong>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE TOTAL AGGREGATE LIABILITY
            OF LION MARKETING AND THE PARTIES ABOVE FOR ALL CLAIMS ARISING OUT OF
            OR RELATED TO THE SERVICES OR THESE TERMS WILL NOT EXCEED THE AMOUNT
            THE CUSTOMER PAID TO LION MARKETING FOR THE SPECIFIC ORDER OR SERVICE
            GIVING RISE TO THE CLAIM DURING THE SIX MONTHS BEFORE THE EVENT GIVING
            RISE TO LIABILITY, OR $100 IF NO PAYMENT WAS MADE.
          </strong>
        </p>
        <p>
          These limitations apply regardless of the form of action and do not
          apply where prohibited by law.
        </p>
      </section>

      <section>
        <h2>16. Indemnification</h2>
        <p>
          To the maximum extent permitted by law, a business customer will
          defend, indemnify, and hold harmless Lion Marketing and its affiliates,
          owners, officers, employees, contractors, and service providers from
          claims, investigations, losses, liabilities, judgments, penalties,
          damages, and reasonable costs and attorneys’ fees arising out of or
          related to: (a) the customer’s use or disclosure of a lead or other
          personal information; (b) calls, texts, emails, advertising, insurance
          sales, advice, or other communications by or for the customer; (c) the
          customer’s products, services, licensing, scripts, systems, personnel,
          or legal compliance; (d) the customer’s breach of these Terms or an
          Order; or (e) infringement or violation of another person’s rights by
          the customer.
        </p>
        <p>
          Lion Marketing will provide reasonable notice of a covered claim and
          may participate in the defense. A customer may not settle a claim in a
          manner that admits fault by, imposes obligations on, or fails to fully
          release Lion Marketing without Lion Marketing’s written consent.
        </p>
      </section>

      <section>
        <h2>17. Disputes and governing law</h2>
        <p>
          Before filing a claim, you and Lion Marketing agree to make a
          good-faith effort to resolve the dispute informally. Send a description
          of the dispute and requested resolution through our{" "}
          <Link href="/contact">contact page</Link>. The parties will allow 30
          days for an informal response before filing suit, unless immediate
          relief is necessary or law requires otherwise.
        </p>
        <p>
          These Terms are governed by the laws of the U.S. state in which Lion
          Marketing LLC is organized, without regard to conflict-of-laws rules,
          except where another law must apply. Any court proceeding must be
          brought in a state or federal court serving Lion Marketing’s principal
          place of business, and each party consents to that venue and
          jurisdiction, except where applicable law does not permit this
          selection.
        </p>
        <p>
          Nothing in these Terms prevents either party from seeking temporary or
          injunctive relief to protect data, security, confidential information,
          or intellectual-property rights.
        </p>
      </section>

      <section>
        <h2>18. Changes to the Services or Terms</h2>
        <p>
          We may modify the Services and these Terms from time to time. The
          revised Terms will be posted with an updated date. Material changes
          will apply prospectively, and we will provide additional notice where
          required by law. Continued use after the effective date of revised
          Terms constitutes acceptance. Changes to an Order require the process
          stated in that Order or agreement of the parties.
        </p>
      </section>

      <section>
        <h2>19. General terms</h2>
        <p>
          These Terms and applicable Orders are the entire agreement concerning
          their subject matter and supersede prior discussions or understandings
          about it. Failure to enforce a provision is not a waiver. If a
          provision is unenforceable, it will be modified to the minimum extent
          necessary, and the remaining provisions will continue in effect.
        </p>
        <p>
          You may not assign these Terms or an Order without Lion Marketing’s
          written consent. Lion Marketing may assign them in connection with a
          merger, financing, reorganization, sale of assets, or by operation of
          law. There are no third-party beneficiaries unless an Order expressly
          states otherwise. Headings are for convenience only.
        </p>
        <p>
          Neither party is liable for delay caused by events beyond its
          reasonable control, except that this does not excuse payment
          obligations for Services already provided.
        </p>
      </section>

      <section>
        <h2>20. Contact</h2>
        <p>
          <strong>Lion Marketing LLC</strong>
          <br />
          Email: <a href="mailto:kyle@thelistinglion.com">kyle@thelistinglion.com</a>
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

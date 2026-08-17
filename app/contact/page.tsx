import Link from "next/link";
import { ContentPage } from "../components/content-page";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Lion Marketing | Life Insurance Lead Campaigns",
  description: "Contact Lion Marketing to discuss life insurance lead products, target states, qualification criteria, pricing, and available campaign volume.",
  pathname: "/contact",
});

export default function ContactPage() {
  return (
    <ContentPage
      eyebrow="Let’s talk through fit"
      title="Contact Lion Marketing"
      intro="Tell us what you sell, where you are licensed, and how much lead volume your team can work. We’ll give you a clear answer about campaign fit, availability, and pricing."
    >
      <section>
        <h2>Schedule a campaign-fit call</h2>
        <p>
          The fastest way to reach us is to choose a time on our scheduling
          calendar. We’ll review your product focus, target states, minimum
          qualification criteria, team capacity, and desired launch timing.
        </p>
        <Link className="button button-primary button-large" href="/#book">
          Check availability <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <section>
        <h2>What to have ready</h2>
        <ul>
          <li>The life insurance products you want to grow</li>
          <li>Your licensed and preferred target states</li>
          <li>The minimum criteria a prospect must meet</li>
          <li>The weekly volume your team can contact consistently</li>
        </ul>
      </section>
    </ContentPage>
  );
}

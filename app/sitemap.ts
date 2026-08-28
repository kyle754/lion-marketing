import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-27");

  return [
    { url: "https://lionmarketingai.com/", lastModified, changeFrequency: "weekly", priority: 1 },
    { url: "https://lionmarketingai.com/life-insurance-leads", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: "https://lionmarketingai.com/exclusive-life-insurance-leads", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://lionmarketingai.com/final-expense-leads", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://lionmarketingai.com/term-life-insurance-leads", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://lionmarketingai.com/iul-leads", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://lionmarketingai.com/whole-life-insurance-leads", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://lionmarketingai.com/mortgage-protection-leads", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://lionmarketingai.com/annuity-leads", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://lionmarketingai.com/contact", lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: "https://lionmarketingai.com/privacy-policy", lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: "https://lionmarketingai.com/terms-of-service", lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}

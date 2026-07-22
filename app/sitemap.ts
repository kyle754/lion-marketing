import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-20");

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
  ];
}

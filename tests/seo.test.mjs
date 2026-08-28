import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

const productRoutes = [
  "annuity-leads",
  "exclusive-life-insurance-leads",
  "final-expense-leads",
  "iul-leads",
  "life-insurance-leads",
  "mortgage-protection-leads",
  "term-life-insurance-leads",
  "whole-life-insurance-leads",
];

const requiredRoutes = [
  "contact",
  "privacy-policy",
  "terms-of-service",
  ...productRoutes,
];

test("all public content routes have complete shared social metadata", async () => {
  const helper = await readFile(new URL("app/lib/seo.ts", root), "utf8");

  assert.match(helper, /alternates:\s*\{ canonical: pathname \}/);
  assert.match(helper, /type:\s*"website"/);
  assert.match(helper, /siteName/);
  assert.match(helper, /images:\s*\[ogImage\]/);
  assert.match(helper, /card:\s*"summary_large_image"/);

  for (const route of requiredRoutes) {
    const source = await readFile(new URL(`app/${route}/page.tsx`, root), "utf8");
    assert.match(source, /createPageMetadata\(\{/);
    assert.match(source, new RegExp(`pathname:\\s*"/${route}"`));
  }
});

test("sitemap contains every indexable route and excludes redirects", async () => {
  const sitemap = await readFile(new URL("app/sitemap.ts", root), "utf8");

  for (const route of requiredRoutes) {
    assert.match(sitemap, new RegExp(`lionmarketingai\\.com/${route}`));
  }

  assert.doesNotMatch(sitemap, /lionmarketingai\.com\/(booking|home|_preview|white-label-sign-up)/);
});

test("legacy Search Console URLs resolve through permanent redirects", async () => {
  const config = await readFile(new URL("next.config.ts", root), "utf8");
  const booking = await readFile(new URL("app/booking/page.tsx", root), "utf8");

  for (const source of [
    "/home",
    "/_preview",
    "/_preview/:path*",
    "/white-label-sign-up",
    "/lionmarketingai.com/terms-of-service",
  ]) {
    assert.match(config, new RegExp(`source:\\s*"${source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
  }

  assert.match(booking, /permanentRedirect\("\/#book"\)/);
});

test("footer links only to implemented legal and contact routes", async () => {
  const footer = await readFile(new URL("app/components/site-chrome.tsx", root), "utf8");

  assert.match(footer, /href="\/contact"/);
  assert.match(footer, /href="\/privacy-policy"/);
  assert.match(footer, /href="\/terms-of-service"/);
  assert.doesNotMatch(footer, /href="https:\/\/lionmarketingai\.com\/(privacy-policy|terms-of-service)"/);
});

test("external customer links use the Lion Marketing domain", async () => {
  const home = await readFile(new URL("app/page.tsx", root), "utf8");
  const chrome = await readFile(new URL("app/components/site-chrome.tsx", root), "utf8");
  const publicSource = `${home}\n${chrome}`;

  assert.match(
    home,
    /https:\/\/link\.lionmarketingai\.com\/widget\/booking\/19xLmsQpIvEy1VHenF6x/,
  );
  assert.match(chrome, /https:\/\/app\.lionmarketingai\.com/);
  assert.doesNotMatch(publicSource, /thelistinglion\.com/);
});

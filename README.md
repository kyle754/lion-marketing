# Lion Marketing

Premium marketing site + ROI forecast tool for Lion Marketing.

## Routes

| URL | Purpose |
|-----|---------|
| `/` | Conversion-optimized one-page marketing site (light theme) |
| `/forecast` | Lead generation ROI calculator for sales calls |

## Development

```bash
npm install
npm run dev:clean
```

- Marketing site: http://localhost:3000
- ROI tool: http://localhost:3000/forecast

## Stack

- Next.js 16 (App Router)
- Tailwind CSS
- Recharts (forecast charts)
- @react-pdf/renderer (PDF export)

## Brand

Light ivory/gold design system lives in `tailwind.config.ts` under `forecast.*` colors — shared across the site and calculator.

## Config

- Site copy & links: `src/config/site.ts`
- Booking URL: update `SITE.bookingUrl` when your scheduler changes

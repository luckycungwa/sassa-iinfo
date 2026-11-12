# SASSA Grant Hub

An independent information site about South African Social Security Agency (SASSA) grants, payment dates, status codes and appeals.

**This site is not affiliated with SASSA or the South African government.** It explains public information and links to the official portals. It cannot look up an individual grant record.

## Stack

- Next.js 15 (App Router) and React 19
- TypeScript
- Tailwind CSS 4
- Content stored as validated JSON in `content/`

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `APP_URL` | Production | Canonical origin, `https://www.sassagranthub.co.za`. No trailing slash. |
| `GOOGLE_SITE_VERIFICATION` | Optional | Search Console HTML-tag verification token. |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics 4 measurement ID (`G-...`). |
| `NEXT_PUBLIC_ADSENSE_ID` | Optional | AdSense publisher ID (`ca-pub-...`). Leave blank until approval. |

Never commit `.env.local` or production credentials.

## Build and verification

```bash
npm run validate:content   # validates every JSON content file
npm run build              # production build; also runs validation
npm start                  # serve the production build
```

`npm run build` must pass before deploying. The build fails on invalid content, TypeScript errors and lint errors.

## Content and dates

- Grant pages, guides, statuses, appeals and payment months live in `content/`.
- Payment schedule data lives in `lib/data/paymentDates.ts`.
- `npm run dates:sync` updates the schedule data; `npm run dates:check` checks for drift without writing.
- `npm run freshness` reports stale content.
- Do not invent dates, amounts, authors or official statements. Cite SASSA or government sources and record the last-checked date.

## Deployment

1. Push the repository to GitHub and import it into Vercel (or another Next.js host).
2. Add `sassagranthub.co.za` and `www.sassagranthub.co.za` to the project.
3. Point DNS at the host. Make `www` the primary domain; the apex redirects to it.
4. Set `APP_URL=https://www.sassagranthub.co.za` in the production environment.
5. Deploy and confirm that `/robots.txt` and `/sitemap.xml` use the production domain.
6. In Search Console, verify the domain, submit `https://www.sassagranthub.co.za/sitemap.xml`, and inspect the homepage, `/status`, `/payment-dates` and `/payment-dates/2026-november`.
7. Add AdSense only after the account is approved. Do not create a placeholder `ads.txt` or publish a publisher ID that does not exist.

See `MIGRATION.md` for the domain cutover and redirect checklist.

## Editorial rules

- Clearly distinguish general information from an individual's record.
- Link to `https://srd.sassa.gov.za/` for official status checks.
- Do not claim government affiliation, guaranteed payment dates or "most trusted" status.
- Keep correction and contact routes visible.

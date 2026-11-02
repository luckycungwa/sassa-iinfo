# Launch and domain setup: SASSA Grant Hub

This file records the brand and domain cutover for `https://sassagranthub.co.za` and the checks that still require owner access to DNS, hosting and Google Search Console. Do not mark an item complete until it has been verified in the live environment.

## Current identity

- Brand: **SASSA Grant Hub**
- Canonical origin: `https://sassagranthub.co.za`
- `lib/site.ts` is the single source for the canonical origin. Its fallback is `https://sassagranthub.co.za`.
- Set `APP_URL=https://sassagranthub.co.za` in production so canonicals, `sitemap.xml`, `robots.txt`, Open Graph and JSON-LD all use the new domain.

The earlier candidate `checksassastatus.co.za` was unavailable and never became the canonical domain. It is not used anywhere in this project. Do not attach it or create redirects for it.

## Host redirects in the codebase

`next.config.ts` permanently redirects these legacy hosts to the new canonical origin, preserving the path:

- `sassagranttguide.vercel.app`
- `sassagrantguide.co.za`
- `www.sassagrantguide.co.za`
- `www.sassagranthub.co.za`

The apex `sassagranthub.co.za` is the canonical host. Existing legacy-path redirects are retained (`/en`, `/zu`, `/xh`, `/af`, and the old guide/news URLs).

The host redirects only run when the legacy hostnames resolve to **this** deployment. A redirect rule cannot run on a separate Vercel project.

## New domain status

The new domain was chosen on 2 November 2026 after `checksassastatus.co.za` was found to be taken. DNS and hosting were not connected at that point, so this workspace cannot confirm what `sassagranthub.co.za` currently serves.

Before submitting anything to Search Console, verify:

- `https://sassagranthub.co.za/` returns this site's homepage with a valid HTTPS certificate.
- `https://sassagranthub.co.za/sitemap.xml` returns XML with `sassagranthub.co.za` URLs.
- `https://sassagranthub.co.za/robots.txt` allows crawling and does not end with `Disallow: /`.
- `https://www.sassagranthub.co.za/` returns a 301 to the apex.
- The homepage canonical is `https://sassagranthub.co.za/`.

If the domain is behind Cloudflare and serves a placeholder page or a managed `robots.txt` with `Disallow: /`, remove the placeholder and the managed robots/content-signal rule first. The app's own `robots.txt` must be the one served.

## Owner launch sequence

1. **Commit and push** the current working tree.
2. **Import or redeploy** the project in Vercel (or another Next.js host).
3. **Attach the domain.** Add `sassagranthub.co.za` and `www.sassagranthub.co.za`. Set the apex as primary; the app redirects `www` to the apex.
4. **Point DNS at the host.** Use the A/ALIAS and CNAME records the host shows. Remove any old placeholder records.
5. **Set `APP_URL`** in the production environment and redeploy. Rebuild after changing it.
6. **Verify HTTPS and host behaviour.**
   - `curl -I https://sassagranthub.co.za/` should return 200.
   - `curl -I http://sassagranthub.co.za/` should redirect to HTTPS.
   - `curl -I https://www.sassagranthub.co.za/` should return a 301 to the apex.
7. **Search Console.**
   - Verify the domain property (DNS TXT is the most durable method).
   - Submit `https://sassagranthub.co.za/sitemap.xml`.
   - Inspect the homepage, `/status`, `/payment-dates`, `/grants`, `/appeals` and `/payment-dates/2026-november`.
   - Monitor Pages → Not indexed, Crawl stats, Core Web Vitals and the sitemap report for four to six weeks.
8. **AdSense.** Add the publisher ID only after approval. Do not create a placeholder `ads.txt` or publish a publisher ID that does not exist.

## If the old site was live

If `sassagrantguide.co.za` or its Vercel hostname still receives traffic, keep that project alive and redirect it to `https://sassagranthub.co.za/:path*`. Then:

- Verify both the old and new properties in Search Console.
- Use **Settings → Change of address** on the old property.
- Export the old URL list from the Pages report and compare it with `sitemap.xml`.
- Map any old URL with no matching path explicitly; do not send everything to the homepage.

Keep the old property and redirects in place for at least 12 months.

## Rollback

If the new domain fails after cutover, point `APP_URL` back to the working origin and restore the previous DNS records. The host redirects are inert until the legacy hostnames resolve to this deployment.

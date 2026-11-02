import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_OPERATOR, OFFICIAL_LINKS } from "@/lib/site";
import { grants } from "@/lib/data/grants";
import { loadAllContent } from "@/lib/content-loader";
import { PAYMENT_DATA_UPDATED } from "@/lib/data/paymentDates";

export const dynamic = "force-static";

export function GET() {
  const news = loadAllContent()
    .filter((p) => p.classification === "news-article" && p.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? b.lastUpdated).getTime() -
        new Date(a.publishedAt ?? a.lastUpdated).getTime()
    )
    .slice(0, 8);

  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `${SITE_NAME} is an independent South African social grants information resource operated by ${SITE_OPERATOR}. It is not affiliated with SASSA or the South African government, and it cannot look up an individual grant record. Payment schedules are reviewed against official SASSA announcements; the schedule on this site was last checked ${PAYMENT_DATA_UPDATED}.`,
    "",
    "## Core resources",
    `- [All SASSA grants](${SITE_URL}/grants): amounts, eligibility, documents and application steps for every grant.`,
    `- [SRD R370 grant](${SITE_URL}/grants/srd-r370-grant): the social relief of distress grant, including the monthly means test, application channels and appeals.`,
    `- [SASSA payment dates](${SITE_URL}/payment-dates): month-by-month 2026 schedule for Older Persons, Disability, Children's and SRD R370 payments.`,
    `- [SASSA status meanings](${SITE_URL}/status): what each application and payment status code means and what to do next.`,
    `- [Appeals centre](${SITE_URL}/appeals): how to appeal a declined grant through the Independent Tribunal for Social Assistance Appeals (ITSAA).`,
    `- [Eligibility guides](${SITE_URL}/eligibility): situation-based eligibility explanations.`,
    `- [Updates](${SITE_URL}/news): dated editorial articles on verified SASSA developments.`,
    "",
    "## Grant guides",
    ...grants.map(
      (g) => `- [${g.title}](${SITE_URL}/grants/${g.slug}): ${g.amount} ${g.frequency}. ${g.targetGroup}`
    ),
    "",
    "## Recent updates",
    ...news.map(
      (n) =>
        `- [${n.title}](${SITE_URL}${n.slug}): published ${n.publishedAt ?? n.lastUpdated}, updated ${n.lastUpdated}.`
    ),
    "",
    "## Editorial standards",
    `- Content is written and reviewed by named editors; every article shows its publication and last-updated dates.`,
    `- Pages cite official sources and state when a schedule or figure was last checked.`,
    `- Corrections policy: ${SITE_URL}/corrections-policy`,
    `- Editorial policy: ${SITE_URL}/editorial-policy`,
    `- About and operator: ${SITE_URL}/about`,
    "",
    "## Official services",
    `- SASSA: ${OFFICIAL_LINKS.sassa}`,
    `- SRD status and application portal: ${OFFICIAL_LINKS.srd}`,
    `- SRD appeals portal: ${OFFICIAL_LINKS.appeals}`,
    `- SASSA toll-free helpline: ${OFFICIAL_LINKS.helpline}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

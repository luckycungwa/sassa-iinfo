/* Content Standards — per-category requirements for depth and quality.

Every page must:
1. Include a hero block (title + description + readingTime + lastUpdated)
2. Have at least 3 block types (not just paragraphs)
3. Provide clear next-action guidance
4. Link contextually to 2+ related pages
5. Include at least one non-text block (stat-bar, comparison-table, steps, callout, image, etc.)

Category-specific standards below:
*/

export const CATEGORY_STANDARDS = {
  "banking-guide": {
    purpose: "Explain each payment/banking method with a comparison of options, enabling users to choose and act.",
    requiredElements: [
      "Hero block explaining the payment method at a glance",
      "Comparison or options table (if multiple methods exist)",
      "Step-by-step process for the most common action",
      "Callout with critical timing or requirement details",
      "FAQ with 3+ common questions",
    ],
    supportingInfo: [
      "Bank verification timelines and requirements",
      "What to do if something goes wrong (troubleshooting)",
      "Links to related banking guides",
      "Processing times and fees (if any)",
    ],
    avoid: [
      "Just describing what a method is without telling the user how to use it",
      "Repeating the same information across multiple banking pages",
    ],
    structure: ["Hero → Overview → Step-by-Step → Troubleshooting → Related Guides"],
  },

  "grant-detail": {
    purpose: "Provide complete grant information so users know eligibility, amount, application process, and what to do if declined.",
    requiredElements: [
      "Hero with grant amount prominently displayed",
      "Eligibility criteria (who qualifies)",
      "Required documents checklist",
      "Application process (steps or timeline)",
      "Payment schedule / frequency",
      "Appeal information if declined",
      "FAQ with 4+ questions",
    ],
    supportingInfo: [
      "Means test thresholds and income limits",
      "Link to status check guide",
      "Link to payment dates calendar",
      "Contact information for the specific grant",
    ],
    avoid: [
      "Listing eligibility without explaining edge cases",
      "Omitting the decline/appeal path",
    ],
    structure: ["Hero → Eligibility → Documents → How to Apply → Payment → If Declined → FAQ"],
  },

  "status-meaning": {
    purpose: "Explain what a status means, why it happens, how long it lasts, and exactly what the user should do.",
    requiredElements: [
      "Hero with the status name and its implication",
      "Plain-language explanation of what the status means",
      "Causes / triggers (why it happens)",
      "Duration expectations",
      "Action list (numbered steps of what user should do)",
    ],
    supportingInfo: [
      "Link to related statuses",
      "Link to appeal guide if status is a decline",
      "Link to banking guide if status involves payment",
      "Link to contact/office finder if in-person visit needed",
    ],
    avoid: [
      "Using jargon without explanation",
      "Not telling the user what to DO about the status",
    ],
    structure: ["Hero → What It Means → Why It Happens → How Long → What To Do → Related Statuses"],
  },

  "appeal-guide": {
    purpose: "Walk users through the exact appeal process so they can successfully challenge a decline.",
    requiredElements: [
      "Hero explaining which type of appeal this guide covers",
      "Step-by-step appeal process with numbered steps",
      "Required documents list",
      "Timeline / how long the appeal takes",
      "Possible outcomes explained",
      "FAQ with 3+ questions",
    ],
    supportingInfo: [
      "Link to the appeal portal",
      "Sample appeal letter or template",
      "Common reasons for appeal and how to address them",
      "What happens after a successful appeal (backpay)",
    ],
    avoid: [
      "Being generic — tie the content to a specific decline reason or grant type",
    ],
    structure: ["Hero → Steps → Documents → Timeline → Outcomes → FAQ → Related Guides"],
  },

  "eligibility-guide": {
    purpose: "Help users determine if they qualify, covering all scenarios and edge cases.",
    requiredElements: [
      "Hero with the specific scenario or profile",
      "Simple eligibility checklist (yes/no items)",
      "Income/means test thresholds if applicable",
      "Required documents list",
      "What to do if not eligible",
      "FAQ with 3+ questions",
    ],
    supportingInfo: [
      "Link to grant detail page for eligible users",
      "Link to alternative grants if not eligible",
      "Links to application guides",
    ],
    avoid: [
      "Vague eligibility statements (be specific about income limits)",
    ],
    structure: ["Hero → Checklist → Documents → If Eligible → If Not Eligible → FAQ"],
  },

  "how-to-guide": {
    purpose: "Teach users to complete a specific SASSA task with clear, actionable steps.",
    requiredElements: [
      "Hero explaining what the user will accomplish",
      "Prerequisites (what they need before starting)",
      "Numbered step-by-step instructions",
      "Screenshots or visual indicators at key steps",
      "Troubleshooting common issues",
    ],
    supportingInfo: [
      "Expected time to complete",
      "Required documents or information",
      "Alternative methods (online vs in-person)",
      "Link to related guides",
    ],
    avoid: [
      "Writing steps that assume prior knowledge",
    ],
    structure: ["Hero → Prerequisites → Steps → Troubleshooting → Related Guides"],
  },

  "hub-index": {
    purpose: "Serve as the editorial landing page for a category, orienting users and guiding them to the right resource.",
    requiredElements: [
      "Category hero with description and key stat",
      "Featured / recommended resources (top 2-3)",
      "Full categorized listing of all pages in the category",
      "Quick links to most-requested resources",
      "Category FAQ or common questions",
    ],
    supportingInfo: [
      "Category description that sets context",
      "Stats that demonstrate scope",
      "Visual illustration matching the category",
    ],
    avoid: [
      "Just being a list of links with no editorial content",
    ],
    structure: ["Hero → Featured → All Resources → Quick Links → FAQ"],
  },
} as const;

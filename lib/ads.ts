/**
 * AdSense ad slot IDs.
 *
 * A slot ID is issued by AdSense for each ad unit created in the AdSense
 * dashboard (a numeric string such as "1234567890"). Until the account is
 * approved and units exist, these values stay empty and <AdUnit /> renders
 * nothing — the page never emits <ins class="adsbygoogle"> markup without a
 * valid slot, which otherwise produces a blank box and console errors.
 *
 * Add the values as NEXT_PUBLIC_ADSENSE_SLOT_* environment variables.
 */
export const AD_SLOTS = {
  HOME_LEADERBOARD: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_LEADERBOARD ?? "",
  GRANTS_HUB: process.env.NEXT_PUBLIC_ADSENSE_SLOT_GRANTS_HUB ?? "",
  STATUS_HUB: process.env.NEXT_PUBLIC_ADSENSE_SLOT_STATUS_HUB ?? "",
  PAYMENTDATES_HUB: process.env.NEXT_PUBLIC_ADSENSE_SLOT_PAYMENT_DATES_HUB ?? "",
  APPEALS_HUB: process.env.NEXT_PUBLIC_ADSENSE_SLOT_APPEALS_HUB ?? "",
} as const;

import math

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def relative_luminance(r, g, b):
    rs, gs, bs = r/255.0, g/255.0, b/255.0
    rl = rs/12.92 if rs <= 0.04045 else ((rs + 0.055)/1.055)**2.4
    gl = gs/12.92 if gs <= 0.04045 else ((gs + 0.055)/1.055)**2.4
    bl = bs/12.92 if bs <= 0.04045 else ((bs + 0.055)/1.055)**2.4
    return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl

def contrast_ratio(fg_hex, bg_hex):
    fr, fg, fb = hex_to_rgb(fg_hex)
    br, bg_c, bb = hex_to_rgb(bg_hex)
    l1 = relative_luminance(fr, fg, fb)
    l2 = relative_luminance(br, bg_c, bb)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

def effective_contrast_with_opacity(fg_hex, bg_hex, opacity):
    """Calculate effective fg color when fg is blended over bg at given opacity"""
    fr, fg, fb = hex_to_rgb(fg_hex)
    br, bg_c, bb = hex_to_rgb(bg_hex)
    er = int(fr * opacity + br * (1 - opacity))
    eg = int(fg * opacity + bg_c * (1 - opacity))
    eb = int(fb * opacity + bb * (1 - opacity))
    return contrast_ratio(f"#{er:02x}{eg:02x}{eb:02x}", bg_hex)

# Theme mappings
light = {
    "foreground": "#312f27", "ink": "#312f27", "body": "#312f27", "carbon": "#312f27",
    "muted": "#484640", "ash": "#484640",
    "muted-foreground": "#484640",
    "white": "#ffffff",
    "violet": "#7700ff",
    "accent": "#ffc500", "yellow": "#ffc500",
    "accent-dark": "#a16207", "yellow-dark": "#a16207",
    "accent-foreground": "#312f27",
}
light_bg = {
    "background": "#fafafa", "card": "#f5f4f0", "surface": "#ffffff",
    "paper": "#f5f4f0", "fog": "#e8e7e2", "slate": "#4a5058",
    "midnight": "#131316", "yellow": "#ffc500", "violet": "#7700ff",
    "ink": "#312f27", "carbon": "#312f27", "canvas": "#fafafa",
}

dark = {
    "foreground": "#e8e4d9", "ink": "#e8e4d9", "body": "#e8e4d9", "carbon": "#e8e4d9",
    "muted": "#a6a398", "ash": "#a6a398",
    "muted-foreground": "#a39f96",
    "white": "#ffffff",
    "violet": "#9b4dff",
    "accent": "#d4a017", "yellow": "#d4a017",
    "accent-dark": "#eec13f", "yellow-dark": "#eec13f",
    "accent-foreground": "#e8e4d9",
}
dark_bg = {
    "background": "#131316", "card": "#262629", "surface": "#1e1e22",
    "paper": "#262629", "fog": "#1f1f22", "slate": "#2a2a2e",
    "midnight": "#131316", "yellow": "#d4a017", "violet": "#9b4dff",
    "ink": "#e8e4d9", "carbon": "#e8e4d9", "canvas": "#131316",
}

# All specific combos found in the codebase
# Format: (fg_token, bg_token_or_hex, is_large_text, opacity, location)
combos = [
    # === ContentBlockRenderer.tsx ===
    ("accent-dark", "canvas", False, 1.0, "CBR:37 link text"),
    ("muted", "surface", False, 1.0, "CBR:70 paragraph text"),
    ("muted", "surface", False, 1.0, "CBR:76 list item text"),
    ("muted", "surface", False, 1.0, "CBR:89 table caption"),
    ("muted", "surface", False, 1.0, "CBR:101 table cell"),
    ("ink", "surface", False, 1.0, "CBR:93 table header"),
    ("white", "ink/90", False, 1.0, "CBR:306 code block"),
    ("muted", "surface", False, 1.0, "CBR:314 image caption"),
    ("muted", "surface", False, 1.0, "CBR:320-321 news meta"),
    ("muted", "surface", False, 1.0, "CBR:176-180 sources text"),
    ("accent-dark", "surface", False, 1.0, "CBR:37,167,181 link"),
    ("ink", "surface", False, 1.0, "CBR:124 callout text"),
    ("ink", "surface", False, 1.0, "CBR:358 Official text"),
    ("muted", "surface", False, 1.0, "CBR:359 Official desc"),
    ("accent-foreground", "gold", False, 1.0, "CBR:365 SRD button"),
    ("ink", "surface", False, 1.0, "CBR:369 Appeal button"),
    ("muted", "fog/40", False, 1.0, "CBR:175 sources bg"),

    # === ArticleLayout.tsx ===
    ("ink", "surface", False, 1.0, "AL:53 h3 heading"),
    ("muted", "surface", False, 1.0, "AL:65 h4 heading"),
    ("ink", "surface", False, 1.0, "AL:77 h2 heading"),
    ("body", "surface", False, 1.0, "AL:90 paragraph"),
    ("muted", "surface", False, 1.0, "AL:135 table header"),
    ("ink", "surface", False, 1.0, "AL:148 table cell"),
    ("muted", "surface", False, 1.0, "AL:158 table caption"),
    ("muted", "surface", False, 1.0, "AL:334-349 office details"),
    ("white/60", "midnight", False, 1.0, "AL:402 code preview"),
    ("red-400", "red-900/20", False, 1.0, "AL:411 error block"),

    # === GoldCardBanner.tsx ===
    ("white", "midnight", False, 1.0, "GCB:20-69 all text"),
    ("white/70", "midnight", False, 1.0, "GCB:30,57 desc text"),
    ("accent-foreground", "yellow", False, 1.0, "GCB:37,64 CTA btn"),
    ("black", "red-600", False, 1.0, "GCB:50 badge"),
    ("white", "red-600", False, 1.0, "GCB:50 badge text"),
    ("black", "yellow/amber-500", False, 1.0, "GCB:23 badge after deadline"),

    # === TopNavbar.tsx ===
    ("ash", "paper/90", False, 1.0, "TN:77 theme toggle"),
    ("violet", "paper/90", False, 1.0, "TN:211 active nav"),
    ("ash", "paper/90", False, 1.0, "TN:213 nav items"),
    ("ash", "paper", False, 1.0, "TN:241 dropdown desc"),
    ("white", "violet", False, 1.0, "TN:264 Browse Grants"),
    ("ash", "paper", False, 1.0, "TN:274 hamburger"),
    ("carbon", "paper", False, 1.0, "TN:290 mobile nav title"),
    ("ash", "paper", False, 1.0, "TN:294 mobile close btn"),
    ("violet", "yellow/10", False, 1.0, "TN:235,331 active item"),
    ("ash", "paper", False, 1.0, "TN:336 mobile desc"),

    # === PaymentCentre.tsx ===
    ("ink", "midnight", False, 1.0, "PC:65 hero text"),
    ("white/70", "midnight", False, 1.0, "PC:74 hero desc"),
    ("accent-dark", "accent-light", False, 1.0, "PC:68 badge"),
    ("accent-dark", "accent-light", False, 1.0, "PC:80 print btn"),
    ("black", "accent", False, 1.0, "PC:86 download btn"),
    ("ink", "surface", False, 1.0, "PC:111 month header"),
    ("muted", "surface", False, 1.0, "PC:113 next cycle"),
    ("muted", "surface", False, 1.0, "PC:206 table header"),

    # === SearchDialog.tsx ===
    ("muted", "canvas", False, 1.0, "SD:51 search btn"),
    ("muted", "surface", False, 1.0, "SD:63 search icon"),
    ("ink", "surface", False, 1.0, "SD:74 input text"),
    ("muted", "surface", False, 1.0, "SD:77 close btn"),
    ("muted", "surface", False, 1.0, "SD:91 result category"),
    ("ink", "surface", False, 1.0, "SD:94 result title"),
    ("muted", "surface", False, 1.0, "SD:95 result desc"),

    # === LanguageSwitcher.tsx ===
    ("ash", "fog/50", False, 1.0, "LS:22 select text"),

    # === HeroSection.tsx ===
    ("ink", "surface-dim", False, 1.0, "HS:33 title"),
    ("muted", "surface-dim", False, 1.0, "HS:36 desc"),
    ("muted", "surface-dim", False, 1.0, "HS:39 meta"),
    ("accent-foreground", "gold", False, 1.0, "HS:58 CTA btn"),
    ("ink", "surface", False, 1.0, "HS:66 secondary CTA"),

    # === SourcesSection.tsx ===
    ("ink", "surface", False, 1.0, "SS:11 title"),
    ("accent-dark", "surface", False, 1.0, "SS:19 link"),
    ("muted", "surface", False, 1.0, "SS:14 source text"),

    # === TableOfContents.tsx ===
    ("accent-dark", "surface", False, 1.0, "TOC:63,70 icon"),
    ("ink", "surface", False, 1.0, "TOC:64,71 label"),
    ("accent-dark", "gold/10", False, 1.0, "TOC:85 active link"),
    ("muted", "surface", False, 1.0, "TOC:86 inactive link"),

    # === Byline.tsx ===
    ("accent-foreground", "gold", False, 1.0, "BY:16 avatar"),
    ("ink", "surface", False, 1.0, "BY:21 author name"),
    ("muted", "surface", False, 1.0, "BY:24 author role"),
    ("muted-foreground", "surface", False, 1.0, "BY:32,37 badge text"),
    ("ink", "surface", False, 1.0, "BY:34,39 reviewer name"),
    ("muted", "surface", False, 1.0, "BY:35,40 credentials"),

    # === AdUnit.tsx ===
    ("muted", "canvas", False, 1.0, "AU:43 label"),

    # === Badge (ui/badge.tsx) ===
    # Uses CSS variables, skipping dynamic ones

    # === AppealsCentre.tsx ===
    ("ink", "amber/10", False, 1.0, "AC:18 title"),
    ("muted", "amber/10", False, 1.0, "AC:19 desc"),
    ("ink", "surface", False, 1.0, "AC:61 content title"),
    ("muted", "surface", False, 1.0, "AC:64 content desc"),
    ("muted", "surface", False, 1.0, "AC:81 step text"),
    ("muted", "surface", False, 1.0, "AC:97 timeline text"),
    ("muted", "surface", False, 1.0, "AC:108 docs text"),
    ("muted", "surface", False, 1.0, "AC:122,135 reasons/outcomes"),

    # === InteractiveTools.tsx ===
    ("primary-foreground", "accent", False, 1.0, "IT:56 active tab"),
    ("muted", "surface", False, 1.0, "IT:57 inactive tab"),

    # === EligibilityCentre.tsx ===
    ("ink", "accent-dark", False, 1.0, "EC:15 side panel"),
    ("ink", "accent-dark", False, 1.0, "EC:18 side panel desc"),
    ("black", "accent", False, 1.0, "EC:23 side btn"),
    ("muted", "surface", False, 1.0, "EC:63,69 desc"),
    ("ink", "canvas", False, 1.0, "EC:81 checklist"),
    ("ink", "surface", False, 1.0, "EC:96 grant name"),
    ("muted", "surface", False, 1.0, "EC:97 grant desc"),
    ("accent-dark", "surface", False, 1.0, "EC:99 grant amount"),
    ("muted", "surface", False, 1.0, "EC:110 steps"),

    # === GrantLibrary.tsx ===
    ("ink", "accent", False, 1.0, "GL:32 selected btn"),
    ("ink", "surface", False, 1.0, "GL:51 grant title"),
    ("muted", "surface", False, 1.0, "GL:59 overview"),
    ("muted", "surface", False, 1.0, "GL:72,88 eligibility/docs"),
    ("ink", "canvas", False, 1.0, "GL:101 how-to-apply"),
    ("muted", "canvas", False, 1.0, "GL:105 steps"),
    ("ink", "amber/10", False, 1.0, "GL:115 appeal note"),
    ("muted", "surface", False, 1.0, "GL:145 FAQ answer"),

    # === ProvinceHubs.tsx ===
    ("ink", "accent", False, 1.0, "PH:27 selected"),
    ("ink", "surface", False, 1.0, "PH:44 title"),
    ("muted", "surface", False, 1.0, "PH:47 capital"),
    ("ink", "canvas", False, 1.0, "PH:59 address"),
    ("accent-dark", "canvas", False, 1.0, "PH:63 phone"),
    ("muted", "surface", False, 1.0, "PH:71 collection info"),
    ("muted", "surface", False, 1.0, "PH:97 FAQ answer"),

    # === DownloadCentre.tsx ===
    ("ink", "accent", False, 1.0, "DC:36 selected"),
    ("ink", "surface", False, 1.0, "DC:53 title"),
    ("muted", "surface", False, 1.0, "DC:56 ref text"),
    ("muted", "canvas", False, 1.0, "DC:68 purpose header"),
    ("muted", "surface", False, 1.0, "DC:69 purpose text"),
    ("ink", "surface", False, 1.0, "DC:76 how-to header"),
    ("muted", "surface", False, 1.0, "DC:80 steps"),
    ("ink", "canvas", False, 1.0, "DC:94 attachments header"),
    ("muted", "canvas", False, 1.0, "DC:98 attachments"),
    ("muted", "surface", False, 1.0, "DC:168 form dept"),
    ("muted", "surface", False, 1.0, "DC:170 form ref"),
    ("muted", "surface", False, 1.0, "DC:178-183 form labels"),

    # === StatusMeaningCentre.tsx ===
    ("ink", "accent", False, 1.0, "SMC:68 selected"),
    ("ink", "surface", False, 1.0, "SMC:109 title"),
    ("ink", "surface", False, 1.0, "SMC:113 desc"),
    ("muted", "surface", False, 1.0, "SMC:121 meaning"),
    ("ink", "canvas", False, 1.0, "SMC:129 why"),
    ("muted", "canvas", False, 1.0, "SMC:130 causes"),
    ("muted", "surface", False, 1.0, "SMC:141 duration"),
    ("muted", "surface", False, 1.0, "SMC:150 actions"),
    ("muted", "surface", False, 1.0, "SMC:181 FAQ answer"),

    # === GovernanceHub.tsx ===
    ("ink", "surface", False, 1.0, "GH:187 title"),
    ("muted", "surface", False, 1.0, "GH:190 desc"),
    ("ink", "canvas", False, 1.0, "GH:296 code bg"),
    ("amber", "ink", False, 1.0, "GH:296 code text"),
    ("muted", "surface", False, 1.0, "GH:317 block desc"),
    ("muted", "canvas", False, 1.0, "GH:413 table header"),
    ("ink", "canvas", False, 1.0, "GH:420 table row"),
    ("gold", "ink", False, 1.0, "GH:551 JSON editor"),
    ("muted", "ink", False, 1.0, "GH:553 JSON label"),
    ("black", "accent-dark", False, 1.0, "GH:563 validate btn"),
    ("ink", "surface", False, 1.0, "GH:898 card title"),
    ("muted", "surface", False, 1.0, "GH:899 card desc"),
    ("muted-foreground", "surface", False, 1.0, "GH:901 card meta"),
    ("accent-dark", "surface", False, 1.0, "GH:902 card value"),
    ("purple-600", "canvas", False, 1.0, "GH:924 non-compliant val"),
    ("muted-foreground", "canvas", False, 1.0, "GH:922 non-compliant label"),

    # === Homepage (app/[locale]/page.tsx) ===
    ("white/70", "slate", False, 1.0, "HP:63 subtitle"),
    ("white", "slate", False, 1.0, "HP:64 h1"),
    ("white/80", "slate", False, 1.0, "HP:67 desc"),
    ("white", "slate", False, 1.0, "HP:73 violet btn"),
    ("white", "violet", False, 1.0, "HP:73 Browse btn"),
    ("white/30", "slate", False, 1.0, "HP:79 border-2"),
    ("white", "slate", False, 1.0, "HP:79 status btn"),
    ("carbon", "yellow", False, 1.0, "HP:105 h2"),
    ("body", "yellow", False, 1.0, "HP:108 desc"),
    ("carbon/60", "yellow", False, 1.0, "HP:111 stats"),
    ("caron", "paper", False, 1.0, "HP:133 grant name"),
    ("ash", "paper", False, 1.0, "HP:134 grant desc"),
    ("carbon", "paper", False, 1.0, "HP:136 amount"),
    ("ash", "paper", False, 1.0, "HP:137 /month"),
    ("muted", "yellow", False, 1.0, "HP:166 task desc"),
    ("white", "violet", False, 1.0, "HP:145 View grants"),
    ("violet", "paper", False, 1.0, "HP:254 How it works label"),
    ("body", "paper", False, 1.0, "HP:256 body text"),
    ("violet", "paper", False, 1.0, "HP:272 Why label"),
    ("body", "paper", False, 1.0, "HP:273 author text"),
    ("white", "slate", False, 1.0, "HP:306 footer text"),
    ("accent", "slate", False, 1.0, "HP:309 link"),
    ("white/30", "slate", False, 1.0, "HP:93 separator"),

    # === About page ===
    ("muted-foreground", "yellow", False, 1.0, "About:38 subtitle"),
    ("body", "yellow", False, 1.0, "About:42 desc"),
    ("body", "paper", False, 1.0, "About:53 body text"),
    ("body", "paper", False, 1.0, "About:76 desc"),
    ("ash", "fog", False, 1.0, "About:90 author desc"),
    ("white", "slate", False, 1.0, "About:105 footer"),
    ("white/70", "slate", False, 1.0, "About:106 footer sub"),

    # === Lucky Cungwa page ===
    ("muted-foreground", "yellow", False, 1.0, "LC:33 subtitle"),
    ("body", "yellow", False, 1.0, "LC:37 desc"),
    ("body", "paper", False, 1.0, "LC:48 body"),
    ("body", "paper", False, 1.0, "LC:76 desc"),
    ("white", "slate", False, 1.0, "LC:101 footer"),
    ("white/70", "slate", False, 1.0, "LC:102 footer sub"),

    # === Appeals hub ===
    ("muted-foreground", "yellow", False, 1.0, "AppH:32 subtitle"),
    ("body", "yellow", False, 1.0, "AppH:36 desc"),
    ("white", "slate", False, 1.0, "AppH:204 footer"),
    ("yellow", "slate", False, 1.0, "AppH:208 icon"),
    ("white/70", "slate", False, 1.0, "AppH:211 footer sub"),

    # === Banking page ===
    ("muted", "slate", False, 1.0, "Bank:38 subtitle"),
    ("body", "slate", False, 1.0, "Bank:42 desc"),
    ("white", "slate", False, 1.0, "Bank:157 footer"),
    ("white/70", "slate", False, 1.0, "Bank:162 footer sub"),

    # === Contact page ===
    ("muted-foreground", "yellow", False, 1.0, "Con:29 subtitle"),
    ("body", "yellow", False, 1.0, "Con:33 desc"),
    ("white/30", "slate", False, 1.0, "Con:93 separator"),

    # === Downloads page ===
    ("muted", "slate", False, 1.0, "DL:35 subtitle"),
    ("body", "slate", False, 1.0, "DL:39 desc"),
    ("white", "slate", False, 1.0, "DL:130 footer"),
    ("white/70", "slate", False, 1.0, "DL:135 footer sub"),

    # === Eligibility page ===
    ("muted-foreground", "yellow", False, 1.0, "Elig:50 subtitle"),
    ("body", "yellow", False, 1.0, "Elig:54 desc"),
    ("white", "slate", False, 1.0, "Elig:176 footer"),
    ("white/70", "slate", False, 1.0, "Elig:181 footer sub"),

    # === Guides page ===
    ("muted-foreground", "yellow", False, 1.0, "Guides:38 subtitle"),
    ("body", "yellow", False, 1.0, "Guides:42 desc"),
    ("white", "slate", False, 1.0, "Guides:150 footer"),
    ("white/70", "slate", False, 1.0, "Guides:155 footer sub"),

    # === Offices page ===
    ("muted-foreground", "yellow", False, 1.0, "Off:38 subtitle"),
    ("body", "yellow", False, 1.0, "Off:42 desc"),
    ("ash/70", "fog", False, 1.0, "Off:104,107 services"),
    ("white", "slate", False, 1.0, "Off:141 footer"),
    ("white/70", "slate", False, 1.0, "Off:146 footer sub"),

    # === Payment-dates page ===
    ("muted", "slate", False, 1.0, "PD:48 subtitle"),
    ("body", "slate", False, 1.0, "PD:52 desc"),
    ("white", "slate", False, 1.0, "PD:168 footer"),

    # === Provinces page ===
    ("muted-foreground", "yellow", False, 1.0, "Prov:36 subtitle"),
    ("body", "yellow", False, 1.0, "Prov:40 desc"),
    ("white", "slate", False, 1.0, "Prov:128 footer"),
    ("white/70", "slate", False, 1.0, "Prov:133 footer sub"),

    # === Status page ===
    ("muted", "slate", False, 1.0, "Stat:34 subtitle"),
    ("body", "slate", False, 1.0, "Stat:38 desc"),
    ("white", "slate", False, 1.0, "Stat:191 footer"),
    ("white/70", "slate", False, 1.0, "Stat:196 footer sub"),

    # === News page ===
    ("muted-foreground", "yellow", False, 1.0, "News:37 subtitle"),
    ("body", "yellow", False, 1.0, "News:41 desc"),
    ("ash/80", "paper", False, 1.0, "News:65 tag text"),
    ("white", "slate", False, 1.0, "News:95 footer"),

    # === News slug page ===
    ("muted", "surface", False, 1.0, "NewsSlug:77 meta"),
    ("ink", "surface", False, 1.0, "NewsSlug:85 title"),
    ("muted", "surface", False, 1.0, "NewsSlug:86 summary"),
    ("muted", "surface", False, 1.0, "NewsSlug:91 content"),
    ("muted", "surface", False, 1.0, "NewsSlug:97 tags"),
    ("muted", "gold/5", False, 1.0, "NewsSlug:102 disclaimer"),

    # === Tools page ===
    ("muted-foreground", "yellow", False, 1.0, "Tools:17 subtitle"),
    ("body", "yellow", False, 1.0, "Tools:21 desc"),
    ("body", "fog", False, 1.0, "Tools:29 intro"),
    ("white", "slate", False, 1.0, "Tools:78 footer"),

    # === FAQ page ===
    ("ink", "surface", False, 1.0, "FAQ:33 title"),
    ("muted", "surface", False, 1.0, "FAQ:34 subtitle"),
    ("ink", "surface", False, 1.0, "FAQ:42 filter chips"),
    ("ink", "surface", False, 1.0, "FAQ:51 category title"),
    ("ink", "surface", False, 1.0, "FAQ:55 question"),
    ("muted", "surface", False, 1.0, "FAQ:61 answer"),

    # === Editorial Policy ===
    ("ink", "surface", False, 1.0, "EP:52 title"),
    ("muted", "surface", False, 1.0, "EP:53 subtitle"),
    ("muted", "surface", False, 1.0, "EP:58,62 desc"),
    ("ink", "surface", False, 1.0, "EP:75 principle title"),
    ("muted", "surface", False, 1.0, "EP:77 principle desc"),
    ("accent-dark", "gold/10", False, 1.0, "EP:84 correction title"),
    ("muted", "gold/10", False, 1.0, "EP:85,88 correction text"),

    # === Layout (footer) ===
    ("carbon", "paper", False, 1.0, "Lay:182 footer text"),
    ("muted-foreground", "paper", False, 1.0, "Lay:185 last verified"),
    ("carbon", "paper", False, 1.0, "Lay:188 section title"),
    ("muted-foreground", "paper", False, 1.0, "Lay:190-233 footer links"),
    ("muted-foreground", "paper", False, 1.0, "Lay:238 copyright"),

    # === Not Found ===
    ("ink", "canvas", False, 1.0, "NF:13 404"),
    ("muted", "canvas", False, 1.0, "NF:14 desc"),
    ("black", "accent", False, 1.0, "NF:19 button"),

    # === WhatsApp button ===
    ("white", "#25D366", False, 1.0, "WA:14 icon"),

    # === AdUnit label ===
    ("muted", "canvas", False, 1.0, "AU:43 label"),

    # Additional specific combos from components
    ("ash", "paper/90", False, 1.0, "TN:77 backdrop-blur"),
    ("accent-dark", "surface", False, 1.0, "CBR:135 step number"),
    ("ink", "surface", False, 1.0, "CBR:139 step title"),
    ("muted", "surface", False, 1.0, "CBR:140 step desc"),
    ("ink", "surface", False, 1.0, "CBR:195 stat value"),
    ("ink", "surface", False, 1.0, "CBR:196 stat label"),
    ("muted", "surface", False, 1.0, "CBR:197 stat desc"),
    ("accent-dark", "surface", False, 1.0, "CBR:260 amount"),
    ("muted", "surface", False, 1.0, "CBR:261 frequency"),
    ("accent-dark", "canvas", False, 1.0, "CBR:167 link title"),
    ("muted", "canvas", False, 1.0, "CBR:168 link desc"),
    ("accent-dark", "paper", False, 1.0, "CBR:89 caption"),
    ("accent-dark", "surface", False, 1.0, "AL:279 calendar icon"),
    ("muted", "surface", False, 1.0, "AL:284 cycle month"),
    ("muted", "surface", False, 1.0, "AL:297 category label"),
    ("ink", "surface", False, 1.0, "AL:300 category name"),
    ("muted", "surface", False, 1.0, "AL:306 date label"),
    ("ink", "surface", False, 1.0, "AL:307 date value"),
    ("muted", "surface", False, 1.0, "AL:310 payout label"),
    ("accent-dark", "surface", False, 1.0, "AL:311 payout value"),
    ("accent-dark", "surface", False, 1.0, "AL:330 office label"),
    ("ink", "surface", False, 1.0, "AL:333 branch name"),
    ("muted", "surface", False, 1.0, "AL:334 province"),
    ("muted", "surface", False, 1.0, "AL:340 address"),
    ("muted", "surface", False, 1.0, "AL:344 phone"),
    ("muted", "surface", False, 1.0, "AL:348 hours"),
    ("ink", "surface", False, 1.0, "AL:355 accessibility"),
    ("muted", "surface", False, 1.0, "AL:361 access notes"),
    ("muted", "surface-dim/30", False, 1.0, "AL:367 coordinates"),
    ("muted", "surface", False, 1.0, "AL:399 extension text"),
    ("white", "violet", False, 1.0, "TopNav mobile Browse Grants"),
    ("ash", "paper", False, 1.0, "TopNav dropdown desc dark"),
    ("muted", "surface", False, 1.0, "CBR:225 table caption"),
    ("ink", "surface", False, 1.0, "CBR:229 comparison header"),
    ("muted", "surface", False, 1.0, "CBR:237 comparison cell"),
    ("ink", "surface", False, 1.0, "CBR:248 info card title"),
    ("muted", "surface", False, 1.0, "CBR:249 info card text"),
    ("ink", "surface", False, 1.0, "CBR:256 target group label"),
    ("muted", "surface", False, 1.0, "CBR:257 target group value"),
    ("accent-dark", "surface", False, 1.0, "CBR:260 amount"),
    ("muted", "surface", False, 1.0, "CBR:261 frequency"),
    ("muted", "surface", False, 1.0, "CBR:280 explanation"),
    ("ink", "surface", False, 1.0, "CBR:282 why label"),
    ("muted", "surface", False, 1.0, "CBR:283 why list"),
    ("ink", "surface", False, 1.0, "CBR:286 how long label"),
    ("muted", "surface", False, 1.0, "CBR:287 how long value"),
    ("ink", "surface", False, 1.0, "CBR:290 what to do label"),
    ("muted", "surface", False, 1.0, "CBR:291 what to do list"),
    ("muted", "surface", False, 1.0, "CBR:269 doc checklist"),
    ("muted", "surface", False, 1.0, "CBR:271 optional label"),
    ("muted", "surface", False, 1.0, "CBR:272 doc notes"),
    ("ink", "surface", False, 1.0, "CBR:301 quote attribution"),
    ("ink", "surface", False, 1.0, "CBR:151 FAQ question"),
    ("muted", "surface", False, 1.0, "CBR:153 FAQ chevron"),
    ("muted", "surface", False, 1.0, "CBR:157 FAQ answer"),
    ("muted", "surface", False, 1.0, "CBR:168 link desc"),
    ("accent-dark", "surface", False, 1.0, "CBR:167 link title hover"),
    ("accent-dark", "surface", False, 1.0, "CBR:181 source link"),
    ("muted", "surface", False, 1.0, "CBR:184 accessed date"),
    ("accent-foreground", "gold", False, 1.0, "CBR:208 process number"),
    ("ink", "surface", False, 1.0, "CBR:214 process label"),
    ("muted", "surface", False, 1.0, "CBR:215 process desc"),
    # ArticleLayout callout boxes
    ("ink", "trading-down/10", False, 1.0, "AL:172 warning callout"),
    ("ink", "gold/10", False, 1.0, "AL:176 success callout"),
    ("ink", "trading-down/10", False, 1.0, "AL:180 danger callout"),
    ("muted", "surface", False, 1.0, "AL:191 callout icon bg"),
    ("ink", "surface", False, 1.0, "AL:196 callout title"),
    ("body", "surface", False, 1.0, "AL:200 callout body"),
    # DownloadCentre modal
    ("muted", "surface", False, 1.0, "DC:130 modal label"),
    ("muted", "surface", False, 1.0, "DC:133 input label"),
    ("muted", "surface", False, 1.0, "DC:143 input label 2"),
    # OfficeFinder
    ("muted", "surface", False, 1.0, "OF:72 office text"),
    ("muted", "surface", False, 1.0, "OF:94 services label"),
    ("muted", "canvas", False, 1.0, "OF:99 service tag"),
    ("muted", "surface", False, 1.0, "OF:108 landmark/access"),
    ("muted", "surface", False, 1.0, "OF:110 landmark label"),
    ("muted", "surface", False, 1.0, "OF:114 access label"),
    ("muted", "canvas", False, 1.0, "OF:126 no results"),
]

def check(fg_token, bg_token, is_large, opacity, location, mode):
    colors = light if mode == "light" else dark
    bgs = light_bg if mode == "light" else dark_bg

    # Resolve fg
    if "/" in fg_token and opacity == 1.0:
        # Parse opacity from token like white/70
        parts = fg_token.split("/")
        base = parts[0]
        op = int(parts[1]) / 100.0
        fg_hex = colors.get(base, base)
        if not fg_hex.startswith("#"):
            fg_hex = colors.get(fg_hex, fg_hex)
    elif fg_token.startswith("#"):
        fg_hex = fg_token
        op = opacity
    else:
        fg_hex = colors.get(fg_token, fg_token)
        op = opacity

    # Resolve bg
    if "/" in bg_token:
        parts = bg_token.split("/")
        base = parts[0]
        bg_op = int(parts[1]) / 100.0
        bg_hex = bgs.get(base, colors.get(base, base))
        if not bg_hex.startswith("#"):
            bg_hex = bgs.get(bg_hex, bg_hex)
        # Blend bg with its opacity over white (for light) or black (for dark)
        br_, bg_, bb_ = hex_to_rgb(bg_hex)
        if mode == "light":
            blend_bg = "#ffffff"
        else:
            blend_bg = "#000000"
        blr, blg, blb = hex_to_rgb(blend_bg)
        eb_r = int(br_ * bg_op + blr * (1 - bg_op))
        eb_g = int(bg_ * bg_op + blg * (1 - bg_op))
        eb_b = int(bb_ * bg_op + blb * (1 - bg_op))
        bg_hex = f"#{eb_r:02x}{eb_g:02x}{eb_b:02x}"
    elif bg_token.startswith("#"):
        bg_hex = bg_token
    else:
        bg_hex = bgs.get(bg_token, colors.get(bg_token, bg_token))
        if not bg_hex.startswith("#"):
            bg_hex = bgs.get(bg_hex, bg_hex)

    if not fg_hex.startswith("#") or not bg_hex.startswith("#"):
        return None, None, fg_hex, bg_hex

    if fg_hex.startswith("#") and op < 1.0:
        ratio = effective_contrast_with_opacity(fg_hex, bg_hex, op)
    else:
        ratio = contrast_ratio(fg_hex, bg_hex)

    # Determine pass/fail
    if is_large:
        aa = ratio >= 3.0
        aa_normal = ratio >= 4.5
        aaa = ratio >= 4.5
    else:
        aa = ratio >= 4.5
        aa_normal = ratio >= 4.5
        aaa = ratio >= 7.0

    return ratio, aa, aa_normal, aaa, fg_hex, bg_hex

print("=" * 160)
print(f"{'FILE:LINE':<25} {'MODE':<6} {'FG HEX':<10} {'BG HEX':<10} {'RATIO':>7} {'AA':>5} {'AA-L':>6} {'AAA':>5} {'STATUS'}")
print("=" * 160)

violations = []
passes = []

for fg, bg, is_large, op, loc in combos:
    for mode in ["light", "dark"]:
        result = check(fg, bg, is_large, op, loc, mode)
        ratio, aa, aa_normal, aaa, fg_hex, bg_hex = result
        if ratio is None:
            continue

        status = "PASS"
        issues = []
        if not aa:
            status = "FAIL AA"
            issues.append("AA")
        if is_large and not aa_normal:
            issues.append("AA-normal")
        if not aaa:
            if status == "PASS":
                status = "FAIL AAA"
            issues.append("AAA")

        status_str = f"{'FAIL ' + ','.join(issues) if issues else 'PASS'}"

        if ratio < 7.0:
            violations.append((loc, mode, fg_hex, bg_hex, ratio, aa, aa_normal, aaa, fg, bg, is_large, op))

        marker = " ***" if not aa else (" **" if not aaa else "")
        print(f"{loc:<25} {mode:<6} {fg_hex:<10} {bg_hex:<10} {ratio:>6.2f}:1 {'Y' if aa else 'N':>4} {'Y' if (not is_large and ratio>=3.0) or (is_large and aa) else 'N':>5} {'Y' if aaa else 'N':>4} {status_str}{marker}")

print("\n" + "=" * 160)
print("VIOLATIONS SUMMARY (ratio < 7:1)")
print("=" * 160)
print(f"{'LOC':<30} {'MODE':<6} {'FG':<10} {'BG':<10} {'RATIO':>7} {'AA?':>5} {'AAA?':>5}")
print("-" * 80)
for loc, mode, fg, bg, ratio, aa, aa_n, aaa, fg_t, bg_t, large, op in sorted(violations, key=lambda x: x[4]):
    print(f"{loc:<30} {mode:<6} {fg:<10} {bg:<10} {ratio:>6.2f}:1 {'Y' if aa else 'N':>4} {'Y' if aaa else 'N':>4}")

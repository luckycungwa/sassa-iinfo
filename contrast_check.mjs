function hexToRgb(hex) {
  hex = hex.replace('#', '');
  return [parseInt(hex.slice(0,2),16), parseInt(hex.slice(2,4),16), parseInt(hex.slice(4,6),16)];
}

function relativeLuminance(r, g, b) {
  const [rs, gs, bs] = [r/255, g/255, b/255];
  const rl = rs <= 0.04045 ? rs/12.92 : Math.pow((rs+0.055)/1.055, 2.4);
  const gl = gs <= 0.04045 ? gs/12.92 : Math.pow((gs+0.055)/1.055, 2.4);
  const bl = bs <= 0.04045 ? bs/12.92 : Math.pow((bs+0.055)/1.055, 2.4);
  return 0.2126*rl + 0.7152*gl + 0.0722*bl;
}

function contrastRatio(fg, bg) {
  const [fr,fgg,fb] = hexToRgb(fg);
  const [br,bg2,bb] = hexToRgb(bg);
  const l1 = relativeLuminance(fr,fgg,fb);
  const l2 = relativeLuminance(br,bg2,bb);
  const lighter = Math.max(l1,l2);
  const darker = Math.min(l1,l2);
  return (lighter+0.05)/(darker+0.05);
}

function blendOver(fgHex, bgHex, fgOpacity) {
  const [fr,fg,fb] = hexToRgb(fgHex);
  const [br,bg,bb] = hexToRgb(bgHex);
  const er = Math.round(fr*fgOpacity + br*(1-fgOpacity));
  const eg = Math.round(fg*fgOpacity + bg*(1-fgOpacity));
  const eb = Math.round(fb*fgOpacity + bb*(1-fgOpacity));
  return `#${er.toString(16).padStart(2,'0')}${eg.toString(16).padStart(2,'0')}${eb.toString(16).padStart(2,'0')}`;
}

const lightFg = {
  foreground:"#312f27",ink:"#312f27",body:"#312f27",carbon:"#312f27",
  muted:"#6b6960",ash:"#6b6960","muted-foreground":"#6b6960",
  white:"#ffffff",violet:"#7700ff",accent:"#ffc500",yellow:"#ffc500",
  "accent-dark":"#a16207","yellow-dark":"#a16207","accent-foreground":"#312f27",
  "primary-foreground":"#ffffff",purple:"#7c3aed","purple-600":"#9333ea",
  red:"#ef4444","red-400":"#f87171",
};
const lightBg = {
  background:"#fafafa",card:"#f5f4f0",surface:"#ffffff",
  paper:"#f5f4f0",fog:"#e8e7e2",slate:"#4a5058",
  midnight:"#131316",yellow:"#ffc500",violet:"#7700ff",
  ink:"#312f27",carbon:"#312f27",canvas:"#fafafa",
  gold:"#ffc500",amber:"#ffc500","accent-light":"#fef3c7",
  "surface-dim":"#f0efe9","surface-container":"#e0ded8",
  "border-surface-container":"#e0ded8","muted":"#e8e7e2",
  "trading-down":"#ef4444","info":"#3b82f6",
};

const darkFg = {
  foreground:"#e8e4d9",ink:"#e8e4d9",body:"#e8e4d9",carbon:"#e8e4d9",
  muted:"#a6a398",ash:"#a6a398","muted-foreground":"#a39f96",
  white:"#ffffff",violet:"#9b4dff",accent:"#d4a017",yellow:"#d4a017",
  "accent-dark":"#eec13f","yellow-dark":"#eec13f","accent-foreground":"#e8e4d9",
  "primary-foreground":"#ffffff",purple:"#a78bfa","purple-600":"#a78bfa",
  red:"#f87171","red-400":"#f87171",amber:"#d4a017",
};
const darkBg = {
  background:"#131316",card:"#262629",surface:"#1e1e22",
  paper:"#262629",fog:"#1f1f22",slate:"#2a2a2e",
  midnight:"#131316",yellow:"#d4a017",violet:"#9b4dff",
  ink:"#e8e4d9",carbon:"#e8e4d9",canvas:"#131316",
  gold:"#d4a017",amber:"#d4a017","accent-light":"#3d3200",
  "surface-dim":"#1a1a1e","surface-container":"#2a2a2e",
  "border-surface-container":"#2a2a2e","muted":"#1f1f22",
  "trading-down":"#ef4444","info":"#60a5fa",
};

// Each entry: [fgToken, bgToken, isLargeText, opacity, location]
const combos = [
  ["accent-dark","canvas",false,1,"CBR:37 link"],
  ["muted","surface",false,1,"CBR:70 paragraph"],
  ["muted","surface",false,1,"CBR:76 list"],
  ["muted","surface",false,1,"CBR:89 caption"],
  ["muted","surface",false,1,"CBR:101 table cell"],
  ["ink","surface",false,1,"CBR:93 table header"],
  ["muted","surface",false,1,"CBR:176 sources"],
  ["accent-dark","surface",false,1,"CBR:167 link"],
  ["ink","surface",false,1,"CBR:124 callout"],
  ["ink","surface",false,1,"CBR:358 Official"],
  ["muted","surface",false,1,"CBR:359 Official desc"],
  ["accent-foreground","gold",false,1,"CBR:365 SRD btn"],
  ["ink","surface",false,1,"CBR:369 Appeal btn"],
  ["muted","paper",false,1,"CBR:175 sources bg"],

  ["ink","surface",false,1,"AL:53 h3"],
  ["muted","surface",false,1,"AL:65 h4"],
  ["ink","surface",false,1,"AL:77 h2"],
  ["body","surface",false,1,"AL:90 paragraph"],
  ["muted","surface",false,1,"AL:135 tbl head"],
  ["ink","surface",false,1,"AL:148 tbl cell"],
  ["muted","surface",false,1,"AL:158 tbl caption"],

  ["white","midnight",false,1,"GCB:20 all text"],
  ["white","midnight",true,1,"GCB:30 desc"],
  ["white","midnight",true,1,"GCB:57 desc"],
  ["accent-foreground","yellow",false,1,"GCB:37 CTA"],
  ["black","red-600",false,1,"GCB:50 badge"],
  ["white","red-600",false,1,"GCB:50 badge txt"],
  ["black","yellow",false,1,"GCB:23 after dead"],

  ["ash","paper",true,1,"TN:77 theme toggle"],
  ["violet","paper",false,1,"TN:211 active nav"],
  ["ash","paper",false,1,"TN:213 nav items"],
  ["ash","paper",true,1,"TN:241 dropdown desc"],
  ["white","violet",false,1,"TN:264 Browse"],
  ["ash","paper",true,1,"TN:274 hamburger"],
  ["carbon","paper",false,1,"TN:290 mobile title"],
  ["ash","paper",true,1,"TN:294 close btn"],
  ["ash","paper",true,1,"TN:336 mobile desc"],

  ["ink","midnight",false,1,"PC:65 hero text"],
  ["white","midnight",true,1,"PC:74 hero desc"],
  ["accent-dark","accent-light",false,1,"PC:68 badge"],
  ["black","accent",false,1,"PC:86 download"],
  ["ink","surface",false,1,"PC:111 month hdr"],
  ["muted","surface",false,1,"PC:113 next cycle"],
  ["muted","surface",false,1,"PC:206 tbl hdr"],

  ["muted","canvas",false,1,"SD:51 search btn"],
  ["muted","surface",false,1,"SD:63 search icon"],
  ["ink","surface",false,1,"SD:74 input txt"],
  ["muted","surface",false,1,"SD:77 close btn"],
  ["muted","surface",false,1,"SD:91 category"],
  ["ink","surface",false,1,"SD:94 result title"],
  ["muted","surface",false,1,"SD:95 result desc"],

  ["ash","fog",false,1,"LS:22 select txt"],

  ["ink","surface-dim",false,1,"HS:33 title"],
  ["muted","surface-dim",false,1,"HS:36 desc"],
  ["muted","surface-dim",false,1,"HS:39 meta"],
  ["accent-foreground","gold",false,1,"HS:58 CTA"],
  ["ink","surface",false,1,"HS:66 secondary"],

  ["ink","surface",false,1,"SS:11 title"],
  ["accent-dark","surface",false,1,"SS:19 link"],
  ["muted","surface",false,1,"SS:14 source"],

  ["accent-dark","surface",false,1,"TOC:63 icon"],
  ["ink","surface",false,1,"TOC:64 label"],
  ["accent-dark","gold",false,1,"TOC:85 active"],
  ["muted","surface",false,1,"TOC:86 inactive"],

  ["accent-foreground","gold",false,1,"BY:16 avatar"],
  ["ink","surface",false,1,"BY:21 author"],
  ["muted","surface",false,1,"BY:24 role"],
  ["muted-foreground","surface",false,1,"BY:32 badge"],

  ["muted","canvas",false,1,"AU:43 label"],

  ["ink","amber",false,1,"AC:18 title"],
  ["muted","amber",false,1,"AC:19 desc"],
  ["ink","surface",false,1,"AC:61 title"],
  ["muted","surface",false,1,"AC:64 desc"],
  ["muted","surface",false,1,"AC:81 steps"],
  ["muted","surface",false,1,"AC:97 timeline"],

  ["muted","surface",false,1,"IT:57 inactive"],

  ["ink","accent-dark",false,1,"EC:15 side panel"],
  ["ink","accent-dark",false,1,"EC:18 side desc"],
  ["black","accent",false,1,"EC:23 side btn"],
  ["muted","surface",false,1,"EC:63 desc"],
  ["ink","canvas",false,1,"EC:81 checklist"],
  ["ink","surface",false,1,"EC:96 grant name"],
  ["muted","surface",false,1,"EC:97 grant desc"],
  ["accent-dark","surface",false,1,"EC:99 grant amt"],
  ["muted","surface",false,1,"EC:110 steps"],

  ["ink","accent",false,1,"GL:32 selected"],
  ["ink","surface",false,1,"GL:51 title"],
  ["muted","surface",false,1,"GL:59 overview"],
  ["muted","surface",false,1,"GL:72 eligibility"],
  ["ink","canvas",false,1,"GL:101 how-to"],
  ["muted","canvas",false,1,"GL:105 steps"],
  ["ink","amber",false,1,"GL:115 appeal"],
  ["muted","surface",false,1,"GL:145 FAQ"],

  ["ink","accent",false,1,"PH:27 selected"],
  ["ink","surface",false,1,"PH:44 title"],
  ["muted","surface",false,1,"PH:47 capital"],
  ["ink","canvas",false,1,"PH:59 address"],
  ["accent-dark","canvas",false,1,"PH:63 phone"],
  ["muted","surface",false,1,"PH:71 collection"],

  ["ink","accent",false,1,"DC:36 selected"],
  ["ink","surface",false,1,"DC:53 title"],
  ["muted","surface",false,1,"DC:56 ref"],
  ["muted","canvas",false,1,"DC:68 purpose hdr"],
  ["muted","surface",false,1,"DC:69 purpose txt"],
  ["ink","surface",false,1,"DC:76 how-to hdr"],
  ["muted","surface",false,1,"DC:80 steps"],
  ["ink","canvas",false,1,"DC:94 attach hdr"],
  ["muted","canvas",false,1,"DC:98 attachments"],
  ["muted","surface",false,1,"DC:168 dept"],

  ["ink","accent",false,1,"SMC:68 selected"],
  ["ink","surface",false,1,"SMC:109 title"],
  ["ink","surface",false,1,"SMC:113 desc"],
  ["muted","surface",false,1,"SMC:121 meaning"],
  ["ink","canvas",false,1,"SMC:129 why"],
  ["muted","canvas",false,1,"SMC:130 causes"],
  ["muted","surface",false,1,"SMC:141 duration"],
  ["muted","surface",false,1,"SMC:150 actions"],

  ["ink","surface",false,1,"GH:187 title"],
  ["muted","surface",false,1,"GH:190 desc"],
  ["ink","canvas",false,1,"GH:296 code bg"],
  ["amber","ink",false,1,"GH:296 code txt"],
  ["muted","surface",false,1,"GH:317 block desc"],
  ["muted","canvas",false,1,"GH:413 tbl hdr"],
  ["ink","canvas",false,1,"GH:420 tbl row"],
  ["gold","ink",false,1,"GH:551 JSON editor"],
  ["muted","ink",false,1,"GH:553 JSON label"],
  ["black","accent-dark",false,1,"GH:563 validate"],
  ["ink","surface",false,1,"GH:898 card title"],
  ["muted","surface",false,1,"GH:899 card desc"],
  ["muted-foreground","surface",false,1,"GH:901 card meta"],
  ["accent-dark","surface",false,1,"GH:902 card value"],
  ["purple-600","canvas",false,1,"GH:924 non-compl"],
  ["muted-foreground","canvas",false,1,"GH:922 non-compl"],

  ["white","slate",true,1,"HP:63 subtitle"],
  ["white","slate",false,1,"HP:64 h1"],
  ["white","slate",true,1,"HP:67 desc"],
  ["white","violet",false,1,"HP:73 Browse"],
  ["white","slate",false,1,"HP:79 status"],
  ["carbon","yellow",false,1,"HP:105 h2"],
  ["body","yellow",false,1,"HP:108 desc"],
  ["carbon","yellow",true,1,"HP:111 stats"],
  ["carbon","paper",false,1,"HP:133 grant name"],
  ["ash","paper",false,1,"HP:134 grant desc"],
  ["carbon","paper",false,1,"HP:136 amount"],
  ["ash","paper",false,1,"HP:137 /month"],
  ["muted","yellow",false,1,"HP:166 task desc"],
  ["white","violet",false,1,"HP:145 View grants"],
  ["violet","paper",false,1,"HP:254 How it works"],
  ["body","paper",false,1,"HP:256 body"],
  ["violet","paper",false,1,"HP:272 Why label"],
  ["body","paper",false,1,"HP:273 author"],
  ["white","slate",false,1,"HP:306 footer"],
  ["accent","slate",false,1,"HP:309 link"],
  ["white","slate",false,1,"HP:93 sep"],

  ["muted-foreground","yellow",false,1,"About:38 subtitle"],
  ["body","yellow",false,1,"About:42 desc"],
  ["body","paper",false,1,"About:53 body"],
  ["body","paper",false,1,"About:76 desc"],
  ["ash","fog",false,1,"About:90 author"],
  ["white","slate",true,1,"About:105 footer"],
  ["white","slate",true,1,"About:106 footer sub"],

  ["muted-foreground","yellow",false,1,"LC:33 subtitle"],
  ["body","yellow",false,1,"LC:37 desc"],
  ["body","paper",false,1,"LC:48 body"],
  ["body","paper",false,1,"LC:76 desc"],
  ["white","slate",true,1,"LC:101 footer"],
  ["white","slate",true,1,"LC:102 footer sub"],

  ["muted-foreground","yellow",false,1,"AppH:32 subtitle"],
  ["body","yellow",false,1,"AppH:36 desc"],
  ["white","slate",true,1,"AppH:204 footer"],
  ["yellow","slate",false,1,"AppH:208 icon"],
  ["white","slate",true,1,"AppH:211 footer sub"],

  ["muted","slate",false,1,"Bank:38 subtitle"],
  ["body","slate",false,1,"Bank:42 desc"],
  ["white","slate",true,1,"Bank:157 footer"],
  ["white","slate",true,1,"Bank:162 footer sub"],

  ["muted-foreground","yellow",false,1,"Con:29 subtitle"],
  ["body","yellow",false,1,"Con:33 desc"],
  ["white","slate",false,1,"Con:93 sep"],

  ["muted","slate",false,1,"DL:35 subtitle"],
  ["body","slate",false,1,"DL:39 desc"],
  ["white","slate",true,1,"DL:130 footer"],
  ["white","slate",true,1,"DL:135 footer sub"],

  ["muted-foreground","yellow",false,1,"Elig:50 subtitle"],
  ["body","yellow",false,1,"Elig:54 desc"],
  ["white","slate",true,1,"Elig:176 footer"],
  ["white","slate",true,1,"Elig:181 footer sub"],

  ["muted-foreground","yellow",false,1,"Guides:38 subtitle"],
  ["body","yellow",false,1,"Guides:42 desc"],
  ["white","slate",true,1,"Guides:150 footer"],
  ["white","slate",true,1,"Guides:155 footer sub"],

  ["muted-foreground","yellow",false,1,"Off:38 subtitle"],
  ["body","yellow",false,1,"Off:42 desc"],
  ["ash","fog",false,1,"Off:104 services"],
  ["white","slate",true,1,"Off:141 footer"],
  ["white","slate",true,1,"Off:146 footer sub"],

  ["muted","slate",false,1,"PD:48 subtitle"],
  ["body","slate",false,1,"PD:52 desc"],
  ["white","slate",true,1,"PD:168 footer"],

  ["muted-foreground","yellow",false,1,"Prov:36 subtitle"],
  ["body","yellow",false,1,"Prov:40 desc"],
  ["white","slate",true,1,"Prov:128 footer"],
  ["white","slate",true,1,"Prov:133 footer sub"],

  ["muted","slate",false,1,"Stat:34 subtitle"],
  ["body","slate",false,1,"Stat:38 desc"],
  ["white","slate",true,1,"Stat:191 footer"],
  ["white","slate",true,1,"Stat:196 footer sub"],

  ["muted-foreground","yellow",false,1,"News:37 subtitle"],
  ["body","yellow",false,1,"News:41 desc"],
  ["white","slate",true,1,"News:95 footer"],

  ["muted","surface",false,1,"NS:77 meta"],
  ["ink","surface",false,1,"NS:85 title"],
  ["muted","surface",false,1,"NS:86 summary"],
  ["muted","surface",false,1,"NS:91 content"],
  ["muted","surface",false,1,"NS:97 tags"],
  ["muted","gold",false,1,"NS:102 disclaimer"],

  ["muted-foreground","yellow",false,1,"Tools:17 subtitle"],
  ["body","yellow",false,1,"Tools:21 desc"],
  ["body","fog",false,1,"Tools:29 intro"],
  ["white","slate",true,1,"Tools:78 footer"],

  ["ink","surface",false,1,"FAQ:33 title"],
  ["muted","surface",false,1,"FAQ:34 subtitle"],
  ["ink","surface",false,1,"FAQ:42 filter"],
  ["ink","surface",false,1,"FAQ:51 cat title"],
  ["ink","surface",false,1,"FAQ:55 question"],
  ["muted","surface",false,1,"FAQ:61 answer"],

  ["ink","surface",false,1,"EP:52 title"],
  ["muted","surface",false,1,"EP:53 subtitle"],
  ["ink","surface",false,1,"EP:75 principle"],
  ["muted","surface",false,1,"EP:77 principle desc"],
  ["accent-dark","gold",false,1,"EP:84 correction"],
  ["muted","gold",false,1,"EP:85 correction txt"],

  ["carbon","paper",false,1,"Footer:182 text"],
  ["muted-foreground","paper",false,1,"Footer:185 verified"],
  ["carbon","paper",false,1,"Footer:188 section"],
  ["muted-foreground","paper",false,1,"Footer:190 links"],
  ["muted-foreground","paper",false,1,"Footer:238 copyright"],

  ["ink","canvas",false,1,"NF:13 404"],
  ["muted","canvas",false,1,"NF:14 desc"],
  ["black","accent",false,1,"NF:19 button"],

  ["white","#25D366",false,1,"WA:14 icon"],

  ["ink","surface",false,1,"AL:279 cal icon"],
  ["muted","surface",false,1,"AL:284 cycle"],
  ["muted","surface",false,1,"AL:297 category"],
  ["ink","surface",false,1,"AL:300 cat name"],
  ["muted","surface",false,1,"AL:306 date"],
  ["ink","surface",false,1,"AL:307 date val"],
  ["muted","surface",false,1,"AL:310 payout"],
  ["accent-dark","surface",false,1,"AL:311 payout val"],
  ["muted","surface",false,1,"AL:330 office"],
  ["ink","surface",false,1,"AL:333 branch"],
  ["muted","surface",false,1,"AL:334 province"],
  ["muted","surface",false,1,"AL:340 address"],
  ["muted","surface",false,1,"AL:344 phone"],
  ["muted","surface",false,1,"AL:348 hours"],
  ["ink","surface",false,1,"AL:355 access"],
  ["muted","surface",false,1,"AL:361 access notes"],
  ["muted","surface",false,1,"AL:399 extension"],

  ["muted","surface",false,1,"CBR:135 step num"],
  ["ink","surface",false,1,"CBR:139 step title"],
  ["muted","surface",false,1,"CBR:140 step desc"],
  ["ink","surface",false,1,"CBR:195 stat val"],
  ["ink","surface",false,1,"CBR:196 stat label"],
  ["muted","surface",false,1,"CBR:197 stat desc"],
  ["accent-dark","surface",false,1,"CBR:260 amount"],
  ["muted","surface",false,1,"CBR:261 freq"],
  ["accent-dark","canvas",false,1,"CBR:167 link title"],
  ["muted","canvas",false,1,"CBR:168 link desc"],
  ["accent-dark","paper",false,1,"CBR:89 caption"],
  ["accent-dark","surface",false,1,"CBR:181 source link"],
  ["muted","surface",false,1,"CBR:184 accessed"],
  ["accent-foreground","gold",false,1,"CBR:208 process num"],
  ["ink","surface",false,1,"CBR:214 process label"],
  ["muted","surface",false,1,"CBR:215 process desc"],
  ["ink","surface",false,1,"CBR:151 FAQ q"],
  ["muted","surface",false,1,"CBR:157 FAQ a"],
  ["muted","surface",false,1,"CBR:269 doc list"],
  ["muted","surface",false,1,"CBR:271 optional"],
  ["muted","surface",false,1,"CBR:272 doc notes"],
  ["ink","surface",false,1,"CBR:301 attribution"],
  ["muted","surface",false,1,"CBR:225 tbl caption"],
  ["ink","surface",false,1,"CBR:229 comparison"],
  ["muted","surface",false,1,"CBR:237 comp cell"],
  ["ink","surface",false,1,"CBR:248 info title"],
  ["muted","surface",false,1,"CBR:249 info text"],
  ["ink","surface",false,1,"CBR:256 target label"],
  ["muted","surface",false,1,"CBR:257 target val"],

  ["muted","surface",false,1,"DC:130 modal label"],
  ["muted","surface",false,1,"DC:133 input label"],
  ["muted","surface",false,1,"DC:143 input label2"],

  ["muted","surface",false,1,"OF:72 office"],
  ["muted","surface",false,1,"OF:94 services"],
  ["muted","canvas",false,1,"OF:99 service tag"],
  ["muted","surface",false,1,"OF:108 landmark"],
  ["muted","surface",false,1,"OF:110 lm label"],
  ["muted","surface",false,1,"OF:114 access label"],
  ["muted","canvas",false,1,"OF:126 no results"],

  ["muted","gold",false,1,"NewsSlug:102 disclaimer"],

  // BADGES / BUTTONS / CHIPS
  ["ink","accent",true,1,"badge-primary light"],
  ["white","accent",true,1,"badge-primary dark"],
  ["muted-foreground","surface",false,1,"badge-secondary light"],
  ["muted-foreground","surface",false,1,"badge-outline light"],

  // Focus ring checks (fg = focus ring color, bg = same surface)
  ["accent-dark","surface",true,1,"focus ring tab"],
  ["accent-dark","surface",true,1,"focus ring CTA"],

  // Disabled / opacity combos
  ["ink","surface",false,0.5,"disabled text ink/50"],
  ["muted","surface",false,0.5,"disabled muted/50"],
  ["white","midnight",false,0.7,"white/70 midnight"],
  ["white","slate",false,0.7,"white/70 slate"],
  ["white","slate",false,0.8,"white/80 slate"],
  ["white","slate",false,0.3,"white/30 slate"],
  ["carbon","yellow",true,0.6,"carbon/60 yellow"],

  // Page-level hero on violet bg
  ["muted","slate",false,1,"page subtitle slate"],
  ["body","slate",false,1,"page desc slate"],
  ["muted-foreground","yellow",false,1,"page subtitle yellow"],
  ["body","yellow",false,1,"page desc yellow"],

  // GovernanceHub code
  ["gold","ink",false,1,"GH:551 gold on ink"],
  ["muted","ink",false,1,"GH:553 muted on ink"],
  ["amber","ink",false,1,"GH:296 amber on ink"],

  // Eligibility side panel
  ["ink","accent-dark",false,1,"EC:15 ink on acc-dk"],
  ["ink","accent-dark",false,1,"EC:18 ink on acc-dk"],

  // InteractiveTools tabs
  ["accent-dark","surface",true,1,"IT:56 active tab"],
  ["muted","surface",false,1,"IT:57 inactive tab"],

  // News/Articles tags
  ["ash","paper",false,1,"News:65 tag"],
  ["ash","paper",true,1,"news tag lg"],

  // Contact yellow hero
  ["muted-foreground","yellow",false,1,"Con subtitle"],
  ["body","yellow",false,1,"Con desc"],

  // CBR table cell on surface
  ["ink","surface",false,1,"CBR tbl cell"],
  ["ink","surface",true,1,"CBR tbl cell lg"],
];

const results = [];

for (const [fg, bg, isLarge, op, loc] of combos) {
  for (const mode of ["light", "dark"]) {
    const fgColors = mode === "light" ? lightFg : darkFg;
    const bgColors = mode === "light" ? lightBg : darkBg;

    let fgHex, fgOp = 1, bgHex, bgOp = 1;

    // Parse fg
    if (fg.startsWith("#")) {
      fgHex = fg;
      fgOp = op;
    } else {
      fgHex = fgColors[fg] || fg;
      fgOp = op;
    }

    // Parse bg
    if (bg.startsWith("#")) {
      bgHex = bg;
    } else {
      bgHex = bgColors[bg] || bg;
    }

    if (!fgHex.startsWith("#") || !bgHex.startsWith("#")) continue;
    if (fgHex.length < 7 || bgHex.length < 7) continue;

    let ratio;
    if (fgOp < 1.0) {
      const effective = blendOver(fgHex, bgHex, fgOp);
      ratio = contrastRatio(effective, bgHex);
    } else {
      ratio = contrastRatio(fgHex, bgHex);
    }

    const aa = ratio >= 4.5;
    const aaLarge = ratio >= 3.0;
    const aaa = ratio >= 7.0;

    const pass = isLarge ? aaLarge : aa;
    results.push({ loc, mode, fgHex, bgHex, ratio, aa, aaLarge, aaa, pass, fg, bg, isLarge, fgOp });
  }
}

// Sort by ratio ascending
results.sort((a, b) => a.ratio - b.ratio);

// Print violations only (failures)
console.log("=".repeat(150));
console.log("WCAG COLOR CONTRAST AUDIT - ALL FAILURES");
console.log("Light mode: fg=#312f27/#6b6960, bg=#fafafa/#ffffff/#f5f4f0/#e8e7e2/#4a5058/#ffc500/#7700ff/#131316");
console.log("Dark mode:  fg=#e8e4d9/#a6a398, bg=#131316/#1e1e22/#262629/#1f1f22/#2a2a2e/#d4a017/#9b4dff");
console.log("=".repeat(150));
console.log(`${"Location".padEnd(32)} ${"Mode".padEnd(6)} ${"FG".padEnd(10)} ${"BG".padEnd(10)} ${"Ratio".padEnd(9)} ${"Large?".padEnd(7)} ${"AA".padEnd(4)} ${"AA-L".padEnd(5)} ${"AAA".padEnd(4)} Status`);
console.log("-".repeat(150));

let failCount = 0;
let passCount = 0;

for (const r of results) {
  const status = r.pass ? (r.aaa ? "PASS AAA" : "PASS AA") : "FAIL";
  if (!r.pass) failCount++;
  else passCount++;

  const marker = !r.pass ? " <<< FAIL" : "";
  console.log(`${r.loc.padEnd(32)} ${r.mode.padEnd(6)} ${r.fgHex.padEnd(10)} ${r.bgHex.padEnd(10)} ${(r.ratio.toFixed(2)+":1").padEnd(9)} ${(r.isLarge?"Y":"N").padEnd(7)} ${("Y/N"[r.aa?0:1]).padEnd(4)} ${("Y/N"[r.aaLarge?0:1]).padEnd(5)} ${("Y/N"[r.aaa?0:1]).padEnd(4)} ${status}${marker}`);
}

console.log("\n" + "=".repeat(150));
console.log(`SUMMARY: ${failCount} failures, ${passCount} passes out of ${results.length} total checks`);
console.log("=".repeat(150));

// Group failures by severity
const critical = results.filter(r => !r.pass && r.ratio < 3.0);
const major = results.filter(r => !r.pass && r.ratio >= 3.0 && r.ratio < 4.5);
const warning = results.filter(r => !r.pass && r.ratio >= 4.5);

console.log(`\nCRITICAL (ratio < 3.0): ${critical.length} items`);
for (const r of critical) {
  console.log(`  ${r.loc} [${r.mode}] ${r.fgHex} on ${r.bgHex} = ${r.ratio.toFixed(2)}:1 ${r.fg} on ${r.bg}`);
}

console.log(`\nMAJOR (ratio 3.0-4.49): ${major.length} items`);
for (const r of major) {
  console.log(`  ${r.loc} [${r.mode}] ${r.fgHex} on ${r.bgHex} = ${r.ratio.toFixed(2)}:1 ${r.fg} on ${r.bg}`);
}

console.log(`\nWARNING (ratio 4.5-6.99, passes AA but fails AAA): ${warning.length} items`);
for (const r of warning) {
  console.log(`  ${r.loc} [${r.mode}] ${r.fgHex} on ${r.bgHex} = ${r.ratio.toFixed(2)}:1 ${r.fg} on ${r.bg}`);
}

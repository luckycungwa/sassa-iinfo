export interface ProvinceHub {
  id: string;
  slug: string;
  name: string;
  capital: string;
  regionalOfficeAddress: string;
  regionalOfficePhone: string;
  collectionInfo: string;
  faqs: { question: string; answer: string }[];
}

export const provinces: ProvinceHub[] = [
  {
    id: "gauteng",
    slug: "gauteng",
    name: "Gauteng",
    capital: "Johannesburg",
    regionalOfficeAddress: "28 Harrison Street, Marshalltown, Johannesburg, 2000",
    regionalOfficePhone: "011 240 5300",
    collectionInfo: "Gauteng beneficiaries can collect their cash payments at any major retailer, including Boxer, Pick n Pay, Shoprite, Checkers, and Usave, as well as selected post office hubs or direct bank transfers. With the highest population density, Gauteng SASSA offices see the longest queues — arrive early (before 7:00 AM) to avoid peak-hour waits.",
    faqs: [
      {
        question: "Where is the largest SASSA office in Johannesburg?",
        answer: "The regional office on Harrison Street is the largest, but local offices like Soweto, Maponya Mall, and Pretoria Central handle the majority of daily applications."
      },
      {
        question: "Which Gauteng SASSA office has the shortest queues?",
        answer: "Offices in smaller towns like Vereeniging, Krugersdorp, and Heidelberg typically have shorter wait times than Johannesburg and Pretoria central offices."
      },
      {
        question: "Can I apply for an SRD grant at a Gauteng SASSA office?",
        answer: "No, SRD applications are fully online. Visit srd.sassa.gov.za. However, if you have SRD status issues, you can visit any Gauteng SASSA office for assistance."
      },
      {
        question: "Are there mobile SASSA pay points in Gauteng townships?",
        answer: "Yes. SASSA operates mobile pay points in Soweto, Tembisa, Katlehong, and other townships on scheduled dates. Contact the regional office for the monthly mobile schedule."
      }
    ]
  },
  {
    id: "western-cape",
    slug: "western-cape",
    name: "Western Cape",
    capital: "Cape Town",
    regionalOfficeAddress: "Golden Acre Building, Adderley Street, Cape Town, 8000",
    regionalOfficePhone: "021 469 0200",
    collectionInfo: "Western Cape payments are cleared on scheduled dates at retail merchants or direct bank EFTs. Cape Town CBD offices are busiest in the first week of each month (pay week). Beneficiaries in rural areas like Beaufort West and Knysna should use bank transfers to avoid long travel distances.",
    faqs: [
      {
        question: "Are Western Cape payment dates different?",
        answer: "No, all payment dates are synchronized nationally across South Africa."
      },
      {
        question: "Where can I collect my SASSA grant in Cape Town?",
        answer: "You can collect at any major retailer in the Cape Town metro — Shoprite, Pick n Pay, Checkers, Boxer, and Usave. The Philippi and Khayelitsha retail points serve the largest numbers of beneficiaries."
      },
      {
        question: "Is there SASSA language assistance for isiXhosa and Afrikaans speakers?",
        answer: "Yes. SASSA offices in the Western Cape have multilingual staff who can assist in English, Afrikaans, and isiXhosa. Translation assistance is available on request."
      },
      {
        question: "How do rural Western Cape beneficiaries access grants?",
        answer: "SASSA operates mobile pay points that visit rural towns like Beaufort West, Calvinia, and Ladismith on scheduled dates. Direct bank transfer is recommended for beneficiaries outside Cape Town."
      }
    ]
  },
  {
    id: "kzn",
    slug: "kwazulu-natal",
    name: "KwaZulu-Natal",
    capital: "Pietermaritzburg",
    regionalOfficeAddress: "1 Bank Street, Pietermaritzburg, 3201",
    regionalOfficePhone: "033 846 3300",
    collectionInfo: "In KZN, mobile pay points are set up in remote rural areas to ensure access where retailers are not nearby. The province has a large rural population and SASSA operates an extensive mobile network serving deep rural communities in areas like Msinga, KwaNongoma, and the South Coast.",
    faqs: [
      {
        question: "Can I apply for a grant in isiZulu?",
        answer: "Yes, SASSA staff are multilingual, and application forms can be explained in isiZulu at all branches."
      },
      {
        question: "Where is the busiest SASSA office in KZN?",
        answer: "The Durban Central office on Stalwart Simelane Street handles the highest volume. The Pietermaritzburg and Richards Bay offices are also very busy, especially in the first week of each month."
      },
      {
        question: "How do rural KZN beneficiaries access grants without a bank account?",
        answer: "SASSA operates mobile pay points that visit rural areas on scheduled days. Cash Send collection at Boxer, Shoprite, and Pick n Pay stores is also available in most towns."
      },
      {
        question: "What happens during the annual floods or unrest in KZN?",
        answer: "SASSA typically announces alternative collection arrangements during emergencies. Check the official SASSA website or call 0800 60 10 11 for updates. Mobile pay points may be rerouted or delayed."
      }
    ]
  },
  {
    id: "limpopo",
    slug: "limpopo",
    name: "Limpopo",
    capital: "Polokwane",
    regionalOfficeAddress: "48 Landros Mare Street, Polokwane, 0699",
    regionalOfficePhone: "015 291 7400",
    collectionInfo: "Limpopo has a large rural network; beneficiaries are advised to use personal bank accounts to avoid long queues at retail stores. The province spans a vast area with many remote villages, and SASSA mobile units serve communities across Vhembe, Capricorn, Mopani, and Sekhukhune districts.",
    faqs: [
      {
        question: "How do I find rural pay points in Limpopo?",
        answer: "SASSA publishes monthly schedules of community halls and mobile trucks visiting remote areas of Limpopo."
      },
      {
        question: "Which SASSA office serves the Vhembe district?",
        answer: "The Thohoyandou SASSA office serves the Vhembe district. Beneficiaries in rural Vhembe villages like Dzanani and Malamulele should check for mobile pay point schedules at their local tribal authority office."
      },
      {
        question: "Can I apply for grants in Sepedi or Tshivenda?",
        answer: "Yes. SASSA staff in Limpopo are multilingual and can assist in Sepedi, Tshivenda, Xitsonga, and other local languages."
      },
      {
        question: "Are there enough retail pay points in rural Limpopo?",
        answer: "Major retailers are concentrated in towns. Beneficiaries in deep rural areas are encouraged to use direct bank transfers or mobile pay points. Some villages have limited retail access, so plan your collection in advance."
      }
    ]
  },
  {
    id: "eastern-cape",
    slug: "eastern-cape",
    name: "Eastern Cape",
    capital: "Bhisho",
    regionalOfficeAddress: "3 Oxford Street, East London, 5201",
    regionalOfficePhone: "043 707 6400",
    collectionInfo: "Eastern Cape beneficiaries can collect payments at major retailers (Shoprite, Boxer, Pick n Pay) or via direct bank transfer. Mobile pay points serve deep rural areas around Mthatha, Lusikisiki, and Mount Frere. The province has some of the longest travel distances to SASSA offices in the country.",
    faqs: [
      {
        question: "Are there SASSA mobile offices in Eastern Cape rural areas?",
        answer: "Yes. SASSA operates mobile units that visit rural villages on scheduled days. Contact the East London regional office for the monthly mobile schedule."
      },
      {
        question: "What is the closest SASSA office to Mthatha?",
        answer: "The Mthatha SASSA local office serves the surrounding communities. For deep rural areas near Lusikisiki and Flagstaff, mobile pay points are the primary collection method."
      },
      {
        question: "Can I apply for a grant in isiXhosa?",
        answer: "Yes, all Eastern Cape SASSA offices have isiXhosa-speaking staff. Application forms can be explained in isiXhosa."
      },
      {
        question: "What is the best payment method for rural Eastern Cape beneficiaries?",
        answer: "Direct bank transfer is strongly recommended if you have access to a bank account. This avoids long travel distances to retail pay points. If you do not have a bank account, register for Cash Send collection at the nearest participating retailer."
      }
    ]
  },
  {
    id: "mpumalanga",
    slug: "mpumalanga",
    name: "Mpumalanga",
    capital: "Mbombela (Nelspruit)",
    regionalOfficeAddress: "17 Government Boulevard, Riverside Park, Mbombela, 1200",
    regionalOfficePhone: "013 754 3900",
    collectionInfo: "Mpumalanga beneficiaries receive payments at retail cash points, bank EFTs, and post office hubs. Mobile pay points service deep rural communities in Bushbuckridge and Emalahleni. The province has a mix of urban centres (Nelspruit, Witbank) and deep rural areas.",
    faqs: [
      {
        question: "Can I collect my grant at any retailer in Mpumalanga?",
        answer: "Yes. Boxer, Pick n Pay, Shoprite, Checkers, and Usave all process SASSA cash payouts across all Mpumalanga towns."
      },
      {
        question: "How do Bushbuckridge residents access SASSA services?",
        answer: "The Bushbuckridge area is served by mobile SASSA units and local retail pay points. The nearest full-service SASSA office is in Mbombela or Hazyview. Check the mobile schedule for monthly visit dates."
      },
      {
        question: "Is there a SASSA office in every Mpumalanga town?",
        answer: "No. Full-service SASSA offices are located in major towns — Mbombela, Witbank (eMalahleni), Secunda, Middelburg, and Ermelo. Smaller towns are served by mobile units."
      },
      {
        question: "Can I switch from Cash Send to bank transfer in Mpumalanga?",
        answer: "Yes. Log into the SRD portal at srd.sassa.gov.za to change your payment method anytime. For non-SRD grants, visit your nearest SASSA office."
      }
    ]
  },
  {
    id: "free-state",
    slug: "free-state",
    name: "Free State",
    capital: "Bloemfontein",
    regionalOfficeAddress: "95 St Andrew Street, Bloemfontein, 9301",
    regionalOfficePhone: "051 412 0300",
    collectionInfo: "Free State payments are primarily via direct bank transfer or retail collection at Shoprite, Boxer, and Pick n Pay. Rural pay points serve the eastern Free State farming districts. The province's smaller population means shorter queues at SASSA offices compared to Gauteng or KZN.",
    faqs: [
      {
        question: "Are Free State payment dates different from national dates?",
        answer: "No. All SASSA payment dates are nationally synchronised. Free State beneficiaries are paid on the same dates as every other province."
      },
      {
        question: "Which Free State SASSA offices are busiest?",
        answer: "The Bloemfontein and Botshabelo offices see the highest foot traffic. Offices in smaller towns like Bethlehem, Kroonstad, and Welkom have shorter wait times."
      },
      {
        question: "How do farming community beneficiaries access grants?",
        answer: "SASSA mobile pay points serve farming communities in the eastern Free State. Direct bank transfer is recommended for farm workers and rural residents."
      },
      {
        question: "Can I apply for a SASSA grant in Sesotho?",
        answer: "Yes. SASSA offices in the Free State have Sesotho-speaking staff. Application forms can be explained in Sesotho."
      }
    ]
  },
  {
    id: "north-west",
    slug: "north-west",
    name: "North West",
    capital: "Mahikeng",
    regionalOfficeAddress: "2nd Floor, Mega City Complex, Carrington Street, Mahikeng, 2745",
    regionalOfficePhone: "018 397 2600",
    collectionInfo: "North West beneficiaries can collect at Shoprite, Boxer, and Pick n Pay stores across the province. Mobile pay points serve remote platinum mining communities around Rustenburg and Brits. The province's mining towns have higher population density and longer queues on pay weeks.",
    faqs: [
      {
        question: "Where do I collect my grant in Rustenburg?",
        answer: "Rustenburg beneficiaries can collect at any Shoprite, Boxer, or Pick n Pay in the Rustenburg CBD or at the Rustenburg SASSA local office pay point."
      },
      {
        question: "How do mining community workers access grants?",
        answer: "If you work in the mines but earn below the means test threshold, you may still qualify for the Child Support Grant. SASSA offices in Rustenburg and Brits handle many mining community applications."
      },
      {
        question: "Is there a SASSA office in every North West town?",
        answer: "Full-service offices are in Mahikeng, Rustenburg, Klerksdorp, Potchefstroom, and Brits. Mobile units serve smaller towns like Vryburg, Taung, and Zeerust."
      },
      {
        question: "What languages are spoken at North West SASSA offices?",
        answer: "Staff speak English, Setswana, and Afrikaans. Application forms can be explained in Setswana at all branches."
      }
    ]
  },
  {
    id: "northern-cape",
    slug: "northern-cape",
    name: "Northern Cape",
    capital: "Kimberley",
    regionalOfficeAddress: "Old SAR Building, Market Square, Kimberley, 8300",
    regionalOfficePhone: "053 802 7300",
    collectionInfo: "Northern Cape has the smallest population but the largest geographic area. Beneficiaries in remote towns like Upington and Springbok rely on mobile pay points and retailer cash collection. Because distances between towns are vast, direct bank transfer is strongly recommended for all Northern Cape beneficiaries.",
    faqs: [
      {
        question: "How do I get my grant in a remote Northern Cape town?",
        answer: "SASSA operates mobile pay points that visit remote towns on scheduled dates. Direct bank transfer is recommended to avoid long travel distances."
      },
      {
        question: "Where is the nearest SASSA office to Upington?",
        answer: "The nearest full-service SASSA office to Upington is in Kimberley (approximately 4 hours drive). However, Upington has retail pay points at Shoprite and Pick n Pay for Cash Send collection. Mobile units also visit Upington monthly."
      },
      {
        question: "Can I apply for grants in Afrikaans in the Northern Cape?",
        answer: "Yes. Afrikaans is widely spoken in the Northern Cape, and SASSA staff can assist in Afrikaans at all branches."
      },
      {
        question: "What should I do if the mobile pay point does not visit my area?",
        answer: "Contact the Kimberley regional office at 053 802 7300 to report the missed visit. Consider switching to direct bank transfer to avoid dependency on mobile pay point schedules."
      }
    ]
  }
];

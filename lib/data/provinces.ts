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
    collectionInfo: "Gauteng beneficiaries can collect their cash payments at any major retailer, including Boxer, Pick n Pay, Shoprite, Checkers, and Usave, as well as selected post office hubs or direct bank transfers.",
    faqs: [
      {
        question: "Where is the largest SASSA office in Johannesburg?",
        answer: "The regional office on Harrison Street is the largest, but local offices like Soweto, Maponya Mall, and Pretoria Central handle the majority of daily applications."
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
    collectionInfo: "Western Cape payments are cleared on scheduled dates at retail merchants or direct bank EFTs.",
    faqs: [
      {
        question: "Are Western Cape payment dates different?",
        answer: "No, all payment dates are synchronized nationally across South Africa."
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
    collectionInfo: "In KZN, mobile pay points are set up in remote rural areas to ensure access where retailers are not nearby.",
    faqs: [
      {
        question: "Can I apply for a grant in isiZulu?",
        answer: "Yes, SASSA staff are multilingual, and application forms can be explained in isiZulu at all branches."
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
    collectionInfo: "Limpopo has a large rural network; beneficiaries are advised to use personal bank accounts to avoid long queues at retail stores.",
    faqs: [
      {
        question: "How do I find rural pay points in Limpopo?",
        answer: "SASSA publishes monthly schedules of community halls and mobile trucks visiting remote areas of Limpopo."
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
    collectionInfo: "Eastern Cape beneficiaries can collect payments at major retailers (Shoprite, Boxer, Pick n Pay) or via direct bank transfer. Mobile pay points serve deep rural areas around Mthatha, Lusikisiki, and Mount Frere.",
    faqs: [
      {
        question: "Are there SASSA mobile offices in Eastern Cape rural areas?",
        answer: "Yes. SASSA operates mobile units that visit rural villages on scheduled days. Contact the East London regional office for the monthly mobile schedule."
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
    collectionInfo: "Mpumalanga beneficiaries receive payments at retail cash points, bank EFTs, and post office hubs. Mobile pay points service deep rural communities in Bushbuckridge and Emalahleni.",
    faqs: [
      {
        question: "Can I collect my grant at any retailer in Mpumalanga?",
        answer: "Yes. Boxer, Pick n Pay, Shoprite, Checkers, and Usave all process SASSA cash payouts across all Mpumalanga towns."
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
    collectionInfo: "Free State payments are primarily via direct bank transfer or retail collection at Shoprite, Boxer, and Pick n Pay. Rural pay points serve the eastern Free State farming districts.",
    faqs: [
      {
        question: "Are Free State payment dates different from national dates?",
        answer: "No. All SASSA payment dates are nationally synchronised. Free State beneficiaries are paid on the same dates as every other province."
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
    collectionInfo: "North West beneficiaries can collect at Shoprite, Boxer, and Pick n Pay stores across the province. Mobile pay points serve remote platinum mining communities around Rustenburg and Brits.",
    faqs: [
      {
        question: "Where do I collect my grant in Rustenburg?",
        answer: "Rustenburg beneficiaries can collect at any Shoprite, Boxer, or Pick n Pay in the Rustenburg CBD or at the Rustenburg SASSA local office pay point."
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
    collectionInfo: "Northern Cape has the smallest population but the largest geographic area. Beneficiaries in remote towns like Upington and Springbok rely on mobile pay points and retailer cash collection.",
    faqs: [
      {
        question: "How do I get my grant in a remote Northern Cape town?",
        answer: "SASSA operates mobile pay points that visit remote towns on scheduled dates. Direct bank transfer is recommended to avoid long travel distances."
      }
    ]
  }
];

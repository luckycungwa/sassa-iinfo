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
  }
];

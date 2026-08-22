export interface SASSAOffice {
  id: string;
  name: string;
  province: string;
  city: string;
  address: string;
  phone: string;
  operatingHours: string;
  servicesOffered: string[];
  directions: string;
  nearbyLandmarks: string;
  accessibilityNotes: string;
  localTip?: string;
}

export const offices: SASSAOffice[] = [
  {
    id: "gp-pretoria-central",
    name: "Pretoria Central Local Office",
    province: "gauteng",
    city: "pretoria",
    address: "Fedsure Forum Building, 268 Lillian Ngoyi Street, Pretoria Central",
    phone: "012 400 2000",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Older Person Grant applications",
      "Child Support Grant applications",
      "Disability Grant medical bookings",
      "Social Relief of Distress (SRD) queries",
      "Biometric enrollment"
    ],
    directions: "Located inside the Fedsure Forum building, near the intersection of Lillian Ngoyi and Pretorius Street.",
    nearbyLandmarks: "State Theatre, Pretoria Central Police Station",
    accessibilityNotes: "Wheelchair accessible ramps at main entrance, elevator access to higher floors, accessible restrooms.",
    localTip: "Pretoria Central is one of the busiest SASSA offices in the country. Arrive by 6:30 AM to avoid queues that can exceed 3 hours during the first week of the month. The office is closest to Pretoria Station (10 min walk) and has limited parking."
  },
  {
    id: "gp-soweto-maponya",
    name: "Soweto Local Office (Maponya Mall)",
    province: "gauteng",
    city: "soweto",
    address: "Maponya Mall, Thusong Service Centre, Chris Hani Road, Soweto",
    phone: "011 983 2000",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant applications",
      "Change of bank details",
      "Social work consultations",
      "Foster Care Grant validations"
    ],
    directions: "Enter Maponya Mall, proceed to the basement Thusong Service Centre wing.",
    nearbyLandmarks: "Maponya Mall Food Court, Chris Hani Baragwanath Hospital",
    accessibilityNotes: "Fully wheelchair accessible via mall elevators, dedicated disabled parking spaces.",
    localTip: "The Thusong Centre inside Maponya Mall houses multiple government services. If SASSA queues are long, check whether the Social Development office upstairs can handle your query. The mall parking fills up by 9 AM on pay weeks."
  },
  {
    id: "wc-cape-town",
    name: "Cape Town Local Office",
    province: "western-cape",
    city: "cape-town",
    address: "48 Queen Victoria Street, Cape Town CBD",
    phone: "021 469 0200",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "State Pension registrations",
      "Disability Grant assessments",
      "Grant-in-Aid applications",
      "Reinstatement requests"
    ],
    directions: "Situated opposite the Company's Garden on Queen Victoria Street, close to Wale Street.",
    nearbyLandmarks: "The Company's Garden, St George's Cathedral",
    accessibilityNotes: "Ground floor access, tactile paving, wheelchair friendly counters.",
    localTip: "The Cape Town office is centrally located near MyCiTi bus routes. Tuesdays and Wednesdays are generally quieter than Mondays and Fridays. If you drive, use the Government Avenue parking lot (pay per hour)."
  },
  {
    id: "kzn-durban-central",
    name: "Durban Central Local Office",
    province: "kzn",
    city: "durban",
    address: "95 Stalwart Simelane Street, Durban Central",
    phone: "031 360 4200",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "SRD R370 status audits",
      "Child Support registrations",
      "Card replacements",
      "Affidavit processing"
    ],
    directions: "Located on Stalwart Simelane Street (formerly Stanger Street), near the Kingsmead Cricket Stadium.",
    nearbyLandmarks: "Kingsmead Cricket Ground, ICC Durban",
    accessibilityNotes: "Ramps at entrance, spacious waiting area with priority seating for elderly and disabled.",
    localTip: "The Durban Central office handles very high volumes. Visit mid-month (10th-20th) when queues are shorter. Avoid the first week of the month (pay week) unless urgent. Bring your own pen and photocopies."
  },
  {
    id: "lp-polokwane",
    name: "Polokwane Local Office",
    province: "limpopo",
    city: "polokwane",
    address: "20 Landros Mare Street, Polokwane",
    phone: "015 291 7400",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "All Grant registrations",
      "Means test audits",
      "Foster Care certifications",
      "Social relief vouchers"
    ],
    directions: "Situated on Landros Mare Street, between Bodenstein and Rissik Streets.",
    nearbyLandmarks: "Polokwane Museum, Library Gardens Mall",
    accessibilityNotes: "Level entrance, wheelchair friendly waiting lines, sign language interpreter available on booking.",
    localTip: "Polokwane serves as the regional hub for Limpopo. Beneficiaries from as far as Makhado and Tzaneen travel here for services. If you are from outside Polokwane, call ahead to confirm your documents are correct before making the trip."
  },
  {
    id: "ec-gqeberha",
    name: "Gqeberha (Port Elizabeth) Local Office",
    province: "eastern-cape",
    city: "gqeberha",
    address: "182 Govan Mbeki Avenue, Gqeberha",
    phone: "041 391 1600",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Older Person applications",
      "Child support grant reviews",
      "Disability applications",
      "Change of address updates"
    ],
    directions: "Located in the heart of Govan Mbeki Avenue, near Russell Road.",
    nearbyLandmarks: "Gqeberha City Hall, Russell Road College",
    accessibilityNotes: "Ground level access, wide doorways, priority queue for senior citizens.",
    localTip: "The Gqeberha office is near the CBD taxi rank. The 2nd and 3rd weeks of the month are quieter. If you need a disability grant medical assessment, book your district surgeon appointment before visiting."
  },
  {
    id: "mp-nelspruit",
    name: "Mbombela (Nelspruit) Local Office",
    province: "mpumalanga",
    city: "mbombela",
    address: "17 Government Boulevard, Riverside Park, Mbombela, 1200",
    phone: "013 754 3900",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "All grant applications",
      "SRD R370 enquiries",
      "Foster Care grant certifications",
      "Change of banking details"
    ],
    directions: "Located within the Riverside Park government complex off Government Boulevard.",
    nearbyLandmarks: "Riverside Mall, Mbombela Stadium",
    accessibilityNotes: "Wheelchair ramps at entrance, accessible parking bays, ground floor service counters.",
    localTip: "The Mbombela office is inside the Riverside Park government complex. Parking is limited — arrive early. For SRD queries, try the online portal first before making the trip. The office is less crowded outside of pay week (first week of the month)."
  },
  {
    id: "fs-bloemfontein",
    name: "Bloemfontein Local Office",
    province: "free-state",
    city: "bloemfontein",
    address: "95 St Andrew Street, Bloemfontein, 9301",
    phone: "051 412 0300",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "State Pension applications",
      "Disability Grant medical bookings",
      "Child Support Grant registrations",
      "Appeal submissions"
    ],
    directions: "Situated on St Andrew Street between Charles and Aliwal Street, opposite the Free State High Court.",
    nearbyLandmarks: "Free State High Court, Hoffman Square",
    accessibilityNotes: "Ground floor access, priority queue for pensioners, braille signage available.",
    localTip: "Bloemfontein is quieter than most metro SASSA offices. Service is typically faster here — expect 30-60 minute wait times on non-pay weeks. The office is opposite the High Court, near the Bloemfontein CBD taxi drop-off."
  },
  {
    id: "nw-mahikeng",
    name: "Mahikeng Local Office",
    province: "north-west",
    city: "mahikeng",
    address: "Mega City Complex, Carrington Street, Mahikeng, 2745",
    phone: "018 397 2600",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "All grant registrations",
      "Means test audits",
      "Social relief vouchers",
      "Card replacements"
    ],
    directions: "Enter the Mega City Complex from Carrington Street, proceed to the second floor north wing.",
    nearbyLandmarks: "Mega City Shopping Centre, Mahikeng Station",
    accessibilityNotes: "Lift access to second floor, wheelchair friendly counters, dedicated senior queue.",
    localTip: "The Mahikeng office is on the second floor of Mega City Complex. Take the lift if you have mobility issues. The office is busiest on Fridays. Mid-week visits (Tuesday-Thursday) have shorter queues. The complex has ATMs and a food court nearby."
  },
  {
    id: "nc-kimberley",
    name: "Kimberley Local Office",
    province: "northern-cape",
    city: "kimberley",
    address: "Old SAR Building, Market Square, Kimberley, 8300",
    phone: "053 802 7300",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Older Person Grant applications",
      "Disability assessments",
      "SRD R370 status checks",
      "Foster Care certifications"
    ],
    directions: "Located on Market Square in the historic Old SAR Building, opposite the Kimberley City Hall.",
    nearbyLandmarks: "Kimberley City Hall, Honoured Dead Memorial",
    accessibilityNotes: "Ground level access, wide corridors, sign language interpreter available by appointment.",
    localTip: "Kimberley serves the entire Northern Cape, so beneficiaries travel from hundreds of kilometres away. If you live outside Kimberley, call the office first at 053 802 7300 to confirm the documents you need. Consider switching to direct bank transfer to reduce how often you need to visit."
  },
  {
    id: "gp-tembisa",
    name: "Tembisa Local Office",
    province: "gauteng",
    city: "tembisa",
    address: "5789 Andrew Mapheto Drive, Tembisa, 1632",
    phone: "011 923 6000",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "eLife Certification",
      "Bank Detail Updates"
    ],
    directions: "Located on Andrew Mapheto Drive, near the Tembisa Hospital roundabout.",
    nearbyLandmarks: "Tembisa Hospital, Tembisa Plaza",
    accessibilityNotes: "Wheelchair accessible ramp at main entrance, ground floor service counters, priority queue for elderly.",
    localTip: "Arrive before 7 AM to avoid long queues, especially during pay week. The office serves a large population across Tembisa and surrounding areas."
  },
  {
    id: "gp-alexandra",
    name: "Alexandra Local Office",
    province: "gauteng",
    city: "alexandra",
    address: "12 14th Avenue, Alexandra, 2090",
    phone: "011 443 6000",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "Payment Enquiries",
      "ID Verification",
      "Social Work Services"
    ],
    directions: "Situated on 14th Avenue, off London Road in the heart of Alexandra Township.",
    nearbyLandmarks: "Alexandra Mall, Alexandra Police Station",
    accessibilityNotes: "Ground level entrance, wide corridors, priority seating for senior citizens.",
    localTip: "Mid-month visits (10th-20th) are significantly quieter than the first week. The office is walking distance from the Alexandra taxi rank."
  },
  {
    id: "gp-johannesburg-cbd",
    name: "Johannesburg CBD Local Office",
    province: "gauteng",
    city: "johannesburg",
    address: "78 De Korte Street, Braamfontein, Johannesburg, 2001",
    phone: "011 630 4000",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Appeals & Reconsiderations",
      "SRD R370 Enquiries",
      "eLife Certification",
      "Disability Assessments"
    ],
    directions: "Located on De Korte Street in Braamfontein, near the Johannesburg High Court.",
    nearbyLandmarks: "Johannesburg High Court, Constitution Hill",
    accessibilityNotes: "Elevator access to all floors, wheelchair friendly counters, braille signage throughout.",
    localTip: "This office handles a high volume of appeals and reconsiderations. Bring all supporting documents and certified copies. Use the Rea Vaya bus to avoid parking challenges."
  },
  {
    id: "gp-tshwane-north",
    name: "Tshwane North Local Office",
    province: "gauteng",
    city: "pretoria",
    address: "242 Pretorius Street, Wonderboom, Pretoria, 0182",
    phone: "012 541 8000",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "Payment Enquiries",
      "Bank Detail Updates",
      "Application Status Checks"
    ],
    directions: "Located on Pretorius Street in Wonderboom, accessible via the R101 north of Pretoria CBD.",
    nearbyLandmarks: "Wonderboom Junction, Wonderboom Nature Reserve",
    accessibilityNotes: "Wheelchair ramp at entrance, accessible parking bays, ground floor counters.",
    localTip: "This office serves the northern suburbs of Tshwane and is generally less crowded than Pretoria Central. Mid-week visits typically have shorter queues."
  },
  {
    id: "gp-sebokeng",
    name: "Sebokeng Local Office",
    province: "gauteng",
    city: "sebokeng",
    address: "1257 Moshoeshoe Street, Zone 10, Sebokeng, 1983",
    phone: "016 594 5000",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "eLife Certification",
      "Fraud Reporting"
    ],
    directions: "Located in Zone 10, Sebokeng, off the R57 highway between Vanderbijlpark and Sharpeville.",
    nearbyLandmarks: "Sebokeng Hospital, Barrage Road Taxi Rank",
    accessibilityNotes: "Ramp at main entrance, priority queue for seniors and disabled, accessible restroom.",
    localTip: "Pay week (first week of the month) is extremely busy at this office. Visit after the 15th for much faster service."
  },
  {
    id: "wc-mitchells-plain",
    name: "Mitchells Plain Local Office",
    province: "western-cape",
    city: "mitchells-plain",
    address: "Cnr AZ Berman Drive & Morgenster Road, Mitchells Plain, 7785",
    phone: "021 370 5000",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "Bank Detail Updates",
      "Social Work Services"
    ],
    directions: "Located at the Mitchells Plain Town Centre, corner of AZ Berman Drive and Morgenster Road.",
    nearbyLandmarks: "Mitchells Plain Town Centre, Mitchells Plain Hospital",
    accessibilityNotes: "Wheelchair friendly entrance, dedicated disabled parking bays, accessible counters.",
    localTip: "The office is busiest on Mondays. Visit Tuesday through Thursday for shorter queues. The town centre has ATMs and a food court."
  },
  {
    id: "wc-khayelitsha",
    name: "Khayelitsha Local Office",
    province: "western-cape",
    city: "khayelitsha",
    address: "50 Steve Biko Road, Khayelitsha, 7784",
    phone: "021 360 5300",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "Payment Enquiries",
      "eLife Certification",
      "ID Verification"
    ],
    directions: "Situated on Steve Biko Road, opposite the Khayelitsha Shopping Centre.",
    nearbyLandmarks: "Khayelitsha Shopping Centre, Khayelitsha Hospital",
    accessibilityNotes: "Ground level access, wide entrances, accessible restroom facilities.",
    localTip: "This is one of the busiest offices in the Western Cape. Arrive by 6:30 AM or visit between the 15th and 25th of the month for shorter queues."
  },
  {
    id: "wc-george",
    name: "George Local Office",
    province: "western-cape",
    city: "george",
    address: "124 York Street, George, 6529",
    phone: "044 801 4300",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Disability Assessments",
      "Appeals & Reconsiderations",
      "Application Status Checks"
    ],
    directions: "Located on York Street in George CBD, near the George Civic Centre.",
    nearbyLandmarks: "George Civic Centre, Garden Route Mall",
    accessibilityNotes: "Wheelchair ramp at entrance, ground floor counters, priority seating available.",
    localTip: "The George office serves the entire Garden Route district. If you live in surrounding towns like Mossel Bay or Knysna, call ahead to confirm documentation requirements before making the trip."
  },
  {
    id: "wc-paarl",
    name: "Paarl Local Office",
    province: "western-cape",
    city: "paarl",
    address: "30 Main Street, Paarl, 7646",
    phone: "021 870 2000",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "Bank Detail Updates"
    ],
    directions: "Situated on Main Street in Paarl CBD, near the Paarl Thusong Centre.",
    nearbyLandmarks: "Paarl Thusong Centre, Paarl Mall",
    accessibilityNotes: "Level entrance, wheelchair accessible counters, priority queue for elderly.",
    localTip: "Wednesdays are typically the quietest day at this office. It is within walking distance of the Paarl taxi rank."
  },
  {
    id: "kzn-umlazi",
    name: "uMlazi Local Office",
    province: "kzn",
    city: "umlazi",
    address: "1 Griffiths Mxenge Highway, uMlazi, 4066",
    phone: "031 907 8000",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "eLife Certification",
      "Social Work Services"
    ],
    directions: "Located along Griffiths Mxenge Highway in uMlazi township, near the Mega City Mall.",
    nearbyLandmarks: "Mega City uMlazi, Prince Mshiyeni Memorial Hospital",
    accessibilityNotes: "Ramp access at entrance, disabled parking bays, ground floor service area.",
    localTip: "uMlazi serves a very large population. Avoid the first week of the month if possible. Use the SASSA eLife channel for annual certifications before visiting to save time."
  },
  {
    id: "kzn-pietermaritzburg",
    name: "Pietermaritzburg Local Office",
    province: "kzn",
    city: "pietermaritzburg",
    address: "231 Church Street, Pietermaritzburg, 3201",
    phone: "033 392 7100",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Disability Assessments",
      "Appeals & Reconsiderations",
      "ID Verification"
    ],
    directions: "Situated on Church Street in central Pietermaritzburg, near the KZN High Court.",
    nearbyLandmarks: "KZN High Court, Pietermaritzburg City Hall",
    accessibilityNotes: "Elevator access to upper floors, wheelchair friendly counters, braille signage.",
    localTip: "Allow at least 2 hours for your visit. The office serves beneficiaries from the entire uMgungundlovu District. Mid-month visits are recommended."
  },
  {
    id: "kzn-newcastle",
    name: "Newcastle Local Office",
    province: "kzn",
    city: "newcastle",
    address: "45 Scott Street, Newcastle, 2940",
    phone: "034 315 5100",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "Payment Enquiries",
      "Bank Detail Updates"
    ],
    directions: "Located on Scott Street in Newcastle CBD, near the Newcastle Town Hall.",
    nearbyLandmarks: "Newcastle Town Hall, Newcastle Mall",
    accessibilityNotes: "Ground floor access, wheelchair friendly entrance, priority queue system.",
    localTip: "The office is quieter on Wednesday afternoons. Bring all original documents plus certified copies to avoid being turned away."
  },
  {
    id: "kzn-richards-bay",
    name: "Richards Bay Local Office",
    province: "kzn",
    city: "richards-bay",
    address: "8 Kruger Street, Richards Bay, 3900",
    phone: "035 901 5700",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "eLife Certification",
      "Application Status Checks"
    ],
    directions: "Situated on Kruger Street in the Richards Bay CBD, near the Empangeni Railway Station turn-off.",
    nearbyLandmarks: "Richards Bay Civic Centre, Boardwalk Mall",
    accessibilityNotes: "Wheelchair ramp at entrance, accessible parking, priority seating available.",
    localTip: "This office serves both Richards Bay and surrounding rural areas. Mid-week visits (Tuesday-Thursday) have the shortest waiting times."
  },
  {
    id: "ec-east-london",
    name: "East London Local Office",
    province: "eastern-cape",
    city: "east-london",
    address: "3 Oxford Street, East London, 5201",
    phone: "043 702 0200",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "Disability Assessments",
      "Appeals & Reconsiderations",
      "Fraud Reporting"
    ],
    directions: "Located on Oxford Street in East London CBD, opposite the East London City Hall.",
    nearbyLandmarks: "East London City Hall, Oxford Street Taxi Rank",
    accessibilityNotes: "Level entrance, spacious waiting area with priority seating for seniors and disabled.",
    localTip: "The East London office handles a high volume of disability grant applications. Schedule your district surgeon appointment before coming in."
  },
  {
    id: "ec-mthatha",
    name: "Mthatha Local Office",
    province: "eastern-cape",
    city: "mthatha",
    address: "25 Nelson Mandela Drive, Mthatha, 5099",
    phone: "047 502 8100",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "eLife Certification",
      "Social Work Services"
    ],
    directions: "Situated on Nelson Mandela Drive, near the Mthatha Town Hall.",
    nearbyLandmarks: "Mthatha Town Hall, Mthatha Mall",
    accessibilityNotes: "Ramp at main entrance, wheelchair accessible counters, accessible restrooms.",
    localTip: "This is a high-volume office serving the OR Tambo District. Arrive before 7 AM. Consider visiting satellite offices in nearby towns for shorter queues."
  },
  {
    id: "ec-queenstown",
    name: "Queenstown Local Office",
    province: "eastern-cape",
    city: "queenstown",
    address: "18 Cathcart Road, Queenstown, 5319",
    phone: "045 808 4400",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "Payment Enquiries",
      "Bank Detail Updates",
      "Application Status Checks"
    ],
    directions: "Located on Cathcart Road in Queenstown CBD, opposite the Queenstown Post Office.",
    nearbyLandmarks: "Queenstown Post Office, Queenstown Town Hall",
    accessibilityNotes: "Ground floor access, wide doorways, accessible restroom facility.",
    localTip: "Queenstown serves as a hub for the Chris Hani District. Call ahead to check which services are available on the day of your visit."
  },
  {
    id: "ec-butterworth",
    name: "Butterworth Local Office",
    province: "eastern-cape",
    city: "butterworth",
    address: "48 Cathcart Street, Butterworth, 4960",
    phone: "047 492 0300",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "eLife Certification"
    ],
    directions: "Situated on Cathcart Street, near the Butterworth Thusong Centre.",
    nearbyLandmarks: "Butterworth Thusong Centre, Butterworth Taxi Rank",
    accessibilityNotes: "Ramp access at entrance, priority queue for elderly and disabled visitors.",
    localTip: "The Thusong Centre houses multiple government departments under one roof, making it convenient if you need other government services as well."
  },
  {
    id: "lp-thohoyandou",
    name: "Thohoyandou Local Office",
    province: "limpopo",
    city: "thohoyandou",
    address: "1 University Street, Thohoyandou, 0950",
    phone: "015 962 0100",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "eLife Certification",
      "Social Work Services"
    ],
    directions: "Located on University Street, near the University of Venda main entrance.",
    nearbyLandmarks: "University of Venda, Thohoyandou Mall",
    accessibilityNotes: "Wheelchair ramp at entrance, ground floor service counters, disabled parking bays.",
    localTip: "Thohoyandou serves the Vhembe District. Pay week (first week of the month) is extremely busy. The period from the 15th to the 25th is noticeably quieter."
  },
  {
    id: "lp-giyani",
    name: "Giyani Local Office",
    province: "limpopo",
    city: "giyani",
    address: "12 President Street, Giyani, 0826",
    phone: "015 811 3000",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "Payment Enquiries",
      "Bank Detail Updates",
      "Application Status Checks"
    ],
    directions: "Situated on President Street in Giyani CBD, near the Giyani Thusong Centre.",
    nearbyLandmarks: "Giyani Thusong Centre, Giyani Shopping Centre",
    accessibilityNotes: "Level entrance, spacious interior with priority queue system for seniors.",
    localTip: "Giyani serves the Mopani District. Many beneficiaries travel from rural villages, so mid-week visits are recommended to avoid peak crowds."
  },
  {
    id: "lp-mokopane",
    name: "Mokopane Local Office",
    province: "limpopo",
    city: "mokopane",
    address: "75 Thabo Mbeki Street, Mokopane, 0600",
    phone: "015 483 5400",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "Disability Assessments",
      "Appeals & Reconsiderations"
    ],
    directions: "Located on Thabo Mbeki Street in Mokopane CBD, near the Mokopane Taxi Rank.",
    nearbyLandmarks: "Mokopane Mall, Mokopane Hospital",
    accessibilityNotes: "Wheelchair ramp at entrance, accessible counters, braille signage available.",
    localTip: "Mokopane offices are generally less crowded than Polokwane. You can usually be served within an hour on non-pay weeks."
  },
  {
    id: "lp-musina",
    name: "Musina Local Office",
    province: "limpopo",
    city: "musina",
    address: "23 Irwin Street, Musina, 0900",
    phone: "015 534 3000",
    operatingHours: "Monday to Friday, 07:30 - 15:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "ID Verification"
    ],
    directions: "Situated on Irwin Street in Musina CBD, near the Musina Post Office.",
    nearbyLandmarks: "Musina Post Office, Musina Nature Reserve",
    accessibilityNotes: "Ground floor access, wheelchair friendly entrance and counters.",
    localTip: "Musina is a border town and serves a unique community including cross-border beneficiaries. The office closes at 15:00, so plan to arrive well before then."
  },
  {
    id: "mp-emalahleni",
    name: "eMalahleni (Witbank) Local Office",
    province: "mpumalanga",
    city: "emalahleni",
    address: "10 Mandela Street, eMalahleni, 1038",
    phone: "013 656 3500",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "eLife Certification",
      "Bank Detail Updates"
    ],
    directions: "Located on Mandela Street in eMalahleni CBD, near the eMalahleni Civic Centre.",
    nearbyLandmarks: "eMalahleni Civic Centre, Highveld Mall",
    accessibilityNotes: "Wheelchair ramp at main entrance, disabled parking bays, priority queue for seniors.",
    localTip: "The second week of the month is the quietest time to visit. This office serves the Nkangala District."
  },
  {
    id: "mp-secunda",
    name: "Secunda Local Office",
    province: "mpumalanga",
    city: "secunda",
    address: "45 Infanta Road, Secunda, 2302",
    phone: "017 634 4500",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "Payment Enquiries",
      "Application Status Checks",
      "Social Work Services"
    ],
    directions: "Located on Infanta Road in Secunda CBD, near the Secunda Shopping Centre.",
    nearbyLandmarks: "Secunda Shopping Centre, Secunda Police Station",
    accessibilityNotes: "Ground floor access, wide entrances, accessible restroom facilities.",
    localTip: "Secunda is generally less busy than the larger Mpumalanga offices. Service is usually quick during the second half of the month."
  },
  {
    id: "mp-ermelo",
    name: "Ermelo Local Office",
    province: "mpumalanga",
    city: "ermelo",
    address: "36 Joubert Street, Ermelo, 2350",
    phone: "017 819 5100",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "Disability Assessments",
      "Appeals & Reconsiderations",
      "Fraud Reporting"
    ],
    directions: "Situated on Joubert Street in Ermelo CBD, opposite the Ermelo Magistrate's Court.",
    nearbyLandmarks: "Ermelo Magistrate's Court, Ermelo Mall",
    accessibilityNotes: "Level entrance, wheelchair friendly counters, priority queue for elderly.",
    localTip: "Bring certified copies of all your documents. This office does not have a photocopier for public use."
  },
  {
    id: "fs-welkom",
    name: "Welkom Local Office",
    province: "free-state",
    city: "welkom",
    address: "12 Stateway Avenue, Welkom, 9459",
    phone: "057 357 6300",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "eLife Certification",
      "Bank Detail Updates"
    ],
    directions: "Located on Stateway Avenue in Welkom CBD, near the Welkom Civic Centre.",
    nearbyLandmarks: "Welkom Civic Centre, Goldfields Mall",
    accessibilityNotes: "Wheelchair ramp at entrance, accessible parking bays, braille signage available.",
    localTip: "Welkom serves the Lejweleputswa District. Visit on Tuesday or Wednesday for the shortest wait times."
  },
  {
    id: "fs-bethlehem",
    name: "Bethlehem Local Office",
    province: "free-state",
    city: "bethlehem",
    address: "20 Muller Street, Bethlehem, 9701",
    phone: "058 303 5700",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "Payment Enquiries",
      "Application Status Checks",
      "Social Work Services"
    ],
    directions: "Situated on Muller Street in Bethlehem CBD, near the Bethlehem Town Hall.",
    nearbyLandmarks: "Bethlehem Town Hall, Bayswater Mall",
    accessibilityNotes: "Ground floor access, priority queue for elderly, wide corridors throughout.",
    localTip: "Bethlehem serves the Thabo Mofutsanyane District. The office is quieter during the last week of the month."
  },
  {
    id: "fs-sasolburg",
    name: "Sasolburg Local Office",
    province: "free-state",
    city: "sasolburg",
    address: "12 Kerk Street, Sasolburg, 1947",
    phone: "016 976 3000",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "ID Verification",
      "Application Status Checks"
    ],
    directions: "Located on Kerk Street in Sasolburg CBD, near the Sasolburg Library.",
    nearbyLandmarks: "Sasolburg Library, Vaal River",
    accessibilityNotes: "Level entrance, wheelchair accessible throughout, dedicated senior service counter.",
    localTip: "Sasolburg is close to the Vaal region. Depending on your location, you may also visit the Sebokeng or Vereeniging offices."
  },
  {
    id: "nw-rustenburg",
    name: "Rustenburg Local Office",
    province: "north-west",
    city: "rustenburg",
    address: "65 Heystek Street, Rustenburg, 0299",
    phone: "014 590 7000",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "Disability Assessments",
      "Appeals & Reconsiderations",
      "eLife Certification"
    ],
    directions: "Situated on Heystek Street in Rustenburg CBD, near the Rustenburg Civic Centre.",
    nearbyLandmarks: "Rustenburg Civic Centre, Rustenburg Mall",
    accessibilityNotes: "Wheelchair ramp at entrance, disabled parking bays, elevator access to upper floors.",
    localTip: "Rustenburg serves the Bojanala District. The queue starts forming before 6 AM on pay weeks. Use the SASSA eLife channel for annual certifications to save time."
  },
  {
    id: "nw-klerksdorp",
    name: "Klerksdorp Local Office",
    province: "north-west",
    city: "klerksdorp",
    address: "45 Boom Street, Klerksdorp, 2571",
    phone: "018 487 4200",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "Bank Detail Updates",
      "Fraud Reporting"
    ],
    directions: "Located on Boom Street in Klerksdorp CBD, near the Klerksdorp Post Office.",
    nearbyLandmarks: "Klerksdorp Post Office, Matlosana Mall",
    accessibilityNotes: "Ground floor access, wide doorways, priority queue system for seniors.",
    localTip: "Klerksdorp serves the Dr Kenneth Kaunda District. The office shares the building with other government departments — check in at the SASSA reception desk on arrival."
  },
  {
    id: "nw-brits",
    name: "Brits Local Office",
    province: "north-west",
    city: "brits",
    address: "52 Kerk Street, Brits, 0250",
    phone: "012 252 1000",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "Payment Enquiries",
      "eLife Certification",
      "Social Work Services"
    ],
    directions: "Situated on Kerk Street in Brits CBD, near the Brits Magistrate's Court.",
    nearbyLandmarks: "Brits Magistrate's Court, Brits Mall",
    accessibilityNotes: "Ramp at main entrance, wheelchair friendly counters, accessible restroom.",
    localTip: "Rural beneficiaries should consider visiting mid-month to avoid combining transport and queueing challenges."
  },
  {
    id: "nc-upington",
    name: "Upington Local Office",
    province: "northern-cape",
    city: "upington",
    address: "51 Scott Street, Upington, 8801",
    phone: "054 338 8800",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "eLife Certification",
      "Application Status Checks"
    ],
    directions: "Located on Scott Street in Upington CBD, near the Upington Civic Centre.",
    nearbyLandmarks: "Upington Civic Centre, Upington Mall",
    accessibilityNotes: "Level entrance, wheelchair accessible throughout, dedicated senior queue.",
    localTip: "Upington serves the entire ZF Mgcawu District. Beneficiaries travel from as far as Kakamas and Keimoes. Call ahead to confirm document requirements."
  },
  {
    id: "nc-springbok",
    name: "Springbok Local Office",
    province: "northern-cape",
    city: "springbok",
    address: "12 Van Riebeeck Street, Springbok, 8240",
    phone: "027 718 8300",
    operatingHours: "Monday to Friday, 07:30 - 15:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "Payment Enquiries",
      "ID Verification"
    ],
    directions: "Situated on Van Riebeeck Street in Springbok CBD, near the Springbok Police Station.",
    nearbyLandmarks: "Springbok Police Station, Springbok Airport",
    accessibilityNotes: "Ground floor access, wheelchair friendly entrance and service area.",
    localTip: "Springbok serves the Namakwa District, the most sparsely populated district in South Africa. The office closes at 15:00, so plan your journey carefully as distances between towns are vast."
  },
  {
    id: "nc-de-aar",
    name: "De Aar Local Office",
    province: "northern-cape",
    city: "de-aar",
    address: "78 Church Street, De Aar, 7000",
    phone: "053 631 5000",
    operatingHours: "Monday to Friday, 07:30 - 16:00",
    servicesOffered: [
      "Grant Applications",
      "Grant Enquiries",
      "SRD R370 Enquiries",
      "Bank Detail Updates",
      "Application Status Checks"
    ],
    directions: "Located on Church Street in De Aar CBD, near the De Aar Railway Station.",
    nearbyLandmarks: "De Aar Railway Station, De Aar Town Hall",
    accessibilityNotes: "Ramp access at entrance, wheelchair accessible counters, braille signage available.",
    localTip: "De Aar is a key transport hub in the Northern Cape. The office serves the Pixley ka Seme District. Visit mid-week for the shortest queues."
  }
];

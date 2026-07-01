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
    accessibilityNotes: "Wheelchair accessible ramps at main entrance, elevator access to higher floors, accessible restrooms."
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
    accessibilityNotes: "Fully wheelchair accessible via mall elevators, dedicated disabled parking spaces."
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
    accessibilityNotes: "Ground floor access, tactile paving, wheelchair friendly counters."
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
    accessibilityNotes: "Ramps at entrance, spacious waiting area with priority seating for elderly and disabled."
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
    accessibilityNotes: "Level entrance, wheelchair friendly waiting lines, sign language interpreter available on booking."
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
    accessibilityNotes: "Ground level access, wide doorways, priority queue for senior citizens."
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
    accessibilityNotes: "Wheelchair ramps at entrance, accessible parking bays, ground floor service counters."
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
    accessibilityNotes: "Ground floor access, priority queue for pensioners, braille signage available."
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
    accessibilityNotes: "Lift access to second floor, wheelchair friendly counters, dedicated senior queue."
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
    accessibilityNotes: "Ground level access, wide corridors, sign language interpreter available by appointment."
  }
];

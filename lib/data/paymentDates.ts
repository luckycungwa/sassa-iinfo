export interface PaymentMonth {
  id: string;
  slug: string;
  year: number;
  month: number;
  monthLabel: string;
  label: string;
  isCurrent: boolean;
  isFuture: boolean;
  dates: {
    olderPersons: string;
    disability: string;
    children: string;
    srd: string;
  };
  notes?: string;
}

export const paymentMonths: PaymentMonth[] = [
  {
    id: "2026-01",
    slug: "2026-january",
    year: 2026,
    month: 1,
    monthLabel: "January",
    label: "January 2026",
    isCurrent: false,
    isFuture: false,
    dates: {
      olderPersons: "2 Jan 2026",
      disability: "5 Jan 2026",
      children: "6 Jan 2026",
      srd: "23-30 Jan 2026",
    },
  },
  {
    id: "2026-02",
    slug: "2026-february",
    year: 2026,
    month: 2,
    monthLabel: "February",
    label: "February 2026",
    isCurrent: false,
    isFuture: false,
    dates: {
      olderPersons: "3 Feb 2026",
      disability: "4 Feb 2026",
      children: "5 Feb 2026",
      srd: "25-28 Feb 2026",
    },
  },
  {
    id: "2026-03",
    slug: "2026-march",
    year: 2026,
    month: 3,
    monthLabel: "March",
    label: "March 2026",
    isCurrent: false,
    isFuture: false,
    dates: {
      olderPersons: "3 Mar 2026",
      disability: "4 Mar 2026",
      children: "5 Mar 2026",
      srd: "25-31 Mar 2026",
    },
  },
  {
    id: "2026-04",
    slug: "2026-april",
    year: 2026,
    month: 4,
    monthLabel: "April",
    label: "April 2026",
    isCurrent: false,
    isFuture: false,
    dates: {
      olderPersons: "2 Apr 2026",
      disability: "3 Apr 2026",
      children: "6 Apr 2026",
      srd: "24-30 Apr 2026",
    },
  },
  {
    id: "2026-05",
    slug: "2026-may",
    year: 2026,
    month: 5,
    monthLabel: "May",
    label: "May 2026",
    isCurrent: false,
    isFuture: false,
    dates: {
      olderPersons: "4 May 2026",
      disability: "5 May 2026",
      children: "6 May 2026",
      srd: "25-30 May 2026",
    },
  },
  {
    id: "2026-06",
    slug: "2026-june",
    year: 2026,
    month: 6,
    monthLabel: "June",
    label: "June 2026",
    isCurrent: true,
    isFuture: false,
    dates: {
      olderPersons: "3 Jun 2026",
      disability: "4 Jun 2026",
      children: "5 Jun 2026",
      srd: "25-30 Jun 2026",
    },
  },
  {
    id: "2026-07",
    slug: "2026-july",
    year: 2026,
    month: 7,
    monthLabel: "July",
    label: "July 2026",
    isCurrent: false,
    isFuture: false,
    dates: {
      olderPersons: "3 Jul 2026",
      disability: "4 Jul 2026",
      children: "5 Jul 2026",
      srd: "25-30 Jul 2026",
    },
  },
  {
    id: "2026-08",
    slug: "2026-august",
    year: 2026,
    month: 8,
    monthLabel: "August",
    label: "August 2026",
    isCurrent: false,
    isFuture: true,
    dates: {
      olderPersons: "4 Aug 2026",
      disability: "5 Aug 2026",
      children: "6 Aug 2026",
      srd: "25-31 Aug 2026",
    },
    notes: "Provisional dates — confirm with SASSA",
  },
  {
    id: "2026-09",
    slug: "2026-september",
    year: 2026,
    month: 9,
    monthLabel: "September",
    label: "September 2026",
    isCurrent: false,
    isFuture: true,
    dates: {
      olderPersons: "2 Sep 2026",
      disability: "3 Sep 2026",
      children: "4 Sep 2026",
      srd: "24-30 Sep 2026",
    },
    notes: "Provisional dates — confirm with SASSA",
  },
  {
    id: "2026-10",
    slug: "2026-october",
    year: 2026,
    month: 10,
    monthLabel: "October",
    label: "October 2026",
    isCurrent: false,
    isFuture: true,
    dates: {
      olderPersons: "5 Oct 2026",
      disability: "6 Oct 2026",
      children: "7 Oct 2026",
      srd: "26-31 Oct 2026",
    },
    notes: "Provisional dates — confirm with SASSA",
  },
  {
    id: "2026-11",
    slug: "2026-november",
    year: 2026,
    month: 11,
    monthLabel: "November",
    label: "November 2026",
    isCurrent: false,
    isFuture: true,
    dates: {
      olderPersons: "3 Nov 2026",
      disability: "4 Nov 2026",
      children: "5 Nov 2026",
      srd: "25-30 Nov 2026",
    },
    notes: "Provisional dates — confirm with SASSA",
  },
  {
    id: "2026-12",
    slug: "2026-december",
    year: 2026,
    month: 12,
    monthLabel: "December",
    label: "December 2026",
    isCurrent: false,
    isFuture: true,
    dates: {
      olderPersons: "2 Dec 2026",
      disability: "3 Dec 2026",
      children: "4 Dec 2026",
      srd: "23-31 Dec 2026",
    },
    notes: "Provisional dates — confirm with SASSA. Expect early payout before Christmas.",
  },
];

/**
 * Editorial team / reviewer personas for E-E-A-T (Experience, Expertise,
 * Authoritativeness, Trust) signals on YMYL (Your Money or Your Life) content.
 *
 * NOTE: These are REALISTIC PLACEHOLDER personas. The site owner MUST replace
 * them with real, named, verifiable experts (with their genuine credentials and
 * consent) before relying on these for Google's quality assessment. Do not ship
 * the placeholder names as factual author/reviewer identities.
 */

export interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  bio: string;
}

export interface Team {
  author: TeamMember;
  medicalReviewer: TeamMember;
  legalReviewer: TeamMember;
}

export const TEAM: Team = {
  author: {
    name: "Naledi Khumalo",
    role: "Senior Social Policy Researcher",
    credentials: "B.A. Social Policy; 8 years covering South African social grants",
    bio: "Naledi researches and writes about South African social assistance programmes, tracking policy changes from the Department of Social Development and SASSA to produce clear, practical guidance for grant applicants and beneficiaries.",
  },
  medicalReviewer: {
    name: "Dr. Sipho Mthembu",
    role: "Medical Reviewer",
    credentials: "MBChB, MMed (Public Health)",
    bio: "Dr. Mthembu is a public health physician who reviews content touching on disability, health, and care-dependency assessments to ensure it reflects current clinical and regulatory standards.",
  },
  legalReviewer: {
    name: "Adv. Lerato van Wyk",
    role: "Legal Reviewer",
    credentials: "LLB; attorney specialising in social security & administrative law",
    bio: "Adv. van Wyk reviews legal and procedural content relating to social security, appeals, and administrative-law rights to keep the guidance accurate and consistent with South African legislation.",
  },
};

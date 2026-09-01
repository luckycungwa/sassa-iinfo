/**
 * Editorial team / reviewer personas for E-E-A-T (Experience, Expertise,
 * Authoritativeness, Trust) signals on YMYL (Your Money or Your Life) content.
 *
 * The author is the verified site owner. Medical and legal reviewer badges
 * should only be added when real, named, credentialed reviewers have been
 * confirmed and have given consent.
 */

export interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  bio: string;
}

export interface Team {
  author: TeamMember;
  medicalReviewer?: TeamMember;
  legalReviewer?: TeamMember;
}

export const TEAM: Team = {
  author: {
    name: "Lucky Cungwa",
    role: "Editor / Publisher",
    credentials: "44Tag Studios",
    bio: "Lucky researches and writes about South African social assistance programmes, tracking policy changes from the Department of Social Development and SASSA to produce clear, practical guidance for grant applicants and beneficiaries.",
  },
};

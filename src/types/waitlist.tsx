// types.ts
export type ProfessionType =
  | "Athlete"
  | "Coach"
  | "Team Manager"
  | "Scout"
  | "Athletic Director"
  | "Parent"
  | "Student"
  | "Sports Analyst"
  | "Other";

export type SportType =
  | "Basketball"
  | "Football"
  | "Baseball"
  | "Soccer"
  | "Volleyball"
  | "Tennis"
  | "Track & Field"
  | "Swimming"
  | "Hockey"
  | "Other";

export type TeamLevelType =
  | "Youth"
  | "High School"
  | "College - D1"
  | "College - D2"
  | "College - D3"
  | "College - NAIA"
  | "Semi-Pro"
  | "Professional"
  | "Other";

export interface WaitlistEntry {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profession: ProfessionType;
  welcomeEmailSentAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  survey?: SurveyData;
}

export interface SurveyData {
  id?: string;
  waitlistEntryId?: string;
  discoverySource?: string;
  age?: string;
  sport?: SportType;
  teamLevel?: TeamLevelType;
  analyticsExperience?: string;
  budgetRange?: string;
  primaryGoal?: string;
  additionalFeedback?: string;
  createdAt?: Date;
}

export interface SignupDisplayUser {
  id: string;
  initials: string;
  name: string;
  profession: string;
  avatarUrl?: string;
  joinedAt: Date;
}

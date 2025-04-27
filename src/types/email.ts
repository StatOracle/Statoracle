// Email template types
export type TemplateType =
  | "welcome"
  | "waitlist-confirmation"
  | "newsletter"
  | "feature-announcement"
  | "open-beta-invite"
  | "closed-alpha-invite"
  | "dev-log"
  | "custom";

// Email template interface
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  fromName: string;
  fromEmail: string;
  replyToEmail?: string;
  templateType: TemplateType;
  content: any; // Rich text content
  jsonContent?: Record<string, any>;
  active: boolean;
  previewText?: string;
  createdAt: string;
  updatedAt: string;
}

// Email campaign interface
export interface EmailCampaign {
  id: string;
  name: string;
  template: EmailTemplate | string;
  status: "draft" | "scheduled" | "sending" | "sent" | "failed" | "partial";
  scheduledFor?: string;
  audience: "all-waitlist" | "specific-users" | "custom-list";
  specificUsers?: string[] | { id: string }[];
  customRecipients?: {
    email: string;
    firstName?: string;
    lastName?: string;
  }[];
  templateVariables?: Record<string, any>;
  sentCount?: number;
  openCount?: number;
  clickCount?: number;
  sentAt?: string;
  errorDetails?: string;
  createdAt: string;
  updatedAt: string;
}

// Sent email interface
export interface SentEmail {
  id: string;
  campaign?: EmailCampaign | string;
  recipient: string;
  recipientName?: string;
  subject: string;
  status: "sent" | "delivered" | "opened" | "clicked" | "bounced" | "failed";
  sentAt: string;
  openedAt?: string;
  clickedAt?: string;
  resendId?: string;
  errorDetails?: string;
  createdAt: string;
  updatedAt: string;
}

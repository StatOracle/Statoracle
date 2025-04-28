import { pgTable, text, timestamp, boolean, integer, json, uuid } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { waitlistEntries } from "./waitlist";

/**
 * Email Templates Table
 * Stores email templates that can be used for campaigns
 */
export const emailTemplates = pgTable("email_templates", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull().unique(),
  subject: text("subject").notNull(),
  fromName: text("from_name").notNull().default("StatOracle"),
  fromEmail: text("from_email").notNull().default("noreply@statoracle.com"),
  replyToEmail: text("reply_to_email"),
  templateType: text("template_type").notNull(),
  content: json("content").notNull(),
  jsonContent: json("json_content"),
  active: boolean("active").notNull().default(true),
  previewText: text("preview_text"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/**
 * Email Campaigns Table
 * Stores email campaigns that can be sent to recipients
 */
export const emailCampaigns = pgTable("email_campaigns", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  templateId: text("template_id")
    .notNull()
    .references(() => emailTemplates.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("draft"),
  scheduledFor: timestamp("scheduled_for"),
  audience: text("audience").notNull().default("all-waitlist"),
  templateVariables: json("template_variables"),
  sentCount: integer("sent_count").default(0),
  openCount: integer("open_count").default(0),
  clickCount: integer("click_count").default(0),
  sentAt: timestamp("sent_at"),
  errorDetails: text("error_details"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/**
 * Campaign Recipients Table
 * Stores specific recipients for a campaign
 */
export const campaignRecipients = pgTable("campaign_recipients", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  campaignId: text("campaign_id")
    .notNull()
    .references(() => emailCampaigns.id, { onDelete: "cascade" }),
  waitlistEntryId: text("waitlist_entry_id").references(() => waitlistEntries.id, {
    onDelete: "set null",
  }),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Sent Emails Table
 * Tracks emails that have been sent
 */
export const sentEmails = pgTable("sent_emails", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  campaignId: text("campaign_id").references(() => emailCampaigns.id, {
    onDelete: "set null",
  }),
  recipient: text("recipient").notNull(),
  recipientName: text("recipient_name"),
  subject: text("subject").notNull(),
  status: text("status").notNull().default("sent"),
  sentAt: timestamp("sent_at").notNull().defaultNow(),
  openedAt: timestamp("opened_at"),
  clickedAt: timestamp("clicked_at"),
  resendId: text("resend_id"),
  errorDetails: text("error_details"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/**
 * Email Drafts Table
 * Stores draft emails that can be edited before sending
 */
export const emailDrafts = pgTable("email_drafts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  templateId: text("template_id").references(() => emailTemplates.id, {
    onDelete: "set null",
  }),
  subject: text("subject").notNull(),
  content: json("content").notNull(),
  templateVariables: json("template_variables"),
  createdBy: text("created_by").notNull(),
  lastEditedBy: text("last_edited_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/**
 * Relations
 */
export const emailTemplatesRelations = relations(emailTemplates, ({ many }) => ({
  campaigns: many(emailCampaigns),
  drafts: many(emailDrafts),
}));

export const emailCampaignsRelations = relations(emailCampaigns, ({ one, many }) => ({
  template: one(emailTemplates, {
    fields: [emailCampaigns.templateId],
    references: [emailTemplates.id],
  }),
  recipients: many(campaignRecipients),
  sentEmails: many(sentEmails),
}));

export const campaignRecipientsRelations = relations(campaignRecipients, ({ one }) => ({
  campaign: one(emailCampaigns, {
    fields: [campaignRecipients.campaignId],
    references: [emailCampaigns.id],
  }),
  waitlistEntry: one(waitlistEntries, {
    fields: [campaignRecipients.waitlistEntryId],
    references: [waitlistEntries.id],
  }),
}));

export const sentEmailsRelations = relations(sentEmails, ({ one }) => ({
  campaign: one(emailCampaigns, {
    fields: [sentEmails.campaignId],
    references: [emailCampaigns.id],
  }),
}));

export const emailDraftsRelations = relations(emailDrafts, ({ one }) => ({
  template: one(emailTemplates, {
    fields: [emailDrafts.templateId],
    references: [emailTemplates.id],
  }),
}))

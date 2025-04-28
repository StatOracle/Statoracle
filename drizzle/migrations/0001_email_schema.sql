-- Create email templates table
CREATE TABLE IF NOT EXISTS "email_templates" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "subject" TEXT NOT NULL,
  "from_name" TEXT NOT NULL DEFAULT 'StatOracle',
  "from_email" TEXT NOT NULL DEFAULT 'noreply@statoracle.com',
  "reply_to_email" TEXT,
  "template_type" TEXT NOT NULL,
  "content" JSONB NOT NULL,
  "json_content" JSONB,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "preview_text" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create email campaigns table
CREATE TABLE IF NOT EXISTS "email_campaigns" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "template_id" TEXT NOT NULL REFERENCES "email_templates" ("id") ON DELETE CASCADE,
  "status" TEXT NOT NULL DEFAULT 'draft',
  "scheduled_for" TIMESTAMP,
  "audience" TEXT NOT NULL DEFAULT 'all-waitlist',
  "template_variables" JSONB,
  "sent_count" INTEGER DEFAULT 0,
  "open_count" INTEGER DEFAULT 0,
  "click_count" INTEGER DEFAULT 0,
  "sent_at" TIMESTAMP,
  "error_details" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create campaign recipients table
CREATE TABLE IF NOT EXISTS "campaign_recipients" (
  "id" TEXT PRIMARY KEY,
  "campaign_id" TEXT NOT NULL REFERENCES "email_campaigns" ("id") ON DELETE CASCADE,
  "waitlist_entry_id" TEXT REFERENCES "waitlist_entries" ("id") ON DELETE SET NULL,
  "email" TEXT NOT NULL,
  "first_name" TEXT,
  "last_name" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create sent emails table
CREATE TABLE IF NOT EXISTS "sent_emails" (
  "id" TEXT PRIMARY KEY,
  "campaign_id" TEXT REFERENCES "email_campaigns" ("id") ON DELETE SET NULL,
  "recipient" TEXT NOT NULL,
  "recipient_name" TEXT,
  "subject" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'sent',
  "sent_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "opened_at" TIMESTAMP,
  "clicked_at" TIMESTAMP,
  "resend_id" TEXT,
  "error_details" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create email drafts table
CREATE TABLE IF NOT EXISTS "email_drafts" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "template_id" TEXT REFERENCES "email_templates" ("id") ON DELETE SET NULL,
  "subject" TEXT NOT NULL,
  "content" JSONB NOT NULL,
  "template_variables" JSONB,
  "created_by" TEXT NOT NULL,
  "last_edited_by" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "email_campaigns_template_id_idx" ON "email_campaigns" ("template_id");
CREATE INDEX IF NOT EXISTS "email_campaigns_status_idx" ON "email_campaigns" ("status");
CREATE INDEX IF NOT EXISTS "email_campaigns_scheduled_for_idx" ON "email_campaigns" ("scheduled_for");
CREATE INDEX IF NOT EXISTS "campaign_recipients_campaign_id_idx" ON "campaign_recipients" ("campaign_id");
CREATE INDEX IF NOT EXISTS "campaign_recipients_waitlist_entry_id_idx" ON "campaign_recipients" ("waitlist_entry_id");
CREATE INDEX IF NOT EXISTS "sent_emails_campaign_id_idx" ON "sent_emails" ("campaign_id");
CREATE INDEX IF NOT EXISTS "sent_emails_recipient_idx" ON "sent_emails" ("recipient");
CREATE INDEX IF NOT EXISTS "sent_emails_status_idx" ON "sent_emails" ("status");
CREATE INDEX IF NOT EXISTS "email_drafts_template_id_idx" ON "email_drafts" ("template_id");

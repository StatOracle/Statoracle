// db/schema.ts
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Main waitlist table
export const waitlistEntries = pgTable("waitlist_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 20 }),
  welcomeEmailSentAt: timestamp("welcome_email_sent_at", { mode: "date" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Survey information table
export const surveys = pgTable("surveys", {
  id: uuid("id").defaultRandom().primaryKey(),
  waitlistEntryId: uuid("waitlist_entry_id")
    .notNull()
    .references(() => waitlistEntries.id, { onDelete: "cascade" }),
  discoverySource: varchar("discovery_source", { length: 100 }),
  age: integer("age"),
  profession: varchar("profession", { length: 100 }),
  additionalFeedback: text("additional_feedback"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations between tables
export const waitlistEntriesRelations = relations(
  waitlistEntries,
  ({ one }) => ({
    survey: one(surveys, {
      fields: [waitlistEntries.id],
      references: [surveys.waitlistEntryId],
    }),
  }),
);

export const surveyRelations = relations(surveys, ({ one }) => ({
  waitlistEntry: one(waitlistEntries, {
    fields: [surveys.waitlistEntryId],
    references: [waitlistEntries.id],
  }),
}));

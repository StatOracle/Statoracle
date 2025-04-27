import { CollectionConfig } from "payload/types";

export const EmailTemplates: CollectionConfig = {
  slug: "email-templates",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "subject", "createdAt"],
    group: "Email Management",
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.roles?.includes("admin") || req.user?.roles?.includes("editor"),
    update: ({ req }) => req.user?.roles?.includes("admin") || req.user?.roles?.includes("editor"),
    delete: ({ req }) => req.user?.roles?.includes("admin"),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "A unique name for this email template",
      },
    },
    {
      name: "subject",
      type: "text",
      required: true,
      admin: {
        description: "The email subject line",
      },
    },
    {
      name: "fromName",
      type: "text",
      required: true,
      defaultValue: "StatOracle",
      admin: {
        description: "The sender's name",
      },
    },
    {
      name: "fromEmail",
      type: "email",
      required: true,
      defaultValue: "noreply@statoracle.com",
      admin: {
        description: "The sender's email address",
      },
    },
    {
      name: "replyToEmail",
      type: "email",
      admin: {
        description: "Reply-to email address (optional)",
      },
    },
    {
      name: "templateType",
      type: "select",
      required: true,
      options: [
        {
          label: "Welcome Email",
          value: "welcome",
        },
        {
          label: "Newsletter",
          value: "newsletter",
        },
        {
          label: "Waitlist Confirmation",
          value: "waitlist-confirmation",
        },
        {
          label: "Feature Announcement",
          value: "feature-announcement",
        },
        {
          label: "Open Beta Invite",
          value: "open-beta-invite",
        },
        {
          label: "Closed Alpha Invite",
          value: "closed-alpha-invite",
        },
        {
          label: "Dev Log",
          value: "dev-log",
        },
        {
          label: "Custom",
          value: "custom",
        },
      ],
      admin: {
        description: "The type of email template",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      admin: {
        description: "The email content in rich text format",
      },
    },
    {
      name: "jsonContent",
      type: "json",
      admin: {
        description: "Template-specific JSON configuration",
        condition: (data) => data.templateType !== "custom",
      },
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Is this template active and available for use?",
      },
    },
    {
      name: "previewText",
      type: "text",
      admin: {
        description: "Preview text shown in email clients",
      },
    },
  ],
  timestamps: true,
};

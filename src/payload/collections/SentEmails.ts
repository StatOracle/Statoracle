import type { CollectionConfig } from "payload";

export const SentEmails: CollectionConfig = {
  slug: "sent-emails",
  admin: {
    useAsTitle: "subject",
    defaultColumns: ["recipient", "subject", "status", "sentAt"],
    group: "Email Management",
  },
  access: {
    read: ({ req }) => req.user?.roles?.includes("admin") || req.user?.roles?.includes("editor"),
    create: ({ req }) => req.user?.roles?.includes("admin") || req.user?.roles?.includes("editor"),
    update: ({ req }) => req.user?.roles?.includes("admin"),
    delete: ({ req }) => req.user?.roles?.includes("admin"),
  },
  fields: [
    {
      name: "campaign",
      type: "relationship",
      relationTo: "email-campaigns",
      admin: {
        description: "The campaign this email belongs to",
      },
    },
    {
      name: "recipient",
      type: "email",
      required: true,
      admin: {
        description: "Email recipient",
      },
    },
    {
      name: "recipientName",
      type: "text",
      admin: {
        description: "Recipient's name",
      },
    },
    {
      name: "subject",
      type: "text",
      required: true,
      admin: {
        description: "Email subject",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "sent",
      options: [
        {
          label: "Sent",
          value: "sent",
        },
        {
          label: "Delivered",
          value: "delivered",
        },
        {
          label: "Opened",
          value: "opened",
        },
        {
          label: "Clicked",
          value: "clicked",
        },
        {
          label: "Bounced",
          value: "bounced",
        },
        {
          label: "Failed",
          value: "failed",
        },
      ],
      admin: {
        description: "Current status of the email",
      },
    },
    {
      name: "sentAt",
      type: "date",
      required: true,
      admin: {
        description: "When the email was sent",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "openedAt",
      type: "date",
      admin: {
        description: "When the email was opened",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "clickedAt",
      type: "date",
      admin: {
        description: "When a link in the email was clicked",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "resendId",
      type: "text",
      admin: {
        description: "Resend email ID for tracking",
        position: "sidebar",
      },
    },
    {
      name: "errorDetails",
      type: "textarea",
      admin: {
        description: "Error details if sending failed",
        condition: (data) => data.status === "failed" || data.status === "bounced",
      },
    },
  ],
  timestamps: true,
};

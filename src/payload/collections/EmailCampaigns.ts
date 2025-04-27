import { CollectionConfig } from "payload/types";

export const EmailCampaigns: CollectionConfig = {
  slug: "email-campaigns",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "status", "sentCount", "createdAt"],
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
      admin: {
        description: "Campaign name (internal use only)",
      },
    },
    {
      name: "template",
      type: "relationship",
      relationTo: "email-templates",
      required: true,
      admin: {
        description: "The email template to use for this campaign",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Scheduled",
          value: "scheduled",
        },
        {
          label: "Sending",
          value: "sending",
        },
        {
          label: "Sent",
          value: "sent",
        },
        {
          label: "Failed",
          value: "failed",
        },
      ],
      admin: {
        description: "Current status of the campaign",
      },
    },
    {
      name: "scheduledFor",
      type: "date",
      admin: {
        description: "When to send this campaign",
        date: {
          pickerAppearance: "dayAndTime",
        },
        condition: (data) => data.status === "scheduled",
      },
    },
    {
      name: "audience",
      type: "select",
      required: true,
      defaultValue: "all-waitlist",
      options: [
        {
          label: "All Waitlist",
          value: "all-waitlist",
        },
        {
          label: "Specific Users",
          value: "specific-users",
        },
        {
          label: "Custom List",
          value: "custom-list",
        },
      ],
      admin: {
        description: "Who should receive this email",
      },
    },
    {
      name: "specificUsers",
      type: "relationship",
      relationTo: "waitlist-entries",
      hasMany: true,
      admin: {
        description: "Select specific users to receive this email",
        condition: (data) => data.audience === "specific-users",
      },
    },
    {
      name: "customRecipients",
      type: "array",
      admin: {
        description: "Custom list of email recipients",
        condition: (data) => data.audience === "custom-list",
      },
      fields: [
        {
          name: "email",
          type: "email",
          required: true,
        },
        {
          name: "firstName",
          type: "text",
        },
        {
          name: "lastName",
          type: "text",
        },
      ],
    },
    {
      name: "templateVariables",
      type: "json",
      admin: {
        description: "Variables to pass to the email template (JSON format)",
      },
    },
    {
      name: "sentCount",
      type: "number",
      admin: {
        readOnly: true,
        description: "Number of emails sent",
      },
    },
    {
      name: "openCount",
      type: "number",
      admin: {
        readOnly: true,
        description: "Number of emails opened",
      },
    },
    {
      name: "clickCount",
      type: "number",
      admin: {
        readOnly: true,
        description: "Number of links clicked",
      },
    },
    {
      name: "sentAt",
      type: "date",
      admin: {
        readOnly: true,
        description: "When the campaign was sent",
      },
    },
    {
      name: "errorDetails",
      type: "textarea",
      admin: {
        readOnly: true,
        description: "Error details if the campaign failed",
        condition: (data) => data.status === "failed",
      },
    },
  ],
  timestamps: true,
};

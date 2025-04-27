import { CollectionConfig } from "payload/types";

export const WaitlistEntries: CollectionConfig = {
  slug: "waitlist-entries",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["firstName", "lastName", "email", "createdAt"],
    group: "User Management",
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req }) => req.user?.roles?.includes("admin") || req.user?.roles?.includes("editor"),
    delete: ({ req }) => req.user?.roles?.includes("admin"),
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: "phoneNumber",
      type: "text",
    },
    {
      name: "profession",
      type: "select",
      options: [
        {
          label: "Athlete",
          value: "Athlete",
        },
        {
          label: "Coach",
          value: "Coach",
        },
        {
          label: "Team Manager",
          value: "Team Manager",
        },
        {
          label: "Scout",
          value: "Scout",
        },
        {
          label: "Athletic Director",
          value: "Athletic Director",
        },
        {
          label: "Parent",
          value: "Parent",
        },
        {
          label: "Student",
          value: "Student",
        },
        {
          label: "Sports Analyst",
          value: "Sports Analyst",
        },
        {
          label: "Other",
          value: "Other",
        },
      ],
    },
    {
      name: "welcomeEmailSent",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Has the welcome email been sent?",
      },
    },
    {
      name: "welcomeEmailSentAt",
      type: "date",
      admin: {
        description: "When the welcome email was sent",
        readOnly: true,
      },
    },
    {
      name: "referralCode",
      type: "text",
      admin: {
        description: "Unique referral code for this user",
      },
    },
    {
      name: "referredBy",
      type: "relationship",
      relationTo: "waitlist-entries",
      admin: {
        description: "Who referred this person",
      },
    },
    {
      name: "referralCount",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Number of people this user has referred",
      },
    },
    {
      name: "waitlistPosition",
      type: "number",
      admin: {
        description: "Position in the waitlist",
      },
    },
    {
      name: "survey",
      type: "group",
      admin: {
        description: "Survey responses",
      },
      fields: [
        {
          name: "discoverySource",
          type: "text",
          admin: {
            description: "How they found out about StatOracle",
          },
        },
        {
          name: "sport",
          type: "select",
          options: [
            {
              label: "Basketball",
              value: "Basketball",
            },
            {
              label: "Football",
              value: "Football",
            },
            {
              label: "Baseball",
              value: "Baseball",
            },
            {
              label: "Soccer",
              value: "Soccer",
            },
            {
              label: "Volleyball",
              value: "Volleyball",
            },
            {
              label: "Tennis",
              value: "Tennis",
            },
            {
              label: "Track & Field",
              value: "Track & Field",
            },
            {
              label: "Swimming",
              value: "Swimming",
            },
            {
              label: "Hockey",
              value: "Hockey",
            },
            {
              label: "Other",
              value: "Other",
            },
          ],
        },
        {
          name: "teamLevel",
          type: "select",
          options: [
            {
              label: "Youth",
              value: "Youth",
            },
            {
              label: "High School",
              value: "High School",
            },
            {
              label: "College - D1",
              value: "College - D1",
            },
            {
              label: "College - D2",
              value: "College - D2",
            },
            {
              label: "College - D3",
              value: "College - D3",
            },
            {
              label: "College - NAIA",
              value: "College - NAIA",
            },
            {
              label: "Semi-Pro",
              value: "Semi-Pro",
            },
            {
              label: "Professional",
              value: "Professional",
            },
            {
              label: "Other",
              value: "Other",
            },
          ],
        },
        {
          name: "analyticsExperience",
          type: "text",
        },
        {
          name: "budgetRange",
          type: "text",
        },
        {
          name: "primaryGoal",
          type: "text",
        },
        {
          name: "additionalFeedback",
          type: "textarea",
        },
      ],
    },
  ],
  timestamps: true,
};

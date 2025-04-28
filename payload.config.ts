import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { resendAdapter } from "@payloadcms/email-resend";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";

// Import collections
import { Users } from "@/payload/collections/Users";
import { EmailTemplates } from "@/payload/collections/EmailTemplates";
import { EmailCampaigns } from "@/payload/collections/EmailCampaigns";
import { WaitlistEntries } from "@/payload/collections/WaitlistEntries";
import { SentEmails } from "@/payload/collections/SentEmails";

// Import endpoints
import { emailEndpoints } from "@/payload/endpoints/emailEndpoints";

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    // Postgres-specific arguments go here.
    // `pool` is required.
    pool: {
      connectionString: process.env.DATABASE_URI || "" as string, // implement t3-oss/env
    },
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config. (sharp)
  // This is optional - if you don't need to do these things,
  // you don't need it!
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  admin: {
    user: "users",
    meta: {
      titleSuffix: "- StatOracle Admin",
      ogImage: "/images/og-image.jpg",
      favicon: "/favicon.ico",
    },
  },
  editor: slateEditor({}),
  // Configure Resend email adapter
  email: resendAdapter({
    defaultFromAddress: process.env.EMAIL_FROM || "noreply@statoracle.com",
    defaultFromName: "StatOracle",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  collections: [
    Users,
    EmailTemplates,
    EmailCampaigns,
    WaitlistEntries,
    SentEmails,
  ],
  // Add custom endpoints
  endpoints: emailEndpoints,
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  // This is for Next.js integration
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
    "https://statoracle.com",
  ].filter(Boolean),
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
    "https://statoracle.com",
  ].filter(Boolean),
});


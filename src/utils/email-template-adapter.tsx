import React from "react";
import { WelcomeEmail } from "@/emails/welcome";
import { WaitlistConfirmationTemplate } from "@/emails/waitlist-confirmation";
import { NewsletterTemplate } from "@/emails/newsletter";
import { FeatureAnnouncementTemplate } from "@/emails/feature-announcement";
import { OpenBetaInviteTemplate } from "@/emails/open-beta-invite";
import { ClosedAlphaInviteTemplate } from "@/emails/closed-alpha-invite";
import { DevLogTemplate } from "@/emails/dev-log";
import { TemplateType } from "@/types/email";
import * as Sentry from "@sentry/nextjs";

/**
 * Default template parameters for each template type
 */
const defaultTemplateParams: Record<TemplateType, Record<string, any>> = {
  welcome: {
    previewText: "Welcome to StatOracle - Your sports analytics revolution starts now!",
    firstName: "there",
  },
  "waitlist-confirmation": {
    previewText: "Thanks for joining the StatOracle waitlist! Game-changing sports analytics incoming.",
    firstName: "Coach",
    waitlistPosition: "#238",
    referralCode: "COACH-ALEX-23",
    socialLinks: {
      twitter: "https://twitter.com/statoracle",
      instagram: "https://instagram.com/statoracle",
      tiktok: "https://tiktok.com/@statoracle",
    },
  },
  newsletter: {
    previewText: "StatOracle News: Latest in sports analytics",
    mainHeading: "This Month in Sports Analytics",
    editionNumber: "01",
    firstName: "there",
  },
  "feature-announcement": {
    previewText: "New Feature Alert: We've added something awesome to StatOracle!",
    featureName: "Advanced Player Tracking",
    firstName: "there",
  },
  "open-beta-invite": {
    previewText: "You're invited to the StatOracle Open Beta!",
    firstName: "there",
    accessCode: "BETA-ACCESS-123",
  },
  "closed-alpha-invite": {
    previewText: "Exclusive Access: Join the StatOracle Closed Alpha!",
    firstName: "there",
    accessCode: "ALPHA-ACCESS-123",
  },
  "dev-log": {
    previewText: "StatOracle Dev Log: See what we've been building",
    issueNumber: "01",
    firstName: "there",
  },
  custom: {
    html: "",
  },
};

/**
 * Type definitions for template parameters
 */
export type WelcomeEmailParams = {
  previewText?: string;
  firstName?: string;
};

export type WaitlistConfirmationParams = {
  previewText?: string;
  firstName?: string;
  waitlistPosition?: string;
  referralCode?: string;
  socialLinks?: {
    twitter: string;
    instagram: string;
    tiktok: string;
  };
};

export type NewsletterParams = {
  previewText?: string;
  mainHeading?: string;
  editionNumber?: string;
  firstName?: string;
  content?: any;
};

export type FeatureAnnouncementParams = {
  previewText?: string;
  featureName?: string;
  firstName?: string;
  featureDescription?: string;
};

export type OpenBetaInviteParams = {
  previewText?: string;
  firstName?: string;
  accessCode?: string;
};

export type ClosedAlphaInviteParams = {
  previewText?: string;
  firstName?: string;
  accessCode?: string;
};

export type DevLogParams = {
  previewText?: string;
  issueNumber?: string;
  firstName?: string;
};

export type CustomTemplateParams = {
  html: string;
};

export type TemplateParams =
  | WelcomeEmailParams
  | WaitlistConfirmationParams
  | NewsletterParams
  | FeatureAnnouncementParams
  | OpenBetaInviteParams
  | ClosedAlphaInviteParams
  | DevLogParams
  | CustomTemplateParams;

/**
 * Get the appropriate React component for an email template
 * 
 * @param templateType The type of template to render
 * @param params Parameters to pass to the template
 * @returns A React component for the email
 */
export function getEmailComponent(templateType: TemplateType, params: Record<string, any> = {}) {
  try {
    // Merge default parameters with provided parameters
    const mergedParams = {
      ...defaultTemplateParams[templateType],
      ...params,
    };

    // Return the appropriate component based on template type
    switch (templateType) {
      case "welcome":
        return <WelcomeEmail {...mergedParams} />;
      case "waitlist-confirmation":
        return <WaitlistConfirmationTemplate {...mergedParams} />;
      case "newsletter":
        return <NewsletterTemplate {...mergedParams} />;
      case "feature-announcement":
        return <FeatureAnnouncementTemplate {...mergedParams} />;
      case "open-beta-invite":
        return <OpenBetaInviteTemplate {...mergedParams} />;
      case "closed-alpha-invite":
        return <ClosedAlphaInviteTemplate {...mergedParams} />;
      case "dev-log":
        return <DevLogTemplate {...mergedParams} />;
      case "custom":
        // For custom templates, we just return the HTML
        return <div dangerouslySetInnerHTML={{ __html: mergedParams.html }} />;
      default:
        throw new Error(`Unsupported template type: ${templateType}`);
    }
  } catch (error) {
    // Log the error to Sentry
    Sentry.captureException(error, {
      tags: {
        operation: "getEmailComponent",
        templateType,
      },
      extra: {
        params,
      },
    });
    
    console.error(`Error rendering email template ${templateType}:`, error);
    
    // Return a fallback template
    return (
      <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
        <h1>Error Rendering Email Template</h1>
        <p>We encountered an error while rendering your email template.</p>
        <p>Please contact support for assistance.</p>
      </div>
    );
  }
}

/**
 * Validate template parameters against expected schema
 * 
 * @param templateType The type of template
 * @param params Parameters to validate
 * @returns Whether the parameters are valid
 */
export function validateTemplateParams(templateType: TemplateType, params: Record<string, any>): boolean {
  try {
    // Basic validation based on template type
    switch (templateType) {
      case "welcome":
        // No required fields
        return true;
      case "waitlist-confirmation":
        // Require referralCode
        return typeof params.referralCode === "string";
      case "newsletter":
        // Require content or mainHeading
        return typeof params.content === "string" || typeof params.mainHeading === "string";
      case "feature-announcement":
        // Require featureName
        return typeof params.featureName === "string";
      case "open-beta-invite":
      case "closed-alpha-invite":
        // Require accessCode
        return typeof params.accessCode === "string";
      case "dev-log":
        // Require issueNumber
        return typeof params.issueNumber === "string";
      case "custom":
        // Require html
        return typeof params.html === "string";
      default:
        return false;
    }
  } catch (error) {
    console.error(`Error validating template params for ${templateType}:`, error);
    return false;
  }
}

import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export const FeatureAnnouncementTemplate = ({
  previewText = "New feature alert! Check out what's new at StatOracle",
  featureName = "Team Shot Analysis",
  featureTagline = "See exactly where your team is money from the floor",
  featureDescription = "Our new team shot analysis tool gives you NBA-level insights into your team's shooting patterns, strengths, and opportunities.",
  featureImage = "https://via.placeholder.com/600x300",
  benefits = [
    {
      title: "Identify Hot Spots",
      description:
        "See where your team shoots best from and optimize your offense accordingly.",
    },
    {
      title: "Find Opportunities",
      description:
        "Discover areas where your team needs more practice or where you're leaving points on the table.",
    },
    {
      title: "Compare Players",
      description:
        "Overlay individual player shot charts to find the perfect lineup combinations.",
    },
  ],
  ctaText = "Try It Now",
  ctaLink = "https://statoracle.com/features/team-shot-analysis",
  secondaryCta = {
    text: "Watch the Tutorial",
    link: "https://statoracle.com/tutorials/team-shot-analysis",
  },
}) => (
  <Html>
    <Head />
    <Preview>{previewText}</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        {/* Header */}
        <Section style={styles.header}>
          <Img
            src="https://via.placeholder.com/150x50"
            width="150"
            height="50"
            alt="StatOracle"
            style={styles.logo}
          />
          <Text style={styles.newFeatureBadge}>NEW FEATURE</Text>
        </Section>

        {/* Hero Section */}
        <Section style={styles.heroSection}>
          <Heading style={styles.mainHeading}>
            Introducing {featureName}
          </Heading>
          <Text style={styles.tagline}>{featureTagline}</Text>
        </Section>

        {/* Feature Image */}
        <Section style={styles.featureImageSection}>
          <Img
            src={featureImage}
            alt={featureName}
            width="600"
            height="300"
            style={styles.featureImage}
          />
        </Section>

        {/* Feature Description */}
        <Section style={styles.featureDescriptionSection}>
          <Text style={styles.featureDescription}>{featureDescription}</Text>
          <Button style={styles.primaryButton} href={ctaLink}>
            {ctaText}
          </Button>
        </Section>

        {/* Benefits Section */}
        <Section style={styles.benefitsSection}>
          <Heading style={styles.benefitsSectionHeading}>
            What You Can Do With {featureName}
          </Heading>
          {benefits.map((benefit, index) => (
            <Section key={index} style={styles.benefitItem}>
              <Heading style={styles.benefitHeading}>{benefit.title}</Heading>
              <Text style={styles.benefitText}>{benefit.description}</Text>
            </Section>
          ))}
        </Section>

        {/* How It Works */}
        <Section style={styles.howItWorksSection}>
          <Heading style={styles.howItWorksHeading}>How It Works</Heading>
          <Text style={styles.howItWorksText}>
            1. Upload your game footage or stats
          </Text>
          <Text style={styles.howItWorksText}>
            2. Our AI analyzes every shot and movement
          </Text>
          <Text style={styles.howItWorksText}>
            3. Get detailed visualizations and actionable insights
          </Text>
          <Button style={styles.secondaryButton} href={secondaryCta.link}>
            {secondaryCta.text}
          </Button>
        </Section>

        {/* User Testimonial */}
        <Section style={styles.testimonialSection}>
          <Text style={styles.testimonialQuote}>
            {`"This feature completely changed how we run our offense. We found that our team was taking too many low-percentage shots from the baseline. After adjusting our offense, our shooting percentage went up by 7%!"`}
          </Text>
          <Text style={styles.testimonialAuthor}>
            — Coach Williams, Eastside High School
          </Text>
        </Section>

        {/* CTA Section */}
        <Section style={styles.ctaSection}>
          <Heading style={styles.ctaHeading}>
            Ready to level up your game?
          </Heading>
          <Button style={styles.ctaButton} href={ctaLink}>
            {ctaText}
          </Button>
        </Section>

        {/* Social Media Section */}
        <Section style={styles.socialSection}>
          <Text style={styles.socialText}>Share this with your team:</Text>
          <Link
            style={styles.socialLink}
            href="https://twitter.com/intent/tweet?url=https://statoracle.com/features/team-shot-analysis"
          >
            Twitter
          </Link>
          <Link
            style={styles.socialLink}
            href="https://www.facebook.com/sharer/sharer.php?u=https://statoracle.com/features/team-shot-analysis"
          >
            Facebook
          </Link>
          <Link
            style={styles.socialLink}
            href="https://www.linkedin.com/shareArticle?mini=true&url=https://statoracle.com/features/team-shot-analysis"
          >
            LinkedIn
          </Link>
        </Section>

        {/* Footer */}
        <Section style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 StatOracle, Inc. All rights reserved.
          </Text>
          <Text style={styles.footerText}>
            {`You're receiving this email because you signed up for our waitlist.`}
          </Text>
          <Text style={styles.footerLinks}>
            <Link
              style={styles.footerLink}
              href="https://statoracle.com/privacy"
            >
              Privacy Policy
            </Link>{" "}
            |
            <Link style={styles.footerLink} href="https://statoracle.com/terms">
              Terms of Service
            </Link>{" "}
            |
            <Link
              style={styles.footerLink}
              href="https://statoracle.com/unsubscribe"
            >
              Unsubscribe
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: 0,
    padding: 0,
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    maxWidth: "600px",
    margin: "40px auto",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#0f172a",
    padding: "24px",
    textAlign: "center" as const,
    position: "relative" as const,
  },
  logo: {
    display: "inline-block" as const,
  },
  newFeatureBadge: {
    position: "absolute" as const,
    top: "24px",
    right: "24px",
    backgroundColor: "#10b981",
    color: "#ffffff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  heroSection: {
    backgroundColor: "#0f172a",
    color: "#ffffff",
    padding: "32px 24px",
    textAlign: "center" as const,
  },
  mainHeading: {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "bold",
    margin: "0 0 16px",
  },
  tagline: {
    color: "#a1a1aa",
    fontSize: "18px",
    margin: "0",
  },
  featureImageSection: {
    padding: "0",
  },
  featureImage: {
    width: "100%",
  },
  featureDescriptionSection: {
    padding: "32px 24px",
    textAlign: "center" as const,
    borderBottom: "1px solid #e2e8f0",
  },
  featureDescription: {
    color: "#334155",
    fontSize: "16px",
    lineHeight: "26px",
    margin: "0 0 24px",
  },
  primaryButton: {
    backgroundColor: "#3b82f6",
    borderRadius: "6px",
    color: "#ffffff",
    display: "inline-block" as const,
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 24px",
    textDecoration: "none",
    textAlign: "center" as const,
  },
  benefitsSection: {
    padding: "32px 24px",
    borderBottom: "1px solid #e2e8f0",
  },
  benefitsSectionHeading: {
    color: "#0f172a",
    fontSize: "22px",
    fontWeight: "bold",
    margin: "0 0 24px",
    textAlign: "center" as const,
  },
  benefitItem: {
    marginBottom: "24px",
    padding: "16px",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
  },
  benefitHeading: {
    color: "#0f172a",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 8px",
  },
  benefitText: {
    color: "#334155",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0",
  },
  howItWorksSection: {
    padding: "32px 24px",
    textAlign: "center" as const,
    borderBottom: "1px solid #e2e8f0",
  },
  howItWorksHeading: {
    color: "#0f172a",
    fontSize: "22px",
    fontWeight: "bold",
    margin: "0 0 24px",
  },
  howItWorksText: {
    color: "#334155",
    fontSize: "16px",
    lineHeight: "26px",
    margin: "0 0 16px",
    textAlign: "left" as const,
  },
  secondaryButton: {
    backgroundColor: "#f8fafc",
    borderRadius: "6px",
    color: "#3b82f6",
    display: "inline-block" as const,
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 24px",
    textDecoration: "none",
    textAlign: "center" as const,
    border: "1px solid #e2e8f0",
    marginTop: "16px",
  },
  testimonialSection: {
    padding: "32px 24px",
    borderBottom: "1px solid #e2e8f0",
  },
  testimonialQuote: {
    color: "#334155",
    fontSize: "16px",
    fontStyle: "italic" as const,
    lineHeight: "26px",
    margin: "0 0 16px",
    position: "relative" as const,
    paddingLeft: "20px",
    borderLeft: "3px solid #3b82f6",
  },
  testimonialAuthor: {
    color: "#64748b",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "right" as const,
  },
  ctaSection: {
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    padding: "24px",
    margin: "32px 24px",
    textAlign: "center" as const,
  },
  ctaHeading: {
    color: "#0f172a",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 24px",
  },
  ctaButton: {
    backgroundColor: "#3b82f6",
    borderRadius: "6px",
    color: "#ffffff",
    display: "inline-block" as const,
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 24px",
    textDecoration: "none",
    textAlign: "center" as const,
  },
  socialSection: {
    borderTop: "1px solid #e2e8f0",
    padding: "24px",
    textAlign: "center" as const,
  },
  socialText: {
    color: "#64748b",
    fontSize: "14px",
    margin: "0 0 16px",
  },
  socialLink: {
    color: "#3b82f6",
    display: "inline-block" as const,
    fontSize: "14px",
    margin: "0 12px",
    textDecoration: "none",
  },
  footer: {
    backgroundColor: "#f8fafc",
    borderTop: "1px solid #e2e8f0",
    padding: "24px",
    textAlign: "center" as const,
  },
  footerText: {
    color: "#64748b",
    fontSize: "12px",
    margin: "0 0 8px",
  },
  footerLinks: {
    margin: "16px 0 0",
  },
  footerLink: {
    color: "#3b82f6",
    display: "inline-block" as const,
    fontSize: "12px",
    margin: "0 8px",
    textDecoration: "none",
  },
} as const;

export default FeatureAnnouncementTemplate;

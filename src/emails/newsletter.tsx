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

export const NewsletterTemplate = ({
  previewText = "StatOracle News: Latest in sports analytics",
  mainHeading = "This Month in Sports Analytics",
  editionNumber = "01",
  featuredStory = {
    title: "How Data Changed the Game for Westlake High",
    summary:
      "The underdog basketball team used our beta analytics to transform their season.",
    ctaText: "Read the full story",
    ctaLink: "https://statoracle.com/stories/westlake-high",
  },
  tipOfTheMonth = {
    title: "Tracking Defensive Positioning",
    content:
      "Simple camera setups that give you pro-level positioning insights.",
    ctaText: "Learn this technique",
    ctaLink: "https://statoracle.com/tips/defensive-positioning",
  },
  updatesSection = [
    {
      title: "New Feature Alert",
      content:
        "Our shot chart analysis now includes heat maps for the entire team.",
      ctaText: "See it in action",
      ctaLink: "https://statoracle.com/features/shot-charts",
    },
    {
      title: "Coming Soon",
      content: "Player movement tracking without expensive equipment.",
      ctaText: "Join the beta",
      ctaLink: "https://statoracle.com/beta/movement-tracking",
    },
  ],
  pollQuestion = "Which feature would you like to see next?",
  pollOptions = [
    {
      text: "Automated highlight reels",
      link: "https://statoracle.com/poll/highlights",
    },
    {
      text: "Opponent scouting reports",
      link: "https://statoracle.com/poll/scouting",
    },
    {
      text: "Play recommendation AI",
      link: "https://statoracle.com/poll/play-ai",
    },
  ],
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
          <Text style={styles.editionBadge}>EDITION {editionNumber}</Text>
        </Section>

        {/* Hero Section */}
        <Section style={styles.heroSection}>
          <Heading style={styles.mainHeading}>{mainHeading}</Heading>
          <Text style={styles.subHeading}>
            Insights, updates, and tips to elevate your game
          </Text>
        </Section>

        {/* Featured Story */}
        <Section style={styles.featuredStorySection}>
          <Img
            src="https://via.placeholder.com/600x300"
            alt="Featured Story"
            width="600"
            height="300"
            style={styles.featuredStoryImage}
          />
          <Heading style={styles.sectionHeading}>{featuredStory.title}</Heading>
          <Text style={styles.paragraph}>{featuredStory.summary}</Text>
          <Button style={styles.storyButton} href={featuredStory.ctaLink}>
            {featuredStory.ctaText}
          </Button>
        </Section>

        {/* Tip of the Month */}
        <Section style={styles.tipSection}>
          <Heading style={styles.tipHeading}>💡 Tip of the Month</Heading>
          <Heading style={styles.sectionHeading}>{tipOfTheMonth.title}</Heading>
          <Text style={styles.paragraph}>{tipOfTheMonth.content}</Text>
          <Button style={styles.secondaryButton} href={tipOfTheMonth.ctaLink}>
            {tipOfTheMonth.ctaText}
          </Button>
        </Section>

        {/* Updates Section */}
        <Section style={styles.updatesSection}>
          <Heading style={styles.updatesSectionHeading}>
            {`What's New at StatOracle`}
          </Heading>

          {updatesSection.map((update, index) => (
            <Section key={index} style={styles.updateItem}>
              <Heading style={styles.updateHeading}>{update.title}</Heading>
              <Text style={styles.updateText}>{update.content}</Text>
              <Link style={styles.updateLink} href={update.ctaLink}>
                {update.ctaText} &rarr;
              </Link>
            </Section>
          ))}
        </Section>

        {/* Poll Section */}
        <Section style={styles.pollSection}>
          <Heading style={styles.pollHeading}>{pollQuestion}</Heading>
          {pollOptions.map((option, index) => (
            <Button key={index} style={styles.pollButton} href={option.link}>
              {option.text}
            </Button>
          ))}
          <Text style={styles.pollText}>
            {`Your feedback shapes our roadmap!`}
          </Text>
        </Section>

        {/* CTA Section */}
        <Section style={styles.ctaSection}>
          <Heading style={styles.ctaHeading}>Share the analytics love</Heading>
          <Text style={styles.ctaText}>
            {`Know coaches or athletes who'd benefit from next-level analytics?`}
          </Text>
          <Button style={styles.ctaButton} href="https://statoracle.com/refer">
            Refer a Friend
          </Button>
        </Section>

        {/* Social Media Section */}
        <Section style={styles.socialSection}>
          <Text style={styles.socialText}>Follow our journey:</Text>
          <Link style={styles.socialLink} href="https://twitter.com/statoracle">
            Twitter
          </Link>
          <Link
            style={styles.socialLink}
            href="https://instagram.com/statoracle"
          >
            Instagram
          </Link>
          <Link style={styles.socialLink} href="https://tiktok.com/@statoracle">
            TikTok
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
  editionBadge: {
    position: "absolute" as const,
    top: "24px",
    right: "24px",
    backgroundColor: "#3b82f6",
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
  subHeading: {
    color: "#a1a1aa",
    fontSize: "16px",
    margin: "0",
  },
  featuredStorySection: {
    padding: "32px 24px",
    borderBottom: "1px solid #e2e8f0",
  },
  featuredStoryImage: {
    borderRadius: "8px",
    marginBottom: "24px",
    width: "100%",
  },
  sectionHeading: {
    color: "#0f172a",
    fontSize: "22px",
    fontWeight: "bold",
    margin: "0 0 16px",
  },
  paragraph: {
    color: "#334155",
    fontSize: "16px",
    lineHeight: "26px",
    margin: "0 0 24px",
  },
  storyButton: {
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
  tipSection: {
    padding: "32px 24px",
    borderBottom: "1px solid #e2e8f0",
  },
  tipHeading: {
    color: "#0f172a",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0 0 8px",
    textTransform: "uppercase" as const,
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
  },
  updatesSection: {
    padding: "32px 24px",
    borderBottom: "1px solid #e2e8f0",
  },
  updatesSectionHeading: {
    color: "#0f172a",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 24px",
    textAlign: "center" as const,
  },
  updateItem: {
    marginBottom: "24px",
    padding: "16px",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
  },
  updateHeading: {
    color: "#0f172a",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 8px",
  },
  updateText: {
    color: "#334155",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0 0 16px",
  },
  updateLink: {
    color: "#3b82f6",
    fontSize: "15px",
    textDecoration: "none",
  },
  pollSection: {
    padding: "32px 24px",
    borderBottom: "1px solid #e2e8f0",
    textAlign: "center" as const,
  },
  pollHeading: {
    color: "#0f172a",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 24px",
  },
  pollButton: {
    backgroundColor: "#ffffff",
    borderRadius: "6px",
    color: "#0f172a",
    display: "block" as const,
    fontSize: "16px",
    fontWeight: "normal",
    padding: "12px 24px",
    textDecoration: "none",
    textAlign: "center" as const,
    border: "1px solid #e2e8f0",
    margin: "0 0 16px",
    width: "100%",
  },
  pollText: {
    color: "#64748b",
    fontSize: "14px",
    margin: "16px 0 0",
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
    margin: "0 0 16px",
  },
  ctaText: {
    color: "#334155",
    fontSize: "16px",
    lineHeight: "26px",
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

export default NewsletterTemplate;

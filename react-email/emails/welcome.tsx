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

export const WelcomeEmail = () => (
  <Html>
    <Head />
    <Preview>
      {`Welcome to StatOracle - Your sports analytics revolution starts now!`}
    </Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        {/* Header */}
        <Section style={styles.header}>
          <Img
            src="https://via.placeholder.com/150x50"
            width="150"
            height="50"
            alt={`StatOracle`}
            style={styles.logo}
          />
        </Section>

        {/* Hero Section */}
        <Section style={styles.heroSection}>
          <Heading style={styles.mainHeading}>
            {`Game On! You're In The Analytics League Now`}
          </Heading>
          <Text style={styles.subHeading}>
            {`Thanks for joining the StatOracle waitlist! We're about to change how youth and college sports teams use data.`}
          </Text>
        </Section>

        {/* Content Section */}
        <Section style={styles.contentSection}>
          <Text style={styles.paragraph}>{`Hey future stats legend,`}</Text>
          <Text style={styles.paragraph}>
            {`First off, high five for joining our waitlist! ✋ We're stoked you're interested in what we're building at StatOracle.`}
          </Text>
          <Text style={styles.paragraph}>
            <strong>{`So what exactly are we cooking up?`}</strong>{" "}
            {`Only the most accessible, affordable, and straight-up revolutionary sports analytics platform for youth and college teams. No big deal.`}
          </Text>
          <Text style={styles.paragraph}>
            {`We're taking the same advanced analytics that the pros use and making them available to everyone — without requiring a pro-level budget. Because let's be honest, your team deserves better than clipboard tallies and your dad's shaky iPhone videos.`}
          </Text>

          {/* Features Section */}
          <Section style={styles.featuresContainer}>
            <Section style={styles.featureItem}>
              <Heading style={styles.featureHeading}>
                {`🔍 Elite Analytics`}
              </Heading>
              <Text style={styles.featureText}>
                {`AI-powered insights that would make even the stats nerds at ESPN jealous`}
              </Text>
            </Section>

            <Section style={styles.featureItem}>
              <Heading style={styles.featureHeading}>
                {`💸 Budget-Friendly`}
              </Heading>
              <Text style={styles.featureText}>
                {`All the power, none of the "sell a kidney to afford it" pricing`}
              </Text>
            </Section>

            <Section style={styles.featureItem}>
              <Heading style={styles.featureHeading}>
                {`🚀 Easy to Use`}
              </Heading>
              <Text style={styles.featureText}>
                {`So simple your coach who still uses a flip phone can figure it out`}
              </Text>
            </Section>
          </Section>

          <Text style={styles.paragraph}>
            {`We're hard at work building something that's going to change the game (literally). And when we're ready to launch, you'll be the first to know.`}
          </Text>

          {/* CTA Section */}
          <Section style={styles.ctaSection}>
            <Heading style={styles.ctaHeading}>
              {`Want to move up in the waitlist?`}
            </Heading>
            <Text style={styles.ctaText}>
              {`Share StatOracle with your teammates, coaches, or that sports-obsessed friend who won't stop talking about analytics.`}
            </Text>
            <Button
              style={styles.ctaButton}
              href="https://statoracle.com/refer"
            >
              {`Refer Friends & Jump The Line`}
            </Button>
          </Section>

          <Text style={styles.paragraph}>
            {`Got questions? We've got answers. Just hit reply to this email and our team will get back to you faster than a point guard on a fast break.`}
          </Text>

          <Text style={styles.paragraph}>{`Game on,`}</Text>
          <Text style={styles.signature}>{`The StatOracle Team`}</Text>
        </Section>

        {/* Social Media Section */}
        <Section style={styles.socialSection}>
          <Text style={styles.socialText}>{`Follow our journey:`}</Text>
          <Link style={styles.socialLink} href="https://twitter.com/statoracle">
            {`Twitter`}
          </Link>
          <Link
            style={styles.socialLink}
            href="https://instagram.com/statoracle"
          >
            {`Instagram`}
          </Link>
          <Link style={styles.socialLink} href="https://tiktok.com/@statoracle">
            {`TikTok`}
          </Link>
        </Section>

        {/* Footer */}
        <Section style={styles.footer}>
          <Text style={styles.footerText}>
            {`© 2025 StatOracle, Inc. All rights reserved.`}
          </Text>
          <Text style={styles.footerText}>
            {`You're receiving this email because you signed up for our waitlist.`}
          </Text>
          <Text style={styles.footerLinks}>
            <Link
              style={styles.footerLink}
              href="https://statoracle.com/privacy"
            >
              {`Privacy Policy`}
            </Link>
            {" | "}
            <Link style={styles.footerLink} href="https://statoracle.com/terms">
              {`Terms of Service`}
            </Link>
            {" | "}
            <Link
              style={styles.footerLink}
              href="https://statoracle.com/unsubscribe"
            >
              {`Unsubscribe`}
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
    textAlign: "center",
  },
  logo: {
    display: "inline-block",
  },
  heroSection: {
    backgroundColor: "#0f172a",
    color: "#ffffff",
    padding: "32px 24px",
    textAlign: "center",
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
    margin: 0,
  },
  contentSection: {
    padding: "32px 24px",
  },
  paragraph: {
    color: "#334155",
    fontSize: "16px",
    lineHeight: "26px",
    margin: "0 0 24px",
  },
  featuresContainer: {
    margin: "32px 0",
  },
  featureItem: {
    marginBottom: "24px",
  },
  featureHeading: {
    color: "#0f172a",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 8px",
  },
  featureText: {
    color: "#334155",
    fontSize: "15px",
    lineHeight: "24px",
    margin: 0,
  },
  ctaSection: {
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    padding: "24px",
    margin: "32px 0",
    textAlign: "center",
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
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 24px",
    textDecoration: "none",
    textAlign: "center",
  },
  signature: {
    color: "#0f172a",
    fontSize: "16px",
    fontWeight: "bold",
  },
  socialSection: {
    borderTop: "1px solid #e2e8f0",
    padding: "24px",
    textAlign: "center",
  },
  socialText: {
    color: "#64748b",
    fontSize: "14px",
    margin: "0 0 16px",
  },
  socialLink: {
    color: "#3b82f6",
    display: "inline-block",
    fontSize: "14px",
    margin: "0 12px",
    textDecoration: "none",
  },
  footer: {
    backgroundColor: "#f8fafc",
    borderTop: "1px solid #e2e8f0",
    padding: "24px",
    textAlign: "center",
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
    display: "inline-block",
    fontSize: "12px",
    margin: "0 8px",
    textDecoration: "none",
  },
} as const;

export default WelcomeEmail;

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

export const WaitlistConfirmationTemplate = ({
  previewText = "Thanks for joining the StatOracle waitlist! Game-changing sports analytics incoming.",
  firstName = "Coach",
  waitlistPosition = "#238",
  referralCode = "COACH-ALEX-23",
  socialLinks = {
    twitter: "https://twitter.com/statoracle",
    instagram: "https://instagram.com/statoracle",
    tiktok: "https://tiktok.com/@statoracle",
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
            src="https://via.placeholder.com/160x50"
            width="160"
            height="50"
            alt={`StatOracle`}
            style={styles.logo}
          />
          <Text style={styles.waitlistBadge}>{`YOU'RE IN!`}</Text>
        </Section>

        {/* Hero Section */}
        <Section style={styles.heroSection}>
          <Heading style={styles.mainHeading}>
            {`You're on the roster, ${firstName}!`}
          </Heading>
          <Text style={styles.subheading}>
            {`Your spot on the StatOracle waitlist is confirmed`}
          </Text>

          <Img
            src="https://via.placeholder.com/500x200"
            width="500"
            height="200"
            alt={`StatOracle Analytics Dashboard Preview`}
            style={styles.heroImage}
          />
        </Section>

        {/* Main Content */}
        <Section style={styles.mainContent}>
          <Text style={styles.paragraph}>
            {`Thanks for joining the future of sports analytics! We're building something game-changing for youth and college sports teams, and we're stoked to have you along for the journey.`}
          </Text>

          <Section style={styles.waitlistInfo}>
            <Text style={styles.waitlistPosition}>
              {`Your waitlist position: ${waitlistPosition}`}
            </Text>
            <Text style={styles.waitlistDetails}>
              {`We're launching soon and we'll hit you up when it's your turn to get in.`}
            </Text>
          </Section>

          <Heading style={styles.sectionHeading}>
            {`Want to move up the waitlist?`}
          </Heading>
          <Text style={styles.paragraph}>
            {`Share your unique referral code with other coaches and athletes. Each sign-up moves you up 5 spots!`}
          </Text>

          <Section style={styles.referralSection}>
            <Text style={styles.referralCode}>{referralCode}</Text>
            <Button
              style={styles.shareButton}
              href={`https://statoracle.com/share/${referralCode}`}
            >
              {`Share Your Code`}
            </Button>
          </Section>
        </Section>

        {/* Teaser Section */}
        <Section style={styles.teaserSection}>
          <Heading style={styles.teaserHeading}>
            {`What's coming your way?`}
          </Heading>

          <Section style={styles.featureList}>
            <Section style={styles.featureItem}>
              <Img
                src="https://via.placeholder.com/48"
                width="48"
                height="48"
                alt={`AI Icon`}
                style={styles.featureIcon}
              />
              <Text style={styles.featureTitle}>
                {`AI-Powered Game Analysis`}
              </Text>
              <Text style={styles.featureDescription}>
                {`Computer vision that breaks down every play, shot, and movement.`}
              </Text>
            </Section>

            <Section style={styles.featureItem}>
              <Img
                src="https://via.placeholder.com/48"
                width="48"
                height="48"
                alt={`Dashboard Icon`}
                style={styles.featureIcon}
              />
              <Text style={styles.featureTitle}>{`Actionable Insights`}</Text>
              <Text style={styles.featureDescription}>
                {`Data you can actually use to level up your game and strategy.`}
              </Text>
            </Section>

            <Section style={styles.featureItem}>
              <Img
                src="https://via.placeholder.com/48"
                width="48"
                height="48"
                alt={`Price Icon`}
                style={styles.featureIcon}
              />
              <Text style={styles.featureTitle}>
                {`Ridiculously Affordable`}
              </Text>
              <Text style={styles.featureDescription}>
                {`Elite-level analytics without the pro-league price tag.`}
              </Text>
            </Section>
          </Section>
        </Section>

        {/* Social Proof */}
        <Section style={styles.socialProofSection}>
          <Text style={styles.socialProofHeading}>{`Join our community`}</Text>
          <Section style={styles.socialLinks}>
            <Link href={socialLinks.twitter} style={styles.socialLink}>
              <Img
                src="https://via.placeholder.com/36"
                width="36"
                height="36"
                alt={`Twitter`}
                style={styles.socialIcon}
              />
            </Link>
            <Link href={socialLinks.instagram} style={styles.socialLink}>
              <Img
                src="https://via.placeholder.com/36"
                width="36"
                height="36"
                alt={`Instagram`}
                style={styles.socialIcon}
              />
            </Link>
            <Link href={socialLinks.tiktok} style={styles.socialLink}>
              <Img
                src="https://via.placeholder.com/36"
                width="36"
                height="36"
                alt={`TikTok`}
                style={styles.socialIcon}
              />
            </Link>
          </Section>
          <Text style={styles.socialProofText}>
            {`Follow us for sports analytics tips, early access opportunities, and maybe the occasional meme. We promise to keep it interesting.`}
          </Text>
        </Section>

        {/* Footer */}
        <Section style={styles.footer}>
          <Text style={styles.footerText}>
            {`© 2025 StatOracle, Inc. All rights reserved.`}
          </Text>
          <Text style={styles.footerLinks}>
            <Link
              href="https://statoracle.com/privacy"
              style={styles.footerLink}
            >
              {`Privacy Policy`}
            </Link>{" "}
            |{" "}
            <Link href="https://statoracle.com/terms" style={styles.footerLink}>
              {`Terms of Service`}
            </Link>{" "}
            |{" "}
            <Link
              href="https://statoracle.com/unsubscribe"
              style={styles.footerLink}
            >
              {`Unsubscribe`}
            </Link>
          </Text>
          <Text style={styles.footerAddress}>
            {`StatOracle, Inc. • 123 Analytics Ave, Sports City, CA 94107`}
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
    padding: "40px 0",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    maxWidth: "600px",
    margin: "0 auto",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
  },
  header: {
    backgroundColor: "#0b1120",
    padding: "24px",
    textAlign: "center",
    position: "relative",
  },
  logo: {
    display: "inline-block",
  },
  waitlistBadge: {
    position: "absolute",
    top: "24px",
    right: "24px",
    backgroundColor: "#4f46e5",
    color: "#ffffff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },
  heroSection: {
    backgroundColor: "#0b1120",
    color: "#ffffff",
    padding: "0 24px 32px",
    textAlign: "center",
  },
  mainHeading: {
    color: "#ffffff",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "0 0 8px",
    lineHeight: "1.2",
  },
  subheading: {
    color: "#a5b4fc",
    fontSize: "18px",
    margin: "0 0 32px",
    fontWeight: "normal",
  },
  heroImage: {
    borderRadius: "12px",
    margin: "0 auto",
    maxWidth: "100%",
    height: "auto",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  mainContent: {
    padding: "32px 24px",
  },
  paragraph: {
    color: "#374151",
    fontSize: "16px",
    lineHeight: "26px",
    margin: "0 0 24px",
  },
  waitlistInfo: {
    backgroundColor: "#f3f4f6",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "32px",
    textAlign: "center",
  },
  waitlistPosition: {
    color: "#1e293b",
    fontSize: "22px",
    fontWeight: "bold",
    margin: "0 0 8px",
  },
  waitlistDetails: {
    color: "#4b5563",
    fontSize: "16px",
    margin: "0",
  },
  sectionHeading: {
    color: "#1e293b",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 16px",
  },
  referralSection: {
    backgroundColor: "#eff6ff",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "32px",
    textAlign: "center",
  },
  referralCode: {
    backgroundColor: "#ffffff",
    border: "1px dashed #3b82f6",
    borderRadius: "8px",
    color: "#1e40af",
    display: "inline-block",
    fontFamily: "monospace",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 16px",
    padding: "12px 24px",
  },
  shareButton: {
    backgroundColor: "#4f46e5",
    borderRadius: "8px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 24px",
    textDecoration: "none",
  },
  teaserSection: {
    padding: "32px 24px",
    backgroundColor: "#fafafa",
    borderTop: "1px solid #e5e7eb",
  },
  teaserHeading: {
    color: "#1e293b",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 0 24px",
    textAlign: "center",
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  featureItem: {
    textAlign: "center",
  },
  featureIcon: {
    margin: "0 auto 12px",
  },
  featureTitle: {
    color: "#1e293b",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 8px",
  },
  featureDescription: {
    color: "#4b5563",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0",
  },
  socialProofSection: {
    padding: "32px 24px",
    textAlign: "center",
    borderTop: "1px solid #e5e7eb",
  },
  socialProofHeading: {
    color: "#1e293b",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 16px",
  },
  socialLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    margin: "0 0 16px",
  },
  socialLink: {
    display: "inline-block",
  },
  socialIcon: {
    borderRadius: "50%",
  },
  socialProofText: {
    color: "#4b5563",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0",
  },
  footer: {
    backgroundColor: "#0b1120",
    color: "#9ca3af",
    padding: "24px",
    textAlign: "center",
  },
  footerText: {
    color: "#9ca3af",
    fontSize: "14px",
    margin: "0 0 12px",
  },
  footerLinks: {
    margin: "0 0 12px",
  },
  footerLink: {
    color: "#a5b4fc",
    display: "inline-block",
    fontSize: "14px",
    margin: "0",
    textDecoration: "none",
  },
  footerAddress: {
    color: "#9ca3af",
    fontSize: "14px",
    margin: "0",
  },
} as const;

export default WaitlistConfirmationTemplate;

import React, { CSSProperties } from "react";
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
  Hr,
} from "@react-email/components";

const styles: { [key: string]: CSSProperties } = {
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
    textAlign: "center" as const,
    position: "relative" as const,
  },
  logo: {
    display: "inline-block",
  },
  alphaBadge: {
    position: "absolute" as const,
    top: "24px",
    right: "24px",
    backgroundColor: "#f59e0b",
    color: "#7c2d12",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    textTransform: "uppercase" as const,
  },
  heroSection: {
    backgroundColor: "#0b1120",
    color: "#ffffff",
    padding: "0 24px 32px",
    textAlign: "center" as const,
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
  accessCodeSection: {
    backgroundColor: "rgba(79, 70, 229, 0.1)",
    borderRadius: "12px",
    border: "1px solid rgba(79, 70, 229, 0.3)",
    padding: "24px",
    marginBottom: "32px",
  },
  accessCodeLabel: {
    color: "#a5b4fc",
    fontSize: "14px",
    fontWeight: "500",
    margin: "0 0 8px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  accessCode: {
    color: "#ffffff",
    fontSize: "24px",
    fontFamily: "monospace",
    fontWeight: "bold",
    margin: "0 0 8px",
    letterSpacing: "1px",
  },
  accessCodeExpiry: {
    color: "#a5b4fc",
    fontSize: "14px",
    margin: "0",
  },
  ctaButton: {
    backgroundColor: "#4f46e5",
    borderRadius: "8px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "14px 32px",
    textDecoration: "none",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
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
  sectionHeading: {
    color: "#1e293b",
    fontSize: "22px",
    fontWeight: "bold",
    margin: "0 0 24px",
  },
  featureList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
  featureItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  },
  featureIcon: {
    flexShrink: 0,
  },
  featureContent: {
    flex: "1",
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
  howItWorksSection: {
    backgroundColor: "#f8fafc",
    padding: "32px 24px",
    borderTop: "1px solid #e5e7eb",
    borderBottom: "1px solid #e5e7eb",
  },
  stepsContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },
  step: {
    position: "relative" as const,
    paddingLeft: "48px",
  },
  stepNumber: {
    position: "absolute" as const,
    left: "0",
    top: "0",
    backgroundColor: "#4f46e5",
    borderRadius: "50%",
    color: "#ffffff",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "bold",
  },
  stepTitle: {
    color: "#1e293b",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 8px",
  },
  stepDescription: {
    color: "#4b5563",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0",
  },
  faqSection: {
    padding: "32px 24px",
  },
  faqItem: {
    marginBottom: "24px",
  },
  faqQuestion: {
    color: "#1e293b",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 8px",
  },
  faqAnswer: {
    color: "#4b5563",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0",
  },
  faqFooter: {
    color: "#4b5563",
    fontSize: "15px",
    margin: "32px 0 0",
    textAlign: "center" as const,
  },
  emailLink: {
    color: "#4f46e5",
    textDecoration: "none",
  },
  footer: {
    backgroundColor: "#0b1120",
    color: "#9ca3af",
    padding: "32px 24px",
    textAlign: "center" as const,
  },
  footerTagline: {
    color: "#a5b4fc",
    fontSize: "16px",
    fontWeight: "500",
    margin: "0 0 24px",
  },
  footerDivider: {
    borderColor: "rgba(255, 255, 255, 0.1)",
    margin: "0 0 24px",
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

export const ClosedAlphaInviteTemplate = ({
  previewText = "You&apos;re invited to StatOracle&apos;s Closed Alpha! Early access to our game-changing sports analytics.",
  firstName = "Coach",
  teamName = "Riverside Ravens",
  accessCode = "ALPHA-COACH-23X5",
  expirationDate = "April 2, 2025",
  alphaFeatures = [
    {
      title: "Team Performance Dashboard",
      description:
        "Comprehensive analytics tracking shooting accuracy, movement patterns, and player positioning.",
      icon: "https://via.placeholder.com/48",
    },
    {
      title: "Game Footage Analysis",
      description:
        "Upload game footage and receive AI-powered insights within hours.",
      icon: "https://via.placeholder.com/48",
    },
    {
      title: "Player Development Tracking",
      description:
        "Monitor individual player progress and identify specific areas for improvement.",
      icon: "https://via.placeholder.com/48",
    },
  ],
  faqItems = [
    {
      question: "How long does the alpha period last?",
      answer:
        "The closed alpha will run for 4 weeks, giving you plenty of time to test the platform and provide feedback.",
    },
    {
      question: "What kind of feedback are you looking for?",
      answer:
        "We want to hear about your experience with the platform, any bugs you encounter, and features you'd like to see in the future.",
    },
    {
      question: "What happens after the alpha period?",
      answer:
        "Alpha testers will automatically transition to our beta program with continued access to the platform.",
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
            src="https://via.placeholder.com/160x50"
            width="160"
            height="50"
            alt="StatOracle"
            style={styles.logo}
          />
          <Text style={styles.alphaBadge}>CLOSED ALPHA</Text>
        </Section>

        {/* Hero Section */}
        <Section style={styles.heroSection}>
          <Heading style={styles.mainHeading}>
            Welcome to the Inner Circle, {firstName}!
          </Heading>
          <Text style={styles.subheading}>
            {`You&apos;re invited to be one of the first to experience StatOracle!`}
          </Text>

          <Section style={styles.accessCodeSection}>
            <Text style={styles.accessCodeLabel}>
              Your Exclusive Access Code
            </Text>
            <Text style={styles.accessCode}>{accessCode}</Text>
            <Text style={styles.accessCodeExpiry}>
              Valid until {expirationDate}
            </Text>
          </Section>

          <Button
            style={styles.ctaButton}
            href="https://app.statoracle.com/alpha"
          >
            Activate Your Access
          </Button>
        </Section>

        {/* Main Content */}
        <Section style={styles.mainContent}>
          <Text style={styles.paragraph}>Hey {firstName},</Text>

          <Text style={styles.paragraph}>
            You&apos;ve been hand-selected to join our closed alpha. Why you?
            Because we believe coaches like you and teams like {teamName} can
            benefit most from our revolutionary approach to sports analytics.
          </Text>

          <Text style={styles.paragraph}>
            {`We're building something that would typically only be available to
            pro teams with massive budgets, but we're making it accessible and
            affordable for youth and college sports. And we want your input to
            make it even better.`}
          </Text>

          <Heading style={styles.sectionHeading}>
            {`What you'll get access to:`}
          </Heading>

          <Section style={styles.featureList}>
            {alphaFeatures.map((feature, index) => (
              <Section key={index} style={styles.featureItem}>
                <Img
                  src={feature.icon}
                  width="48"
                  height="48"
                  alt={feature.title}
                  style={styles.featureIcon}
                />
                <Section style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </Section>
              </Section>
            ))}
          </Section>
        </Section>

        {/* How It Works */}
        <Section style={styles.howItWorksSection}>
          <Heading style={styles.sectionHeading}>How the Alpha Works</Heading>

          <Section style={styles.stepsContainer}>
            <Section style={styles.step}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepTitle}>Activate Your Access</Text>
              <Text style={styles.stepDescription}>
                Click the button above and enter your access code to create your
                account.
              </Text>
            </Section>

            <Section style={styles.step}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepTitle}>Upload Your Footage</Text>
              <Text style={styles.stepDescription}>
                Upload recent game footage through our secure platform.
              </Text>
            </Section>

            <Section style={styles.step}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepTitle}>Get Insights</Text>
              <Text style={styles.stepDescription}>
                Receive detailed analytics and actionable recommendations within
                24 hours.
              </Text>
            </Section>

            <Section style={styles.step}>
              <Text style={styles.stepNumber}>4</Text>
              <Text style={styles.stepTitle}>Share Feedback</Text>
              <Text style={styles.stepDescription}>
                Let us know what works, what doesn&apos;t, and what you&apos;d
                like to see next.
              </Text>
            </Section>
          </Section>
        </Section>

        {/* FAQ Section */}
        <Section style={styles.faqSection}>
          <Heading style={styles.sectionHeading}>
            Frequently Asked Questions
          </Heading>

          {faqItems.map((item, index) => (
            <Section key={index} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </Section>
          ))}

          <Text style={styles.faqFooter}>
            Have more questions? Email us at{" "}
            <Link href="mailto:alpha@statoracle.com" style={styles.emailLink}>
              alpha@statoracle.com
            </Link>
          </Text>
        </Section>

        {/* Footer */}
        <Section style={styles.footer}>
          <Text style={styles.footerTagline}>
            Making elite sports analytics accessible to every team.
          </Text>
          <Hr style={styles.footerDivider} />
          <Text style={styles.footerText}>
            © 2025 StatOracle, Inc. All rights reserved.
          </Text>
          <Text style={styles.footerLinks}>
            <Link
              href="https://statoracle.com/privacy"
              style={styles.footerLink}
            >
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link href="https://statoracle.com/terms" style={styles.footerLink}>
              Terms of Service
            </Link>{" "}
            |{" "}
            <Link
              href="https://statoracle.com/unsubscribe"
              style={styles.footerLink}
            >
              Unsubscribe
            </Link>
          </Text>
          <Text style={styles.footerAddress}>
            StatOracle, Inc. • 123 Analytics Ave, Sports City, CA 94107
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ClosedAlphaInviteTemplate;

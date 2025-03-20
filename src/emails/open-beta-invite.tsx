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
  Hr,
} from "@react-email/components";

export const OpenBetaInviteTemplate = ({
  previewText = "🚀 StatOracle Open Beta is LIVE! Game-changing sports analytics awaits.",
  firstName = "Coach",
  teamName = "Riverside Ravens",
  betaStartDate = "April 15, 2025",
  betaEndDate = "June 15, 2025",
  betaFeatures = [
    {
      title: "AI-Powered Performance Insights",
      description:
        "Our computer vision analyzes player movements, team formations, and game patterns to deliver actionable insights.",
      icon: "https://via.placeholder.com/48",
    },
    {
      title: "Interactive Performance Dashboard",
      description:
        "Visualize team and player metrics with our intuitive, customizable dashboards that make data easy to understand.",
      icon: "https://via.placeholder.com/48",
    },
    {
      title: "Opponent Analysis",
      description:
        "Get the competitive edge with detailed breakdown of opposing teams' strategies and tendencies.",
      icon: "https://via.placeholder.com/48",
    },
    {
      title: "Player Development Tracking",
      description:
        "Monitor individual growth with personalized improvement metrics and targeted training recommendations.",
      icon: "https://via.placeholder.com/48",
    },
  ],
  pricingTiers = [
    {
      name: "Early Bird",
      price: "$99/month",
      description:
        "For beta testers only! Lock in this special rate for a full year after launch.",
      features: [
        "Full platform access",
        "Up to 5 games analyzed per month",
        "Weekly performance reports",
        "Priority support",
      ],
    },
    {
      name: "Team Pro",
      price: "$199/month",
      description:
        "Our most popular plan for serious teams looking to level up.",
      features: [
        "Full platform access",
        "Up to 12 games analyzed per month",
        "Customizable dashboards",
        "Opponent scouting reports",
        "1-on-1 coaching sessions",
      ],
    },
  ],
  testimonials = [
    {
      quote:
        "StatOracle helped us identify patterns we never would have seen. We improved our shooting percentage by 15% in just three weeks!",
      name: "Coach Sarah Williams",
      team: "Westlake High School Basketball",
    },
    {
      quote:
        "Finally, a sports analytics platform that doesn't require a PhD to understand. Our players actually enjoy reviewing the data!",
      name: "Coach Marcus Johnson",
      team: "Bayside College Soccer",
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
          <Text style={styles.betaBadge}>{`OPEN BETA`}</Text>
        </Section>

        {/* Hero Section */}
        <Section style={styles.heroSection}>
          <Heading style={styles.mainHeading}>
            {`The Wait is Over, ${firstName}!`}
          </Heading>
          <Text style={styles.subheading}>
            {`We're thrilled to invite you to StatOracle's Open Beta`}
          </Text>

          <Section style={styles.betaDateSection}>
            <Text style={styles.betaDateLabel}>{`Beta Testing Period`}</Text>
            <Text style={styles.betaDate}>
              {`${betaStartDate} - ${betaEndDate}`}
            </Text>
          </Section>

          <Button
            style={styles.ctaButton}
            href="https://app.statoracle.com/beta-signup"
          >
            {`Join the Beta Today`}
          </Button>
        </Section>

        {/* Main Content */}
        <Section style={styles.mainContent}>
          <Text style={styles.paragraph}>{`Hey ${firstName},`}</Text>

          <Text style={styles.paragraph}>
            {`Remember when you signed up for our waitlist? Well, today's the day! Your patience has officially paid off. We're opening our doors to beta testers like you who are ready to bring youth and college sports into the analytics era.`}
          </Text>

          <Text style={styles.paragraph}>
            {`As a coach at ${teamName}, you know that even the smallest advantage can make a huge difference. That's why we've built StatOracle—to give teams like yours the same analytical firepower that the pros have, but at a fraction of the cost.`}
          </Text>

          <Text style={styles.highlightText}>
            {`Because let's be honest, not every team has an NBA-sized budget for analytics, but every team deserves NBA-level insights. 🏀📊`}
          </Text>

          <Heading style={styles.sectionHeading}>
            {`What you'll get in the Open Beta:`}
          </Heading>

          <Section style={styles.featureList}>
            {betaFeatures.map((feature, index) => (
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
          <Heading style={styles.sectionHeading}>
            {`How StatOracle Works`}
          </Heading>

          <Section style={styles.stepsContainer}>
            <Section style={styles.step}>
              <Text style={styles.stepNumber}>{`1`}</Text>
              <Text style={styles.stepTitle}>{`Upload Your Game Footage`}</Text>
              <Text style={styles.stepDescription}>
                {`Simply upload your game footage through our secure platform. We accept most common video formats.`}
              </Text>
            </Section>

            <Section style={styles.step}>
              <Text style={styles.stepNumber}>{`2`}</Text>
              <Text style={styles.stepTitle}>
                {`Our AI Does the Heavy Lifting`}
              </Text>
              <Text style={styles.stepDescription}>
                {`Our advanced computer vision and AI algorithms analyze every aspect of the game, from player movements to team formations.`}
              </Text>
            </Section>

            <Section style={styles.step}>
              <Text style={styles.stepNumber}>{`3`}</Text>
              <Text style={styles.stepTitle}>
                {`Receive Actionable Insights`}
              </Text>
              <Text style={styles.stepDescription}>
                {`Within 24 hours, you'll receive a comprehensive analysis with clear, actionable insights tailored to your team's needs.`}
              </Text>
            </Section>

            <Section style={styles.step}>
              <Text style={styles.stepNumber}>{`4`}</Text>
              <Text style={styles.stepTitle}>{`Implement and Improve`}</Text>
              <Text style={styles.stepDescription}>
                {`Use our insights to adjust your strategies, improve player performance, and win more games.`}
              </Text>
            </Section>
          </Section>
        </Section>

        {/* Pricing Section */}
        <Section style={styles.pricingSection}>
          <Heading style={styles.sectionHeading}>
            {`Beta Pricing (Psst... It's a Steal!)`}
          </Heading>

          <Text style={styles.pricingIntro}>
            {`During the beta, we're offering special pricing that won't be available once we officially launch. Lock in these rates now!`}
          </Text>

          <Section style={styles.pricingContainer}>
            {pricingTiers.map((tier, index) => (
              <Section
                key={index}
                style={
                  index === 0 ? styles.pricingTier : styles.pricingTierFeatured
                }
              >
                <Text style={styles.pricingName}>{tier.name}</Text>
                <Text style={styles.pricingPrice}>{tier.price}</Text>
                <Text style={styles.pricingDescription}>
                  {tier.description}
                </Text>
                <Hr style={styles.pricingDivider} />
                <Section style={styles.pricingFeatures}>
                  {tier.features.map((feature, featureIndex) => (
                    <Text key={featureIndex} style={styles.pricingFeature}>
                      {`✓ ${feature}`}
                    </Text>
                  ))}
                </Section>
                <Button
                  style={
                    index === 0
                      ? styles.pricingButton
                      : styles.pricingButtonFeatured
                  }
                  href={`https://app.statoracle.com/beta-signup?plan=${tier.name
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {`Select ${tier.name}`}
                </Button>
              </Section>
            ))}
          </Section>

          <Text style={styles.pricingNote}>
            {`All plans come with a 14-day satisfaction guarantee. Not happy? We'll refund you, no questions asked.`}
          </Text>
        </Section>

        {/* Testimonials */}
        <Section style={styles.testimonialsSection}>
          <Heading style={styles.sectionHeading}>
            {`What Our Alpha Testers Say`}
          </Heading>

          <Section style={styles.testimonialsList}>
            {testimonials.map((testimonial, index) => (
              <Section key={index} style={styles.testimonialItem}>
                <Text style={styles.testimonialQuote}>
                  {`"${testimonial.quote}"`}
                </Text>
                <Text style={styles.testimonialAuthor}>
                  {`${testimonial.name}, ${testimonial.team}`}
                </Text>
              </Section>
            ))}
          </Section>
        </Section>

        {/* Beta Timeline */}
        <Section style={styles.timelineSection}>
          <Heading style={styles.sectionHeading}>{`Beta Timeline`}</Heading>

          <Section style={styles.timeline}>
            <Section style={styles.timelineItem}>
              <Text style={styles.timelineDate}>{`April 15, 2025`}</Text>
              <Text style={styles.timelineTitle}>{`Beta Launch`}</Text>
              <Text style={styles.timelineDescription}>
                {`Open beta begins with core features available to all testers.`}
              </Text>
            </Section>

            <Section style={styles.timelineItem}>
              <Text style={styles.timelineDate}>{`May 1, 2025`}</Text>
              <Text style={styles.timelineTitle}>{`Feature Update 1`}</Text>
              <Text style={styles.timelineDescription}>
                {`Advanced opponent analysis and enhanced visualization tools released.`}
              </Text>
            </Section>

            <Section style={styles.timelineItem}>
              <Text style={styles.timelineDate}>{`May 15, 2025`}</Text>
              <Text style={styles.timelineTitle}>{`Feature Update 2`}</Text>
              <Text style={styles.timelineDescription}>
                {`Mobile app beta launch with on-the-go analytics access.`}
              </Text>
            </Section>

            <Section style={styles.timelineItem}>
              <Text style={styles.timelineDate}>{`June 15, 2025`}</Text>
              <Text style={styles.timelineTitle}>{`Official Launch`}</Text>
              <Text style={styles.timelineDescription}>
                {`Beta concludes and StatOracle officially launches with all features.`}
              </Text>
            </Section>
          </Section>
        </Section>

        {/* Final CTA */}
        <Section style={styles.finalCtaSection}>
          <Heading style={styles.finalCtaHeading}>
            {`Ready to Transform Your Team's Performance?`}
          </Heading>
          <Text style={styles.finalCtaText}>
            {`Join the StatOracle beta today and be part of the sports analytics revolution. Limited spots available—first come, first served!`}
          </Text>
          <Button
            style={styles.finalCtaButton}
            href="https://app.statoracle.com/beta-signup"
          >
            {`Join the Beta Now`}
          </Button>
        </Section>

        {/* Footer */}
        <Section style={styles.footer}>
          <Text style={styles.footerTagline}>
            {`Bringing pro-level analytics to every court, field, and arena.`}
          </Text>
          <Hr style={styles.footerDivider} />
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
    backgroundColor: "#0a0e1a",
    padding: "24px",
    textAlign: "center",
    position: "relative",
  },
  logo: {
    display: "inline-block",
  },
  betaBadge: {
    position: "absolute",
    top: "24px",
    right: "24px",
    backgroundColor: "#22c55e",
    color: "#065f46",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },
  heroSection: {
    backgroundImage: "linear-gradient(135deg, #0a0e1a 0%, #1e293b 100%)",
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
    color: "#94a3b8",
    fontSize: "18px",
    margin: "0 0 32px",
    fontWeight: "normal",
  },
  betaDateSection: {
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    borderRadius: "12px",
    border: "1px solid rgba(34, 197, 94, 0.3)",
    padding: "24px",
    marginBottom: "32px",
  },
  betaDateLabel: {
    color: "#94a3b8",
    fontSize: "14px",
    fontWeight: "500",
    margin: "0 0 8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  betaDate: {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0",
  },
  ctaButton: {
    backgroundColor: "#22c55e",
    borderRadius: "8px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "14px 32px",
    textDecoration: "none",
    textTransform: "uppercase",
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
  highlightText: {
    backgroundColor: "#f0fdf4",
    borderLeft: "4px solid #22c55e",
    color: "#065f46",
    fontSize: "16px",
    lineHeight: "26px",
    margin: "0 0 24px",
    padding: "16px",
    borderRadius: "0 8px 8px 0",
  },
  sectionHeading: {
    color: "#1e293b",
    fontSize: "22px",
    fontWeight: "bold",
    margin: "0 0 24px",
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
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
    flexDirection: "column",
    gap: "24px",
  },
  step: {
    position: "relative",
    paddingLeft: "48px",
  },
  stepNumber: {
    position: "absolute",
    left: "0",
    top: "0",
    backgroundColor: "#22c55e",
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
  pricingSection: {
    padding: "32px 24px",
  },
  pricingIntro: {
    color: "#4b5563",
    fontSize: "16px",
    lineHeight: "26px",
    margin: "0 0 24px",
  },
  pricingContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  pricingTier: {
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    padding: "24px",
  },
  pricingTierFeatured: {
    backgroundColor: "#f0fdf4",
    borderRadius: "12px",
    border: "1px solid #22c55e",
    padding: "24px",
    boxShadow: "0 4px 8px rgba(34, 197, 94, 0.1)",
  },
  pricingName: {
    color: "#1e293b",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 8px",
  },
  pricingPrice: {
    color: "#0a0e1a",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "0 0 8px",
  },
  pricingDescription: {
    color: "#4b5563",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0 0 16px",
  },
  pricingDivider: {
    borderColor: "#e5e7eb",
    margin: "16px 0",
  },
  pricingFeatures: {
    margin: "0 0 24px",
  },
  pricingFeature: {
    color: "#4b5563",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0 0 8px",
  },
  pricingButton: {
    backgroundColor: "#1e293b",
    borderRadius: "8px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 24px",
    textDecoration: "none",
    textAlign: "center",
    width: "100%",
  },
  pricingButtonFeatured: {
    backgroundColor: "#22c55e",
    borderRadius: "8px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 24px",
    textDecoration: "none",
    textAlign: "center",
    width: "100%",
  },
  pricingNote: {
    color: "#6b7280",
    fontSize: "14px",
    fontStyle: "italic",
    margin: "24px 0 0",
    textAlign: "center",
  },
  testimonialsSection: {
    backgroundColor: "#f8fafc",
    padding: "32px 24px",
    borderTop: "1px solid #e5e7eb",
    borderBottom: "1px solid #e5e7eb",
  },
  testimonialsList: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  testimonialItem: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    padding: "24px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  testimonialQuote: {
    color: "#1e293b",
    fontSize: "16px",
    fontStyle: "italic",
    lineHeight: "26px",
    margin: "0 0 16px",
  },
  testimonialAuthor: {
    color: "#4b5563",
    fontSize: "15px",
    fontWeight: "bold",
    margin: "0",
  },
  timelineSection: {
    padding: "32px 24px",
  },
  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  timelineItem: {
    position: "relative",
    paddingLeft: "24px",
    borderLeft: "2px solid #22c55e",
    margin: "0 0 0 12px",
  },
  timelineDate: {
    color: "#22c55e",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0 0 8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  timelineTitle: {
    color: "#1e293b",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 8px",
  },
  timelineDescription: {
    color: "#4b5563",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0",
  },
  finalCtaSection: {
    backgroundImage: "linear-gradient(135deg, #0a0e1a 0%, #1e293b 100%)",
    color: "#ffffff",
    padding: "32px 24px",
    textAlign: "center",
  },
  finalCtaHeading: {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 0 16px",
  },
  finalCtaText: {
    color: "#94a3b8",
    fontSize: "16px",
    lineHeight: "26px",
    margin: "0 0 24px",
  },
  finalCtaButton: {
    backgroundColor: "#22c55e",
    borderRadius: "8px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "14px 32px",
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  footer: {
    backgroundColor: "#0a0e1a",
    color: "#9ca3af",
    padding: "32px 24px",
    textAlign: "center",
  },
  footerTagline: {
    color: "#94a3b8",
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
    color: "#94a3b8",
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

export default OpenBetaInviteTemplate;

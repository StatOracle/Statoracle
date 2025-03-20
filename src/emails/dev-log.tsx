import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Font,
  CodeBlock,
  dracula,
} from "@react-email/components";

export const DevLogTemplate = ({
  previewText = "StatOracle Dev Log: Behind the scenes of our latest build",
  logNumber = "042",
  sprintTitle = "Computer Vision Optimization Sprint",
  sprintDates = "March 12-18, 2025",
  buildVersion = "v0.4.2",
  updates = [
    {
      title: "Shot Detection Algorithm Improvements",
      description:
        "We've improved our CV model's shot detection accuracy from 87% to 94% by implementing a new frame interpolation technique.",
      technicalDetails:
        "The new approach uses a dual-phase detection system: first identifying player positions through pose estimation, then applying temporal filtering to track ball trajectories across frames.",
      codeSnippet:
`// Example of our new approach
const detectShots = async (videoFrames, settings) => {
  const playerPositions = await poseEstimation(videoFrames);
  const ballTrajectories = await trackBallMovement(
    videoFrames, settings
  );
  return analyzeTrajectories(
    ballTrajectories, playerPositions
  );
};`,
      completionStatus: "Complete",
      contributors: ["Alex", "Maya", "Jordan"],
    },
    {
      title: "Data Pipeline Optimization",
      description:
        "Reduced processing time by 40% and memory usage by 35% when handling multiple concurrent video streams.",
      technicalDetails:
        "Implemented streaming processing with chunked data handling instead of loading entire videos into memory.",
      codeSnippet: `// Before: ~2GB memory usage per video
const results = await processVideo(fullVideoBuffer);

// After: ~350MB peak memory usage
const processor = new StreamProcessor();
for (const chunk of videoChunks) {
  await processor.process(chunk);
}
const results = processor.getResults();`,
      completionStatus: "In Progress (85%)",
      contributors: ["Priya", "Tomas"],
    },
  ],
  knownIssues = [
    {
      title: "Memory leak in player tracking module",
      description:
        "We've identified a memory leak when tracking more than 12 players simultaneously. Working on a fix for the next build.",
      priority: "High",
      estimatedFix: "Next sprint",
    },
    {
      title: "False positives on distant court shots",
      description:
        "The shot detection algorithm occasionally misidentifies distant movements as shot attempts when the camera is positioned at certain angles.",
      priority: "Medium",
      estimatedFix: "Two sprints",
    },
  ],
  upcomingFeatures = [
    {
      title: "Real-time analysis API",
      description:
        "We're working on a streaming API that will provide instant feedback during live games.",
      targetRelease: "v0.5.0",
    },
    {
      title: "Multi-camera support",
      description:
        "Support for synchronized feeds from up to 4 camera angles for more accurate 3D positioning.",
      targetRelease: "v0.6.0",
    },
  ],
}) => (
  <Html>
    <Head>
      <Font
        fallbackFontFamily="monospace"
        fontFamily="CommitMono"
        fontStyle="normal"
        fontWeight={400}
        webFont={{
          url: "https://react.email/fonts/commit-mono/commit-mono-regular.ttf",
          format: "truetype",
        }}
      />
    </Head>
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
          <Text style={styles.devLogBadge}>DEV LOG #{logNumber}</Text>
        </Section>

        {/* Sprint Info */}
        <Section style={styles.sprintInfoSection}>
          <Heading style={styles.sprintTitle}>{sprintTitle}</Heading>
          <Text style={styles.sprintDates}>
            {sprintDates} • Build {buildVersion}
          </Text>
          <Text style={styles.sprintIntro}>
            {`Hey tech enthusiasts and sports analytics nerds! This is what we've been cooking up in our dev kitchen this sprint. Fair warning: technical jargon ahead!`}
          </Text>
        </Section>

        {/* Updates Section */}
        <Section style={styles.updatesSection}>
          <Heading style={styles.sectionHeading}>🚀 Sprint Updates</Heading>
          {updates.map((update, index) => (
            <Section key={index} style={styles.updateItem}>
              <Heading style={styles.updateHeading}>
                {update.title}
                <Text style={styles.completionStatus}>
                  {update.completionStatus}
                </Text>
              </Heading>
              <Text style={styles.updateDescription}>{update.description}</Text>
              <Text style={styles.techDetailsLabel}>Tech Details:</Text>
              <Text style={styles.techDetails}>{update.technicalDetails}</Text>
              <Text style={styles.codeLabel}>Code Snippet:</Text>
              <CodeBlock
                code={update.codeSnippet}
                fontFamily="'CommitMono', monospace"
                language="javascript"
                lineNumbers
                theme={dracula}
                style={styles.codeBlock}
              />
              <Text style={styles.contributors}>
                {`Contributors: ${update.contributors.join(", ")}`}
              </Text>
              {index < updates.length - 1 && <Hr style={styles.divider} />}
            </Section>
          ))}
        </Section>

        {/* Known Issues Section */}
        <Section style={styles.knownIssuesSection}>
          <Heading style={styles.sectionHeading}>🐛 Known Issues</Heading>
          {knownIssues.map((issue, index) => (
            <Section key={index} style={styles.issueItem}>
              <Heading style={styles.issueHeading}>
                {issue.title}
                <Text
                  style={{
                    ...styles.priorityBadge,
                    backgroundColor:
                      issue.priority === "High"
                        ? "#ef4444"
                        : issue.priority === "Medium"
                          ? "#f59e0b"
                          : "#22c55e",
                  }}
                >
                  {issue.priority}
                </Text>
              </Heading>
              <Text style={styles.issueDescription}>{issue.description}</Text>
              <Text style={styles.estimatedFix}>
                {`Estimated Fix: ${issue.estimatedFix}`}
              </Text>
            </Section>
          ))}
        </Section>

        {/* Upcoming Features */}
        <Section style={styles.upcomingSection}>
          <Heading style={styles.sectionHeading}>🔮 On the Horizon</Heading>
          {upcomingFeatures.map((feature, index) => (
            <Section key={index} style={styles.featureItem}>
              <Heading style={styles.featureHeading}>
                {feature.title}
                <Text style={styles.targetRelease}>
                  {`Target: ${feature.targetRelease}`}
                </Text>
              </Heading>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </Section>
          ))}
        </Section>

        {/* Feedback Section */}
        <Section style={styles.feedbackSection}>
          <Heading style={styles.feedbackHeading}>
            Got ideas or feedback?
          </Heading>
          <Text style={styles.feedbackText}>
            {`We're building this for you. If you have ideas on what would make StatOracle even better for your technical workflows, reply directly to this email or join our developer Discord.`}
          </Text>
          <Button
            style={styles.discordButton}
            href="https://discord.gg/statoracle-devs"
          >
            Join Our Developer Discord
          </Button>
        </Section>

        {/* Footer */}
        <Section style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 StatOracle, Inc. All rights reserved.
          </Text>
          <Text style={styles.footerText}>
            {`You're receiving these dev updates because you opted in to technical communications.`}
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
              href="https://statoracle.com/email-preferences"
            >
              Update Email Preferences
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

const styles: { [key: string]: React.CSSProperties } = {
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
  devLogBadge: {
    position: "absolute" as const,
    top: "24px",
    right: "24px",
    backgroundColor: "#6366f1",
    color: "#ffffff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  sprintInfoSection: {
    backgroundColor: "#0f172a",
    color: "#ffffff",
    padding: "24px",
  },
  sprintTitle: {
    color: "#ffffff",
    fontSize: "26px",
    fontWeight: "bold",
    margin: "0 0 8px",
  },
  sprintDates: {
    color: "#94a3b8",
    fontSize: "14px",
    margin: "0 0 16px",
    fontFamily: "monospace",
  },
  sprintIntro: {
    color: "#e2e8f0",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0",
  },
  updatesSection: {
    padding: "32px 24px",
    borderBottom: "1px solid #e2e8f0",
  },
  sectionHeading: {
    color: "#0f172a",
    fontSize: "22px",
    fontWeight: "bold",
    margin: "0 0 24px",
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
    display: "flex" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  },
  completionStatus: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "#64748b",
  },
  updateDescription: {
    color: "#334155",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0 0 16px",
  },
  techDetailsLabel: {
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "16px 0 4px",
  },
  techDetails: {
    color: "#334155",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0 0 16px",
  },
  codeLabel: {
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "16px 0 4px",
  },
  codeBlock: {
    backgroundColor: "#1e293b",
    color: "#e2e8f0",
    padding: "12px",
    borderRadius: "6px",
    fontSize: "13px",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    overflowX: "auto" as const,
    margin: "0 0 16px",
    lineHeight: "20px",
  },
  contributors: {
    color: "#64748b",
    fontSize: "14px",
    fontStyle: "italic" as const,
    margin: "16px 0 0",
  },
  divider: {
    borderColor: "#e2e8f0",
    margin: "24px 0",
  },
  knownIssuesSection: {
    padding: "32px 24px",
    borderBottom: "1px solid #e2e8f0",
  },
  issueItem: {
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
  },
  issueHeading: {
    color: "#0f172a",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 12px",
    display: "flex" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  },
  priorityBadge: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#ffffff",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  issueDescription: {
    color: "#334155",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0 0 12px",
  },
  estimatedFix: {
    color: "#64748b",
    fontSize: "14px",
    fontWeight: "bold",
  },
  upcomingSection: {
    padding: "32px 24px",
    borderBottom: "1px solid #e2e8f0",
  },
  featureItem: {
    marginBottom: "20px",
  },
  featureHeading: {
    color: "#0f172a",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 8px",
    display: "flex" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  },
  targetRelease: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "#64748b",
    fontFamily: "monospace",
  },
  featureDescription: {
    color: "#334155",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0",
  },
  feedbackSection: {
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    padding: "24px",
    margin: "32px 24px",
    textAlign: "center" as const,
  },
  feedbackHeading: {
    color: "#0f172a",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 16px",
  },
  feedbackText: {
    color: "#334155",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0 0 24px",
  },
  discordButton: {
    backgroundColor: "#5865f2",
    borderRadius: "6px",
    color: "#ffffff",
    display: "inline-block" as const,
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 24px",
    textDecoration: "none",
    textAlign: "center" as const,
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

export default DevLogTemplate;

import type React from "react"
import "./globals.css"
import { Inter, Manrope } from "next/font/google"
import type { Metadata } from "next"
import { Providers } from "@/app/Providers"
import { ReactLenis } from "@/utils/lenis";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

export const metadata: Metadata = {
  title: "StatOracle | AI-Powered Sports Analytics for Youth Teams",
  description:
    "StatOracle revolutionizes youth sports analytics with AI-powered insights. Join the waitlist to unlock game-changing performance metrics using computer vision and machine learning.",
  keywords: "sports analytics, AI sports, computer vision, youth sports, performance metrics, sports technology",
  openGraph: {
    title: "StatOracle | AI-Powered Sports Analytics",
    description: "Revolutionizing youth sports with elite-level insights through AI and computer vision.",
    url: "https://statoracle.com",
    siteName: "StatOracle",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StatOracle Analytics Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StatOracle | AI-Powered Sports Analytics",
    description: "Revolutionizing youth sports with elite-level insights through AI and computer vision.",
    images: ["/og-image.jpg"],
    creator: "@statoracle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`scroll-smooth ${inter.variable} ${manrope.variable}`}
    >
      <ReactLenis root>
        <body className="bg-light font-sans text-dark">
          <Providers>{children}</Providers>
          {/* <Analytics /> */}
        </body>
      </ReactLenis>
    </html>
  );
}

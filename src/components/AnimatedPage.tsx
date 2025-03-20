"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/lander/Navbar";
import Metrics from "@/components/lander/Metrics";
import Waitlist from "@/components/lander/Waitlist";
import Footer from "@/components/lander/Footer";
import Image from "next/image";
import Link from "next/link";

export default function AnimatedPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="bg-mesh-gradient relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
          <div className="absolute inset-0 bg-[url('/grid-overlay.png')] bg-cover opacity-10 mix-blend-overlay"></div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xs"
                >
                  <span className="text-sm font-medium">🚀 Now in Beta</span>
                </motion.div>

                <motion.h1
                  className="font-display text-4xl leading-[1.1] font-bold sm:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  AI-Powered Sports Analytics for{" "}
                  <span className="bg-linear-to-r from-yellow-200 to-amber-200 bg-clip-text text-transparent">
                    Youth Teams
                  </span>
                </motion.h1>

                <motion.p
                  className="max-w-xl text-lg text-white/80 sm:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {`Transform your team's performance with elite-level insights. Our computer vision technology tracks
                  every movement to deliver actionable analytics.`}
                </motion.p>

                <motion.div
                  className="flex flex-col gap-4 sm:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Link
                    href="#waitlist"
                    className="text-primary inline-flex items-center justify-center rounded-full bg-white/20 px-8 py-3 font-medium backdrop-blur-xs transition-all hover:bg-white/40"
                  >
                    Join the Waitlist
                  </Link>
                  <Link
                    href="#metrics"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 font-medium backdrop-blur-xs transition-all hover:bg-white/20"
                  >
                    See How It Works
                  </Link>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-primary h-8 w-8 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <p className="text-white/80">
                    Join <span className="font-medium text-white">500+</span>{" "}
                    teams already on the waitlist
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="glass-card relative aspect-4/3 overflow-hidden rounded-xl">
                  <Image
                    src="/dashboard-preview.jpg"
                    alt="StatOracle Dashboard"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="glass-card absolute right-6 -bottom-6 left-6 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">
                        Performance Score
                      </div>
                      <div className="text-2xl font-bold">92.5%</div>
                    </div>
                    <div className="h-24 w-24">
                      {/* Circular progress indicator could be here */}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <Metrics />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}

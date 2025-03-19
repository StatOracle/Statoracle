"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/lander/Navbar"
import Metrics from "@/components/lander/Metrics"
import Waitlist from "@/components/lander/Waitlist"
import Footer from "@/components/lander/Footer"
// import Image from "next/image"
import Link from "next/link"

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-overlay.png')] bg-cover opacity-10 mix-blend-overlay"></div>

          <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
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
                  className="inline-flex items-center gap-2 px-4 py-2 hover:scale-125 cursor-pointer rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <span className="text-sm font-medium">🚀 Now in Beta</span>
                </motion.div>

                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  AI-Powered Sports Analytics for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">
                    Youth Teams
                  </span>
                </motion.h1>

                <motion.p
                  className="text-lg sm:text-xl text-white/80 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {`Transform your team's performance with elite-level insights. Our computer vision technology tracks
                  every movement to deliver actionable analytics.`}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Link
                    href="#waitlist"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-full  text-yellow-500 font-medium backdrop-blur-sm bg-white/15 hover:bg-white/40 transition-all"
                  >
                    Join the Waitlist
                  </Link>
                  <Link
                    href="#metrics"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 font-medium hover:bg-white/20 transition-all"
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
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-primary" />
                    ))}
                  </div>
                  <p className="text-white/80">
                    Join <span className="font-medium text-white">500+</span> teams already on the waitlist
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative aspect-[4/3] rounded-xl  bg-black overflow-hidden glass-card">
                {/* TODO Replace with Dashboard Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute -bottom-6 left-6 right-6 p-4 glass-card rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">Performance Score</div>
                      <div className="text-2xl font-bold">92.5%</div>
                    </div>
                    <div className="w-24 h-24">{/* Add a circular progress indicator here if needed */}</div>
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
  )
}


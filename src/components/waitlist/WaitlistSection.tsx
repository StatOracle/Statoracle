// components/waitlist/WaitlistSection.tsx
import { WaitlistForm } from "./WaitlistForm";
import { RecentSignups } from "./RecentSignups";
import { motion } from "framer-motion";

export function WaitlistSection() {
  return (
    <section className="bg-neutral-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <motion.div
            className="w-full space-y-4 md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="mb-2 inline-block rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600">
              Limited spots available
            </div>
            <h2 className="mb-3 text-3xl font-medium text-neutral-900 md:text-4xl">
              {`Transform your team's performance with data-driven insights`}
            </h2>
            <p className="mb-6 text-neutral-600">
              StatOracle delivers affordable AI-powered analytics to help teams
              and athletes at all levels unlock their full potential.
            </p>

            <RecentSignups />

            <div className="pt-4">
              <a
                href="#book-demo"
                className="inline-flex items-center gap-2 font-medium text-neutral-900 transition-colors hover:text-neutral-700"
              >
                Already convinced? Book a demo
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 7H13M13 7L7 1M13 7L7 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
          >
            <div className="rounded-lg border border-neutral-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-medium text-neutral-900">
                Join our waitlist
              </h3>
              <WaitlistForm layout="section" />
            </div>
          </motion.div>
        </div>
      </div>

      <div id="book-demo" className="mt-24">
        <BookDemoSection />
      </div>
    </section>
  );
}

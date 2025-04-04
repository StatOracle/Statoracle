// components/waitlist/BookDemoSection.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { motion } from "framer-motion";

export function BookDemoSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <motion.div
            className="bg-neutral-900 p-8 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <h3 className="mb-4 text-2xl font-medium">
                  Book a personalized demo
                </h3>
                <p className="mb-6 text-neutral-300">
                  {`See how StatOracle can transform your team's performance with
                  personalized analytics.`}
                </p>

                <ul className="space-y-3">
                  {[
                    "Performance insights tailored to your team",
                    "AI-powered training recommendations",
                    "Affordable analytics for every budget",
                    "Simple onboarding process",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg
                        className="mt-0.5 h-5 w-5 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-neutral-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TODO: REDESIGN for much better looking quotes section */}
              <div className="mt-8">
                <p className="text-sm text-neutral-400">
                  {`"StatOracle helped us identify key areas for improvement that
                  we couldn't see before. Our team's performance has improved
                  dramatically."`}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-neutral-700"></div>
                  <div>
                    <p className="text-sm font-medium">
                      Coach Michael Thompson
                    </p>
                    <p className="text-xs text-neutral-400">
                      Westlake High Basketball
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
          >
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                  <svg
                    className="h-8 w-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-medium text-neutral-900">
                  Thank you!
                </h3>
                <p className="mb-6 text-neutral-600">
                  {`We've received your demo request and will be in touch within
                  24 hours to schedule a convenient time.`}
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="text-neutral-600"
                >
                  Request another demo
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="mb-4 text-xl font-medium text-neutral-900">
                  Schedule your demo
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      First name
                    </label>
                    <Input
                      required
                      className="border-neutral-200 focus:border-neutral-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Last name
                    </label>
                    <Input
                      required
                      className="border-neutral-200 focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Email
                  </label>
                  <Input
                    required
                    type="email"
                    className="border-neutral-200 focus:border-neutral-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Team/Organization
                  </label>
                  <Input
                    required
                    className="border-neutral-200 focus:border-neutral-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    What are you looking to achieve?
                  </label>
                  <Textarea
                    className="h-24 resize-none border-neutral-200 focus:border-neutral-900"
                    placeholder="Tell us about your team and goals..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-neutral-900 text-white hover:bg-neutral-800"
                >
                  Request Demo
                </Button>

                <p className="text-center text-xs text-neutral-500">
                  By submitting, you agree to our{" "}
                  <a href="#" className="underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline">
                    Terms of Service
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

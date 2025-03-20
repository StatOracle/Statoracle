"use client";

import { motion } from "framer-motion";
import { useToast } from "@/lib/hooks/use-toast";
import { createClient } from "@/utils/supabase/server";
import { useState } from "react";

export default function Waitlist() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const stats = [
    { value: "500+", label: "Teams on Waitlist" },
    { value: "15+", label: "Sports Supported" },
    { value: "98%", label: "Accuracy Rate" },
    { value: "24/7", label: "Support" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting email:", email);

    const supabase = await createClient();
    const { error } = await supabase.from("waitlist").insert({ email: email });
    if (error) {
      console.error("Supabase error:", error);
      toast({
        title: "Error",
        description: `There was an error joining the waitlist: ${error.message}`,
      });
    } else {
      toast({
        title: "Success! 🎉",
        description: "Thanks for joining the waitlist. We'll be in touch soon!",
      });
    }
  };

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-black py-24 text-white md:py-32"
    >
      <div className="absolute inset-0 bg-[url('/grid-overlay.png')] bg-cover opacity-10 mix-blend-overlay"></div>

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            variants={item}
            className="mb-8 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xs"
          >
            <span className="text-sm font-medium">Join the Future 🚀</span>
          </motion.div>

          <motion.h2
            variants={item}
            className="font-display mb-4 bg-linear-to-r from-yellow-400 to-amber-200 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
          >
            Be Among the First to Experience
          </motion.h2>

          <motion.p variants={item} className="mb-12 text-xl text-white/80">
            Get early access to AI-powered insights that will revolutionize your
            game.
          </motion.p>

          <motion.form
            variants={item}
            onSubmit={handleSubmit}
            className="mx-auto mb-16 max-w-md"
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white backdrop-blur-xs placeholder:text-white/60 focus:ring-2 focus:ring-white/30 focus:outline-hidden"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-full bg-white/20 px-8 py-4 font-bold text-yellow-500 backdrop-blur-xs transition-all hover:bg-white/40"
              >
                Join Waitlist
              </button>
            </div>
          </motion.form>

          <motion.div
            variants={container}
            className="grid grid-cols-2 gap-8 text-center md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="glass-card rounded-xl p-6"
              >
                <motion.div
                  className="mb-2 text-3xl font-bold"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

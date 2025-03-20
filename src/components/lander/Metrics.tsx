"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Metrics() {
  const [activeTab, setActiveTab] = useState<
    "tennis" | "soccer" | "basketball"
  >("tennis");

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
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const sportTabs = [
    { id: "tennis", label: "Tennis 🎾" },
    { id: "soccer", label: "Soccer ⚽" },
    { id: "basketball", label: "Basketball 🏀" },
  ];

  const metrics = {
    tennis: [
      {
        title: "Drop Shot Effectiveness",
        icon: "🎯",
        description:
          "Track success rate across sets to identify fatigue patterns and optimal timing.",
        data: [
          { label: "Set 1", value: "82% Success", progress: 82 },
          { label: "Set 2", value: "75% Success", progress: 75 },
          { label: "Set 3", value: "58% Success", progress: 58 },
        ],
        insight:
          "Consider using drop shots primarily in first two sets for maximum effectiveness.",
      },
      {
        title: "Opponent Shot Patterns",
        icon: "📊",
        description:
          "Predict their next move based on previous rallies and pressure situations.",
        imagePath: "/tennis-heatmap.jpg",
        stats: [
          {
            label: "After Backhand Down the Line",
            value: "78% Cross-Court Return",
          },
          { label: "Under Pressure (Break Point)", value: "64% Wide Serve" },
        ],
        insight:
          "Position yourself for cross-court returns after your down-the-line shots.",
      },
    ],
    soccer: [
      {
        title: "Movement Heatmaps",
        icon: "🏃‍♂️",
        description:
          "Identify underutilized field areas and optimize player positioning.",
        imagePath: "/soccer-heatmap.jpg",
        stats: [
          { label: "Left Wing Utilization", value: "32% Below Average" },
          {
            label: "Counter-Attack Speed",
            value: "2.8s Faster than Opponents",
          },
        ],
        insight:
          "Team tends to favor right side attacks. Consider developing left wing strategies.",
      },
      {
        title: "Pass Success Under Pressure",
        icon: "⚡",
        description:
          "Analyze decision-making in high-stress moments for tactical adjustments.",
        data: [
          { label: "Open Play", value: "78% Success", progress: 78 },
          {
            label: "Under Opposition Press",
            value: "62% Success",
            progress: 62,
          },
          { label: "Final Third", value: "44% Success", progress: 44 },
        ],
        insight:
          "Implement high-pressure training drills to improve decision making in the final third.",
      },
    ],
    basketball: [
      {
        title: "Shot Arc Optimization",
        icon: "🎯",
        description:
          "Detect optimal shooting angles and adjust technique for improved accuracy.",
        imagePath: "/basketball-shot-arc.jpg",
        stats: [
          { label: "Current Arc Angle", value: "42° (Average)" },
          { label: "Optimal Range", value: "45°-52° for your height" },
        ],
        insight:
          "Increasing shot arc by 3-5° could improve three-point percentage by up to 8%.",
      },
      {
        title: "Defensive Positioning",
        icon: "🛡️",
        description:
          "Track defensive stance and reaction time for better court coverage.",
        data: [
          {
            label: "Lateral Movement Speed",
            value: "1.8s baseline-to-baseline",
            progress: 85,
          },
          { label: "Help Defense Success", value: "67% stops", progress: 67 },
          { label: "Recovery Time", value: "2.1s average", progress: 75 },
        ],
        insight:
          "Focus on reducing recovery time after help defense situations.",
      },
    ],
  };

  return (
    <section id="metrics" className="bg-black py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-7xl px-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <motion.div variants={item} className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-yellow-300/10 px-4 py-2 text-white">
            Performance Metrics
          </div>
          <h2 className="font-display mb-4 bg-linear-to-r from-yellow-400 to-amber-200 bg-clip-text text-4xl font-bold text-transparent">
            Data-Driven Insights
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Discover how our AI-powered analytics transform raw data into
            actionable insights.
          </p>
        </motion.div>

        {/* Updated Sport Tabs with Dynamic Pill */}
        <motion.div variants={item} className="mb-12 flex justify-center">
          <div className="relative inline-flex rounded-full border-[0.8px] border-gray-200 bg-white/20 p-1 dark:border-white/35 dark:bg-gray-800">
            {sportTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-full px-6 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeTab === tab.id
                    ? "text-black"
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-yellow-500"
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                )}
                <span className="relative z-10 text-black">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 md:grid-cols-2"
          >
            {metrics[activeTab].map((metric, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="rounded-xl border border-white bg-black p-6 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="mb-4 flex items-center space-x-3">
                  <span className="text-2xl">{metric.icon}</span>
                  <h3 className="text-xl font-bold text-white">
                    {metric.title}
                  </h3>
                </div>

                <p className="mb-6 text-gray-400">{metric.description}</p>

                {metric.data && (
                  <div className="space-y-4">
                    {metric.data.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                          <span className="text-sm font-medium text-yellow-500">
                            {item.value}
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                          <motion.div
                            className="h-2 rounded-full bg-yellow-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{
                              type: "spring",
                              stiffness: 250,
                              damping: 20,
                              delay: idx * 0.2,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {metric.imagePath && (
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative h-48 w-full overflow-hidden rounded-lg">
                      <Image
                        src={metric.imagePath || "/placeholder.svg"}
                        alt={metric.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {metric.stats && (
                      <motion.div
                        className="mt-4 space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {metric.stats.map((stat, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-600">{stat.label}</span>
                            <span className="font-medium">{stat.value}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {metric.insight && (
                  <motion.div
                    className="bg-primary/5 border-primary/10 mt-4 rounded-lg border p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-primary mb-1 flex items-center space-x-2">
                      <span className="text-sm">💡</span>
                      <span className="text-sm font-medium text-yellow-500">
                        Key Insight
                      </span>
                    </div>
                    <p className="text-sm text-white">{metric.insight}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navItems = [
    { name: "Metrics", href: "#metrics" },
    { name: "Waitlist", href: "#waitlist" },
  ];

  const underlineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      scaleX: 0,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <motion.nav
      className="fixed top-0 z-50 w-full border-b border-gray-100 bg-black/70 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/statoraclelogo.webp"
              alt="StatOracle Logo"
              width={30}
              height={30}
              className="rounded-md"
            />
            <span className="bg-linear-to-r from-yellow-500 to-amber-300 bg-clip-text text-xl font-bold text-transparent">
              StatOracle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-3 py-2 text-gray-500 transition-colors hover:text-amber-300"
                onMouseEnter={() => setHoveredLink(item.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {item.name}
                <AnimatePresence>
                  {hoveredLink === item.name && (
                    <motion.div
                      className="absolute right-0 bottom-1 left-0 h-[1px] origin-center bg-gray-700"
                      variants={underlineVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    />
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
            aria-label="Navigation menu"
          >
            <motion.div
              className="relative h-6 w-6"
              animate={isOpen ? "open" : "closed"}
            >
              <motion.span
                className="absolute block h-[2px] w-6 bg-gray-700"
                variants={{
                  closed: { top: "0.25rem", rotate: 0 },
                  open: { top: "0.75rem", rotate: 45 },
                }}
              />
              <motion.span
                className="absolute block h-[2px] w-6 bg-gray-700"
                variants={{
                  closed: { top: "0.75rem", rotate: 0 },
                  open: { top: "0.75rem", rotate: -45 },
                }}
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-white/95 backdrop-blur-lg md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center space-y-6 pt-24">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group text-2xl font-medium text-gray-800 transition-colors hover:text-cyan-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                    <span className="block h-[1px] origin-center scale-x-0 bg-gray-400 transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

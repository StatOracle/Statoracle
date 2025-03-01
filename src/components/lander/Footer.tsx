"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ExternalLinkModal from "@/components/ui/ExternalLinkModal";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");

  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Sports", href: "#" },
        { label: "Case Studies", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "API", href: "#" },
        { label: "Status", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Security", href: "#" },
        { label: "Cookies", href: "#" }
      ]
    }
  ];

  const externalLinks = [
    {
      label: "Twitter",
      href: "https://twitter.com/sample",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    {
      label: "GitHub",
      href: "https://github.com/StatOracle",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/StatOracle",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      label: "Instagram",
      href: "https://instagram.com/StatOracle",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.75 2h8.5C19.097 2 22 4.903 22 8.75v8.5C22 19.097 19.097 22 16.25 22h-8.5C4.903 22 2 19.097 2 16.25v-8.5C2 4.903 4.903 2 7.75 2zm0 2C5.678 4 4 5.678 4 7.75v8.5C4 18.322 5.678 20 7.75 20h8.5c2.072 0 3.75-1.678 3.75-3.75v-8.5C20 5.678 18.322 4 16.25 4h-8.5z" />
          <path d="M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM17.5 6a1 1 0 110 2 1 1 0 010-2z" />
        </svg>
      )
    }
  ];

  const handleExternalLinkClick = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
    e.preventDefault();
    setModalUrl(url);
    setModalOpen(true);
  };

  return (
    <>
      <footer className="bg-black border-t">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {footerSections.map((section) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-bold mb-4 text-white ">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-white hover:text-yellow-500 transition-colors text-sm">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 ">
                <Image src="/statoraclelogo.webp" className="rounded-xl shadow-sm shadow-yellow-500" alt="StatOracle Logo" width={30} height={30} />
                <Link href="/" className="text-xl text-yellow-500 font-bold">
                  StatOracle
                </Link>
                <span className="text-sm text-gray-600">© {currentYear} StatOracle. All rights reserved.</span>
              </div>
              <div className="flex space-x-6">
                {externalLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={(e) => handleExternalLinkClick(e, link.href)}
                    className="text-yellow-500/80 hover:text-yellow-500"
                  >
                    <span className="sr-only">{link.label}</span>
                    {link.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ExternalLinkModal isOpen={modalOpen} url={modalUrl} onClose={() => setModalOpen(false)} />
    </>
  );
}

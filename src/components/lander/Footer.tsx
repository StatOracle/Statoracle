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

  const externalLinks = [
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
      label: "Twitter",
      href: "https://x.com/Stat_Oracle",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-twitter-icon lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
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
      <footer className="bg-black ">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          </div>
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 ">
                <span className="text-sm text-gray-600">© {currentYear} StatOracle. All rights reserved.</span>
              </div>
              <div className="flex space-x-6">
                {externalLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={(e) => handleExternalLinkClick(e, link.href)}
                    className="text-yellow-500/90 hover:text-yellow-500"
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

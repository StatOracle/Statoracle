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

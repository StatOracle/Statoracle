// components/waitlist/WaitlistButton.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WaitlistModal } from "./WaitlistModal";
import { motion } from "framer-motion";

export function WaitlistButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-neutral-900 px-6 py-6 text-white transition-colors hover:bg-neutral-800"
        >
          <span className="mr-2">Join Waitlist</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </motion.div>
      <WaitlistModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

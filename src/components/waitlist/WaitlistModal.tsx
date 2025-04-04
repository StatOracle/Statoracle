// components/waitlist/WaitlistModal.tsx
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { WaitlistForm } from "./WaitlistForm";
import { motion, AnimatePresence } from "framer-motion";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="overflow-hidden rounded-lg border-0 bg-white p-0 shadow-xl sm:max-w-xl">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-6 py-8">
                <h2 className="mb-1 text-2xl font-medium text-neutral-900">
                  Join the waitlist
                </h2>
                <p className="mb-6 text-neutral-500">
                  {`Be among the first to experience StatOracle's analytics
                  platform.`}
                </p>
                <WaitlistForm onSuccess={onClose} layout="modal" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

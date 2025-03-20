"use client";

import { FC } from "react";

type ExternalLinkModalProps = {
  isOpen: boolean;
  url: string;
  onClose: () => void;
};

const ExternalLinkModal: FC<ExternalLinkModalProps> = ({
  isOpen,
  url,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    window.open(url, "_blank");
    onClose();
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Leave Site?</h2>
        <p className="mb-6">You are about to leave our site. Continue?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Leave Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExternalLinkModal;

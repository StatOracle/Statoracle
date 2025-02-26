"use client";

import { FC } from "react";

type ExternalLinkModalProps = {
  isOpen: boolean;
  url: string;
  onClose: () => void;
};

const ExternalLinkModal: FC<ExternalLinkModalProps> = ({ isOpen, url, onClose }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    window.open(url, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-4">Leave Site?</h2>
        <p className="mb-6">You are about to leave our site. Continue?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Leave Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExternalLinkModal;

import React, { useState } from "react";

const NoContactModal = ({ setIsContactFound }) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    setIsContactFound(true);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="mx-auto max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">
              Contact could not be found.
            </h2>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={closeModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NoContactModal;

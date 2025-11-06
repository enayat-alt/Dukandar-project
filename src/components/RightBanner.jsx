import React, { useState } from "react";

const RightBanner = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed top-1/3 right-0 bg-pink-600 text-white rounded-l-lg shadow-lg transition-all duration-300 z-50 cursor-pointer
        ${isOpen ? "w-64 p-4" : "w-12 p-2"}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? (
        <div className="flex flex-col justify-between h-full">
          {/* Banner Header */}
          <h3 className="font-bold text-lg mb-2">Special Offer!</h3>

          {/* Banner Content */}
          <p className="text-sm mb-4">
            Get 20% off on your first order. Click below to claim your coupon!
          </p>

          {/* Action Button */}
          <button className="bg-white text-pink-600 px-3 py-1 rounded hover:bg-gray-100">
            Claim Now
          </button>

          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-white text-xl hover:text-gray-200"
            onClick={(e) => {
              e.stopPropagation(); // Prevent toggling parent click
              setIsOpen(false);
            }}
          >
            &times;
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="rotate-90 font-bold">Offer</span>
        </div>
      )}
    </div>
  );
};

export default RightBanner;

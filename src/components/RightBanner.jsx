

import React, { useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer"; // MUI discount tag icon

const RightBanner = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed top-32 right-4 bg-gray-600 text-white rounded-l-lg shadow-lg transition-all duration-300 z-50 cursor-pointer
        ${isOpen ? "w-64 h-56 p-4" : "w-12 h-56 p-2"}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? (
        <div className="flex flex-col justify-between h-full relative">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-white text-xl hover:text-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            &times;
          </button>

          {/* Banner Header */}
          <h3 className="font-bold text-lg mb-2">Upto ₹500 Off!</h3>

          {/* Banner Content */}
          <p className="text-sm mb-4">
            On selected products only. Limited time offer!
          </p>

          {/* Action Button */}
          <button className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100 w-full">
            Shop Now
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-1">
          <LocalOfferIcon fontSize="small" />
          <span className="text-[10px] font-bold text-white text-center">
            Upto ₹500
          </span>
        </div>
      )}
    </div>
  );
};

export default RightBanner;

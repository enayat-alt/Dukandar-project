// src/components/RightBannerWrapper.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import RightBanner from "./RightBanner.jsx"; // your existing banner component

const RightBannerWrapper = () => {
  const location = useLocation();

  // Only show on Home page
  if (location.pathname !== "/") return null;

  return <RightBanner />;
};

export default RightBannerWrapper;

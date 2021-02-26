import React from "react";
import { useMediaQuery } from "react-responsive";

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 786px)",
  });

  return isMobile ? children : null;
};

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 787px)",
  });
  return isDesktop ? children : null;
};

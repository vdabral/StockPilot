import React from "react";
import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled CircularProgress component
const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: "var(--blue)", // Use theme color
  "& .MuiCircularProgress-circle": {
    strokeLinecap: "round",
  },
}));

// Loader overlay container
const LoaderContainer = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(17, 24, 39, 0.7)", // dark overlay
  backdropFilter: "blur(4px)",
  zIndex: 9999,
  transition: "all 0.3s ease-in-out",
});

/**
 * Loader component with customizable props
 * @metadata
 * @timestamp 2025-03-20 16:40:58
 * @user vdabral
 */
function Loader({ size = 40, thickness = 4, message, overlay = true }) {
  const loaderElement = (
    <div className="flex flex-col items-center gap-4">
      <StyledCircularProgress
        size={size}
        thickness={thickness}
        data-testid="loader"
      />
      {message && (
        <p className="text-gray-300 text-sm animate-pulse">{message}</p>
      )}
    </div>
  );

  // If overlay is false, return just the loader
  if (!overlay) {
    return <div className="flex justify-center p-4">{loaderElement}</div>;
  }

  // Return loader with overlay
  return <LoaderContainer>{loaderElement}</LoaderContainer>;
}

export default Loader;

import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Enhanced styled ToggleButtonGroup
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: "rgba(30, 41, 59, 0.5)",
  backdropFilter: "blur(12px)",
  borderRadius: "1rem",
  padding: "0.25rem",
  gap: "0.25rem",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
}));

// Enhanced styled ToggleButton
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  border: "none",
  borderRadius: "0.75rem !important",
  color: "#94A3B8 !important",
  backgroundColor: "transparent",
  padding: "0.75rem 1.5rem",
  fontSize: "0.875rem",
  fontWeight: 500,
  textTransform: "none",
  transition: "all 0.2s ease-in-out !important",
  "&:hover": {
    backgroundColor: "rgba(51, 65, 85, 0.5)",
    transform: "translateY(-1px)",
  },
  "&.Mui-selected": {
    backgroundColor: "#3B82F6 !important",
    color: "#FFFFFF !important",
    transform: "scale(1.05)",
    boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.5)",
    "&:hover": {
      backgroundColor: "#2563EB !important",
    },
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(30, 41, 59, 0.95)",
          backdropFilter: "blur(8px)",
          padding: "0.75rem 1rem",
          fontSize: "0.75rem",
          borderRadius: "0.5rem",
        },
        arrow: {
          color: "rgba(30, 41, 59, 0.95)",
        },
      },
    },
  },
});

const toggleOptions = [
  {
    value: "prices",
    label: "Prices",
    icon: AttachMoneyIcon,
    description: "View price changes over time",
    color: "#22C55E", // green-500
  },
  {
    value: "market_caps",
    label: "Market Cap",
    icon: ShowChartIcon,
    description: "Track market capitalization trends",
    color: "#3B82F6", // blue-500
  },
  {
    value: "total_volumes",
    label: "Volume",
    icon: BarChartIcon,
    description: "Monitor trading volume activity",
    color: "#A855F7", // purple-500
  },
];

export default function ToggleComponents({ priceType, handlePriceTypeChange }) {
  const [hoveredOption, setHoveredOption] = useState(null);

  return (
    <div
      className="space-y-6"
      data-timestamp="2025-03-20 17:18:59"
      data-user="vdabral"
    >
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-200">Data Type</h3>
          <Tooltip
            title="Select the type of data to display in the chart"
            arrow
            placement="top"
          >
            <InfoOutlinedIcon className="w-4 h-4 text-gray-400 cursor-help" />
          </Tooltip>
        </div>
      </div>

      <div className="flex justify-center relative">
        <ThemeProvider theme={theme}>
          <StyledToggleButtonGroup
            value={priceType}
            exclusive
            onChange={handlePriceTypeChange}
            aria-label="Price data type"
          >
            {toggleOptions.map((option) => (
              <Tooltip
                key={option.value}
                title={
                  <div className="text-center">
                    <p className="font-medium mb-1">{option.label}</p>
                    <p className="text-gray-300 text-xs">
                      {option.description}
                    </p>
                  </div>
                }
                arrow
                placement="top"
                TransitionComponent={Zoom}
                enterDelay={400}
                leaveDelay={200}
              >
                <StyledToggleButton
                  value={option.value}
                  aria-label={option.label}
                  onMouseEnter={() => setHoveredOption(option.value)}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  <span className="flex items-center gap-2">
                    <option.icon
                      className={`w-4 h-4 transition-colors duration-300`}
                      style={{
                        color:
                          priceType === option.value
                            ? "#fff"
                            : hoveredOption === option.value
                            ? option.color
                            : "#94A3B8",
                      }}
                    />
                    <span className="relative">
                      {option.label}
                      {priceType === option.value && (
                        <span
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-white rounded-full"
                          style={{
                            animation: "width 0.3s ease-in-out",
                          }}
                        />
                      )}
                    </span>
                  </span>
                </StyledToggleButton>
              </Tooltip>
            ))}
          </StyledToggleButtonGroup>
        </ThemeProvider>
      </div>

      {/* Quick explanation of current selection */}
      <div className="text-center">
        <p className="text-sm text-gray-400 animate-fade-in">
          {toggleOptions.find((opt) => opt.value === priceType)?.description}
        </p>
      </div>
    </div>
  );
}

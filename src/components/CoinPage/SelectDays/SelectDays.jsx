import React, { useState, useCallback } from "react";
import { MenuItem, Select, Tooltip, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Styled components
const StyledSelect = styled(Select)(({ theme }) => ({
  height: "2.8rem",
  color: "#F3F4F6",
  transition: "all 0.2s ease-in-out",
  backdropFilter: "blur(8px)",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(243, 244, 246, 0.4)",
    transition: "all 0.2s ease-in-out",
  },
  "& .MuiSvgIcon-root": {
    color: "#F3F4F6",
    transition: "transform 0.2s ease-in-out",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3B82F6",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3B82F6",
    borderWidth: "2px",
  },
  "&.Mui-focused .MuiSvgIcon-root": {
    transform: "rotate(180deg)",
  },
}));

// Enhanced theme
const theme = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#1F2937",
          padding: "0.75rem 1rem",
          transition: "all 0.2s ease-in-out",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          "&:hover": {
            backgroundColor: "#EFF6FF",
            transform: "translateX(4px)",
          },
          "&.Mui-selected": {
            backgroundColor: "#BFDBFE",
            "&:hover": {
              backgroundColor: "#93C5FD",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        },
      },
    },
  },
});

const timeOptions = [
  { value: 7, label: "7 Days", description: "Short-term trend" },
  { value: 30, label: "30 Days", description: "Monthly overview" },
  { value: 60, label: "60 Days", description: "Bi-monthly analysis" },
  { value: 90, label: "90 Days", description: "Quarterly view" },
  { value: 120, label: "120 Days", description: "4-month perspective" },
  { value: 365, label: "1 Year", description: "Annual performance" },
];

function SelectDays({ days, handleDaysChange, noPTag, isLoading }) {
  const [hoveredOption, setHoveredOption] = useState(null);

  const handleChange = useCallback(
    (event) => {
      handleDaysChange(event);
      // Optional: Add analytics tracking here
    },
    [handleDaysChange]
  );

  const QuickSelectButton = ({ day }) => (
    <Tooltip
      title={timeOptions.find((opt) => opt.value === day)?.description}
      arrow
      placement="top"
      TransitionComponent={Fade}
      enterDelay={400}
    >
      <button
        onClick={() => handleChange({ target: { value: day } })}
        className={`
          px-4 py-1.5 rounded-full text-sm font-medium
          transition-all duration-300 transform
          hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900
          ${
            days === day
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
              : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
          }
        `}
      >
        {day}D
      </button>
    </Tooltip>
  );

  return (
    <div
      className="space-y-4"
      data-timestamp="2025-03-20 17:16:52"
      data-user="John Doe"
    >
      <div className={`flex items-center gap-4 ${!noPTag && "mb-4"}`}>
        {!noPTag && (
          <div className="flex items-center gap-2">
            <CalendarTodayIcon className="text-gray-400 w-4 h-4" />
            <span className="text-gray-200 text-sm font-medium">
              Time Range
            </span>
            <Tooltip
              title="Select a time range to view price changes"
              arrow
              placement="top"
            >
              <InfoOutlinedIcon className="text-gray-400 w-4 h-4 cursor-help" />
            </Tooltip>
          </div>
        )}

        <ThemeProvider theme={theme}>
          <div className="relative min-w-[160px]">
            <StyledSelect
              value={days}
              onChange={handleChange}
              className="w-full bg-gray-800/50 backdrop-blur-sm rounded-lg"
              disabled={isLoading}
              MenuProps={{
                PaperProps: {
                  className: "mt-2 bg-white rounded-xl shadow-xl",
                  style: {
                    maxHeight: "400px",
                  },
                },
                TransitionProps: {
                  timeout: 200,
                },
              }}
            >
              {timeOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  className="text-sm"
                  onMouseEnter={() => setHoveredOption(option.value)}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  <span className="flex items-center gap-2">
                    <CalendarTodayIcon
                      className={`w-4 h-4 transition-colors ${
                        hoveredOption === option.value
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                    />
                    {option.label}
                  </span>
                  {hoveredOption === option.value && (
                    <span className="ml-auto text-xs text-gray-500">
                      {option.description}
                    </span>
                  )}
                </MenuItem>
              ))}
            </StyledSelect>

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-lg">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </ThemeProvider>

        <div className="hidden lg:flex items-center gap-2">
          {[7, 30].map((day) => (
            <QuickSelectButton key={day} day={day} />
          ))}
        </div>
      </div>

      {/* Mobile Quick Select */}
      <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {timeOptions.map((option) => (
          <QuickSelectButton key={option.value} day={option.value} />
        ))}
      </div>
    </div>
  );
}

export default SelectDays;

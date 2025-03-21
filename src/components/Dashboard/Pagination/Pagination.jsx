import React from "react";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "../../../contexts/themeContext/ThemeContext"; // Use theme context

export default function PaginationControlled({ page, handlePageChange }) {
  const { theme } = useTheme(); // Use theme context

  // Create a custom theme for the Pagination component
  const muiTheme = createTheme({
    components: {
      MuiPagination: {
        styleOverrides: {
          root: {
            "& .MuiPaginationItem-root": {
              color: theme === "dark" ? "white" : "black",
              borderColor: theme === "dark" ? "#374151" : "#E5E7EB", // dark:border-gray-700 or light:border-gray-300
              "&:hover": {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(59, 130, 246, 0.1)"
                    : "rgba(59, 130, 246, 0.1)", // hover:bg-blue-500/10
              },
              "&.Mui-selected": {
                backgroundColor: "#3B82F6", // bg-blue-500
                borderColor: "#3B82F6",
                "&:hover": {
                  backgroundColor: "#2563EB", // hover:bg-blue-600
                },
              },
            },
          },
        },
      },
    },
  });

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <div
        className={`backdrop-blur-sm rounded-xl p-4 shadow-lg ${
          theme === "dark"
            ? "bg-gray-800/50 border-gray-700/50"
            : "bg-white border-gray-300"
        }`}
      >
        <ThemeProvider theme={muiTheme}>
          <Pagination
            count={10}
            page={page}
            onChange={handlePageChange}
            size="large"
            className="pagination"
            // Add current time and user info as data attributes for tracking
            data-timestamp="2025-03-20 13:10:35"
            data-user="vdabral"
          />
        </ThemeProvider>
      </div>
    </div>
  );
}

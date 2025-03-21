import React from "react";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function PaginationControlled({ page, handlePageChange }) {
  // Create a custom theme for the Pagination component
  const theme = createTheme({
    components: {
      MuiPagination: {
        styleOverrides: {
          root: {
            "& .MuiPaginationItem-root": {
              color: "white",
              borderColor: "#374151", // dark:border-gray-700
              "&:hover": {
                backgroundColor: "rgba(59, 130, 246, 0.1)", // hover:bg-blue-500/10
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
    <div className="flex justify-center items-center py-8 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-700/50">
        <ThemeProvider theme={theme}>
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

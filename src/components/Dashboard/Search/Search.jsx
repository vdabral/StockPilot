import React from "react";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "../../../contexts/themeContext/ThemeContext";

const Search = ({ search, handleChange, handleReset }) => {
  const { theme } = useTheme(); // Use theme context

  return (
    <div className="relative max-w-md w-full mx-auto">
      {/* Search Container */}
      <div
        className={`relative flex items-center ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } border border-gray-600/50 rounded-xl overflow-hidden transition-all duration-300 
        focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 group`}
      >
        {/* Search Icon */}
        <div className="flex items-center justify-center px-3">
          <SearchIcon
            className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
            sx={{ fontSize: "1.2rem" }}
          />
        </div>

        {/* Search Input */}
        <input
          type="text"
          className="w-full py-3 px-4 bg-transparent placeholder-gray-400 outline-none text-sm"
          placeholder="Search coins..."
          value={search}
          onChange={(e) => handleChange(e)}
          aria-label="Search coins"
        />

        {/* Reset Button */}
        {search && (
          <button
            onClick={handleReset}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <CloseIcon sx={{ fontSize: "1.2rem" }} />
          </button>
        )}
      </div>

      {/* Search Info */}
      <div className="mt-2 flex justify-between items-center px-2">
        <p className="text-xs text-gray-400">Press Enter to search</p>
        {search && (
          <p className="text-xs text-gray-400">
            Found {/* Add dynamic result count here */} results
          </p>
        )}
      </div>
    </div>
  );
};

Search.propTypes = {
  search: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
};

export default Search;

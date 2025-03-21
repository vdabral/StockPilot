import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function Search({ search, handleChange }) {
  const currentTime = "2025-03-20 13:12:16";
  const currentUser = "vdabral";

  return (
    <div className="relative max-w-md w-full mx-auto">
      {/* Search Container */}
      <div className="relative flex items-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 group">
        {/* Search Icon */}
        <div className="flex items-center justify-center pl-4">
          <SearchIcon
            className="text-gray-400 group-hover:text-blue-400 group-focus-within:text-blue-400 transition-colors duration-300"
            sx={{ fontSize: "1.2rem" }}
          />
        </div>

        {/* Search Input */}
        <input
          type="text"
          className="w-full py-3 px-4 bg-transparent text-gray-200 placeholder-gray-400 outline-none text-sm"
          placeholder="Search coins..."
          value={search}
          onChange={(e) => handleChange(e)}
          aria-label="Search coins"
          data-timestamp={currentTime}
          data-user={currentUser}
        />

        {/* Dynamic Search Info - Optional */}
        {search && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
              Searching...
            </span>
          </div>
        )}
      </div>

      {/* Optional: Search Stats */}
      <div className="mt-2 flex justify-between items-center px-2">
        <p className="text-xs text-gray-400">Press Enter to search</p>
        {search && (
          <p className="text-xs text-gray-400">
            Found {/* Add your count here */} results
          </p>
        )}
      </div>

      {/* Optional: Search Animation */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-xl blur-xl group-hover:opacity-75 opacity-0 transition-opacity duration-500 -z-10" />
    </div>
  );
}

export default Search;

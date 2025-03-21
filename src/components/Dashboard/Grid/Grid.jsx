import React, { useState, memo, useCallback } from "react";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { motion } from "framer-motion";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "../../../contexts/themeContext/ThemeContext";

// Format currency with proper formatting and handling edge cases
const formatCurrency = (value, maximumFractionDigits = 2) => {
  if (value === null || value === undefined) return "N/A";

  // Handle very small numbers better (less than 0.01)
  if (value < 0.01 && value > 0) {
    return `$${value.toFixed(6)}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(value);
};

// Format large numbers with proper separators
const formatNumber = (value) => {
  if (value === null || value === undefined) return "N/A";
  return new Intl.NumberFormat("en-US").format(value);
};

const Grid = memo(({ coin, delay, onWatchlistChange }) => {
  const { theme } = useTheme(); // Use theme context

  // Get watchlist from localStorage with proper error handling
  const getWatchlist = () => {
    try {
      const savedWatchlist = localStorage.getItem("watchlist");
      return savedWatchlist ? JSON.parse(savedWatchlist) : [];
    } catch (error) {
      console.error("Error parsing watchlist:", error);
      return [];
    }
  };

  const [isCoinAdded, setIsCoinAdded] = useState(() => {
    const watchlist = getWatchlist();
    return watchlist.includes(coin.id);
  });

  const isPriceUp = coin.price_change_percentage_24h >= 0;
  const priceChangeAbs = Math.abs(
    coin.price_change_percentage_24h || 0
  ).toFixed(2);

  // Extract border color class based on price change
  const getBorderColorClass = () => {
    return isPriceUp
      ? "border-blue-200 dark:border-blue-800 hover:border-blue-600"
      : "border-red-200 dark:border-red-800 hover:border-red-600";
  };

  // Handle watchlist toggle with debouncing to prevent multiple clicks
  const handleWatchlistToggle = useCallback(
    (e) => {
      e.preventDefault(); // Prevent link navigation
      e.stopPropagation(); // Prevent event bubbling

      if (isCoinAdded) {
        removeItemToWatchlist(e, coin.id, setIsCoinAdded);
      } else {
        saveItemToWatchlist(e, coin.id);
        setIsCoinAdded(true);
      }

      // Notify parent component if provided
      if (onWatchlistChange) {
        onWatchlistChange(coin.id, !isCoinAdded);
      }
    },
    [coin.id, isCoinAdded, onWatchlistChange]
  );

  return (
    <Link
      to={`/coin/${coin.id}`}
      className="block"
      aria-label={`View details for ${coin.name}`}
    >
      <motion.div
        className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${getBorderColorClass()} ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: delay || 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <img
              src={coin.image}
              className="w-10 h-10 rounded-full"
              alt={`${coin.name} logo`}
              loading="lazy"
            />
            <div>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase">
                {coin.symbol}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {coin.name}
              </p>
            </div>
          </div>
          <button
            onClick={handleWatchlistToggle}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              isPriceUp
                ? "text-blue-500 hover:text-blue-600"
                : "text-red-500 hover:text-red-600"
            }`}
            aria-label={
              isCoinAdded
                ? `Remove ${coin.name} from watchlist`
                : `Add ${coin.name} to watchlist`
            }
            title={isCoinAdded ? "Remove from watchlist" : "Add to watchlist"}
          >
            {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm
            ${
              isPriceUp
                ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            <span>
              {isPriceUp ? "+" : "-"}
              {priceChangeAbs}%
            </span>
            <span className="mt-1" aria-hidden="true">
              {isPriceUp ? (
                <TrendingUpRoundedIcon fontSize="small" />
              ) : (
                <TrendingDownRoundedIcon fontSize="small" />
              )}
            </span>
          </div>
        </div>

        <p
          className={`text-2xl font-bold mb-4
          ${
            isPriceUp
              ? "text-gray-900 dark:text-white"
              : "text-red-500 dark:text-red-400"
          }`}
          title={`Current price: ${formatCurrency(coin.current_price, 6)}`}
        >
          {formatCurrency(coin.current_price)}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Volume (24h):
            </p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {formatNumber(coin.total_volume)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Market Cap:
            </p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {formatCurrency(coin.market_cap)}
            </p>
          </div>
          {coin.ath && (
            <div className="flex justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">ATH:</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {formatCurrency(coin.ath)}
              </p>
            </div>
          )}
        </div>

        {/* Rank indicator */}
        {coin.market_cap_rank && (
          <div className="absolute top-3 right-3 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              #{coin.market_cap_rank}
            </span>
          </div>
        )}
      </motion.div>
    </Link>
  );
});

Grid.propTypes = {
  coin: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    current_price: PropTypes.number.isRequired,
    price_change_percentage_24h: PropTypes.number,
    total_volume: PropTypes.number.isRequired,
    market_cap: PropTypes.number.isRequired,
    ath: PropTypes.number,
    market_cap_rank: PropTypes.number,
  }).isRequired,
  delay: PropTypes.number,
  onWatchlistChange: PropTypes.func,
};

// Add display name for better debugging
Grid.displayName = "CoinGrid";

export default Grid;

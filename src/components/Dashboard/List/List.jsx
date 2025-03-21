import React, { useState, memo, useCallback, useEffect } from "react";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { convertNumber } from "../../../functions/convertNumber";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";
import { Link } from "react-router-dom";
import { useTheme } from "../../../contexts/themeContext/ThemeContext"; // Use theme context

// Utility for consistent price formatting
const formatPrice = (price) => {
  if (price === undefined || price === null) return "N/A";

  // For small numbers, show more decimal places
  if (price < 0.01 && price > 0) {
    return `$${price.toFixed(6)}`;
  }

  return `$${price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Component for price change display
const PriceChangeIndicator = ({ percentChange }) => {
  const isPositive = percentChange >= 0;
  const changeAbs = Math.abs(percentChange || 0).toFixed(2);

  return (
    <div
      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm
      ${
        isPositive
          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
          : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
      }`}
    >
      <span>
        {isPositive ? "+" : "-"}
        {changeAbs}%
      </span>
      <span className="mt-1" aria-hidden="true">
        {isPositive ? (
          <TrendingUpRoundedIcon fontSize="small" />
        ) : (
          <TrendingDownRoundedIcon fontSize="small" />
        )}
      </span>
    </div>
  );
};

const List = memo(({ coin, delay, onWatchlistChange }) => {
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
    return watchlist?.includes(coin.id);
  });

  const isPriceUp = coin.price_change_percentage_24h >= 0;

  // Handle watchlist toggle with proper event handling
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

  // Ensure component re-renders on theme change
  useEffect(() => {}, [theme]);

  return (
    <motion.tr
      className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300
        ${
          isPriceUp
            ? "hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
            : "hover:bg-red-50/50 dark:hover:bg-red-900/20"
        }`}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay || 0 }}
    >
      {/* Coin Image */}
      <td className="p-4 whitespace-nowrap">
        <Link to={`/coin/${coin.id}`} className="block">
          <Tooltip title={`${coin.name} Icon`} arrow>
            <img
              src={coin.image}
              className="w-8 h-8 rounded-full"
              alt={`${coin.name} logo`}
              loading="lazy"
            />
          </Tooltip>
        </Link>
      </td>

      {/* Coin Info */}
      <td className="p-4 whitespace-nowrap">
        <Link to={`/coin/${coin.id}`} className="block">
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-gray-900 dark:text-white uppercase">
              {coin.symbol}
              {coin.market_cap_rank && (
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  #{coin.market_cap_rank}
                </span>
              )}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {coin.name}
            </p>
          </div>
        </Link>
      </td>

      {/* Price Change */}
      <td className="p-4 whitespace-nowrap">
        <Link to={`/coin/${coin.id}`} className="block">
          <Tooltip title="24h price change" arrow>
            <div className="flex items-center gap-2">
              <PriceChangeIndicator
                percentChange={coin.price_change_percentage_24h}
              />
            </div>
          </Tooltip>
        </Link>
      </td>

      {/* Current Price */}
      <td
        className={`p-4 whitespace-nowrap text-right font-medium
        ${
          isPriceUp
            ? "text-gray-900 dark:text-white"
            : "text-red-500 dark:text-red-400"
        }`}
      >
        <Link to={`/coin/${coin.id}`} className="block">
          <Tooltip title="Current price in USD" arrow>
            <span>{formatPrice(coin.current_price)}</span>
          </Tooltip>
        </Link>
      </td>

      {/* Total Volume */}
      <td className="p-4 whitespace-nowrap text-right text-sm text-gray-600 dark:text-gray-300">
        <Link to={`/coin/${coin.id}`} className="block">
          <Tooltip title="24h trading volume" arrow>
            <span>{coin.total_volume.toLocaleString()}</span>
          </Tooltip>
        </Link>
      </td>

      {/* Market Cap (Full Number) */}
      <td className="p-4 whitespace-nowrap text-right text-sm text-gray-600 dark:text-gray-300 hidden lg:table-cell">
        <Link to={`/coin/${coin.id}`} className="block">
          <Tooltip title="Full market capitalization" arrow>
            <span>${coin.market_cap.toLocaleString()}</span>
          </Tooltip>
        </Link>
      </td>

      {/* Market Cap (Abbreviated) */}
      <td className="p-4 whitespace-nowrap text-right text-sm text-gray-600 dark:text-gray-300 hidden md:table-cell lg:hidden">
        <Link to={`/coin/${coin.id}`} className="block">
          <Tooltip title={`$${coin.market_cap.toLocaleString()}`} arrow>
            <span>${convertNumber(coin.market_cap)}</span>
          </Tooltip>
        </Link>
      </td>

      {/* Watchlist Icon */}
      <td className="p-4 whitespace-nowrap">
        <Tooltip
          title={
            isCoinAdded
              ? `Remove ${coin.name} from watchlist`
              : `Add ${coin.name} to watchlist`
          }
          arrow
        >
          <button
            onClick={handleWatchlistToggle}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
              ${
                isPriceUp
                  ? "text-blue-500 hover:text-blue-600"
                  : "text-red-500 hover:text-red-600"
              }`}
            aria-label={
              isCoinAdded
                ? `Remove ${coin.name} from watchlist`
                : `Add ${coin.name} to watchlist`
            }
          >
            {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
          </button>
        </Tooltip>
      </td>
    </motion.tr>
  );
});

// Add display name for better debugging
List.displayName = "CoinList";

export default List;

import React, { useState } from "react";
import { MenuItem, Select, Tooltip, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SelectDays from "../../CoinPage/SelectDays/SelectDays";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Enhanced styled Select component
const StyledSelect = styled(Select)(({ theme }) => ({
  height: "3rem",
  color: "#F3F4F6",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-1px)",
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
          padding: "0.75rem 1rem",
          transition: "all 0.2s ease-in-out",
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
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(17, 24, 39, 0.95)",
          padding: "0.75rem 1rem",
          fontSize: "0.75rem",
          borderRadius: "0.5rem",
        },
      },
    },
  },
});

// Popular pairs for quick comparison
const popularPairs = [
  {
    pair: "BTC/ETH",
    crypto1: "bitcoin",
    crypto2: "ethereum",
    description: "Most popular cryptocurrency pair",
  },
  {
    pair: "ETH/SOL",
    crypto1: "ethereum",
    crypto2: "solana",
    description: "Top smart contract platforms",
  },
  {
    pair: "BNB/DOGE",
    crypto1: "binancecoin",
    crypto2: "dogecoin",
    description: "Exchange token vs Meme coin",
  },
];

function SelectCoins({
  allCoins,
  crypto1,
  crypto2,
  onCoinChange,
  days,
  handleDaysChange,
}) {
  const [hoveredPair, setHoveredPair] = useState(null);

  // Swap cryptos function
  const handleSwapCryptos = () => {
    onCoinChange({ target: { value: crypto2 } }, false);
    onCoinChange({ target: { value: crypto1 } }, true);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 space-y-6"
        data-timestamp="2025-03-20 17:43:23"
        data-user="vdabral"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-100">
            Compare Cryptocurrencies
          </h2>
          <Tooltip
            title="Compare price, market cap, and volume data between two cryptocurrencies"
            arrow
            placement="top"
          >
            <InfoOutlinedIcon className="text-gray-400 cursor-help" />
          </Tooltip>
        </div>

        <div className="relative">
          {/* Crypto 1 Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-gray-300 font-medium">Primary Crypto</p>
              {crypto1 && (
                <div className="flex items-center gap-2">
                  <img
                    src={allCoins.find((coin) => coin.id === crypto1)?.image}
                    alt=""
                    className="w-4 h-4 rounded-full"
                  />
                  <span className="text-xs text-gray-400">
                    {allCoins
                      .find((coin) => coin.id === crypto1)
                      ?.symbol?.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <StyledSelect
              value={crypto1}
              onChange={(e) => onCoinChange(e, false)}
              className="w-full bg-gray-700/50"
              MenuProps={{
                PaperProps: {
                  className: "mt-1 bg-white rounded-xl shadow-xl max-h-96",
                },
              }}
            >
              {allCoins
                .filter((coin) => coin.id !== crypto2)
                .map((coin) => (
                  <MenuItem
                    value={coin.id}
                    key={coin.id}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-5 h-5 rounded-full"
                    />
                    <span>{coin.name}</span>
                    <span className="text-gray-400 text-sm ml-auto">
                      {coin.symbol?.toUpperCase()}
                    </span>
                  </MenuItem>
                ))}
            </StyledSelect>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwapCryptos}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 hover:scale-110 group z-10"
          >
            <CompareArrowsIcon className="text-white transform rotate-90 transition-transform group-hover:rotate-[450deg] duration-500" />
          </button>

          {/* Crypto 2 Selection */}
          <div className="space-y-2 mt-8">
            <div className="flex items-center justify-between">
              <p className="text-gray-300 font-medium">Secondary Crypto</p>
              {crypto2 && (
                <div className="flex items-center gap-2">
                  <img
                    src={allCoins.find((coin) => coin.id === crypto2)?.image}
                    alt=""
                    className="w-4 h-4 rounded-full"
                  />
                  <span className="text-xs text-gray-400">
                    {allCoins
                      .find((coin) => coin.id === crypto2)
                      ?.symbol?.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <StyledSelect
              value={crypto2}
              onChange={(e) => onCoinChange(e, true)}
              className="w-full bg-gray-700/50"
              MenuProps={{
                PaperProps: {
                  className: "mt-1 bg-white rounded-xl shadow-xl max-h-96",
                },
              }}
            >
              {/* ... Similar to Crypto 1 Select ... */}
            </StyledSelect>
          </div>
        </div>

        {/* Time Period Selection */}
        <div className="pt-4 border-t border-gray-700/50">
          <SelectDays
            days={days}
            handleDaysChange={handleDaysChange}
            noPTag={true}
          />
        </div>

        {/* Popular Pairs */}
        <div className="pt-4 border-t border-gray-700/50">
          <p className="text-sm text-gray-400 mb-3">Popular Pairs</p>
          <div className="flex flex-wrap gap-2">
            {popularPairs.map((quickPair) => (
              <Tooltip
                key={quickPair.pair}
                title={quickPair.description}
                arrow
                placement="top"
                TransitionComponent={Fade}
                enterDelay={400}
              >
                <button
                  onClick={() => {
                    onCoinChange(
                      { target: { value: quickPair.crypto1 } },
                      false
                    );
                    onCoinChange(
                      { target: { value: quickPair.crypto2 } },
                      true
                    );
                  }}
                  onMouseEnter={() => setHoveredPair(quickPair.pair)}
                  onMouseLeave={() => setHoveredPair(null)}
                  className={`
                    px-3 py-1.5 rounded-lg
                    transition-all duration-300
                    ${
                      hoveredPair === quickPair.pair
                        ? "bg-blue-500 text-white scale-105"
                        : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                    }
                  `}
                >
                  {quickPair.pair}
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default SelectCoins;

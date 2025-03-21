import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Button from "../components/Common/TopButton/Topbutton";
import Header from "../components/Common/Header/Header";
import TabsComponent from "../components/Dashboard/Tab/TabsComponent";
import Loader from "../components/Common/Loader/Loader";
import { get100Coins } from "../functions/get100Coins";

function Watchlist() {
  // State management
  const [state, setState] = useState({
    coins: [],
    loading: true,
    error: null,
    watchlist: JSON.parse(localStorage.getItem("watchlist") || "[]"),
    lastUpdated: null,
  });

  // Fetch watchlist data
  const fetchWatchlistData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      if (!state.watchlist?.length) {
        setState((prev) => ({ ...prev, loading: false }));
        return;
      }

      const allCoins = await get100Coins();

      if (!allCoins) {
        throw new Error("Failed to fetch coin data");
      }

      const watchlistCoins = allCoins.filter((coin) =>
        state.watchlist.includes(coin.id)
      );

      setState((prev) => ({
        ...prev,
        coins: watchlistCoins,
        loading: false,
        lastUpdated: new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Error fetching watchlist:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to fetch watchlist",
      }));
      toast.error("Failed to load watchlist data");
    }
  }, [state.watchlist]);

  // Initial data fetch
  useEffect(() => {
    fetchWatchlistData();

    return () => {
      setState((prev) => ({
        ...prev,
        coins: [],
        loading: false,
        error: null,
      }));
    };
  }, [fetchWatchlistData]);

  // Handle refresh
  const handleRefresh = () => {
    fetchWatchlistData();
    toast.success("Watchlist refreshed!");
  };

  // Empty state component
  const EmptyState = () => (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <div className="space-y-4">
            <svg
              className="w-16 h-16 mx-auto text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h1 className="text-2xl font-bold text-gray-100">
              Your Watchlist is Empty
            </h1>
            <p className="text-gray-400">
              Add cryptocurrencies to your watchlist to track their performance
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
              data-timestamp="2025-03-20 16:14:04"
              data-user="vdabral"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Explore Coins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />

      {state.loading ? (
        <Loader />
      ) : state.error ? (
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-red-500/10 rounded-lg p-4 mb-4">
            <p className="text-red-500">{state.error}</p>
          </div>
          <button
            onClick={handleRefresh}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : !state.watchlist?.length ? (
        <EmptyState />
      ) : (
        <div className="container mx-auto px-4 py-8 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Your Watchlist</h1>
            <button
              onClick={handleRefresh}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              title="Refresh watchlist"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
            <TabsComponent coins={state.coins} />
          </div>

          {state.lastUpdated && (
            <p className="text-xs text-gray-500 text-right">
              Last updated: {new Date(state.lastUpdated).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Watchlist;

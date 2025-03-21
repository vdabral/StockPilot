import axios from "axios";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { toast } from "react-hot-toast";
import Header from "../components/Common/Header/Header";
import Loader from "../components/Common/Loader/Loader";
import Search from "../components/Dashboard/Search/Search";
import TabsComponent from "../components/Dashboard/Tab/TabsComponent";
import PaginationComponent from "../components/Dashboard/Pagination/Pagination";
import TopButton from "../components/Common/TopButton/Topbutton";

// Constants in a separate file that could be imported
const CONSTANTS = {
  ITEMS_PER_PAGE: 10,
  API_URL: "https://api.coingecko.com/api/v3/coins/markets",
  CACHE_DURATION: 2 * 60 * 1000, // 2 minutes
  APP_VERSION: "1.0.0",
  CONFIG: {
    API: {
      HEADERS: {
        Accept: "application/json",
        "User-Agent": `CryptoTracker/1.0.0`,
      },
      PARAMS: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    },
  },
};

// Custom hook for API data fetching with caching
function useCoinData() {
  const [data, setData] = useState({
    coins: [],
    loading: true,
    error: null,
  });
  const lastFetchedRef = useRef(null);
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async (forceFetch = false) => {
    try {
      // Check cache validity unless force fetching
      if (
        !forceFetch &&
        lastFetchedRef.current &&
        Date.now() - lastFetchedRef.current < CONSTANTS.CACHE_DURATION
      ) {
        return;
      }

      // Cancel previous request if still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      setData((prev) => ({ ...prev, loading: true, error: null }));

      const response = await axios.get(CONSTANTS.API_URL, {
        params: CONSTANTS.CONFIG.API.PARAMS,
        headers: CONSTANTS.CONFIG.API.HEADERS,
        signal: abortControllerRef.current.signal,
      });

      setData({
        coins: response.data,
        loading: false,
        error: null,
      });

      lastFetchedRef.current = Date.now();
    } catch (error) {
      // Don't update state if request was aborted
      if (error.name === "AbortError") return;

      console.error("Error fetching data:", error);
      setData((prev) => ({
        ...prev,
        loading: false,
        error:
          error.response?.data?.error ||
          error.message ||
          "Failed to fetch data",
      }));

      toast.error(
        "Failed to fetch cryptocurrency data. Please try again later."
      );
    }
  }, []);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...data,
    fetchData,
    lastFetched: lastFetchedRef.current,
  };
}

function Dashboard() {
  const { coins, loading, error, fetchData, lastFetched } = useCoinData();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Debounced search
  const searchTimeoutRef = useRef(null);
  const debouncedSearch = useCallback((value) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 300);
  }, []);

  // Memoized filtered coins
  const filteredCoins = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    return searchTerm
      ? coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(searchTerm) ||
            coin.symbol.toLowerCase().includes(searchTerm)
        )
      : coins;
  }, [coins, search]);

  // Memoized paginated coins
  const paginatedCoins = useMemo(() => {
    const startIndex = (page - 1) * CONSTANTS.ITEMS_PER_PAGE;
    return search
      ? filteredCoins
      : filteredCoins.slice(startIndex, startIndex + CONSTANTS.ITEMS_PER_PAGE);
  }, [filteredCoins, page, search]);

  // Event Handlers
  const handleSearch = useCallback(
    (e) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  const handlePageChange = useCallback((event, newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleRefresh = useCallback(async () => {
    await fetchData(true);
    toast.success("Data refreshed!");
  }, [fetchData]);

  // Handle search reset
  const handleSearchReset = useCallback(() => {
    setSearch("");
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchData();

    // Set up polling for auto-refresh
    const intervalId = setInterval(() => {
      fetchData();
    }, CONSTANTS.CACHE_DURATION);

    return () => clearInterval(intervalId);
  }, [fetchData]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Fixed header with proper z-index and shadow */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md shadow-lg">
        {/* <Header /> */}
      </div>

      {/* Main content with proper padding-top to account for fixed header */}
      <main className="container mx-auto px-4 pt-20 pb-8">
        {loading && coins.length === 0 ? (
          <Loader />
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-500/10 rounded-lg p-4 mb-4">
              <p className="text-red-500">{error}</p>
            </div>
            <button
              onClick={handleRefresh}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Sticky search bar */}
            <div className="sticky top-16 z-40 py-4 bg-gray-900/95 backdrop-blur-md -mx-4 px-4">
              <div className="flex justify-between items-center">
                <Search
                  search={search}
                  handleChange={handleSearch}
                  handleReset={handleSearchReset}
                />
                <div className="flex items-center gap-2">
                  {loading && (
                    <span className="text-xs text-gray-400">Updating...</span>
                  )}
                  <button
                    onClick={handleRefresh}
                    className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                    title="Refresh data"
                    disabled={loading}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        loading ? "animate-spin text-gray-500" : ""
                      }`}
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
              </div>
            </div>

            {/* Main content */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-lg">
              {coins.length > 0 ? (
                <TabsComponent
                  coins={paginatedCoins}
                  setSearch={setSearch}
                  loading={loading}
                />
              ) : (
                <div className="p-8 text-center text-gray-400">
                  No cryptocurrencies found.
                </div>
              )}
            </div>

            {/* Pagination */}
            {!search && filteredCoins.length > CONSTANTS.ITEMS_PER_PAGE && (
              <div className="flex justify-center">
                <PaginationComponent
                  page={page}
                  handlePageChange={handlePageChange}
                  count={Math.ceil(
                    filteredCoins.length / CONSTANTS.ITEMS_PER_PAGE
                  )}
                />
              </div>
            )}

            {/* No results message */}
            {search && filteredCoins.length === 0 && (
              <div className="text-center py-4 text-gray-400">
                No results found for "{search}".
                <button
                  onClick={handleSearchReset}
                  className="ml-2 underline text-blue-400 hover:text-blue-300"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <TopButton />

      {/* Last updated indicator */}
      {lastFetched && (
        <div className="fixed bottom-4 right-4 text-xs text-gray-500 z-40">
          Last updated: {new Date(lastFetched).toLocaleTimeString()}
          {loading && <span className="ml-2">• Refreshing...</span>}
        </div>
      )}
    </div>
  );
}

export default Dashboard;

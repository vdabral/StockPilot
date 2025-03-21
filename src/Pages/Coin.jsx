import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import Info from "../components/CoinPage/Info/Info";
import LineChart from "../components/CoinPage/LineChart/LineChart";
import SelectDays from "../components/CoinPage/SelectDays/SelectDays";
import ToggleComponents from "../components/CoinPage/ToggleComponets/ToggleComponents";
import Button from "../components/Common/TopButton/Topbutton";
import Header from "../components/Common/Header/Header";
import Loader from "../components/Common/Loader/Loader";
import List from "../components/Dashboard/List/List";
import { getCoinData } from "../functions/getCoinData";
import { getPrices } from "../functions/getPrices";
import { settingChartData } from "../functions/settingChartData";
import { settingCoinObject } from "../functions/settingCoinObject";

// Custom hook for data fetching
const useCoinData = (id) => {
  const [state, setState] = useState({
    coin: null,
    chartData: { labels: [], datasets: [{}] },
    loading: true,
    error: false,
    days: 30,
    priceType: "prices",
  });

  // Create a stable setState function for individual properties
  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  return [state, updateState];
};

function Coin() {
  const { id } = useParams();
  const [{ coin, chartData, loading, error, days, priceType }, updateState] =
    useCoinData(id);

  // Error handling wrapper
  const handleError = useCallback(
    (err) => {
      console.error("Error in Coin component:", err);
      updateState({
        error: true,
        loading: false,
      });
      toast.error(err.message || "Something went wrong!", {
        id: `error-${Date.now()}`, // Prevent duplicate toasts
        duration: 4000,
      });
    },
    [updateState]
  );

  // Fetch data with loading state and error handling
  const getData = useCallback(async () => {
    if (!id) return;

    try {
      updateState({ loading: true, error: false });

      // Fetch coin data and prices in parallel
      const [coinData, prices] = await Promise.all([
        getCoinData(id).catch((err) => {
          throw new Error(`Failed to fetch coin data: ${err.message}`);
        }),
        getPrices(id, days, priceType).catch((err) => {
          throw new Error(`Failed to fetch price data: ${err.message}`);
        }),
      ]);

      // Process coin data
      const coinObject = {};
      settingCoinObject(coinData, (data) => {
        Object.assign(coinObject, data);
      });

      // Process chart data
      let newChartData = { labels: [], datasets: [{}] };
      settingChartData((data) => {
        newChartData = data;
      }, prices);

      updateState({
        coin: coinObject,
        chartData: newChartData,
        loading: false,
      });
    } catch (err) {
      handleError(err);
    }
  }, [id, days, priceType, updateState, handleError]);

  // Debounced data fetcher for UI interactions
  const fetchPriceData = useCallback(
    async (newDays, newPriceType) => {
      if (!id) return;

      try {
        updateState({ loading: true });

        const prices = await getPrices(id, newDays, newPriceType);

        if (!prices) {
          throw new Error("Failed to fetch price data");
        }

        let newChartData = { labels: [], datasets: [{}] };
        settingChartData((data) => {
          newChartData = data;
        }, prices);

        updateState({
          chartData: newChartData,
          loading: false,
        });
      } catch (err) {
        handleError(err);
      }
    },
    [id, updateState, handleError]
  );

  // Handle days change with debouncing
  const handleDaysChange = useCallback(
    (event) => {
      const newDays = parseInt(event.target.value, 10);
      updateState({ days: newDays });

      // Use a debounce to prevent excessive API calls
      const timeoutId = setTimeout(() => {
        fetchPriceData(newDays, priceType);
      }, 300);

      return () => clearTimeout(timeoutId);
    },
    [priceType, fetchPriceData, updateState]
  );

  // Handle price type change with debouncing
  const handlePriceTypeChange = useCallback(
    (event) => {
      const newPriceType = event.target.value;
      updateState({ priceType: newPriceType });

      // Use a debounce to prevent excessive API calls
      const timeoutId = setTimeout(() => {
        fetchPriceData(days, newPriceType);
      }, 300);

      return () => clearTimeout(timeoutId);
    },
    [days, fetchPriceData, updateState]
  );

  // Fetch data on component mount or id change
  useEffect(() => {
    getData();

    // Cleanup function
    return () => {
      updateState({
        chartData: { labels: [], datasets: [{}] },
        coin: null,
      });
    };
  }, [id, getData, updateState]);

  // Memoize the error UI to prevent unnecessary re-renders
  const ErrorUI = useMemo(
    () => (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                Sorry, couldn't find the coin you're looking for 😞
              </h1>
              <p className="text-gray-400 mb-6">
                The coin might not exist or there was an error fetching the
                data.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    ),
    []
  );

  if (loading) return <Loader />;
  if (error) return ErrorUI;
  if (!coin?.id) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <List coin={coin} delay={0.5} />
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="space-y-6">
            <SelectDays handleDaysChange={handleDaysChange} days={days} />
            <ToggleComponents
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart chartData={chartData} />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <Info title={coin.name} desc={coin.desc} />
        </div>
      </div>
      <Button />
    </div>
  );
}

// PropTypes for component validation
Coin.propTypes = {
  // Component props if needed
};

// PropTypes for child components
List.propTypes = {
  coin: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    market_cap: PropTypes.number,
    total_volume: PropTypes.number,
    price_change_percentage_24h: PropTypes.number,
  }).isRequired,
  delay: PropTypes.number,
};

SelectDays.propTypes = {
  handleDaysChange: PropTypes.func.isRequired,
  days: PropTypes.number.isRequired,
};

ToggleComponents.propTypes = {
  priceType: PropTypes.string.isRequired,
  handlePriceTypeChange: PropTypes.func.isRequired,
};

LineChart.propTypes = {
  chartData: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
        borderColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        tension: PropTypes.number,
        pointRadius: PropTypes.number,
        pointHoverRadius: PropTypes.number,
        fill: PropTypes.bool,
      })
    ),
  }).isRequired,
};

Info.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
};

export default Coin;

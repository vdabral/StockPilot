import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import Info from "../components/CoinPage/Info/Info";
import LineChart from "../components/CoinPage/LineChart/LineChart";
import SelectDays from "../components/CoinPage/SelectDays/SelectDays";
import ToggleComponents from "../components/CoinPage/ToggleComponents/ToggleComponents";
import Button from "../components/Common/TopButton/Topbutton";
import Header from "../components/Common/Header/Header";
import Loader from "../components/Common/Loader/Loader";
import List from "../components/Dashboard/List/List";
import { getCoinData } from "../functions/getCoinData";
import { getPrices } from "../functions/getPrices";
import { settingChartData } from "../functions/settingChartData";
import { settingCoinObject } from "../functions/settingCoinObject";

// Custom hook for coin data management
const useCoinData = (id) => {
  const [state, setState] = useState({
    coin: null,
    chartData: { labels: [], datasets: [] },
    loading: true,
    error: false,
    days: 30,
    priceType: "prices",
  });

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
      updateState({ error: true, loading: false });
      toast.error(err.message || "Something went wrong!", {
        id: `error-${Date.now()}`,
        duration: 4000,
      });
    },
    [updateState]
  );

  // Fetch coin data and prices
  const getData = useCallback(async () => {
    if (!id) return;

    try {
      updateState({ loading: true, error: false });

      const [coinData, prices] = await Promise.all([
        getCoinData(id),
        getPrices(id, days, priceType),
      ]);

      const coinObject = {};
      settingCoinObject(coinData, (data) => {
        Object.assign(coinObject, data);
      });

      let newChartData = { labels: [], datasets: [] };
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

  useEffect(() => {
    getData();
  }, [id, getData]);

  // Fetch price data with debouncing
  const fetchPriceData = useCallback(
    (() => {
      let timeoutId = null;

      return async (newDays, newPriceType) => {
        if (!id) return;
        clearTimeout(timeoutId);

        timeoutId = setTimeout(async () => {
          try {
            updateState({ loading: true });

            const prices = await getPrices(id, newDays, newPriceType);
            if (!prices) throw new Error("Failed to fetch price data");

            let newChartData = { labels: [], datasets: [{}] };
            settingChartData((data) => {
              newChartData = data;
            }, prices);

            updateState({ chartData: newChartData, loading: false });
          } catch (err) {
            handleError(err);
          }
        }, 300);
      };
    })(),
    [id, updateState, handleError]
  );

  // Handle days change
  const handleDaysChange = useCallback(
    (event) => {
      const newDays = parseInt(event.target.value, 10);
      updateState({ days: newDays });
      fetchPriceData(newDays, priceType);
    },
    [priceType, fetchPriceData, updateState]
  );

  // Handle price type change
  const handlePriceTypeChange = useCallback(
    (event) => {
      const newPriceType = event.target.value;
      updateState({ priceType: newPriceType });
      fetchPriceData(days, newPriceType);
    },
    [days, fetchPriceData, updateState]
  );

  // Memoized Error UI
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
  if (!coin) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <table className="w-full">
            <tbody>
              <List coin={coin} delay={0.5} />
            </tbody>
          </table>
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

export default Coin;

import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import Info from "../components/CoinPage/Info/Info";
import LineChart from "../components/CoinPage/LineChart/LineChart";
import ToggleComponents from "../components/CoinPage/ToggleComponents/ToggleComponents";
import Header from "../components/Common/Header/Header";
import Loader from "../components/Common/Loader/Loader";
import SelectCoins from "../components/ComparePage/SelectCoins/SelectCoins";
import List from "../components/Dashboard/List/List";
import { get100Coins } from "../functions/get100Coins";
import { getCoinData } from "../functions/getCoinData";
import { getPrices } from "../functions/getPrices";
import { settingChartData } from "../functions/settingChartData";
import { settingCoinObject } from "../functions/settingCoinObject";
import { useTheme } from "../contexts/themeContext/ThemeContext";

function Compare() {
  const { theme } = useTheme();
  const [state, setState] = useState({
    allCoins: [],
    loading: true,
    error: null,
    crypto1: "bitcoin",
    crypto2: "ethereum",
    coin1Data: null,
    coin2Data: null,
    days: 30,
    priceType: "prices",
    chartData: { labels: [], datasets: [] },
  });

  // Handle errors
  const handleError = useCallback((error) => {
    console.error("Error:", error);
    setState((prev) => ({ ...prev, error, loading: false }));
    toast.error(error.message || "Something went wrong!");
  }, []);

  // Fetch Data
  const fetchData = useCallback(
    async (crypto1, crypto2, days, priceType) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const [prices1, prices2] = await Promise.all([
          getPrices(crypto1, days, priceType),
          getPrices(crypto2, days, priceType),
        ]);

        if (!prices1 || !prices2) throw new Error("Failed to fetch price data");

        settingChartData(
          (chartData) => setState((prev) => ({ ...prev, chartData })),
          prices1,
          prices2
        );
      } catch (error) {
        handleError(error);
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [handleError]
  );

  // Initial Fetch
  const getData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const coins = await get100Coins();
      if (!coins) throw new Error("Failed to fetch coins");

      const [data1, data2] = await Promise.all([
        getCoinData(state.crypto1),
        getCoinData(state.crypto2),
      ]);

      if (!data1 || !data2) throw new Error("Failed to fetch coin data");

      setState((prev) => ({
        ...prev,
        allCoins: coins,
        coin1Data: {},
        coin2Data: {},
      }));

      settingCoinObject(data1, (coin1Data) =>
        setState((prev) => ({ ...prev, coin1Data }))
      );
      settingCoinObject(data2, (coin2Data) =>
        setState((prev) => ({ ...prev, coin2Data }))
      );

      await fetchData(
        state.crypto1,
        state.crypto2,
        state.days,
        state.priceType
      );
    } catch (error) {
      handleError(error);
    }
  }, [
    state.crypto1,
    state.crypto2,
    state.days,
    state.priceType,
    fetchData,
    handleError,
  ]);

  useEffect(() => {
    getData();
  }, [getData]);

  // Handlers
  const handleCoinChange = async (e, isCoin2) => {
    try {
      const newCrypto = e.target.value;
      const cryptoKey = isCoin2 ? "crypto2" : "crypto1";
      const dataKey = isCoin2 ? "coin2Data" : "coin1Data";

      setState((prev) => ({ ...prev, loading: true, [cryptoKey]: newCrypto }));

      const data = await getCoinData(newCrypto);
      if (!data) throw new Error("Failed to fetch coin data");

      settingCoinObject(data, (coinData) =>
        setState((prev) => ({ ...prev, [dataKey]: coinData }))
      );

      await fetchData(
        isCoin2 ? state.crypto1 : newCrypto,
        isCoin2 ? newCrypto : state.crypto2,
        state.days,
        state.priceType
      );
    } catch (error) {
      handleError(error);
    }
  };

  const handleDaysChange = async (e) => {
    const newDays = Number(e.target.value);
    setState((prev) => ({ ...prev, days: newDays }));
    await fetchData(state.crypto1, state.crypto2, newDays, state.priceType);
  };

  const handlePriceTypeChange = async (e) => {
    const newPriceType = e.target.value;
    setState((prev) => ({ ...prev, priceType: newPriceType }));
    await fetchData(state.crypto1, state.crypto2, state.days, newPriceType);
  };

  if (state.loading || !state.coin1Data?.id || !state.coin2Data?.id) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Select Coins */}
        <div
          className={`p-6 rounded-lg shadow-lg ${
            theme === "dark" ? "bg-gray-800/50" : "bg-white"
          }`}
        >
          <SelectCoins
            allCoins={state.allCoins}
            crypto1={state.crypto1}
            crypto2={state.crypto2}
            onCoinChange={handleCoinChange}
            days={state.days}
            handleDaysChange={handleDaysChange}
          />
        </div>

        {/* Coin List */}
        <div className="grid md:grid-cols-2 gap-8">
          <div
            className={`p-6 rounded-lg shadow-lg ${
              theme === "dark" ? "bg-gray-800/50" : "bg-white"
            }`}
          >
            <List coin={state.coin1Data} />
          </div>
          <div
            className={`p-6 rounded-lg shadow-lg ${
              theme === "dark" ? "bg-gray-800/50" : "bg-white"
            }`}
          >
            <List coin={state.coin2Data} />
          </div>
        </div>

        {/* Chart Section */}
        <div
          className={`p-6 rounded-lg shadow-lg ${
            theme === "dark" ? "bg-gray-800/50" : "bg-white"
          }`}
        >
          <ToggleComponents
            priceType={state.priceType}
            handlePriceTypeChange={handlePriceTypeChange}
          />
          <div className="mt-6">
            <LineChart chartData={state.chartData} multiAxis={true} />
          </div>
        </div>

        {/* Coin Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <div
            className={`p-6 rounded-lg shadow-lg ${
              theme === "dark" ? "bg-gray-800/50" : "bg-white"
            }`}
          >
            <Info title={state.coin1Data.name} desc={state.coin1Data.desc} />
          </div>
          <div
            className={`p-6 rounded-lg shadow-lg ${
              theme === "dark" ? "bg-gray-800/50" : "bg-white"
            }`}
          >
            <Info title={state.coin2Data.name} desc={state.coin2Data.desc} />
          </div>
        </div>
      </div>
    </div>
  );
}

Compare.propTypes = {};

export default Compare;

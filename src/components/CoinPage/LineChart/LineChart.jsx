import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import PropTypes from "prop-types";

function LineChart({ chartData, multiAxis, onDownload, height }) {
  const chartRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Format options and chart data memoization to prevent unnecessary rerenders
  const options = useMemo(
    () => ({
      plugins: {
        legend: {
          display: multiAxis ? true : false,
          labels: {
            color: "#94A3B8", // text-slate-400
            font: {
              family: "Inter, sans-serif",
              size: 12,
            },
            padding: 20,
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: {
          backgroundColor: "rgba(15, 23, 42, 0.8)", // bg-slate-900/80
          titleColor: "#E2E8F0", // text-slate-200
          bodyColor: "#94A3B8", // text-slate-400
          padding: 12,
          borderColor: "rgba(51, 65, 85, 0.5)", // border-slate-700/50
          borderWidth: 1,
          bodyFont: {
            family: "Inter, sans-serif",
          },
          titleFont: {
            family: "Inter, sans-serif",
            weight: "600",
          },
          displayColors: true,
          boxPadding: 3,
          callbacks: {
            // Format currency in tooltips
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
                }).format(context.parsed.y);
              }
              return label;
            },
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          grid: {
            color: "rgba(51, 65, 85, 0.2)", // border-slate-700/20
            drawBorder: false,
          },
          ticks: {
            color: "#94A3B8", // text-slate-400
            font: {
              family: "Inter, sans-serif",
              size: 11,
            },
            maxRotation: 0,
            maxTicksLimit: window.innerWidth < 768 ? 8 : 12, // Responsive tick limiting
            autoSkip: true,
          },
        },
        crypto1: {
          position: "left",
          grid: {
            color: "rgba(51, 65, 85, 0.2)", // border-slate-700/20
            drawBorder: false,
          },
          ticks: {
            color: "#94A3B8", // text-slate-400
            font: {
              family: "Inter, sans-serif",
              size: 11,
            },
            callback: (value) => {
              // Format numbers based on size (add k/m for thousands/millions)
              if (value >= 1000000) {
                return `$${(value / 1000000).toFixed(1)}M`;
              } else if (value >= 1000) {
                return `$${(value / 1000).toFixed(1)}K`;
              } else {
                return `$${value.toFixed(2)}`;
              }
            },
          },
          // Automatically determine beginsAtZero based on data
          beginAtZero:
            chartData?.datasets?.[0]?.data?.every((val) => val >= 0) || false,
        },
        crypto2: multiAxis && {
          position: "right",
          grid: {
            display: false, // Hide grid lines for second axis
          },
          ticks: {
            color: "#94A3B8", // text-slate-400
            font: {
              family: "Inter, sans-serif",
              size: 11,
            },
            callback: (value) => {
              // Format numbers based on size (add k/m for thousands/millions)
              if (value >= 1000000) {
                return `$${(value / 1000000).toFixed(1)}M`;
              } else if (value >= 1000) {
                return `$${(value / 1000).toFixed(1)}K`;
              } else {
                return `$${value.toFixed(2)}`;
              }
            },
          },
        },
      },
      elements: {
        line: {
          tension: 0.4, // Smooth lines
        },
        point: {
          radius: (ctx) => {
            // Show every nth point based on screen size and dataset length
            const pointCount = chartData?.labels?.length || 0;
            const showEveryNth =
              pointCount > 30
                ? 5
                : pointCount > 20
                ? 3
                : pointCount > 10
                ? 2
                : 1;

            return ctx.dataIndex % showEveryNth === 0 ? 2 : 0;
          },
          hoverRadius: 6, // Show points on hover
        },
      },
      // Animation configuration based on data size for better performance
      animation: {
        duration: chartData?.labels?.length > 50 ? 0 : 1000,
      },
    }),
    [chartData, multiAxis]
  );

  // Handle fullscreen toggling
  const toggleFullscreen = useCallback(() => {
    const chartContainer = document.getElementById("chart-container");

    if (!document.fullscreenElement) {
      if (chartContainer.requestFullscreen) {
        chartContainer.requestFullscreen();
      } else if (chartContainer.webkitRequestFullscreen) {
        chartContainer.webkitRequestFullscreen();
      } else if (chartContainer.msRequestFullscreen) {
        chartContainer.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  }, []);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  // Handle chart download
  const handleDownload = useCallback(() => {
    if (chartRef.current) {
      const canvas = chartRef.current.canvas;

      // Create a temporary link
      const link = document.createElement("a");
      link.download = `crypto-chart-${
        new Date().toISOString().split("T")[0]
      }.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      // Trigger custom event if provided
      if (onDownload && typeof onDownload === "function") {
        onDownload(link.href);
      }
    }
  }, [onDownload]);

  // Check if we should show loading state
  const isLoading =
    !chartData || !chartData.datasets || chartData.datasets.length === 0;

  // Ensure we have default empty data if none is provided
  const safeChartData = useMemo(() => {
    if (isLoading) {
      return {
        labels: [],
        datasets: [
          {
            label: "No data available",
            data: [],
            borderColor: "rgba(99, 102, 241, 0.8)",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
          },
        ],
      };
    }
    return chartData;
  }, [chartData, isLoading]);

  return (
    <div
      id="chart-container"
      className={`relative w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 transition-all duration-300 ${
        isFullscreen ? "h-screen" : ""
      }`}
      style={{ height: isFullscreen ? "100vh" : height || "400px" }}
      data-timestamp={new Date().toISOString()}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-2xl z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            <span className="text-slate-300 text-sm">
              Loading chart data...
            </span>
          </div>
        </div>
      )}

      {/* Chart container */}
      <div className="w-full h-full">
        <Line
          ref={chartRef}
          data={safeChartData}
          options={options}
          aria-label="Cryptocurrency price chart"
        />
      </div>

      {/* Chart controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          title="Download chart"
          onClick={handleDownload}
          disabled={isLoading}
          aria-label="Download chart as PNG"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>
        <button
          className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          onClick={toggleFullscreen}
          aria-label={
            isFullscreen ? "Exit fullscreen mode" : "Enter fullscreen mode"
          }
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isFullscreen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Optional: Data status indicator */}
      {!isLoading && safeChartData.labels.length > 0 && (
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-slate-400">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>Data: {safeChartData.labels.length} points</span>
        </div>
      )}
    </div>
  );
}

// Prop types for better type checking
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
        fill: PropTypes.bool,
      })
    ),
  }),
  multiAxis: PropTypes.bool,
  onDownload: PropTypes.func,
  height: PropTypes.string,
};

LineChart.defaultProps = {
  multiAxis: false,
  height: "400px",
};

// Use memo to prevent unnecessary re-renders
export default React.memo(LineChart);

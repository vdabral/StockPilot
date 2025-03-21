import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "../Grid/Grid";
import List from "../List/List";
import { convertNumber } from "../../../functions/convertNumber";
// import Button from "../../Common/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function TabsComponent({ coins, setSearch }) {
  const [value, setValue] = React.useState("grid");
  const currentTime = "2025-03-20 13:13:30";
  const currentUser = "vdabral";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Custom theme for MUI components
  const theme = createTheme({
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            color: "#F3F4F6", // text-gray-100
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            textTransform: "capitalize",
            "&.Mui-selected": {
              color: "#3B82F6", // text-blue-500
            },
          },
        },
      },
      MuiTabPanel: {
        styleOverrides: {
          root: {
            padding: "24px 0",
          },
        },
      },
    },
  });

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      <div className="text-center space-y-4">
        <h1 className="text-xl md:text-2xl text-gray-200 font-semibold">
          Sorry, Couldn't find the coin you're looking for 😞
        </h1>
        <p className="text-gray-400">
          Try adjusting your search or browse our full collection
        </p>
      </div>
      <button
        onClick={() => setSearch("")}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        data-timestamp={currentTime}
        data-user={currentUser}
      >
        Clear Search
      </button>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <div className="border-b border-gray-700/50">
          <TabList
            onChange={handleChange}
            variant="fullWidth"
            className="bg-gray-800/50 backdrop-blur-sm rounded-t-xl"
          >
            <Tab
              label="Grid"
              value="grid"
              className="transition-all duration-300"
            />
            <Tab
              label="List"
              value="list"
              className="transition-all duration-300"
            />
          </TabList>
        </div>

        {/* Grid View */}
        <TabPanel value="grid">
          {coins.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
              {coins.map((coin, i) => (
                <Grid coin={coin} key={coin.id || i} delay={(i % 4) * 0.2} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </TabPanel>

        {/* List View */}
        <TabPanel value="list">
          {coins.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">
                      Asset
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">
                      Name
                    </th>
                    <th className="p-4 text-right text-sm font-semibold text-gray-400">
                      Price Change
                    </th>
                    <th className="p-4 text-right text-sm font-semibold text-gray-400">
                      Current Price
                    </th>
                    <th className="p-4 text-right text-sm font-semibold text-gray-400">
                      Volume
                    </th>
                    <th className="p-4 text-right text-sm font-semibold text-gray-400">
                      Market Cap
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-gray-400">
                      Watch
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {coins.map((coin, i) => (
                    <List
                      coin={coin}
                      key={coin.id || i}
                      delay={(i % 8) * 0.2}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState />
          )}
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}

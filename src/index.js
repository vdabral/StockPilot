import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ThemeProvider from "./components/ThemeProvider";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

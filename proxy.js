const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://api.coingecko.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api/v3", // rewrite path
    },
  })
);

app.listen(3001, () => {
  console.log("Proxy server is running on http://localhost:3001");
});

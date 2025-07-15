const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const headers = {
  "user-agent": "Mozilla/5.0",
  accept: "application/json",
  "accept-language": "en-US,en;q=0.9",
};

app.get("/option-chain-indices", async (req, res) => {
  try {
    const symbol = req.query.symbol || "NIFTY";
    const url = `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`;
    const response = await axios.get(url, { headers });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching NSE data:", error.message);
    res.status(500).json({ error: "Failed to fetch NSE data." });
  }
});

app.listen(PORT, () => {
  console.log(`NSE Proxy API running on port ${PORT}`);
});

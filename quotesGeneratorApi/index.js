const express = require("express");
const asyncHandler = require("express-async-handler");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

app.get(
  "/quote",
  asyncHandler(async (req, res) => {
    // fetch quote api and send it back to front-end
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.append("X-Api-Key", process.env.QUOTES_API_KEY);
    const response = await fetch(process.env.QUOTES_API_URL, {
      headers: headers,
    });
    const quote = await response.json();

    if (response.ok) {
      res.send(quote);
    } else {
      res.send("There was an error");
    }
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Now listening on port ${process.env.PORT}`);
});

import express from "express";
import axios from "axios";
import "dotenv/config";

const dataRouter = express.Router();

const apiKey = process.env.API_KEY;

dataRouter.get("/weather/:city", async (req, res) => {
  const { city } = req.params;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
    );
    const data = await response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error("weather api error", error.message);
    if (error.response) {
      return res.status(error.response.status).json({msg: error.response.data.message|| "Error fetching city weather from provider"})
    }

    res.status(500).json({ err: error.message, msg: "Internal server error while fetching weather." });
  }
});

export default dataRouter;

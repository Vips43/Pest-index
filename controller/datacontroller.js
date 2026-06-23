import axios from "axios";
import "dotenv/config";

const apiKey = process.env.OPENWEATHER_API_KEY;

export const getCity = async (req, res) => {
  const { city } = req.params;
  try {
    if (city) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`,
      );
      const data = await response.data;      
      res.status(200).json(data);
    } else {
      res.status(401).json({ msg: "no city provided" });
    }
  } catch (error) {
    console.error("city not found", error.message, city);
    if (error.response) {
      return;
      res.status(error.response.status).json({
        msg:
          error.response.data.message ||
          "Error fetching city weather from provider",
      });
    }

    res.status(500).json({
      err: error.message,
      msg: "Internal server error while fetching weather.",
    });
  }
};

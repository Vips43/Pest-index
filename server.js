import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weather.js";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use("/v1", weatherRoutes);

app.listen(3000, () => {
  console.log("server running: 3000", 3000);
});

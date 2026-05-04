import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import dataRouter from "./models/dataModel.js";

dotenv.config();

const app = express();


app.use(cors());
app.use("/v1", dataRouter)

app.listen(3000, () => {
  console.log("server running: ", 3000);
});

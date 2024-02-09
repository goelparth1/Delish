import express from "express";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";
import path from 'path';

const app = express();
dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const publicDirectoryPath = "./dist";

app.use(express.static(publicDirectoryPath));

app.use("/api/v1/reservation", reservationRouter);
app.get("/", (req, res, next)=>{return res.status(200).json({
  success: true,
  message: "API is running"
})})

dbConnection();

app.use(errorMiddleware);

export default app;

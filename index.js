import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";

dotenv.config();
const app = express();

mongoose
  .connect(
    "mongodb+srv://saurabhkhandale3991:Mongo123@cluster0.h1xvsoj.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB !!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 !!!");
});

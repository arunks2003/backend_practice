import express from "express";
import "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";

//configure env
dotenv.config();

//connect db
connectDB();

//rest object
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("Hello World");
});

//PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.black
  );
});

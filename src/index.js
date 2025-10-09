// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});


const mask = (value) => {
  if (!value) return "<missing>";
  const str = String(value);
  if (str.length <= 4) return "***";
  return `${"*".repeat(Math.max(0, str.length - 4))}${str.slice(-4)}`;
};

const logLoadedEnv = () => {
  console.log("Loaded env variables:");
  console.log(" MONGODB_URI:", process.env.MONGODB_URI ? "<set>" : "<missing>");
  // console.log(" DB_NAME:", process.env.DB_NAME || "<missing>");
  console.log(" CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME || "<missing>");
  console.log(" CLOUDINARY_API_KEY:", mask(process.env.CLOUDINARY_API_KEY));
  console.log(" CLOUDINARY_API_SECRET:", mask(process.env.CLOUDINARY_API_SECRET));
  console.log(" ACCESS_TOKEN_SECRET:", mask(process.env.ACCESS_TOKEN_SECRET));
  console.log(" ACCESS_TOKEN_EXPIRY:", process.env.ACCESS_TOKEN_EXPIRY || "<missing>");
  console.log(" REFRESH_TOKEN_SECRET:", mask(process.env.REFRESH_TOKEN_SECRET));
  console.log(" REFRESH_TOKEN_EXPIRY:", process.env.REFRESH_TOKEN_EXPIRY || "<missing>");
  console.log(" CORS_ORIGIN:", process.env.CORS_ORIGIN || "<missing>");
  console.log(" PORT:", process.env.PORT || 8000);
};

const validateRequiredEnv = () => {
  const required = [
    "MONGODB_URI",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "ACCESS_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRY",
    "REFRESH_TOKEN_SECRET",
    "REFRESH_TOKEN_EXPIRY",
  ];
  const missing = required.filter((k) => !process.env[k] || process.env[k].trim() === "");
  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:", missing.join(", "));
    process.exit(1);
  }
};


const startServer = async () => {
  try {
    logLoadedEnv();
    validateRequiredEnv();
    await connectDB();

    const PORT = process.env.PORT || 8000;

    // Save the server instance
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running at port: ${PORT}`);
    });

    // Attach error listener to server, not app
    server.on("error", (error) => {
      console.error("❌ Server error:", error);
    });
  } catch (error) {
    console.error("❌ Server connection failed:", error);
  }
};

startServer();

/*
import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR: ", error);
    throw error;
  }
})();

*/

// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

const startServer = async () => {
  try {
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

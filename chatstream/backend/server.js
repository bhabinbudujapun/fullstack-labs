import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./src/routers/user.route.js";
import chatRoute from "./src/routers/chat.route.js";
import { connectMongoDB } from "./src/lib/connectMongoDB.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/user", userRoute);
app.use("/chat", chatRoute);

// Start server
const PORT = process.env.PORT || 8000;
connectMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

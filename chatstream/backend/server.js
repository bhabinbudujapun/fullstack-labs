import express from "express";
import dotenv from "dotenv";
import authRoute from "./src/routers/auth.route.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

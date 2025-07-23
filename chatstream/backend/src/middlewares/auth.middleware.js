import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const checkAccessToken = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Access token is required" });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid access token" });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in checkAccessToken middleware:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default checkAccessToken;

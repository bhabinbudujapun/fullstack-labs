import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const checkAccessToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access token is required" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select(
      "username email avatar isOnline"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = {
      userId: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      isOnline: user.isOnline,
    };
    next();
  } catch (error) {
    console.error("Error in checkAccessToken middleware:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default checkAccessToken;

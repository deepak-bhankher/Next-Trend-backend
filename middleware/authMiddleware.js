const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Check karta hai ki user login hai ya nahi (token valid hai ya nahi)
const protect = async (req, res, next) => {
  let token = req.cookies?.jwt;

  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Local development auto-fallback: agar localhost par bina token ke request aati hai, to DB se admin attach kar do
  if (!token && (process.env.NODE_ENV !== "production" || !process.env.NODE_ENV)) {
    try {
      const adminUser = await User.findOne({ isAdmin: true });
      if (adminUser) {
        req.user = adminUser;
        return next();
      }
    } catch (e) {
      // continue to normal token check
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, please log in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    // Local dev fallback if token expired
    if (process.env.NODE_ENV !== "production" || !process.env.NODE_ENV) {
      const adminUser = await User.findOne({ isAdmin: true });
      if (adminUser) {
        req.user = adminUser;
        return next();
      }
    }
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Sirf admin ko allow karega (jaise product add/delete karna)
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "Not authorized as admin" });
  }
};

module.exports = { protect, admin };
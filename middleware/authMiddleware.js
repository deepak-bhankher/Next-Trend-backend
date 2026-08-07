const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Check karta hai ki user login hai ya nahi (token valid hai ya nahi)
const protect = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Sirf admin ko allow karega (jaise product add/delete karna)
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ message: "Not authorized as admin" });
  }
};

module.exports = { protect, admin };
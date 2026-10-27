const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const sendEmail = require("../utils/sendEmail");

// Login token banata hai aur cookie mein bhej deta hai
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 din
  });
  return token;
};

// @desc    Naya user register karo
// @route   POST /api/users/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    sendEmail(
      user.email,
      "Welcome to Next Trend!",
      `<div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
    <h2>Welcome to Next Trend, ${user.name}! 👟</h2>
    <p>We're thrilled to have you join our community of sneaker lovers.</p>
    <p>At Next Trend, you'll find premium sneakers from top brands, curated just for you. Explore our latest collection and step into your stride today.</p>
    <p>If you have any questions, feel free to reach out to our support team anytime.</p>
    <p>Happy shopping!</p>
    <p><strong>Team Next Trend</strong></p>
  </div>`,
    );
    const token = generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    User login karo
// @route   POST /api/users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(res, user._id);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    User logout karo
// @route   POST /api/users/logout
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(0),
  });
  res.json({ message: "Logged out successfully" });
};

// @desc    Login user ki profile laao
// @route   GET /api/users/profile
const getUserProfile = async (req, res) => {
  const user = req.user;
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

// @desc    Google se login/register karo
// @route   POST /api/users/google-login
const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      // Naya user banao (Google se pehli baar login)
      user = await User.create({
        name,
        email,
        googleId,
      });
      sendEmail(
        user.email,
        "Welcome to Next Trend!",
        `<div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
      <h2>Welcome to Next Trend, ${user.name}! 👟</h2>
      <p>We're thrilled to have you join our community of sneaker lovers.</p>
      <p>At Next Trend, you'll find premium sneakers from top brands, curated just for you. Explore our latest collection and step into your stride today.</p>
      <p>If you have any questions, feel free to reach out to our support team anytime.</p>
      <p>Happy shopping!</p>
      <p><strong>Team Next Trend</strong></p>
    </div>`,
      );
    } else if (!user.googleId) {
      // Existing user (jo pehle normal register hua tha) ab Google se link ho raha hai
      user.googleId = googleId;
      await user.save();
    }

    const authToken = generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: authToken,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({ message: "Google authentication failed" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  googleLogin,
};

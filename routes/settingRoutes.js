const express = require("express");
const StoreSetting = require("../models/StoreSetting");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @desc    Get store settings
// @route   GET /api/settings
router.get("/", async (req, res) => {
  try {
    let settings = await StoreSetting.findOne();
    if (!settings) {
      settings = await StoreSetting.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update store settings (admin only)
// @route   PUT /api/settings
router.put("/", protect, admin, async (req, res) => {
  try {
    let settings = await StoreSetting.findOne();
    if (!settings) {
      settings = new StoreSetting(req.body);
    } else {
      const sections = ["navbar", "hero", "seasonDrop", "about", "footer"];
      sections.forEach((sec) => {
        if (req.body[sec]) {
          const existing = settings[sec] ? settings[sec].toObject() : {};
          settings[sec] = { ...existing, ...req.body[sec] };
          settings.markModified(sec);
        }
      });
      const ignoredKeys = ["_id", "__v", "createdAt", "updatedAt", ...sections];
      Object.keys(req.body).forEach((key) => {
        if (!ignoredKeys.includes(key)) {
          settings[key] = req.body[key];
        }
      });
    }
    const updated = await settings.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

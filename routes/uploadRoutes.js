const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @desc    Upload single image from laptop/device
// @route   POST /api/upload
router.post("/", protect, admin, (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Return the relative URL path that express.static serves
    res.json({
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
      message: "Image uploaded successfully",
    });
  });
});

module.exports = router;

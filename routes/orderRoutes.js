const express = require("express");
const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect,admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrders);
router.route("/all").get(protect, admin, getAllOrders);
router.route("/:id/status").put(protect, admin, updateOrderStatus);
router.route("/:id").get(protect, getOrderById);

module.exports = router;

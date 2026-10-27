const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const sendEmail = require("../utils/sendEmail");

// @desc    Naya order banao (checkout ke waqt)
// @route   POST /api/orders
const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();
    sendEmail(
      process.env.OWNER_EMAIL,
      "🛍️ New Order Received!",
      `<div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
    <h2>New Order on Next Trend!</h2>
    <p><strong>Order ID:</strong> ${createdOrder._id}</p>
    <p><strong>Total:</strong> ₹${createdOrder.totalPrice}</p>
    <p><strong>Items:</strong></p>
    <ul>
      ${createdOrder.orderItems.map((item) => `<li>${item.name} (Size ${item.size}) x${item.qty} — ₹${item.price}</li>`).join("")}
    </ul>
    <p><strong>Shipping Address:</strong><br/>
      ${createdOrder.shippingAddress.address}, ${createdOrder.shippingAddress.city}<br/>
      ${createdOrder.shippingAddress.postalCode}, ${createdOrder.shippingAddress.country}<br/>
      Phone: ${createdOrder.shippingAddress.phone}
    </p>
    <p>Login to the admin dashboard to view full details.</p>
  </div>`,
    );
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Login user ke sabhi orders laao
// @route   GET /api/orders/myorders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Ek order ki detail laao ID se
// @route   GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Sabhi orders laao (sirf admin)
// @route   GET /api/orders/all
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Order status update karo (sirf admin)
// @route   PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const { status } = req.body;

    if (status === "Delivered") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    } else if (status === "Shipped") {
      order.isDelivered = false;
      order.status = "Shipped";
    } else {
      order.isDelivered = false;
      order.status = "Processing";
    }

    const updatedOrder = await order.save();
    if (status === "Delivered") {
      const customer = await User.findById(order.user);
      if (customer) {
        sendEmail(
          customer.email,
          "📦 Your Order Has Been Delivered!",
          `<div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
        <h2>Your order has arrived! 🎉</h2>
        <p><strong>Order ID:</strong> ${updatedOrder._id}</p>
        <p>Your order has been successfully delivered. We hope you love your new shoes!</p>
        <p>Thank you for shopping with Next Trend.</p>
        <p><strong>Team Next Trend</strong></p>
      </div>`,
        );
      }
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Admin stats aur analytics laao
// @route   GET /api/orders/stats
const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

    const pendingOrders = await Order.countDocuments({ status: "Processing" });
    const shippedOrders = await Order.countDocuments({ status: "Shipped" });
    const deliveredOrders = await Order.countDocuments({ status: "Delivered" });

    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments({ isAdmin: { $ne: true } });

    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalOrders,
      totalRevenue,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      totalProducts,
      totalUsers,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Order delete karo (sirf admin)
// @route   DELETE /api/orders/:id
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.deleteOne();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getAdminStats,
  deleteOrder,
};

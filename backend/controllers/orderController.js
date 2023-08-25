import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// Create new order,POST /api/orders,Private
const addOrderItems = asyncHandler(async (req, res) => {
  //   res.send("create order");
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// Get logged in user orders,GET /api/orders/myorders,Private
const getMyOrders = asyncHandler(async (req, res) => {
  //res.send("get logged in user orders");
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// Get order by ID,GET /api/orders/:id,Private
const getOrderById = asyncHandler(async (req, res) => {
  //   res.send("get order by id");

  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// Update order to paid,PUT /api/orders/:id/pay,Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  //res.send("update order to paid");
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// Update order to delivered,PUT /api/orders/:id/deliver,Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  //res.send("update order to delivered");
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// Get all orders,GET /api/orders,Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  // res.send("get all orders");
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};

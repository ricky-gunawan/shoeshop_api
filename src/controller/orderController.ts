import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel";

export const getUserOrders = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user._id;
  let orders: {};
  orders = await Order.find({ user: userId });
  res.json(orders);
});

export const createOrder = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user._id;
  const { date, items, totalItems, totalPrice, address, payment } = req.body;
  await Order.create({ user: userId, date, items, totalItems, totalPrice, address, payment });
  res.status(201).send("Order created");
});

export const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  let orders: {};
  orders = await Order.find({});
  res.json(orders);
});

export const getOrder = asyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  let orders: {};
  orders = (await Order.findById(orderId)) || {};
  res.json(orders);
});

export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const { date, items, totalItems, totalPrice, address, payment, isPaid } = req.body;
  await Order.findByIdAndUpdate(orderId, { $set: { date, items, totalItems, totalPrice, address, payment, isPaid } });
  res.send("Order updated");
});

export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  await Order.deleteOne({ _id: orderId });
  res.send("Order deleted");
});

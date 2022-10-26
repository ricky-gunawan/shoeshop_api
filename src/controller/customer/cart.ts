import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Cart from "../../models/cartModel";

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;

  let cart: {};
  const searchCart = await Cart.findOne({ user: userId });
  if (searchCart) {
    cart = searchCart;
  } else {
    await Cart.create({ user: userId, items: [] });
    cart = (await Cart.findOne({ user: userId })) || {};
  }

  res.json(cart);
});

export const updateCart = asyncHandler(async (req: any, res: Response) => {
  const userId = req.userId;
  const { items } = req.body;

  await Cart.findOneAndUpdate({ user: userId }, { $set: { items } }, { runValidators: true, new: true });
  res.send({ message: "Cart updated" });
});

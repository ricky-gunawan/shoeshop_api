import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { isValidObjectId } from "mongoose";
import Cart from "../models/cartModel";
import { CustomError } from "../models/customError";

export const getCarts = asyncHandler(async (req: Request, res: Response) => {
  const carts = await Cart.find({});
  res.json(carts);
});

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.id;
  if (!isValidObjectId(_id)) {
    throw new CustomError(`Invalid ID`, 400);
  }

  let cart: {};
  const searchCart = await Cart.findOne({ user: _id });
  if (searchCart) {
    cart = searchCart;
  } else {
    await Cart.create({ user: _id, items: [] });
    cart = (await Cart.findOne({ user: _id })) || {};
  }

  res.json(cart);
});

export const updateCart = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.id;
  const { items } = req.body;

  await Cart.findOneAndUpdate({ user: _id }, { $set: { items } }, { runValidators: true, new: true });
  res.send("Cart updated");
});

export const deleteCart = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.id;
  await Cart.deleteOne({ user: _id });
  res.send("Cart deleted");
});

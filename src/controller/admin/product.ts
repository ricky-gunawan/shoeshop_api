import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CustomError } from "../../models/customError";
import Product from "../../models/productModel";

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { img, name, price, brand, color, description } = req.body;
  if (
    (brand === "adidas" || brand === "converse" || brand === "new balance" || brand === "nike" || brand === "puma" || brand === "reebok" || brand === "vans") &&
    (color === "black" || color === "white" || color === "red" || color === "blue" || color === "green")
  ) {
    await Product.create({ img, name, price, brand, color, description });
    res.status(201).send({ message: "Product created" });
  } else {
    throw new CustomError(`brand or color invalid`, 400);
  }
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.productId;
  const { img, name, price, brand, color, description } = req.body;
  if (
    (brand === "adidas" || brand === "converse" || brand === "new balance" || brand === "nike" || brand === "puma" || brand === "reebok" || brand === "vans" || brand === undefined) &&
    (color === "black" || color === "white" || color === "red" || color === "blue" || color === "green" || color === undefined)
  ) {
    await Product.findByIdAndUpdate(_id, { $set: { img, name, price, brand, color, description } }, { runValidators: true });
    res.send({ message: "Product created" });
  } else {
    throw new CustomError(`brand or color invalid`, 400);
  }
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.productId;
  await Product.deleteOne({ _id });
  res.send({ message: "Product deleted" });
});

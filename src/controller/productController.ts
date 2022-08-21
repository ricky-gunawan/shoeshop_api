import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { isValidObjectId } from "mongoose";
import { CustomError } from "../models/customError";
import Product from "../models/productModel";

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const { brand, color } = req.query;
  let products: {};
  if (brand === "all" && color === "all") {
    const data = await Product.find({});
    products = data;
  } else if (brand === "all") {
    const data = await Product.find({ color: color });
    products = data;
  } else if (color === "all") {
    const data = await Product.find({ brand: brand });
    products = data;
  } else {
    const data = await Product.find({ brand: brand, color: color });
    products = data;
  }
  res.json(products);
});

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.id;
  if (!isValidObjectId(_id)) {
    throw new CustomError(`Invalid ID`, 400);
  }

  let product: {};
  const searchProduct = await Product.findById(_id);
  if (searchProduct) {
    product = searchProduct;
  } else {
    throw new CustomError(`Couldn't find the product with ID: ${_id}`, 404);
  }

  res.json(product);
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { img, name, price, brand, color, description } = req.body;
  if (
    (brand === "adidas" || brand === "converse" || brand === "new balance" || brand === "nike" || brand === "puma" || brand === "reebok" || brand === "vans") &&
    (color === "black" || color === "white" || color === "red" || color === "blue" || color === "green")
  ) {
    await Product.create({ img, name, price, brand, color, description });
    res.status(201).send(`Product created`);
  } else {
    throw new CustomError(`brand or color invalid`, 400);
  }
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.id;
  const { img, name, price, brand, color, description } = req.body;
  if (
    (brand === "adidas" || brand === "converse" || brand === "new balance" || brand === "nike" || brand === "puma" || brand === "reebok" || brand === "vans" || brand === undefined) &&
    (color === "black" || color === "white" || color === "red" || color === "blue" || color === "green" || color === undefined)
  ) {
    await Product.findOneAndUpdate({ _id }, { $set: { img, name, price, brand, color, description } }, { runValidators: true });
    res.send(`Product updated`);
  } else {
    throw new CustomError(`brand or color invalid`, 400);
  }
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.id;
  await Product.deleteOne({ _id });
  res.send(`Product deleted`);
});

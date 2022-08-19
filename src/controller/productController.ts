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
  const params = req.params.id;
  if (!isValidObjectId(params)) {
    throw new CustomError(`Invalid id`, 400);
  }

  let product: {};
  const searchProduct = await Product.findById(params);
  if (searchProduct) {
    product = searchProduct;
  } else {
    throw new CustomError(`Couldn't find the product with ID: ${params}`, 404);
  }

  res.json(product);
});

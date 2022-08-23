import { Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/userModel";
import { CustomError } from "../models/customError";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!(authorization && authorization.startsWith("Bearer"))) {
    throw new CustomError("Not Authorized", 400);
  }
  const token = authorization.split(" ")[1];
  const decode: any = jwt.verify(token, process.env.JWT_SECRET as Secret);
  const user = await User.findById(decode.data);
  if (!user) {
    throw new CustomError("Not Authorized", 400);
  }
  req.user = user;
  next();
});

export const admin = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!(authorization && authorization.startsWith("Bearer"))) {
    throw new CustomError("Not Authorized", 400);
  }
  const token = authorization.split(" ")[1];
  const decode: any = jwt.verify(token, process.env.JWT_SECRET as Secret);
  const user = await User.findById(decode.data);
  if (!(user && user.isAdmin)) {
    throw new CustomError("Not Authorized", 400);
  }
  req.user = user;
  next();
});

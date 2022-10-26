import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { isValidObjectId } from "mongoose";
import { CustomError } from "../models/customError";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import "dotenv/config";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({});
  res.json(users);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.userId;
  if (!isValidObjectId(_id)) {
    throw new CustomError(`Invalid ID`, 400);
  }

  let user: {};
  const searchUser = await User.findById(_id);
  if (searchUser) {
    user = searchUser;
  } else {
    throw new CustomError(`Couldn't find the user with ID: ${_id}`, 404);
  }

  res.json(user);
});

export const updateUser = asyncHandler(async (req: any, res: Response) => {
  const _id = req.params.userId;
  const { name, email, password, address } = req.body;
  const id = req.user._id;
  const isAdmin: boolean = req.user.isAdmin;
  if (!isAdmin && _id != id) {
    throw new CustomError("Not Authorized", 400);
  }

  const user = await User.findOne({ email, _id: { $ne: _id } });

  if (user) {
    throw new CustomError("Email has been used", 400);
  } else {
    if (password) {
      const hashPassword = await bcrypt.hashSync(password, 10);
      await User.findByIdAndUpdate(_id, { $set: { name, email, password: hashPassword, address } }, { runValidators: true, new: true });
    } else {
      await User.findByIdAndUpdate(_id, { $set: { name, email, password, address } }, { runValidators: true, new: true });
    }
    res.send({ message: "user updated" });
  }
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.userId;
  await User.deleteOne({ _id });
  res.send({ message: "User deleted" });
});

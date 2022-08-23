import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { isValidObjectId, Document } from "mongoose";
import { CustomError } from "../models/customError";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, address } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new CustomError("Email has been used", 400);
  } else {
    const hashPassword = await bcrypt.hashSync(password, 10);
    await User.create({ name, email, password: hashPassword, address });

    res.status(201).send("user created");
  }
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
    res.send("user updated");
  }
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const _id = req.params.userId;
  await User.deleteOne({ _id });
  res.send(`User deleted`);
});

export const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const userPassword: string = user?.password || "";
  const pass = await bcrypt.compare(password, userPassword);

  if (user && pass) {
    const JWT_SECRET = process.env.JWT_SECRET || "";
    const userCred = { id: user._id, name: user.name, email: user.email, address: user.address, isAdmin: user.isAdmin, token: jwt.sign({ data: user._id }, JWT_SECRET, { expiresIn: "1d" }) };
    res.json(userCred);
  } else {
    throw new CustomError("email or password doesn't match", 400);
  }
});

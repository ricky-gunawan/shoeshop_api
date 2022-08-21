import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

const uploadRoute = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file?.filename;
  res.send(file);
});

export default uploadRoute;

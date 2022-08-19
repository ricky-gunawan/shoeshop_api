import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { CustomError } from "../models/customError";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err: TypeError | CustomError, req: Request, res: Response, next: NextFunction) => {
  let customError = err;
  if (!(err instanceof CustomError)) {
    customError = new CustomError(`Server Error`);
  }
  res.status((customError as CustomError).status).send(customError);
};

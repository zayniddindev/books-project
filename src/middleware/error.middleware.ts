import { Request, Response, NextFunction } from "express";
import HttpException from "@/utils/exceptions/HttpException";

export default function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status = error.status || 500;
  const message = error.message || "Error occured!";

  res.status(status).send(message);
}

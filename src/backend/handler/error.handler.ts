import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);
  res.status(500).json({
    status: false,
    type: err?.name,
    message: "Internal Server Error",
    error: err?.message,
    date: new Date(),
    stack: err?.stack?.split("\n")[0] || null,
  });
  return;
};

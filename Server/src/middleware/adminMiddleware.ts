import { Request, Response, NextFunction } from "express";

export const admin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (user && user.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      message: "Access denied. Admin only.",
    });
  }
};
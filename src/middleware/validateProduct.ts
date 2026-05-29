import { Request, Response, NextFunction } from "express";

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method;
  
  if (method === "POST" || method === "PUT") {
    const { name, description, price, rentPrice, category } = req.body;
    if (!name || !description || !price || !rentPrice || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (typeof price !== "number" || typeof rentPrice !== "number") {
      return res.status(400).json({ message: "Price must be a number" });
    }
  }
  
  next();
};
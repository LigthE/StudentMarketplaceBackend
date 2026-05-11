import type { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }
    const user = await userService.register(username, password);
    res.status(201).json({ id: user.id, username: user.username });
  } catch (err: any) {
    if (err.message.includes("exists")) {
      return res.status(400).json({ message: "Username already exists" });
    }
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }
    const result = await userService.login(username, password);
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await userService.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, username, items } = req.body;
    const order = await userService.createOrder(userId, username, items);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};
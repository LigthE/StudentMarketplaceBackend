import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const register = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, password: hashedPassword },
  });
  return { id: user.id, username: user.username };
};

export const login = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return null;
  
  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  
  return { id: user.id, username: user.username };
};

export const getAllUsers = async () => {
  return prisma.user.findMany({ select: { id: true, username: true } });
};

export const createOrder = async (userId: number, username: string, items: any[]) => {
  const total = items.reduce((sum: number, item: any) => sum + item.price, 0);
  const order = await prisma.order.create({
    data: { 
      userId, 
      username,
      items: JSON.stringify(items), 
      total 
    },
  });
  return order;
};

export const getAllOrders = async () => {
  return prisma.order.findMany();
};
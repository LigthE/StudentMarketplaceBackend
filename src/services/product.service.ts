import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const getAllProducts = async () => {
  return prisma.product.findMany();
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({ where: { id } });
};

export const createProduct = async (data: any) => {
  return prisma.product.create({ data });
};

export const updateProduct = async (id: string, data: any) => {
  return prisma.product.update({ where: { id }, data });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({ where: { id } });
};
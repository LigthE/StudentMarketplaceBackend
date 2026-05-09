import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

let prisma: any;

const getPrisma = () => {
  if (!prisma) {
    const connectionString = process.env.DATABASE_URL!;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const { PrismaClient } = require("@prisma/client");
    prisma = new PrismaClient({ adapter });
  }
  return prisma;
};

export const getAllProducts = async () => {
  const p = getPrisma();
  return p.product.findMany();
};

export const getProductById = async (id: string) => {
  const p = getPrisma();
  return p.product.findUnique({ where: { id } });
};

export const createProduct = async (data: any) => {
  const p = getPrisma();
  return p.product.create({ data });
};

export const updateProduct = async (id: string, data: any) => {
  const p = getPrisma();
  return p.product.update({ where: { id }, data });
};

export const deleteProduct = async (id: string) => {
  const p = getPrisma();
  return p.product.delete({ where: { id } });
};
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user.routes";
import { errorHandler } from "./src/middleware/errorHandler";
import { computers } from "./src/data/computers";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req: any, res: any, next: any) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Product routes using hardcoded data.ts
app.get("/api/products", (req: any, res: any) => {
  res.json(computers);
});

app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
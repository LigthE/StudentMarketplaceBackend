import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user.routes";
import productRoutes from "./src/routes/product.routes";
import { errorHandler } from "./src/middleware/errorHandler";

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

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
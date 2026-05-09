"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
dotenv_1.default.config();
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}
const adapter = new adapter_pg_1.PrismaPg(connectionString);
const prisma = new client_1.PrismaClient({ adapter });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Hämta alla produkter (datorer)
app.get("/api/products", async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});
// Enkel rutt för att "skapa" en hyresförfrågan (för MVP räcker ett console.log)
app.post("/api/rent", (req, res) => {
    const { productId, studentEmail } = req.body;
    console.log(`Intresseanmälan för produkt ${productId} från ${studentEmail}`);
    res.status(200).json({ message: "Vi har tagit emot din förfrågan!" });
});
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
    console.log(`Backend körs på: http://localhost:${PORT}`);
});
//skit//
/*
const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'MarketplaceStudent API is running' });
});

app.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); */
//# sourceMappingURL=index.js.map
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import produkRoute from "./routes/produkRoute.js";
import penjualanRoute from "./routes/penjualanRoute.js";
import ekonomiRoute from "./routes/ekonomiRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.set('trust proxy', true);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); //Membuat folder public dapat diakses via Browser

// Routes
app.get("/", (req, res) => {
    res.send("Backend Tokoku telah aktif!");
});
app.use("/api/produk", produkRoute);
app.use("/api/penjualan", penjualanRoute);
app.use("/api/ekonomi", ekonomiRoute);

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

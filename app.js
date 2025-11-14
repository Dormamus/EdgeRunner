import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import testRoute from "./routes/testRoute.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); //Membuat folder public dapat diakses via Browser

// Routes sederhana
app.get("/", (req, res) => {
    res.send("WarungKu backend aktif!");
});
app.use("/api",testRoute);

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

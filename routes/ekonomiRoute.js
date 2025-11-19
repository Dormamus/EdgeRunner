import express from "express";
import { getAllEkonomi, getEkonomiByBulanTahun } from "../lib/ekonomiStore.js";

const router = express.Router();

// GET semua data ekonomi
router.get("/", (req, res) => {
    const data = getAllEkonomi();
    res.json(data);
});

// GET ekonomi berdasarkan bulan dan tahun (query params: ?bulan=11&tahun=2025)
router.get("/bulan-tahun", (req, res) => {
    const { bulan, tahun } = req.query;
    
    if (!bulan || !tahun) {
        return res.status(400).json({ error: "bulan dan tahun wajib diisi" });
    }
    
    const data = getEkonomiByBulanTahun(parseInt(bulan), parseInt(tahun));
    
    if (!data) {
        return res.status(404).json({ error: "Data ekonomi tidak ditemukan" });
    }
    
    res.json(data);
});

export default router;

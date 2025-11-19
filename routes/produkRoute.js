import express from "express";
import multer from "multer";
import {
    getProduk,
    addProduk,
    updateProduk,
    deleteProduk
} from "../controllers/produkController.js";

const router = express.Router();

// Konfigurasi multer untuk upload file ke memory
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

router.get("/", getProduk);
router.post("/", upload.single('gambar'), addProduk);
router.put("/:id", updateProduk);
router.delete("/:id", deleteProduk);

export default router;

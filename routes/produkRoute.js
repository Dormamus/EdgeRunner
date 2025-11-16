import express from "express";
import {
    getProduk,
    addProduk,
    updateProduk,
    deleteProduk
} from "../controllers/produkController.js";

const router = express.Router();

router.get("/", getProduk);
router.post("/", addProduk);
router.put("/:id", updateProduk);
router.delete("/:id", deleteProduk);

export default router;

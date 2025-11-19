import express from "express";
import {
    getPenjualan,
    addPenjualan,
    deletePenjualan
} from "../controllers/penjualanController.js";

const router = express.Router();

router.get("/", getPenjualan);
router.post("/", addPenjualan);
router.delete("/:id", deletePenjualan);

export default router;

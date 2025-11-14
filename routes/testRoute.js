import express from "express";
import path from "path";
import {readJSON, writeJSON} from "../lib/jsonStore.js";

const router = express.Router();
const dataPath = path.resolve("data/produk.json");

router.get("/test-read", (req, res) =>{
    const data = readJSON(dataPath);
    res.json(data);
});

router.get("/test-write", (req, res) => {
    const data = readJSON(dataPath) || [];
    data.push({test: Date.now()}); //isi dari data yang akan dikirim
    writeJSON(dataPath, data);
    res.json({status:"ok", data});
})

export default router;
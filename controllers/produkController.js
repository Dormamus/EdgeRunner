import path from "path";
import { readJSON, writeJSON } from "../lib/jsonStore.js";

const produkPath = path.resolve("data/produk.json");


// CREATE
export function addProduk(req, res) {
    const { nama, harga } = req.body;
    
    if (!nama || !harga) {
        return res.status(400).json({ error: "Nama dan harga wajib diisi" });
    }
    
    const data = readJSON(produkPath) || [];
    const newProduk = {
        id: Date.now(),
        nama,
        harga
    };
    
    data.push(newProduk);
    writeJSON(produkPath, data);

    res.json(newProduk);
}
// READ
export function getProduk(req, res) {
    const data = readJSON(produkPath) || [];
    res.json(data);
}
// UPDATE
export function updateProduk(req, res) {
    const { id } = req.params;
    const { nama, harga } = req.body;

    let data = readJSON(produkPath) || [];
    const index = data.findIndex((p) => p.id == id);

    if (index === -1) {
        return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    if (nama) data[index].nama = nama;
    if (harga) data[index].harga = harga;

    writeJSON(produkPath, data);
    res.json(data[index]);
}

// DELETE
export function deleteProduk(req, res) {
    const { id } = req.params;

    let data = readJSON(produkPath) || [];
    const newData = data.filter((p) => p.id != id);

    writeJSON(produkPath, newData);

    res.json({ sukses: true });
}

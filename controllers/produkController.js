import path from "path";
import { readJSON, writeJSON } from "../lib/jsonStore.js";
import fs from "fs";

const produkPath = path.resolve("data/produk.json");


// CREATE
export function addProduk(req, res) {
    const { nama, harga, kategori } = req.body;
    
    if (!nama || !harga || !kategori) {
        return res.status(400).json({ error: "Nama, harga, dan kategori wajib diisi" });
    }
    
    const data = readJSON(produkPath) || [];
    const produkId = Date.now();
    
    const newProduk = {
        id: produkId,
        nama,
        harga,
        kategori,
        gambar: null // akan diisi jika ada upload
    };
    
    // Jika ada file yang diupload
    if (req.file) {
        const ext = path.extname(req.file.originalname);
        const filename = `${produkId}${ext}`;
        const uploadsDir = path.resolve("public/assets/produk");
        
        // Buat folder jika belum ada
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        
        // Simpan file dengan nama = id produk
        const filePath = path.join(uploadsDir, filename);
        fs.writeFileSync(filePath, req.file.buffer);
        
        newProduk.gambar = `/assets/produk/${filename}`;
    }
    
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
    const { nama, harga, kategori } = req.body;

    let data = readJSON(produkPath) || [];
    const index = data.findIndex((p) => p.id == id);

    if (index === -1) {
        return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    if (nama) data[index].nama = nama;
    if (harga) data[index].harga = harga;
    if (kategori) data[index].kategori = kategori;

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

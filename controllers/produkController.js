import path from "path";
import { readJSON, writeJSON } from "../lib/jsonStore.js";
import fs from "fs";

const produkPath = path.resolve("data/produk.json");


// CREATE
export function addProduk(req, res) {
    const { nama, harga } = req.body;

    if (!nama || !harga) {
        return res.status(400).json({ error: "Nama dan harga wajib diisi" });
    }

    const data = readJSON(produkPath) || [];
    const produkId = Date.now();

    const newProduk = {
        id: produkId,
        nama,
        harga,
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
    const { nama, harga } = req.body;

    let data = readJSON(produkPath) || [];
    const index = data.findIndex((p) => p.id == id);

    if (index === -1) {
        return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    if (nama) data[index].nama = nama;
    if (harga) data[index].harga = harga;

    // Jika ada file baru yang diupload, simpan dan hapus file lama
    if (req.file) {
        try {
            const ext = path.extname(req.file.originalname);
            const filename = `${id}${ext}`;
            const uploadsDir = path.resolve('public/assets/produk');
            if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

            const filePath = path.join(uploadsDir, filename);
            // Tulis file baru
            fs.writeFileSync(filePath, req.file.buffer);

            // Hapus file lama jika berbeda
            const oldGambar = data[index].gambar;
            const newGambarRel = `/assets/produk/${filename}`;
            if (oldGambar && oldGambar !== newGambarRel) {
                try {
                    const oldPath = path.resolve('public' + oldGambar);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                } catch (e) {
                    console.error('Gagal menghapus gambar lama:', e);
                }
            }

            data[index].gambar = newGambarRel;
        } catch (e) {
            console.error('Gagal menyimpan file upload pada updateProduk:', e);
        }
    }

    writeJSON(produkPath, data);
    res.json(data[index]);
}

// DELETE
export function deleteProduk(req, res) {
    const { id } = req.params;

    let data = readJSON(produkPath) || [];
    // Temukan produk yang akan dihapus
    const produkToDelete = data.find((p) => String(p.id) === String(id));

    // Filter data untuk menghapus produk
    const newData = data.filter((p) => String(p.id) !== String(id));

    // Tulis data baru
    writeJSON(produkPath, newData);

    // Hapus file gambar jika ada
    if (produkToDelete && produkToDelete.gambar) {
        try {
            // gambar disimpan relatif terhadap folder `public`, contoh: /assets/produk/123.png
            const imagePath = path.resolve('public' + produkToDelete.gambar);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        } catch (err) {
            console.error('Gagal menghapus file gambar produk:', err);
            // jangan gagalkan response utama karena masalah penghapusan file
        }
    }

    res.json({ sukses: true });
}

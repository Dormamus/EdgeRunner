import path from "path";
import { readJSON, writeJSON } from "../lib/jsonStore.js";
import { updateEkonomi } from "../lib/ekonomiStore.js";

const produkPath = path.resolve("data/produk.json");
const penjualanPath = path.resolve("data/penjualan.json");

// Baca JSON penjualan
export function getPenjualan(req, res) {
    const data = readJSON(penjualanPath) || [];
    res.json(data);
}

// Tambah data penjualan
export function addPenjualan(req, res) {
    const { produkId, jumlah } = req.body;

    // Pastikan produkId ada dan jumlah dapat diubah menjadi angka
    const jumlahNum = Number(jumlah);
    if (!produkId || isNaN(jumlahNum) || jumlahNum <= 0) {
        return res.status(400).json({ error: "produkId dan jumlah (lebih dari 0) wajib diisi" });
    }

    // Bulatkan ke bawah untuk memastikan jumlah integer (contoh: 1.7 => 1)
    const jumlahInt = Math.floor(jumlahNum);

    const produk = readJSON(produkPath) || [];
    const penjualan = readJSON(penjualanPath) || [];

    const p = produk.find((item) => item.id == produkId);
    if (!p) {
        return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    const total = p.harga * jumlahInt;

    const newPenjualan = {
        id: Date.now(),
        produkId,
        namaProduk: p.nama,
        jumlah: jumlahInt,
        hargaSatuan: p.harga,
        total,
        tanggal: new Date().getDate(),
        bulan : new Date().getMonth() + 1,
        tahun : new Date().getFullYear()
    };

    penjualan.push(newPenjualan);
    writeJSON(penjualanPath, penjualan);

    // Update ekonomi.json dengan total penjualan
    updateEkonomi(total);

    res.json(newPenjualan);
}

// DELETE penjualan
export function deletePenjualan(req, res) {
    const { id } = req.params;

    let penjualan = readJSON(penjualanPath) || [];
    const deletedItem = penjualan.find((p) => p.id == id);
    penjualan = penjualan.filter((p) => p.id != id);

    writeJSON(penjualanPath, penjualan);

    // Kurangi ekonomi.json jika ada penjualan yang dihapus
    if (deletedItem) {
        updateEkonomi(-deletedItem.total);
    }

    res.json({ sukses: true });
}
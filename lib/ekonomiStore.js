import path from "path";
import { readJSON, writeJSON } from "./jsonStore.js";

const ekonomiPath = path.resolve("data/ekonomi.json");

/**
 * Update totalPendapatan di ekonomi.json berdasarkan bulan dan tahun saat ini
 * @param {number} amount - Jumlah pendapatan yang ditambahkan (bisa negatif untuk pengurangan)
 */
export function updateEkonomi(amount) {
    const ekonomi = readJSON(ekonomiPath) || [];
    const now = new Date();
    const bulanIni = now.getMonth() + 1;
    const tahunIni = now.getFullYear();

    // Cari record bulan ini
    const existingRecord = ekonomi.find(
        (item) => item.bulan === bulanIni && item.tahun === tahunIni
    );

    if (existingRecord) {
        // Update totalPendapatan
        existingRecord.totalPendapatan += amount;
    } else {
        // Buat record baru jika belum ada
        const newRecord = {
            id: Date.now(),
            bulan: bulanIni,
            tahun: tahunIni,
            totalPendapatan: Math.max(0, amount) // Jangan negatif untuk record baru
        };
        ekonomi.push(newRecord);
    }

    // Simpan kembali ke file
    writeJSON(ekonomiPath, ekonomi);
}

/**
 * Ambil data ekonomi berdasarkan bulan dan tahun
 * @param {number} bulan - Bulan (1-12)
 * @param {number} tahun - Tahun
 * @returns {object|null} - Record ekonomi atau null jika tidak ditemukan
 */
export function getEkonomiByBulanTahun(bulan, tahun) {
    const ekonomi = readJSON(ekonomiPath) || [];
    return ekonomi.find((item) => item.bulan === bulan && item.tahun === tahun) || null;
}

/**
 * Ambil semua data ekonomi
 * @returns {array} - Seluruh data ekonomi
 */
export function getAllEkonomi() {
    return readJSON(ekonomiPath) || [];
}

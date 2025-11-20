# 🚀 EdgeRunner - Sistem Manajemen Produk & Penjualan

Aplikasi web full-stack untuk mengelola katalog produk, mencatat penjualan, dan melacak pendapatan dengan dashboard yang responsif dan intuitif. Sempurna untuk UMKM, warung, atau toko kecil.

## 📋 Daftar Isi
- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Instalasi](#instalasi)
- [Cara Penggunaan](#cara-penggunaan)
- [Struktur Folder](#struktur-folder)
- [API Documentation](#api-documentation)
- [Lisensi](#lisensi)

## ✨ Fitur Utama

### 1. **Dashboard Analitik** 📊
- Visualisasi total pendapatan
- Statistik pendapatan harian, bulanan, dan tahunan
- Chart pendapatan dengan Bar Chart interaktif
- Tabel produk terlaris
- Responsive design untuk desktop & mobile

### 2. **Kelola Produk** 🛍️
- **Create**: Tambah produk baru dengan nama, harga, dan foto
- **Read**: Lihat daftar semua produk dalam grid layout
- **Update**: Edit nama, harga, dan ganti foto produk
- **Delete**: Hapus produk (gambar otomatis terhapus)
- Upload gambar dengan preview
- Limit ukuran file 5MB per gambar

### 3. **Catat Penjualan** 💰
- Input jumlah penjualan untuk multiple produk sekaligus
- Otomatis hitung total harga berdasarkan harga satuan × jumlah
- Catat tanggal penjualan otomatis
- Validasi input sebelum submit

### 4. **Riwayat Penjualan** 📝
- Lihat semua transaksi penjualan yang pernah dicatat
- Tampilan tabel dengan detail: produk, jumlah, harga, total, tanggal
- Hapus penjualan (otomatis update ekonomi)
- Responsive table dengan scroll horizontal di mobile

### 5. **Tracking Ekonomi/Pendapatan** 💵
- Otomatis update total pendapatan saat ada penjualan baru
- Otomatis kurangi pendapatan saat penjualan dihapus
- Data tercatat per bulan dan tahun
- Query pendapatan berdasarkan bulan/tahun tertentu

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js v5.1.0** - Web framework
- **Multer v1.4.5-lts.1** - File upload handling
- **FileSystem (fs)** - JSON file storage

### Frontend
- **HTML5** - Markup
- **Tailwind CSS** - Styling (via CDN)
- **JavaScript (ES6 Modules)** - Interactivity
- **Chart.js** - Data visualization (opsional, bisa ditambahkan)

### Database
- **JSON Files** - Persistent storage (no database required)
  - `data/produk.json` - Data produk
  - `data/penjualan.json` - Data penjualan
  - `data/ekonomi.json` - Data pendapatan

## 💾 Instalasi

### Prerequisites
- Node.js v14+ dan npm
- Terminal/Command Prompt

### Setup Steps

```bash
# 1. Clone repository
git clone https://github.com/Dormamus/EdgeRunner.git
cd EdgeRunner

# 2. Install dependencies
npm install

# 3. Jalankan aplikasi
npm run mulai

# 4. Buka di browser
# http://localhost:3000
```

Saat pertama kali berjalan, aplikasi akan otomatis membuat folder `data/` dengan 3 file JSON.

## 🎯 Cara Penggunaan

### Dashboard (Halaman Utama)
1. Akses `http://localhost:3000`
2. Lihat ringkasan pendapatan: total, hari ini, bulan ini
3. Lihat chart statistik pendapatan per bulan
4. Lihat tabel produk terlaris
5. Klik "Riwayat Transaksi" untuk lihat semua penjualan

### Kelola Produk
1. Klik menu "Produk" atau ke `http://localhost:3000/produk.html`
2. Klik tombol "Tambah Produk"
3. Isi form:
   - **Nama Produk**: Nama/jenis barang
   - **Harga**: Harga per satuan (angka)
   - **Foto**: Upload gambar produk (opsional)
4. Klik "Simpan" untuk tambah
5. Klik "Edit" untuk mengubah produk
6. Klik "Delete" untuk menghapus produk

### Catat Penjualan
1. Klik menu "Pendapatan" atau ke `http://localhost:3000/penjualan.html`
2. Lihat daftar semua produk
3. Untuk setiap produk yang terjual, isi **Jumlah**
4. Klik tombol "Konfirmasi" (floating button di bawah)
5. Sistem akan mencatat penjualan dan otomatis update pendapatan
6. Input akan reset, siap catat penjualan berikutnya

### Riwayat Penjualan
1. Dari Dashboard, klik "Riwayat Transaksi"
2. Atau ke `http://localhost:3000/history.html`
3. Lihat tabel semua penjualan yang pernah dicatat
4. Klik tombol "Delete" untuk menghapus penjualan tertentu
5. Total pendapatan otomatis berkurang

## 📁 Struktur Folder

```
EdgeRunner/
├── app.js                          # Entry point aplikasi
├── package.json                    # Dependencies & scripts
├── README.md                       # File ini
│
├── controllers/                    # Business logic
│   ├── produkController.js
│   ├── penjualanController.js
│   └── (ekonomiController di routes)
│
├── routes/                         # API endpoints
│   ├── produkRoute.js
│   ├── penjualanRoute.js
│   └── ekonomiRoute.js
│
├── lib/                            # Utility functions
│   ├── jsonStore.js               # Baca/tulis JSON
│   └── ekonomiStore.js            # Logic ekonomi
│
├── data/                           # Database (JSON files)
│   ├── produk.json                # Daftar produk
│   ├── penjualan.json             # Daftar penjualan
│   └── ekonomi.json               # Data pendapatan
│
└── public/                         # Frontend - Static files
    ├── index.html                 # Dashboard
    ├── produk.html                # Halaman produk
    ├── penjualan.html             # Halaman catat penjualan
    ├── history.html               # Halaman riwayat penjualan
    ├── koneksi.js                 # API client library
    ├── assets/
        └── produk/                # Folder gambar produk
```

## 🔌 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Produk Endpoints

#### GET /api/produk
Mendapatkan semua produk
```bash
curl http://localhost:3000/api/produk
```
**Response:**
```json
[
  {
    "id": 1700000000000,
    "nama": "Nasi Cumi Hitam",
    "harga": 15000,
    "gambar": "/assets/produk/1700000000000.jpg"
  }
]
```

#### POST /api/produk
Menambah produk baru
```bash
curl -X POST http://localhost:3000/api/produk \
  -F "nama=Nasi Cumi Hitam" \
  -F "harga=15000" \
  -F "gambar=@/path/to/image.jpg"
```
**Body:** FormData (multipart/form-data)
- `nama`: string (required)
- `harga`: number (required)
- `gambar`: File (optional)

**Response:** Produk object yang baru dibuat

#### PUT /api/produk/:id
Mengupdate produk
```bash
curl -X PUT http://localhost:3000/api/produk/1700000000000 \
  -F "nama=Nasi Cumi Hitam Updated" \
  -F "harga=16000" \
  -F "gambar=@/path/to/image.jpg"
```
**Body:** FormData (multipart/form-data)
- `nama`: string (optional)
- `harga`: number (optional)
- `gambar`: File (optional)

**Response:** Produk object yang diupdate

#### DELETE /api/produk/:id
Menghapus produk
```bash
curl -X DELETE http://localhost:3000/api/produk/1700000000000
```
**Response:**
```json
{ "sukses": true }
```

### Penjualan Endpoints

#### GET /api/penjualan
Mendapatkan semua penjualan
```bash
curl http://localhost:3000/api/penjualan
```
**Response:**
```json
[
  {
    "id": 1700000000001,
    "produkId": 1700000000000,
    "namaProduk": "Nasi Cumi Hitam",
    "jumlah": 2,
    "hargaSatuan": 15000,
    "total": 30000,
    "tanggal": 20,
    "bulan": 11,
    "tahun": 2025
  }
]
```

#### POST /api/penjualan
Menambah penjualan
```bash
curl -X POST http://localhost:3000/api/penjualan \
  -H "Content-Type: application/json" \
  -d '{"produkId": 1700000000000, "jumlah": 2}'
```
**Body:** JSON
- `produkId`: number (required)
- `jumlah`: number (required)

**Response:** Penjualan object yang baru dibuat

**Note:** Saat menambah penjualan, sistem otomatis:
- Menghitung total = hargaSatuan × jumlah
- Update ekonomi.json dengan total pendapatan

#### DELETE /api/penjualan/:id
Menghapus penjualan
```bash
curl -X DELETE http://localhost:3000/api/penjualan/1700000000001
```
**Response:**
```json
{ "sukses": true }
```

**Note:** Saat menghapus penjualan, sistem otomatis kurangi total pendapatan

### Ekonomi Endpoints

#### GET /api/ekonomi
Mendapatkan semua data ekonomi
```bash
curl http://localhost:3000/api/ekonomi
```
**Response:**
```json
[
  {
    "id": 1700000000002,
    "bulan": 11,
    "tahun": 2025,
    "totalPendapatan": 500000
  }
]
```

#### GET /api/ekonomi/bulan-tahun
Mendapatkan ekonomi bulan tertentu
```bash
curl "http://localhost:3000/api/ekonomi/bulan-tahun?bulan=11&tahun=2025"
```
**Query Parameters:**
- `bulan`: 1-12 (required)
- `tahun`: number (required)

**Response:**
```json
{
  "id": 1700000000002,
  "bulan": 11,
  "tahun": 2025,
  "totalPendapatan": 500000
}
```

## 🔧 Konfigurasi

### Port Server
Edit `app.js` untuk mengubah port (default: 3000):
```javascript
const PORT = 3000; // Ubah ke port lain jika diperlukan
```

### Limit Ukuran File
Edit `routes/produkRoute.js` untuk mengubah max file size:
```javascript
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB, ubah sesuai kebutuhan
});
```

## 📱 Responsive Design

Aplikasi mendukung semua ukuran layar:
- **Mobile**: < 768px (single column, hamburger menu)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (full layout, sidebar)

## 🚨 Error Handling

### HTTP Status Codes
- **200 OK**: Request berhasil
- **400 Bad Request**: Input tidak valid/tidak lengkap
- **404 Not Found**: Resource tidak ditemukan
- **500 Internal Server Error**: Error di server

### Common Errors
| Error | Penyebab | Solusi |
|-------|----------|--------|
| "Nama dan harga wajib diisi" | Form produk tidak lengkap | Isi semua field required |
| "Produk tidak ditemukan" | ID produk tidak valid | Refresh halaman |
| "produkId dan jumlah wajib diisi" | Form penjualan tidak lengkap | Isi jumlah penjualan |
| Gambar tidak tersimpan | File terlalu besar | Gunakan file < 5MB |

## 📊 Format Data

### produk.json
```json
[
  {
    "id": 1700000000000,
    "nama": "Produk 1",
    "harga": 10000,
    "gambar": "/assets/produk/1700000000000.jpg"
  }
]
```

### penjualan.json
```json
[
  {
    "id": 1700000000001,
    "produkId": 1700000000000,
    "namaProduk": "Produk 1",
    "jumlah": 2,
    "hargaSatuan": 10000,
    "total": 20000,
    "tanggal": 20,
    "bulan": 11,
    "tahun": 2025
  }
]
```

### ekonomi.json
```json
[
  {
    "id": 1700000000002,
    "bulan": 11,
    "tahun": 2025,
    "totalPendapatan": 500000
  }
]
```

## 🔐 Keamanan

- ✅ Input validation pada semua endpoint
- ✅ File upload size limit (5MB)
- ✅ File path validation untuk mencegah path traversal
- ✅ Unique ID menggunakan timestamp
- ✅ Error handling yang proper (tidak expose internal error)

## 📝 Lisensi

ISC License - Silakan gunakan dan modifikasi sesuai kebutuhan.

## 👨‍💻 Author

**Dormamus**  
GitHub: https://github.com/Dormamus/EdgeRunner

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:
1. Fork repository
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat issue di GitHub.

---

**Dibuat dengan ❤️ untuk UMKM Indonesia**
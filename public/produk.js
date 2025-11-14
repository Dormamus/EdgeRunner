const tableBody = document.querySelector("#produk-table tbody");
const form = document.getElementById("form-produk");

const API_URL = "/api/produk";

// Ambil semua produk dan tampilkan di tabel
async function loadProduk() {
    const res = await fetch(API_URL);
    const data = await res.json();

    tableBody.innerHTML = "";

    data.forEach(p => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nama}</td>
            <td>${p.harga} Rupiah</td>
            <td>
                <button onclick="hapusProduk(${p.id})">Hapus</button>
            </td>
        `;

        tableBody.appendChild(tr);
    });
}

// Tambah produk
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const harga = document.getElementById("harga").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, harga })
    });

    form.reset();
    loadProduk();
});

// Hapus produk
async function hapusProduk(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    loadProduk();
}

// Jalankan pertama kali
loadProduk();
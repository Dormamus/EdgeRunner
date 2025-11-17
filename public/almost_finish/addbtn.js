document.addEventListener("DOMContentLoaded", () => {

  const processBtn = document.getElementById("outbtn");
  const outputBox = document.querySelector(".output");

  processBtn.addEventListener("click", () => {
    const allProducts = document.querySelectorAll(".produk");
    let hasil = "";
    let nomor = 1;

    allProducts.forEach(prod => {
      const teks = prod.querySelector("p").textContent;
      const jumlah = Number(prod.querySelector("input").value);
      
      const [nama, hargaStr] = teks.split(",");
      const harga = Number(hargaStr.replace(/[^0-9]/g, ""));
      
      if (jumlah > 0) {
        const total = harga * jumlah;

        hasil += `${nomor}. ${nama.trim()} — Harga: ${harga} — Jumlah: ${jumlah} — Total: ${total}\n`;
        nomor++;
      }
    });

    if (hasil === "") {
      outputBox.textContent = "Tidak ada barang yang dipilih.";
    } else {
      outputBox.textContent = hasil;
    }
  });

});
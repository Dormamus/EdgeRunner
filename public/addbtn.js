document.addEventListener("DOMContentLoaded", () => {

  const processBtn = document.getElementById("outbtn");
  const outputBox = document.querySelector(".output");
  const burger = document.querySelector('.burger');
  const sidebarc = document.querySelector('.sidebarc');
  const openPopup = document.getElementById("openPopup");
  const closePopup = document.getElementById("closePopup");
  const submitBtn = document.getElementById("submitProduk");
  
  const overlay = document.getElementById("popupOverlay");
  const box = document.querySelector(".popupBox");
  
  // input
  const inputKategori = document.getElementById("popupKategori");
  const inputNama = document.getElementById("popupNama");
  const inputHarga = document.getElementById("popupHarga");
  const inputFoto = document.getElementById("popupFoto");
  const preview = document.getElementById("previewFoto");
  
  const listProduk = document.getElementById("listProduk");
    
  let isSwappingTop = false;
  let isSwappingBottom = false;
  const SWAP_DURATION = 300;
  const animateAndSwap = (currentVisible, nextVisible, callback) => {
    nextVisible.classList.remove('hviewp'); 
    nextVisible.classList.add('cviewp'); 
    currentVisible.classList.add('is-sliding-out');
    nextVisible.classList.add('is-sliding-in');
    setTimeout(() => {
        currentVisible.classList.remove('is-sliding-out');
        nextVisible.classList.remove('is-sliding-in');
        currentVisible.classList.add('hviewp');
        currentVisible.classList.remove('cviewp');
        nextVisible.style.transform = 'translateX(0)'; 
        if (callback) callback();
    }, SWAP_DURATION);
};


  window.swapTop = () => { 
      if (isSwappingTop) return; 
     isSwappingTop = true;
      const pair1 = document.querySelector('.g5');
      const pair2 = document.querySelector('.g6' );
     const currentVisible = pair1.classList    .contains('cviewp') ? pair1 : pair2;
     const nextVisible = currentVisible === pair1  ? pair2 : pair1;
     animateAndSwap(currentVisible, nextVisible, () => {
        isSwappingTop = false;
      });
  };

window.swapBottom = () => {
  if (isSwappingBottom) return; 
  isSwappingBottom = true;
  const pair1 = document.querySelector('.g7');
  const pair2 = document.querySelector('.g8');
  const currentVisible = pair1.classList.contains('cviewp') ? pair1 : pair2;
  const nextVisible = currentVisible === pair1 ? pair2 : pair1;
  animateAndSwap(currentVisible, nextVisible, () => {
      isSwappingBottom = false;
  });
};

  
  burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  sidebarc.classList.toggle('active');
  })

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
  // tombol
let editMode = false;
let produkEdit = null;

// OPEN POPUP
openPopup.onclick = () => {
  editMode = false;
  produkEdit = null;

  inputKategori.value = "makanan";
  inputNama.value = "";
  inputHarga.value = "";
  inputFoto.value = "";
  preview.style.display = "none";

  overlay.classList.add("show");
  box.classList.add("show");
};

// CLOSE POPUP
closePopup.onclick = () => {
  overlay.classList.remove("show");
  box.classList.remove("show");
};

// PREVIEW FOTO
inputFoto.onchange = () => {
  const file = inputFoto.files[0];
  if (!file) return;

  if (!["image/jpeg", "image/png"].includes(file.type)) {
    alert("Foto harus JPG atau PNG");
    inputFoto.value = "";
    return;
  }

  const url = URL.createObjectURL(file);
  preview.src = url;
  preview.style.display = "block";
};

// SUBMIT PRODUK
submitBtn.onclick = () => {
  const nama = inputNama.value.trim();
  const harga = inputHarga.value.trim();
  const foto = preview.src;

  if (!nama || !harga || preview.style.display === "none") {
    alert("Nama, harga, dan foto wajib diisi!");
    return;
  }

  // -------------------------------
  // FIX TERPENTING: HILANGKAN "div"
  // -------------------------------
  if (editMode && produkEdit) {
    produkEdit.querySelector(".name p").textContent = nama;
    produkEdit.querySelector(".price p").textContent = `${harga}/pcs`;
    produkEdit.querySelector(".photo").src = foto;
  } else {
    const item = document.createElement("div");

    // FIX: pakai class list saja, bukan "div list"
    item.className = "list";

    item.innerHTML = `
      <div class="nameprice">
        <div class="name"><p>${nama}</p></div>
        <div class="price"><p>${harga}/pcs</p></div>
      </div>
      <div class="img"><img class="photo" src="${foto}"></div>
      <div class="edit">
        <button class="edit1 btn">Edit</button>
        <button class="remove btn">Hapus</button>
      </div>
    `;

    listProduk.appendChild(item);

    item.querySelector(".edit1").onclick = () => bukaEdit(item);
    item.querySelector(".remove").onclick = () => item.remove();
  }

  overlay.classList.remove("show");
  box.classList.remove("show");
};

// EDIT PRODUK
function bukaEdit(item) {
  editMode = true;
  produkEdit = item;

  inputNama.value = item.querySelector(".name p").textContent;
  inputHarga.value = item.querySelector(".price p").textContent.replace("/pcs", "").trim();
  preview.src = item.querySelector(".photo").src;
  preview.style.display = "block";

  overlay.classList.add("show");
  box.classList.add("show");
}

});
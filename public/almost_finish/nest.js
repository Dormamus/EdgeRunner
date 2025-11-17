function hideWithTransition(el) {
  el.classList.add("hiding"); // fade out dulu

  setTimeout(() => {
    el.style.display = "none"; // setelah fade selesai baru hilang total
  }, 300); // waktu sama dengan CSS transition
}

function showWithTransition(el) {
  el.style.display = "block"; // munculkan dulu

  setTimeout(() => {
    el.classList.remove("hiding"); // lalu fade in
  }, 10);
}

/* ======================================
   FUNGSI SWAP (DITAMBAHKAN)
   ====================================== */
function swapTop() {
  const g5 = document.querySelector(".g5");
  const g6 = document.querySelector(".g6");

  if (g5.style.display !== "none") {
    hideWithTransition(g5);
    showWithTransition(g6);
  } else {
    hideWithTransition(g6);
    showWithTransition(g5);
  }
}
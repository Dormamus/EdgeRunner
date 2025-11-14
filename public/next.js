const burger = document.querySelector('.burger');
const sidebar = document.querySelector('.sidebar');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  sidebar.classList.toggle('active');
})

window.swapTop = () => { 
    const pair1 = document.querySelector('.g5');
    const pair2 = document.querySelector('.g6');

    if (pair1 && pair2) {
        // Logika Swap: Menukar kelas cviewp dan hviewp
        pair1.classList.toggle('cviewp');
        pair1.classList.toggle('hviewp');
        pair2.classList.toggle('cviewp');
        pair2.classList.toggle('hviewp');
    }
};

// Fungsi untuk menukar pasangan Grid BAWAH (g7 dan g8)
window.swapBottom = () => {
  const pair1 = document.querySelector('.g7');
  const pair2 = document.querySelector('.g8');

  if (pair1 && pair2) {
      // Logika Swap: Menukar kelas cviewp dan hviewp
      pair1.classList.toggle('cviewp');
      pair1.classList.toggle('hviewp');
      pair2.classList.toggle('cviewp');
      pair2.classList.toggle('hviewp');
  }
};
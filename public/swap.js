// Variable untuk mencegah double-click & mengatur durasi
let isSwappingTop = false;
let isSwappingBottom = false;
const SWAP_DURATION = 300; // Durasi animasi dalam milidetik

/**
 * Fungsi inti untuk mengimplementasikan animasi dan swap.
 */
const animateAndSwap = (currentVisible, nextVisible, callback) => {
    // 1. Persiapkan elemen yang akan tampil (agar bisa dianimasikan)
    nextVisible.classList.remove('hviewp'); 
    nextVisible.classList.add('cviewp'); 
    
    // 2. Terapkan animasi
    currentVisible.classList.add('is-sliding-out');
    nextVisible.classList.add('is-sliding-in');
    
    // 3. Setelah animasi selesai, lakukan swap final
    setTimeout(() => {
        // Hapus class animasi
        currentVisible.classList.remove('is-sliding-out');
        nextVisible.classList.remove('is-sliding-in');
        
        // Sembunyikan elemen yang sudah keluar
        currentVisible.classList.add('hviewp');
        currentVisible.classList.remove('cviewp');

        // Reset transform
        nextVisible.style.transform = 'translateX(0)'; 

        // Panggil callback untuk mereset flag
        if (callback) callback();
    }, SWAP_DURATION);
};


window.swapTop = () => { 
    if (isSwappingTop) return; 
    isSwappingTop = true;

    const pair1 = document.querySelector('.g5');
    const pair2 = document.querySelector('.g6');

    // Tentukan elemen mana yang sedang terlihat (currentVisible)
    const currentVisible = pair1.classList.contains('cviewp') ? pair1 : pair2;
    const nextVisible = currentVisible === pair1 ? pair2 : pair1;

    animateAndSwap(currentVisible, nextVisible, () => {
        isSwappingTop = false;
    });
};

window.swapBottom = () => {
  if (isSwappingBottom) return; 
  isSwappingBottom = true;

  const pair1 = document.querySelector('.g7');
  const pair2 = document.querySelector('.g8');

  // Tentukan elemen mana yang sedang terlihat (currentVisible)
  const currentVisible = pair1.classList.contains('cviewp') ? pair1 : pair2;
  const nextVisible = currentVisible === pair1 ? pair2 : pair1;

  animateAndSwap(currentVisible, nextVisible, () => {
      isSwappingBottom = false;
  });
};

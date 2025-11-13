// Fungsi untuk toggle sidebar (tetap sederhana)
function toggleSidebar(){
      document.querySelector('.sidebar').classList.toggle('active');
}

// Fungsi Swap Utama: Menerima ID tombol untuk menentukan grup mana yang ditukar
function swapGrids(buttonId) {
    let visibleGrid, hiddenGrid;

    // --- Logika Penentuan Grup Swap ---
    
    if (buttonId === 'swpbtn1') {
        // Ini adalah tombol untuk Grup Atas (ig5 dan ig6)
        const g5 = document.getElementById('ig5');
        const g6 = document.getElementById('ig6');
        
        // Tentukan mana yang aktif
        const isG5Visible = g5.classList.contains('cviewp');
        visibleGrid = isG5Visible ? g5 : g6;
        hiddenGrid = isG5Visible ? g6 : g5;

    } else if (buttonId === 'swpbtn2') {
        // Ini adalah tombol untuk Grup Bawah (ig7 dan ig8)
        const g7 = document.getElementById('ig7');
        const g8 = document.getElementById('ig8');

        // Tentukan mana yang aktif
        const isG7Visible = g7.classList.contains('cviewp');
        visibleGrid = isG7Visible ? g7 : g8;
        hiddenGrid = isG7Visible ? g8 : g7;
    }
    
    // --- Melakukan Swap ---
    
    if (visibleGrid && hiddenGrid) {
        // Sembunyikan yang saat ini terlihat
        visibleGrid.classList.remove('cviewp');
        visibleGrid.classList.add('hviewp');
        
        // Tampilkan yang saat ini tersembunyi
        hiddenGrid.classList.remove('hviewp');
        hiddenGrid.classList.add('cviewp');
    }
}

// Menghubungkan tombol swap ke fungsi swapGrids dengan parameter
document.addEventListener('DOMContentLoaded', () => {
    const swpbtn1 = document.getElementById('swpbtn1');
    const swpbtn2 = document.getElementById('swpbtn2');

    // Tombol 1 hanya memanggil swapGrids dengan ID 'swpbtn1'
    if (swpbtn1) {
        swpbtn1.addEventListener('click', () => swapGrids('swpbtn1'));
    }
    
    // Tombol 2 hanya memanggil swapGrids dengan ID 'swpbtn2'
    if (swpbtn2) {
        swpbtn2.addEventListener('click', () => swapGrids('swpbtn2'));
    }
});

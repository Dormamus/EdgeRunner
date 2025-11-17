window.swapTop = () => { 
    const pair1 = document.querySelector('.g5');
    const pair2 = document.querySelector('.g6');

    if (pair1 && pair2) {
        pair1.classList.toggle('cviewp');
        pair1.classList.toggle('hviewp');
        pair2.classList.toggle('cviewp');
        pair2.classList.toggle('hviewp');
    }
};

window.swapBottom = () => {
  const pair1 = document.querySelector('.g7');
  const pair2 = document.querySelector('.g8');

  if (pair1 && pair2) {
      pair1.classList.toggle('cviewp');
      pair1.classList.toggle('hviewp');
      pair2.classList.toggle('cviewp');
      pair2.classList.toggle('hviewp');
  }
};
const burger = document.querySelector('.burger');
const sidebarc = document.querySelector('.sidebarc');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  sidebarc.classList.toggle('active');
})
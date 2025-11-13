
const bar = document.getElementById('gc5');

  new Chart(bar, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# JUMLAH PENJUALAN',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio : false,
      responsive : true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

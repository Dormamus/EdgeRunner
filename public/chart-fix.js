const bar = document.getElementById('barchart');
const line = document.getElementById('linechart');
const pie = document.getElementById('chartpie');
const pie2 = document.getElementById('chartpie2');

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
  
  new Chart(line, {
    type: 'line',
    data:
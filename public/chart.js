const bar = document.getElementById('gc5');
const mline = document.getElementById('gc6');
const xValues = [100,200,300,400,500,600,700,800,900,1000];

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
  

new Chart(mline, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
      borderColor: "red",
      fill: true,
      label:"Merah",
    },{
      data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
      borderColor: "green",
      fill: true
    },{
      data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
      borderColor: "blue",
      fill: true
    }]
  },
  options: {
    legend: {
       display: true
    },
    maintainAspectRatio: false,
    responsive: true,
  }
});
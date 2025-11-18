const line1 = document.getElementById('linechart').getContext("2d");
const line2 = document.getElementById('linechart2').getContext("2d");
const gradient1 = line1.createLinearGradient(0, 0, 600, 0);
gradient1.addColorStop(0, "rgba(45,162,216,0)");
gradient1.addColorStop(1, "rgba(45,162,216,0.4)");
const gradient2 = line2.createLinearGradient(0, 0, 600, 0);
gradient2.addColorStop(0, "rgb(54,177,106,0)");
gradient2.addColorStop(1, "rgb(54,177,106,0.4)");

new Chart(line1, {
  type: 'line',
  data: {
    labels: ['day 7', 'day 14', 'day 21', 'day 28', 'day 35', 'dsy 42'],
    datasets: [
      {
        label: 'Growth in 42 Days',
        data: [30, 45, 50, 70, 65, 90],
        borderWidth: 1,
        borderColor: 'rgba(45,162,216',
        backgroundColor: gradient1,
        tension: 0.3,
        fill: true,
        fontsize: 20,
      },
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        color: "white",
        text: "Earning Growt in 42 Days",
      },
      legend: {
        display: false,
      }
    },
    scales: {
      x: {
        ticks: {
          color: "white"
        }
      },
      y: {
        ticks: {
          color: "white"
        }
      }
    }
  }
});

new Chart(line2, {
  type: 'line',
  data: {
    labels: ['day 7', 'day 14', 'day 21', 'day 28', 'day 35', 'dsy 42'],
    datasets: [
      {
        label: 'Growth in 42 Days',
        data: [30, 45, 50, 70, 65, 90],
        borderWidth: 1,
        borderColor: 'rgb(54,177,106)',
        backgroundColor: gradient2,
        tension: 0.3,
        fill: true,
        fontsize: 20,
      },
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        color: "white",
        text: "Earning Growt in 42 Days",
      },
      legend: {
        display: false,
      }
    },
    scales: {
      x: {
        ticks: {
          color: "white"
        }
      },
      y: {
        ticks: {
          color: "white"
        }
      }
    }
  }
});
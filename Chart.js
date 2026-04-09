let donutChart;

function getFontColor() {
  const theme = document.getElementById('theme-style').getAttribute('href');
  return theme.includes('white') ? '#000000' : '#ffffff';
}

window.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('donutChart').getContext('2d');
  const fontColor = getFontColor();

  Chart.defaults.color = fontColor;

  const data = {
    labels: ['Passed', 'Failed', 'Skipped'],
    datasets: [{
      data: [12, 2, 1],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(234, 179, 8, 0.8)'
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(234, 179, 8, 1)'
      ],
      borderWidth: 2
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1500,
        easing: 'easeOutCubic'
      },
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            boxWidth: 10,
            padding: 15,
            color: fontColor,
            font: {
              size: 14,
              family: 'Poppins',
              weight: 'bold'
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw}`;
            }
          }
        }
      }
    }
  };

});

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setTimeout(() => {
      const newColor = getFontColor();

      Chart.defaults.color = newColor;
      donutChart.options.plugins.legend.labels.color = newColor;

      donutChart.reset();
      donutChart.update();
    }, 100);
  });
});
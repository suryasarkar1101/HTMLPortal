let donutChart;

const ctx = document.getElementById('donutChart').getContext('2d');

// 🎨 Create gradients
const greenGradient = ctx.createLinearGradient(0, 0, 0, 200);
greenGradient.addColorStop(0, 'rgba(34, 197, 94, 1)');
greenGradient.addColorStop(1, 'rgba(34, 197, 94, 0.4)');

const redGradient = ctx.createLinearGradient(0, 0, 0, 200);
redGradient.addColorStop(0, 'rgba(239, 68, 68, 1)');
redGradient.addColorStop(1, 'rgba(239, 68, 68, 0.4)');

const yellowGradient = ctx.createLinearGradient(0, 0, 0, 200);
yellowGradient.addColorStop(0, 'rgba(234, 179, 8, 1)');
yellowGradient.addColorStop(1, 'rgba(234, 179, 8, 0.4)');

// 🟣 Violet (New 4th color)
const violetGradient = ctx.createLinearGradient(0, 0, 0, 200);
violetGradient.addColorStop(0, 'rgba(139, 92, 246, 1)');
violetGradient.addColorStop(1, 'rgba(139, 92, 246, 0.4)');

function getFontColor() {
  const theme = document.getElementById('theme-style').getAttribute('href');
  return theme.includes('white') ? '#000000' : '#ffffff';
}


function getChartData(moduleData) {
  let totalSuccess = 0;
  let totalFail = 0;
  let nonVerifying = 0;
  let totalScripts = 0;

  moduleData.forEach(item => {
    totalSuccess += item.total_success;
    totalFail += item.total_fail;
    nonVerifying += item.non_verifying;
    totalScripts += item.total_script;
  });

  // Remaining (not counted in above)
  const others = totalScripts - (totalSuccess + totalFail + nonVerifying);

  return [totalSuccess, totalFail, nonVerifying, others];
}


window.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('donutChart').getContext('2d');
  const fontColor = getFontColor();
  const dynamicChartData = getChartData(moduleData);

  Chart.defaults.color = fontColor;

  const data = {
    labels: [' Passed', ' Failed', ' Non-Verifying ', ' Skipped',],
    datasets: [{
      data: dynamicChartData,
      backgroundColor: [
        greenGradient,
        redGradient,
        yellowGradient,
        violetGradient
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(234, 179, 8, 1)',
        'rgba(139, 92, 246, 1)'
      ],
      borderWidth: 1
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

            boxWidth: 8,
            boxHeight: 8,

            padding: 20,

            // 🔥 IMPORTANT (controls actual dot size)
            generateLabels: function (chart) {
              const original = Chart.overrides.doughnut.plugins.legend.labels.generateLabels;
              const labels = original(chart);

              labels.forEach(label => {
                const value = chart.data.datasets[0].data[label.index];
                const text = chart.data.labels[label.index];

                label.text = `  ${value} ${text}`;

                label.pointStyle = 'circle';
                label.radius = 3.5; // dot size
              });

              return labels;
            },

            color: fontColor,
            font: {
              size: 14,
              family: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
              weight: 600,
              lineHeight: 1
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
  requestAnimationFrame(() => {
    donutChart = new Chart(ctx, config);
  });

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
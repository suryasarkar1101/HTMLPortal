window.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('donutChart').getContext('2d');

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
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 20,
            padding: 15
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}`;
            }
          }
        }
      }
    }
  };

  
  const donutChart = new Chart(ctx, config);

  // Optional center text
  const container = ctx.canvas.parentNode;
  const centerText = document.createElement('div');
  centerText.innerText = '15'; 
  centerText.style.position = 'absolute';
  centerText.style.top = '50%';
  centerText.style.left = '50%';
  centerText.style.transform = 'translate(-50%, -50%)';
  centerText.style.fontWeight = 'bold';
  centerText.style.fontSize = '20px';
  container.style.position = 'relative';
  container.appendChild(centerText);
});
  const notificationPopup = document.querySelector('.notification-popup');
  const notificationIcon = document.querySelector('.notification i');
  notificationIcon.addEventListener('click', () => notificationPopup.classList.toggle('active'));

  const ipElement = document.getElementById('user-ip');
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => ipElement.textContent = data.ip)
    .catch(() => ipElement.textContent = "No disponible");

  const batteryElement = document.getElementById('battery-status');
  if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
      function updateBatteryStatus() {
        batteryElement.textContent = `${Math.round(battery.level * 100)}% ${battery.charging ? 'Cargando' : 'No cargando'}`;
      }
      updateBatteryStatus();
      battery.addEventListener('levelchange', updateBatteryStatus);
      battery.addEventListener('chargingchange', updateBatteryStatus);
    });
  } else {
    batteryElement.textContent = "No disponible";
  }

  const totalRequestsElement = document.getElementById('total-requests');

  async function fetchTotalRequests() {
    try {
      const response = await fetch('https://eliasar-yt-api.vercel.app/api/system-stats');
      const data = await response.json();
      if (data.status === "success") {
        totalRequestsElement.textContent = data.stats.totalRequests.toLocaleString();
      } else {
        totalRequestsElement.textContent = "Error al cargar";
      }
    } catch (error) {
      totalRequestsElement.textContent = "No disponible";
      console.error('Error al obtener las estadísticas:', error);
    }
  }

  document.getElementById('total-requests').addEventListener('click', fetchTotalRequests);

  fetchTotalRequests();

  function toggleTheme() {
    document.body.classList.toggle('light-theme');
  }

  function filterMenu(input) {
    const filter = input.value.toLowerCase();
    const links = document.querySelectorAll('.menu-content a');
    links.forEach(link => {
      if (link.textContent.toLowerCase().includes(filter)) {
        link.style.display = '';
      } else {
        link.style.display = 'none';
      }
    });
  }

 /* const ctx = document.getElementById('apiUsageChart').getContext('2d');
  const apiUsageChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [{
        label: 'Uso de API',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'Meses' },
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Solicitudes' },
        }
      }*/
    }
  });
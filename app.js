// ─── Theme Switcher ───────────────────────────────────────────────
const themeLink = document.getElementById('theme-style');
const themeBtns = document.querySelectorAll('.theme-btn');
const themesidebar = document.getElementById("sidebar");

// Helper: get active theme button
function getActiveThemeBtn() {
  return document.querySelector('.theme-btn.active');
}

// Apply a theme
function applyTheme(theme) {
  themeLink.setAttribute('href', "themes/" + theme + ".css");

  themeBtns.forEach(btn => btn.classList.remove('active'));
  const btn = document.querySelector(`.theme-btn[data-theme="${theme}"]`);
  if (btn) btn.classList.add('active');

  localStorage.setItem('selectedTheme', theme);
}

// Click logic for theme buttons
themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.getAttribute('data-theme');
    applyTheme(theme);
  });
});

// Cycle theme when sidebar is collapsed
const bottomThemeSwitcher = document.querySelector('.bottom .theme-switcher');
bottomThemeSwitcher.addEventListener('click', () => {
  if (!themesidebar.classList.contains('collapsed')) return; // Only cycle when collapsed

  const themes = Array.from(themeBtns).map(btn => btn.getAttribute('data-theme'));
  let activeBtn = getActiveThemeBtn();
  let currentIndex = themes.indexOf(activeBtn.getAttribute('data-theme'));
  let nextIndex = (currentIndex + 1) % themes.length;
  applyTheme(themes[nextIndex]);
});

// Restore saved theme on load
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('selectedTheme');
  if (saved) {
    applyTheme(saved);
  }
});


// ─── Table Filter (Search + Status) ──────────────────────────────
function filterTable() {
  const searchVal = document.getElementById('searchInput').value.toLowerCase().trim();
  const statusVal = document.getElementById('statusFilter').value.toLowerCase();
  const rows      = document.querySelectorAll('#testTableBody tr');

  let visibleCount = 0;

  rows.forEach(row => {
    if (row.classList.contains('no-results')) return;

    const text   = row.textContent.toLowerCase();
    const status = row.getAttribute('data-status') || '';

    const matchSearch = searchVal === '' || text.includes(searchVal);
    const matchStatus = statusVal === 'all' || status === statusVal;

    if (matchSearch && matchStatus) {
      row.style.display = '';
      visibleCount++;
    } else {
      row.style.display = 'none';
    }
  });

  // Remove existing "no results" row if present
  const existingEmpty = document.querySelector('.no-results');
  if (existingEmpty) existingEmpty.remove();

  // Show "no results" message if nothing matches
  if (visibleCount === 0) {
    const tbody = document.getElementById('testTableBody');
    const emptyRow = document.createElement('tr');
    emptyRow.className = 'no-results';
    emptyRow.innerHTML = `<td colspan="4">No tests match your search.</td>`;
    tbody.appendChild(emptyRow);
  }
}

// ─── Sidebar ──────────────────────────────

const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});





// Card data
const cardData = [
  { title: "TOTAL MODULE", value: 2, subtitle: "Executed", icon: "fa-solid fa-chart-diagram", className: "gray" },
  { title: "TOTAL TESTS", value: 15, subtitle: "Executed", icon: "fa-solid fa-list-check", className: "teal" },
  { title: "PASSED", value: 12, subtitle: "80.0% Success Rate", icon: "fa-regular fa-circle-check", className: "green" },
  { title: "FAILED", value: 2, subtitle: "13.3% Failure Rate", icon: "fa-regular fa-circle-xmark", className: "red" },
  { title: "DURATION", value: "12m 34s", subtitle: "Total Execution Time", icon: "fa-regular fa-clock", className: "blue" }
];

// Function to create a card
function createCard({ title, value, subtitle, icon, className }) {
  const card = document.createElement("div");
  card.className = `stat-card ${className}`; // use the className from data
  card.innerHTML = `
    <div class="icon-box outline">
      <i class="${icon}"></i>
    </div>
    <div>
      <div class="card-title">${title}</div>
      <div class="card-value">${value}</div>
      <span class="card-sub-title">${subtitle}</span>
    </div>
  `;
  return card;
}

// Render cards
const container = document.getElementById("cards-container");
cardData.forEach(data => container.appendChild(createCard(data)));




//Chart.js part


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


//===================================navigation============================================


const menuItems = document.querySelectorAll(".sidebar ul li");

// Get current page name
const currentPage = window.location.pathname.split("/").pop();

menuItems.forEach(item => {
  const page = item.getAttribute("data-page");

  // ✅ Set active on load
  if (page === currentPage || (currentPage === "" && page === "index.html")) {
    item.classList.add("menu-selected");
  }

  // ✅ Click → navigate
  item.addEventListener("click", () => {
    window.location.href = page;
  });
});




//=========================test card dynamic function===========================


const testData = [
  { id: "TC_001", desc: "Login with valid credentials", status: "passed", duration: "00:00:28" },
  { id: "TC_002", desc: "Logout", status: "passed", duration: "00:00:19" },
  { id: "TC_003", desc: "Invalid password", status: "failed", duration: "00:00:31" },
  { id: "TC_004", desc: "Add to cart", status: "passed", duration: "00:00:24" },
  { id: "TC_005", desc: "Checkout", status: "failed", duration: "00:00:47" },
  { id: "TC_006", desc: "Sort products by price", status: "passed", duration: "00:00:22" },
  { id: "TC_007", desc: "View product details", status: "passed", duration: "00:00:18" },
  { id: "TC_008", desc: "Remove item from cart", status: "passed", duration: "00:00:33" },
  { id: "TC_009", desc: "Continue shopping after cart", status: "passed", duration: "00:00:27" },
  { id: "TC_010", desc: "Fill checkout information", status: "passed", duration: "00:00:41" },
  { id: "TC_011", desc: "Order confirmation page", status: "passed", duration: "00:00:36" },
  { id: "TC_012", desc: "Navigate back from checkout", status: "passed", duration: "00:00:29" },
  { id: "TC_013", desc: "Social media links", status: "skipped", duration: "00:00:00" }
];

// 🔥 icon + class mapping
function getStatusUI(status) {
  if (status === "passed") {
    return {
      icon: "fa-circle-check pass-icon",
      badge: "badge pass",
      text: "Passed"
    };
  } else if (status === "failed") {
    return {
      icon: "fa-circle-xmark fail-icon",
      badge: "badge fail",
      text: "Failed"
    };
  } else {
    return {
      icon: "fa-circle-minus skip-icon",
      badge: "badge skip",
      text: "Skipped"
    };
  }
}

function generateTable(data) {
  const tbody = document.getElementById("testTableBody");
  tbody.innerHTML = "";

  data.forEach(test => {
    const ui = getStatusUI(test.status);

    const row = document.createElement("tr");
    row.setAttribute("data-status", test.status);

    row.innerHTML = `
      <td>
        <i class="fa-solid ${ui.icon}"></i>
        <strong>${test.id}</strong>
      </td>

      <td>
        <strong>${test.desc}</strong>
      </td>

      <td>
        <span class="${ui.badge}">${ui.text}</span>
      </td>

      <td>
        ${test.duration}
      </td>
    `;

    tbody.appendChild(row);
  });
}

// 🔥 Load on start
window.addEventListener("DOMContentLoaded", () => {
  generateTable(testData);
});

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
// window.moduleData = [
//   { module: "AdWeb_Audit", excution_time: 72781, total_script: 80, total_success: 25, total_fail: 15, non_verifying: 0 },
//   { module: "AdWeb_BusinessViews", excution_time: 321321, total_script: 65, total_success: 25, total_fail: 15, non_verifying: 2 },
//   { module: "AdWeb_CoreModelsExport", excution_time: 261959, total_script: 175, total_success: 25, total_fail: 15, non_verifying: 3 },
//   { module: "AdWeb_CoreModelsImport", excution_time: 492654, total_script: 60, total_success: 25, total_fail: 15, non_verifying: 1 },
//   { module: "DLLUtils_AAC", excution_time: 13251, total_script: 12, total_success: 25, total_fail: 15, non_verifying: 5 },
//   { module: "DLLUtils_AAD", excution_time: 152794, total_script: 85, total_success: 25, total_fail: 15, non_verifying: 1 },
//   { module: "DLLUtils_MM", excution_time: 175992, total_script: 54, total_success: 25, total_fail: 15, non_verifying: 2 },
//   { module: "DLLUtils_MT_1", excution_time: 108628, total_script: 125, total_success: 25, total_fail: 15, non_verifying: 1 },
//   { module: "Export", excution_time: 820172, total_script: 50, total_success: 25, total_fail: 15, non_verifying: 0 },
//   { module: "LabelCode", excution_time: 21508, total_script: 54, total_success: 25, total_fail: 15, non_verifying: 0 },
//   { module: "LanguagesAdmin", excution_time: 68386, total_script: 25, total_success: 25, total_fail: 15, non_verifying: 5 },
//   { module: "ModelsApplications", excution_time: 186215, total_script: 50, total_success: 25, total_fail: 15, non_verifying: 8 },
//   { module: "NewForm", excution_time: 8601227, total_script: 80, total_success: 25, total_fail: 15, non_verifying: 1 }
// ];

window.moduleData = [
  {
    module: "AdWeb_Audit",
    excution_time: 72781,
    total_script: 3,
    total_success: 2,
    total_fail: 1,
    non_verifying: 0,
    tests: [
      { id: "TC_001", desc: "Login with valid credentials", status: "passed", duration: "00:00:28" },
      { id: "TC_002", desc: "Logout", status: "passed", duration: "00:00:19" },
      { id: "TC_003", desc: "Invalid password", status: "failed", duration: "00:00:31" }
    ]
  },
  {
    module: "AdWeb_BusinessViews",
    excution_time: 321321,
    total_script: 4,
    total_success: 3,
    total_fail: 1,
    non_verifying: 2,
    tests: [
      { id: "TC_004", desc: "Add to cart", status: "passed", duration: "00:00:24" },
      { id: "TC_005", desc: "Checkout", status: "failed", duration: "00:00:47" },
      { id: "TC_003", desc: "Invalid password", status: "non_verifying", duration: "00:00:31" }
    ]
  },
  {
    module: "AdWeb_CoreModelsExport",
    excution_time: 261959,
    total_script: 5,
    total_success: 2,
    total_fail: 0,
    non_verifying: 3,
    tests: [
      { id: "TC_006", desc: "Sort products by price", status: "passed", duration: "00:00:22" },
      { id: "TC_007", desc: "View product details", status: "passed", duration: "00:00:18" }
    ]
  },
  {
    module: "AdWeb_CoreModelsImport",
    excution_time: 492654,
    total_script: 3,
    total_success: 2,
    total_fail: 0,
    non_verifying: 1,
    tests: [
      { id: "TC_008", desc: "Remove item from cart", status: "passed", duration: "00:00:33" },
      { id: "TC_009", desc: "Continue shopping after cart", status: "passed", duration: "00:00:27" }
    ]
  },
  {
    module: "DLLUtils_AAC",
    excution_time: 13251,
    total_script: 7,
    total_success: 2,
    total_fail: 0,
    non_verifying: 5,
    tests: [
      { id: "TC_010", desc: "Fill checkout information", status: "passed", duration: "00:00:41" },
      { id: "TC_011", desc: "Order confirmation page", status: "passed", duration: "00:00:36" }
    ]
  },
  {
    module: "DLLUtils_AAD",
    excution_time: 152794,
    total_script: 3,
    total_success: 2,
    total_fail: 0,
    non_verifying: 1,
    tests: [
      { id: "TC_012", desc: "Navigate back from checkout", status: "passed", duration: "00:00:29" },
      { id: "TC_013", desc: "Social media links", status: "skipped", duration: "00:00:00" }
    ]
  }
];


function updateChartStats(moduleData) {
  let totalTime = 0;
  let totalTests = 0;
  let totalSuccess = 0;

  moduleData.forEach(item => {
    totalTime += item.excution_time;
    totalTests += item.total_script;
    totalSuccess += item.total_success;
  });

  // Total Duration
  const formattedTotalTime = formatDuration(totalTime);

  // Avg per test
  const avgTime = totalTime / totalTests;
  const formattedAvgTime = formatDuration(avgTime);

  // Success %
  const successRate = ((totalSuccess / totalTests) * 100).toFixed(1) + "%";

  // Update UI
  document.getElementById("totalDuration").innerText = formattedTotalTime;
  document.getElementById("avgTest").innerText = formattedAvgTime;
  document.getElementById("successRate").innerText = successRate;
}



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
  themeLink.setAttribute('href', "assets/css/themes/" + theme + ".css");

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
  const availableThemes = Array.from(themeBtns).map(btn => btn.getAttribute('data-theme'));
  if (saved && availableThemes.includes(saved)) {
    applyTheme(saved);
  } else if (availableThemes.length > 0) {
    applyTheme(availableThemes[0]); // fallback to first theme if invalid
  }
});


// ─── Table Filter (Search + Status) ──────────────────────────────
function filterTable(tableBodyId, colspan, includeStatus = false) {
  const searchVal = document.getElementById('searchInput').value.toLowerCase().trim();
  const statusVal = includeStatus ? document.getElementById('statusFilter').value.toLowerCase() : 'all';
  const rows = document.querySelectorAll(`#${tableBodyId} tr`);

  let visibleCount = 0;

  rows.forEach(row => {
    if (row.classList.contains('no-results')) return;

    const text = row.textContent.toLowerCase();
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
    const tbody = document.getElementById(tableBodyId);
    const emptyRow = document.createElement('tr');
    emptyRow.className = 'no-results';
    emptyRow.innerHTML = `<td colspan="${colspan}">No ${tableBodyId.includes('test') ? 'tests' : 'modules'} match your search.</td>`;
    tbody.appendChild(emptyRow);
  }
}

// ─── Sidebar ──────────────────────────────

const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

//========================== card data ===================

function calculateDashboardData(moduleData) {
  let totalModules = moduleData.length;

  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;
  let totalNonVerifying = 0;
  let totalTime = 0;

  moduleData.forEach(item => {
    totalTests += item.total_script;
    totalPassed += item.total_success;
    totalFailed += item.total_fail;
    totalNonVerifying += item.non_verifying;
    totalTime += item.excution_time;
  });

  // % calculations
  const successRate = ((totalPassed / totalTests) * 100).toFixed(1);
  const failRate = ((totalFailed / totalTests) * 100).toFixed(1);
  const nonVerifyingRate = ((totalNonVerifying / totalTests) * 100).toFixed(1);

  return {
    totalModules,
    totalTests,
    totalPassed,
    totalFailed,
    totalNonVerifying,
    totalTime,
    successRate,
    failRate,
    nonVerifyingRate
  };
}


function getCardData(moduleData) {
  const data = calculateDashboardData(moduleData);

  return [
    {
      title: "TOTAL MODULE",
      value: data.totalModules,
      subtitle: "Executed",
      icon: "fa-solid fa-chart-diagram",
      className: "gray"
    },
    {
      title: "TOTAL TESTS",
      value: data.totalTests,
      subtitle: "Executed",
      icon: "fa-solid fa-list-check",
      className: "teal"
    },
    {
      title: "PASSED",
      value: data.totalPassed,
      subtitle: `${data.successRate}% Success Rate`,
      icon: "fa-regular fa-circle-check",
      className: "green"
    },
    {
      title: "FAILED",
      value: data.totalFailed,
      subtitle: `${data.failRate}% Failure Rate`,
      icon: "fa-regular fa-circle-xmark",
      className: "red"
    },
    {
      title: "NON-VERIFYING",
      value: data.totalNonVerifying,
      subtitle: `${data.nonVerifyingRate}% Non-Verifying`,
      icon: "fa-solid fa-triangle-exclamation",
      className: "yellow"
    },
    {
      title: "DURATION",
      value: formatDuration(data.totalTime, false),
      subtitle: "Total Execution Time",
      icon: "fa-regular fa-clock",
      className: "blue"
    }
  ];
}


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
function renderCards(data, isTestcasePage = false) {
  const container = document.getElementById("cards-container");
  if (!container) return;

  container.innerHTML = "";

  let dynamicCardData = getCardData(data);

  // 🔥 Remove "TOTAL MODULE" card in testcase page
  if (isTestcasePage) {
    dynamicCardData = dynamicCardData.filter(card => card.title !== "TOTAL MODULE");
  }else {
    // 🔥 For dashboard, we want to show all cards excepts Non Verifing 
    dynamicCardData = dynamicCardData.filter(card => card.title !== "NON-VERIFYING");
  }

  dynamicCardData.forEach(card => {
    container.appendChild(createCard(card));
  });
}


//===================================navigation============================================


window.addEventListener("DOMContentLoaded", () => {

  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      const page = item.getAttribute("data-page");

      if (page) {
        window.location.href = page;
      }
    });
  });

});



//=========================test card dynamic function===========================




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

  }
  else if (status === "non_verifying") {
    return {
      icon: "fa-solid fa-triangle-exclamation non-icon",
      badge: "badge non",
      text: "Non-Verifying"
    };

  }
  else {
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
    row.setAttribute("class", "data-row");

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

  const testTable = document.getElementById("testTableBody");
  const moduleTable = document.getElementById("moduleTableBody");

  const selectedModule = JSON.parse(localStorage.getItem("selectedModule"));

  // ================== TESTCASES PAGE ==================
  if (selectedModule && testTable) {

    const title = document.getElementById("reportTitle");

    if (title) {
      title.innerText = `Test Execution Results of ${selectedModule.module}`;
    }

    // 🔥 ADD THIS (YOU MISSED THIS)
    renderCards([selectedModule], true);

    // 👉 table
    generateTable(selectedModule.tests || []);
  }

  // ================== DASHBOARD PAGE ==================
  else {

    if (moduleTable) {
      generateModuleTable(moduleData, "moduleTableBody");
    }

    // 👉 default (false)
    renderCards(moduleData);

    updateChartStats(moduleData);
  }

});


//=========================================== Module Table ==================

function generateModuleTable(data, tableBodyId) {
  const tbody = document.getElementById(tableBodyId);
  tbody.innerHTML = "";

  data.forEach(item => {
    const row = document.createElement("tr");
    row.setAttribute("class", "data-row");

    row.innerHTML = `
      <td><strong>${item.module}</strong></td>
      <td>${formatDuration(item.excution_time)}</td>
      <td>${item.total_script}</td>
      <td style="color:#22c55e;">${item.total_success}</td>
      <td style="color:#ef4444;">${item.total_fail}</td>
      <td style="color:#f59e0b;">${item.non_verifying}</td>
    `;

    // 🔥 ADD THIS (IMPORTANT)
    row.addEventListener("click", () => {
      localStorage.setItem("selectedModule", JSON.stringify(item));
      window.location.href = "testcases.html";
    });

    tbody.appendChild(row);
  });
}

function formatDuration(ms, includeSec = true) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  if (includeSec) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }else {
    return `${hours}h ${minutes}m`;
  }
}





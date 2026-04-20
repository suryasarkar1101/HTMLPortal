async function loadModuleData() {
  try {
    const response = await fetch('data/moduleData.json');
    if (!response.ok) {
      throw new Error('Failed to fetch module data');
    }
    window.moduleData = await response.json();
  } catch (error) {
    console.error('Error loading module data:', error);
    // Fallback to hardcoded data if fetch fails
    window.moduleData = [
      {
        module: "AdWeb_Audit",
        excution_time: 72781,
        total_script: 3,
        total_success: 2,
        total_fail: 1,
        non_verifying: 0,
        tests: [
          { id: "TC_001", desc: "Login with valid credentials", status: "passed", duration: 28, comment: "Test data test full comment" },
          { id: "TC_002", desc: "Logout", status: "passed", duration: 19, comment: "Test data test full comment TC_002" },
          { id: "TC_003", desc: "Invalid password", status: "failed", duration: 31, comment: "Test data test full comment TC_002" }
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
          { id: "TC_004", desc: "Check the ablity to open TxHourTracking module in window mode", status: "passed", duration: 24, comment: "Test data test full comment TC_001", testBugRef: "24568" },
          { id: "TC_005", desc: "Check the scale and pagination when Full horizon is selected in Paging scale dropdown list for scale 1 day slots, grouped by week in the Gantt view window of Contacts/Tasks view", status: "failed", duration: 47, comment: "Test data test full comment TC_002", testBugRef: "24569" },
          { id: "TC_003", desc: "Invalid password", status: "non_verifying", duration: 31, comment: "Test data test full comment TC_003", comment: "Test data test full comment TC_003", testBugRef: "" },
          { id: "TC_003", desc: "Invalid password", status: "non_verifying", duration: 31, comment: "Test data test full comment TC_003", comment: "Test data test full comment TC_003", testBugRef: "" },
          { id: "TC_003", desc: "Invalid password", status: "non_verifying", duration: 31, comment: "Test data test full comment TC_003", comment: "Test data test full comment TC_003", testBugRef: "" },
          { id: "TC_003", desc: "Invalid password", status: "non_verifying", duration: 31, comment: "Test data test full comment TC_003", comment: "Test data test full comment TC_003", testBugRef: "" },
          { id: "TC_003", desc: "Invalid password", status: "non_verifying", duration: 31, comment: "Test data test full comment TC_003", comment: "Test data test full comment TC_003", testBugRef: "" },
          { id: "TC_003", desc: "Invalid password", status: "non_verifying", duration: 31, comment: "Test data test full comment TC_003", comment: "Test data test full comment TC_003", testBugRef: "" },
          { id: "TC_003", desc: "Invalid password", status: "non_verifying", duration: 31, comment: "Test data test full comment TC_003", comment: "Test data test full comment TC_003", testBugRef: "" },
          { id: "TC_003", desc: "Invalid password", status: "non_verifying", duration: 31, comment: "Test data test full comment TC_003", comment: "Test data test full comment TC_003", testBugRef: "" },
          { id: "TC_003", desc: "Invalid password", status: "non_verifying", duration: 31, comment: "Test data test full comment TC_003", comment: "Test data test full comment TC_003", testBugRef: "" },
          { id: "TC_003", desc: "Invalid password", status: "non_verifying", duration: 31, comment: "Test data test full comment TC_003", comment: "Test data test full comment TC_003", testBugRef: "" },
          { id: "TC_003", desc: "Invalid password", status: "non_verifying", duration: 31, comment: "Test data test full comment TC_003", comment: "Test data test full comment TC_003", testBugRef: "" },
          { id: "TC_003", desc: "Invalid password", status: "non_verifying", duration: 31, comment: "Test data test full comment TC_003", comment: "Test data test full comment TC_003", testBugRef: "" },
          { id: "TC_004", desc: "Invalid password 2", status: "non_verifying", duration: 31, comment: "Test data test full comment TC_003", comment: "Test data test full comment TC_004", testBugRef: "" }
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
          { id: "TC_006", desc: "Sort products by price", status: "passed", duration: 22 },
          { id: "TC_007", desc: "View product details", status: "passed", duration: 18 }
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
          { id: "TC_008", desc: "Remove item from cart", status: "passed", duration: 33 },
          { id: "TC_009", desc: "Continue shopping after cart", status: "passed", duration: 27 }
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
          { id: "TC_010", desc: "Fill checkout information", status: "passed", duration: 41 },
          { id: "TC_011", desc: "Order confirmation page", status: "passed", duration: 36 }
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
          { id: "TC_012", desc: "Navigate back from checkout", status: "passed", duration: 29 },
          { id: "TC_013", desc: "Social media links", status: "skipped", duration: 12 }
        ]
      }
    ];
  }
}


function updateChartStatsdashboard(moduleData) {
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
  } else {
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

    row.addEventListener("click", () => {
      openModal(test, row);
    });
    row.setAttribute("data-status", test.status);
    row.setAttribute("class", "data-row");

    row.innerHTML = `
      <td class="cell-test-id">
        <i class="fa-solid ${ui.icon}"></i>
        <strong>${test.id}</strong>
      </td>

      <td class="cell-test-details">${test.desc}</td>

      <td class="cell-test-status">
        <span class="${ui.badge}">${ui.text}</span>
      </td>

      <td class="cell-test-duration">${formatDuration(test.duration * 1000, true, false)}</td>
      
    `;

    tbody.appendChild(row);
  });
}

// 🔥 Load on start
window.addEventListener("DOMContentLoaded", async () => {
  await loadModuleData();

  const testTable = document.getElementById("testTableBody");
  const moduleTable = document.getElementById("moduleTableBody");

  const selectedModule = JSON.parse(localStorage.getItem("selectedModule"));

  // ================== TESTCASES PAGE ==================
  if (selectedModule && testTable) {

    const title = document.getElementById("testSuiteName");

    if (title) {
      title.innerText = `Test Case Results of ${selectedModule.module}`;
    }

    // 🔥 ADD THIS (YOU MISSED THIS)
    renderCards([selectedModule], true);

    // 👉 table
    generateTable(selectedModule.tests || []);
  }

  // ================== DASHBOARD PAGE ==================
  else {

    if (moduleTable) {
      generateModuleTable(window.moduleData, "moduleTableBody");
    }

    // 👉 default (false)
    renderCards(window.moduleData);

    updateChartStats(window.moduleData);
    updateChartStatsdashboard(window.moduleData);
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

function formatDuration(ms, includeSec = true, includeHour = true) {
  let seconds = Math.floor(ms / 1000);
  let fullMinutes = Math.floor(seconds / 60);
  let hours = Math.floor(fullMinutes / 60);

  seconds = seconds % 60;
  let minutes = fullMinutes % 60;
  if (includeSec) {
    if (includeHour)
      return `${hours}h ${minutes}m ${seconds}s`;
    else
      return `${fullMinutes}m ${seconds}s`;
  } else {
    return `${hours}h ${minutes}m`;
  }
}


function openModal(test, rowElement) {
  // Show content, hide empty state
  document.getElementById("emptyState").style.display = "none";
  const detailContent = document.getElementById("detailContent");
  if (detailContent) detailContent.style.display = "block";

  // Remove previous active row
  document.querySelectorAll(".data-row").forEach(r => r.classList.remove("active"));

  // Highlight current row
  if (rowElement) {
    document.querySelectorAll(".data-row").forEach(r => r.classList.remove("active"));
    rowElement.classList.add("active");
  }

  const steps = test.steps || [
    { text: 'Check the ablity to open TxHourTracking module in window mode"', status: "pass" },
    { text: 'Open Navigation Tree', status: "pass" },
    { text: 'Login Using "Admin"', status: "pass" },
    { text: 'Open Navigation Tree', status: "pass" },
    { text: 'Login Using "Admin"', status: "pass" },
    { text: 'Open Navigation Tree', status: "pass" },
    { text: 'Login Using "Admin"', status: "pass" },
    { text: 'Open Navigation Tree', status: "pass" },
    { text: 'Login Using "Admin"', status: "pass" },
    { text: 'Open Navigation Tree', status: "pass" },
    { text: 'Login Using "Admin"', status: "pass" },
    { text: 'Open Navigation Tree', status: "pass" },
    { text: 'Login Using "Admin"', status: "pass" },
    { text: 'Open Navigation Tree', status: "pass" },
    { text: 'Login Using "Admin"', status: "pass" },
    { text: 'Open Navigation Tree', status: "pass" },
    { text: 'Login Using "Admin"', status: "pass" },
    { text: 'Open Navigation Tree', status: "pass" },
    { text: 'Open Navigation Tree', status: "info" },
    { text: 'Login Using "Admin"', status: "fail" },

  ];

  const status = test.status; // from table

  // Summary 
  document.getElementById("testDescrition").innerText = `${test.desc}`;
  document.getElementById("testID").innerText = `${test.id}`;

  document.getElementById("testTotalsteps").innerText = `${steps.length}`;
  document.getElementById("testComment").innerText = `${test.comment}`;
  document.getElementById("testBug").innerText = `${test.testBugRef}`;
  document.getElementById("testDuration").innerText = `${formatDuration(test.duration * 1000, true, false)}`;
  const ui = getStatusUI(test.status);
  document.getElementById("testStatus").innerHTML = `<span class="${ui.badge}"><i class="fa-solid ${ui.icon}"></i> ${ui.text}</span>`;


  // Steps
  const container = document.getElementById("stepsContainer");
  container.innerHTML = "";

  steps.forEach(step => {
    const div = document.createElement("div");
    let iconEle;
    if (step.status == "pass") {
      div.className = `step-item step-pass`;
      iconEle = `<i class="fa-solid fa-check step-icon"></i>`;
    } else if (step.status == "info") {
      div.className = `step-item step-info`;
      iconEle = `<i class="fa-solid fa-info step-icon"></i>`;
    } else if (step.status == "fail") {
      div.className = `step-item step-fail`;
      iconEle = `<i class="fa-solid fa-xmark step-icon"></i>`;
    } else {
      div.className = `step-item`;
    }

    div.innerHTML = `
      ${iconEle}
      ${step.text}
    `;

    container.appendChild(div);
  });
}

function generateModalLeftList(tests) {
  const container = document.getElementById("modalLeftList");
  container.innerHTML = "";

  tests.forEach(test => {
    const ui = getStatusUI(test.status);

    const item = document.createElement("div");
    item.className = "modal-test-item";

    item.innerHTML = `
      <i class="fa-solid ${ui.icon}"></i>
      <span>${test.id}</span>
    `;

    item.addEventListener("click", () => {
      loadModalDetail(test, item);
    });

    container.appendChild(item);
  });
}

function loadModalDetail(test, element) {
  const container = document.getElementById("modalDetailContainer");

  // highlight active
  document.querySelectorAll(".modal-test-item").forEach(el => el.classList.remove("active"));
  if (element) element.classList.add("active");

  // ✅ FIRST update original content
  openModal(test);

  // ✅ THEN clone UPDATED content
  const detail = document.getElementById("detailContent").cloneNode(true);
  detail.style.display = "block";

  // ✅ inject into modal
  container.innerHTML = "";
  container.appendChild(detail);
}


// ================= FULLSCREEN MODAL =================
const fullModal = document.getElementById("fullScreenModal");
const openFullBtn = document.getElementById("openFullScreen");
const closeFullBtn = document.getElementById("closeFullModal");

const modalLeftList = document.getElementById("modalLeftList");
const modalDetailContainer = document.getElementById("modalDetailContainer");

let currentTests = []; // store current module tests

// OPEN MODAL
openFullBtn.addEventListener("click", () => {
  const detailContent = document.getElementById("detailContent");

  // ❌ No test selected
  if (detailContent.style.display === "none") return;

  // ✅ Get current module data
  const selectedModule = JSON.parse(localStorage.getItem("selectedModule"));
  if (!selectedModule) return;

  currentTests = selectedModule.tests || [];

  // ✅ Set module name
  const modalTitle = document.getElementById("modalModuleName");
  if (modalTitle) modalTitle.innerText = selectedModule.module;

  // ✅ Generate LEFT list
  generateModalLeftList(currentTests);

  // ✅ Load FIRST test by default
  if (currentTests.length > 0) {
    loadModalDetail(currentTests[0], document.querySelector(".modal-test-item"));
  }

  fullModal.style.display = "flex";
});


// CLOSE MODAL
closeFullBtn.addEventListener("click", () => {
  fullModal.style.display = "none";
});


// CLICK OUTSIDE CLOSE
fullModal.addEventListener("click", (e) => {
  if (e.target === fullModal) {
    fullModal.style.display = "none";
  }
});

// ESC CLOSE
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    fullModal.style.display = "none";
  }
});



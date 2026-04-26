//Theme Switcher 
const themeBtns = document.querySelectorAll('.theme-btn');
// SideBar
const sideBar = document.getElementById("sidebar");
//Impt for TestData
let tableData = [];
let modalTests = [];
let selectedTestIndex = -1;
// Full Screen
const fullModal = document.getElementById("fullScreenModal");
const openFullBtn = document.getElementById("openFullScreen");
const closeFullBtn = document.getElementById("closeFullModal");
let currentTests = []; // store current module tests

//SideBar Function
function toggleSidebar() {
    sideBar.classList.toggle("collapsed");
}
document.getElementById("toggleBtn").addEventListener("click", toggleSidebar);

//Theme Function
//Get All Themes
function getAllThemes() {
    return Array.from(themeBtns).map(btn => btn.getAttribute('data-theme'));
}
// Apply a theme
function applyTheme(theme) {
    document.getElementById('theme-style').setAttribute('href', "assets/css/themes/" + theme + ".css");
    themeBtns.forEach(btn => btn.classList.remove('active'));
    const btn = document.querySelector(`.theme-btn[data-theme="${theme}"]`);
    if (btn) btn.classList.add('active');
    localStorage.setItem('selectedTheme', theme);
}
//Theme Button Not Collapse
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        applyTheme(theme);
    });
});
// Cycle theme when sidebar is collapsed
document.querySelector('.bottom .theme-switcher').addEventListener('click', () => {
    if (!sideBar.classList.contains('collapsed')) return; // Only cycle when collapsed
    const themes = getAllThemes();
    let activeBtn = document.querySelector('.theme-btn.active');
    let currentIndex = themes.indexOf(activeBtn.getAttribute('data-theme'));
    let nextIndex = (currentIndex + 1) % themes.length;
    applyTheme(themes[nextIndex]);
});
// Page Ele
async function initDashBoardData() {
    await loadModuleData();
    generateModuleTable(window.moduleData, "moduleTableBody");
    renderCards(window.moduleData, { hideCards: ["totalNonVerifing"] });
    updateChartStats(window.moduleData);
    updateChartStatsdashboard(window.moduleData);
}
async function initTestCasesData() {
    const selectedModule = JSON.parse(localStorage.getItem("selectedModule"));
    if (!selectedModule) return;
    await loadModuleData();
    const title = document.getElementById("testSuiteName");
    if (title) {
        title.innerText = `Test Case Results of ${selectedModule.module}`;
    }
    generateTable(selectedModule.tests || []);
    renderCards([selectedModule], { hideCards: ["totalTestModule"] }, true);
}
//Filter Table 
function filterTable(tableBodyId, colspan, includeStatus = false) {
    const searchEl = document.getElementById('searchInput');
    const statusEl = document.getElementById('statusFilter');

    const searchVal = searchEl?.value.toLowerCase().trim() || "";
    const statusVal = includeStatus && statusEl
        ? statusEl.value.toLowerCase()
        : "all";

    const tbody = document.getElementById(tableBodyId);
    if (!tbody) return;

    const rows = tbody.querySelectorAll("tr");

    let visibleCount = 0;

    rows.forEach(row => {
        if (row.classList.contains('no-results')) return;

        const text = row.textContent.toLowerCase();
        const status = row.getAttribute('data-status') || '';

        const matchSearch = !searchVal || text.includes(searchVal);
        const matchStatus = statusVal === 'all' || status === statusVal;

        if (matchSearch && matchStatus) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });

    // 🔥 FIX: remove only inside this table
    const existingEmpty = tbody.querySelector('.no-results');
    if (existingEmpty) existingEmpty.remove();

    // Empty state
    if (visibleCount === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.className = 'no-results';
        emptyRow.innerHTML = `
      <td colspan="${colspan}">
        No ${tableBodyId.includes('test') ? 'tests' : 'modules'} match your search.
      </td>
    `;
        tbody.appendChild(emptyRow);
    }
}
function filterTable(tableBodyId, colspan, includeStatus = false) {
    const searchEl = document.getElementById('searchInput');
    const statusEl = document.getElementById('statusFilter');

    const searchVal = searchEl?.value.toLowerCase().trim() || "";
    const statusVal = includeStatus && statusEl
        ? statusEl.value.toLowerCase()
        : "all";

    const tbody = document.getElementById(tableBodyId);
    if (!tbody) return;

    const rows = tbody.querySelectorAll("tr");

    let visibleCount = 0;

    rows.forEach(row => {
        if (row.classList.contains('no-results')) return;

        const text = row.textContent.toLowerCase();
        const status = row.getAttribute('data-status') || '';

        const matchSearch = !searchVal || text.includes(searchVal);
        const matchStatus = statusVal === 'all' || status === statusVal;

        if (matchSearch && matchStatus) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });

    //remove only inside this table
    const existingEmpty = tbody.querySelector('.no-results');
    if (existingEmpty) existingEmpty.remove();

    // Empty state
    if (visibleCount === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.className = 'no-results';
        emptyRow.innerHTML = `
      <td colspan="${colspan}">
        No ${tableBodyId.includes('test') ? 'tests' : 'modules'} match your search.
      </td>
    `;
        tbody.appendChild(emptyRow);
    }
}
function searchTableModel(searchBodyId) {
    const searchEl = document.getElementById('searchInpuModel');
    const searchVal = searchEl?.value.toLowerCase().trim() || "";

    const dataBody = document.getElementById(searchBodyId);
    if (!dataBody) return;

    const items = dataBody.querySelectorAll(".modal-test-item");

    let visibleCount = 0;
    let firstVisible = null;

    items.forEach(item => {
        // 🔥 Only search meaningful text (span)
        const text = item.querySelector("span")?.innerText.toLowerCase() || "";

        const matchSearch = !searchVal || text.includes(searchVal);

        if (matchSearch) {
            item.style.display = '';
            visibleCount++;

            if (!firstVisible) firstVisible = item;
        } else {
            item.style.display = 'none';
        }
    });

    // 🔥 Auto scroll to first match
    if (firstVisible) {
        firstVisible.scrollIntoView({ block: "center" });
    }

    // 🔥 Optional: show empty state
    let emptyMsg = dataBody.querySelector(".no-results");

    if (visibleCount === 0) {
        if (!emptyMsg) {
            emptyMsg = document.createElement("div");
            emptyMsg.className = "no-results";
            emptyMsg.innerText = "No tests match your search.";
            dataBody.appendChild(emptyMsg);
        }
    } else if (emptyMsg) {
        emptyMsg.remove();
    }
}
//Module Data Manage
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
        row.addEventListener("click", () => {
            localStorage.setItem("selectedModule", JSON.stringify(item));
            window.location.href = "testcases.html";
        });
        tbody.appendChild(row);
    });
}
function updateChartStatsdashboard(moduleData) {
    const data = calculateDashboardData(moduleData);
    const avgTime = data.totalTests
        ? data.totalTime / data.totalTests
        : 0;
    // Update UI
    setText("totalDuration", formatDuration(data.totalTime));
    setText("avgTest", formatDuration(avgTime));
    setText("successRate", data.successRate + "%");
}
// Card System
function calculateDashboardData(moduleData = []) {
    const totals = moduleData.reduce((acc, item) => {
        acc.totalTests += item.total_script || 0;
        acc.totalPassed += item.total_success || 0;
        acc.totalFailed += item.total_fail || 0;
        acc.totalNonVerifying += item.non_verifying || 0;
        acc.totalTime += item.excution_time || 0;
        return acc;
    }, {
        totalTests: 0,
        totalPassed: 0,
        totalFailed: 0,
        totalNonVerifying: 0,
        totalTime: 0
    });

    const totalModules = moduleData.length;
    const { totalTests, totalPassed, totalFailed, totalNonVerifying, totalTime } = totals;

    const calcRate = (value) =>
        totalTests ? ((value / totalTests) * 100).toFixed(1) : "0.0";

    return {
        totalModules,
        totalTests,
        totalPassed,
        totalFailed,
        totalNonVerifying,
        totalTime,
        successRate: calcRate(totalPassed),
        failRate: calcRate(totalFailed),
        nonVerifyingRate: calcRate(totalNonVerifying)
    };
}
function getCardData(moduleData = []) {
    const d = calculateDashboardData(moduleData);
    const createCard = (id, title, value, subtitle, icon, className) => ({
        id,
        title,
        value,
        subtitle,
        icon,
        className
    });
    return [
        createCard("totalTestModule", "TOTAL MODULE", d.totalModules, "Executed", "fa-solid fa-chart-diagram", "gray"),
        createCard("totalTests", "TOTAL TESTS", d.totalTests, "Executed", "fa-solid fa-list-check", "teal"),
        createCard("totalPassed", "PASSED", d.totalPassed, `${d.successRate}% Success Rate`, "fa-regular fa-circle-check", "green"),
        createCard("totalFailed", "FAILED", d.totalFailed, `${d.failRate}% Failure Rate`, "fa-regular fa-circle-xmark", "red"),
        createCard("totalNonVerifing", "NON-VERIFYING", d.totalNonVerifying, `${d.nonVerifyingRate}% Non-Verifying`, "fa-solid fa-triangle-exclamation", "yellow"),
        createCard("totalDuration", "DURATION", formatDuration(d.totalTime || 0, false), "Total Execution Time", "fa-regular fa-clock", "blue")
    ];
}
function renderCards(data, options = {}) {
    const container = document.getElementById("cards-container");
    if (!container) return;
    const { hideCards = [] } = options;
    container.innerHTML = "";
    const dynamicCardData = getCardData(data)
        .filter(card => !hideCards.includes(card.id));
    dynamicCardData.forEach(card => {
        container.appendChild(createCard(card));
    });
}
function createCard({
    title = "",
    value = "",
    subtitle = "",
    icon = "",
    className = ""
}) {
    const card = document.createElement("div");
    card.className = `stat-card ${className}`;

    const iconBox = document.createElement("div");
    iconBox.className = "icon-box outline";

    const iconEl = document.createElement("i");
    iconEl.className = icon;

    iconBox.appendChild(iconEl);

    const content = document.createElement("div");

    const titleEl = document.createElement("div");
    titleEl.className = "card-title";
    titleEl.innerText = title;

    const valueEl = document.createElement("div");
    valueEl.className = "card-value";
    valueEl.innerText = value;

    const subTitleEl = document.createElement("span");
    subTitleEl.className = "card-sub-title";
    subTitleEl.innerText = subtitle;

    content.appendChild(titleEl);
    content.appendChild(valueEl);
    content.appendChild(subTitleEl);

    card.appendChild(iconBox);
    card.appendChild(content);

    return card;
}
//Test Data Manage
function getStatusUI(status = "") {
    const key = status.toLowerCase();

    const statusMap = {
        passed: {
            icon: "fa-circle-check pass-icon",
            badge: "badge pass",
            text: "Passed"
        },
        failed: {
            icon: "fa-circle-xmark fail-icon",
            badge: "badge fail",
            text: "Failed"
        },
        non_verifying: {
            icon: "fa-solid fa-triangle-exclamation non-icon",
            badge: "badge non",
            text: "Non-Verifying"
        }
    };

    return statusMap[key] || {
        icon: "fa-circle-minus skip-icon",
        badge: "badge skip",
        text: "Skipped"
    };
}
//Test Data Table
function generateTable(data = []) {
    const tbody = document.getElementById("testTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";
    tableData = data;

    const fragment = document.createDocumentFragment();

    data.forEach((test, index) => {
        const ui = getStatusUI(test.status);

        const row = document.createElement("tr");
        row.className = "data-row";
        row.dataset.status = test.status;
        row.dataset.index = index;

        // --- Cells ---
        const idCell = document.createElement("td");
        idCell.className = "cell-test-id";
        idCell.innerHTML = `
        <i class="fa-solid ${ui.icon}"></i>
        <strong>${test.id || ""}</strong>
         `;
        const descCell = document.createElement("td");
        descCell.className = "cell-test-details";
        descCell.innerText = test.desc || "";

        const statusCell = document.createElement("td");
        statusCell.className = "cell-test-status";
        statusCell.innerHTML = `<span class="${ui.badge}">${ui.text}</span>`;

        const durationCell = document.createElement("td");
        durationCell.className = "cell-test-duration";
        durationCell.innerText = formatDuration(test.duration || 0, true, false);

        row.appendChild(idCell);
        row.appendChild(descCell);
        row.appendChild(statusCell);
        row.appendChild(durationCell);

        fragment.appendChild(row);
    });
    tbody.appendChild(fragment);
    if (!tbody.dataset.listenerAdded) {
        tbody.addEventListener("click", (e) => {
            const row = e.target.closest(".data-row");
            if (!row) return;

            const index = row.dataset.index;
            const test = data[index];

            if (test) {
                selectedTestIndex = Number(index); // sync index
                openModal(test, row);
                // sync modal if open
                const modalItems = document.querySelectorAll(".modal-test-item");
                if (modalItems.length) {
                    modalItems.forEach(el => el.classList.remove("active"));
                    const selectedItem = modalItems[selectedTestIndex];
                    if (selectedItem) {
                        selectedItem.classList.add("active");
                        selectedItem.scrollIntoView({ block: "center" });
                    }
                }
            }
        });
        tbody.dataset.listenerAdded = "true"; // mark as added
    }
}
// Test Step Render
function renderDetailContent(test, root) {
    if (!test || !root) return;

    const steps = test.steps || [];

    // --- Summary ---
    setTextIn(root, "testDescrition", test.desc);
    setTextIn(root, "testID", test.id);
    setTextIn(root, "testTotalsteps", steps.length);
    setTextIn(root, "testComment", test.comment);
    setTextIn(root, "testBug", test.testBugRef);
    setTextIn(root, "testDuration", formatDuration(test.duration || 0, true, false));

    const ui = getStatusUI(test.status);
    setHTMLIn(root, "testStatus", `
    <span class="${ui.badge}">
      <i class="fa-solid ${ui.icon}"></i> ${ui.text}
    </span>
  `);

    // --- Steps ---
    const container = root.querySelector("#stepsContainer");
    if (!container) return;

    container.classList.remove("show");
    setTimeout(() => {
        container.classList.add("show");
    }, 10);
    container.innerHTML = "";

    const fragment = document.createDocumentFragment();

    steps.forEach(step => {
        const div = document.createElement("div");

        let className = "step-item";
        let icon = "";
        let body = "";

        const status = (step.status || "").toLowerCase();

        if (status === "pass") {
            className += " step-pass";
            icon = `<i class="fa-solid fa-check step-icon"></i>`;
            body = `<div class="step-item-body">Expected Result: ${step.expected || "Value Matched"}</div>`;
        }
        else if (status === "fail") {
            className += " step-fail";
            icon = `<i class="fa-solid fa-xmark step-icon"></i>`;
            const error = (step.exception || "").replace(/\r\n|\n/g, "<br>");
            body = `<div class="step-item-body error">${error}</div>`;
        }
        else if (status === "info") {
            className += " step-info";
            icon = `<i class="fa-solid fa-info step-icon"></i>`;
        }

        div.className = className;

        div.innerHTML = `
      <div class="step-item-title">
        ${icon} ${step.text || ""}
      </div>
      ${body}
    `;

        fragment.appendChild(div);
    });

    container.appendChild(fragment);
}
//Test Steps 
function openModal(test, rowElement) {
    setDisplay("emptyState", "none");
    setDisplay("detailContent", "block");

    document.querySelectorAll(".data-row")
        .forEach(r => r.classList.remove("active"));

    if (rowElement) rowElement.classList.add("active");

    const root = document.getElementById("detailContent");
    renderDetailContent(test, root);
}
// Model
if (openFullBtn && fullModal) {
    openFullBtn.addEventListener("click", () => {
        const detailContent = document.getElementById("detailContent");

        // safer visibility check
        if (!detailContent || detailContent.offsetParent === null) return;

        const selectedModule = JSON.parse(localStorage.getItem("selectedModule"));
        if (!selectedModule) return;

        currentTests = selectedModule.tests || [];

        // Title
        const modalTitle = document.getElementById("modalModuleName");
        if (modalTitle) modalTitle.innerText = selectedModule.module;

        // Left list
        generateModalLeftList(currentTests);
        if (selectedTestIndex >= 0) {
            const items = document.querySelectorAll(".modal-test-item");
            const selectedItem = items[selectedTestIndex];

            if (selectedItem) {
                selectedItem.classList.add("active");
                selectedItem.scrollIntoView({ block: "center" });

                const test = currentTests[selectedTestIndex];
                if (test) {
                    loadModalDetail(test, selectedItem); // load right panel
                }
            }
        }

        // Clone content (remove duplicate IDs)
        const modelcontainer = document.getElementById("modalDetailContainer");
        if (!modelcontainer) return;

        const detail = detailContent.cloneNode(true);
        detail.style.display = "block";

        // Remove IDs inside cloned content
        detail.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));

        modelcontainer.innerHTML = "";
        modelcontainer.appendChild(detail);

        fullModal.style.display = "flex";
    });
}
function generateModalLeftList(tests = []) {
    const container = document.getElementById("modalLeftList");
    if (!container) return;

    modalTests = tests;
    container.innerHTML = "";

    const fragment = document.createDocumentFragment();

    tests.forEach((test, index) => {
        const ui = getStatusUI(test.status);

        const item = document.createElement("div");
        item.className = "modal-test-item";
        item.dataset.index = index;

        const icon = document.createElement("i");
        icon.className = `fa-solid ${ui.icon}`;

        const text = document.createElement("span");
        text.innerText = test.id || "";

        item.appendChild(icon);
        item.appendChild(text);

        fragment.appendChild(item);
    });

    container.appendChild(fragment);

    // Add event delegation ONCE
    if (!container.dataset.listenerAdded) {
        container.addEventListener("click", (e) => {
            const item = e.target.closest(".modal-test-item");
            if (!item) return;
            const index = item.dataset.index;
            const test = modalTests[index];
            if (!test) return;
            // Remove previous active
            container.querySelectorAll(".modal-test-item")
                .forEach(el => el.classList.remove("active"));
            // Add active to current
            item.classList.add("active");
            selectedTestIndex = Number(index); // sync index
            loadModalDetail(test, item);
            openModal(test);
            // sync main table
            const rows = document.querySelectorAll(".data-row");
            rows.forEach(r => r.classList.remove("active"));
            const selectedRow = rows[selectedTestIndex];
            if (selectedRow) {
                selectedRow.classList.add("active");
                selectedRow.scrollIntoView({ block: "center" });
            }
        });
        container.dataset.listenerAdded = "true";
    }
}
function loadModalDetail(test, element) {
    const container = document.getElementById("modalDetailContainer");
    if (!container || !test) return;

    // Active state (modal list only)
    const list = document.getElementById("modalLeftList");
    if (list) {
        list.querySelectorAll(".modal-test-item")
            .forEach(el => el.classList.remove("active"));
    }

    if (element) element.classList.add("active");

    // Create a fresh wrapper (same structure as detailContent)
    const wrapper = document.createElement("div");
    wrapper.innerHTML = document.getElementById("detailContent").innerHTML;

    renderDetailContent(test, wrapper);

    container.innerHTML = "";
    container.appendChild(wrapper);
}
// ---------- CLOSE ----------
function closeModal() {
    if (fullModal) fullModal.style.display = "none";
}
if (closeFullBtn) {
    closeFullBtn.addEventListener("click", closeModal);
}

window.addEventListener("DOMContentLoaded", () => {
    //Theme Change
    const saved = localStorage.getItem('selectedTheme');
    const availableThemes = getAllThemes();
    if (saved && availableThemes.includes(saved)) {
        applyTheme(saved);
    } else if (availableThemes.length > 0) {
        applyTheme(availableThemes[0]);
    }
    //Theme End
    //Navigation
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const page = e.currentTarget.getAttribute("data-page");
            if (page) window.location.href = page;
        });
    });
    //Navigation End
});
window.addEventListener("DOMContentLoaded", async () => {
    const testTable = document.getElementById("testTableBody");
    const moduleTable = document.getElementById("moduleTableBody");
    if (moduleTable) {
        initDashBoardData();
    } else if (testTable) {
        initTestCasesData();
    }
});
// ESC key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});
//Basic
function formatDuration(fullSecond, includeSec = true, includeHour = true) {
    let fullMinutes = Math.floor(fullSecond / 60);
    let hours = Math.floor(fullMinutes / 60);

    let seconds = (fullSecond % 60).toFixed(0);
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
function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value || "";
}

function setHTML(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = value || "";
}

function setDisplay(id, value) {
    const el = document.getElementById(id);
    if (el) el.style.display = value;
}
function setTextIn(root, id, value) {
    const el = root.querySelector(`#${id}`);
    if (el) el.innerText = value || "";
}

function setHTMLIn(root, id, value) {
    const el = root.querySelector(`#${id}`);
    if (el) el.innerHTML = value || "";
}
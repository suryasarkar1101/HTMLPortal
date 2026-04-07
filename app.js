// ─── Theme Switcher ───────────────────────────────────────────────
const themeLink   = document.getElementById('theme-style');
const themeBtns   = document.querySelectorAll('.theme-btn');

themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.getAttribute('data-theme');
    themeLink.setAttribute('href', "themes/"+theme+".css");

    // Update active state
    themeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Persist selection
    localStorage.setItem('selectedTheme', theme);
  });
});

// Restore saved theme on load
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('selectedTheme');
  if (saved) {
    themeLink.setAttribute('href', "themes/"+saved+".css");
    themeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === saved);
    });
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


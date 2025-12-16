// Theme toggle: remembers choice across all pages using localStorage.[web:25][web:28]
(function () {
  const html = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'vh-theme';

  if (!toggleBtn) return;

  // Apply saved theme on load
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    html.setAttribute('data-theme', savedTheme);
  }

  // Update button state (icon + aria-pressed)
  function syncToggle() {
    const current = html.getAttribute('data-theme') || 'dark';
    const isDark = current === 'dark';

    toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    toggleBtn.querySelector('.theme-icon').textContent = isDark ? '🌙' : '☀️';
  }

  syncToggle();

  toggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
    syncToggle();
  });
})();

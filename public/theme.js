// theme.js
// Toggle html[data-theme="dark" | "light"] and remember choice.

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement; // <html>
  const toggleBtn = document.getElementById('theme-toggle');
  const iconSpan = toggleBtn?.querySelector('.theme-icon');
  const labelSpan = toggleBtn?.querySelector('.theme-label');

  const THEME_KEY = 'valorant-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggleBtn && iconSpan && labelSpan) {
      if (theme === 'light') {
        iconSpan.textContent = '☀️';
        labelSpan.textContent = 'Light';
        toggleBtn.setAttribute('aria-pressed', 'false');
      } else {
        iconSpan.textContent = '🌙';
        labelSpan.textContent = 'Dark';
        toggleBtn.setAttribute('aria-pressed', 'true');
      }
    }
  }

  // Load saved theme or default to dark
  const saved = localStorage.getItem(THEME_KEY);
  const initial = saved === 'light' || saved === 'dark' ? saved : 'dark';
  applyTheme(initial);

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
});
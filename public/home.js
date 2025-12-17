// home.js
// Simple scroll-reveal for tiles and hero mini-cards.

document.addEventListener('DOMContentLoaded', () => {
  const revealItems = document.querySelectorAll('.reveal-on-scroll');

  // Scroll reveal
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('is-visible'));
  }

  // ===== Game modes tabs =====
  const modeTabs = document.querySelectorAll('.modes-tab');
  const modePanels = document.querySelectorAll('.modes-panel');

  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.dataset.mode;

      modeTabs.forEach(t => t.classList.remove('modes-tab-active'));
      modePanels.forEach(p => p.classList.remove('modes-panel-active'));

      tab.classList.add('modes-tab-active');
      document
        .querySelector(`.modes-panel[data-mode="${mode}"]`)
        .classList.add('modes-panel-active');
    });
  });
});

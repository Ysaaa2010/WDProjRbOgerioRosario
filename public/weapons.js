// weapons.js
// Category filtering, click-to-flip for weapons AND shields, plus scroll reveal.


document.addEventListener('DOMContentLoaded', () => {
  const tags = document.querySelectorAll('.weapon-tags .tag');
  const cards = document.querySelectorAll('.weapon-card');

  // ---------- CATEGORY FILTER ----------
  function applyFilter(category) {
    cards.forEach(card => {
      const cat = card.getAttribute('data-category') || 'All';
      card.style.display = (category === 'All' || cat === category) ? '' : 'none';
    });
  }

  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      tags.forEach(t => t.classList.remove('tag-all'));
      tag.classList.add('tag-all');
      applyFilter(tag.textContent.trim());
    });
  });

  applyFilter('All');

  // ---------- SCROLL REVEAL ----------
  const revealItems = document.querySelectorAll('.reveal-on-scroll');

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
});

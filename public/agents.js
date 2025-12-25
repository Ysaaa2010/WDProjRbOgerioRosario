// agents.js
// Role filter + scroll reveal + simple preview text update.

document.addEventListener('DOMContentLoaded', () => {
  const tags = document.querySelectorAll('.agent-tags .tag');
  const cards = document.querySelectorAll('.agent-card');
  const previewRole = document.querySelector('.agent-preview-panel .agent-role');
  const previewName = document.querySelector('.agent-preview-panel .agent-name');
  const previewDesc = document.querySelector('.agent-preview-panel .agent-desc');

  // ---------- ROLE FILTER ----------
  function applyRoleFilter(role) {
    cards.forEach(card => {
      const r = card.getAttribute('data-role') || 'All';
      card.style.display = (role === 'All' || r === role) ? '' : 'none';
    });
  }

  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      tags.forEach(t => t.classList.remove('tag-all'));
      tag.classList.add('tag-all');
      const role = tag.textContent.trim();
      applyRoleFilter(role);
    });
  });

  applyRoleFilter('All');

  // ---------- SIMPLE PREVIEW UPDATE ----------
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const nameEl = card.querySelector('.flip-card-front h3');
      const roleEl = card.querySelector('.agent-role-pill');
      const blurbEl = card.querySelector('.agent-blurb');

      if (nameEl && roleEl && blurbEl && previewName && previewRole && previewDesc) {
        previewName.textContent = nameEl.textContent;
        previewRole.textContent = roleEl.textContent;
        previewDesc.textContent = blurbEl.textContent;
      }
    });
  });

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
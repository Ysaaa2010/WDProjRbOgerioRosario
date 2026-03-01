/* ============================================================
   VALORANT PROTOCOL 2026 — index.js
   Faction selection page logic
   Authors: Ysa Rosario & Nathan Ogerio
   ============================================================ */

/**
 * selectFaction — saves the chosen faction and redirects to home
 * @param {string} faction - 'alpha' or 'omega'
 */
function selectFaction(faction) {
  // Play audio click
  AudioSystem.playClick();

  // Save to localStorage
  FactionSystem.setFaction(faction);

  // Animate the selected card
  const card = document.getElementById(`card-${faction}`);
  if (card) {
    card.style.transform = 'scale(1.05)';
    card.style.zIndex = '10';
    // Add flash overlay
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: absolute; inset: 0; z-index: 20;
      background: ${faction === 'alpha' ? '#00c8d4' : '#ff4655'};
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: none;
    `;
    card.appendChild(flash);
    requestAnimationFrame(() => {
      flash.style.opacity = '0.3';
      setTimeout(() => { flash.style.opacity = '0'; }, 200);
    });
  }

  // Show loading overlay and redirect
  const body = document.body;
  body.style.transition = 'opacity 0.5s ease';

  // Create transition overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: ${faction === 'alpha' ? '#00c8d4' : '#ff4655'};
    opacity: 0;
    display: flex; align-items: center; justify-content: center;
    transition: opacity 0.4s ease;
    flex-direction: column; gap: 16px;
  `;
  overlay.innerHTML = `
    <img src="assets/valorant.png" style="width:60px;filter:brightness(10);animation:spin 0.5s ease" />
    <p style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:#fff;letter-spacing:0.2em">
      ${faction.toUpperCase()} PROTOCOL ENGAGED
    </p>
  `;
  document.body.appendChild(overlay);

  // Add spin keyframe
  const style = document.createElement('style');
  style.textContent = '@keyframes spin { from{transform:rotate(-180deg) scale(0)} to{transform:rotate(0) scale(1)} }';
  document.head.appendChild(style);

  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 700);
  });
}

/* ── Parallax mouse effect on background grid ── */
document.addEventListener('mousemove', (e) => {
  const grid = document.querySelector('.bg-grid');
  if (!grid) return;
  const x = (e.clientX / window.innerWidth) * 20;
  const y = (e.clientY / window.innerHeight) * 20;
  grid.style.backgroundPosition = `${x}px ${y}px`;
});

/* ── Highlight existing faction on load ── */
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('vp_faction');
  if (saved) {
    const card = document.getElementById(`card-${saved}`);
    if (card) {
      card.style.border = `1px solid ${saved === 'alpha' ? '#00c8d4' : '#ff4655'}`;
      // Show subtle "current faction" indicator
      const indicator = document.createElement('div');
      indicator.style.cssText = `
        position: absolute; top: 12px; right: 12px;
        font-family: var(--font-mono); font-size: 0.65rem;
        color: ${saved === 'alpha' ? '#00c8d4' : '#ff4655'};
        background: rgba(0,0,0,0.5);
        border: 1px solid ${saved === 'alpha' ? '#00c8d4' : '#ff4655'};
        padding: 3px 8px; border-radius: 2px; z-index: 10;
        letter-spacing: 0.1em;
      `;
      indicator.textContent = 'CURRENT';
      card.appendChild(indicator);
    }
  }
});
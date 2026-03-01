/* ============================================================
   VALORANT PROTOCOL 2026 — home.js
   Home page functionality: particles, ticker, animations
   Authors: Ysa Rosario & Nathan Ogerio
   ============================================================ */

/**
 * Floating particle effect for hero background
 * Uses canvas-free approach with DOM elements for performance
 */
const ParticleSystem = (() => {
  const init = () => {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    // Create floating radianite particles
    for (let i = 0; i < 24; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = 6 + Math.random() * 8;
      const opacity = 0.1 + Math.random() * 0.4;

      particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        bottom: -10px;
        width: ${size}px;
        height: ${size}px;
        background: var(--primary);
        border-radius: 50%;
        opacity: ${opacity};
        animation: particle-float ${duration}s ease-in ${delay}s infinite;
        box-shadow: 0 0 ${size * 3}px var(--primary);
      `;
      container.appendChild(particle);
    }

    // Inject particle animation
    if (!document.getElementById('particle-style')) {
      const style = document.createElement('style');
      style.id = 'particle-style';
      style.textContent = `
        @keyframes particle-float {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: var(--op, 0.3); }
          90%  { opacity: var(--op, 0.3); }
          100% { transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 80 + 20}px); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  };
  return { init };
})();

/**
 * Ticker duplication for seamless infinite scroll
 * Clones the ticker content so it loops without gaps
 */
const Ticker = (() => {
  const init = () => {
    const track = document.getElementById('ticker-track');
    if (!track) return;

    // Clone content for seamless loop
    const clone = track.innerHTML;
    track.innerHTML = clone + clone;

    // Calculate correct animation duration based on content width
    const originalWidth = track.scrollWidth / 2;
    const speed = 60; // pixels per second
    const duration = originalWidth / speed;
    track.style.animationDuration = `${duration}s`;
  };
  return { init };
})();

/**
 * Intersection Observer for hero title letter animation
 * Each letter drops in with a staggered delay
 */
const HeroAnimation = (() => {
  const init = () => {
    const titleLines = document.querySelectorAll('.hero-title-line');
    titleLines.forEach((line, i) => {
      line.style.cssText = `
        opacity: 0;
        transform: translateY(40px);
        animation: hero-line-in 0.7s ease ${i * 0.15 + 0.3}s forwards;
      `;
    });

    // Inject animation
    if (!document.getElementById('hero-anim-style')) {
      const s = document.createElement('style');
      s.id = 'hero-anim-style';
      s.textContent = `
        @keyframes hero-line-in {
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(s);
    }
  };
  return { init };
})();

// ── Initialize ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  ParticleSystem.init();
  Ticker.init();
  HeroAnimation.init();
});
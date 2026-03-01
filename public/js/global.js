/* ============================================================
   VALORANT PROTOCOL 2026 — global.js
   Shared utilities: faction theming, navbar, scroll reveal,
   toast notifications, audio click, Konami (RIOT) easter egg
   Authors: Ysa Rosario & Nathan Ogerio
   ============================================================ */

// ── Faction System ──────────────────────────────────────────
const FactionSystem = (() => {
  // Load saved faction from localStorage (default: omega)
  const getFaction = () => localStorage.getItem('vp_faction') || 'omega';

  // Apply faction class to <html>
  const applyFaction = (faction) => {
    const html = document.documentElement;
    if (faction === 'alpha') {
      html.setAttribute('data-faction', 'alpha');
    } else {
      html.removeAttribute('data-faction');
    }
    // Update faction badge in navbar if exists
    const badge = document.getElementById('nav-faction-badge');
    if (badge) badge.textContent = faction.toUpperCase();
  };

  // Set & save faction
  const setFaction = (faction) => {
    localStorage.setItem('vp_faction', faction);
    applyFaction(faction);
    showToast(`Faction set: ${faction.toUpperCase()}`, faction === 'alpha' ? '🔵' : '🔴');
  };

  // Init on page load
  const init = () => applyFaction(getFaction());

  return { getFaction, setFaction, init, applyFaction };
})();

// ── Audio System ─────────────────────────────────────────────
const AudioSystem = (() => {
  let audioCtx = null;

  const getCtx = () => {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  };

  // Synthesize a UI click sound using Web Audio API
  const playClick = () => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) { /* Audio not available */ }
  };

  // Attach click sound to all buttons
  const attachToButtons = () => {
    document.addEventListener('click', (e) => {
      if (e.target.matches('button, .btn, .tab-btn, .nav-link, a')) {
        playClick();
      }
    });
  };

  return { playClick, attachToButtons };
})();

// ── Navbar ───────────────────────────────────────────────────
const Navbar = (() => {
  const init = () => {
    const navbar  = document.getElementById('navbar');
    const hamBtn  = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    if (!navbar) return;

    // Scroll effect
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Highlight active link
    const links = document.querySelectorAll('.nav-link, .mobile-nav .nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.includes(currentPage)) link.classList.add('active');
    });

    // Hamburger toggle
    if (hamBtn && mobileNav) {
      hamBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
      });
      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
          mobileNav.classList.remove('open');
        }
      });
    }
  };
  return { init };
})();

// ── Toast Notifications ──────────────────────────────────────
const showToast = (message, icon = '⚡', duration = 3000) => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span style="font-size:1.2rem">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 350);
  }, duration);
};

// ── Scroll Reveal ────────────────────────────────────────────
const ScrollReveal = (() => {
  const init = () => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    els.forEach(el => observer.observe(el));
  };
  return { init };
})();

// ── Easter Egg: "riot" Keycode Sequence ──────────────────────
const EasterEgg = (() => {
  const sequence = ['r', 'i', 'o', 't'];
  let buffer = [];

  const triggerGlitch = () => {
    // Show lore overlay
    const overlay = document.getElementById('lore-overlay');
    if (overlay) {
      overlay.classList.add('active');
      document.body.classList.add('glitch-active');
      showToast('CLASSIFIED FOOTAGE UNLOCKED', '👁️', 5000);
      setTimeout(() => {
        document.body.classList.remove('glitch-active');
      }, 2500);
    }
  };

  const init = () => {
    window.addEventListener('keydown', (e) => {
      buffer.push(e.key.toLowerCase());
      if (buffer.length > sequence.length) buffer.shift();
      if (buffer.join('') === sequence.join('')) {
        buffer = [];
        triggerGlitch();
      }
    });

    // Close overlay
    const closeBtn = document.getElementById('lore-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.getElementById('lore-overlay').classList.remove('active');
      });
    }
  };

  return { init };
})();

// ── Loading Screen ───────────────────────────────────────────
const LoadingScreen = (() => {
  const hide = () => {
    const screen = document.getElementById('loading-screen');
    if (!screen) return;
    setTimeout(() => {
      screen.classList.add('fade-out');
      setTimeout(() => screen.remove(), 600);
    }, 1200);
  };
  return { hide };
})();

// ── Auth Helpers ─────────────────────────────────────────────
const Auth = (() => {
  const getUser = () => JSON.parse(localStorage.getItem('vp_user') || 'null');
  const isLoggedIn = () => !!getUser();
  const logout = () => {
    localStorage.removeItem('vp_user');
    showToast('Logged out successfully', '👋');
    setTimeout(() => window.location.href = 'index.html', 1000);
  };

  // Update navbar with user state
  const updateNavbar = () => {
    const user = getUser();
    const authArea = document.getElementById('nav-auth');
    if (!authArea) return;
    if (user) {
      authArea.innerHTML = `
        <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--primary)">${user.username}</span>
        <button class="btn btn-ghost btn-sm" onclick="Auth.logout()">Logout</button>
      `;
    } else {
      authArea.innerHTML = `
        <a href="signin.html" class="btn btn-ghost btn-sm">Sign In</a>
        <a href="signup.html" class="btn btn-primary btn-sm">Sign Up</a>
      `;
    }
  };

  return { getUser, isLoggedIn, logout, updateNavbar };
})();

// ── Initialize Everything ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  FactionSystem.init();
  Navbar.init();
  ScrollReveal.init();
  EasterEgg.init();
  AudioSystem.attachToButtons();
  LoadingScreen.hide();
  Auth.updateNavbar();
});
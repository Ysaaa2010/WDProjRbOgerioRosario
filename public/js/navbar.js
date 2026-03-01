/* ============================================================
   VALORANT PROTOCOL 2026 — navbar.js
   Injects shared navbar HTML into every page
   Authors: Ysa Rosario & Nathan Ogerio
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const navPlaceholder = document.getElementById('navbar-placeholder');
  if (!navPlaceholder) return;

  // Determine current page for active link
  const page = window.location.pathname.split('/').pop() || 'home.html';

  navPlaceholder.outerHTML = `
    <nav class="navbar" id="navbar">
      <div class="nav-inner">
        <!-- Logo -->
        <a href="home.html" class="nav-logo">
          <img src="assets/valorant.png" alt="Valorant" />
          PROTOCOL 2026
        </a>

        <!-- Main Links -->
        <div class="nav-links" id="nav-links">
          <a href="home.html"          class="nav-link ${page==='home.html'?'active':''}">Home</a>
          <a href="agents.html"        class="nav-link ${page==='agents.html'?'active':''}">Agents</a>
          <a href="weapons.html"       class="nav-link ${page==='weapons.html'?'active':''}">Arsenal</a>
          <a href="maps.html"          class="nav-link ${page==='maps.html'?'active':''}">Maps</a>
          <a href="match-center.html"  class="nav-link ${page==='match-center.html'?'active':''}">
            <span style="display:inline-flex;align-items:center;gap:4px">
              <span style="width:6px;height:6px;background:#4ade80;border-radius:50%;animation:ping 1.5s infinite"></span>
              Live Hub
            </span>
          </a>
          <a href="architects.html"    class="nav-link ${page==='architects.html'?'active':''}">Architects</a>
        </div>

        <!-- Right Actions -->
        <div class="nav-actions" id="nav-actions">
          <div class="nav-faction-badge" id="nav-faction-badge" style="cursor:pointer" onclick="window.location.href='index.html'" title="Change Faction">
            ${(localStorage.getItem('vp_faction') || 'omega').toUpperCase()}
          </div>
          <div id="nav-auth" style="display:flex;gap:8px;align-items:center"></div>
        </div>

        <!-- Hamburger -->
        <button class="hamburger" id="hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <!-- Mobile Nav -->
    <div class="mobile-nav" id="mobile-nav">
      <a href="home.html"         class="nav-link ${page==='home.html'?'active':''}">Home</a>
      <a href="agents.html"       class="nav-link ${page==='agents.html'?'active':''}">Agents</a>
      <a href="weapons.html"      class="nav-link ${page==='weapons.html'?'active':''}">Arsenal</a>
      <a href="maps.html"         class="nav-link ${page==='maps.html'?'active':''}">Maps</a>
      <a href="match-center.html" class="nav-link ${page==='match-center.html'?'active':''}">Live Hub</a>
      <a href="architects.html"   class="nav-link ${page==='architects.html'?'active':''}">Architects</a>
      <a href="signin.html"       class="nav-link ${page==='signin.html'?'active':''}">Sign In</a>
      <a href="signup.html"       class="nav-link ${page==='signup.html'?'active':''}">Sign Up</a>
    </div>
  `;

  // Add ping animation for live indicator
  const pingStyle = document.createElement('style');
  pingStyle.textContent = `@keyframes ping { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.8)} }`;
  document.head.appendChild(pingStyle);
});
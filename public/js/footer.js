/* ============================================================
   VALORANT PROTOCOL 2026 — footer.js
   Injects shared footer HTML into every page
   Authors: Ysa Rosario & Nathan Ogerio
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (!footerPlaceholder) return;

  const year = new Date().getFullYear();

  footerPlaceholder.outerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">

          <!-- Brand Column -->
          <div class="footer-brand">
            <div class="footer-logo">
              <img src="assets/valorant.png" alt="Valorant Logo" />
              PROTOCOL 2026
            </div>
            <p class="footer-desc">
              Your tactical companion for VALORANT Masters Santiago 2026. 
              The Omega Breach has begun — choose your side.
            </p>
            <div class="footer-social">
              <a href="https://www.instagram.com/jiw2ng/" target="_blank" rel="noopener" aria-label="Ysa Instagram" title="Ysa's Instagram">📸</a>
              <a href="https://www.instagram.com/oregaknows/" target="_blank" rel="noopener" aria-label="Nathan Instagram" title="Nathan's Instagram">📸</a>
              <a href="architects.html" aria-label="Meet the team">👥</a>
              <a href="index.html" aria-label="Change faction" title="Change Faction">🎮</a>
            </div>
          </div>

          <!-- Navigation -->
          <div class="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><a href="home.html">Home</a></li>
              <li><a href="agents.html">Agents</a></li>
              <li><a href="weapons.html">Arsenal</a></li>
              <li><a href="maps.html">Maps</a></li>
              <li><a href="match-center.html">Live Hub</a></li>
              <li><a href="architects.html">Architects</a></li>
            </ul>
          </div>

          <!-- Account -->
          <div class="footer-col">
            <h4>Account</h4>
            <ul>
              <li><a href="signin.html">Sign In</a></li>
              <li><a href="signup.html">Sign Up</a></li>
              <li><a href="index.html">Change Faction</a></li>
              <li><a href="match-center.html">Pick'Em</a></li>
              <li><a href="match-center.html">Watch & Earn</a></li>
            </ul>
          </div>

          <!-- Resources -->
          <div class="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="https://playvalorant.com" target="_blank" rel="noopener">Official Site</a></li>
              <li><a href="https://www.instagram.com/jiw2ng/" target="_blank" rel="noopener">Ysa · @jiw2ng</a></li>
              <li><a href="https://www.instagram.com/oregaknows/" target="_blank" rel="noopener">Nathan · @oregaknows</a></li>
              <li><a href="https://vlr.gg" target="_blank" rel="noopener">VLR.gg</a></li>
              <li><a href="https://liquipedia.net/valorant" target="_blank" rel="noopener">Liquipedia</a></li>
            </ul>
          </div>

        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom">
          <div class="footer-credits">
            <div class="footer-copy">
              <strong>@NathanOgerioYsaRosario. Rights Reserved.</strong><br/>
              &copy; ${year} Ysa Rosario &amp; Nathan Ogerio · VALORANT PROTOCOL 2026
            </div>
            <div class="footer-disclaimer">
              Not Affiliated with Riot Games.<br/>
              VALORANT &trade; Riot Games, Inc. All rights reserved.
            </div>
          </div>

          <!-- APA Citations -->
          <div class="footer-citation">
            <strong>Source Citations (APA Format):</strong>
            Riot Games. (2020). <em>VALORANT</em> [Video game]. Riot Games. https://playvalorant.com |
            Riot Games. (2026). <em>VALORANT patch notes — 12.0</em>. https://playvalorant.com/en-us/news/ |
            Riot Games. (2026, February 28). <em>Masters Santiago 2026</em>. VALORANT Champions Tour. https://valorantesports.com |
            Liquidpedia. (2026). <em>VALORANT Champions Tour 2026</em>. https://liquipedia.net/valorant |
            VLR.gg. (2026). <em>VALORANT esports stats and results</em>. https://vlr.gg |
            Riot Games. (2026). <em>VALORANT agents database</em>. https://playvalorant.com/en-us/agents/ |
            Riot Games. (2026). <em>VALORANT arsenal</em>. https://playvalorant.com/en-us/arsenal/
          </div>
        </div>
      </div>
    </footer>
  `;
});
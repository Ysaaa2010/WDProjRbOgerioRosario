/* ============================================================
   VALORANT PROTOCOL 2026 — match-center.js
   Live score ticker, Pick'Em drag-and-drop, drops tracking
   Authors: Ysa Rosario & Nathan Ogerio
   ============================================================ */

/* ── TAB SWITCHING ── */
const switchTab = (tab, btn) => {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  btn.classList.add('active');
  AudioSystem.playClick();
};

/* ── LIVE SCORE TICKER ──────────────────────────────────────
   Simulates a live updating score (NRG vs XLG Map 2)
   Each round increments the leading team's score
   ─────────────────────────────────────────────────────────── */
const LiveScoreTicker = (() => {
  let nrg = 10, xlg = 7;
  const maps = ['HAVEN', 'ASCENT', 'CORRODE'];
  let mapIdx = 1;

  const update = () => {
    // Randomly increment a score (NRG slightly favored)
    const winner = Math.random() < 0.55 ? 'nrg' : 'xlg';
    if (winner === 'nrg') nrg++;
    else xlg++;

    const nrgEl = document.getElementById('score-nrg');
    const xlgEl = document.getElementById('score-xlg');
    const timerEl = document.getElementById('live-timer');
    const mapEl = document.getElementById('live-map');
    if (!nrgEl) return;

    nrgEl.textContent = nrg;
    xlgEl.textContent = xlg;

    // Check for round over
    if (nrg >= 13 || xlg >= 13) {
      if (nrg >= 13) {
        nrgEl.style.color = '#4ade80';
        xlgEl.style.color = '#ff4655';
        showToast(`NRG wins Map ${mapIdx + 1}!`, '🏆');
      } else {
        xlgEl.style.color = '#4ade80';
        nrgEl.style.color = '#ff4655';
        showToast(`XLG wins Map ${mapIdx + 1}!`, '🏆');
      }
    }

    // Show current round
    const total = nrg + xlg;
    timerEl.textContent = `ROUND ${Math.min(total, 24)} / 24`;

    // Flash effect on score update
    const flashEl = winner === 'nrg' ? nrgEl : xlgEl;
    flashEl.style.transform = 'scale(1.3)';
    flashEl.style.color = '#facc15';
    setTimeout(() => {
      flashEl.style.transform = 'scale(1)';
      flashEl.style.color = winner === 'nrg' ? '#4ade80' : '#ff4655';
    }, 300);
  };

  const init = () => {
    // Update score every 8-15 seconds to simulate live
    const tick = () => {
      update();
      setTimeout(tick, 8000 + Math.random() * 7000);
    };
    setTimeout(tick, 5000);
  };

  return { init };
})();

/* ── PICK'EM SYSTEM ─────────────────────────────────────────
   Drag-and-drop bracket predictions saved to localStorage
   ─────────────────────────────────────────────────────────── */
const PICKEM_MATCHES = [
  {
    id: 'nrg-xlg', round: 'Swiss Stage · Round 1',
    teamA: { id: 'NRG', name: 'NRG ESPORTS', color: '#4ade80', bg: '#1a1a2e' },
    teamB: { id: 'XLG', name: 'XLG', color: '#ff6b6b', bg: '#2d1b1b' },
    result: null // null = live/upcoming, 'NRG' or 'XLG' = finished
  },
  {
    id: 'edg-m8', round: 'Swiss Stage · Round 1',
    teamA: { id: 'EDG', name: 'EDWARD GAMING', color: '#60a5fa', bg: '#1a1a4e' },
    teamB: { id: 'M8', name: 'MIBR', color: '#a78bfa', bg: '#1e1a2d' },
    result: 'EDG'
  },
  {
    id: 'fnc-sen', round: 'Swiss Stage · Round 1',
    teamA: { id: 'FNC', name: 'FNATIC', color: '#818cf8', bg: '#1e1640' },
    teamB: { id: 'SEN', name: 'SENTINELS', color: '#4ade80', bg: '#1a2e1a' },
    result: null
  },
  {
    id: 'prx-c9', round: 'Swiss Stage · Round 1',
    teamA: { id: 'PRX', name: 'PAPER REX', color: '#fb923c', bg: '#1f1810' },
    teamB: { id: 'C9', name: 'CLOUD9', color: '#60a5fa', bg: '#1a1a2e' },
    result: null
  }
];

const loadPickem = () => JSON.parse(localStorage.getItem('vp_pickem') || '{}');

const savePickem = () => {
  const picks = {};
  document.querySelectorAll('.pickem-team.selected').forEach(el => {
    const matchId = el.closest('.pickem-match').dataset.matchId;
    picks[matchId] = el.dataset.teamId;
  });
  localStorage.setItem('vp_pickem', JSON.stringify(picks));
  showToast('Picks saved!', '🎯');

  // Count points (correct picks = result matches pick)
  let pts = 0;
  PICKEM_MATCHES.forEach(m => {
    if (m.result && picks[m.id] === m.result) pts += 10;
  });
  const ppVal = document.getElementById('pp-val');
  if (ppVal) ppVal.textContent = pts;
};

const clearPickem = () => {
  localStorage.removeItem('vp_pickem');
  document.querySelectorAll('.pickem-team').forEach(t => t.classList.remove('selected', 'correct', 'incorrect'));
  showToast('Picks cleared', '🗑️');
};

const renderPickem = () => {
  const grid = document.getElementById('pickem-grid');
  if (!grid) return;
  const saved = loadPickem();

  grid.innerHTML = '';
  PICKEM_MATCHES.forEach(match => {
    const div = document.createElement('div');
    div.className = 'pickem-match';
    div.dataset.matchId = match.id;

    const getClass = (teamId) => {
      let cls = 'pickem-team';
      if (saved[match.id] === teamId) cls += ' selected';
      if (match.result && saved[match.id] === teamId) {
        cls += match.result === teamId ? ' correct' : ' incorrect';
      }
      return cls;
    };

    div.innerHTML = `
      <div class="pickem-match-header">${match.round}${match.result ? ` · RESULT: ${match.result}` : ' · IN PROGRESS'}</div>
      <div class="pickem-teams">
        <div class="${getClass(match.teamA.id)}" data-team-id="${match.teamA.id}" style="--team-color:${match.teamA.color}">
          <div class="pickem-logo" style="background:${match.teamA.bg};border:1px solid ${match.teamA.color};color:${match.teamA.color}">${match.teamA.id}</div>
          <span>${match.teamA.name}</span>
          ${match.result === match.teamA.id ? '<span style="color:#4ade80;font-size:0.75rem">✓ WINNER</span>' : ''}
        </div>
        <div class="pickem-vs">VS</div>
        <div class="${getClass(match.teamB.id)}" data-team-id="${match.teamB.id}" style="--team-color:${match.teamB.color}">
          <div class="pickem-logo" style="background:${match.teamB.bg};border:1px solid ${match.teamB.color};color:${match.teamB.color}">${match.teamB.id}</div>
          <span>${match.teamB.name}</span>
          ${match.result === match.teamB.id ? '<span style="color:#4ade80;font-size:0.75rem">✓ WINNER</span>' : ''}
        </div>
      </div>
    `;

    // Click to select pick
    div.querySelectorAll('.pickem-team').forEach(teamEl => {
      teamEl.addEventListener('click', () => {
        if (match.result) { showToast('Match already completed', '🔒'); return; }
        div.querySelectorAll('.pickem-team').forEach(t => t.classList.remove('selected'));
        teamEl.classList.add('selected');
        AudioSystem.playClick();
        showToast(`Picked: ${teamEl.dataset.teamId}`, '🎯');
      });
    });

    grid.appendChild(div);
  });

  // Calculate existing points
  let pts = 0;
  PICKEM_MATCHES.forEach(m => { if (m.result && saved[m.id] === m.result) pts += 10; });
  const ppVal = document.getElementById('pp-val');
  if (ppVal) ppVal.textContent = pts;
};

/* ── DROPS TIMER SIMULATION ─────────────────────────────────
   Simulates watch time accumulating as the user stays on page
   ─────────────────────────────────────────────────────────── */
const DropsTimer = (() => {
  let watched = parseFloat(localStorage.getItem('vp_drops_watched') || '2'); // hours
  const MAX = 3;

  const update = () => {
    watched = Math.min(MAX, watched + (1 / 3600)); // +1 second
    localStorage.setItem('vp_drops_watched', watched);
    const bar = document.getElementById('drop1-bar');
    const txt = document.getElementById('drops-time-text');
    if (!bar || !txt) return;
    const pct = Math.min(100, (watched / MAX) * 100);
    bar.style.width = pct + '%';
    const h = Math.floor(watched);
    const m = Math.floor((watched % 1) * 60);
    txt.textContent = `${h}h ${m}m / ${MAX}h required`;

    if (pct >= 100 && !localStorage.getItem('vp_drop1_claimed')) {
      localStorage.setItem('vp_drop1_claimed', '1');
      showToast('🎁 Drop unlocked: Santiago 2026 Gun Buddy!', '🏆', 5000);
    }
  };

  const init = () => setInterval(update, 1000);
  return { init };
})();

/* ── BRACKET TEAMS ── */
const BRACKET_TEAMS = [
  { id: 'NRG', region: 'Americas', color: '#4ade80', bg: '#1a1a2e' },
  { id: 'XLG', region: 'EMEA',     color: '#ff6b6b', bg: '#2d1b1b' },
  { id: 'EDG', region: 'Pacific',  color: '#60a5fa', bg: '#1a1a4e' },
  { id: 'M8',  region: 'Americas', color: '#a78bfa', bg: '#1e1a2d' },
  { id: 'FNC', region: 'EMEA',     color: '#818cf8', bg: '#1e1640' },
  { id: 'SEN', region: 'Americas', color: '#4ade80', bg: '#1a2e1a' },
  { id: 'PRX', region: 'Pacific',  color: '#fb923c', bg: '#1f1810' },
  { id: 'C9',  region: 'Americas', color: '#60a5fa', bg: '#1a1a2e' },
  { id: 'LEV', region: 'Americas', color: '#facc15', bg: '#1e1a10' },
  { id: 'T1',  region: 'Pacific',  color: '#ff6b6b', bg: '#2d1a1a' },
  { id: 'GEN', region: 'Pacific',  color: '#a78bfa', bg: '#1a1a2e' },
  { id: 'TH',  region: 'Pacific',  color: '#34d399', bg: '#0e1e18' },
  { id: 'KRU', region: 'Americas', color: '#fb923c', bg: '#1e1610' },
  { id: 'TEC', region: 'EMEA',     color: '#60a5fa', bg: '#101828' },
  { id: 'BBL', region: 'EMEA',     color: '#ff6b6b', bg: '#200d0d' },
  { id: 'VIT', region: 'EMEA',     color: '#facc15', bg: '#1c1a08' }
];

const renderBracketTeams = () => {
  const grid = document.querySelector('.bracket-teams-grid');
  if (!grid) return;
  BRACKET_TEAMS.forEach(t => {
    const chip = document.createElement('div');
    chip.className = 'bracket-team-chip';
    chip.innerHTML = `
      <div class="bchip-logo" style="background:${t.bg};border:1px solid ${t.color};color:${t.color}">${t.id}</div>
      <div>
        <div>${t.id}</div>
        <div class="bchip-region">${t.region}</div>
      </div>
    `;
    grid.appendChild(chip);
  });
};

/* ── CONNECT RIOT ACCOUNT (simulated) ── */
const connectRiot = () => {
  showToast('Opening Riot account login...', '🔑');
  setTimeout(() => {
    if (Auth.isLoggedIn()) {
      showToast('Riot account linked! Drops activated.', '✅', 4000);
    } else {
      showToast('Please sign in first to link your account.', '⚠️');
      setTimeout(() => window.location.href = 'signin.html', 1500);
    }
  }, 800);
};

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  LiveScoreTicker.init();
  renderPickem();
  renderBracketTeams();
  DropsTimer.init();
});
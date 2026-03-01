/* ============================================================
   VALORANT PROTOCOL 2026 — weapons.js
   Full weapon database, rendering, and comparison bar chart
   Authors: Ysa Rosario & Nathan Ogerio
   ============================================================ */

/* ── WEAPON DATA ────────────────────────────────────────────
   Stats scale: damage 0-200, fire_rate 0-20 rounds/sec,
   magazine 0-60 rounds, reload 0-5 seconds,
   wall_pen 0-100 (relative), recoil 0-100 (relative)
   ─────────────────────────────────────────────────────────── */
const WEAPONS = [

  /* ── SIDEARMS ── */
  {
    id: 'classic', name: 'CLASSIC', category: 'sidearms', cost: 0, emoji: '🔫',
    desc: 'The default starting pistol issued to every agent. Semi-auto or burst; versatile and free.',
    stats: { damage: 26, fire_rate: 6.75, magazine: 12, reload: 1.75, wall_pen: 20, recoil: 18, range: 30 }
  },
  {
    id: 'shorty', name: 'SHORTY', category: 'sidearms', cost: 150, emoji: '🔫',
    desc: 'A pocket shotgun with devastating short-range output. Two shots, reload fast.',
    stats: { damage: 24, fire_rate: 3.3, magazine: 2, reload: 1.75, wall_pen: 10, recoil: 45, range: 10 }
  },
  {
    id: 'frenzy', name: 'FRENZY', category: 'sidearms', cost: 450, emoji: '🔫',
    desc: 'A full-auto pistol with a high rate of fire. Great for close-range pistol rounds.',
    stats: { damage: 26, fire_rate: 10, magazine: 13, reload: 1.5, wall_pen: 22, recoil: 30, range: 20 }
  },
  {
    id: 'ghost', name: 'GHOST', category: 'sidearms', cost: 500, emoji: '🔫',
    desc: 'A silenced semi-auto pistol. Accurate at medium range and quiet enough to reposition safely.',
    stats: { damage: 30, fire_rate: 6.75, magazine: 15, reload: 1.5, wall_pen: 25, recoil: 15, range: 50 }
  },
  {
    id: 'sheriff', name: 'SHERIFF', category: 'sidearms', cost: 800, emoji: '🔫',
    desc: 'A powerful revolver that one-shots to the head at any range. High risk, high reward.',
    stats: { damage: 55, fire_rate: 4, magazine: 6, reload: 2.25, wall_pen: 35, recoil: 50, range: 60 }
  },
  {
    id: 'bandit', name: 'BANDIT', category: 'sidearms', cost: 600, emoji: '🔫', isNew: true,
    desc: 'New in Patch 12.0! A burst pistol with exceptional accuracy and 600-credit price point — reshaping pistol round meta with its 3-round burst and low recoil profile.',
    stats: { damage: 32, fire_rate: 8, magazine: 15, reload: 1.6, wall_pen: 28, recoil: 22, range: 42 }
  },

  /* ── SMGs ── */
  {
    id: 'stinger', name: 'STINGER', category: 'smgs', cost: 950, emoji: '🔫',
    desc: 'A burst SMG delivering incredible up-close firepower. Excellent for fast-paced entry.',
    stats: { damage: 27, fire_rate: 18, magazine: 20, reload: 2.25, wall_pen: 20, recoil: 40, range: 20 }
  },
  {
    id: 'spectre', name: 'SPECTRE', category: 'smgs', cost: 1600, emoji: '🔫',
    desc: 'Silenced and versatile, the Spectre is excellent for fast eco-round plays at medium range.',
    stats: { damage: 26, fire_rate: 13.33, magazine: 30, reload: 2.25, wall_pen: 25, recoil: 28, range: 35 }
  },

  /* ── SHOTGUNS ── */
  {
    id: 'bucky', name: 'BUCKY', category: 'shotguns', cost: 850, emoji: '🔫',
    desc: 'A reliable pump shotgun with alt-fire for a tighter spread. Dominant in close corners.',
    stats: { damage: 34, fire_rate: 1.1, magazine: 5, reload: 2.5, wall_pen: 12, recoil: 55, range: 12 }
  },
  {
    id: 'judge', name: 'JUDGE', category: 'shotguns', cost: 1850, emoji: '🔫',
    desc: 'Full-auto shotgun that blankets a wide area. Powerful and chaotic in the right hands.',
    stats: { damage: 34, fire_rate: 3.5, magazine: 7, reload: 2.2, wall_pen: 12, recoil: 60, range: 12 }
  },

  /* ── RIFLES ── */
  {
    id: 'bulldog', name: 'BULLDOG', category: 'rifles', cost: 2050, emoji: '🔫',
    desc: 'A 3-round burst rifle with a scope option. Economical rifle that punches above its weight.',
    stats: { damage: 35, fire_rate: 9.15, magazine: 24, reload: 2.5, wall_pen: 40, recoil: 32, range: 60 }
  },
  {
    id: 'guardian', name: 'GUARDIAN', category: 'rifles', cost: 2250, emoji: '🔫',
    desc: 'A single-fire marksman rifle. Headshots at any range and devastating wall penetration.',
    stats: { damage: 65, fire_rate: 5.25, magazine: 12, reload: 2.5, wall_pen: 65, recoil: 20, range: 80 }
  },
  {
    id: 'phantom', name: 'PHANTOM', category: 'rifles', cost: 2900, emoji: '🔫',
    desc: 'Silenced full-auto rifle. The go-to for attack-side plays — no tracers, minimal recoil.',
    stats: { damage: 39, fire_rate: 11, magazine: 30, reload: 2.5, wall_pen: 45, recoil: 25, range: 70 }
  },
  {
    id: 'vandal', name: 'VANDAL', category: 'rifles', cost: 2900, emoji: '🔫',
    desc: 'One-tap rifle with no damage drop-off. High recoil, but one headshot at any range.',
    stats: { damage: 40, fire_rate: 9.75, magazine: 25, reload: 2.5, wall_pen: 40, recoil: 38, range: 90 }
  },
  {
    id: 'marshal', name: 'MARSHAL', category: 'rifles', cost: 950, emoji: '🔫',
    desc: 'Budget bolt-action sniper. One-shot body kill with scope; lethal when used aggressively.',
    stats: { damage: 101, fire_rate: 1.5, magazine: 5, reload: 2.5, wall_pen: 50, recoil: 22, range: 85 }
  },
  {
    id: 'outlaw', name: 'OUTLAW', category: 'rifles', cost: 2400, emoji: '🔫',
    desc: 'A double-barrel sniper with two fast shots. A sniper rifle that doubles as a flanking tool.',
    stats: { damage: 140, fire_rate: 1.75, magazine: 2, reload: 2.0, wall_pen: 55, recoil: 30, range: 88 }
  },

  /* ── SNIPERS ── */
  {
    id: 'operator', name: 'OPERATOR', category: 'snipers', cost: 4700, emoji: '🔫',
    desc: 'The premier sniper rifle. One-shots anywhere on body shot. Unmatched range and lethality.',
    stats: { damage: 150, fire_rate: 0.75, magazine: 5, reload: 3.7, wall_pen: 60, recoil: 15, range: 100 }
  },

  /* ── MACHINE GUNS ── */
  {
    id: 'ares', name: 'ARES', category: 'machine-guns', cost: 1600, emoji: '🔫',
    desc: 'A light machine gun that spins up to terrifying fire rate. Excellent for suppressing defenders.',
    stats: { damage: 30, fire_rate: 13, magazine: 50, reload: 3.25, wall_pen: 30, recoil: 42, range: 40 }
  },
  {
    id: 'odin', name: 'ODIN', category: 'machine-guns', cost: 3200, emoji: '🔫',
    desc: 'The heavy machine gun. Spinning barrel increases fire rate. Enormous magazine devastates teams.',
    stats: { damage: 38, fire_rate: 12, magazine: 100, reload: 5.0, wall_pen: 45, recoil: 50, range: 50 }
  },

  /* ── MELEE ── */
  {
    id: 'knife', name: 'KNIFE', category: 'melee', cost: 0, emoji: '🗡️',
    desc: 'Every agent\'s default melee weapon. Fast movement speed when equipped. Can be thrown for insta-kill.',
    stats: { damage: 50, fire_rate: 2.5, magazine: 1, reload: 0, wall_pen: 0, recoil: 0, range: 2 }
  }
];

/* Category metadata */
const CATEGORIES = {
  sidearms: { label: 'SIDEARMS', icon: '🔫' },
  smgs:     { label: 'SMGs', icon: '💨' },
  shotguns: { label: 'SHOTGUNS', icon: '💥' },
  rifles:   { label: 'RIFLES', icon: '🎯' },
  snipers:  { label: 'SNIPERS', icon: '🔭' },
  'machine-guns': { label: 'MACHINE GUNS', icon: '⚙️' },
  melee:    { label: 'MELEE', icon: '🗡️' }
};

/* ── BUILD WEAPON CARD ──────────────────────────────────────── */
const buildWeaponCard = (weapon) => {
  const card = document.createElement('div');
  card.className = 'weapon-card reveal';
  card.setAttribute('data-id', weapon.id);
  card.addEventListener('click', () => openWeaponModal(weapon));

  // Pick a glow color per category
  const glowMap = {
    sidearms: 'rgba(250,204,21,0.22)', smgs: 'rgba(96,165,250,0.22)',
    shotguns: 'rgba(251,146,60,0.22)', rifles: 'rgba(255,70,85,0.22)',
    snipers:  'rgba(167,139,250,0.22)', mgs: 'rgba(74,222,128,0.22)',
    melee:    'rgba(248,113,113,0.22)'
  };
  const wglow = glowMap[weapon.category] || 'rgba(255,70,85,0.2)';

  // Stat bar values normalised 0–100
  const maxes = { damage: 100, fire_rate: 20, magazine: 35, range: 80 };
  const bars = [
    { key: 'DMG', val: weapon.stats.damage,    max: maxes.damage },
    { key: 'RPM', val: weapon.stats.fire_rate,  max: maxes.fire_rate },
    { key: 'MAG', val: weapon.stats.magazine,   max: maxes.magazine },
    { key: 'RNG', val: weapon.stats.range,       max: maxes.range },
  ];
  const barsHtml = bars.map(b => {
    const pct = Math.min(100, Math.round((b.val / b.max) * 100));
    return `<div class="wcard-bar-row">
      <span class="wcard-bar-key">${b.key}</span>
      <div class="wcard-bar-track"><div class="wcard-bar-fill" style="width:${pct}%"></div></div>
      <span class="wcard-bar-val">${b.val}</span>
    </div>`;
  }).join('');

  card.innerHTML = `
    <div class="weapon-card-img">
      <!-- 📁 Drop image as: assets/weapons/${weapon.id}.png -->
      <img class="weapon-card-photo" src="assets/weapons/${weapon.id}.png" alt="${weapon.name}"
           onerror="this.style.display='none';this.nextElementSibling.style.display='block';" />
      <div class="weapon-thumb-fallback" style="display:none">
        <div class="weapon-thumb" style="--wglow:${wglow}"></div>
        <span class="weapon-thumb-letter">${weapon.name[0]}</span>
        <div class="weapon-icon-wrap">
          <span class="weapon-thumb-emoji">${weapon.emoji}</span>
        </div>
      </div>
      ${weapon.isNew ? '<span class="weapon-new-badge">NEW</span>' : ''}
    </div>
    <div class="weapon-card-body">
      <div class="weapon-card-name">${weapon.name}</div>
      <div class="weapon-card-cost">
        <span class="creds">${weapon.cost === 0 ? 'FREE' : weapon.cost + ' CR'}</span>
      </div>
      <div class="weapon-card-stats">
        <span class="wstat">DMG ${weapon.stats.damage}</span>
        <span class="wstat">MAG ${weapon.stats.magazine}</span>
        <span class="wstat">${weapon.stats.range}m</span>
      </div>
    </div>
    <div class="weapon-card-bars">${barsHtml}</div>
  `;
  return card;
};

/* ── RENDER WEAPONS ─────────────────────────────────────────── */
const renderWeapons = (filter = 'all') => {
  const grid = document.getElementById('weapons-grid');
  grid.innerHTML = '';

  const cats = filter === 'all'
    ? Object.keys(CATEGORIES)
    : [filter];

  cats.forEach(cat => {
    const weapons = WEAPONS.filter(w => w.category === cat);
    if (!weapons.length) return;

    const section = document.createElement('div');
    section.className = 'weapon-category-section reveal';

    const meta = CATEGORIES[cat];
    section.innerHTML = `
      <div class="weapon-category-header">
        <span style="font-size:1.6rem">${meta.icon}</span>
        <h2>${meta.label}</h2>
        <span class="tag tag-primary">${weapons.length} WEAPONS</span>
      </div>
      <div class="weapons-role-grid" id="wcat-${cat}"></div>
    `;
    grid.appendChild(section);

    const catGrid = section.querySelector(`#wcat-${cat}`);
    weapons.forEach(w => catGrid.appendChild(buildWeaponCard(w)));
  });

  setTimeout(() => ScrollReveal.init(), 100);
};

/* ── WEAPON MODAL ───────────────────────────────────────────── */
const openWeaponModal = (w) => {
  const modal = document.getElementById('weapon-modal');
  const body  = document.getElementById('weapon-modal-body');
  AudioSystem.playClick();

  const s = w.stats;
  const statBars = [
    { label: 'Damage', key: 'damage', max: 200 },
    { label: 'Fire Rate (rds/s)', key: 'fire_rate', max: 20 },
    { label: 'Magazine', key: 'magazine', max: 100 },
    { label: 'Wall Pen', key: 'wall_pen', max: 100 },
    { label: 'Range (m)', key: 'range', max: 100 },
    { label: 'Recoil Control', key: 'recoil', max: 100, invert: true }
  ];

  const barsHtml = statBars.map(bar => {
    const rawVal = s[bar.key] || 0;
    const pct = bar.invert
      ? Math.max(0, 100 - (rawVal / bar.max) * 100)
      : Math.min(100, (rawVal / bar.max) * 100);
    return `
      <div class="wbar-row">
        <div class="wbar-label-row">
          <span>${bar.label}</span>
          <span>${bar.invert ? `${100 - Math.round(pct * bar.max / 100)}` : rawVal}</span>
        </div>
        <div class="wbar-track">
          <div class="wbar-fill" style="width:${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');

  body.innerHTML = `
    <div class="wmodal-header">
      <div class="wmodal-img">${w.emoji}</div>
      <div class="wmodal-info">
        ${w.isNew ? '<span class="tag tag-new" style="margin-bottom:10px;display:inline-block">NEW IN PATCH 12.0</span>' : ''}
        <div class="wmodal-name">${w.name}</div>
        <div class="wmodal-cost">${w.cost === 0 ? 'FREE' : w.cost + ' CREDITS'}</div>
        <div class="wmodal-cat">${CATEGORIES[w.category]?.label || w.category}</div>
      </div>
    </div>
    <div class="wmodal-stats-grid">
      <div class="wstat-item"><span class="wstat-label">Damage</span><span class="wstat-val">${s.damage}</span></div>
      <div class="wstat-item"><span class="wstat-label">Magazine</span><span class="wstat-val">${s.magazine}</span></div>
      <div class="wstat-item"><span class="wstat-label">Reload</span><span class="wstat-val">${s.reload}s</span></div>
      <div class="wstat-item"><span class="wstat-label">Fire Rate</span><span class="wstat-val">${s.fire_rate}/s</span></div>
      <div class="wstat-item"><span class="wstat-label">Wall Pen</span><span class="wstat-val">${s.wall_pen}%</span></div>
      <div class="wstat-item"><span class="wstat-label">Range</span><span class="wstat-val">${s.range}m</span></div>
    </div>
    <div class="wmodal-bars">${barsHtml}</div>
    <div class="wmodal-desc">${w.desc}</div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

const closeWeaponModal = () => {
  document.getElementById('weapon-modal').classList.remove('open');
  document.body.style.overflow = '';
};

window.addEventListener('keydown', e => { if (e.key === 'Escape') closeWeaponModal(); });

/* ── COMPARISON TOOL ────────────────────────────────────────── */

/** Populates weapon select dropdowns */
const populateCompareSelects = () => {
  const selectA = document.getElementById('compare-a');
  const selectB = document.getElementById('compare-b');
  if (!selectA || !selectB) return;

  const optHtml = WEAPONS.map(w =>
    `<option value="${w.id}">${w.name} (${w.cost === 0 ? 'FREE' : w.cost + ' CR'})</option>`
  ).join('');

  selectA.innerHTML = optHtml;
  selectB.innerHTML = optHtml;

  // Default selection: Bandit vs Ghost
  selectA.value = 'bandit';
  selectB.value = 'ghost';
};

/** Runs the side-by-side bar comparison */
const runComparison = () => {
  const idA = document.getElementById('compare-a').value;
  const idB = document.getElementById('compare-b').value;
  const weapA = WEAPONS.find(w => w.id === idA);
  const weapB = WEAPONS.find(w => w.id === idB);
  if (!weapA || !weapB) return;

  AudioSystem.playClick();
  const result = document.getElementById('compare-result');
  const barsEl = document.getElementById('compare-bars');
  result.style.display = 'block';

  const metrics = [
    { label: 'Damage per Hit',  key: 'damage',    max: 200 },
    { label: 'Fire Rate (rds/s)', key: 'fire_rate', max: 20 },
    { label: 'Magazine Size',   key: 'magazine',  max: 100 },
    { label: 'Effective Range', key: 'range',     max: 100 },
    { label: 'Wall Penetration', key: 'wall_pen',  max: 100 },
    { label: 'Recoil Control',  key: 'recoil',    max: 100, invert: true }
  ];

  barsEl.innerHTML = `
    <div class="compare-legend">
      <div class="legend-item">
        <div class="legend-dot" style="background:var(--primary)"></div>
        <span>${weapA.name}</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot" style="background:#60a5fa"></div>
        <span>${weapB.name}</span>
      </div>
    </div>
  ` + metrics.map(m => {
    const vA = weapA.stats[m.key] || 0;
    const vB = weapB.stats[m.key] || 0;
    const pA = m.invert
      ? Math.max(0, 100 - (vA / m.max) * 100)
      : Math.min(100, (vA / m.max) * 100);
    const pB = m.invert
      ? Math.max(0, 100 - (vB / m.max) * 100)
      : Math.min(100, (vB / m.max) * 100);
    const dispA = m.invert ? (100 - Math.round(pA)) : vA;
    const dispB = m.invert ? (100 - Math.round(pB)) : vB;
    return `
      <div class="compare-bar-row">
        <div class="compare-bar-label">
          <span>${m.label}</span>
          <span>${weapA.name}: ${dispA} | ${weapB.name}: ${dispB}</span>
        </div>
        <div class="compare-dual-bars">
          <div class="compare-bar-track">
            <div class="compare-bar-fill-a" style="width:0" data-target="${pA}"></div>
          </div>
          <div class="compare-bar-track">
            <div class="compare-bar-fill-b" style="width:0" data-target="${pB}"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Animate bars
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.compare-bar-fill-a, .compare-bar-fill-b').forEach(bar => {
        bar.style.width = bar.dataset.target + '%';
      });
    });
  });

  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  showToast(`Comparing ${weapA.name} vs ${weapB.name}`, '⚖️');
};

/* ── INIT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderWeapons();
  populateCompareSelects();

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderWeapons(btn.dataset.cat);
    });
  });

  // URL param pre-filter
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('category');
  if (catParam) {
    const btn = document.querySelector(`.filter-btn[data-cat="${catParam}"]`);
    if (btn) btn.click();
  }
});
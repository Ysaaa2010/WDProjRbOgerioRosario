/* ============================================================
   VALORANT PROTOCOL 2026 — maps.js
   Complete map database with modal views
   Authors: Ysa Rosario & Nathan Ogerio
   ============================================================ */

const MAPS = [
  {
    id: 'bind', name: 'BIND', location: 'Rabat, Morocco 🇲🇦', emoji: '🌅',
    gradient: 'linear-gradient(135deg,#8b5e3c,#3d2b1f)',
    sites: ['A — Showers', 'B — Hookah'],
    status: 'rotation', year: 2020,
    features: ['Two one-way teleporters for rapid rotation', 'No mid lane — all action funnels through sites', 'Iconic showers chokepoint on A', 'Warm Moroccan sandstone aesthetic'],
    desc: 'Set in Morocco, Bind features two one-way teleporters that instantly rotate players across the map. No mid access forces creative plays through teleporters.'
  },
  {
    id: 'haven', name: 'HAVEN', location: 'Thimphu, Bhutan 🇧🇹', emoji: '🏯',
    gradient: 'linear-gradient(135deg,#2d5a27,#1a3318)',
    sites: ['A — Long', 'B — Mid', 'C — Garage'],
    status: 'rotation', year: 2020,
    features: ['Only map with THREE spike sites', 'Mid garage connects to both B and C', 'Bhutanese monastery architecture', 'Defender advantage on long corridors'],
    desc: 'The only VALORANT map with three spike sites. Controlling mid garage is crucial as it provides access to both B and C sites simultaneously.'
  },
  {
    id: 'split', name: 'SPLIT', location: 'Tokyo, Japan 🇯🇵', emoji: '⛩️',
    gradient: 'linear-gradient(135deg,#c0392b,#6b1a1a)',
    sites: ['A — Heaven', 'B — Screens'],
    status: 'rotation', year: 2020,
    features: ['Vertical rope mechanics to high ground', 'Mid tower control dominates the map', 'Tight corridors reward precise gunfights', 'Neon-lit Japanese city aesthetic'],
    desc: 'Tokyo\'s urban Split emphasizes vertical play. Rope mechanics allow access to high ground, and mid tower control determines which team dictates the round.'
  },
  {
    id: 'ascent', name: 'ASCENT', location: 'Venice, Italy 🇮🇹', emoji: '🏛️',
    gradient: 'linear-gradient(135deg,#c8a44e,#5c4a1e)',
    sites: ['A — Main', 'B — Market'],
    status: 'active', year: 2020,
    features: ['Closeable doors on both sites for defenders', 'Open mid with catwalk and B main access', 'Italian floating island setting', 'Orb-shaped Radianite structures floating mid-air'],
    desc: 'Venice-inspired floating island Ascent has closeable mid doors that can delay or redirect attackers. Open mid rewards teams that fight for early control.'
  },
  {
    id: 'icebox', name: 'ICEBOX', location: 'Bennett Island, Russia 🇷🇺', emoji: '❄️',
    gradient: 'linear-gradient(135deg,#2c4a6e,#0d1f33)',
    sites: ['A — Rafters', 'B — Green'],
    status: 'active', year: 2020,
    features: ['Ziplines for rapid vertical traversal', 'Complex site geometry with rafters overhead', 'Freezing Russian research facility', 'Highly vertical B site with crane'],
    desc: 'A frozen Russian research base, Icebox features ziplines for fast vertical movement. A site\'s rafters and B site\'s crane provide unique high-ground opportunities.'
  },
  {
    id: 'breeze', name: 'BREEZE 2026', location: 'Atlantic Islands 🏝️', emoji: '🌊',
    gradient: 'linear-gradient(135deg,#0e7490,#083344)',
    sites: ['A — Hall', 'B — Shore'],
    status: 'active', year: 2026, isNew: false, isRework: true,
    features: ['2026 REWORK: Tighter mid-lane control added', '2026 REWORK: New cover points on A and B', '2026 REWORK: Visual overhaul with Omega Breach lore', 'Still features iconic wide open spaces and sea views'],
    desc: 'Breeze returns completely reworked for 2026. The open island map has been tightened with new cover, mid control chokepoints, and a complete visual overhaul tied to the Omega Breach storyline.'
  },
  {
    id: 'fracture', name: 'FRACTURE', location: 'American Southwest, USA 🇺🇸', emoji: '⚡',
    gradient: 'linear-gradient(135deg,#7c3aed,#3b1a6e)',
    sites: ['A — Dish', 'B — Arcade'],
    status: 'rotation', year: 2021,
    features: ['H-shaped layout with attacker spawn in the center', 'Ropes and zip lines for site access', 'Defenders are surrounded on all sides', 'Radianite research facility setting'],
    desc: 'Fracture\'s unique H-shaped layout places the attacker spawn in the middle, surrounding defenders on all sides. Ropes and ziplines allow for fast entry.'
  },
  {
    id: 'pearl', name: 'PEARL', location: 'Lisbon, Portugal 🇵🇹', emoji: '🦪',
    gradient: 'linear-gradient(135deg,#1e40af,#0c1f5c)',
    sites: ['A — Art', 'B — Market'],
    status: 'active', year: 2022,
    features: ['Underwater city built on an alternate-Earth ocean floor', 'No abilities on ladder climb — tactical commits', 'Tight mid-control through art and market', 'Rich Portuguese tilework aesthetic'],
    desc: 'Pearl is an alternate-Earth underwater city where a Radianite anomaly was harnessed to build a civilization beneath the Atlantic Ocean. Tight corridors reward coordinated play.'
  },
  {
    id: 'lotus', name: 'LOTUS', location: 'Western Ghats, India 🇮🇳', emoji: '🪷',
    gradient: 'linear-gradient(135deg,#dc2626,#7f1d1d)',
    sites: ['A — Rubble', 'B — Tree', 'C — Waterfall'],
    status: 'active', year: 2023,
    features: ['Three spike sites with rotating doors', 'Ancient temple ruins in the mountains', 'Breakable walls between A and B for rotations', 'Moving doors add defender utility on sites'],
    desc: 'Lotus is an ancient Indian temple with three spike sites and unique rotating doors. Breakable walls and rotating door mechanics add dynamic gameplay to this lush environment.'
  },
  {
    id: 'sunset', name: 'SUNSET', location: 'Los Angeles, USA 🇺🇸', emoji: '🌇',
    gradient: 'linear-gradient(135deg,#ea580c,#7c2d12)',
    sites: ['A — Alley', 'B — Pizza'],
    status: 'active', year: 2023,
    features: ['Classic two-site map with a closeable mid door', 'Vibrant Los Angeles streetwear neighborhood', 'Defender-sided mid with Market boost angles', 'Relatable urban setting with pizzeria and shops'],
    desc: 'Set in a Los Angeles neighborhood, Sunset features a familiar two-site layout with a closeable mid door. The map rewards fundamental VALORANT skills with clean sightlines.'
  },
  {
    id: 'abyss', name: 'ABYSS', location: 'North Atlantic 🌊', emoji: '🌀',
    gradient: 'linear-gradient(135deg,#1e3a5f,#0a1628)',
    sites: ['A — Ledge', 'B — Bridge'],
    status: 'active', year: 2024,
    features: ['NO WALLS on certain edges — fall off = instant death', 'Stunning deep-ocean platform setting', 'Unique vertical map geometry with drop zones', 'Wind mechanics push agents near edge drops'],
    desc: 'Abyss is a floating platform above the ocean with no walls on key edges — falling off is instant death. The most vertically unique map in the pool, demanding precise positioning.'
  },
  {
    id: 'corrode', name: 'CORRODE', location: 'Earth-2 Megacity 🌆', emoji: '☢️',
    gradient: 'linear-gradient(135deg,#374151,#111827)',
    sites: ['A — Refinery', 'B — Canal'],
    status: 'active', year: 2026, isNew: true,
    features: ['NEW MAP in Patch 12.0 — Earth-2 setting', 'Corrosive terrain hazard zones that deal decay damage', 'Industrial megacity with tight corridors', 'Unique environmental hazard mechanics'],
    desc: 'NEW in Patch 12.0. Corrode is set in Earth-2\'s decaying industrial megacity. Corrosive terrain zones deal passive decay damage, forcing teams to fight through hazardous lanes. Industrial ducts and tight corridors create an oppressive atmosphere.'
  }
];

/* ── RENDER ── */
const buildMapCard = (map) => {
  const card = document.createElement('div');
  card.className = 'map-card reveal';
  card.addEventListener('click', () => openMapModal(map));

  let badge = '';
  if (map.isNew)    badge = `<div class="map-badge badge-new">NEW 2026</div>`;
  else if (map.isRework) badge = `<div class="map-badge badge-rework">REWORKED 2026</div>`;
  else if (map.status === 'rotation') badge = `<div class="map-badge badge-rotation">ROTATION</div>`;

  card.innerHTML = `
    <div class="map-card-banner">
      <!-- 📁 Drop image as: assets/maps/${map.id}.avif -->
      <img class="map-card-photo" src="assets/maps/${map.id}.avif" alt="${map.name}"
           onerror="this.style.display='none';this.nextElementSibling.style.display='block';" />
      <div class="map-banner-fallback" style="display:none">
        <div class="map-banner-bg" style="--map-gradient:${map.gradient}"></div>
        <span class="map-banner-icon">${map.emoji}</span>
        <div class="map-banner-fade"></div>
      </div>
      <div class="map-banner-fade"></div>
      ${badge}
      <div class="map-banner-text">
        <div class="map-banner-name">${map.name}</div>
        <div class="map-banner-location">${map.location}</div>
      </div>
    </div>
    <div class="map-card-info">
      <div class="map-card-meta">
        <span class="map-meta-tag">${map.year}</span>
        <span class="map-meta-tag">${map.status.toUpperCase()}</span>
        ${map.isNew ? '<span class="map-meta-tag" style="color:var(--primary);border-color:var(--primary)">NEW</span>' : ''}
        ${map.isRework ? '<span class="map-meta-tag" style="color:#a78bfa;border-color:#a78bfa">REWORK</span>' : ''}
      </div>
      <div class="map-card-sites">${map.sites.length} SITES</div>
    </div>
  `;
  return card;
};

const renderMaps = () => {
  const grid = document.getElementById('maps-grid');
  MAPS.forEach(map => grid.appendChild(buildMapCard(map)));
  setTimeout(() => ScrollReveal.init(), 100);
};

/* ── MODAL ── */
const openMapModal = (map) => {
  const modal = document.getElementById('map-modal');
  const body  = document.getElementById('map-modal-body');
  AudioSystem.playClick();

  const sitesHtml = map.sites.map(s => {
    const letter = s.split(' ')[0];
    return `<div class="site-card"><div class="site-letter">${letter}</div><div class="site-name">${s}</div></div>`;
  }).join('');

  const featuresHtml = map.features.map(f =>
    `<div class="feature-item"><span class="fi">•</span><span>${f}</span></div>`
  ).join('');

  let badge = '';
  if (map.isNew)    badge = `<span class="tag tag-new">NEW IN PATCH 12.0</span>`;
  if (map.isRework) badge = `<span class="tag tag-new" style="color:#a78bfa;border-color:#a78bfa;background:rgba(167,139,250,0.1)">REWORKED 2026</span>`;

  body.innerHTML = `
    <div class="map-modal-header">
      <div class="map-modal-img" style="--modal-map-gradient:${map.gradient}">
        <span class="map-modal-icon">${map.emoji}</span>
      </div>
      <div class="map-modal-banner-text">
        <div class="map-modal-name">${map.name}</div>
        <div class="map-modal-location">${map.location} · ${map.year}</div>
      </div>
    </div>
    <div class="map-modal-info-bar">
      <div class="map-modal-tags">
        ${badge}
        <span class="tag tag-primary">${map.sites.length} SITES</span>
        <span class="tag ${map.status === 'rotation' ? 'tag-yellow' : 'tag-green'}">${map.status.toUpperCase()}</span>
      </div>
    </div>
    <div class="map-modal-desc">${map.desc}</div>
    <div class="map-modal-sites">
      <div class="map-sites-title">SPIKE SITES</div>
      <div class="map-sites-grid">${sitesHtml}</div>
    </div>
    <div class="map-modal-features">
      <div class="map-sites-title">MAP FEATURES</div>
      <div class="map-features-grid">${featuresHtml}</div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

const closeMapModal = () => {
  document.getElementById('map-modal').classList.remove('open');
  document.body.style.overflow = '';
};

window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMapModal(); });

document.addEventListener('DOMContentLoaded', renderMaps);
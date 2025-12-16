// Agents page interaction: builds the roster grid and updates the preview panel.

document.addEventListener('DOMContentLoaded', () => {
  const agents = [
    // Controllers
    { name: 'Astra',    role: 'Controller', desc: 'Cosmic strategist who reshapes angles and denies sightlines.', img: 'placeholder' },
    { name: 'Brimstone',role: 'Controller', desc: 'Reliable leader who delivers precise smokes and area control.', img: 'placeholder' },
    { name: 'Clove',    role: 'Controller', desc: 'Aggressive controller who keeps pressure even after falling.', img: 'placeholder' },
    { name: 'Harbor',   role: 'Controller', desc: 'Water‑based controller who slices space with fluid walls.', img: 'placeholder' },
    { name: 'Omen',     role: 'Controller', desc: 'Shadowy agent who teleports and unsettles enemy positions.', img: 'placeholder' },
    { name: 'Viper',    role: 'Controller', desc: 'Toxic controller who locks areas with poisonous utility.', img: 'placeholder' },

    // Duelists
    { name: 'Iso',      role: 'Duelist', desc: 'Precision duelist who isolates targets for clean fights.', img: 'placeholder' },
    { name: 'Jett',     role: 'Duelist', desc: 'High‑mobility duelist who dashes into risky but rewarding plays.', img: 'placeholder' },
    { name: 'Neon',     role: 'Duelist', desc: 'Electric runner who sprints and slides through tight spaces.', img: 'placeholder' },
    { name: 'Phoenix',  role: 'Duelist', desc: 'Self‑sustaining duelist who uses flames to fight and heal.', img: 'placeholder' },
    { name: 'Raze',     role: 'Duelist', desc: 'Explosive expert who clears corners with powerful grenades.', img: 'placeholder' },
    { name: 'Reyna',    role: 'Duelist', desc: 'Soul‑stealing duelist who snowballs when securing picks.', img: 'placeholder' },
    { name: 'Waylay',   role: 'Duelist', desc: 'Elusive brawler who leans on deception and repositioning.', img: 'placeholder' },
    { name: 'Yoru',     role: 'Duelist', desc: 'Dimensional trickster who fakes routes and flanks defenders.', img: 'placeholder' },

    // Initiators
    { name: 'Breach',   role: 'Initiator', desc: 'Seismic initiator who stuns enemies to open sites.', img: 'placeholder' },
    { name: 'Fade',     role: 'Initiator', desc: 'Fear‑based tracker who hunts opponents with shadows.', img: 'placeholder' },
    { name: 'Gekko',    role: 'Initiator', desc: 'Creature handler who sends companions to scout and plant.', img: 'placeholder' },
    { name: 'KAY/O',    role: 'Initiator', desc: 'Anti‑ability machine who suppresses enemy skill usage.', img: 'placeholder' },
    { name: 'Skye',     role: 'Initiator', desc: 'Team‑focused initiator who scouts and heals with creatures.', img: 'placeholder' },
    { name: 'Sova',     role: 'Initiator', desc: 'Recon archer who reveals enemies from long range.', img: 'placeholder' },
    { name: 'Tejo',     role: 'Initiator', desc: 'Tactical initiator built around precise setup utility.', img: 'placeholder' },

    // Sentinels
    { name: 'Chamber',  role: 'Sentinel', desc: 'Lethal sentinel who combines traps with powerful shots.', img: 'placeholder' },
    { name: 'Cypher',   role: 'Sentinel', desc: 'Surveillance expert who gathers information on flanks.', img: 'placeholder' },
    { name: 'Deadlock', role: 'Sentinel', desc: 'Hard defender who channels enemies into tight lanes.', img: 'placeholder' },
    { name: 'Killjoy',  role: 'Sentinel', desc: 'Tech‑savvy sentinel who locks areas with gadgets.', img: 'placeholder' },
    { name: 'Sage',     role: 'Sentinel', desc: 'Support sentinel who heals, revives, and blocks routes.', img: 'placeholder' },
    { name: 'Vyse',     role: 'Sentinel', desc: 'Adaptive defender who reacts to enemy movement.', img: 'placeholder' },
    { name: 'Veto',     role: 'Sentinel', desc: 'Planner who specializes in locking down key choke points.', img: 'placeholder' }
  ];

  const grid = document.getElementById('agentGrid');
  const nameEl = document.getElementById('name');
  const roleEl = document.getElementById('role');
  const descEl = document.getElementById('desc');
  const previewImg = document.getElementById('previewImage');
  const previewCaption = document.getElementById('previewCaption');

  if (!grid || !nameEl || !roleEl || !descEl || !previewImg || !previewCaption) return;

  let selectedCard = null;

  // Build cards
  agents.forEach(agent => {
    const card = document.createElement('button');
    card.className = 'agent-card flip-card';
    card.type = 'button';
    card.setAttribute('aria-label', `${agent.name} — ${agent.role}`);

    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img src="${agent.img}" alt="${agent.name} placeholder portrait">
        </div>
        <div class="flip-card-back">
          <p class="agent-role-pill">${agent.role}</p>
          <h3>${agent.name}</h3>
        </div>
      </div>
    `;

    card.addEventListener('click', () => selectAgent(agent, card));
    grid.appendChild(card);
  });

  function selectAgent(agent, cardElement) {
    nameEl.textContent = agent.name;
    roleEl.textContent = agent.role.toUpperCase();
    descEl.textContent = agent.desc;

    previewImg.src = agent.img;
    previewImg.alt = `${agent.name} artwork placeholder`;
    previewCaption.textContent =
      `Placeholder artwork space for ${agent.name} showing their in‑game silhouette.`;

    if (selectedCard) selectedCard.classList.remove('selected');
    cardElement.classList.add('selected');
    selectedCard = cardElement;
  }
});

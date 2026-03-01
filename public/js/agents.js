/* ============================================================
   VALORANT PROTOCOL 2026 — agents.js
   Complete agent database with filtering, search, and modal
   Authors: Ysa Rosario & Nathan Ogerio
   ============================================================ */

/* ── AGENT DATA ────────────────────────────────────────────── */
const AGENTS = [

  /* ═══════════════ DUELISTS ═══════════════ */
  {
    id: "jett", name: "JETT", realName: "Unknown", origin: "South Korea 🇰🇷",
    role: "duelist", emoji: "🌪️", color: "#c8f0ff",
    description: "Jett's agile and evasive fighting style lets her take risks no one else can. She dashes into the fray, creates chaos, and escapes before enemies know what hit them.",
    abilities: [
      { key: "C", icon: "💨", name: "Cloudburst", desc: "Throw a micro-burst that expands into a brief cloud of vision-blocking fog" },
      { key: "Q", icon: "🌊", name: "Updraft", desc: "Propel yourself upward into the air instantly" },
      { key: "E", icon: "💨", name: "Tailwind", desc: "Dash in the direction you're moving. Kills refresh this ability." },
      { key: "X", icon: "🗡️", name: "Blade Storm", desc: "Equip deadly throwing knives that deal moderate damage and kill on headshots" }
    ],
    lore: "A South Korean duelist who joined VALORANT Protocol with a sharp mind and even sharper blades."
  },
  {
    id: "reyna", name: "REYNA", realName: "Zyanya Mondragón", origin: "Mexico 🇲🇽",
    role: "duelist", emoji: "💜", color: "#c0a0ff",
    description: "Forged in the heart of Mexico, Reyna dominates single-combat, feeding off the souls of those she slays. Self-sufficient and deadly, she struggles without kills.",
    abilities: [
      { key: "C", icon: "👁️", name: "Leer", desc: "Throw a destructible Empress eye that nearsights all looking at it" },
      { key: "Q", icon: "💜", name: "Devour", desc: "Consume a nearby Soul Orb to rapidly heal to full health" },
      { key: "E", icon: "👻", name: "Dismiss", desc: "Consume a Soul Orb to become briefly intangible and invisible" },
      { key: "X", icon: "👑", name: "Empress", desc: "Instantly enter a frenzy, supercharging weapons, fire rate, and healing" }
    ]
  },
  {
    id: "raze", name: "RAZE", realName: "Tayane Alves", origin: "Brazil 🇧🇷",
    role: "duelist", emoji: "💥", color: "#ffdb8a",
    description: "Raze loves life and hates waiting around. With her satchels and explosion-based abilities, she clears rooms, bombs corners, and soars across the map.",
    abilities: [
      { key: "C", icon: "🧨", name: "Boom Bot", desc: "Releases a bot that bounces and hunts enemies dealing heavy damage" },
      { key: "Q", icon: "💣", name: "Blast Pack", desc: "Throw a satchel that sticks and explodes; can also propel yourself" },
      { key: "E", icon: "🎯", name: "Paint Shells", desc: "Throw a cluster grenade that deals area damage and spawns sub-grenades" },
      { key: "X", icon: "🚀", name: "Showstopper", desc: "Equip a rocket launcher and fire a devastating rocket" }
    ]
  },
  {
    id: "phoenix", name: "PHOENIX", realName: "Jamie Adeyemi", origin: "United Kingdom 🇬🇧",
    role: "duelist", emoji: "🔥", color: "#ffa060",
    description: "Hailing from the UK, Phoenix's fighting style is built on flash and blaze. Reborn from his own flames, he charges into battle knowing he can survive anything.",
    abilities: [
      { key: "C", icon: "⚡", name: "Blaze", desc: "Throw a flaming wall that blocks vision, damages enemies, and heals Phoenix" },
      { key: "Q", icon: "🌟", name: "Curveball", desc: "Throw a flare that blinds all who look at it mid-air" },
      { key: "E", icon: "💫", name: "Hot Hands", desc: "Throw a fireball that creates a flame zone, damaging enemies and healing Phoenix" },
      { key: "X", icon: "🔥", name: "Run It Back", desc: "Mark your current location; die during this ability to respawn there" }
    ]
  },
  {
    id: "neon", name: "NEON", realName: "Tala Nicole Dimaapi Valdez", origin: "Philippines 🇵🇭",
    role: "duelist", emoji: "⚡", color: "#80ffff",
    description: "Neon channels her bioelectric power at a rate that even she doesn't fully understand. She races ahead of danger, sparking her path with lightning.",
    abilities: [
      { key: "C", icon: "⚡", name: "Fast Lane", desc: "Fire two energy lines forward creating walls of static electricity" },
      { key: "Q", icon: "🔵", name: "Relay Bolt", desc: "Throw a high-velocity bolt that bounces and creates a concussive burst" },
      { key: "E", icon: "💨", name: "High Gear", desc: "Channel electricity to boost speed and reload; kills refresh this" },
      { key: "X", icon: "⚡", name: "Overdrive", desc: "Unleash full power for lightning-accurate spray for several seconds" }
    ]
  },
  {
    id: "iso", name: "ISO", realName: "Li Zhao Yu", origin: "China 🇨🇳",
    role: "duelist", emoji: "🎯", color: "#c084fc",
    description: "A lone hunter from China who operates in deadly isolation. Iso manipulates the space around him to isolate enemies in lethal 1v1 showdowns.",
    abilities: [
      { key: "C", icon: "🔮", name: "Contingency", desc: "Assemble an indestructible wall of energy to block bullets" },
      { key: "Q", icon: "🎯", name: "Undercut", desc: "Throw a molecular bolt that makes enemies fragile temporarily" },
      { key: "E", icon: "🛡️", name: "Double Tap", desc: "Gain a shield charge on kills; consume it to block one hit" },
      { key: "X", icon: "🌀", name: "Kill Contract", desc: "Teleport with a targeted enemy to a duel dimension for a 1v1" }
    ],
    isNew: false
  },
  {
    id: "waylay", name: "WAYLAY", realName: "Asel Abdykerimova", origin: "Kyrgyzstan 🇰🇬",
    role: "duelist", emoji: "🌊", color: "#67e8f9",
    description: "Harnessing light refraction and wave manipulation, Waylay bends trajectories and rewrites momentum in real time to escape and pursue.",
    abilities: [
      { key: "C", icon: "🌀", name: "Refract", desc: "Redirect incoming projectiles in a cone in front of you" },
      { key: "Q", icon: "🌊", name: "Slip", desc: "Dash a short distance in the direction you're facing, ignoring slows" },
      { key: "E", icon: "✨", name: "Waveform", desc: "Emit a wave of light that damages and blinds on contact" },
      { key: "X", icon: "🌟", name: "Celerity", desc: "Harness full waveform potential — tripled movement speed and refracts all bullets" }
    ],
    isNew: false
  },

  /* ═══════════════ INITIATORS ═══════════════ */
  {
    id: "sova", name: "SOVA", realName: "Sasha Novikov", origin: "Russia 🇷🇺",
    role: "initiator", emoji: "🏹", color: "#a0d0ff",
    description: "Born from the harsh frozen tundra of Russia, Sova tracks, finds, and eliminates enemies with ruthless efficiency and precision.",
    abilities: [
      { key: "C", icon: "🤖", name: "Shock Bolt", desc: "Fire an explosive bolt that emits a damaging pulse of static energy" },
      { key: "Q", icon: "🦅", name: "Owl Drone", desc: "Deploy a remote-controlled drone to scout and mark enemies" },
      { key: "E", icon: "🎯", name: "Recon Bolt", desc: "Fire a recon bolt that scans and reveals nearby enemies" },
      { key: "X", icon: "💥", name: "Hunter's Fury", desc: "Fire up to three long-range energy blasts that pierce walls" }
    ]
  },
  {
    id: "breach", name: "BREACH", realName: "Erik Torsten", origin: "Sweden 🇸🇪",
    role: "initiator", emoji: "👊", color: "#ff9060",
    description: "The bionic Swede fires powerful, targeted kinetic blasts to aggressively clear a path through enemy territory.",
    abilities: [
      { key: "C", icon: "💥", name: "Aftershock", desc: "Fire a slow-acting burst through a wall that damages on the other side" },
      { key: "Q", icon: "🌀", name: "Flashpoint", desc: "Fire a charge through the wall, blinding those looking at the point" },
      { key: "E", icon: "🌊", name: "Fault Line", desc: "Charge forward, releasing a powerful quake to concuss enemies" },
      { key: "X", icon: "💫", name: "Rolling Thunder", desc: "Send a cascading quake across a massive area, stunning enemies" }
    ]
  },
  {
    id: "skye", name: "SKYE", realName: "Kirra Foster", origin: "Australia 🇦🇺",
    role: "initiator", emoji: "🦁", color: "#a0ffa0",
    description: "Hailing from Australia, Skye and her band of beasts trail-blaze the way through hostile territory using healing, scouts, and beams.",
    abilities: [
      { key: "C", icon: "🦅", name: "Trailblazer", desc: "Control a Tasmanian tiger scout to mark and concuss enemies" },
      { key: "Q", icon: "💚", name: "Guiding Light", desc: "Send a hawk spirit that can be guided and detonated to flash enemies" },
      { key: "E", icon: "💖", name: "Regrowth", desc: "Channel healing energy to restore health of nearby allies" },
      { key: "X", icon: "🌿", name: "Seekers", desc: "Send out three seekers that track down and nearsight the three closest enemies" }
    ]
  },
  {
    id: "kayo", name: "KAY/O", realName: "KAY/O", origin: "Earth-2 (Future) 🤖",
    role: "initiator", emoji: "🤖", color: "#ffff80",
    description: "A machine of war built for one purpose: suppressing Radiants. KAY/O's power lies in overloading enemies with radiation, rendering them unable to use abilities.",
    abilities: [
      { key: "C", icon: "🔪", name: "FRAG/ment", desc: "Throw an explosive fragment that implodes after a delay, dealing heavy damage" },
      { key: "Q", icon: "💡", name: "FLASH/drive", desc: "Throw a flash grenade that blinds all who see it" },
      { key: "E", icon: "🔇", name: "ZERO/point", desc: "Throw a suppression knife that suppresses enemies on contact" },
      { key: "X", icon: "⚡", name: "NULL/cmd", desc: "Overload with polarized Radianite, pulling in pulses that suppress nearby enemies" }
    ]
  },
  {
    id: "fade", name: "FADE", realName: "Hazal Aydın", origin: "Turkey 🇹🇷",
    role: "initiator", emoji: "🌑", color: "#d0a0ff",
    description: "Turkish bounty hunter Fade unleashes the power of raw nightmare to seize enemy secrets. She hunts truth and torments those who stand against her.",
    abilities: [
      { key: "C", icon: "👁️", name: "Prowler", desc: "Release a nightmare entity that hunts enemies, nearsighting them on contact" },
      { key: "Q", icon: "🕷️", name: "Seize", desc: "Throw an orb that creates a zone tethering and decaying those caught inside" },
      { key: "E", icon: "👁️", name: "Haunt", desc: "Throw an orb that creates a watcher revealing all enemies it sees" },
      { key: "X", icon: "🌑", name: "Nightfall", desc: "Unleash a wave of nightmare energy, decaying, deafening, and trailing enemies" }
    ]
  },
  {
    id: "gekko", name: "GEKKO", realName: "Mateo Armendáriz De La Fuente", origin: "USA 🇺🇸",
    role: "initiator", emoji: "🦎", color: "#80ff80",
    description: "Gekko is a lively duelist from Los Angeles who leads a crew of rambunctious creatures to cause chaos and clear the way.",
    abilities: [
      { key: "C", icon: "🌿", name: "Dizzy", desc: "Launch Dizzy who charges plasma blasts blinding any enemies in her path" },
      { key: "Q", icon: "🌀", name: "Wingman", desc: "Send Wingman to seek enemies and concuss, or plant/defuse the spike" },
      { key: "E", icon: "🐜", name: "Thrash", desc: "Control Thrash to detonate and immobilize enemies" },
      { key: "X", icon: "🦎", name: "Mosh Pit", desc: "Hurl Mosh who copies the thrown location and creates a damaging area" }
    ]
  },
  {
    id: "tejo", name: "TEJO", realName: "Alejandro Ramos", origin: "Colombia 🇨🇴",
    role: "initiator", emoji: "🛸", color: "#fbbf24",
    description: "A veteran field operative from Colombia, Tejo deploys AI-guided stealth drones to infiltrate, mark targets, and create strategic advantages from the shadows.",
    abilities: [
      { key: "C", icon: "🔦", name: "Spotter", desc: "Send a hovering micro-drone to scout an area and ping enemy positions" },
      { key: "Q", icon: "💨", name: "Glide Path", desc: "Mark an airspace for a silent glide drone that reveals enemies below" },
      { key: "E", icon: "🎯", name: "Tag & Track", desc: "Fire a dart that marks an enemy; follow-up shots deal bonus damage" },
      { key: "X", icon: "🛸", name: "Overwatch", desc: "Deploy a loitering autonomous drone that auto-targets and suppresses enemies in range" }
    ],
    isNew: true
  },

  /* ═══════════════ CONTROLLERS ═══════════════ */
  {
    id: "brimstone", name: "BRIMSTONE", realName: "Liam Byrne", origin: "USA 🇺🇸",
    role: "controller", emoji: "💻", color: "#ffa040",
    description: "Joining from the USA, Brimstone's arsenal of orbital gadgets ensures his squad always has the advantage. His command-and-control style is anchored by close-air support.",
    abilities: [
      { key: "C", icon: "💨", name: "Incendiary", desc: "Launch an incendiary grenade that sets fire to the terrain" },
      { key: "Q", icon: "☁️", name: "Sky Smoke", desc: "Tap into a satellite uplink to call down smokescreens from orbit" },
      { key: "E", icon: "📡", name: "Stim Beacon", desc: "Target a location to toss a stim beacon, granting RapidFire to allies" },
      { key: "X", icon: "🌩️", name: "Orbital Strike", desc: "Use targeting laser to call in a devastating orbital strike" }
    ]
  },
  {
    id: "viper", name: "VIPER", realName: "Sabine Callas", origin: "USA 🇺🇸",
    role: "controller", emoji: "☣️", color: "#80ff80",
    description: "The American chemist uses toxic chemical agents to control the battlefield, reducing enemy vision and damaging those who dare enter her deadly zones.",
    abilities: [
      { key: "C", icon: "💊", name: "Poison Cloud", desc: "Throw a device creating a toxic cloud that blocks vision and deals decay damage" },
      { key: "Q", icon: "🧪", name: "Toxic Screen", desc: "Launch a long line of emitters that create a tall wall of toxic gas" },
      { key: "E", icon: "🐍", name: "Snake Bite", desc: "Fire a projectile that shatters into a chemical zone, damaging and creating Vulnerable" },
      { key: "X", icon: "☣️", name: "Viper's Pit", desc: "Emit a massive toxic cloud that decays enemies caught within" }
    ]
  },
  {
    id: "omen", name: "OMEN", realName: "Unknown", origin: "Unknown ❓",
    role: "controller", emoji: "🌑", color: "#8080ff",
    description: "A phantom of a man, Omen hunts in the shadows. He renders enemies paranoid with teleports, blinds, and his ability to reposition from anywhere on the map.",
    abilities: [
      { key: "C", icon: "🌑", name: "Shrouded Step", desc: "Short-range teleport to a targeted location" },
      { key: "Q", icon: "👁️", name: "Paranoia", desc: "Send a shadow that nearsights any enemy it passes through" },
      { key: "E", icon: "☁️", name: "Dark Cover", desc: "Throw a shadow orb to a distant location creating a smokeball" },
      { key: "X", icon: "🌀", name: "From the Shadows", desc: "Teleport to any location on the map" }
    ]
  },
  {
    id: "astra", name: "ASTRA", realName: "Efia Danso", origin: "Ghana 🇬🇭",
    role: "controller", emoji: "⭐", color: "#ffd0ff",
    description: "Ghanaian agent Astra harnesses the energies of the cosmos to reshape battlefields to her will. She controls her astral form to place powerful cosmological abilities.",
    abilities: [
      { key: "C", icon: "💫", name: "Nova Pulse", desc: "Activate a star to create a damaging pulse that concusses enemies" },
      { key: "Q", icon: "🌀", name: "Nebula", desc: "Activate a star to create a cosmological smoke screen" },
      { key: "E", icon: "⭐", name: "Gravity Well", desc: "Activate a star to create a gravity well that pulls enemies in and makes them Vulnerable" },
      { key: "X", icon: "🌌", name: "Astral Form", desc: "Enter a cosmic realm to place stars and activate abilities at any location" }
    ]
  },
  {
    id: "harbor", name: "HARBOR", realName: "Varun Batra", origin: "India 🇮🇳",
    role: "controller", emoji: "🌊", color: "#60d0ff",
    description: "Hailing from India's coast, Harbor storms the field wielding ancient technology with a new-age flair. He controls the water to create waves and walls.",
    abilities: [
      { key: "C", icon: "🌊", name: "Cove", desc: "Throw a sphere of shielding water that blocks bullets from outside" },
      { key: "Q", icon: "💧", name: "Cascade", desc: "Send forth a wave of water that blocks vision as it travels" },
      { key: "E", icon: "🌊", name: "High Tide", desc: "Unleash a wall of water blocking vision and slowing those who pass through" },
      { key: "X", icon: "🌀", name: "Reckoning", desc: "Crash waves down on the target area, each concussing those in the zone" }
    ]
  },
  {
    id: "clove", name: "CLOVE", realName: "Unknown", origin: "Scotland 🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    role: "controller", emoji: "🌸", color: "#f0a0f0",
    description: "The Scottish Controller brings a deathless swagger to VALORANT. Clove makes the most of every moment — even when dead, they continue to impact the round.",
    abilities: [
      { key: "C", icon: "💊", name: "Meddle", desc: "Throw a projectile that temporarily decays enemies on impact" },
      { key: "Q", icon: "☁️", name: "Pick Me Up", desc: "After a kill, heal above maximum briefly; or boost movement speed" },
      { key: "E", icon: "🌸", name: "Ruse", desc: "Place smoke clouds in the map; can be activated even when dead" },
      { key: "X", icon: "♻️", name: "Not Dead Yet", desc: "After dying, get a limited resurrection window if you earn a kill or assist" }
    ]
  },

  /* ═══════════════ SENTINELS ═══════════════ */
  {
    id: "sage", name: "SAGE", realName: "Ling Ying Wei", origin: "China 🇨🇳",
    role: "sentinel", emoji: "💚", color: "#80ffc0",
    description: "The stronghold of China, Sage creates safety for herself and her team wherever she goes. Able to revive fallen allies and restore her own health, she turns the tide.",
    abilities: [
      { key: "C", icon: "🧊", name: "Barrier Orb", desc: "Conjure a solid wall of ice blocking passage and entry" },
      { key: "Q", icon: "❄️", name: "Slow Orb", desc: "Throw an orb that creates a field slowing those caught in it" },
      { key: "E", icon: "💚", name: "Healing Orb", desc: "Heal an ally or yourself back to full health over a short duration" },
      { key: "X", icon: "✨", name: "Resurrection", desc: "Revive a dead ally back to life with full health" }
    ]
  },
  {
    id: "cypher", name: "CYPHER", realName: "Amir El Amari", origin: "Morocco 🇲🇦",
    role: "sentinel", emoji: "🕵️", color: "#ffff80",
    description: "A one-man surveillance network, Cypher keeps tabs on enemy movement with trip wires, cameras, and cages — a paranoid perfectionist who trusts no one.",
    abilities: [
      { key: "C", icon: "🪤", name: "Trapwire", desc: "Place concealed tripwire that tethers and reveals enemies who cross" },
      { key: "Q", icon: "💡", name: "Cyber Cage", desc: "Toss a cage to create a sound-reacting cloud barrier on activation" },
      { key: "E", icon: "📷", name: "Spycam", desc: "Place a remote camera to scout positions" },
      { key: "X", icon: "💀", name: "Neural Theft", desc: "Extract the information from a dead enemy, revealing allies' locations" }
    ]
  },
  {
    id: "killjoy", name: "KILLJOY", realName: "Klara Böhringer", origin: "Germany 🇩🇪",
    role: "sentinel", emoji: "🤖", color: "#ffd040",
    description: "The German genius of VALORANT deploys a collection of her inventions to outlast and outmaneuver the enemy in any kind of fight.",
    abilities: [
      { key: "C", icon: "🤖", name: "Alarmbot", desc: "Deploy a hidden bot that hunts enemies and applies Vulnerable on contact" },
      { key: "Q", icon: "💣", name: "Nanoswarm", desc: "Throw a grenade that goes covert on landing; activate it to release a swarm" },
      { key: "E", icon: "🔫", name: "Turret", desc: "Deploy a turret that fires at enemies in its 180-degree cone" },
      { key: "X", icon: "⚙️", name: "Lockdown", desc: "Deploy a device that detains all enemies caught in a large radius" }
    ]
  },
  {
    id: "chamber", name: "CHAMBER", realName: "Vincent Fabron", origin: "France 🇫🇷",
    role: "sentinel", emoji: "🎩", color: "#ffd080",
    description: "Well dressed and well armed, French arms dealer Chamber expresses his love of style through big guns and precise marksmanship.",
    abilities: [
      { key: "C", icon: "🔫", name: "Headhunter", desc: "Activate to equip a heavy hand cannon that fires a powerful slug" },
      { key: "Q", icon: "🕰️", name: "Rendezvous", desc: "Place two teleport anchors; activate to teleport between them" },
      { key: "E", icon: "⚠️", name: "Trademark", desc: "Place a tripwire that slows and damages an enemy who crosses it" },
      { key: "X", icon: "🎯", name: "Tour De Force", desc: "Equip a powerful custom sniper rifle; kills with it spawn a lingering slow field" }
    ]
  },
  {
    id: "deadlock", name: "DEADLOCK", realName: "Isak Petrov", origin: "Norway 🇳🇴",
    role: "sentinel", emoji: "🕸️", color: "#a0d0ff",
    description: "Norwegian VALORANT agent Deadlock deploys an array of nano-wire technology to make sure no one escapes from her clutches.",
    abilities: [
      { key: "C", icon: "🧵", name: "GravNet", desc: "Throw a grenade that creates a net forcing enemies to crouch" },
      { key: "Q", icon: "🌀", name: "Sonic Sensor", desc: "Deploy a sensor that concusses enemies who make sound nearby" },
      { key: "E", icon: "🕸️", name: "Barrier Mesh", desc: "Erect a barrier of nano-wire, blocking movement in both directions" },
      { key: "X", icon: "⛓️", name: "Annihilation", desc: "Fire a pulse that ensnares the first enemy hit and cocoons them if not freed" }
    ]
  },
  {
    id: "vyse", name: "VYSE", realName: "Ryo Kimura", origin: "Japan 🇯🇵",
    role: "sentinel", emoji: "🌿", color: "#a0ffb0",
    description: "Vyse harnesses living plant-metal hybrid technology, turning the battlefield into a garden of traps and vines that immobilize enemies.",
    abilities: [
      { key: "C", icon: "🌱", name: "Razorvine", desc: "Throw a vine patch that entangles and slows enemies who step on it" },
      { key: "Q", icon: "⚡", name: "Arc Rose", desc: "Place a metal rose that triggers when an enemy is in range, blinding them" },
      { key: "E", icon: "🌿", name: "Shear", desc: "Create a wall of sharpened vines that block movement temporarily" },
      { key: "X", icon: "🌺", name: "Steel Garden", desc: "Pull metal from nearby objects to create vines that drain and immobilize all enemies in range" }
    ]
  },
  {
    id: "veto", name: "VETO", realName: "Ndéye Astou Diop", origin: "Senegal 🇸🇳",
    role: "sentinel", emoji: "⚫", color: "#34d399",
    description: "A Senegalese physicist who weaponized her mastery of gravity to lock down objectives. Veto's gravity traps collapse space around targets, making escape impossible.",
    abilities: [
      { key: "C", icon: "🔵", name: "Singularity", desc: "Place a gravitational mine that pulls and immobilizes enemies who trigger it" },
      { key: "Q", icon: "⚫", name: "Gravity Lens", desc: "Deploy a wall that bends and slows all projectiles that pass through it" },
      { key: "E", icon: "🌀", name: "Tether", desc: "Throw an anchor tethering enemies within range to the impact point" },
      { key: "X", icon: "💫", name: "Event Horizon", desc: "Create a massive gravity field that pulls all nearby enemies toward the center, holding them in place" }
    ],
    isNew: true
  }
];

/* ── RENDERING ─────────────────────────────────────────────── */

/** Returns the appropriate CSS class for a role */
const getRoleTag = (role) => {
  const map = {
    duelist: 'tag-duelist', initiator: 'tag-initiator',
    controller: 'tag-controller', sentinel: 'tag-sentinel'
  };
  return map[role] || '';
};

/** Returns the role display label */
const getRoleLabel = (role) => {
  const map = {
    duelist: 'DUELIST', initiator: 'INITIATOR',
    controller: 'CONTROLLER', sentinel: 'SENTINEL'
  };
  return map[role] || role.toUpperCase();
};

/** Returns the role icon */
const getRoleIcon = (role) => {
  const map = { duelist: '⚔️', initiator: '🔦', controller: '☁️', sentinel: '🛡️' };
  return map[role] || '🎮';
};

/** Builds a single agent card element */
const buildAgentCard = (agent) => {
  const card = document.createElement('div');
  card.className = 'agent-card reveal';
  card.setAttribute('data-role', agent.role);
  card.setAttribute('data-id', agent.id);
  card.setAttribute('data-name', agent.name.toLowerCase());
  card.addEventListener('click', () => openAgentModal(agent));

  const roleColors = {
    duelist: '#ff6b6b', initiator: '#f59e0b',
    controller: '#8b5cf6', sentinel: '#34d399'
  };
  const rColor = roleColors[agent.role] || '#ff4655';
  const initial = agent.name[0];

  card.innerHTML = `
    <div class="agent-card-portrait">
      <!-- 📁 Drop image as: assets/agents/${agent.id}.jpg -->
      <img class="agent-card-photo" src="assets/agents/${agent.id}.jpg" alt="${agent.name}"
           onerror="this.style.display='none';this.nextElementSibling.style.display='block';" />
      <div class="agent-portrait-placeholder" style="display:none;
           background:linear-gradient(to bottom, ${agent.color}28 0%, ${agent.color}06 60%, #0a0a0a 100%);
           --agent-glow:${rColor}33">
        <span class="agent-initial-bg">${initial}</span>
        <span class="agent-role-label">${agent.role}</span>
        <div class="agent-portrait-fade"></div>
        <span class="agent-emoji">${agent.emoji}</span>
        <span class="agent-portrait-name">${agent.name}</span>
      </div>
      ${agent.isNew ? '<div class="agent-new-badge">NEW</div>' : ''}
    </div>
    <div class="agent-card-info">
      <div class="agent-card-name">${agent.name}</div>
      <div class="agent-card-role">${getRoleLabel(agent.role)}</div>
      <div class="agent-card-origin">${agent.origin}</div>
    </div>
  `;
  return card;
};

/** Renders all agents into role sections */
const renderAgents = (filter = 'all', search = '') => {
  const grid = document.getElementById('agents-grid');
  const noResults = document.getElementById('no-results');
  grid.innerHTML = '';

  const roles = filter === 'all'
    ? ['duelist', 'initiator', 'controller', 'sentinel']
    : [filter];

  let totalRendered = 0;

  roles.forEach(role => {
    const agents = AGENTS.filter(a => {
      const matchRole = a.role === role;
      const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.origin.toLowerCase().includes(search.toLowerCase());
      return matchRole && matchSearch;
    });

    if (!agents.length) return;

    totalRendered += agents.length;

    const section = document.createElement('div');
    section.className = 'role-section reveal';
    section.innerHTML = `
      <div class="role-header">
        <span class="role-icon">${getRoleIcon(role)}</span>
        <h2>${getRoleLabel(role)}S</h2>
        <span class="tag ${getRoleTag(role)}">${agents.length} AGENTS</span>
      </div>
      <div class="agents-role-grid" id="role-grid-${role}"></div>
    `;
    grid.appendChild(section);

    const roleGrid = section.querySelector(`#role-grid-${role}`);
    agents.forEach((agent, i) => {
      const card = buildAgentCard(agent);
      card.style.setProperty('--delay', `${i * 0.05}s`);
      roleGrid.appendChild(card);
    });
  });

  noResults.style.display = totalRendered === 0 ? 'block' : 'none';

  // Re-run scroll reveal for newly rendered elements
  setTimeout(() => ScrollReveal.init(), 100);
};

/* ── MODAL ─────────────────────────────────────────────────── */

/** Opens the agent detail modal */
const openAgentModal = (agent) => {
  const modal = document.getElementById('agent-modal');
  const body  = document.getElementById('agent-modal-body');
  AudioSystem.playClick();

  const abilitiesHtml = agent.abilities.map(ab => `
    <div class="ability-card">
      <div class="ability-key">${ab.key}</div>
      <div class="ability-icon">${ab.icon}</div>
      <div class="ability-name">${ab.name}</div>
      <div class="ability-desc">${ab.desc}</div>
    </div>
  `).join('');

  body.innerHTML = `
    <div class="modal-header" style="background:linear-gradient(135deg,${agent.color}12,var(--bg-panel))">
      <div class="modal-portrait">
        <div class="modal-portrait-placeholder" style="background:linear-gradient(to bottom,${agent.color}20,${agent.color}05)">${agent.emoji}</div>
      </div>
      <div class="modal-hero-info">
        ${agent.isNew ? '<span class="tag tag-new" style="margin-bottom:8px">NEW IN PATCH 12.0</span>' : ''}
        <h2 class="modal-agent-name" style="color:${agent.color}">${agent.name}</h2>
        ${agent.realName ? `<div class="modal-agent-real-name">REAL NAME: ${agent.realName}</div>` : ''}
        <div class="modal-agent-origin">${agent.origin}</div>
        <span class="tag ${getRoleTag(agent.role)}" style="margin-top:8px">${getRoleLabel(agent.role)}</span>
      </div>
    </div>
    <div class="modal-desc">${agent.description || agent.lore || ''}</div>
    <div class="modal-abilities">
      <div class="abilities-title">ABILITIES</div>
      <div class="abilities-grid">${abilitiesHtml}</div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

/** Closes the agent modal */
const closeAgentModal = () => {
  document.getElementById('agent-modal').classList.remove('open');
  document.body.style.overflow = '';
};

// Close on ESC key
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAgentModal();
});

/* ── FILTERS & SEARCH ──────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  renderAgents();

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const search = document.getElementById('agent-search').value;
      renderAgents(btn.dataset.role, search);
    });
  });

  // Search input
  let searchTimeout;
  document.getElementById('agent-search').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const activeRole = document.querySelector('.filter-btn.active')?.dataset.role || 'all';
      renderAgents(activeRole, e.target.value);
    }, 250);
  });

  // Check URL params for pre-filter
  const params = new URLSearchParams(window.location.search);
  const roleParam = params.get('role');
  if (roleParam) {
    const btn = document.querySelector(`.filter-btn[data-role="${roleParam}"]`);
    if (btn) btn.click();
  }
});
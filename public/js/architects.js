/* ============================================================
   VALORANT PROTOCOL 2026 — architects.js
   Terminal typewriter effect and Chart.js radar charts
   Authors: Ysa Rosario & Nathan Ogerio
   ============================================================ */

/* ── TERMINAL TYPEWRITER ────────────────────────────────────
   Mimics a terminal printing out architect bios line by line
   ─────────────────────────────────────────────────────────── */

const TERMINAL_LINES = [
  { type: 'comment', text: '# VALORANT PROTOCOL 2026 — ARCHITECT FILES' },
  { type: 'label',   text: 'Loading', val: 'architect_database.json ...' },
  { type: 'gap' },
  { type: 'comment', text: '# AGENT FILE: YSA ROSARIO' },
  { type: 'label',   text: 'codename',  val: '"AGENT YSA"' },
  { type: 'label',   text: 'role',      val: '"Frontend Engineer & UI Architect"' },
  { type: 'label',   text: 'origin',    val: '"Dagupan City, NCR, Philippines 🇵🇭"' },
  { type: 'label',   text: 'instagram', val: '"@jiw2ng"' },
  { type: 'label',   text: 'skills',    val: '["HTML5", "CSS3", "JavaScript", "UI/UX", "Valorant"]' },
  { type: 'gap' },
  { type: 'comment', text: '# AGENT FILE: NATHAN OGERIO' },
  { type: 'label',   text: 'codename',  val: '"AGENT NATHAN"' },
  { type: 'label',   text: 'role',      val: '"Backend Logic & Systems Engineer"' },
  { type: 'label',   text: 'origin',    val: '"Quezon City, NCR, Philippines 🇵🇭"' },
  { type: 'label',   text: 'instagram', val: '"@oregaknows"' },
  { type: 'label',   text: 'skills',    val: '["JavaScript", "CSS3", "HTML5", "Systems", "Valorant"]' },
  { type: 'gap' },
  { type: 'comment', text: '# STATUS: PROTOCOL 2026 ONLINE ✓' },
];

const TerminalTypewriter = (() => {
  const init = () => {
    const output = document.getElementById('terminal-output');
    const cursor = document.getElementById('terminal-cursor');
    if (!output) return;

    let lineIdx = 0;

    const printLine = () => {
      if (lineIdx >= TERMINAL_LINES.length) {
        cursor.textContent = '';
        return;
      }
      const line = TERMINAL_LINES[lineIdx++];

      const el = document.createElement('span');
      el.className = 't-line';

      if (line.type === 'gap') {
        el.innerHTML = '&nbsp;';
        output.appendChild(el);
        setTimeout(printLine, 80);
        return;
      }

      if (line.type === 'comment') {
        el.innerHTML = `<span class="t-comment">${line.text}</span>`;
        output.appendChild(el);
        setTimeout(printLine, 120);
        return;
      }

      // Type label:value character by character
      const fullText = `  <span class="t-label">${line.label || line.text}</span>: <span class="t-val">${line.val || ''}</span>`;
      const textContent = `  ${line.label || line.text}: ${line.val || ''}`;
      let charIdx = 0;

      output.appendChild(el);
      el.innerHTML = ''; // start empty

      const typeChar = () => {
        if (charIdx <= textContent.length) {
          // Show HTML formatted version at end
          if (charIdx === textContent.length) {
            el.innerHTML = fullText;
            setTimeout(printLine, 80);
          } else {
            el.textContent = textContent.slice(0, charIdx);
            charIdx++;
            setTimeout(typeChar, 18);
          }
        }
      };
      typeChar();
    };

    // Start after 800ms delay
    setTimeout(printLine, 800);
  };

  return { init };
})();

/* ── BIO TYPEWRITER ─────────────────────────────────────────
   Prints the bio text character by character into the div
   ─────────────────────────────────────────────────────────── */

const BIOS = {
  ysa: `Hi, I'm Ysa Rosario. We chose VALORANT because it's a game we both love and has a vibrant community. As the frontend engineer, I focused on crafting an immersive user experience with sleek animations and responsive design. My background in UI/UX design helped me create interfaces that are not only functional but also visually engaging. I hope visitors enjoy exploring the website as much as we enjoyed building it!`,
  nathan: `Hi Im Nathan Ogerio and I am partners with one of the best programmers in the school. I have a lot of hobbies and  coding is not one of them. We ( or I) chose valorant because valorant is really popular game here in the Philippines. You can see it all over social media like Instagram, youtube, tiktok, etc. Since both ysa and I play valorant we thought we might as well make a website all about it. Fast forward to today we have a functioning website that is all about VALORANT and we are really proud of it. I hope you enjoy the website as much as we enjoyed making it.`
};

const BioTypewriter = (() => {
  const typeInto = (elId, text, speed = 18) => {
    const el = document.getElementById(elId);
    if (!el) return;
    el.innerHTML = '';

    const cursor = document.createElement('span');
    cursor.className = 'bio-cursor';
    cursor.textContent = '|';
    el.appendChild(cursor);

    let i = 0;
    const type = () => {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
        setTimeout(type, speed + Math.random() * 10);
      } else {
        setTimeout(() => cursor.remove(), 1000);
      }
    };
    type();
  };

  const init = () => {
    // Use IntersectionObserver to trigger when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const cardId = entry.target.id;
        if (cardId === 'card-ysa' && !entry.target.dataset.typed) {
          entry.target.dataset.typed = '1';
          setTimeout(() => typeInto('bio-ysa', BIOS.ysa), 400);
        }
        if (cardId === 'card-nathan' && !entry.target.dataset.typed) {
          entry.target.dataset.typed = '1';
          setTimeout(() => typeInto('bio-nathan', BIOS.nathan), 600);
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.3 });

    const ysaCard    = document.getElementById('card-ysa');
    const nathanCard = document.getElementById('card-nathan');
    if (ysaCard)    observer.observe(ysaCard);
    if (nathanCard) observer.observe(nathanCard);
  };

  return { init };
})();

/* ── SKILL RADAR CHARTS ─────────────────────────────────────
   Uses Chart.js to render radar charts for each architect
   ─────────────────────────────────────────────────────────── */

const SkillRadars = (() => {
  const LABELS = ['HTML5', 'CSS3', 'JavaScript', 'UI/UX', 'Debugging', 'Creativity'];

  const getColor = () => {
    const faction = localStorage.getItem('vp_faction') || 'omega';
    return faction === 'alpha' ? '#00c8d4' : '#ff4655';
  };

  const buildChart = (canvasId, data) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const color = getColor();
    const ctx = canvas.getContext('2d');

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: LABELS,
        datasets: [{
          label: 'Skill Level',
          data: data,
          backgroundColor: color.replace('#', 'rgba(') + ',0.15)',
          borderColor: color,
          borderWidth: 2,
          pointBackgroundColor: color,
          pointBorderColor: '#fff',
          pointBorderWidth: 1,
          pointRadius: 4,
          fill: true
        }]
      },
      options: {
        scales: {
          r: {
            min: 0, max: 100,
            ticks: {
              display: false,
              stepSize: 25
            },
            grid: {
              color: 'rgba(255,255,255,0.06)'
            },
            angleLines: {
              color: 'rgba(255,255,255,0.08)'
            },
            pointLabels: {
              color: 'rgba(255,255,255,0.6)',
              font: { family: 'Rajdhani', size: 11, weight: '600' }
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.raw}%`
            },
            backgroundColor: '#1e1e1e',
            borderColor: color,
            borderWidth: 1,
            titleColor: color,
            bodyColor: '#fff'
          }
        },
        animation: {
          duration: 1200,
          easing: 'easeOutQuart'
        }
      }
    });
  };

  const init = () => {
    // YSA: strong in CSS, HTML, UI/UX, Creativity
    buildChart('radar-ysa',    [88, 92, 80, 95, 75, 90]);
    // NATHAN: strong in JS, Debugging, HTML
    buildChart('radar-nathan', [85, 80, 90, 78, 92, 82]);
  };

  return { init };
})();

/* ── DISCORD COMMS BUTTON ── */
const joinComms = () => {
  showToast('Opening Discord server...', '📡');
  setTimeout(() => {
    showToast('Discord invite link: Shared in community chat!', '💬', 4000);
  }, 1000);
};

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  TerminalTypewriter.init();
  BioTypewriter.init();
  // Delay chart init to ensure Chart.js is loaded
  setTimeout(() => SkillRadars.init(), 500);
});
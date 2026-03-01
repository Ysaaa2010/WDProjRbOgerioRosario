/* ============================================================
   VALORANT PROTOCOL 2026 — auth.js
   Sign In and Sign Up client-side logic using localStorage
   Authors: Ysa Rosario & Nathan Ogerio
   ============================================================ */

/* ── HELPER FUNCTIONS ── */

/** Show message box (error or success) */
const showAuthMsg = (msg, type = 'error') => {
  const el = document.getElementById('auth-message');
  if (!el) return;
  el.textContent = msg;
  el.className = `auth-message ${type}`;
  el.style.display = 'block';
};

/** Hide message box */
const hideAuthMsg = () => {
  const el = document.getElementById('auth-message');
  if (el) el.style.display = 'none';
};

/** Toggle password visibility */
const togglePass = (inputId, btn) => {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
  }
};

/** Password strength checker */
const checkPasswordStrength = (pass) => {
  const fill  = document.getElementById('strength-fill');
  const label = document.getElementById('strength-label');
  if (!fill || !label) return;

  let score = 0;
  if (pass.length >= 8)         score++;
  if (pass.length >= 12)        score++;
  if (/[A-Z]/.test(pass))       score++;
  if (/[0-9]/.test(pass))       score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;

  const levels = [
    { pct: 0,   color: '#374151',  text: 'Enter a password' },
    { pct: 20,  color: '#ff4655',  text: 'Very Weak' },
    { pct: 40,  color: '#fb923c',  text: 'Weak' },
    { pct: 60,  color: '#facc15',  text: 'Fair' },
    { pct: 80,  color: '#4ade80',  text: 'Strong' },
    { pct: 100, color: '#22d3ee',  text: 'Very Strong ✓' }
  ];

  const level = levels[score] || levels[0];
  fill.style.width    = level.pct + '%';
  fill.style.background = level.color;
  label.textContent   = level.text;
  label.style.color   = level.color;
};

/** Get users array from localStorage */
const getUsers = () => JSON.parse(localStorage.getItem('vp_users') || '[]');
/** Save users array to localStorage */
const saveUsers = (users) => localStorage.setItem('vp_users', JSON.stringify(users));

/* ── SIGN IN ── */
const handleSignIn = () => {
  hideAuthMsg();
  const userInput = document.getElementById('signin-user')?.value.trim();
  const passInput = document.getElementById('signin-pass')?.value;
  const btn       = document.getElementById('signin-btn');

  // Validation
  if (!userInput) { showAuthMsg('Please enter your username or email.'); return; }
  if (!passInput) { showAuthMsg('Please enter your password.'); return; }

  // Simulate loading
  btn.classList.add('loading');
  btn.textContent = 'SIGNING IN...';

  setTimeout(() => {
    const users = getUsers();
    const user = users.find(u =>
      (u.username.toLowerCase() === userInput.toLowerCase() || u.email.toLowerCase() === userInput.toLowerCase())
      && u.password === passInput
    );

    btn.classList.remove('loading');
    btn.textContent = 'SIGN IN';

    if (!user) {
      showAuthMsg('Invalid username or password. Please try again.');
      document.getElementById('signin-pass').classList.add('error');
      return;
    }

    // Save session
    const session = { username: user.username, email: user.email, faction: user.faction };
    localStorage.setItem('vp_user', JSON.stringify(session));

    // Apply faction
    FactionSystem.setFaction(user.faction);

    showAuthMsg(`Welcome back, ${user.username}! Redirecting...`, 'success');
    showToast(`Signed in as ${user.username}`, '✅');

    setTimeout(() => window.location.href = 'home.html', 1200);
  }, 900);
};

/* ── SIGN UP ── */
let signupFaction = localStorage.getItem('vp_faction') || 'omega';

const selectSignupFaction = (faction, btn) => {
  signupFaction = faction;
  document.querySelectorAll('.faction-mini-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  FactionSystem.setFaction(faction);
  AudioSystem.playClick();
};

const handleSignUp = () => {
  hideAuthMsg();
  const username = document.getElementById('signup-username')?.value.trim();
  const email    = document.getElementById('signup-email')?.value.trim();
  const pass     = document.getElementById('signup-pass')?.value;
  const confirm  = document.getElementById('signup-confirm')?.value;
  const agreed   = document.getElementById('agree-terms')?.checked;
  const btn      = document.getElementById('signup-btn');

  // Validation chain
  if (!username || username.length < 3) {
    showAuthMsg('Username must be at least 3 characters.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showAuthMsg('Please enter a valid email address.');
    return;
  }
  if (!pass || pass.length < 6) {
    showAuthMsg('Password must be at least 6 characters.');
    return;
  }
  if (pass !== confirm) {
    showAuthMsg('Passwords do not match.');
    document.getElementById('signup-confirm').classList.add('error');
    return;
  }
  if (!agreed) {
    showAuthMsg('Please agree to the Terms of Service.');
    return;
  }

  btn.classList.add('loading');
  btn.textContent = 'CREATING ACCOUNT...';

  setTimeout(() => {
    const users = getUsers();

    // Check existing
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
      btn.classList.remove('loading');
      btn.textContent = 'CREATE ACCOUNT';
      showAuthMsg('Username already taken. Please choose another.');
      return;
    }
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      btn.classList.remove('loading');
      btn.textContent = 'CREATE ACCOUNT';
      showAuthMsg('An account with this email already exists.');
      return;
    }

    // Create user
    const newUser = { username, email, password: pass, faction: signupFaction, joined: new Date().toISOString() };
    users.push(newUser);
    saveUsers(users);

    // Auto sign in
    const session = { username, email, faction: signupFaction };
    localStorage.setItem('vp_user', JSON.stringify(session));
    FactionSystem.setFaction(signupFaction);

    btn.classList.remove('loading');
    btn.textContent = 'CREATE ACCOUNT';
    showAuthMsg(`Account created! Welcome, ${username}! Redirecting...`, 'success');
    showToast(`Welcome to Protocol 2026, ${username}!`, '🎉', 4000);

    setTimeout(() => window.location.href = 'home.html', 1400);
  }, 1000);
};

/* ── SOCIAL LOGIN (simulated) ── */
const socialLogin = (provider) => {
  showToast(`${provider} login coming soon!`, '🔗');
  showAuthMsg(`${provider} login integration is not available in this demo version.`, 'error');
};

/* ── FORGOT PASSWORD (simulated) ── */
const forgotPassword = () => {
  const email = document.getElementById('signin-user')?.value;
  if (email) {
    showAuthMsg(`If "${email}" is registered, a reset link will be sent. (Demo — no email sent)`, 'success');
  } else {
    showAuthMsg('Enter your email in the field above, then click Forgot Password.', 'error');
  }
};

/* ── ENTER KEY SUPPORT ── */
document.addEventListener('DOMContentLoaded', () => {
  // Sign in on Enter key
  document.getElementById('signin-pass')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSignIn();
  });
  document.getElementById('signup-confirm')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSignUp();
  });

  // Username live validation
  const usernameInput = document.getElementById('signup-username');
  const usernameHint  = document.getElementById('username-hint');
  if (usernameInput && usernameHint) {
    usernameInput.addEventListener('input', () => {
      const val = usernameInput.value.trim();
      if (val.length === 0) {
        usernameHint.textContent = '';
        usernameInput.classList.remove('error', 'valid');
      } else if (val.length < 3) {
        usernameHint.textContent = 'Too short (min 3 characters)';
        usernameHint.className = 'field-hint error';
        usernameInput.classList.add('error');
        usernameInput.classList.remove('valid');
      } else {
        usernameHint.textContent = 'Looks good!';
        usernameHint.className = 'field-hint valid';
        usernameInput.classList.add('valid');
        usernameInput.classList.remove('error');
      }
    });
  }

  // Set default faction btn styling from saved
  const saved = localStorage.getItem('vp_faction') || 'omega';
  signupFaction = saved;
  const defaultBtn = document.getElementById(`faction-${saved}-btn`);
  if (defaultBtn) {
    document.querySelectorAll('.faction-mini-btn').forEach(b => b.classList.remove('active'));
    defaultBtn.classList.add('active');
  }

  // Redirect if already logged in
  if (Auth.isLoggedIn()) {
    const page = window.location.pathname.split('/').pop();
    if (page === 'signin.html' || page === 'signup.html') {
      showToast('You are already signed in!', '✅');
      setTimeout(() => window.location.href = 'home.html', 1000);
    }
  }
});
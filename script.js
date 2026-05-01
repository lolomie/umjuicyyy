/* ── CHAOTIC BACKGROUND DECORATIONS ── */
(function () {
  const wrap = document.getElementById('deco');
  const items = ['🎀','🌸','⭐','💕','🩷','✨','🌟','🎀','🌷','💖','🍬','🎀','🌸','💗'];
  items.forEach((sym, i) => {
    const el = document.createElement('span');
    el.className = 'deco-item';
    el.textContent = sym;
    el.style.left   = (5 + Math.random() * 88) + 'vw';
    el.style.top    = (5 + Math.random() * 88) + 'vh';
    el.style.fontSize = (1.2 + Math.random() * 1.8) + 'rem';
    el.style.animationDuration  = (4 + Math.random() * 6) + 's';
    el.style.animationDelay     = (Math.random() * 6) + 's';
    el.style.opacity = 0.5 + Math.random() * 0.4;
    wrap.appendChild(el);
  });
})();

/* ── CARD STAR SCATTER ── */
function spawnCardStars(id) {
  const wrap = document.getElementById(id);
  if (!wrap) return;
  const syms = ['✦','✧','⁕','✸','✺'];
  for (let i = 0; i < 10; i++) {
    const s = document.createElement('span');
    s.className = 'star-item';
    s.textContent = syms[i % syms.length];
    s.style.left = Math.random() * 92 + '%';
    s.style.top  = Math.random() * 92 + '%';
    s.style.animationDelay = (Math.random() * 2) + 's';
    s.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    wrap.appendChild(s);
  }
}
spawnCardStars('stars1');
spawnCardStars('stars2');

/* ── STATE ── */
let vid = null;
let gunShown = false;

/* ── NO BUTTON ── */
function handleNo(step) {
  const btn = document.getElementById('no' + step);

  if (step === 1 && !gunShown) {
    document.getElementById('img1').src = 'images/gun.gif';
    document.getElementById('img1').style.borderRadius = '16px';
    document.querySelector('#step1 .question').textContent = 'Excuse me?? 🔫😤';
    document.getElementById('hint1').textContent = '✨ are you absolutely sure about this bestie ✨';
    gunShown = true;
  }

  if (step === 2) {
    document.getElementById('hint2').textContent = '✨ babe. BABE. come back pls 😭 ✨';
  }

  btn.style.position = 'fixed';
  btn.style.zIndex = '500';
  teleport(btn);

  btn.onmouseenter = function () {
    if (step === 1 && !vid) playVid('./Minions Cheering.mp4');
    teleport(btn);
  };
  btn.ontouchstart = function () { teleport(btn); };
}

function teleport(btn) {
  const x = Math.max(10, Math.random() * (window.innerWidth  - btn.offsetWidth  - 20));
  const y = Math.max(10, Math.random() * (window.innerHeight - btn.offsetHeight - 20));
  btn.style.left = x + 'px';
  btn.style.top  = y + 'px';
}

/* ── YES BUTTON ── */
function handleYes(step) {
  stopVid();
  if (step === 1) {
    show('step2');
  } else {
    show('step3');
    cheer();
    confetti();
  }
}

/* ── SHOW STEP ── */
function show(id) {
  document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
  const el = document.getElementById(id);
  el.classList.remove('hidden');
  el.style.animation = 'none';
  requestAnimationFrame(() => { el.style.animation = ''; });
  ['no1', 'no2'].forEach(btnId => {
    const b = document.getElementById(btnId);
    if (b) { b.style.position = ''; b.style.left = ''; b.style.top = ''; }
  });
}

/* ── VIDEO ── */
function playVid(src) {
  stopVid();
  vid = document.createElement('video');
  vid.src = src;
  vid.className = 'float-vid';
  vid.autoplay = true;
  vid.loop = true;
  document.body.appendChild(vid);
}
function stopVid() {
  if (vid) { vid.pause(); vid.remove(); vid = null; }
}

/* ── CHEER ── */
function cheer() {
  const a = document.createElement('audio');
  a.src = './Minions Cheering.mp4';
  a.play().catch(() => {});
}

/* ── CONFETTI ── */
function confetti() {
  const items = ['🎀','🌸','🎉','🎊','💍','💕','🌹','✨','🥂','🎈','🩷','⭐'];
  for (let i = 0; i < 70; i++) {
    setTimeout(() => {
      const el = document.createElement('span');
      el.className = 'confetti-piece';
      el.textContent = items[Math.floor(Math.random() * items.length)];
      el.style.left = Math.random() * 100 + 'vw';
      el.style.fontSize = (1 + Math.random() * 1.3) + 'rem';
      el.style.animationDuration = (2.5 + Math.random() * 3) + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5500);
    }, i * 55);
  }
}

/* ══ CHAOTIC BACKGROUND DECO ══ */
(function () {
  const wrap = document.getElementById('deco');
  const items = [
    { s:'🎀', sz:2.4 }, { s:'🌸', sz:1.8 }, { s:'⭐', sz:1.6 },
    { s:'💕', sz:1.9 }, { s:'🩷', sz:2.0 }, { s:'✨', sz:2.2 },
    { s:'🎀', sz:1.5 }, { s:'🌟', sz:1.7 }, { s:'🌷', sz:1.8 },
    { s:'💖', sz:2.1 }, { s:'🍎', sz:1.6 }, { s:'🎀', sz:2.8 },
    { s:'🌸', sz:2.3 }, { s:'💗', sz:1.9 }, { s:'🎀', sz:1.4 },
    { s:'⭐', sz:2.5 }, { s:'🩷', sz:1.6 }, { s:'✨', sz:1.8 },
  ];
  items.forEach(({ s, sz }) => {
    const el = document.createElement('span');
    el.className = 'deco-item';
    el.textContent = s;
    el.style.left   = (2 + Math.random() * 90) + 'vw';
    el.style.top    = (2 + Math.random() * 90) + 'vh';
    el.style.fontSize = sz + 'rem';
    el.style.animationDuration = (4 + Math.random() * 7) + 's';
    el.style.animationDelay    = (Math.random() * 7) + 's';
    el.style.opacity = (.35 + Math.random() * .45).toFixed(2);
    wrap.appendChild(el);
  });
})();

/* ══ STATE ══ */
let vid = null;
let gunShown = false;

/* ══ NO BUTTON — runs away ══ */
function handleNo(step) {
  const btn = document.getElementById('no' + step);

  if (step === 1 && !gunShown) {
    document.getElementById('img1').src = 'images/gun.gif';
    document.getElementById('img1').style.borderRadius = '16px';
    document.querySelector('#step1 .question').textContent = 'Excuse me?? 🔫😤';
    document.getElementById('hint1').textContent = '✨ are you SURE about this bestie ✨';
    gunShown = true;
  }
  if (step === 2) {
    document.getElementById('hint2').textContent = '✨ babe. BABE. please 😭 ✨';
  }

  btn.style.position = 'fixed';
  btn.style.zIndex   = '500';
  teleport(btn);

  btn.onmouseenter = function () {
    if (step === 1 && !vid) playVid('./Minions Cheering.mp4');
    teleport(btn);
  };
  btn.ontouchstart = function (e) {
    e.preventDefault();
    teleport(btn);
  };
}

function teleport(btn) {
  const pad = 16;
  const maxX = Math.max(pad, window.innerWidth  - btn.offsetWidth  - pad);
  const maxY = Math.max(pad, window.innerHeight - btn.offsetHeight - pad);
  btn.style.left = (pad + Math.random() * (maxX - pad)) + 'px';
  btn.style.top  = (pad + Math.random() * (maxY - pad)) + 'px';
}

/* ══ YES BUTTON ══ */
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

/* ══ SHOW STEP ══ */
function show(id) {
  document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
  const el = document.getElementById(id);
  el.classList.remove('hidden');
  el.style.animation = 'none';
  requestAnimationFrame(() => { el.style.animation = ''; });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  ['no1', 'no2'].forEach(btnId => {
    const b = document.getElementById(btnId);
    if (b) { b.style.position = ''; b.style.left = ''; b.style.top = ''; }
  });
}

/* ══ VIDEO ══ */
function playVid(src) {
  stopVid();
  vid = document.createElement('video');
  vid.src = src;
  vid.className = 'float-vid';
  vid.autoplay = true;
  vid.loop = true;
  vid.playsInline = true;
  document.body.appendChild(vid);
}
function stopVid() {
  if (vid) { vid.pause(); vid.remove(); vid = null; }
}

/* ══ CHEER AUDIO ══ */
function cheer() {
  const a = document.createElement('audio');
  a.src = './Minions Cheering.mp4';
  a.playsInline = true;
  a.play().catch(() => {});
}

/* ══ CONFETTI ══ */
function confetti() {
  const items = ['🎀','🌸','🎉','🎊','💍','💕','🌹','✨','🥂','🎈','🩷','⭐','🍎','💖'];
  for (let i = 0; i < 75; i++) {
    setTimeout(() => {
      const el = document.createElement('span');
      el.className = 'confetti-piece';
      el.textContent = items[Math.floor(Math.random() * items.length)];
      el.style.left = Math.random() * 100 + 'vw';
      el.style.fontSize = (1 + Math.random() * 1.4) + 'rem';
      el.style.animationDuration = (2.5 + Math.random() * 3.5) + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    }, i * 50);
  }
}

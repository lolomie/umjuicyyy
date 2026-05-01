/* ── BACKGROUND MAGIC ── */
(function spawnHearts() {
  const container = document.getElementById('heartsBg');
  const symbols = ['❤️', '🩷', '💕', '💖', '💗', '🌹', '✨'];
  for (let i = 0; i < 28; i++) {
    const el = document.createElement('div');
    el.className = 'heart';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (0.9 + Math.random() * 1.4) + 'rem';
    el.style.animationDuration = (6 + Math.random() * 10) + 's';
    el.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(el);
  }
})();

(function spawnPetals() {
  const container = document.getElementById('petals');
  const symbols = ['🌸', '🌺', '🌷', '🫧', '⭐'];
  for (let i = 0; i < 16; i++) {
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (8 + Math.random() * 12) + 's';
    el.style.animationDelay = (Math.random() * 12) + 's';
    container.appendChild(el);
  }
})();

/* ── STATE ── */
let noClickCount = 0;
let videoPlayed = false;
let floatingVideo = null;

/* ── STEP 1: APOLOGY "NO" ── */
function handleNo() {
  noClickCount++;
  const btn = document.getElementById('no-btn');
  const img = document.getElementById('mainImg');
  const hint = document.getElementById('hint-text');

  // Swap to gun gif on first click
  if (noClickCount === 1) {
    img.src = 'images/gun.gif';
    img.style.borderRadius = '16px';
    document.querySelector('#step1 .question').textContent = 'Excuse me?? 🔫';
    hint.textContent = 'Are you sure you want to do this?';
  }

  // Make button run away
  btn.style.position = 'fixed';
  btn.style.zIndex = '200';

  const maxX = window.innerWidth  - btn.offsetWidth  - 20;
  const maxY = window.innerHeight - btn.offsetHeight - 20;
  btn.style.left = Math.max(10, Math.floor(Math.random() * maxX)) + 'px';
  btn.style.top  = Math.max(10, Math.floor(Math.random() * maxY)) + 'px';

  // Play video on hover (once)
  btn.onmouseenter = function () {
    if (!videoPlayed) {
      playFloatingVideo('./Minions Cheering.mp4', 0);
      videoPlayed = true;
    }
    const mx = window.innerWidth  - btn.offsetWidth  - 20;
    const my = window.innerHeight - btn.offsetHeight - 20;
    btn.style.left = Math.max(10, Math.floor(Math.random() * mx)) + 'px';
    btn.style.top  = Math.max(10, Math.floor(Math.random() * my)) + 'px';
  };

  // Mobile tap: just keep moving
  btn.ontouchstart = function () {
    const mx = window.innerWidth  - btn.offsetWidth  - 20;
    const my = window.innerHeight - btn.offsetHeight - 20;
    btn.style.left = Math.max(10, Math.floor(Math.random() * mx)) + 'px';
    btn.style.top  = Math.max(10, Math.floor(Math.random() * my)) + 'px';
  };
}

/* ── STEP 1: APOLOGY "YES" ── */
function handleYes1() {
  stopVideo();
  goToStep(2);
  document.getElementById('proposalImg').src = 'images/catflower.jpg';
}

/* ── STEP 2: PROPOSAL "NO" ── */
function handleNo2() {
  const btn = document.getElementById('no-btn-2');
  const hint = document.getElementById('hint-text-2');

  btn.style.position = 'fixed';
  btn.style.zIndex = '200';

  const maxX = window.innerWidth  - btn.offsetWidth  - 20;
  const maxY = window.innerHeight - btn.offsetHeight - 20;
  btn.style.left = Math.max(10, Math.floor(Math.random() * maxX)) + 'px';
  btn.style.top  = Math.max(10, Math.floor(Math.random() * maxY)) + 'px';

  hint.textContent = 'Babe. BABE. Come back. 😭';

  btn.onmouseenter = function () {
    const mx = window.innerWidth  - btn.offsetWidth  - 20;
    const my = window.innerHeight - btn.offsetHeight - 20;
    btn.style.left = Math.max(10, Math.floor(Math.random() * mx)) + 'px';
    btn.style.top  = Math.max(10, Math.floor(Math.random() * my)) + 'px';
  };
  btn.ontouchstart = btn.onmouseenter;
}

/* ── STEP 2: PROPOSAL "YES" ── */
function handleYes2() {
  stopVideo();
  goToStep(3);
  playMinionsCheer();
  launchConfetti();
}

/* ── HELPERS ── */
function goToStep(n) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('step' + n);
  target.classList.add('active');
  // reset runaway buttons to normal flow
  ['no-btn', 'no-btn-2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.style.position = ''; el.style.left = ''; el.style.top = ''; }
  });
}

function playFloatingVideo(src, startTime) {
  stopVideo();
  floatingVideo = document.createElement('video');
  floatingVideo.src = startTime ? src + '#t=' + startTime : src;
  floatingVideo.autoplay = true;
  floatingVideo.loop = true;
  floatingVideo.controls = false;
  floatingVideo.className = 'floating-video';
  floatingVideo.muted = false;
  document.body.appendChild(floatingVideo);
}

function stopVideo() {
  if (floatingVideo) {
    floatingVideo.pause();
    floatingVideo.remove();
    floatingVideo = null;
  }
}

function playMinionsCheer() {
  const audio = document.createElement('audio');
  audio.src = './Minions Cheering.mp4';
  audio.preload = 'auto';
  audio.play().catch(() => {});
}

function launchConfetti() {
  const pieces = ['🎉', '🎊', '💍', '💕', '🌹', '⭐', '✨', '🥂', '🎈'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti';
      el.textContent = pieces[Math.floor(Math.random() * pieces.length)];
      el.style.left = Math.random() * 100 + 'vw';
      el.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
      el.style.animationDuration = (2.5 + Math.random() * 3.5) + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    }, i * 80);
  }
}

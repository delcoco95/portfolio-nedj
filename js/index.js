// index.js — Scripts pour la page d'accueil

// ── THEME TOGGLE ──
const html = document.documentElement;
const toggle = document.getElementById('themeToggle');
const icon = document.getElementById('themeIcon');

const sunPath = 'M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 101.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 6.166a.75.75 0 001.06 1.06l1.591-1.59a.75.75 0 00-1.06-1.061L6.166 6.166z';
const moonPath = 'M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z';

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  icon.innerHTML = theme === 'dark'
    ? `<path d="${sunPath}"/>`
    : `<path d="${moonPath}"/>`;
}

const saved = localStorage.getItem('theme') || 'light';
setTheme(saved);

toggle.addEventListener('click', () => {
  setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// ── MOBILE NAV ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));
function closeMobileNav() { mobileNav.classList.remove('open'); }

// ── SCROLL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item, .animate-up').forEach(el => observer.observe(el));

// Stagger timeline items
document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.style.transitionDelay = (i * 0.1) + 's';
});

// ── STAT COUNTERS ──
const statNums = document.querySelectorAll('.stat-num[data-count]');
if (statNums.length) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 900;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  statNums.forEach(el => statObserver.observe(el));
}

// ── MODAL CERTIFICAT ──
function openCertif(pdfPath, title) {
  document.getElementById('certifTitle').textContent = title;
  document.getElementById('certifFrame').src = pdfPath;
  document.getElementById('certifOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCertif() {
  document.getElementById('certifOverlay').classList.remove('open');
  document.getElementById('certifFrame').src = '';
  document.body.style.overflow = '';
}
function closeCertifOutside(e) {
  if (e.target === document.getElementById('certifOverlay')) closeCertif();
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCertif();
});

// ── COMPANY INFO POPOVERS ──
document.querySelectorAll('.info-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const target = document.getElementById(btn.dataset.infoTarget);
    const isOpen = target.classList.contains('open');
    document.querySelectorAll('.company-popover.open').forEach(p => p.classList.remove('open'));
    if (!isOpen) target.classList.add('open');
  });
});
document.querySelectorAll('.company-popover-close').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.closest('.company-popover').classList.remove('open');
  });
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.company-popover') && !e.target.closest('.info-btn')) {
    document.querySelectorAll('.company-popover.open').forEach(p => p.classList.remove('open'));
  }
});


const scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 300);
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── HERO PHOTO PARTICLES ──
// Reconstitue la photo de profil en mini billes qui se dispersent au survol.
(function () {
  const wrap = document.getElementById('heroPhotoParticles');
  const canvas = document.getElementById('heroParticleCanvas');
  if (!wrap || !canvas || !window.requestAnimationFrame) return;

  const ctx = canvas.getContext('2d');
  const PHOTO_SRC = 'img/Nedj_Belloum.jpg';
  const GAP = 4.5;
  const REPEL_RADIUS = 65;
  const REPEL_FORCE = 7;
  const EASE = 0.018;
  const FRICTION = 0.86;

  let width = 0, height = 0, particles = [];
  let mouse = { x: -9999, y: -9999, active: false };
  let raf = null;

  function buildParticles(img) {
    const rect = wrap.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    if (!width || !height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const off = document.createElement('canvas');
    off.width = width;
    off.height = height;
    const octx = off.getContext('2d');
    const scale = Math.max(width / img.width, height / img.height);
    const iw = img.width * scale;
    const ih = img.height * scale;
    // La photo source est un portrait plein pied cadré vers le haut : un
    // centrage vertical classique ne montre que le torse. On ancre le
    // visage (repère mesuré sur la photo, ~14.5% de sa hauteur) vers le
    // tiers supérieur du cadre plutôt que de centrer l'image entière.
    const FOCUS_Y = 0.145;
    const TARGET_Y = 0.34;
    const dx = (width - iw) / 2;
    let dy = TARGET_Y * height - FOCUS_Y * ih;
    dy = Math.min(0, Math.max(dy, height - ih));
    octx.drawImage(img, dx, dy, iw, ih);

    const data = octx.getImageData(0, 0, width, height).data;
    // Le portrait n'a pas de fond transparent : on approxime la silhouette
    // tête/épaules avec un masque elliptique à bord doux plutôt que la photo
    // rectangulaire entière.
    const cx = width * 0.5;
    const cy = height * 0.4;
    const rx = width * 0.42;
    const ry = height * 0.46;
    particles = [];
    for (let y = 0; y < height; y += GAP) {
      for (let x = 0; x < width; x += GAP) {
        const idx = (Math.floor(y) * width + Math.floor(x)) * 4;
        const alpha = data[idx + 3];
        if (alpha <= 60) continue;
        const dx = (x - cx) / rx;
        const dy = (y - cy) / ry;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= 1) continue;
        const mask = dist < 0.65 ? 1 : 1 - (dist - 0.65) / 0.35;
        if (Math.random() > mask) continue;
        particles.push({
          hx: x, hy: y,
          x: x + (Math.random() - 0.5) * 30,
          y: y + (Math.random() - 0.5) * 30,
          vx: 0, vy: 0,
          r: 1.3 + Math.random() * 1.3,
          color: `rgb(${data[idx]},${data[idx + 1]},${data[idx + 2]})`
        });
      }
    }
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      let fx = (p.hx - p.x) * EASE;
      let fy = (p.hy - p.y) * EASE;
      if (mouse.active) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy) || 0.001;
        if (dist < REPEL_RADIUS) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          fx += (dx / dist) * force * REPEL_FORCE;
          fy += (dy / dist) * force * REPEL_FORCE;
        }
      }
      p.vx = (p.vx + fx) * FRICTION;
      p.vy = (p.vy + fy) * FRICTION;
      p.x += p.vx;
      p.y += p.vy;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(tick);
  }

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });
  wrap.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  });

  const img = new Image();
  img.onload = () => {
    buildParticles(img);
    if (!raf) tick();
  };
  img.onerror = () => {
    // Photo absente : on masque simplement le conteneur.
    wrap.style.display = 'none';
  };
  img.src = PHOTO_SRC;

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (img.complete && img.naturalWidth) buildParticles(img); }, 200);
  });
})();



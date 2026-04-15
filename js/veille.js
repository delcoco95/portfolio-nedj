// veille.js — Scripts pour la page Veille technologique

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
const saved = localStorage.getItem('theme') || 'dark';
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
}, { threshold: 0.08 });

document.querySelectorAll('.theme-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.1) + 's';
  observer.observe(card);
});

// ── MARQUEE OUTILS (g&eacute;r&eacute; en CSS pur via animation marqueeScroll) ──
// Pause au survol g&eacute;r&eacute;e via CSS hover rule dans veille.css

// ── SCROLL TO TOP ──
const scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 300);
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}





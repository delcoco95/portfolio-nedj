// contact.js — Scripts pour la page Contact

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

// ── FORMULAIRE DE CONTACT ──
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('form-submit');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('emailInput').value.trim();
  const message = document.getElementById('messageText').value.trim();

  if (!email || !message) {
    // Simple validation
    if (!email) document.getElementById('emailInput').style.borderColor = 'var(--accent3)';
    if (!message) document.getElementById('messageText').style.borderColor = 'var(--accent3)';
    return;
  }

  submitBtn.textContent = 'Envoi en cours...';
  submitBtn.disabled = true;

  const formData = new FormData(form);

  try {
    const response = await fetch("https://formspree.io/f/xeokpgqw", {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      formSuccess.style.display = 'block';
      formSuccess.style.color = 'var(--accent2)';
      formSuccess.textContent = '✓ Message envoyé ! Je vous répondrai dans les plus brefs délais.';
      submitBtn.textContent = 'Envoyer le message →';
      form.reset();
    } else {
      formSuccess.style.display = 'block';
      formSuccess.style.color = 'var(--accent3)';
      formSuccess.textContent = '❌ Une erreur est survenue lors de l\'envoi. Veuillez réessayer.';
      submitBtn.textContent = 'Envoyer le message →';
    }
  } catch (error) {
    formSuccess.style.display = 'block';
    formSuccess.style.color = 'var(--accent3)';
    formSuccess.textContent = '❌ Erreur réseau. Vérifiez votre connexion.';
    submitBtn.textContent = 'Envoyer le message →';
  } finally {
    submitBtn.disabled = false;
  }
});

// Reset border color on focus
document.querySelectorAll('.form-input, .form-textarea').forEach(el => {
  el.addEventListener('focus', () => {
    el.style.borderColor = '';
  });
});


(function(){
  // Bascule mode clair / sombre, avec persistance par visiteur (localStorage)
  // et respect de la préférence système tant que rien n'a été choisi.
  var root = document.documentElement;
  var toggleBtn = document.getElementById('themeToggle');
  var icon = document.getElementById('themeIcon');
  if(!toggleBtn || !icon) return;

  var SUN = 'M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 101.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 6.166a.75.75 0 001.06 1.06l1.591-1.59a.75.75 0 00-1.06-1.061L6.166 6.166z';
  var MOON = 'M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z';
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function explicitTheme(){
    var t = root.getAttribute('data-theme');
    return (t === 'light' || t === 'dark') ? t : null;
  }
  function effectiveTheme(){
    return explicitTheme() || ((mq && mq.matches) ? 'dark' : 'light');
  }
  function paint(theme){
    // L'icône représente le mode vers lequel on bascule au clic.
    icon.innerHTML = '<path d="' + (theme === 'dark' ? SUN : MOON) + '"/>';
    toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre');
  }

  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch(e){}
  paint(effectiveTheme());

  toggleBtn.addEventListener('click', function(){
    var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch(e){}
    paint(next);
  });

  if (mq && mq.addEventListener) {
    mq.addEventListener('change', function(){
      if (!explicitTheme()) paint(effectiveTheme());
    });
  }
})();



(function(){
  // Photo "particules" — reconstitue la grande photo en un nuage de points
  // qui se disperse sous la souris puis se ressoude, comme sur le site de
  // référence fourni (index.js). Adapté ici pour couvrir tout le cadre
  // rectangulaire de la photo (avec un feather doux sur les bords) plutôt
  // qu'un masque ovale, puisque le cadre n'est pas un avatar circulaire.
  var wrap = document.getElementById('aboutPhoto');
  var canvas = document.getElementById('aboutParticleCanvas');
  var imgEl = document.getElementById('aboutPhotoImg');
  if(!wrap || !canvas || !imgEl || !window.requestAnimationFrame) return;
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ctx = canvas.getContext('2d');
  var GAP = 7;
  var FEATHER = 22;
  var REPEL_RADIUS = 70;
  var REPEL_FORCE = 7.5;
  var EASE = 0.02;
  var FRICTION = 0.86;

  var width = 0, height = 0, particles = [];
  var mouse = { x: -9999, y: -9999, active: false };
  var raf = null;

  function buildParticles(img){
    var rect = wrap.getBoundingClientRect();
    // Arrondi impératif : le canvas backing-store est toujours en pixels entiers,
    // donc réutiliser une largeur fractionnaire (ex. 918.4) pour indexer le
    // buffer de pixels décale chaque ligne et produit des bandes de couleur.
    width = Math.round(rect.width);
    height = Math.round(rect.height);
    if(!width || !height) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var off = document.createElement('canvas');
    off.width = width;
    off.height = height;
    var octx = off.getContext('2d');
    var scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    var iw = img.naturalWidth * scale;
    var ih = img.naturalHeight * scale;
    var dx = (width - iw) / 2;
    // suit le cadrage CSS d'origine (object-position:50% 35%)
    var dy = Math.min(0, Math.max(0.35 * height - 0.35 * ih, height - ih));
    octx.drawImage(img, dx, dy, iw, ih);

    var data = octx.getImageData(0, 0, width, height).data;
    particles = [];
    for (var y = 0; y < height; y += GAP) {
      for (var x = 0; x < width; x += GAP) {
        var idx = (Math.floor(y) * width + Math.floor(x)) * 4;
        var alpha = data[idx + 3];
        if (alpha <= 20) continue;
        var edge = Math.min(x, y, width - x, height - y);
        var mask = edge >= FEATHER ? 1 : Math.max(0, edge / FEATHER);
        if (Math.random() > mask) continue;
        particles.push({
          hx: x, hy: y,
          x: x + (Math.random() - 0.5) * 30,
          y: y + (Math.random() - 0.5) * 30,
          vx: 0, vy: 0,
          r: 1.2 + Math.random() * 1.2,
          color: 'rgb(' + data[idx] + ',' + data[idx + 1] + ',' + data[idx + 2] + ')'
        });
      }
    }
  }

  function tick(){
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < particles.length; i++){
      var p = particles[i];
      var fx = (p.hx - p.x) * EASE;
      var fy = (p.hy - p.y) * EASE;
      if (mouse.active) {
        var dx = p.x - mouse.x;
        var dy = p.y - mouse.y;
        var dist = Math.hypot(dx, dy) || 0.001;
        if (dist < REPEL_RADIUS) {
          var force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
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

  wrap.addEventListener('mousemove', function(e){
    var rect = wrap.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });
  wrap.addEventListener('mouseleave', function(){
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  });

  function start(){
    try {
      buildParticles(imgEl);
      wrap.classList.add('particles-ready');
      if (!raf) tick();
    } catch(e) { /* image indisponible ou canvas bloqué : la photo reste normale */ }
  }

  if (imgEl.complete && imgEl.naturalWidth) {
    start();
  } else {
    imgEl.addEventListener('load', start, { once: true });
  }

  var resizeTimer;
  window.addEventListener('resize', function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
      if (imgEl.complete && imgEl.naturalWidth) buildParticles(imgEl);
    }, 200);
  });
})();

(function(){
  // generic dialog open/close wiring, with a manual backdrop-click fallback
  // for browsers that don't yet support `closedby="any"`.
  function wireDialog(dialog){
    if(!dialog) return;
    dialog.querySelectorAll('[data-close]').forEach(function(b){
      b.addEventListener('click', function(){ dialog.close(); });
    });
    if(!('closedBy' in HTMLDialogElement.prototype)){
      dialog.addEventListener('click', function(e){
        if(e.target !== dialog) return;
        var r = dialog.getBoundingClientRect();
        var inside = r.top <= e.clientY && e.clientY <= r.top + r.height && r.left <= e.clientX && e.clientX <= r.left + r.width;
        if(!inside) dialog.close();
      });
    }
  }
  document.querySelectorAll('dialog').forEach(wireDialog);

  document.querySelectorAll('.work-card[data-dialog]').forEach(function(card){
    card.addEventListener('click', function(){
      var target = document.getElementById(card.dataset.dialog);
      if(target) target.showModal();
    });
  });

  document.querySelectorAll('.cert-clickable[data-pdf]').forEach(function(row){
    row.addEventListener('click', function(){
      var target = document.getElementById(row.dataset.pdf);
      if(target) target.showModal();
    });
  });

  var contactDialog = document.getElementById('contactDialog');
  ['headerContactBtn','footerContactBtn'].forEach(function(id){
    var b = document.getElementById(id);
    if(b) b.addEventListener('click', function(){ contactDialog.showModal(); });
  });

  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Envoi...';
      submitBtn.disabled = true;

      var name = document.getElementById('cf-name').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var message = document.getElementById('cf-message').value.trim();

      fetch('https://formspree.io/f/xbgjbqgy', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: 'Contact Portfolio - ' + name
        })
      })
      .then(function(response) {
        if (response.ok) {
          form.reset();
          if (typeof contactDialog !== 'undefined' && contactDialog.close) {
             contactDialog.close();
          }
          alert('Votre message a bien été envoyé ! Je vous répondrai dans les plus brefs délais.');
        } else {
          alert("Oops! Une erreur est survenue lors de l'envoi du message.");
        }
      })
      .catch(function(error) {
        alert("Oops! Une erreur est survenue lors de l'envoi du message.");
      })
      .finally(function() {
        submitBtn.innerHTML = originalBtnHtml;
        submitBtn.disabled = false;
      });
    });
  }
})();

(function(){
  // Active link logic based on current URL path
  var path = window.location.pathname;
  var route = 'accueil'; // default
  if (path.indexOf('projets.html') !== -1) route = 'projets';
  else if (path.indexOf('mentions-legales.html') !== -1) route = 'mentions-legales';
  else if (path.indexOf('confidentialite.html') !== -1) route = 'confidentialite';
  else if (path.indexOf('plan-site.html') !== -1) route = 'plan-site';

  document.querySelectorAll('.topnav a, .idpill .name, .foot-legal a, .legal-card a').forEach(function(a){
    if(a.dataset && a.dataset.route){
      if(a.dataset.route === route){
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    }
  });
})();


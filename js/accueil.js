/* Page d'accueil : motion design (bibliothèque Motion, motion.dev).
   Tout est piloté par des ressorts et ne s'exécute qu'à l'entrée à l'écran :
   aucune boucle permanente, rien ne bloque le premier affichage. */
(function(){
 function init(){
  var M = window.Motion;
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var on = !!M && !reduce;
  if(!on){ root.classList.remove('js-motion'); return; }
  root.classList.add('js-motion');

  var SPRING = { type: 'spring', stiffness: 260, damping: 26 };
  var SOFT = { type: 'spring', stiffness: 140, damping: 22 };
  var OUT = [0.16, 1, 0.3, 1];
  var $$ = function(sel, ctx){ return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- 1. Cartes About / Expérience / Certifications ---------- */
  $$('.content-col .card').forEach(function(card){
    M.inView(card, function(){
      M.animate(card, { opacity: [0, 1], y: [40, 0], scale: [0.97, 1], filter: ['blur(10px)', 'blur(0px)'] }, SOFT);
      var kids = $$('.tag, h2, .bio, .stats p, .exp-row, .cert-row, .cv-btn', card);
      M.animate(kids, { opacity: [0, 1], y: [14, 0] }, { delay: M.stagger(0.05, { startDelay: 0.12 }), duration: 0.55, ease: OUT });
      $$('.count', card).forEach(function(el){
        var to = parseInt(el.dataset.to, 10);
        M.animate(0, to, { duration: 1.3, delay: 0.3, ease: OUT, onUpdate: function(v){ el.textContent = Math.round(v); } });
      });
      $$('.exp-row .bar', card).forEach(function(bar, i){
        M.animate(bar, { scaleY: [0, 1] }, { duration: 0.7, delay: 0.25 + i * 0.06, ease: OUT });
      });
    }, { amount: 0.2 });
  });

  /* ---------- 3. Phrase de contact révélée mot à mot au défilement ---------- */
  var contact = document.querySelector('.contact-card');
  var h2 = contact && contact.querySelector('h2');
  if(h2){
    // découpe en mots en conservant les entités déjà décodées par le navigateur
    var words = h2.textContent.trim().split(/[ \n\t]+/);
    h2.innerHTML = words.map(function(w){ return '<span class="w">' + w.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>'; }).join(' ');
    var spans = $$('.w', h2);
    var key = /infrastructure|compter/i;
    M.inView(contact, function(){
      M.animate(contact, { opacity: [0, 1], y: [40, 0], scale: [0.97, 1] }, SOFT);
    }, { amount: 0.15 });
    M.scroll(function(progress){
      var lit = progress * (spans.length + 2);
      spans.forEach(function(w, i){
        var t = Math.max(0, Math.min(1, lit - i));
        w.style.opacity = (0.14 + 0.86 * t).toFixed(3);
        w.style.filter = t < 1 ? 'blur(' + ((1 - t) * 4).toFixed(2) + 'px)' : '';
        w.classList.toggle('hl', t > 0.6 && key.test(w.textContent));
      });
    }, { target: h2, offset: ['start 90%', 'end 55%'] });
  }

  /* ---------- 4. Boutons magnétiques (souris uniquement) ---------- */
  if(fine){
    $$('.cv-btn, .talk-btn').forEach(function(btn){
      btn.addEventListener('pointermove', function(e){
        var r = btn.getBoundingClientRect();
        M.animate(btn, { x: (e.clientX - r.left - r.width / 2) * 0.18, y: (e.clientY - r.top - r.height / 2) * 0.28 }, SPRING);
      });
      btn.addEventListener('pointerleave', function(){ M.animate(btn, { x: 0, y: 0 }, { type: 'spring', stiffness: 300, damping: 15 }); });
    });
  }

  /* ---------- 5. Fenêtres de certificats : montée en ressort ---------- */
  $$('.cert-clickable').forEach(function(btn){
    btn.addEventListener('click', function(){
      var dlg = document.getElementById(btn.dataset.pdf);
      if(!dlg) return;
      requestAnimationFrame(function(){
        var inner = dlg.querySelector('.dlg-inner');
        if(inner) M.animate(inner, { opacity: [0, 1], y: [40, 0], scale: [0.94, 1], filter: ['blur(8px)', 'blur(0px)'] }, SPRING);
      });
    });
  });
 }
 // Si la page est préchargée en arrière-plan (speculation rules), on attend qu'elle soit réellement affichée
 if(document.prerendering) document.addEventListener('prerenderingchange', init, { once: true });
 else init();
})();

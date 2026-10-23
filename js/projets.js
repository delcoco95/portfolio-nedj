/* Page Projets : motion design (bibliothèque Motion, motion.dev), filtre par domaine et visionneuse */
(function(){
 function init(){
  var M = window.Motion;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var on = !!M && !reduce;
  var SPRING = { type: 'spring', stiffness: 260, damping: 26 };
  var SOFT = { type: 'spring', stiffness: 140, damping: 22 };
  var mobile = window.matchMedia('(max-width: 809px)');
  if(on) document.documentElement.classList.add('js-motion');
  else document.documentElement.classList.remove('js-motion');

  /* ---------- 1. Phrase révélée mot à mot au défilement ---------- */
  var statement = document.querySelector('.statement');
  if(statement){
    var words = Array.prototype.slice.call(statement.querySelectorAll('.statement-text span'));
    var key = /administre|automatise|d.veloppe|s.curise/i;
    if(on){
      M.scroll(function(progress){
        var lit = progress * (words.length + 2);
        words.forEach(function(w, i){
          var t = Math.max(0, Math.min(1, lit - i));
          w.style.opacity = (0.14 + 0.86 * t).toFixed(3);
          w.style.filter = 'blur(' + ((1 - t) * 4).toFixed(2) + 'px)';
          w.classList.toggle('hl', t > 0.6 && key.test(w.textContent));
        });
      }, { target: statement, offset: ['start 85%', 'end 55%'] });
    } else {
      words.forEach(function(w){ if(key.test(w.textContent)) w.classList.add('hl'); });
    }
  }

  /* ---------- 2. Apparition des cartes et animation des couvertures ---------- */
  var cards = Array.prototype.slice.call(document.querySelectorAll('.work-card'));
  function countUp(card){
    var num = card.querySelector('.cv-num');
    var val = card.querySelector('.cv-val');
    if(!num || !val || !num.dataset.to) return;
    var to = parseInt(num.dataset.to, 10);
    M.animate(0, to, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: function(v){ val.textContent = Math.round(v); } });
  }
  function revealCover(card){
    var motif = card.querySelector('.cv-motif');
    if(motif){
      var parts = Array.prototype.slice.call(motif.children);
      M.animate(parts, { opacity: [0, 1], transform: ['translateY(14px)', 'translateY(0px)'] },
        { delay: M.stagger(0.035, { startDelay: 0.15 }), duration: 0.6, ease: [0.16, 1, 0.3, 1] });
    }
    countUp(card);
  }
  if(on){
    cards.forEach(function(card){
      M.inView(card, function(){
        var visible = cards.filter(function(c){ return !c.classList.contains('is-hidden'); });
        var col = visible.indexOf(card) % 2;
        M.animate(card, { opacity: [0, 1], y: [48, 0], scale: [0.96, 1], filter: ['blur(10px)', 'blur(0px)'] },
          Object.assign({}, SOFT, { delay: col * 0.08 }));
        revealCover(card);
      }, { amount: 0.25 });
    });
  }

  /* ---------- 3. Survol : inclinaison 3D et halo qui suit le curseur ---------- */
  if(on && fine){
    cards.forEach(function(card){
      card.addEventListener('pointermove', function(e){
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', (px * 100) + '%');
        card.style.setProperty('--my', (py * 100) + '%');
        M.animate(card, { rotateX: (0.5 - py) * 7, rotateY: (px - 0.5) * 9, scale: 1.015 }, SPRING);
      });
      card.addEventListener('pointerleave', function(){
        M.animate(card, { rotateX: 0, rotateY: 0, scale: 1 }, SOFT);
      });
    });
  }

  /* ---------- 4. Filtre par domaine : pastille glissante et réorganisation fluide ---------- */
  var bar = document.querySelector('.works-filter');
  if(bar){
    var pill = bar.querySelector('.filter-pill');
    var buttons = Array.prototype.slice.call(bar.querySelectorAll('button'));
    function placePill(btn, animate){
      if(!pill || !btn) return;
      var target = { left: btn.offsetLeft + 'px', width: btn.offsetWidth + 'px' };
      if(on && animate) M.animate(pill, target, SPRING);
      else { pill.style.left = target.left; pill.style.width = target.width; }
    }
    if(pill){ bar.classList.add('has-pill'); placePill(buttons[0], false); window.addEventListener('resize', function(){ placePill(bar.querySelector('.is-active'), false); }); }

    buttons.forEach(function(btn){
      btn.addEventListener('click', function(){
        var f = btn.dataset.filter;
        buttons.forEach(function(b){ var a = b === btn; b.classList.toggle('is-active', a); b.setAttribute('aria-pressed', a); });
        placePill(btn, true);
        if(bar.scrollWidth > bar.clientWidth) btn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: on ? 'smooth' : 'auto' });

        // FLIP : mémoriser les positions, appliquer le filtre, animer depuis l'ancienne position
        var before = new Map();
        cards.forEach(function(c){ if(!c.classList.contains('is-hidden')) before.set(c, c.getBoundingClientRect()); });
        cards.forEach(function(c){ c.classList.toggle('is-hidden', !(f === 'all' || (' ' + c.dataset.domain + ' ').indexOf(' ' + f + ' ') > -1)); });
        if(!on) return;
        var k = 0;
        cards.forEach(function(c){
          if(c.classList.contains('is-hidden')) return;
          var now = c.getBoundingClientRect(), old = before.get(c);
          if(old){
            M.animate(c, { x: [old.left - now.left, 0], y: [old.top - now.top, 0], opacity: 1, filter: 'blur(0px)' }, SPRING);
          } else {
            M.animate(c, { opacity: [0, 1], x: 0, y: 0, scale: [0.9, 1], filter: ['blur(8px)', 'blur(0px)'] }, Object.assign({}, SOFT, { delay: 0.05 * k++ }));
            revealCover(c);
          }
        });
      });
    });
  }

  /* ---------- 5. Ouverture des fiches : montée en ressort et sections en cascade ---------- */
  if(on){
    cards.forEach(function(card){
      card.addEventListener('click', function(){
        var dlg = document.getElementById(card.dataset.dialog);
        if(!dlg) return;
        requestAnimationFrame(function(){
          var inner = dlg.querySelector('.dlg-inner');
          if(mobile.matches) M.animate(inner, { y: [Math.round(window.innerHeight * 0.75), 0], opacity: [0.4, 1] }, { type: 'spring', stiffness: 320, damping: 34 });
          else M.animate(inner, { opacity: [0, 1], y: [40, 0], scale: [0.94, 1], filter: ['blur(8px)', 'blur(0px)'] }, SPRING);
          var sections = dlg.querySelectorAll('.dlg-head, .dlg-links, .dlg-section, .dlg-note');
          M.animate(sections, { opacity: [0, 1], y: [16, 0] }, { delay: M.stagger(0.05, { startDelay: 0.12 }), duration: 0.45, ease: [0.16, 1, 0.3, 1] });
          dlg.querySelectorAll('.dlg-kpis b').forEach(function(b){
            if(!b.dataset.orig) b.dataset.orig = b.textContent;
            var m = b.dataset.orig.match(/^(\D*)(\d[\d\s]*)(.*)$/);
            if(!m) return;
            var to = parseInt(m[2].replace(/\s/g, ''), 10);
            if(!(to > 1)) return;
            M.animate(0, to, { duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1],
              onUpdate: function(v){ b.textContent = m[1] + Math.round(v).toLocaleString('fr-FR') + m[3]; },
              onComplete: function(){ b.textContent = b.dataset.orig; } });
          });
        });
      });
    });
  }

  /* ---------- Téléphone : glisser la fiche vers le bas pour la fermer ---------- */
  document.querySelectorAll('.project-dialog').forEach(function(dlg){
    var inner = dlg.querySelector('.dlg-inner');
    if(!inner) return;
    var y0 = null, t0 = 0, dy = 0, dragging = false, head = false;
    inner.addEventListener('touchstart', function(e){
      if(!mobile.matches || e.touches.length > 1) return;
      var fromHead = !!e.target.closest('.dlg-head');
      if(!fromHead && inner.scrollTop > 0) { y0 = null; return; }
      if(e.target.closest('.dlg-gallery')) { y0 = null; return; }
      y0 = e.touches[0].clientY; t0 = Date.now(); dy = 0; dragging = false; head = fromHead;
    }, { passive: true });
    inner.addEventListener('touchmove', function(e){
      if(y0 === null) return;
      dy = e.touches[0].clientY - y0;
      if(dy > 6 && (dragging || head || inner.scrollTop <= 0)){
        dragging = true;
        if(e.cancelable) e.preventDefault();
        inner.style.transform = 'translateY(' + dy + 'px)';
      }
    }, { passive: false });
    inner.addEventListener('touchend', function(){
      if(y0 === null) return;
      var fast = dy / Math.max(1, Date.now() - t0) > 0.6;
      y0 = null;
      if(!dragging) return;
      if(dy > 120 || (fast && dy > 40)){
        var done = function(){ dlg.close(); inner.style.transform = ''; };
        if(M) M.animate(inner, { y: window.innerHeight }, { duration: 0.22, ease: 'easeIn' }).then(function(){ done(); M.animate(inner, { y: 0 }, { duration: 0 }); });
        else done();
      } else if(M) {
        M.animate(inner, { y: [dy, 0] }, { type: 'spring', stiffness: 420, damping: 32 }).then(function(){ inner.style.transform = ''; });
        inner.style.transform = '';
      } else inner.style.transform = '';
    });
  });

  /* ---------- Lien direct vers une fiche (ex. projets.html#dlg-cadence depuis l'accueil) ---------- */
  var target = location.hash && document.querySelector('.work-card[data-dialog="' + location.hash.slice(1) + '"]');
  if(target) setTimeout(function(){ target.scrollIntoView({ block: 'center' }); target.click(); }, on ? 350 : 0);

  /* ---------- 6. Visionneuse des captures ---------- */
  var lb = document.getElementById('lightbox');
  if(!lb) return;
  var img = document.getElementById('lb-img'), cap = document.getElementById('lb-cap');
  var list = [], idx = 0;
  function show(dir){
    var s = list[idx];
    img.src = s.dataset.src; img.alt = s.dataset.caption;
    cap.textContent = s.dataset.caption + '  (' + (idx + 1) + '/' + list.length + ')';
    if(on) M.animate(img, { opacity: [0, 1], x: [dir * 40, 0], scale: [0.97, 1] }, SPRING);
  }
  document.querySelectorAll('.dlg-gallery .shot').forEach(function(shot){
    shot.addEventListener('click', function(){
      list = Array.prototype.slice.call(shot.closest('.dlg-gallery').querySelectorAll('.shot'));
      idx = list.indexOf(shot); lb.showModal(); show(0);
    });
  });
  document.getElementById('lb-prev').addEventListener('click', function(){ idx = (idx - 1 + list.length) % list.length; show(-1); });
  document.getElementById('lb-next').addEventListener('click', function(){ idx = (idx + 1) % list.length; show(1); });
  // Balayage gauche / droite pour changer de capture, vers le bas pour fermer
  var sx = null, sy = 0;
  lb.addEventListener('touchstart', function(e){ if(e.touches.length === 1){ sx = e.touches[0].clientX; sy = e.touches[0].clientY; } }, { passive: true });
  lb.addEventListener('touchend', function(e){
    if(sx === null) return;
    var t = e.changedTouches[0], dx = t.clientX - sx, dyy = t.clientY - sy; sx = null;
    if(Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dyy)) document.getElementById(dx < 0 ? 'lb-next' : 'lb-prev').click();
    else if(dyy > 100) lb.close();
  });
  lb.addEventListener('keydown', function(e){
    if(e.key === 'ArrowLeft') document.getElementById('lb-prev').click();
    if(e.key === 'ArrowRight') document.getElementById('lb-next').click();
  });
 }
 if(document.prerendering) document.addEventListener('prerenderingchange', init, { once: true });
 else init();
})();

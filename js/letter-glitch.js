// letter-glitch.js — Effet "Letter Glitch" subtil, réservé à la carte Sécurité
// Actif uniquement au survol, désactivé si prefers-reduced-motion.
(function () {
  const CHARS = '01#$%&/\\{}[]<>*+ABCDEF'.split('');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initGlitchCard(card) {
    if (reduceMotion) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'letter-glitch-canvas';
    card.insertBefore(canvas, card.firstChild);
    const ctx = canvas.getContext('2d');

    let raf = null;
    let cols = 0, rows = 0, cellSize = 14;
    const grid = [];

    function resize() {
      const rect = card.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      cols = Math.ceil(rect.width / cellSize);
      rows = Math.ceil(rect.height / cellSize);
      grid.length = 0;
      for (let i = 0; i < cols * rows; i++) {
        grid.push({ char: CHARS[Math.floor(Math.random() * CHARS.length)], age: Math.random() * 60 });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${cellSize - 3}px monospace`;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const cell = grid[idx];
          if (!cell) continue;
          cell.age += 1;
          if (cell.age > 40 + Math.random() * 40) {
            cell.char = CHARS[Math.floor(Math.random() * CHARS.length)];
            cell.age = 0;
          }
          const alpha = 0.05 + (1 - Math.min(cell.age / 60, 1)) * 0.08;
          ctx.fillStyle = `rgba(255,55,95,${alpha.toFixed(3)})`;
          ctx.fillText(cell.char, c * cellSize, r * cellSize + cellSize);
        }
      }
      raf = requestAnimationFrame(draw);
    }

    function start() {
      resize();
      if (!raf) raf = requestAnimationFrame(draw);
    }
    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    card.addEventListener('mouseenter', start);
    card.addEventListener('mouseleave', stop);
    card.addEventListener('focus', start);
    card.addEventListener('blur', stop);
    window.addEventListener('resize', () => { if (raf) resize(); });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.category-card[data-cat="securite"]').forEach(initGlitchCard);
  });
})();

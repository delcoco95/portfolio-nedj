// click-spark.js — Effet "Click Spark" subtil au clic (inspiré de React Bits)
(function () {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(canvas));
  if (document.body) document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let sparks = [];
  let dpr = window.devicePixelRatio || 1;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  function getAccentColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#2997ff';
  }

  function spawnSpark(x, y) {
    const color = getAccentColor();
    const count = 6;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
      sparks.push({
        x, y,
        dx: Math.cos(angle) * (1.4 + Math.random() * 1.2),
        dy: Math.sin(angle) * (1.4 + Math.random() * 1.2),
        len: 8 + Math.random() * 4,
        life: 1,
        color
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparks.forEach(s => {
      ctx.strokeStyle = s.color;
      ctx.globalAlpha = Math.max(s.life, 0);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.dx * s.len, s.y - s.dy * s.len);
      ctx.stroke();
      s.x += s.dx * 3;
      s.y += s.dy * 3;
      s.life -= 0.045;
    });
    ctx.globalAlpha = 1;
    sparks = sparks.filter(s => s.life > 0);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  document.addEventListener('click', (e) => {
    // Respecte les préférences d'accessibilité (animations réduites)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    spawnSpark(e.clientX, e.clientY);
  });
})();

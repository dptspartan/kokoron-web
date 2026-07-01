(() => {
  'use strict';

  /* ---------------- Starfield ---------------- */
  const canvas = document.getElementById('sky');
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width, height, stars, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedStars();
  }

  function seedStars() {
    const count = Math.round((width * height) / 9000);
    stars = new Array(count).fill(0).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.3 + 0.3,
      baseAlpha: Math.random() * 0.5 + 0.15,
      speed: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.04,
    }));
  }

  let t = 0;
  function drawStars() {
    ctx.clearRect(0, 0, width, height);
    t += 0.016;
    for (const s of stars) {
      const twinkle = Math.sin(t * s.speed + s.phase) * 0.5 + 0.5;
      const alpha = s.baseAlpha * (0.5 + twinkle * 0.5);
      s.y -= s.drift;
      if (s.y < -5) s.y = height + 5;
      if (s.y > height + 5) s.y = -5;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(243, 236, 223, ${alpha})`;
      ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(drawStars);
  }

  resize();
  window.addEventListener('resize', resize);
  drawStars();
  if (reduceMotion) drawStars(); // draw a single static frame

  /* ---------------- Cursor glow ---------------- */
  const cursorGlow = document.getElementById('cursorGlow');
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (canHover && !reduceMotion) {
    let gx = window.innerWidth / 2;
    let gy = window.innerHeight / 2;
    let cx = gx;
    let cy = gy;

    window.addEventListener('mousemove', (e) => {
      gx = e.clientX;
      gy = e.clientY;
      cursorGlow.classList.add('active');
    });

    window.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));

    function animateGlow() {
      cx += (gx - cx) * 0.08;
      cy += (gy - cy) * 0.08;
      cursorGlow.style.left = cx + 'px';
      cursorGlow.style.top = cy + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Subtle parallax on the emblem
    const emblemWrap = document.querySelector('.emblem-wrap');
    if (emblemWrap) {
      window.addEventListener('mousemove', (e) => {
        const relX = (e.clientX / window.innerWidth - 0.5) * 2;
        const relY = (e.clientY / window.innerHeight - 0.5) * 2;
        emblemWrap.style.transform = `translate(${relX * 8}px, ${relY * 6}px)`;
      });
    }
  }

  /* ---------------- Notify form (front-end only) ---------------- */
  const form = document.getElementById('notifyForm');
  const success = document.getElementById('notifySuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('notifyEmail').value.trim();
      if (!email) return;

      try {
        const list = JSON.parse(localStorage.getItem('kokoro_waitlist') || '[]');
        if (!list.includes(email)) {
          list.push(email);
          localStorage.setItem('kokoro_waitlist', JSON.stringify(list));
        }
      } catch (err) {
        /* localStorage unavailable — fail silently, UI still confirms */
      }

      form.classList.add('hidden');
      success.classList.add('show');
    });
  }
})();

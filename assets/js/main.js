/* ═══════════════════════════════════════════════════════
   Molly Marquis Portfolio — Interactive JS
═══════════════════════════════════════════════════════ */

/* ── Scroll progress bar ──────────────────────────────── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

/* ── Nav: shadow + active section ────────────────────── */
const nav = document.getElementById('nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('[data-nav]');

window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20 ? '0 2px 24px rgba(28,16,8,0.12)' : 'none';
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.nav === current));
}, { passive: true });

/* ── Hero particles ───────────────────────────────────── */
const heroParticles = document.getElementById('hero-particles');
for (let i = 0; i < 35; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = 1 + Math.random() * 2.5;
  p.style.cssText = `left:${Math.random()*100}%;top:${40+Math.random()*60}%;width:${size}px;height:${size}px;animation-delay:${Math.random()*8}s;animation-duration:${5+Math.random()*8}s;`;
  heroParticles.appendChild(p);
}

/* ── Floating themed icons ────────────────────────────── */
function spawnIcons(containerId, icons, count, opacityRange, sizeRange) {
  const el = document.getElementById(containerId);
  if (!el) return;
  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.className = 'deco-icon';
    const size  = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
    const op    = opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]);
    span.textContent = icons[Math.floor(Math.random() * icons.length)];
    span.style.cssText = `left:${2+Math.random()*95}%;top:${2+Math.random()*95}%;font-size:${size}px;opacity:${op};animation-duration:${5+Math.random()*7}s;animation-delay:${Math.random()*6}s;`;
    el.appendChild(span);
  }
}

function addSectionDeco(sectionId, icons, count, opacityRange, sizeRange) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  const deco = document.createElement('div');
  deco.className = 'block-deco';
  deco.id = sectionId + '-auto-deco';
  section.style.position = 'relative';
  section.style.overflow = 'hidden';
  section.insertBefore(deco, section.firstChild);
  spawnIcons(sectionId + '-auto-deco', icons, count, opacityRange, sizeRange);
}

spawnIcons('netxl-deco',
  ['📡','🌐','📊','💻','🔗','📶','⚡','🖥️','📱','🔌','🛰️','📲','🔧','🖱️','⌨️'],
  50, [0.05, 0.16], [10, 36]);

spawnIcons('wildestyle-deco',
  ['🌸','🌺','🌷','🌼','🌿','🍃','✿','❀','🌹','💐','🌻','🌱','🌾','🍀','🌳'],
  55, [0.06, 0.18], [12, 38]);

spawnIcons('mt-deco',
  ['⭐','🌟','✨','🎭','🎵','🎬','🎪','🎶','💫','🌠','🎤','🎼','🪄','🎗️','🏆'],
  65, [0.07, 0.20], [12, 36]);

addSectionDeco('about',
  ['✦','◆','◇','✧','○','◯','✱','※','❋','✶','◉','⬡','▲','◈'],
  40, [0.04, 0.10], [8, 22]);

addSectionDeco('hero',
  ['✦','✧','◆','◇','✱','◯','❋','✶','⬡','◈'],
  30, [0.03, 0.08], [6, 18]);

/* ── Reveal on scroll ─────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.revealed)')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('revealed'), idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Stat count-up ────────────────────────────────────── */
function countUp(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  let count = 0;
  const steps = 50;
  const timer = setInterval(() => {
    count++;
    el.textContent = Math.round((count / steps) * target) + suffix;
    if (count >= steps) { el.textContent = target + suffix; clearInterval(timer); }
  }, 1400 / steps);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('[data-target]');
      if (numEl && !numEl.dataset.counted) { numEl.dataset.counted = '1'; countUp(numEl); }
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat').forEach(s => statObserver.observe(s));

/* ── Lightbox ─────────────────────────────────────────── */
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('[data-lightbox]').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
function closeLightbox() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ═══════════════════════════════════════════════════════
   MOUSE INTERACTIONS
═══════════════════════════════════════════════════════ */

const isPointerFine = window.matchMedia('(pointer: fine)').matches;

if (isPointerFine) {

  /* ── Custom cursor ──────────────────────────────────── */
  const cursor     = document.createElement('div');
  const cursorRing = document.createElement('div');
  cursor.id = 'cursor'; cursorRing.id = 'cursor-ring';
  document.body.appendChild(cursor);
  document.body.appendChild(cursorRing);

  let mouseX = -100, mouseY = -100;
  let ringX  = -100, ringY  = -100;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
    document.body.classList.remove('cursor-out');
  });

  document.addEventListener('mouseleave', () => document.body.classList.add('cursor-out'));
  document.addEventListener('mouseenter', () => document.body.classList.remove('cursor-out'));

  // Ring lags behind cursor
  (function animRing() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animRing);
  })();

  // Cursor state: links & buttons
  document.querySelectorAll('a, button, .btn, label').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-link'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-link'));
  });

  // Cursor state: images (zoom)
  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-zoom'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-zoom'));
  });

  // Cursor state: dark sections
  const darkSections = document.querySelectorAll('#hero, #projects, #contact');
  const darkObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.4)
        document.body.classList.add('cursor-dark');
      else
        document.body.classList.remove('cursor-dark');
    });
  }, { threshold: [0.4] });
  darkSections.forEach(s => darkObserver.observe(s));

  /* ── Click burst particles ──────────────────────────── */
  document.addEventListener('click', e => {
    if (e.target.closest('#lightbox')) return;
    const isDark = e.target.closest('#hero, #projects, #contact, .work-block--netxl');
    const colors = isDark
      ? ['rgba(255,255,255,0.9)', 'rgba(226,192,168,0.9)', 'rgba(181,97,74,0.9)', 'rgba(255,220,80,0.8)']
      : ['rgba(181,97,74,0.9)', 'rgba(226,192,168,0.9)', '#E2C0A8', '#B5614A'];

    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.className = 'click-particle';
      const angle = (i / 12) * 360 + Math.random() * 30;
      const dist  = 35 + Math.random() * 70;
      const size  = 3 + Math.random() * 7;
      const rad   = angle * Math.PI / 180;
      p.style.cssText = `
        left:${e.clientX}px; top:${e.clientY}px;
        width:${size}px; height:${size}px;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        --dx:${Math.cos(rad)*dist}px;
        --dy:${Math.sin(rad)*dist}px;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 700);
    }
  });

  /* ── Button ripple ──────────────────────────────────── */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', e => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* ── 3D card tilt ───────────────────────────────────── */
  function addTilt(selector, intensity) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x*intensity}deg) rotateX(${-y*intensity}deg) translateY(-4px) scale(1.01)`;
        card.style.transition = 'transform 0.05s';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
      });
    });
  }
  addTilt('.work-block', 4);
  addTilt('.award-card', 9);
  addTilt('.stat', 12);
  addTilt('.mt-item', 6);

  /* ── Hero mouse parallax ────────────────────────────── */
  const heroSection = document.getElementById('hero');
  const heroText    = document.querySelector('.hero-text');
  const heroPhoto   = document.querySelector('.hero-photo-frame img');
  let heroMX = 0, heroMY = 0, heroScrollY = 0;

  function updateHeroPhoto() {
    if (heroPhoto) heroPhoto.style.transform = `translate(${-heroMX*8}px, ${-heroMY*5 + heroScrollY*0.12}px)`;
  }

  window.addEventListener('scroll', () => {
    heroScrollY = window.scrollY;
    updateHeroPhoto();
  }, { passive: true });

  if (heroSection && heroText) {
    heroSection.addEventListener('mousemove', e => {
      const r = heroSection.getBoundingClientRect();
      heroMX = (e.clientX - r.left) / r.width - 0.5;
      heroMY = (e.clientY - r.top)  / r.height - 0.5;
      heroText.style.transform  = `translate(${heroMX*14}px, ${heroMY*9}px)`;
      updateHeroPhoto();
    });
    heroSection.addEventListener('mouseleave', () => {
      heroMX = 0; heroMY = 0;
      heroText.style.transform = '';
    });
  }

  /* ── Magnetic nav logo ──────────────────────────────── */
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('mousemove', e => {
      const r = navLogo.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) * 0.35;
      const y = (e.clientY - r.top  - r.height/2) * 0.35;
      navLogo.style.transform = `translate(${x}px, ${y}px)`;
    });
    navLogo.addEventListener('mouseleave', () => { navLogo.style.transform = ''; });
  }

  /* ── Floating icon repulsion on mouse move ──────────── */
  let lastRepelTime = 0;
  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastRepelTime < 60) return;
    lastRepelTime = now;

    document.querySelectorAll('.deco-icon').forEach(icon => {
      const r = icon.getBoundingClientRect();
      const ix = r.left + r.width  / 2;
      const iy = r.top  + r.height / 2;
      const dx = ix - e.clientX;
      const dy = iy - e.clientY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 90) {
        const force  = (90 - dist) / 90;
        const pushX  = (dx / dist) * force * 28;
        const pushY  = (dy / dist) * force * 28;
        icon.style.transform  = `translate(${pushX}px, ${pushY}px)`;
        icon.style.transition = 'transform 0.25s ease';
        setTimeout(() => {
          icon.style.transform  = '';
          icon.style.transition = 'transform 1s ease';
        }, 400);
      }
    });
  }, { passive: true });

} // end isPointerFine

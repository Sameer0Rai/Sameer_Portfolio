/* ============================================================
   SAMEER RAI PORTFOLIO — script.js
   ============================================================ */

"use strict";

/* ============================================================
   1. CUSTOM CURSOR
   ============================================================ */
(function initCursor() {
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (!cursor || !cursorDot) return;

  let mouseX = -100, mouseY = -100;
  let curX   = -100, curY   = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverTargets = 'a, button, .btn, .skill-item, .project-card, .social-icon, .contact-card, .cert-card';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity    = '0';
    cursorDot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity    = '1';
    cursorDot.style.opacity = '1';
  });
})();

/* ============================================================
   2. TSPARTICLES BACKGROUND
   ============================================================ */
(function initParticles() {
  if (typeof tsParticles === 'undefined') return;
  tsParticles.load('tsparticles', {
    fullScreen: false,
    background: { color: 'transparent' },
    particles: {
      number: { value: 55, density: { enable: true, area: 900 } },
      color: { value: ['#60A5FA', '#818CF8', '#1F2937'] },
      opacity: { value: { min: 0.05, max: 0.25 }, animation: { enable: true, speed: 0.6, sync: false } },
      size: { value: { min: 0.8, max: 2.2 } },
      links: {
        enable: true,
        distance: 140,
        color: '#1F2937',
        opacity: 0.18,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: 'none',
        random: true,
        out_mode: 'bounce',
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick:  { enable: false },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.35 } },
      },
    },
    retina_detect: true,
  });
})();

/* ============================================================
   3. NAVBAR: SCROLL + HAMBURGER
   ============================================================ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const navActions = document.querySelector('.nav-actions');

  // Scroll state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }, { passive: true });

  // Hamburger
  hamburger && hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks && navLinks.classList.toggle('open');
    navActions && navActions.classList.toggle('open');
  });

  // Close on nav-link click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger && hamburger.classList.remove('open');
      navLinks  && navLinks.classList.remove('open');
      navActions && navActions.classList.remove('open');
    });
  });

  // Active link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  function setActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(sec => {
      const top    = sec.offsetTop;
      const height = sec.offsetHeight;
      const link   = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.style.color = 'var(--blue)';
        } else {
          link.style.color = '';
        }
      }
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();
})();

/* ============================================================
   4. HERO ANIMATIONS (GSAP)
   ============================================================ */
(function initHeroAnimations() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('#heroBadge',   { opacity: 1, y: 0, duration: 0.6, delay: 0.3 })
    .to('#heroHeading', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
    .to('.hero-role',   { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to('#heroDesc',    { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to('#heroActions', { opacity: 1, y: 0, duration: 0.55 }, '-=0.35')
    .to('#heroSocials', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
    .to('#heroIllustration', { opacity: 1, duration: 0.8 }, '-=0.6');
})();

/* ============================================================
   5. TYPED.JS
   ============================================================ */
(function initTyped() {
  if (typeof Typed === 'undefined') return;
  new Typed('#typed', {
    strings: ['Backend Developer', 'Java Developer', 'AI Enthusiast', 'Full Stack Developer'],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 1800,
    loop: true,
    cursorChar: '|',
  });
})();

/* ============================================================
   6. PARALLAX on HERO ILLUSTRATION
   ============================================================ */
(function initParallax() {
  const illustration = document.getElementById('heroIllustration');
  if (!illustration) return;

  document.addEventListener('mousemove', (e) => {
    const { innerWidth: W, innerHeight: H } = window;
    const dx = (e.clientX / W - 0.5) * 18;
    const dy = (e.clientY / H - 0.5) * 12;
    illustration.style.transform = `translate(${dx}px, ${dy}px)`;
  }, { passive: true });
})();

/* ============================================================
   7. FLOAT PARTICLES (hero illustration)
   ============================================================ */
(function initFloatParticles() {
  const container = document.getElementById('floatParticles');
  if (!container) return;

  for (let i = 0; i < 18; i++) {
    const dot = document.createElement('span');
    const size = Math.random() * 3 + 1.5;
    const x    = Math.random() * 100;
    const y    = Math.random() * 100;
    const dur  = Math.random() * 6 + 5;
    const delay= Math.random() * 5;
    const hue  = Math.random() > 0.5 ? '96,165,250' : '129,140,248';

    dot.style.cssText = `
      position: absolute;
      left: ${x}%; top: ${y}%;
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      background: rgba(${hue}, ${0.3 + Math.random() * 0.4});
      box-shadow: 0 0 ${size * 3}px rgba(${hue}, 0.6);
      animation: floatDot ${dur}s ${delay}s ease-in-out infinite alternate;
    `;
    container.appendChild(dot);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatDot {
      from { transform: translate(0, 0) scale(1); opacity: 0.4; }
      to   { transform: translate(${Math.random() > 0.5 ? '' : '-'}${10 + Math.random()*20}px, ${Math.random() > 0.5 ? '-' : ''}${10 + Math.random()*20}px) scale(1.3); opacity: 0.9; }
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   8. ANIMATED STAT COUNTERS
   ============================================================ */
(function initCounters() {
  const statNums = document.querySelectorAll('.stat-num');
  if (!statNums.length) return;

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals) || 0;
    const duration = 1800;
    let start = null;
    const startVal = 0;

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed  = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = startVal + (target - startVal) * easeOutExpo(progress);
      el.textContent = value.toFixed(decimals);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));
})();

/* ============================================================
   9. VANILLA TILT on PROJECT CARDS
   ============================================================ */
(function initTilt() {
  if (typeof VanillaTilt === 'undefined') return;
  const cards = document.querySelectorAll('.tilt-card');
  VanillaTilt.init(cards, {
    max: 7,
    speed: 400,
    glare: true,
    'max-glare': 0.08,
    scale: 1.02,
    perspective: 1000,
  });
})();

/* ============================================================
   10. RIPPLE EFFECT
   ============================================================ */
(function initRipple() {
  document.querySelectorAll('.ripple').forEach(el => {
    el.addEventListener('click', function(e) {
      const rect   = el.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const size   = Math.max(rect.width, rect.height) * 2;
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${x - size / 2}px; top: ${y - size / 2}px;
      `;
      el.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
})();

/* ============================================================
   11. AOS INIT
   ============================================================ */
(function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    duration: 650,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  });
})();

/* ============================================================
   12. SMOOTH SECTION TRANSITIONS (GSAP ScrollTrigger)
   ============================================================ */
(function initScrollReveal() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Timeline animated line
  const line = document.querySelector('.timeline-line');
  if (line) {
    gsap.from(line, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 75%',
      }
    });
  }
})();

/* ============================================================
   13. SKILL CATEGORY HOVER CURSOR RE-BIND
   ============================================================ */
(function bindNewHoverTargets() {
  // Re-bind cursor hover for dynamically positioned elements
  const cursor = document.getElementById('cursor');
  if (!cursor) return;
  const extra = document.querySelectorAll('.achievement-card, .stat-card, .timeline-card, .cert-card');
  extra.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });
})();

/* ============================================================
   14. CERTIFICATE DRAG SCROLL
   ============================================================ */
(function initCertsDrag() {
  const track = document.getElementById('certsTrack');
  if (!track) return;
  const wrapper = track.parentElement;

  let isDown = false, startX, scrollLeft;

  wrapper.addEventListener('mousedown', e => {
    isDown    = true;
    startX    = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
    wrapper.style.cursor = 'grabbing';
  });
  document.addEventListener('mouseup',   () => { isDown = false; wrapper.style.cursor = ''; });
  wrapper.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x    = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.2;
    wrapper.scrollLeft = scrollLeft - walk;
  });
})();

/* ============================================================
   15. KEYBOARD ACCESSIBILITY (ESC closes mobile menu)
   ============================================================ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const hamburger  = document.getElementById('hamburger');
    const navLinks   = document.getElementById('navLinks');
    const navActions = document.querySelector('.nav-actions');
    if (hamburger && hamburger.classList.contains('open')) {
      hamburger.classList.remove('open');
      navLinks  && navLinks.classList.remove('open');
      navActions && navActions.classList.remove('open');
    }
  }
});

/* ============================================================
   16. LAZY INTERSECT — add visible class to timeline items
   ============================================================ */
(function initTimelineReveal() {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => {
    item.style.opacity   = '0';
    item.style.transform = 'translateX(-24px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    obs.observe(item);
  });
})();

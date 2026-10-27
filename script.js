/* ==========================================================================
   Hariom Kumar — Premium Portfolio: Interactions
   ========================================================================== */

(function () {
  'use strict';

  // ---------- Page Loader ----------
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) setTimeout(() => loader.classList.add('hide'), 500);
  });

  // ---------- Year in footer ----------
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // ---------- Navbar scroll state ----------
  const nav = document.getElementById('mainNav');
  const onScrollNav = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  // ---------- Scroll Progress Bar ----------
  const progress = document.getElementById('scroll-progress');
  const updateProgress = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    progress.style.width = Math.max(0, Math.min(1, scrolled)) * 100 + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ---------- Mobile menu auto-close ----------
  document.querySelectorAll('#navMenu .nav-link, #navMenu .btn').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navMenu');
      if (menu.classList.contains('show')) {
        // Bootstrap collapse
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(menu);
        bsCollapse.hide();
      }
    });
  });

  // ---------- Active nav link on scroll ----------
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.custom-navbar .nav-link');
  const setActive = () => {
    const pos = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.custom-navbar .nav-link[href="#${id}"]`);
      if (!link) return;
      if (pos >= top && pos < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', setActive, { passive: true });

  // ---------- Reveal on Scroll ----------
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // ---------- Skills progress bars ----------
  const bars = document.querySelectorAll('.progress-bar[data-value]');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const v = e.target.getAttribute('data-value');
        e.target.style.width = v + '%';
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => barObserver.observe(b));

  // ---------- Animated counters ----------
  const counters = document.querySelectorAll('.counter');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.target, 10) || 0;
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString();
      };
      requestAnimationFrame(step);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));

  // ---------- Typing Animation ----------
  const typingEl = document.getElementById('typing');
  const phrases = [
    'Cybersecurity Enthusiast',
    'Frontend Developer',
    'Python Learner',
    'Networking Enthusiast',
    'Creative Web Designer'
  ];
  let pIndex = 0, cIndex = 0, deleting = false;
  const type = () => {
    if (!typingEl) return;
    const current = phrases[pIndex];
    if (deleting) {
      cIndex--;
      typingEl.textContent = current.substring(0, cIndex);
      if (cIndex === 0) { deleting = false; pIndex = (pIndex + 1) % phrases.length; setTimeout(type, 280); return; }
      setTimeout(type, 35);
    } else {
      cIndex++;
      typingEl.textContent = current.substring(0, cIndex);
      if (cIndex === current.length) { deleting = true; setTimeout(type, 1400); return; }
      setTimeout(type, 75);
    }
  };
  setTimeout(type, 600);

  // ---------- Back to top ----------
  const back = document.getElementById('backToTop');
  const toggleBack = () => {
    if (window.scrollY > 500) back.classList.add('show');
    else back.classList.remove('show');
  };
  window.addEventListener('scroll', toggleBack, { passive: true });
  back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---------- Ripple effect ----------
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ink = document.createElement('span');
      ink.className = 'ripple-ink';
      const size = Math.max(rect.width, rect.height);
      ink.style.width = ink.style.height = size + 'px';
      ink.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ink.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ink);
      setTimeout(() => ink.remove(), 700);
    });
  });

  // ---------- Contact Form (front-end demo) ----------
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const subject = document.getElementById('cf-subject').value.trim();
      const message = document.getElementById('cf-message').value.trim();

      if (!name || !email || !subject || !message) {
        status.style.color = '#ff6b88';
        status.textContent = 'Please fill in all fields.';
        return;
      }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        status.style.color = '#ff6b88';
        status.textContent = 'Please enter a valid email address.';
        return;
      }

      status.style.color = '';
      status.textContent = 'Thanks ' + name + '! Your message has been captured (demo).';
      form.reset();
    });
  }
})();

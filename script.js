/* ==============================================
   DESAFIO 60 — Landing Page Scripts
   ============================================== */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => ctx.querySelectorAll(sel);

  /* ---- Mobile menu ---- */
  const burger = $('#burger');
  const overlay = $('#mobOverlay');
  const mobLinks = $$('a', overlay);

  function toggleMenu(open) {
    const isOpen = typeof open === 'boolean' ? open : !overlay.classList.contains('open');
    overlay.classList.toggle('open', isOpen);
    burger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  burger.addEventListener('click', () => toggleMenu());
  mobLinks.forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---- Header scroll shadow ---- */
  const header = $('#header');
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        highlightNav();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Active nav link ---- */
  const sections = $$('section[id]');
  const navLinks = $$('.nav__link');

  function highlightNav() {
    const y = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const h = sec.offsetHeight;
      const id = sec.id;
      if (y >= top && y < top + h) {
        navLinks.forEach(l => l.classList.remove('active'));
        const match = $(`.nav__link[href="#${id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }

  /* ---- Smooth scroll ---- */
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = $(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---- Accordion (steps) ---- */
  const steps = $$('.step');
  steps.forEach(step => {
    const btn = $('.step__head', step);
    btn.addEventListener('click', () => {
      const wasActive = step.classList.contains('active');
      steps.forEach(s => s.classList.remove('active'));
      if (!wasActive) step.classList.add('active');
    });
  });

  /* ---- Scroll reveal ---- */
  const reveals = $$('.reveal, .reveal-up');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.d) || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  reveals.forEach(el => io.observe(el));

})();

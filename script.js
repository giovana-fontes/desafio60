/* ═══════════════════════════════════════════
   SCRIPT.JS — Natação Landing Page
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── HEADER SCROLL EFFECT ── */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ── HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  let overlay = document.querySelector('.mobile-overlay');

  // Create mobile overlay if not in HTML
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    const navLinks = document.querySelectorAll('.header__nav .header__link');
    navLinks.forEach(link => {
      const a = document.createElement('a');
      a.href = link.getAttribute('href');
      a.textContent = link.textContent;
      overlay.appendChild(a);
    });
    document.body.appendChild(overlay);
  }

  hamburger.addEventListener('click', () => {
    const isOpen = overlay.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on link click
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });


  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ── SCROLL REVEAL (Intersection Observer) ── */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ── WHATSAPP FAB ── */
  const fab = document.getElementById('fabWa');
  if (fab) {
    const showFab = () => {
      fab.classList.toggle('visible', window.scrollY > 400);
    };
    window.addEventListener('scroll', showFab, { passive: true });
    showFab();
  }


  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__link');

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('header__link--active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('header__link--active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

});

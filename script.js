/* ═══════════════════════════════════════════
   FAJR NOUSHAD ALI — PORTFOLIO SCRIPT
═══════════════════════════════════════════ */

// ─── Navbar scroll shadow ───────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ─── Navbar mobile toggle ───────────────────
const navToggle = document.getElementById('navToggle');

navToggle.addEventListener('click', () => {
  navbar.classList.toggle('menu-open');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navbar.classList.remove('menu-open'));
});

// ─── Active nav link on scroll ──────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activateNavLink = () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--terracotta)';
    }
  });
};

window.addEventListener('scroll', activateNavLink, { passive: true });

// ─── Modal System ───────────────────────────
const overlay   = document.getElementById('modal-overlay');
const modalBox  = document.querySelector('.modal-box');
const modalContent = document.getElementById('modalContent');
const modalClose   = document.getElementById('modalClose');

function openModal(templateId) {
  const tmpl = document.getElementById(templateId);
  if (!tmpl) return;

  // Clone template content into modal
  modalContent.innerHTML = '';
  modalContent.appendChild(tmpl.content.cloneNode(true));

  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Focus close button for accessibility
  setTimeout(() => modalClose.focus(), 50);
}

function closeModal() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  // Clear content after transition
  setTimeout(() => { modalContent.innerHTML = ''; }, 400);
}

// Close on ✕ button
modalClose.addEventListener('click', closeModal);

// Close on overlay click (outside box)
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
});

// Bind expand buttons on internship cards
document.querySelectorAll('.intern-card').forEach(card => {
  card.addEventListener('click', () => {
    const modalId = card.dataset.modal;
    if (modalId) openModal(modalId);
  });
});

// Bind expand buttons on project cards
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('click', () => {
    const modalId = card.dataset.modal;
    if (modalId) openModal(modalId);
  });
});

// ─── Project Filter ─────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projCards  = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Toggle active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projCards.forEach(card => {
      if (filter === 'all') {
        showCard(card);
      } else {
        const cardFilter = card.dataset.filter || '';
        if (cardFilter === filter) {
          showCard(card);
        } else {
          hideCard(card);
        }
      }
    });
  });
});

function showCard(card) {
  card.style.opacity    = '0';
  card.style.transform  = 'translateY(16px)';
  card.style.display    = 'flex';
  card.style.position   = '';
  card.style.pointerEvents = '';
  // Trigger reflow
  card.offsetHeight;
  card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  card.style.opacity    = '1';
  card.style.transform  = '';
}

function hideCard(card) {
  card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  card.style.opacity    = '0';
  card.style.transform  = 'translateY(8px)';
  setTimeout(() => {
    card.style.display = 'none';
  }, 260);
}

// ─── Scroll-reveal animations ───────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Add reveal class and observe
const revealTargets = document.querySelectorAll(
  '.intern-card, .proj-card, .timeline-item, .cert-card, .skill-pill, .research-showcase, .section-header'
);

revealTargets.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.55s ease ${(i % 5) * 0.08}s, transform 0.55s ease ${(i % 5) * 0.08}s`;
  revealObserver.observe(el);
});

// Add CSS class for revealed state
const style = document.createElement('style');
style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ─── Smooth scroll for nav links ────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Parallax on hero decor ─────────────────
const decors = document.querySelectorAll('.hero-decor');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  decors.forEach((el, i) => {
    const speed = [0.15, 0.08, 0.2][i] || 0.1;
    el.style.transform = `translateY(${y * speed}px)`;
  });
}, { passive: true });

// ─── Cursor glow effect (desktop only) ──────
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  Object.assign(glow.style, {
    position:      'fixed',
    pointerEvents: 'none',
    zIndex:        '9999',
    width:         '320px',
    height:        '320px',
    borderRadius:  '50%',
    background:    'radial-gradient(circle, rgba(184,88,29,0.07) 0%, transparent 70%)',
    transform:     'translate(-50%, -50%)',
    transition:    'opacity 0.3s ease',
    top:           '0',
    left:          '0',
    opacity:       '0',
  });
  document.body.appendChild(glow);

  let glowX = 0, glowY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  // Smooth follow
  const animateGlow = () => {
    glowX += (targetX - glowX) * 0.1;
    glowY += (targetY - glowY) * 0.1;
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
    requestAnimationFrame(animateGlow);
  };
  animateGlow();
}

// ─── Typing effect on hero eyebrow ──────────
const eyebrow = document.querySelector('.hero-eyebrow');
if (eyebrow) {
  const originalText = eyebrow.textContent;
  eyebrow.textContent = '';
  eyebrow.style.borderRight = '1.5px solid var(--terracotta)';
  eyebrow.style.animation = 'none';

  let i = 0;
  const typeInterval = setInterval(() => {
    eyebrow.textContent += originalText[i];
    i++;
    if (i >= originalText.length) {
      clearInterval(typeInterval);
      setTimeout(() => { eyebrow.style.borderRight = 'none'; }, 600);
    }
  }, 55);
}

// ─── Preload images when modal opens ────────
// (images are loaded lazily via <img> onerror handlers)
console.log(
  '%c Fajr Noushad Ali — Portfolio ',
  'background:#B8581D;color:#FAF6EE;font-size:14px;padding:6px 12px;border-radius:4px;font-family:Georgia,serif;'
);

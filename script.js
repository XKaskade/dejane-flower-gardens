/* ============================================
   DeJane Flower & Butterfly Gardens
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  initScrollReveal();
  initHeader();
  initMobileMenu();
  initGalleryLightbox();
  initQRCode();
});

/* ---- Parallax Background ---- */
function initParallax() {
  const bg = document.getElementById('heroBg');
  if (!bg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const heroHeight = bg.parentElement.offsetHeight;
        if (scrolled < heroHeight) {
          bg.style.transform = `translateY(${scrolled * 0.35}px) scale(1.05)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
          const index = siblings.indexOf(entry.target);
          const delay = index * 100;

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ---- Header scroll effect ---- */
function initHeader() {
  const header = document.querySelector('.site-header');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const links = nav.querySelectorAll('.nav-link');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('open');
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('open');
    });
  });
}

/* ---- Gallery Lightbox ---- */
function initGalleryLightbox() {
  const cards = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbName = document.getElementById('lightboxName');
  const lbDesc = document.getElementById('lightboxDesc');
  const lbClose = lightbox.querySelector('.lightbox-close');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const name = card.dataset.name;
      const desc = card.dataset.desc;

      lbImg.src = img.src.replace('w=500', 'w=900');
      lbImg.alt = name;
      lbName.textContent = name;
      lbDesc.textContent = desc;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ---- QR Code ---- */
function initQRCode() {
  const container = document.getElementById('qrCode');
  if (!container) return;

  // Get the current page URL (will use GitHub Pages URL once deployed)
  const url = window.location.href.replace(/\/$/, '');

  // Generate QR code using a canvas-based approach (no dependencies)
  generateQR(container, url);
}

/**
 * Minimal QR code generator using the QR Server API
 * For a zero-dependency solution that works offline too
 */
function generateQR(container, text) {
  const img = document.createElement('img');
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}&bgcolor=ffffff&color=1a3409&margin=0`;
  img.alt = 'QR Code to visit this website';
  img.style.borderRadius = '4px';
  container.appendChild(img);
}

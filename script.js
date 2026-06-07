const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 8);
});

menuToggle?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const lightbox = document.querySelector('[data-lightbox]');
const lightboxImg = document.querySelector('[data-lightbox-img]');
const lightboxTitle = document.querySelector('[data-lightbox-title]');
const lightboxClose = document.querySelector('[data-lightbox-close]');

document.querySelectorAll('[data-gallery] .gallery-card').forEach((card) => {
  card.addEventListener('click', () => {
    lightboxImg.src = card.dataset.src;
    lightboxImg.alt = card.dataset.title || 'Project image';
    lightboxTitle.textContent = card.dataset.title || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox() {
  lightbox?.classList.remove('open');
  lightbox?.setAttribute('aria-hidden', 'true');
  if (lightboxImg) lightboxImg.src = '';
}
lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

const form = document.querySelector('[data-estimate-form]');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const lines = [
    'New estimate request from the Stateside Painting website:',
    '',
    `Name: ${data.get('name') || ''}`,
    `Phone: ${data.get('phone') || ''}`,
    `Email: ${data.get('email') || ''}`,
    `Project Type: ${data.get('projectType') || ''}`,
    `Location: ${data.get('location') || ''}`,
    '',
    'Project Details:',
    `${data.get('message') || ''}`
  ];
  const subject = encodeURIComponent('Estimate Request — Stateside Painting');
  const body = encodeURIComponent(lines.join('\n'));
  window.location.href = `mailto:elijahtorrespainting@gmail.com?subject=${subject}&body=${body}`;
});

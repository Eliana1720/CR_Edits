const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');
const modal = document.getElementById('project-modal');
const modalVideo = document.getElementById('modal-video');
const videoEmpty = document.getElementById('video-empty');
const modalTitle = document.getElementById('modal-title');
const projectCards = document.querySelectorAll('.project-card');

// Header con fondo al hacer scroll
const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// Menú mobile
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

// Animaciones al entrar en pantalla
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Modal de proyectos. Si el video no existe, muestra instrucción en vez de romper la página.
function openProject(card) {
  const title = card.dataset.category || 'Proyecto';
  const src = card.dataset.video || '';
  modalTitle.textContent = title;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  modalVideo.style.display = 'none';
  videoEmpty.style.display = 'block';
  modalVideo.removeAttribute('src');

  if (!src) return;

  // Intentamos cargar el MP4. Si todavía no lo agregaste, queda visible el placeholder.
  modalVideo.src = src;
  modalVideo.load();

  const onReady = () => {
    videoEmpty.style.display = 'none';
    modalVideo.style.display = 'block';
    modalVideo.removeEventListener('loadedmetadata', onReady);
  };

  const onError = () => {
    modalVideo.style.display = 'none';
    videoEmpty.style.display = 'block';
    modalVideo.removeEventListener('error', onError);
  };

  modalVideo.addEventListener('loadedmetadata', onReady, { once: true });
  modalVideo.addEventListener('error', onError, { once: true });
}

function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  modalVideo.pause();
  modalVideo.removeAttribute('src');
  modalVideo.load();
}

projectCards.forEach(card => {
  card.querySelector('.project-open').addEventListener('click', () => openProject(card));
});

document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});

// Año automático
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

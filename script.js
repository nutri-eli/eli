const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  nav.classList.toggle('open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  });
});

const loginModal = document.querySelector('#loginModal');
const loginForm = document.querySelector('#loginForm');
const loginError = document.querySelector('#loginError');
const studentPortal = document.querySelector('#studentPortal');
const publicSections = [...document.querySelectorAll('main > section:not(#studentPortal)')];

const closeLogin = () => {
  loginModal.hidden = true;
  document.body.classList.remove('modal-open');
};

document.querySelectorAll('[data-open-login]').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    loginModal.hidden = false;
    document.body.classList.add('modal-open');
    document.querySelector('#studentEmail').focus();
  });
});

document.querySelectorAll('[data-close-login]').forEach((button) => {
  button.addEventListener('click', closeLogin);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !loginModal.hidden) closeLogin();
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.querySelector('#studentEmail').value.trim();
  const password = document.querySelector('#studentPassword').value.trim();

  if (!email || !password) {
    loginError.textContent = 'Completa los dos campos para continuar.';
    return;
  }

  const rawName = email.includes('@') ? email.split('@')[0] : email;
  const readableName = rawName
    .replace(/[._-]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  document.querySelector('#studentName').textContent = readableName;

  publicSections.forEach((section) => {
    section.hidden = true;
  });

  studentPortal.hidden = false;
  closeLogin();
  loginForm.reset();
  loginError.textContent = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelector('[data-logout]').addEventListener('click', () => {
  studentPortal.hidden = true;

  publicSections.forEach((section) => {
    section.hidden = false;
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
});
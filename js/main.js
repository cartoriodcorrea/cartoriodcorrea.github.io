// Menu mobile
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    menuBtn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('aberto');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Ano automático no rodapé
const ano = document.getElementById('ano');
if (ano) ano.textContent = new Date().getFullYear();

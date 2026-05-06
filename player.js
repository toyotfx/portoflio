document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('aberto');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('aberto');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const form = document.getElementById('formulario');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();
      const telefone = '5553999133813';
      const texto = `Olá, meu nome é ${nome}. ${mensagem}`;
      const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

      window.open(url, '_blank', 'noopener');
    });
  }

  document.querySelectorAll('.carousel').forEach((carousel) => {
    const images = Array.from(carousel.querySelectorAll('.carousel-img'));
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');
    let currentIndex = 0;

    if (images.length < 2) return;

    const showImage = (index) => {
      currentIndex = (index + images.length) % images.length;
      images.forEach((image, imageIndex) => {
        image.classList.toggle('active', imageIndex === currentIndex);
      });
    };

    prev?.addEventListener('click', () => showImage(currentIndex - 1));
    next?.addEventListener('click', () => showImage(currentIndex + 1));

    setInterval(() => showImage(currentIndex + 1), 4000);
  });
});

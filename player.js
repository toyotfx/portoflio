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
      const texto = `Ola, meu nome e ${nome}. ${mensagem}`;
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

  const pauseOtherVideos = (activeVideo) => {
    document.querySelectorAll('.portfolio-video').forEach((video) => {
      if (video !== activeVideo) video.pause();
    });
  };

  document.querySelectorAll('.video-shell[data-video-src]').forEach((shell) => {
    const button = shell.querySelector('button');
    const poster = shell.dataset.videoPoster;

    if (poster && !shell.style.getPropertyValue('--video-poster')) {
      shell.style.setProperty('--video-poster', `url("${poster}")`);
      shell.classList.add('has-poster');
    } else if (poster) {
      shell.classList.add('has-poster');
    }

    if (!button) return;

    button.addEventListener('click', () => {
      shell.classList.add('is-loading');
      button.textContent = 'Carregando';
      button.disabled = true;

      const frame = document.createElement('div');
      const video = document.createElement('video');
      const source = document.createElement('source');
      const status = document.createElement('p');

      frame.className = 'video-player-frame';
      video.className = 'portfolio-video';
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.dataset.orientation = shell.dataset.orientation || 'vertical';
      video.poster = poster || '';
      video.controlsList = 'nodownload';

      source.src = shell.dataset.videoSrc;
      source.type = shell.dataset.videoType || 'video/mp4';
      video.append(source, 'Seu navegador nao suporta a reproducao de videos.');

      status.className = 'player-status';
      status.textContent = 'Carregando player...';

      video.addEventListener('play', () => pauseOtherVideos(video));
      video.addEventListener('loadeddata', () => {
        status.remove();
      }, { once: true });
      video.addEventListener('error', () => {
        frame.classList.add('is-error');
        status.textContent = 'Este video nao abriu no navegador. Use o botao abaixo para abrir o arquivo.';
        const fallback = document.createElement('a');
        fallback.href = shell.dataset.videoSrc;
        fallback.target = '_blank';
        fallback.rel = 'noopener';
        fallback.textContent = 'Abrir arquivo';
        fallback.className = 'player-fallback';
        frame.append(fallback);
      }, { once: true });

      frame.append(video, status);
      shell.replaceWith(frame);
      video.load();
      video.play().catch(() => {});
    });
  });
});

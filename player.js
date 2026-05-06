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

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const rest = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${rest}`;
  };

  const players = Array.from(document.querySelectorAll('.portfolio-player'));
  const videos = players.map((player) => player.querySelector('video')).filter(Boolean);

  players.forEach((player) => {
    const video = player.querySelector('video');
    if (!video) return;

    const playButton = document.createElement('button');
    const controls = document.createElement('div');
    const toggle = document.createElement('button');
    const progress = document.createElement('input');
    const time = document.createElement('span');
    const mute = document.createElement('button');
    const fullscreen = document.createElement('button');

    playButton.className = 'player-big-button';
    playButton.type = 'button';
    playButton.setAttribute('aria-label', 'Reproduzir vídeo');

    controls.className = 'player-controls';
    toggle.className = 'player-control player-toggle';
    toggle.type = 'button';
    toggle.textContent = '>';
    toggle.setAttribute('aria-label', 'Reproduzir vídeo');

    progress.className = 'player-progress';
    progress.type = 'range';
    progress.min = '0';
    progress.max = '1000';
    progress.value = '0';
    progress.setAttribute('aria-label', 'Progresso do vídeo');

    time.className = 'player-time';
    time.textContent = '0:00';

    mute.className = 'player-control';
    mute.type = 'button';
    mute.textContent = 'Som';
    mute.setAttribute('aria-label', 'Ativar ou desativar som');

    fullscreen.className = 'player-control';
    fullscreen.type = 'button';
    fullscreen.textContent = 'Tela';
    fullscreen.setAttribute('aria-label', 'Abrir em tela cheia');

    controls.append(toggle, progress, time, mute, fullscreen);
    player.append(playButton, controls);

    const playVideo = () => {
      videos.forEach((otherVideo) => {
        if (otherVideo !== video) otherVideo.pause();
      });

      video.preload = 'auto';
      video.play();
    };

    const togglePlay = () => {
      if (video.paused) {
        playVideo();
      } else {
        video.pause();
      }
    };

    const syncState = () => {
      const isPlaying = !video.paused;
      player.classList.toggle('is-playing', isPlaying);
      toggle.textContent = isPlaying ? 'II' : '>';
      toggle.setAttribute('aria-label', isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo');
    };

    const syncProgress = () => {
      const percent = video.duration ? (video.currentTime / video.duration) * 1000 : 0;
      progress.value = String(percent);
      time.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
    };

    playButton.addEventListener('click', playVideo);
    toggle.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
    video.addEventListener('play', syncState);
    video.addEventListener('pause', syncState);
    video.addEventListener('ended', syncState);
    video.addEventListener('timeupdate', syncProgress);
    video.addEventListener('loadedmetadata', syncProgress);

    progress.addEventListener('input', () => {
      if (!video.duration) return;
      video.currentTime = (Number(progress.value) / 1000) * video.duration;
    });

    mute.addEventListener('click', () => {
      video.muted = !video.muted;
      mute.textContent = video.muted ? 'Mudo' : 'Som';
    });

    fullscreen.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        return;
      }

      video.controls = true;
      video.requestFullscreen?.();
    });

    video.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        video.controls = false;
      }
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const video = entry.target.querySelector('video');
        if (video) video.preload = 'metadata';
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '500px' });

    players.forEach((player) => observer.observe(player));
  }
});

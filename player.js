function setupCustomPlayer(videoId, playBtnId, progressId) {
  const video = document.getElementById(videoId);
  const playBtn = document.getElementById(playBtnId);
  const progress = document.getElementById(progressId);
  const progressBarBg = progress.parentElement;

  // Show/hide play button
  function updatePlayBtn() {
    if (video.paused) {
      playBtn.classList.remove('hide');
    } else {
      playBtn.classList.add('hide');
    }
  }

  // Play/pause logic
  playBtn.addEventListener('click', () => {
    video.play();
  });
  video.addEventListener('click', () => {
    if (!video.paused) {
      video.pause();
    }
  });

  video.addEventListener('play', updatePlayBtn);
  video.addEventListener('pause', updatePlayBtn);

  // Progress bar update
  video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100 || 0;
    progress.style.width = percent + '%';
  });

  // Seek on progress bar click
  progressBarBg.addEventListener('click', (e) => {
    const rect = progressBarBg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    video.currentTime = percent * video.duration;
  });

  // Hide play button on start
  updatePlayBtn();
}

// Setup all players após o DOM estar pronto
document.addEventListener('DOMContentLoaded', () => {
  setupCustomPlayer('video-01', 'center-play-01', 'progress-01');
  setupCustomPlayer('video-02', 'center-play-02', 'progress-02');
  setupCustomPlayer('video-03', 'center-play-03', 'progress-03');
  setupCustomPlayer('video-04', 'center-play-04', 'progress-04');
  setupCustomPlayer('video-05', 'center-play-05', 'progress-05');
});
setupCustomPlayer('video-03', 'center-play-03', 'progress-03');

setupCustomPlayer('video-angelo-01', 'center-play-angelo-01', 'progress-angelo-01');
  setupCustomPlayer('video-angelo-02', 'center-play-angelo-02', 'progress-angelo-02');
  setupCustomPlayer('video-outraempresa-01', 'center-play-outraempresa-01', 'progress-outraempresa-01');



  let currentIndex = 0;
const images = document.querySelectorAll('.carousel-img');
const dots = document.querySelectorAll('.dot');
const totalImages = images.length;

// Função para mostrar imagem
function showImage(index) {
  images.forEach(img => img.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  images[index].classList.add('active');
  dots[index].classList.add('active');
}

// Botão próximo
document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalImages;
  showImage(currentIndex);
});

// Botão anterior
document.getElementById('prev-btn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  showImage(currentIndex);
});

// Clique nas bolinhas
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    showImage(currentIndex);
  });
});

// Autoplay (troca automática a cada 3 segundos)
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalImages;
  showImage(currentIndex);
}, 3000); // 3000ms = 3 segundos
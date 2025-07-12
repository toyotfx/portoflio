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


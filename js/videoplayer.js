const video = document.getElementById('video');
const playPause = document.getElementById('playPause');
const progress = document.getElementById('progress');
const current = document.getElementById('current');
const duration = document.getElementById('duration');
const fullscreen = document.getElementById('fullscreen');

function formatTime(time) {
  const min = Math.floor(time / 60).toString().padStart(2, '0');
  const sec = Math.floor(time % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

video.addEventListener('loadedmetadata', () => {
  progress.max = video.duration;
  duration.textContent = formatTime(video.duration);
});

video.addEventListener('timeupdate', () => {
  progress.value = video.currentTime;
  current.textContent = formatTime(video.currentTime);
});

progress.addEventListener('input', () => {
  video.currentTime = progress.value;
});

playPause.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPause.textContent = '⏸️';
  } else {
    video.pause();
    playPause.textContent = '▶️';
  }
});

fullscreen.addEventListener('click', () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
});

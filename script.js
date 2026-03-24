function initVideoBackground() {
  const videoContainer = document.querySelector('.video-background');
  if (!videoContainer) return;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    videoContainer.remove();
  } else {
    const video = document.getElementById('bgVideo');
    if (video) video.play().catch(err => console.log('视频自动播放失败:', err));
  }
}

function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  
  if (!themeToggle || !sunIcon || !moonIcon) return;
  
  let isDark = false;

  function updateThemeIcons() {
    if (isDark) {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  }

  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    updateThemeIcons();
  });
}

function initScrollReveal() {
  let observer = null;
  if (observer) observer.disconnect();
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initVideoBackground();
  initScrollReveal();
  initMusicControl();
});

function initMusicControl() {
  const bgMusic = document.getElementById('bgMusic');
  const playBtn = document.getElementById('playBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  
  if (!bgMusic || !playBtn || !pauseBtn) return;
  
  // 播放按钮点击事件
  playBtn.addEventListener('click', () => {
    bgMusic.play().catch(err => console.log('音乐播放失败:', err));
    playBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
  });
  
  // 暂停按钮点击事件
  pauseBtn.addEventListener('click', () => {
    bgMusic.pause();
    pauseBtn.classList.add('hidden');
    playBtn.classList.remove('hidden');
  });
  
  // 音乐结束时重新播放
  bgMusic.addEventListener('ended', () => {
    bgMusic.currentTime = 0;
    bgMusic.play();
  });
}
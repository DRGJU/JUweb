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

// 点击特效
function initClickEffect() {
  document.addEventListener('click', (e) => {
    const clickEffect = document.createElement('div');
    clickEffect.classList.add('click-effect');
    clickEffect.style.left = e.clientX + 'px';
    clickEffect.style.top = e.clientY + 'px';
    document.body.appendChild(clickEffect);
    
    setTimeout(() => {
      clickEffect.remove();
    }, 600);
  });
}

// 点击涟漪动画
function initRippleEffect() {
  const buttons = document.querySelectorAll('button, a, .article-card');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 800);
    });
  });
}

// 像素光标轨迹
function initPixelTrail() {
  const trail = [];
  const trailLength = 10;
  
  document.addEventListener('mousemove', (e) => {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel-trail');
    pixel.style.left = e.clientX + 'px';
    pixel.style.top = e.clientY + 'px';
    document.body.appendChild(pixel);
    
    trail.push(pixel);
    
    if (trail.length > trailLength) {
      const oldestPixel = trail.shift();
      oldestPixel.classList.add('fade');
      setTimeout(() => {
        oldestPixel.remove();
      }, 500);
    }
  });
}

// 在DOM加载完成后初始化所有效果
document.addEventListener('DOMContentLoaded', () => {
  initClickEffect();
  initRippleEffect();
  initPixelTrail();
});
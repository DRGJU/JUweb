import { showNotice } from './ui.js';

/** 悬浮控件的渐进增强层；脚本不可用时页面内容仍完整可读。 */
export function initControls() {
  initMusic();
  initBackToTop();
}

function initMusic() {
  const audio = document.getElementById('bgMusic');
  const playBtn = document.getElementById('playBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const slot = document.getElementById('musicControl');
  if (!audio || !playBtn || !pauseBtn) return;

  const sync = () => {
    const playing = !audio.paused;
    playBtn.hidden = playing;
    pauseBtn.hidden = !playing;
    playBtn.removeAttribute('aria-busy');
    pauseBtn.removeAttribute('aria-busy');
    if (slot) slot.dataset.playing = String(playing);
  };

  playBtn.addEventListener('click', async () => {
    playBtn.setAttribute('aria-busy', 'true');
    try {
      await audio.play();
      if (slot) slot.dataset.state = '';
    } catch {
      if (slot) slot.dataset.state = 'error';
      showNotice('浏览器阻止了播放，请再次点击播放。', 'error');
    }
    sync();
  });

  pauseBtn.addEventListener('click', () => {
    audio.pause();
    sync();
  });

  audio.addEventListener('play', sync);
  audio.addEventListener('pause', sync);
  audio.addEventListener('error', () => {
    if (slot) slot.dataset.state = 'error';
    showNotice('背景音乐加载失败。', 'error');
  });
  sync();
}

function initBackToTop() {
  const button = document.getElementById('backToTop');
  if (!button) return;

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  let queued = false;

  const update = () => {
    button.disabled = window.scrollY < 240;
    queued = false;
  };
  update();

  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(update);
  }, { passive: true });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    button.focus({ preventScroll: true });
  });
}

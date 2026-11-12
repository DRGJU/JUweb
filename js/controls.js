import { showNotice } from './ui.js';

/** 悬浮控件的渐进增强层；脚本不可用时页面内容仍完整可读。 */

const MUSIC_KEY = 'juweb:music';

function readMusicState() {
  try {
    const raw = localStorage.getItem(MUSIC_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (typeof obj !== 'object' || obj === null) return null;
    return obj;
  } catch {
    return null;
  }
}

function writeMusicState(state) {
  try {
    localStorage.setItem(MUSIC_KEY, JSON.stringify(state));
  } catch {
    /* 隐私模式或配额不足时静默忽略 */
  }
}

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

  // 跨页面续播：把播放状态与进度写入 localStorage，新页面加载时恢复。
  let resumeOnMeta = false;
  let lastSave = 0;

  const save = () => {
    writeMusicState({
      playing: !audio.paused,
      time: audio.currentTime || 0,
      vol: audio.volume
    });
  };

  const sync = () => {
    const playing = !audio.paused;
    playBtn.hidden = playing;
    pauseBtn.hidden = !playing;
    playBtn.removeAttribute('aria-busy');
    pauseBtn.removeAttribute('aria-busy');
    if (slot) slot.dataset.playing = String(playing);
  };

  // 新页面加载：若上次在播放，则自动回到原位续播。
  const tryResume = async () => {
    const state = readMusicState();
    if (!state || !state.playing) return;
    resumeOnMeta = true;
    if (typeof state.vol === 'number') audio.volume = state.vol;
    if (audio.readyState >= 1) {
      try { audio.currentTime = state.time || 0; } catch { /* 元数据未就绪 */ }
    }
    try {
      await audio.play();
    } catch {
      // 浏览器自动播放策略拦截：等待用户首次交互（点击/按键）再续播。
      const resume = () => {
        audio.play().catch(() => {});
        document.removeEventListener('pointerdown', resume);
        document.removeEventListener('keydown', resume);
      };
      document.addEventListener('pointerdown', resume, { once: true });
      document.addEventListener('keydown', resume, { once: true });
    }
    sync();
  };

  audio.addEventListener('loadedmetadata', () => {
    if (resumeOnMeta) {
      const state = readMusicState();
      if (state && state.playing) {
        try { audio.currentTime = state.time || 0; } catch { /* 忽略 */ }
      }
      resumeOnMeta = false;
    }
  });

  playBtn.addEventListener('click', async () => {
    playBtn.setAttribute('aria-busy', 'true');
    try {
      await audio.play();
      if (slot) slot.dataset.state = '';
      save();
    } catch {
      if (slot) slot.dataset.state = 'error';
      showNotice('浏览器阻止了播放，请再次点击播放。', 'error');
    }
    sync();
  });

  pauseBtn.addEventListener('click', () => {
    audio.pause();
    save();
    sync();
  });

  audio.addEventListener('play', () => { save(); sync(); });
  audio.addEventListener('pause', () => { save(); sync(); });
  audio.addEventListener('volumechange', save);
  audio.addEventListener('timeupdate', () => {
    const now = Date.now();
    if (now - lastSave > 1000) { lastSave = now; save(); }
  });
  // 跳走前先落盘进度，保证下一页能精确续上。
  window.addEventListener('pagehide', save);
  window.addEventListener('beforeunload', save);

  audio.addEventListener('error', () => {
    if (slot) slot.dataset.state = 'error';
    showNotice('背景音乐加载失败。', 'error');
  });

  sync();
  tryResume();
}

function initBackToTop() {
  const button = document.getElementById('backToTop');
  if (!button) return;

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  let queued = false;

  const update = () => {
    button.hidden = window.scrollY < 240;
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
    button.hidden = true;
    // 控件消失后把焦点交回正文，避免焦点落到 body
    const main = document.querySelector('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
      main.removeAttribute('tabindex');
    }
  });
}

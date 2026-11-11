import { initTheme, showNotice } from './ui.js';

/**
 * 渐进增强层：文章归档已由构建脚本写成静态 HTML。
 * 脚本只负责主题与音乐控件；脚本不可用时页面仍可完整阅读。
 */
initTheme();

const audio = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');

if (audio && playBtn && pauseBtn) {
  const sync = () => {
    playBtn.hidden = !audio.paused;
    pauseBtn.hidden = audio.paused;
  };

  playBtn.addEventListener('click', async () => {
    try {
      await audio.play();
    } catch {
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
  audio.addEventListener('error', () => showNotice('背景音乐加载失败。', 'error'));
  sync();
}

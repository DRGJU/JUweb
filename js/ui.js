import { STORAGE_KEYS, readStorage, writeStorage } from './core.js';

/** 主题切换、页脚年份与提示条，首页与文章页共用。 */
export function initTheme(buttonId = 'themeToggle') {
  const button = document.getElementById(buttonId);

  const apply = (theme) => {
    const next = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    if (button) {
      button.textContent = next === 'dark' ? '浅色' : '深色';
      button.setAttribute('aria-pressed', String(next === 'dark'));
      button.setAttribute('aria-label', next === 'dark' ? '切换到浅色主题' : '切换到深色主题');
    }
  };

  // 用户上次的主题优先于页面默认；readStorage 在隐私模式下会安全回退
  const saved = readStorage(STORAGE_KEYS.theme, null);
  apply(saved === 'dark' || saved === 'light' ? saved : document.documentElement.dataset.theme);

  button?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    writeStorage(STORAGE_KEYS.theme, next);
  });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}

export function showNotice(message, kind = 'info') {
  const el = document.getElementById('notice');
  if (!el) return;
  el.textContent = message;
  el.classList.toggle('notice-error', kind === 'error');
  el.classList.remove('visually-hidden');
  el.hidden = false;
}

export function hideNotice() {
  const el = document.getElementById('notice');
  if (!el) return;
  el.hidden = true;
  el.classList.add('visually-hidden');
}

export function setStatus(id, message, kind = 'ok') {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
  el.className = `form-status ${kind}`;
}

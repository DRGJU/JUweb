import { STORAGE_KEYS, readStorage, writeStorage } from './core.js';

/** 主题切换 + 页脚年份 + 提示条，所有页面共用。 */
export function initTheme(buttonId = 'themeToggle') {
  const button = document.getElementById(buttonId);

  const apply = (theme) => {
    const next = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'dark' ? '#17191f' : '#f7f5f0');
    if (button) {
      button.textContent = next === 'dark' ? '浅色' : '深色';
      button.setAttribute('aria-pressed', String(next === 'dark'));
      button.setAttribute('aria-label', next === 'dark' ? '切换到浅色主题' : '切换到深色主题');
    }
  };

  apply(document.documentElement.dataset.theme);

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
  el.hidden = false;
}

export function hideNotice() {
  const el = document.getElementById('notice');
  if (el) el.hidden = true;
}

export function setStatus(id, message, kind = 'ok') {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
  el.className = `form-status ${kind}`;
}

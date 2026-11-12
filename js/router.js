import { initTheme } from './ui.js';

/**
 * 软导航：拦截站内 .html 链接，fetch 目标页并替换 <body> 内容，
 * 但保留包含 <audio> 的音乐控件节点，使背景音乐在切页时不中断。
 * 这是对 localStorage 续播的互补方案（彻底避免重新加载导致的静音间隙）。
 */

const liveIds = ['musicControl', 'backToTop'];
let navigating = false;

function isInternalNavLink(a) {
  if (!a) return false;
  if (a.target && a.target !== '_self') return false;
  if (a.hasAttribute('download')) return false;
  const href = a.getAttribute('href');
  if (!href) return false;
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  if (a.origin !== location.origin) return false;
  if (!a.pathname.endsWith('.html')) return false;
  return true;
}

async function softNavigate(url, { push = true } = {}) {
  if (navigating) return;
  navigating = true;
  try {
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    // 保留当前正在播放的音频控件节点，并保持挂载（移动 DOM 不会中断播放）
    const live = liveIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const keep = new Set(live);

    // 移除当前 body 中除 live 控件外的所有子节点
    [...document.body.childNodes].forEach((n) => {
      if (!keep.has(n)) n.remove();
    });

    // 把目标 body 的内容（跳过目标自带控件）移入当前 body
    [...doc.body.childNodes].forEach((node) => {
      if (node.id && liveIds.includes(node.id)) return;
      document.body.appendChild(document.importNode(node, true));
    });

    // 新 body 的主题切换按钮是全新节点，需重新绑定
    initTheme();

    if (doc.title) document.title = doc.title;
    const canonical = doc.querySelector('link[rel="canonical"]');
    if (canonical) {
      const c = document.querySelector('link[rel="canonical"]');
      if (c) c.setAttribute('href', canonical.getAttribute('href'));
    }

    if (push) history.pushState({ soft: true }, '', url);

    const hash = new URL(url, location.href).hash;
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) target.scrollIntoView();
      else window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  } catch (err) {
    // 软导航失败则回退为整页跳转（音乐停止，但保证可用）
    if (push) window.location.assign(url);
    else console.warn('soft navigation failed', err);
  } finally {
    navigating = false;
  }
}

export function initRouter() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a');
    if (!a || !isInternalNavLink(a)) return;
    const href = a.getAttribute('href');
    const abs = new URL(href, location.href);
    // 同页锚点不拦截，交给浏览器原生滚动
    if (abs.pathname === location.pathname && abs.hash) return;
    e.preventDefault();
    softNavigate(abs.href);
  });

  window.addEventListener('popstate', () => {
    softNavigate(location.href, { push: false });
  });
}

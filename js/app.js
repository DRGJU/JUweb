import {
  ARTICLES_PATH, STORAGE_KEYS, ITEMS_PER_PAGE,
  normalizePayload, paginate, sortArticles,
  parseJSON, readStorage, writeStorage
} from './core.js';
import { initTheme, showNotice } from './ui.js';

const els = {
  list: document.getElementById('articleList'),
  pagination: document.getElementById('pagination'),
  count: document.getElementById('articleCount')
};

const state = {
  articles: [],
  page: 1,
  version: 0,
  draftMode: false
};

function node(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

/** 发布源每次都校验（no-store），仅在离线/失败时回退本地缓存。 */
async function fetchPublished() {
  try {
    const response = await fetch(ARTICLES_PATH, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = normalizePayload(await response.json());
    writeStorage(STORAGE_KEYS.cache, JSON.stringify(payload));
    return { payload, fromCache: false };
  } catch (error) {
    const cached = parseJSON(readStorage(STORAGE_KEYS.cache));
    if (cached) {
      return { payload: normalizePayload(cached), fromCache: true, error };
    }
    return { payload: normalizePayload(null), fromCache: false, error };
  }
}

function createCard(article, index) {
  const card = node('a', 'article-card reveal');
  card.style.setProperty('--reveal-delay', `${Math.min(index, 6) * 0.05}s`);
  card.href = state.draftMode
    ? `./preview.html?id=${encodeURIComponent(article.id)}`
    : `./posts/${encodeURIComponent(article.id)}.html`;

  const meta = node('div', 'card-meta');
  meta.append(node('span', 'card-category', article.category), node('span', 'card-date', article.date));

  const tags = node('div', 'card-tags');
  article.tags.forEach((tag) => tags.append(node('span', 'tag', tag)));

  card.append(
    meta,
    node('h2', 'card-title', article.title),
    node('p', 'card-excerpt', article.excerpt),
    tags
  );
  return card;
}

function renderPagination(page, pages) {
  els.pagination.replaceChildren();
  if (pages <= 1) return;

  const add = (label, target, disabled = false, active = false) => {
    const button = node('button', active ? 'active' : '', label);
    button.type = 'button';
    button.disabled = disabled;
    if (active) button.setAttribute('aria-current', 'page');
    button.setAttribute('aria-label', /^\d+$/.test(label) ? `第 ${label} 页` : label);
    button.addEventListener('click', () => {
      state.page = target;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    els.pagination.append(button);
  };

  add('上一页', page - 1, page === 1);
  for (let p = 1; p <= pages; p += 1) add(String(p), p, false, p === page);
  add('下一页', page + 1, page === pages);
}

function render() {
  const { page, pages, items } = paginate(state.articles, state.page, ITEMS_PER_PAGE);
  state.page = page;

  els.count.textContent = `共 ${state.articles.length} 篇 · 数据 v${state.version}`;
  els.list.replaceChildren();

  if (!items.length) {
    els.list.append(node('p', 'empty-state', '暂无文章，敬请期待。'));
  } else {
    items.forEach((article, index) => els.list.append(createCard(article, index)));
  }
  renderPagination(page, pages);
}

function bindMusic() {
  const audio = document.getElementById('bgMusic');
  const playBtn = document.getElementById('playBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  if (!audio || !playBtn || !pauseBtn) return;

  const sync = () => {
    playBtn.hidden = !audio.paused;
    pauseBtn.hidden = audio.paused;
  };

  playBtn.addEventListener('click', async () => {
    try {
      await audio.play();
    } catch {
      showNotice('浏览器阻止了自动播放，请再次点击播放按钮。', 'error');
    }
    sync();
  });
  pauseBtn.addEventListener('click', () => { audio.pause(); sync(); });
  audio.addEventListener('play', sync);
  audio.addEventListener('pause', sync);
  audio.addEventListener('error', () => showNotice('背景音乐加载失败。', 'error'));
  sync();
}

async function init() {
  initTheme();
  bindMusic();

  state.draftMode = new URLSearchParams(location.search).get('draft') === '1';

  let result;
  if (state.draftMode) {
    const draft = parseJSON(readStorage(STORAGE_KEYS.draft));
    if (draft) {
      result = { payload: normalizePayload(draft), fromCache: false };
      showNotice('正在预览本地草稿（未发布）。文章链接指向草稿预览页。');
    } else {
      result = await fetchPublished();
      showNotice('当前浏览器没有草稿，已显示已发布内容。', 'error');
    }
  } else {
    result = await fetchPublished();
  }

  state.articles = sortArticles(result.payload.articles);
  state.version = result.payload.version;
  render();

  if (result.error) {
    showNotice(
      result.fromCache
        ? '无法连接数据源，正在显示上次成功加载的缓存内容。'
        : `文章数据加载失败（${result.error.message}）。请通过本地服务器打开，不要使用 file:// 协议。`,
      'error'
    );
  }
}

init();

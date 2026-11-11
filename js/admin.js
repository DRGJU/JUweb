import {
  ARTICLES_PATH, STORAGE_KEYS,
  normalizePayload, normalizeArticle, buildPayload, sortArticles,
  parseJSON, parseTags, tagsToInput, nextId, localDateISO,
  readStorage, writeStorage
} from './core.js';
import { initTheme, showNotice, setStatus } from './ui.js';

const form = document.getElementById('articleForm');
const list = document.getElementById('articleList');
const badge = document.getElementById('draftBadge');
const importInput = document.getElementById('importFile');

const fields = {
  editId: document.getElementById('editId'),
  title: document.getElementById('title'),
  category: document.getElementById('category'),
  tagsInput: document.getElementById('tagsInput'),
  excerpt: document.getElementById('excerpt'),
  content: document.getElementById('content')
};

const state = {
  payload: normalizePayload(null),
  articles: [],
  publishedVersion: 1,
  editingId: null,
  hasDraft: false
};

function node(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

async function loadPublished() {
  try {
    const response = await fetch(ARTICLES_PATH, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = normalizePayload(await response.json());
    writeStorage(STORAGE_KEYS.cache, JSON.stringify(payload));
    return payload;
  } catch (error) {
    const cached = parseJSON(readStorage(STORAGE_KEYS.cache));
    showNotice(`读取 data/articles.json 失败（${error.message}），请使用本地服务器打开。`, 'error');
    return cached ? normalizePayload(cached) : normalizePayload(null);
  }
}

async function reload() {
  // 始终以线上发布版本为基线，避免草稿版本号被反复自增
  const published = await loadPublished();
  state.publishedVersion = published.version;

  const draft = parseJSON(readStorage(STORAGE_KEYS.draft));
  if (draft) {
    state.payload = normalizePayload(draft);
    state.hasDraft = true;
  } else {
    state.payload = published;
    state.hasDraft = false;
  }
  state.articles = sortArticles(state.payload.articles);
  renderList();
}

function renderList() {
  badge.textContent = state.hasDraft
    ? '· 本地草稿（未发布）'
    : `· 已发布 v${state.payload.version}`;

  list.replaceChildren();
  if (!state.articles.length) {
    list.append(node('p', 'empty-state', '暂无文章，可在右侧添加。'));
    return;
  }

  state.articles.forEach((article) => {
    const item = node('div', 'admin-item');
    const info = node('div');
    info.append(
      node('h3', '', article.title),
      node('p', '', `${article.date} | ${article.category}`)
    );

    const actions = node('div', 'admin-item-actions');
    const edit = node('button', 'btn btn-sm', '编辑');
    edit.type = 'button';
    edit.dataset.action = 'edit';
    edit.dataset.id = String(article.id);
    const remove = node('button', 'btn btn-sm btn-danger', '删除');
    remove.type = 'button';
    remove.dataset.action = 'delete';
    remove.dataset.id = String(article.id);
    actions.append(edit, remove);
    item.append(info, actions);
    list.append(item);
  });
}

function resetForm() {
  state.editingId = null;
  fields.editId.value = '';
  document.getElementById('formTitle').textContent = '添加文章';
  setStatus('formStatus', '');
}

function startEdit(id) {
  const article = state.articles.find((a) => a.id === id);
  if (!article) return;
  state.editingId = id;
  fields.editId.value = String(id);
  fields.title.value = article.title;
  fields.category.value = article.category;
  fields.tagsInput.value = tagsToInput(article.tags);
  fields.excerpt.value = article.excerpt;
  fields.content.value = article.content;
  document.getElementById('formTitle').textContent = `编辑文章 #${id}`;
  setStatus('formStatus', `正在编辑 #${id}，保存后只更新本地草稿。`);
  fields.title.focus();
}

function saveDraft() {
  state.payload = buildPayload(state.articles, state.publishedVersion);
  const ok = writeStorage(STORAGE_KEYS.draft, JSON.stringify(state.payload));
  state.hasDraft = ok;
  if (!ok) showNotice('localStorage 不可用，草稿未能保存。请检查浏览器设置或改用导出 JSON。', 'error');
  return ok;
}

function exportJSON() {
  const text = `${JSON.stringify(state.payload, null, 2)}\n`;
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'articles.json';
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  setStatus('formStatus', '已导出 articles.json。覆盖 data/articles.json 并提交仓库即可发布。');
}

list.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const id = Number(button.dataset.id);

  if (button.dataset.action === 'edit') {
    startEdit(id);
    return;
  }

  const article = state.articles.find((a) => a.id === id);
  if (!window.confirm(`确定删除《${article?.title || id}》吗？此操作只影响本地草稿。`)) return;
  state.articles = state.articles.filter((a) => a.id !== id);
  saveDraft();
  if (state.editingId === id) resetForm();
  renderList();
  setStatus('formStatus', '已从本地草稿删除。');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = fields.title.value.trim();
  const category = fields.category.value.trim();
  const excerpt = fields.excerpt.value.trim();
  const content = fields.content.value.trim();
  if (!title || !category || !excerpt || !content) {
    setStatus('formStatus', '标题、分类、摘要、正文均为必填。', 'error');
    return;
  }

  const existing = state.editingId
    ? state.articles.find((a) => a.id === state.editingId)
    : null;

  const article = normalizeArticle({
    id: existing ? existing.id : nextId(state.articles),
    title,
    category,
    tags: parseTags(fields.tagsInput.value),
    excerpt,
    content,
    date: existing ? existing.date : localDateISO()
  });

  if (existing) {
    const index = state.articles.findIndex((a) => a.id === existing.id);
    state.articles[index] = article;
  } else {
    state.articles.push(article);
  }

  state.articles = sortArticles(state.articles);
  saveDraft();
  renderList();
  resetForm();
  form.reset();
  setStatus('formStatus', '已保存到本地草稿（未发布）。点「预览草稿」查看效果。');
});

form.addEventListener('reset', () => window.setTimeout(resetForm, 0));

document.getElementById('exportBtn').addEventListener('click', exportJSON);

importInput.addEventListener('change', async () => {
  const file = importInput.files?.[0];
  if (!file) return;
  try {
    const payload = normalizePayload(parseJSON(await file.text()));
    if (!payload.articles.length) throw new Error('文件中没有有效文章');
    state.payload = buildPayload(payload.articles, payload.version - 1);
    state.publishedVersion = payload.version - 1;
    state.articles = sortArticles(state.payload.articles);
    writeStorage(STORAGE_KEYS.draft, JSON.stringify(state.payload));
    state.hasDraft = true;
    renderList();
    resetForm();
    showNotice('已导入为本地草稿（未发布）。确认无误后请导出并覆盖 data/articles.json。');
  } catch (error) {
    showNotice(`导入失败：${error.message}`, 'error');
  } finally {
    importInput.value = '';
  }
});

document.getElementById('discardBtn').addEventListener('click', async () => {
  if (!state.hasDraft || !window.confirm('确定放弃本地草稿，恢复为仓库中已发布的内容吗？')) return;
  try { localStorage.removeItem(STORAGE_KEYS.draft); } catch { /* 忽略 */ }
  await reload();
  resetForm();
  showNotice('已放弃草稿，当前显示仓库中的已发布内容。');
});

initTheme();
reload();

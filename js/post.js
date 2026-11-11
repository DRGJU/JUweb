import { STORAGE_KEYS, normalizeArticle, normalizePayload, parseJSON, readStorage, stripHTML } from './core.js';
import { sanitizeHTML } from './sanitize.js';
import { initTheme, showNotice } from './ui.js';

function node(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

/** 静态文章页读内嵌 JSON；草稿预览页读 localStorage。 */
function resolveArticle() {
  const inline = document.getElementById('post-data');
  if (inline) {
    const raw = parseJSON(inline.textContent);
    return normalizeArticle(raw);
  }

  const id = Number(new URLSearchParams(location.search).get('id'));
  const draft = parseJSON(readStorage(STORAGE_KEYS.draft));
  if (!id || !draft) return null;
  return normalizePayload(draft).articles.find((a) => a.id === id) || null;
}

function render(article) {
  document.title = `${article.title} | 墨迹`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', stripHTML(article.excerpt).slice(0, 160));

  document.getElementById('postTitle').textContent = article.title;
  document.getElementById('postCategory').textContent = article.category;
  document.getElementById('postDate').textContent = article.date;

  const tags = document.getElementById('postTags');
  tags.replaceChildren();
  article.tags.forEach((tag) => tags.append(node('span', 'tag', tag)));

  // 唯一允许插入 HTML 的位置，且必须经过白名单消毒
  document.getElementById('postContent').innerHTML = sanitizeHTML(article.content);

  const host = document.getElementById('postActions');
  if (!host) return;
  host.replaceChildren();

  const back = node('a', 'btn', '返回列表');
  back.href = './index.html';
  host.append(back);

  const copy = node('button', 'btn', '复制永久链接');
  copy.type = 'button';
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      copy.textContent = '已复制';
    } catch {
      showNotice('复制失败，请手动复制地址栏链接。', 'error');
    }
  });
  host.append(copy);
}

initTheme();

const article = resolveArticle();
if (article) {
  render(article);
} else {
  document.getElementById('postTitle').textContent = '文章不存在';
  document.getElementById('postContent').textContent = '请返回列表重新选择，或先在草稿编辑器中保存内容。';
  showNotice('未找到文章数据。草稿预览需要在同一浏览器中先保存草稿。', 'error');
}

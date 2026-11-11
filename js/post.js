import { normalizeArticle, parseJSON, stripHTML } from './core.js';
import { sanitizeHTML } from './sanitize.js';
import { initTheme, showNotice } from './ui.js';
import { initControls } from './controls.js';

function node(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

/** 文章页的数据在构建期内嵌为 JSON，正文同时以静态 HTML 写出。 */
function resolveArticle() {
  const inline = document.getElementById('post-data');
  if (!inline) return null;
  return normalizeArticle(parseJSON(inline.textContent));
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
  article.tags.forEach((tag) => tags.append(node('span', 'post__tag', tag)));

  // 唯一允许插入 HTML 的位置，且必须经过白名单消毒
  document.getElementById('postContent').innerHTML = sanitizeHTML(article.content);

  const host = document.getElementById('postActions');
  if (!host) return;
  host.replaceChildren();

  const back = node('a', '', '返回目录');
  back.href = '../index.html';
  host.append(back);

  const copy = node('button', '', '复制永久链接');
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
initControls();

const article = resolveArticle();
if (article) {
  render(article);
} else {
  showNotice('文章数据未能读取，正文仍以静态内容显示。', 'error');
}

/**
 * 零依赖静态构建：由 data/articles.json 生成首页、分页、文章页与 sitemap。
 * 页面在构建期写成静态 HTML，关闭 JavaScript 也能完整阅读。
 * 运行：npm run build
 */
import { readFile, readdir, writeFile, unlink, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ITEMS_PER_PAGE, normalizePayload, sanitizeHTMLString, escapeHTML,
  stripHTML, sortArticles, paginate, totalPages
} from './js/core.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://drgju.github.io/JUweb/';
const TEMPLATES = path.join(ROOT, 'templates');

function fill(template, values) {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{{${key}}}`, String(value)),
    template
  );
}

function renderRow(article, base) {
  const href = `${base}posts/${article.id}.html`;
  const meta = [article.category, ...article.tags].filter(Boolean).join('，');
  return `<article class="row">
          <time class="row__date" datetime="${escapeHTML(article.date)}">${escapeHTML(article.date)}</time>
          <div>
            <h3 class="row__title"><a href="${href}">${escapeHTML(article.title)}</a></h3>
            <p class="row__excerpt">${escapeHTML(article.excerpt)}</p>
            <p class="row__meta">${escapeHTML(meta)}</p>
          </div>
          <a class="row__link" href="${href}" aria-label="读《${escapeHTML(article.title)}》">读这一篇</a>
        </article>`;
}

function pageHref(page, inPageDir) {
  if (page === 1) return inPageDir ? '../index.html' : 'index.html';
  return `page/${page}.html`;
}

function renderPagination(current, pages, inPageDir) {
  if (pages <= 1) return '';
  const links = [];
  if (current > 1) links.push(`<a href="${pageHref(current - 1, inPageDir)}">上一页</a>`);
  for (let p = 1; p <= pages; p += 1) {
    const mark = p === current ? ' aria-current="page"' : '';
    links.push(`<a href="${pageHref(p, inPageDir)}"${mark}>第 ${p} 页</a>`);
  }
  if (current < pages) links.push(`<a href="${pageHref(current + 1, inPageDir)}">下一页</a>`);
  return links.join('\n        ');
}

function indexValues(template, controlsTemplate, payload, articles, page, inPageDir) {
  const base = inPageDir ? '../' : './';
  const latest = articles[0];
  const { items } = paginate(articles, page, ITEMS_PER_PAGE);
  return fill(template, {
    BASE: base,
    HOME_HREF: inPageDir ? '../index.html' : 'index.html',
    CANONICAL: inPageDir ? `${SITE_URL}page/${page}.html` : SITE_URL,
    VERSION: payload.version,
    UPDATED_AT: escapeHTML(payload.updatedAt || '日期未提供'),
    ARTICLE_COUNT: articles.length,
    LATEST_HREF: `${base}posts/${latest.id}.html`,
    LATEST_TITLE: escapeHTML(latest.title),
    LATEST_DATE: escapeHTML(latest.date),
    LATEST_CATEGORY: escapeHTML(latest.category),
    ARTICLE_ROWS: items.map((article) => renderRow(article, base)).join('\n        '),
    PAGINATION: renderPagination(page, totalPages(articles.length, ITEMS_PER_PAGE), inPageDir),
    CONTROLS: fill(controlsTemplate, { BASE: base })
  });
}

function postPage(template, controlsTemplate, article, payload) {
  const tags = article.tags
    .map((tag) => `<span class="post__tag">${escapeHTML(tag)}</span>`)
    .join('');
  // JSON 中的 "<" 转义，避免提前闭合 script 标签
  const json = JSON.stringify(article).replace(/</g, '\\u003c');

  return fill(template, {
    TITLE: escapeHTML(article.title),
    DESCRIPTION: escapeHTML(stripHTML(article.excerpt).slice(0, 160)),
    CANONICAL: `${SITE_URL}posts/${article.id}.html`,
    DATE: escapeHTML(article.date),
    CATEGORY: escapeHTML(article.category),
    VERSION: payload.version,
    TAGS: tags,
    BODY: sanitizeHTMLString(article.content),
    POST_DATA: json,
    CONTROLS: fill(controlsTemplate, { BASE: '../' })
  });
}

async function cleanGenerated(dir) {
  await mkdir(dir, { recursive: true });
  for (const file of await readdir(dir)) {
    if (file.endsWith('.html')) await unlink(path.join(dir, file));
  }
}

async function main() {
  const raw = await readFile(path.join(ROOT, 'data', 'articles.json'), 'utf8');
  const payload = normalizePayload(JSON.parse(raw));
  const articles = sortArticles(payload.articles);
  if (!articles.length) throw new Error('data/articles.json 中没有有效文章');

  const ids = new Set();
  for (const article of articles) {
    if (ids.has(article.id)) throw new Error(`文章 id 重复：${article.id}`);
    ids.add(article.id);
  }

  const indexTemplate = await readFile(path.join(TEMPLATES, 'index.html'), 'utf8');
  const postTemplate = await readFile(path.join(TEMPLATES, 'post.html'), 'utf8');
  const controlsTemplate = await readFile(path.join(TEMPLATES, 'controls.html'), 'utf8');

  await cleanGenerated(path.join(ROOT, 'posts'));
  await cleanGenerated(path.join(ROOT, 'page'));

  const pages = totalPages(articles.length, ITEMS_PER_PAGE);
  await writeFile(
    path.join(ROOT, 'index.html'),
    indexValues(indexTemplate, controlsTemplate, payload, articles, 1, false),
    'utf8'
  );
  for (let p = 2; p <= pages; p += 1) {
    await writeFile(
      path.join(ROOT, 'page', `${p}.html`),
      indexValues(indexTemplate, controlsTemplate, payload, articles, p, true),
      'utf8'
    );
  }
  for (const article of articles) {
    await writeFile(
      path.join(ROOT, 'posts', `${article.id}.html`),
      postPage(postTemplate, controlsTemplate, article, payload),
      'utf8'
    );
  }

  const urls = [SITE_URL];
  for (let p = 2; p <= pages; p += 1) urls.push(`${SITE_URL}page/${p}.html`);
  for (const article of articles) urls.push(`${SITE_URL}posts/${article.id}.html`);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join('\n')}\n</urlset>\n`;
  await writeFile(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

  console.log(`构建完成：数据 v${payload.version}，${articles.length} 篇文章，${pages} 个索引页，已生成 index.html、posts/*.html 与 sitemap.xml`);
}

main().catch((error) => {
  console.error(`构建失败：${error.message}`);
  process.exitCode = 1;
});

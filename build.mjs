/**
 * 零依赖静态构建：由 data/articles.json 生成可被分享与收录的文章页。
 * 运行：npm run build
 */
import { readFile, readdir, writeFile, unlink, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  normalizePayload, sanitizeHTMLString, escapeHTML, stripHTML
} from './js/core.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(ROOT, 'posts');
const SITE_URL = 'https://drgju.github.io/JUweb/';

const themeScript = `<script>
    try {
      var t = localStorage.getItem('juweb:theme');
      if (t === 'dark' || t === 'light') document.documentElement.dataset.theme = t;
    } catch (e) {}
  </script>`;

function pageTemplate(article) {
  const title = escapeHTML(article.title);
  const description = escapeHTML(stripHTML(article.excerpt).slice(0, 160));
  const url = `${SITE_URL}posts/${article.id}.html`;
  const tags = article.tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join('\n          ');
  const body = sanitizeHTMLString(article.content);
  // JSON 中的 "<" 转义，避免提前闭合 <script> 标签
  const json = JSON.stringify(article).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | 墨迹</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#f7f5f0">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${url}">
  <meta property="article:published_time" content="${escapeHTML(article.date)}">
  <link rel="canonical" href="${url}">
  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <link rel="stylesheet" href="../css/style.css">
  ${themeScript}
  <script type="module" src="../js/post.js"></script>
</head>
<body>
  <a class="skip-link" href="#postContent">跳到正文</a>

  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="../index.html">墨迹</a>
      <nav class="header-nav" aria-label="主导航">
        <a href="../index.html">文章</a>
        <a href="../admin.html">草稿编辑</a>
        <button id="themeToggle" class="icon-btn" type="button" aria-pressed="false">深色</button>
      </nav>
    </div>
  </header>

  <main class="container">
    <article>
      <header class="post-header">
        <a class="back-link" href="../index.html">&larr; 返回列表</a>
        <h1 id="postTitle">${title}</h1>
        <div class="card-meta">
          <span id="postCategory" class="card-category">${escapeHTML(article.category)}</span>
          <span id="postDate" class="card-date">${escapeHTML(article.date)}</span>
        </div>
        <div id="postTags" class="post-tags">
          ${tags}
        </div>
      </header>
      <div id="postContent" class="prose">${body}</div>
      <div id="postActions" class="post-actions"></div>
    </article>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <span><span id="year"></span> 墨迹. All rights reserved.</span>
      <span>用文字丈量世界</span>
    </div>
  </footer>

  <script type="application/json" id="post-data">${json}</script>
</body>
</html>
`;
}

async function main() {
  const raw = await readFile(path.join(ROOT, 'data', 'articles.json'), 'utf8');
  const payload = normalizePayload(JSON.parse(raw));
  const { articles, version } = payload;

  const ids = new Set();
  for (const article of articles) {
    if (ids.has(article.id)) throw new Error(`文章 id 重复：${article.id}`);
    ids.add(article.id);
  }

  await mkdir(POSTS_DIR, { recursive: true });
  for (const file of await readdir(POSTS_DIR)) {
    if (file.endsWith('.html')) await unlink(path.join(POSTS_DIR, file));
  }
  for (const article of articles) {
    await writeFile(path.join(POSTS_DIR, `${article.id}.html`), pageTemplate(article), 'utf8');
  }

  const urls = [
    `  <url><loc>${SITE_URL}</loc></url>`,
    ...articles.map((a) => `  <url><loc>${SITE_URL}posts/${a.id}.html</loc><lastmod>${escapeHTML(a.date)}</lastmod></url>`)
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  await writeFile(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

  console.log(`构建完成：数据 v${version}，${articles.length} 篇文章，已生成 posts/*.html 与 sitemap.xml`);
}

main().catch((error) => {
  console.error(`构建失败：${error.message}`);
  process.exitCode = 1;
});

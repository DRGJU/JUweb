import test from 'node:test';
import assert from 'node:assert/strict';
import {
  localDateISO, parseTags, tagsToInput, normalizeArticle, normalizePayload,
  buildPayload, sortArticles, totalPages, clampPage, paginate, nextId,
  escapeHTML, stripHTML, sanitizeHTMLString
} from '../js/core.js';

test('localDateISO 使用本地日历字段，而不是 UTC 日期', () => {
  const earlyMorning = new Date(2026, 0, 2, 0, 30);
  assert.equal(localDateISO(earlyMorning), '2026-01-02');
  const expected = [
    earlyMorning.getFullYear(),
    String(earlyMorning.getMonth() + 1).padStart(2, '0'),
    String(earlyMorning.getDate()).padStart(2, '0')
  ].join('-');
  assert.equal(localDateISO(earlyMorning), expected);
});

test('parseTags 支持中英文逗号并去除空项', () => {
  assert.deepEqual(parseTags('Python, 教程，, 技巧'), ['Python', '教程', '技巧']);
  assert.deepEqual(parseTags(['A', ' B ']), ['A', 'B']);
  assert.equal(tagsToInput(['Python', '教程']), 'Python, 教程');
});

test('normalizePayload 兼容旧版数组并过滤坏数据', () => {
  const legacy = [{ id: 1, title: 'A', tags: 'x, y' }];
  const result = normalizePayload(legacy);
  assert.equal(result.version, 1);
  assert.equal(result.articles.length, 1);
  assert.deepEqual(result.articles[0].tags, ['x', 'y']);
  assert.equal(result.articles[0].category, '未分类');

  const modern = normalizePayload({
    version: 7,
    updatedAt: '2026-11-11',
    articles: [null, { id: 2, title: 'B' }, { id: 'oops' }]
  });
  assert.equal(modern.version, 7);
  assert.equal(modern.articles.length, 1);
  assert.equal(modern.articles[0].title, 'B');
  assert.deepEqual(normalizePayload(null).articles, []);
});

test('日期格式非法时回退到本地今天', () => {
  const article = normalizeArticle({ id: 1, date: '昨天' });
  assert.match(article.date, /^\d{4}-\d{2}-\d{2}$/);
});

test('clampPage 在数据减少后把页码收敛到合法范围', () => {
  assert.equal(totalPages(0), 1);
  assert.equal(totalPages(8), 2);
  assert.equal(clampPage(9, 8), 2);
  assert.equal(clampPage(0, 8), 1);
  assert.equal(clampPage('abc', 8), 1);
  assert.equal(clampPage(2, 0), 1);
});

test('paginate 返回正确切片与页码', () => {
  const list = Array.from({ length: 9 }, (_, i) => ({ id: i + 1 }));
  const first = paginate(list, 1, 7);
  assert.equal(first.items.length, 7);
  assert.equal(first.pages, 2);
  const second = paginate(list, 2, 7);
  assert.equal(second.items.length, 2);
  assert.equal(second.items[0].id, 8);
  assert.equal(paginate(list, 99, 7).page, 2);
});

test('buildPayload 版本号自增、nextId 不重复', () => {
  const articles = [{ id: 1 }, { id: 3 }].map((a) => normalizeArticle(a));
  assert.equal(nextId(articles), 4);
  const payload = buildPayload(articles, 5);
  assert.equal(payload.version, 6);
  assert.match(payload.updatedAt, /^\d{4}-\d{2}-\d{2}$/);
});

test('sortArticles 按日期倒序', () => {
  const list = [
    normalizeArticle({ id: 1, date: '2024-01-01' }),
    normalizeArticle({ id: 2, date: '2026-11-11' })
  ];
  assert.equal(sortArticles(list)[0].id, 2);
});

test('escapeHTML / stripHTML', () => {
  assert.equal(escapeHTML('<a href="x">&</a>'), '&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;');
  assert.equal(stripHTML('<p>你好  <strong>世界</strong></p>'), '你好 世界');
});

test('sanitizeHTMLString 清除脚本、事件属性与危险协议', () => {
  const dirty = '<p onclick="steal()">正文<script>alert(1)</script></p>' +
    '<img src="x" onerror="alert(2)">' +
    '<a href="javascript:alert(3)">链接</a>' +
    '<iframe src="https://evil.example"></iframe>' +
    '<p>安全<a href="https://example.com" title="外链">链接</a></p>';
  const clean = sanitizeHTMLString(dirty);

  assert.ok(!/script|onclick|onerror|javascript:|iframe/i.test(clean), clean);
  assert.match(clean, /<p>正文<\/p>/);
  assert.match(clean, /rel="noopener noreferrer"/);
  assert.match(clean, /href="https:\/\/example\.com" title="外链"/);
});

test('sanitizeHTMLString 保留排版标签但丢弃不在白名单的元素', () => {
  const clean = sanitizeHTMLString('<h2>标题</h2><marquee>滚动</marquee><pre><code>x</code></pre>');
  assert.match(clean, /<h2>标题<\/h2>/);
  assert.match(clean, /<pre><code>x<\/code><\/pre>/);
  assert.ok(!clean.includes('<marquee'));
  assert.ok(clean.includes('滚动'));
});

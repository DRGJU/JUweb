/**
 * 纯函数核心层：浏览器与 Node 共用，零外部依赖。
 * 只处理数据，不触碰 DOM，便于单元测试。
 */

export const ARTICLES_PATH = './data/articles.json';
export const ITEMS_PER_PAGE = 7;

export const STORAGE_KEYS = {
  draft: 'juweb:draft',
  cache: 'juweb:published-cache',
  theme: 'juweb:theme'
};

/** 以本地时区生成 YYYY-MM-DD，避免 toISOString() 的 UTC 偏移。 */
export function localDateISO(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseTags(value) {
  if (Array.isArray(value)) return value.map((t) => String(t).trim()).filter(Boolean);
  return String(value ?? '')
    .split(/[,，]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

export function tagsToInput(tags) {
  return (Array.isArray(tags) ? tags : []).join(', ');
}

/** 单篇文章规范化：坏数据不进入渲染层。 */
export function normalizeArticle(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const id = Number(raw.id);
  if (!Number.isFinite(id) || id < 1) return null;

  const date = String(raw.date ?? '');
  return {
    id: Math.trunc(id),
    title: String(raw.title ?? '').trim() || '未命名文章',
    excerpt: String(raw.excerpt ?? ''),
    date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : localDateISO(),
    category: String(raw.category ?? '').trim() || '未分类',
    tags: parseTags(raw.tags),
    content: String(raw.content ?? '')
  };
}

/**
 * 兼容三种输入：旧版数组、{articles:[...]}、{version, updatedAt, articles}。
 * 统一返回带版本号的对象，供缓存校验使用。
 */
export function normalizePayload(payload) {
  const source = Array.isArray(payload)
    ? { version: 1, updatedAt: '', articles: payload }
    : (payload && typeof payload === 'object' ? payload : {});

  const list = Array.isArray(source.articles)
    ? source.articles
    : (Array.isArray(payload) ? payload : []);

  const version = Number(source.version);
  return {
    version: Number.isFinite(version) && version > 0 ? Math.trunc(version) : 1,
    updatedAt: typeof source.updatedAt === 'string' ? source.updatedAt : '',
    articles: list.map(normalizeArticle).filter(Boolean)
  };
}

/** 生成新的发布数据：版本号自增，updatedAt 使用本地日期。 */
export function buildPayload(articles, previousVersion = 1) {
  const base = Number(previousVersion);
  return {
    version: (Number.isFinite(base) ? Math.trunc(base) : 1) + 1,
    updatedAt: localDateISO(),
    articles: articles.map(normalizeArticle).filter(Boolean)
  };
}

export function sortArticles(articles) {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
}

export function totalPages(total, perPage = ITEMS_PER_PAGE) {
  return Math.max(1, Math.ceil(Math.max(0, total) / Math.max(1, perPage)));
}

/** 数据变化后把页码收敛到合法范围，避免删除文章后出现空白页。 */
export function clampPage(page, total, perPage = ITEMS_PER_PAGE) {
  const pages = totalPages(total, perPage);
  const n = Number(page);
  if (!Number.isFinite(n)) return 1;
  return Math.min(Math.max(1, Math.trunc(n)), pages);
}

export function paginate(articles, page, perPage = ITEMS_PER_PAGE) {
  const safePage = clampPage(page, articles.length, perPage);
  const start = (safePage - 1) * perPage;
  return { page: safePage, pages: totalPages(articles.length, perPage), items: articles.slice(start, start + perPage) };
}

export function nextId(articles) {
  return articles.reduce((max, a) => Math.max(max, Number(a.id) || 0), 0) + 1;
}

export function escapeHTML(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** 提取纯文本，用于 meta description / OG 描述，避免把 HTML 标签写进属性。 */
export function stripHTML(value) {
  return String(value ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function readStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/** 安全解析 JSON，损坏的缓存/草稿不会让页面崩溃。 */
export function parseJSON(text, fallback = null) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

/* ===== HTML 白名单：构建期（Node）与浏览器端共用同一份规则 ===== */

export const ALLOWED_TAGS = new Set([
  'p', 'div', 'span', 'br', 'hr',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'strong', 'b', 'em', 'i', 'u', 's', 'sup', 'sub',
  'blockquote', 'pre', 'code',
  'ul', 'ol', 'li',
  'a', 'img', 'figure', 'figcaption',
  'table', 'thead', 'tbody', 'tr', 'th', 'td'
]);

export const VOID_TAGS = new Set(['br', 'hr', 'img']);

export const ALLOWED_ATTRS = {
  a: ['href', 'title'],
  img: ['src', 'alt', 'title', 'width', 'height'],
  pre: ['class'],
  code: ['class'],
  div: ['class'],
  span: ['class'],
  th: ['colspan', 'rowspan'],
  td: ['colspan', 'rowspan']
};

export const UNSAFE_PROTOCOL = /^(?:javascript|data|vbscript|file):/i;

const DANGEROUS_BLOCK = /<\s*(script|style|iframe|object|embed|template|noscript|svg|math|form|meta|link|base)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi;
const DANGEROUS_SINGLE = /<\s*(script|style|iframe|object|embed|template|noscript|svg|math|form|meta|link|base)\b[^>]*\/?\s*>/gi;
const ATTR_RE = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'`=<>]+))/g;

/** 保守的字符串消毒，用于无 DOM 的构建期生成静态文章页。 */
export function sanitizeHTMLString(html) {
  let source = String(html ?? '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(DANGEROUS_BLOCK, '')
    .replace(DANGEROUS_SINGLE, '');

  return source.replace(/<\s*(\/?)\s*([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)(\/?)>/g, (_full, closing, rawTag, rawAttrs) => {
    const tag = rawTag.toLowerCase();
    if (closing) return ALLOWED_TAGS.has(tag) ? `</${tag}>` : '';
    if (!ALLOWED_TAGS.has(tag)) return '';

    let attrs = '';
    ATTR_RE.lastIndex = 0;
    let match;
    const allow = ALLOWED_ATTRS[tag] || [];
    while ((match = ATTR_RE.exec(rawAttrs)) !== null) {
      const name = match[1].toLowerCase();
      const value = match[2] ?? match[3] ?? match[4] ?? '';
      if (!allow.includes(name) || name.startsWith('on')) continue;
      if ((name === 'href' || name === 'src') && UNSAFE_PROTOCOL.test(value.replace(/[\u0000-\u0020]+/g, ''))) continue;
      attrs += ` ${name}="${escapeHTML(value)}"`;
    }
    if (tag === 'a') attrs += ' rel="noopener noreferrer"';
    return `<${tag}${attrs}${VOID_TAGS.has(tag) ? ' /' : ''}>`;
  });
}

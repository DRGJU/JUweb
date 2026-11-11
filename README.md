# 墨迹 (JUweb) — 个人博客

零外部依赖的静态博客：原生 HTML / CSS / ES Modules，运行时不加载任何 CDN、框架或字体服务。文章数据以 JSON 为唯一发布源，文章详情页在构建期生成为可分享、可收录的静态页。

## 快速开始

需要 Node.js ≥ 18（仅用于本地预览、构建与测试；部署后不需要 Node）。

```bash
npm start          # 本地预览 http://localhost:8080/
npm run build      # 由 data/articles.json 生成 posts/*.html 与 sitemap.xml
npm test           # 运行核心逻辑单元测试
```

也可以用任意静态服务器（如 `python3 -m http.server 8080`）。**不要用 `file://` 直接打开**：浏览器会拦截 `fetch('./data/articles.json')`。

## 发布文章

后台 `admin.html` 是**本地草稿编辑器**，不是发布后台：所有修改只写入当前浏览器的 localStorage，其他访客看不到，也不会写回仓库。它不设登录，因为没有任何服务端权限需要保护。

正式发布流程：

1. 在 `admin.html` 编辑文章，点「预览草稿」确认效果（`index.html?draft=1` → `preview.html?id=…`）。
2. 点「导出 JSON」，得到 `articles.json`。
3. 用它覆盖 `data/articles.json`，确认 `version` 比旧值大（编辑器导出时会自动 +1）。
4. 运行 `npm run build`，生成/更新 `posts/*.html` 与 `sitemap.xml`。
5. 提交并推送仓库，GitHub Pages 自动发布。

也可以直接手写 `data/articles.json` 后执行第 4–5 步。跨设备编辑用「导出 JSON / 导入 JSON」搬运草稿。

## 数据结构

```json
{
  "version": 2,
  "updatedAt": "2026-11-11",
  "articles": [
    {
      "id": 1,
      "title": "文章标题",
      "excerpt": "列表页摘要",
      "date": "2024-01-01",
      "category": "技术",
      "tags": ["Python", "入门"],
      "content": "<p>支持有限 HTML 的正文</p>"
    }
  ]
}
```

- `version`：发布版本号。首页每次以 `cache: 'no-store'` 拉取 JSON 并与本地缓存比对，因此仓库更新后老访客也能看到新内容；断网时才回退到上次缓存并显示提示。
- `id`：正整数且唯一，决定静态页文件名 `posts/<id>.html`。
- `date`：`YYYY-MM-DD`，新增文章使用**本地时区**日期。
- `content`：渲染前经过白名单消毒（`js/core.js` 的字符串过滤 + `js/sanitize.js` 的 DOM 二次校验），`<script>`、`<iframe>`、`on*` 属性、`javascript:` / `data:` 协议一律移除。

## 目录结构

```
├── index.html          首页（列表 / 分页 / 关于）
├── admin.html          本地草稿编辑器
├── preview.html        草稿文章预览页（noindex）
├── posts/              构建生成的文章静态页
├── css/style.css       全站样式（CSS 变量 + 浅/深主题 + 响应式）
├── js/
│   ├── core.js        纯函数：数据规范化、分页、日期、消毒规则
│   ├── ui.js          主题切换、提示条、页脚年份
│   ├── sanitize.js    浏览器端 DOM 消毒
│   ├── app.js          首页逻辑
│   ├── admin.js        草稿编辑器逻辑
│   └── post.js         文章页 / 草稿预览页逻辑
├── data/articles.json  唯一的发布数据源
├── media/bgyy.mp3      背景音乐（preload="none"，点击才加载）
├── build.mjs           静态页与 sitemap 生成
├── server.mjs          零依赖本地服务器
├── tests/              核心逻辑单元测试
├── favicon.svg / robots.txt / sitemap.xml
├── spec.md / checklist.md / tasks.md
└── LICENSE
```

## 功能说明

- **主题**：导航右侧按钮切换浅/深主题，使用 CSS 变量，偏好保存在 `localStorage`，首屏渲染前应用以避免闪烁；支持 `prefers-reduced-motion`。
- **入场动画**：纯 CSS `animation`，动态插入的文章卡片自动生效，不依赖 IntersectionObserver，不会出现元素永久隐藏。
- **音乐**：`<audio preload="none">`，用户点击才请求 7MB 音频；播放被浏览器拦截时给出提示。如不需要，删除 `media/bgyy.mp3` 与 `index.html` 中的音乐控件即可。
- **SEO / 分享**：每篇文章有独立 URL、canonical、OG 标签与 sitemap；`robots.txt` 排除后台与预览页。
- **安全性**：正文消毒 + 所有用户文本用 `textContent` 写入；后台无鉴权、无服务端写入，不存在越权发布面。

## 部署

GitHub Pages 指向仓库根目录（`main` 分支）。`canonical`、OG URL 与 sitemap 使用 `https://drgju.github.io/JUweb/`；更换域名时请同步修改 `index.html`、`build.mjs` 的 `SITE_URL` 和 `robots.txt`。

## 从旧版仓库迁移

本目录是 v2 的完整项目。若覆盖到已有 `DRGJU/JUweb` 仓库，请一并删除以下旧文件，避免残留死代码与大体积素材：

```
html/index.html、html/admin.html     旧版重复页面（数据路径 404）
js/script.js                        已失效的粒子/视频/侧栏特效
media/bg.mp4、media/touxiang.png    仅旧备份页使用，约 3.4MB
.trae/                              旧版规格归档
```

被新版覆盖的文件：`index.html`、`admin.html`、`css/style.css`、`js/app.js`、`data/articles.json`、`README.md`、`spec.md`、`checklist.md`、`tasks.md`、`.gitignore`。`media/bgyy.mp3` 继续保留。

## 已知限制

- 无后端、无评论、无全文搜索；草稿只在当前浏览器，跨设备需导出/导入。
- 文章内容更新必须重新 `npm run build` 生成静态页，否则首页列表会指向不存在或过时的文章页。
- 无浏览器端的端到端自动化测试；`checklist.md` 中标注「需人工确认」的项目请在目标浏览器中复核。

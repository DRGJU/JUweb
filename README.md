# 墨迹 (JUweb) — 个人博客

零外部依赖的静态博客。文章数据在构建期写成静态 HTML，**关闭 JavaScript 也能完整阅读**；运行时不加载任何 CDN、框架或字体服务。

本次按 Hallmark 做了完整重设计：**Newsprint** 主题（报纸式排版、双线规则、干砖色信号）、**Index-First** 结构，并**移除了浏览器内的文章编辑模块**。网站不再提供后台，发布流程收敛为「编辑 JSON → 构建 → 提交」。

## 快速开始

需要 Node.js ≥ 18（仅用于本地预览、构建与测试；部署后不需要）。

```bash
npm start          # 本地预览 http://localhost:8080/
npm run build      # 由 data/articles.json 生成 index.html、page/*.html、posts/*.html、sitemap.xml
npm test           # 核心逻辑单元测试
```

也可用任意静态服务器（如 `python3 -m http.server 8080`）。不要用 `file://` 直接打开：ES Modules 会被浏览器拦截。

## 发布文章

**没有管理后台**。文章是仓库里的文件，发布只有一条路径：

1. 编辑 `data/articles.json`（字段见下），把 `version` 加一、`updatedAt` 改为当天日期。
2. 运行 `npm run build`。
3. 提交并推送仓库，GitHub Pages 自动发布。

`index.html` 与 `posts/*.html` 是**生成物**，请改 `templates/` 下的模板或 `data/articles.json`，不要直接改生成页。

## 数据结构

```json
{
  "version": 2,
  "updatedAt": "2026-11-11",
  "articles": [
    {
      "id": 1,
      "title": "文章标题",
      "excerpt": "归档页的一行摘要",
      "date": "2024-01-01",
      "category": "技术",
      "tags": ["Python", "入门"],
      "content": "<p>支持有限 HTML 的正文</p>"
    }
  ]
}
```

- `version`：期号，显示在报头与页脚；每次发布递增。
- `id`：正整数且唯一，决定文章页文件名 `posts/<id>.html`。
- `date`：`YYYY-MM-DD`，归档按日期倒序。
- `content`：构建期经白名单消毒后写入静态正文，浏览器端 `js/post.js` 再做一次 DOM 消毒。`<script>`、`<iframe>`、`on*`、`javascript:` 等一律移除。

归档每页 7 篇；超过时构建脚本会生成 `page/2.html` 等分页与对应 sitemap 条目。

## 目录结构

```
├── index.html          生成物：报头 + 首屏 + 文章归档 + 关于 + 页脚
├── posts/              生成物：每篇文章一个独立静态页
├── page/               生成物：归档分页（文章超过 7 篇时出现）
├── templates/
│   ├── index.html      首页 / 分页模板
│   └── post.html       文章页模板
├── css/
│   ├── tokens.css      设计令牌（OKLCH 色阶、字体栈、间距刻度）
│   ├── base.css        Hallmark 基础规则（焦点、容器、reduced-motion 等）
│   └── style.css       页面样式（首行含 Hallmark stamp 与豁免记录）
├── js/
│   ├── core.js         纯函数：数据规范化、分页、日期、白名单消毒规则
│   ├── ui.js           主题切换、年份、提示条
│   ├── app.js          首页渐进增强（主题、音乐）
│   ├── post.js         文章页渐进增强（二次消毒、复制永久链接）
│   └── sanitize.js     浏览器 DOM 白名单消毒
├── data/articles.json  唯一内容源
├── media/bgyy.mp3      背景音乐（preload="none"，点击才加载）
├── build.mjs           静态页生成器
├── server.mjs          零依赖本地服务器
├── tests/              核心逻辑单元测试
├── design.md           锁定的设计系统（新增页面请遵循）
├── favicon.svg / robots.txt / sitemap.xml
└── spec.md / checklist.md / tasks.md
```

## 设计系统

- **主题**：Newsprint（editorial，restrained）。浅新闻纸底、暖黑墨、板衬线标题、书衬线正文、agate 数字；普通分隔用发丝线，大分隔用双线；干砖色只用于链接、焦点环等信号，不作填充。
- **形态**：Index-First。首屏即报头 + 标题 + 一句 + 一个动作，归档行紧随其后；没有卡片、渐变、阴影或入场动画。
- **字体**：`Zilla Slab` / `Spectral` / `Libre Franklin` 优先，未安装时回退到系统中文字体栈。**不请求 Google Fonts**。
- **主题切换**：报头右侧按钮切换浅/深，偏好存 localStorage；深色由同一套色阶派生。
- **音乐**：页脚控件，`preload="none"`，播放被浏览器拦截时给出提示。如不需要，删除 `media/bgyy.mp3` 与模板中的音乐控件即可。
- **可访问性**：`skip-link`、即时焦点环、`aria-pressed` / `aria-current`、`prefers-reduced-motion` 回退、语义化标题层级。

## 部署

GitHub Pages 指向仓库根目录（`main`）。canonical、OG URL 与 sitemap 使用 `https://drgju.github.io/JUweb/`；换域名时同步修改 `build.mjs` 的 `SITE_URL`、模板中的 canonical 与 `robots.txt`。

## 已知限制

- 无后端、无评论、无搜索、无浏览器内编辑；文章改动必须本地构建后提交。
- 文章页是长文，字数不受营销页的 450 词预算约束（Hallmark 的 NOTE 58）。
- 本机无 Chromium 内核浏览器，`sloplint --render` 的渲染层与截图对比未运行；静态规则检查已通过，浏览器目视复核项见 `checklist.md`。

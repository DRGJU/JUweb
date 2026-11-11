# 墨迹 (JUweb) 项目规格说明

> 描述当前实现（v3，Hallmark / Newsprint 重设计）。旧版 Vue 2 + Tailwind CDN、v2 的浏览器内草稿编辑器均已移除。

## 1. 目标与范围

一个静态托管的个人技术博客：报头、首屏、按日期排列的文章归档、关于我、独立文章页、浅/深主题、背景音乐。读者来的目的是**找到并打开一篇文章**。

## 2. 架构

| 项目 | 选型 |
|------|------|
| 渲染 | **构建期静态生成**：`data/articles.json` → `index.html`、`page/*.html`、`posts/*.html` |
| 运行时 JS | 渐进增强，仅主题切换、音乐控件、文章页二次消毒与复制链接 |
| 样式 | 自有 CSS，三层：`tokens.css`（设计令牌）、`base.css`（Hallmark 基础）、`style.css`（页面） |
| 字体 | 本地字体栈，零外部请求 |
| 工具链 | Node.js ≥ 18（仅本地构建、预览、测试），零第三方依赖 |

**关键约束：脚本关闭时，首页归档与文章正文仍完整可见（Hallmark Floor 62）。** 运行时不再 `fetch` 文章数据。

## 3. 页面规格

### 3.1 首页 `index.html`

- 报头：字标「墨迹」、期号与更新日期、导航（文章 / 关于 / 主题切换），双线规则收口。
- 首屏（Index posture）：标题「白天写代码，晚上写文章。」、一句说明、主按钮「读最新一篇」，右侧以大字号排最新文章标题与日期。
- 归档区：`h2 文章归档` + 篇数，下面为静态文章行。每行含日期（tabular 数字）、标题链接、摘要、分类与标签、一个阅读链接；行间发丝线。
- 关于我：两栏排版的原有自述与 GitHub 链接。
- 页脚（statement close）：「用文字丈量世界」、年份、期号、音乐控件与真实链接。
- 保留的脚本钩子：`#articleList`、`#pagination`、`#articleCount`、`#notice`、`#year`、`#themeToggle`、`#playBtn`、`#pauseBtn`、`#bgMusic`。

### 3.2 文章页 `posts/<id>.html`

- 独立 `title`、`description`、canonical、OG、`article:published_time`。
- 报头、返回目录链接、大标题、分类与日期、标签、静态消毒后的正文。
- 内嵌 `<script type="application/json" id="post-data">` 供 `post.js` 二次渲染（正文已静态存在，脚本失败也不影响阅读）。
- 保留 `#postTitle`、`#postCategory`、`#postDate`、`#postTags`、`#postContent`、`#postActions`、`#post-data`、`#notice`、`#year`。

### 3.3 归档分页 `page/<n>.html`

文章超过 7 篇时生成，使用首页模板，资源路径自动加 `../` 前缀，canonical 指向自身。

## 4. 数据契约

见 `README.md`。规范化、排序、分页、日期与消毒规则集中在 `js/core.js`；`build.mjs` 与单元测试共用同一份实现。`version` 只用于期号展示，不再承担浏览器缓存校验职责（静态页由构建保证新鲜）。

## 5. 安全

- 构建期 `sanitizeHTMLString()` + 浏览器 `sanitizeHTML()` 双重白名单。
- 白名单标签：`p/div/span/br/hr/h1-h6/strong/b/em/i/u/s/sup/sub/blockquote/pre/code/ul/ol/li/a/img/figure/figcaption/table/...`；属性仅 `href/title/src/alt/width/height/class/colspan/rowspan`。
- 移除 `on*`、`style`、`srcdoc` 与 `javascript:` / `data:` / `vbscript:` / `file:` 协议；外链加 `rel="noopener noreferrer"`。
- 标题、摘要、分类、标签一律 `escapeHTML` 后写入静态 HTML。
- 无表单、无服务端写入、无鉴权面。

## 6. 设计系统（锁定于 `design.md`）

- 主题 Newsprint，genre editorial，posture restrained，shape Index-First，draw `9a8543`，hero Index，nav edge-aligned，footer statement。
- 所有颜色与字体走 `:root` 令牌；间距走 `--space-*`；容器上限 `--container`；`html`/`body` 设 `overflow-x: clip`。
- 只使用 `transform` / `opacity` 做状态反馈；主题动效为「仅状态」，无入场动画；`prefers-reduced-motion` 有回退。
- 一页一个主按钮、一个容器宽度、一个嵌套圆角层级；章节之间用发丝线与双线交替，不用卡片套卡片。

## 7. 响应式与 SEO

- 断点：60rem 时首屏与关于改单栏、归档行收起第三列；40rem 时归档行单列、报头竖排。
- 每篇文章独立 URL、canonical、OG 与 sitemap；`robots.txt` 只声明 sitemap（后台与预览页已删除）。

## 8. 不在范围内

- 服务端、数据库、登录、评论、全文搜索、Markdown 编辑器、浏览器内文章编辑。
- 照片、指标、证言、轮播、视频背景、粒子与鼠标特效。
- 浏览器渲染层的自动化截图审查（本机无 Chromium 内核浏览器）。

# 墨迹 (JUweb) — 个人博客

零外部依赖的静态博客。文章数据在构建期写成静态 HTML，**关闭 JavaScript 也能完整阅读**；运行时不加载任何 CDN、框架或字体服务。

站点沿用 **Newsprint 编辑风**（暖纸底、衬线正文、1px 发丝线与 3px 双线、直角、无卡片阴影）。2026-11 曾短暂改为深色科技风，已按用户要求恢复为精简的 Newsprint 主题；信息结构仍是 Index-First。**已移除浏览器内的文章编辑模块**，网站不提供后台，发布流程收敛为「编辑 JSON → 构建 → 提交」。

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
├── index.html          生成物：报头 + 首屏 + 文章归档 + 刊记 band（关于合并页脚）
├── posts/              生成物：每篇文章一个独立静态页
├── page/               生成物：归档分页（文章超过 7 篇时出现）
├── float-controls.preview.html  两枚悬浮按钮的八态预览（noindex）
├── templates/
│   ├── index.html      首页 / 分页模板
│   ├── post.html       文章页模板
│   └── controls.html   两枚悬浮按钮的共享片段
├── css/
│   ├── tokens.css      设计令牌（暖纸 / 墨色调色板、衬线字体栈、间距刻度）
│   ├── base.css        基础层（纸面底、焦点、容器、reduced-motion）
│   ├── float-controls.css  圆形悬浮按钮（干砖色信号 + 八态）
│   └── style.css       页面样式（报头、按钮、归档行、刊记 band）
├── js/
│   ├── core.js         纯函数：数据规范化、分页、日期、白名单消毒规则
│   ├── ui.js           主题切换、年份、提示条
│   ├── controls.js     两枚悬浮控件的共享逻辑
│   ├── app.js          首页渐进增强（主题 + 控件）
│   ├── post.js         文章页渐进增强（二次消毒 + 控件）
│   └── sanitize.js     浏览器 DOM 白名单消毒
├── data/articles.json  唯一内容源
├── media/bgyy.mp3      背景音乐（preload="none"，点击才加载）
├── build.mjs           静态页生成器
├── server.mjs          零依赖本地服务器
├── tests/              核心逻辑单元测试
├── design.md           设计系统（Newsprint 编辑风：令牌、双线、刊记、文章页排版）
├── favicon.svg / robots.txt / sitemap.xml
└── spec.md / checklist.md / tasks.md
```

## 设计系统

- **主题**：Newsprint 编辑风。暖纸底、暖黑墨、干砖色只作信号色；1px 发丝线分隔、3px 双线收口，直角、无卡片、无阴影、无渐变。
- **形态**：Index-First。首屏即报头 + 标题 + 一句 + 一个动作，归档行紧随其后；收尾是把「关于我」与页脚合并的刊记 band（超大刊名字标 + 自述 + 真实刊记表）。
- **文章页**：标题区保持全宽原样（标题 26ch），正文在 1440px 容器内铺满（16px / 1.75 行高），不收进窄阅读栏；代码块为 `--color-paper-2` 浅底 + 等宽字体；表格为发丝线网格、表头以双线收口。
- **字体**：显示与正文用衬线栈（`Zilla Slab` / `Spectral` / `Noto Serif SC`，缺失时回退系统衬线），代码用等宽栈。**不请求 Google Fonts**。
- **主题切换**：报头右侧「深色 / 浅色」按钮，默认浅色；深色由同一套色阶派生，不反转色相。
- **悬浮控件**：左下圆形音乐按钮（`preload="none"`，点击才加载，播放中双环转干砖色）；右下圆形回到顶部按钮（页首隐藏，滚动超过 240px 后出现）。两者都是纸面底 + 墨色同心环、八态齐全，样式与逻辑见 `css/float-controls.css` / `js/controls.js`，八态预览见 `float-controls.preview.html`。如不需要音乐，删除 `media/bgyy.mp3` 与 `templates/controls.html` 中的音乐按钮即可。
- **可访问性**：`skip-link`、即时焦点环、`aria-pressed` / `aria-current`、`prefers-reduced-motion` 回退、语义化标题层级。

## 部署

GitHub Pages 指向仓库根目录（`main`）。canonical、OG URL 与 sitemap 使用 `https://drgju.github.io/JUweb/`；换域名时同步修改 `build.mjs` 的 `SITE_URL`、模板中的 canonical 与 `robots.txt`。

## 已知限制

- 无后端、无评论、无搜索、无浏览器内编辑；文章改动必须本地构建后提交。
- 文章页是长文，字数不受营销页的篇幅预算约束。
- 本机无 Chromium 内核浏览器，未做像素级渲染验证；已验证范围为构建、单元测试、CSS 令牌引用与 HTTP 资源可达性，目视复核项见 `checklist.md`。
- GitHub Pages 的 CDN 缓存约 10 分钟，刚推送后可能仍看到旧版本。

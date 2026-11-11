# 墨迹 (JUweb) 项目规格说明

> 本文件描述**当前实现**（v2，零依赖静态博客）。旧版 Vue 2 + Tailwind CDN + 视频背景/粒子特效的规格已废弃，不再作为验收依据。

## 1. 目标与范围

一个可静态托管的个人技术博客：文章列表、分页、独立文章页、关于我、浅/深主题、背景音乐，以及一个**只作用于本地**的草稿编辑器。

## 2. 技术架构

| 项目 | 选型 |
|------|------|
| 页面 | 原生 HTML5，语义标签 + ARIA |
| 样式 | 自有 CSS（`css/style.css`），CSS 变量驱动浅/深主题 |
| 脚本 | 原生 ES Modules，无框架、无打包器、无运行时依赖 |
| 字体 | 系统字体栈（不请求 Google Fonts） |
| 数据源 | `data/articles.json`（带 `version`） |
| 发布 | 构建期生成 `posts/*.html` + `sitemap.xml` |
| 工具链 | Node.js ≥ 18（仅本地：`server.mjs` / `build.mjs` / 单元测试） |

**运行时外部依赖：0。** 首页、后台、文章页均不加载 CDN 资源。

## 3. 页面规格

### 3.1 首页 `index.html`

- 固定导航：Logo、文章、草稿编辑、主题切换按钮；`skip-link` 跳到正文。
- 每次加载以 `cache: 'no-store'` 请求 `data/articles.json`；失败时回退 `localStorage` 缓存并显示提示条。
- 文章按日期倒序，每页 7 篇；页码在数据变化后收敛到合法范围。
- 卡片为 `<a>`，指向 `posts/<id>.html`（草稿模式指向 `preview.html?id=<id>`），键盘可达、可复制链接。
- 入场动画使用纯 CSS `animation`，动态节点同样生效。
- 关于我模块、动态年份页脚、背景音乐按钮（`preload="none"`）。

### 3.2 文章页 `posts/<id>.html`（构建生成）

- 独立 `<title>`、`description`、canonical、OG、`article:published_time`。
- 正文**直接写入静态 HTML**（构建期白名单消毒），无需 JS 即可被抓取；`post.js` 再做一次 DOM 消毒渲染并填充「复制永久链接」按钮。
- `noindex` 不适用于文章页；`admin.html` 与 `preview.html` 设置 `noindex`。

### 3.3 草稿编辑器 `admin.html`

- 顶部横幅明确说明：**修改不发布**，只写当前浏览器 localStorage。
- 功能：列表、新增、编辑、删除、重置、导出 JSON、导入 JSON、预览草稿、放弃草稿。
- 无登录/权限检查：不存在服务端权限模型，旧版 `isAdmin` 式的伪鉴权已移除。
- 表单必填校验；标签以中英文逗号分隔；日期取本地日历日；`JSON.parse` 全部走安全解析。
- 导出数据 `version = 当前发布版本 + 1`。

### 3.4 草稿预览 `preview.html`

- 从 localStorage 草稿按 `id` 读取并消毒渲染，供发布前检查；`noindex`。

## 4. 数据契约

见 `README.md`。规范化规则集中在 `js/core.js`：兼容旧版数组格式，过滤非法 `id`、补齐缺失字段、非法日期回退到本地今天。

缓存策略：发布源始终以网络为准（`no-store` + 版本号），localStorage 仅作为离线回退；草稿与发布数据使用不同的存储键，互不污染。

## 5. 安全规格

- 唯一允许插入 HTML 的位置是文章正文，且必须经过 `sanitizeHTMLString()` + `sanitizeHTML()` 两道白名单。
- 白名单标签：`p/div/span/br/hr/h1-h6/strong/b/em/i/u/s/sup/sub/blockquote/pre/code/ul/ol/li/a/img/figure/figcaption/table/...`。
- 白名单属性仅 `href/title/src/alt/width/height/class/colspan/rowspan`；移除所有 `on*`、`style`、`srcdoc` 与 `javascript:` / `data:` / `vbscript:` / `file:` 协议；外链自动加 `rel="noopener noreferrer"`。
- 其他所有用户可控文本（标题、摘要、分类、标签）均用 `textContent` 写入 DOM。
- `server.mjs` 做路径规范化与目录穿越防护；仅用于本地预览。

## 6. 响应式与可访问性

- 断点：≤768px 后台双栏改单栏；≤640px 收紧容器、导航与卡片间距。
- `prefers-reduced-motion: reduce` 时关闭动画与平滑滚动。
- `:focus-visible` 焦点样式、按钮 `aria-label` / `aria-pressed` / `aria-current`、分页 `aria-label`、状态区 `role="status"`。

## 7. 部署规格

- GitHub Pages 根目录静态托管；无构建服务依赖，`posts/` 与 `sitemap.xml` 需提交到仓库。
- 站点地址常量：`build.mjs` 的 `SITE_URL`；同步维护 `index.html` canonical/OG 与 `robots.txt` 的 sitemap 地址。

## 8. 不在范围内

- 服务端、数据库、真实用户认证、评论、全文搜索、Markdown 编辑器（正文为受限 HTML）。
- 视频背景、粒子文字、全息头像、侧边栏、鼠标拖尾等旧版特效（已随 v2 移除，相关死代码不再保留）。

# 项目检查清单

标记说明：`[x]` = 静态检查或 `npm test` 已验证；`[ ]` = 需在真实浏览器中人工确认。

## 构建与数据

- [x] `npm run build` 生成 `index.html`、4 个文章页与 `sitemap.xml`
- [x] `npm test` 11/11 通过；全部 JS 通过 `node --check`
- [x] `data/articles.json` 合法，带 `version` / `updatedAt` / `articles`
- [x] 文章 id 唯一，字段齐全，分页与日期逻辑有单元测试
- [x] 页面在构建期静态写出，**关闭 JavaScript 仍可读归档与正文**
- [x] HTML 中的模板占位符全部被替换，无残留 `{{...}}`
- [x] 资源引用在本地服务器全部返回 200

## 功能

- [x] 首页归档按日期倒序，每篇有真实链接
- [x] 文章页有独立 URL、canonical、OG 与静态正文
- [x] 主题切换持久化，报头按钮有 `aria-pressed`
- [x] 音乐改为左下角圆形悬浮按钮，`preload="none"`，播放失败有错误态与提示
- [x] 右下角新增圆形「回到顶部」按钮：页首隐藏、滚动超过 240px 出现、点击平滑回顶后隐藏并把焦点交回正文
- [x] 两枚按钮八态齐全（默认 / 悬停 / 焦点 / 按下 / 禁用 / 加载 / 错误 / 成功），预览见 `float-controls.preview.html`
- [x] 双线同心环在深色主题、`prefers-reduced-motion` 与 40rem 断点下均有对应规则
- [x] **浏览器内文章编辑模块已移除**（`admin.html` / `preview.html` / `js/admin.js` 及全部入口链接）
- [ ] 浏览器中确认主题切换、音乐播放、复制永久链接
- [ ] 移动端（≤640px）与平板（≤768px）布局目视检查
- [ ] Chrome / Firefox / Safari / Edge 兼容性目视检查

## 安全

- [x] 正文双重白名单消毒；单元测试覆盖 `<script>`、`on*`、`javascript:`、`<iframe>`
- [x] 其余用户文本一律 `escapeHTML` 或 `textContent`
- [x] 无表单、无凭证、无服务端写入

## Hallmark 重设计

- [x] 主题 `Newsprint`（deal 3/3）、形态 `Index-First`、draw `9a8543` 已写入 CSS stamp
- [x] 设计令牌与基础层由 scaffold 生成（`css/tokens.css`、`css/base.css`）
- [x] 旧版基线已记录于 `.hallmark/before.json`（7 FAIL / 1 REFLEX / 10 WARN）
- [x] `sloplint --kept` 静态扫描：**0 FAIL、0 WARN、0 REFLEX**
- [x] 悬浮控件 `sloplint --scope component`：**0 FAIL、0 REFLEX、0 WARN**（八态预览 `float-controls.preview.html`）
- [x] 1 项 `ANSWERED F1`（文章中的直引号是 Python 代码示例，替换会破坏示例）
- [x] 2 项 `NOTE 58`（文章页长文，不受营销页字数预算约束）
- [x] Kept 检查：链接 3/4（`admin.html` 已按用户要求在 stamp 中登记删除），脚本钩子 6/6
- [x] 首行 stamp、pre-emit critique、豁免与删除记录齐备
- [ ] `sloplint --render` 渲染层与 hero/finish 截图审查：本机无 `puppeteer-core`，未运行

## 仓库卫生

- [x] `.gitignore` 忽略 `.inspect/`、`.deploy/`、`.hallmark/`
- [x] `LICENSE`（MIT）、`design.md`、`robots.txt`、`favicon.svg` 齐备
- [x] README / spec / checklist / tasks 与实现一致

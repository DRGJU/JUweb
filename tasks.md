# 任务与维护记录

## v3 · Hallmark 重设计（本次完成）

- [x] 按用户要求移除浏览器内文章编辑模块：`admin.html`、`preview.html`、`js/admin.js` 及导航入口
- [x] 发布流程收敛为「编辑 `data/articles.json` → `npm run build` → 提交」
- [x] 重做整体框架：模板驱动的构建期静态生成（`templates/` → `index.html` / `posts/` / `page/`）
- [x] 首页改为 Index-First 报纸式结构：报头、首屏、日期归档行、两栏关于、statement 页脚
- [x] 采用 Newsprint 主题：双线规则、发丝线、干砖色信号、板衬线标题、本地字体栈
- [x] Hallmark scaffold 生成 `css/tokens.css` 与 `css/base.css`；`css/style.css` 首行写入 stamp、critique 与豁免
- [x] 保留全部脚本钩子（6/6）与真实链接；删除项在 stamp 中登记
- [x] 静态规则检查 0 FAIL / 0 WARN / 0 REFLEX；`npm test` 11/11；`npm run build` 成功
- [x] 重写 README / spec / checklist / tasks / robots.txt，新增 `design.md`

## 历史

- v2：零依赖静态博客，带本地草稿编辑器与文章页（已被 v3 取代）。
- v1：Vue 2 + Tailwind Play CDN + 视频背景/粒子特效（已废弃）。

## 后续可选

- [ ] 安装 `puppeteer-core` 后补 Hallmark 渲染层与截图对比审查
- [ ] 浏览器端人工复核移动端布局与各浏览器排版
- [ ] 支持 Markdown 正文、代码高亮、标签筛选或归档页
- [ ] 若不需要背景音乐，删除 `media/bgyy.mp3` 与模板中的音乐控件

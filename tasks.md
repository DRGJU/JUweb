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

## v3.1 · 悬浮控件（本次完成）

- [x] 背景音乐从页脚移到**左下角圆形悬浮按钮**；右下角新增**圆形回到顶部按钮**
- [x] 两枚按钮采用双线同心环 + 线性图标，播放中双环转干砖色；桌面 52px、手机 44px
- [x] 回到顶部改为页首隐藏（而非禁用），滚动超过 240px 显示；点击后隐藏并把焦点交回正文
- [x] 新增 `css/float-controls.css`、`templates/controls.html`、`js/controls.js` 与八态预览 `float-controls.preview.html`
- [x] 首页与文章页共享控件；`design.md` 记录圆形是用户对 Newsprint 直角规则的明确例外
- [x] Hallmark 组件级检查 `--scope component`：**0 FAIL / 0 REFLEX / 0 WARN**；页面级 `--kept` 回归仍为 0 FAIL / 0 REFLEX

## v3.2 · 首页刊记 band（本次完成）

- [x] 用户提供三种合并方案并选择 **A · 报尾刊记**：关于我与页脚合并为唯一一处换纸 band
- [x] 三栏结构：超大刊名字标 + 标语 / 两段自述 / 刊记表（收录、本期、更新、起始、去处）
- [x] `build.mjs` 注入由数据推导的 `FIRST_DATE`；刊记表只用真实值，不新增指标
- [x] 文章页保留简化 statement 页脚，不重复作者自述；`design.md` 登记超大字标与换纸 band 例外
- [x] CSS stamp 记录方案 A；保留全部 id、脚本钩子与真实链接

## v3.3 · 文章页阅读栏（本次完成）

- [x] 用户要求文章内容居中且宽度合适：按阅读栏居中实现（非文字居中对齐）
- [x] `templates/post.html` 为 `article` 增加 `post__article`；`css/style.css` 设 68ch 居中、标题与正文填满该栏
- [x] README / spec / checklist / design.md 同步说明

## 历史

- v2：零依赖静态博客，带本地草稿编辑器与文章页（已被 v3 取代）。
- v1：Vue 2 + Tailwind Play CDN + 视频背景/粒子特效（已废弃）。

## 后续可选

- [ ] 安装 `puppeteer-core` 后补 Hallmark 渲染层与截图对比审查
- [ ] 浏览器端人工复核移动端布局与各浏览器排版
- [ ] 支持 Markdown 正文、代码高亮、标签筛选或归档页
- [ ] 若不需要背景音乐，删除 `media/bgyy.mp3` 与模板中的音乐控件

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

## v3.4 · 标题区恢复原样（本次完成）

- [x] 用户要求文章页标题部分恢复成改动前的样子：移除 `post__article` 包裹，标题恢复 `max-width: 26ch`，双线恢复横跨全宽
- [x] 正文改为全宽：` .post__body { max-width: none; }` 并 `.post__body p { max-width: none; }`，取消居中
- [x] design.md / README / spec / checklist / tasks 同步说明；改完直接推送 main

## 历史

- v2：零依赖静态博客，带本地草稿编辑器与文章页（已被 v3 取代）。
- v1：Vue 2 + Tailwind Play CDN + 视频背景/粒子特效（已废弃）。

## v3.5 · 插图约定（本次确认）

- [x] 用户确认：插图**可以插入**，但**不使用 AI 渲染生成**；改用网络检索的免费授权图（Pexels / Unsplash 等）
- [x] 当前沙箱除 GitHub 外无法访问外网，故采用**外链图床直链**（非 AI 生成本地图），并注明来源与授权
- [x] 《Python 装饰器详解》(id=8) 已插入 Pexels 代码屏幕题图（Antonio Batinić，免费授权）

## v3.6 · 每篇新文章默认配图（本次确认）

- [x] 用户要求：**以后每篇新文章都要插图**（网络检索免费授权图，不 AI 生成）
- [x] 《用沙箱验证程序》(id=9) 补插 Pexels 题图（peaky，免费授权，`pexels-photo-31343288`）
- [x] `design.md` 将 Imagery 改为"每篇新文章默认配图"；`tasks.md` 记录本决议
- [ ] 后续新增文章均按此约定配图（外链图床直链 + figcaption 注明来源）
- [x] 题图题材偏好：优先选用有设计感、构图克制的**建筑物 / 建筑摄影**（architecture）；文章有明确可视主题时仍以主题相关图优先，建筑图作通用兜底

## v3.7 · 代码块视觉强化（Hallmark 组件级优化，2026-11-13）

- [x] 用户反馈「代码块看起来不明显」→ 定位根因：深色主题下 `--color-graphite` 与底色 `#060910` 亮度差极小、边框过暗、行内 code 底色近乎透明
- [x] `css/tokens.css` 新增 `--color-code-bg/ink/rule/edge` 与 `--shadow-glow-hover`，明暗两主题各一份
- [x] `css/style.css` 重写代码块：深底反相 + 上缘 3px 青色双线（系统「主要分隔」）+ 1px 细边 + 上直角下圆角；行内 code 改亮墨字 + 淡青底 + 青色细边；补 `:focus-visible`、`overscroll-behavior-inline`、`tab-size`、细滚动条
- [x] 顺带清掉 v2 重构遗留的 4 个 Hallmark Floor FAIL：stamp 首行格式、导航下划线 `right` 过渡改 `transform: scaleX`、`.btn:hover` 与 `.float-btn` 两处颜色字面量提升为令牌
- [x] `design.md` 新增「代码块组件」小节锁定规范
- [x] 校验：sloplint `0 FAIL`（6 REFLEX / 1 WARN 均为 v2 既定视觉语言，未在本次范围改动）、`npm run build` v18、`npm test` 11/11、CSS 括号平衡

## 后续可选

- [ ] 安装 `puppeteer-core` 后补 Hallmark 渲染层与截图对比审查
- [ ] 浏览器端人工复核移动端布局与各浏览器排版
- [ ] 支持 Markdown 正文、代码高亮、标签筛选或归档页
- [ ] 若不需要背景音乐，删除 `media/bgyy.mp3` 与模板中的音乐控件

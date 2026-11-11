# 任务与维护记录

## v2 重构（本次完成）

- [x] 移除 Vue 2 / Tailwind Play CDN / Google Fonts，改为零外部依赖的原生实现
- [x] 修复动态 `.reveal` 元素未被 IntersectionObserver 观察导致的文章隐形问题
- [x] 移除 `html/` 重复页面与备份页 404 数据路径
- [x] 删除失效的视频背景、粒子、侧边栏、点击涟漪等死代码及不一致的 CSS 变量
- [x] 数据改为发布源 + 本地草稿双通道，消除 localStorage 缓存遮蔽与「伪发布」
- [x] 移除 `isAdmin` 伪鉴权，后台明确标注为本地草稿编辑器
- [x] 正文双重白名单消毒，补齐 CSP 之外的注入防护
- [x] 修复 UTC 日期、硬编码年份、分页越界、JSON.parse 无保护等问题
- [x] 新增独立文章静态页、canonical / OG / sitemap / robots / favicon
- [x] 新增 `build.mjs`、`server.mjs`、`package.json` 与核心单元测试
- [x] 重写 README / spec / checklist，修复 `.gitignore`，添加 LICENSE

## 后续可选

- [ ] 补端到端浏览器测试（需安装 Playwright 或提供可用浏览器）
- [ ] 支持 Markdown 正文与代码高亮
- [ ] 文章搜索 / 标签筛选 / 归档页
- [ ] 内容安全策略（CSP）响应头（需要托管平台支持自定义头）
- [ ] 若不需要背景音乐，删除 `media/bgyy.mp3` 与首页音乐控件以减小仓库体积

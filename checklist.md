# 项目检查清单

标记说明：`[x]` = 已通过静态检查或 `npm test` 自动化验证；`[ ]` = 需在真实浏览器中人工确认（当前环境无可用浏览器，未做端到端渲染测试）。

## 代码与数据

- [x] 所有页面有 DOCTYPE、`lang="zh-CN"`、`charset`、`viewport`
- [x] 所有资源路径为相对路径且指向存在的文件（由构建/引用检查验证）
- [x] `data/articles.json` 为合法 JSON，带 `version` / `updatedAt` / `articles`
- [x] 文章 `id` 唯一、字段齐全、类型一致（单元测试覆盖）
- [x] 兼容旧版数组格式，过滤坏数据（单元测试覆盖）
- [x] 分页越界收敛、切片正确（单元测试覆盖）
- [x] 日期使用本地日历而非 UTC（单元测试覆盖）
- [x] `JSON.parse` 全部使用安全解析，损坏缓存不会导致白屏
- [x] JS 通过 `node --check` 语法检查；`npm test` 全部通过
- [x] 构建脚本可重复执行，生成 `posts/*.html` 与 `sitemap.xml`

## 功能

- [x] 首页每次以 `no-store` 拉取发布数据，离线回退缓存并提示
- [x] 文章卡片为真实链接，可分享、可用键盘访问
- [x] 入场动画为纯 CSS，动态节点不会永久隐藏
- [x] 后台增删改查、导入/导出/放弃草稿、表单必填校验
- [x] 后台明确标注「本地草稿、不发布」，无伪鉴权
- [x] 主题切换持久化，首屏渲染前应用
- [x] 音乐 `preload="none"`，播放失败有提示
- [ ] 浏览器中确认列表、分页、文章页、草稿预览的实际渲染
- [ ] 浏览器中确认主题切换、音乐播放、复制永久链接
- [ ] 移动端（≤640px）与平板（≤768px）布局目视检查
- [ ] Chrome / Firefox / Safari / Edge 兼容性目视检查

## 安全

- [x] 正文双重白名单消毒（构建期字符串 + 浏览器 DOM）
- [x] 单元测试覆盖 `<script>`、`on*`、`javascript:`、`<iframe>` 清除
- [x] 其余用户文本一律 `textContent`
- [x] 外链 `rel="noopener noreferrer"`
- [x] 无硬编码凭证、无敏感信息、无服务端写入
- [ ] 在浏览器中对恶意草稿内容做一次人工渗透验证

## SEO / 部署

- [x] 首页与文章页有 `title` / `description` / canonical / OG
- [x] 每篇文章有独立静态 URL 与 `sitemap.xml`
- [x] `robots.txt` 排除后台与预览页
- [x] `favicon.svg` 存在
- [x] 线上资源全部返回 200（旧版仓库验证过；新版部署后需复核）
- [ ] 推送到 GitHub Pages 后复核线上首页与文章页

## 仓库卫生

- [x] `.gitignore` 无语法错误，忽略 `.inspect/` 对照快照与临时文件
- [x] 添加 `LICENSE`（MIT）
- [x] 文档与实现一致；删除旧版重复页面与失效特效代码
- [x] 无 `package-lock.json` / 构建产物误提交（无第三方依赖）
- [x] 媒体资源仅保留被引用的 `bgyy.mp3`；旧版 `bg.mp4`、`touxiang.png` 未纳入新版

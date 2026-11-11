# 墨迹 · 设计系统（锁定）

新增页面遵循本文件。`css/tokens.css` 与 `css/base.css` 是唯一令牌与基础规则来源，不要在新页面里另写颜色、字体或间距字面量。

## 方向

- **主题**：Newsprint（editorial / restrained），deal 3/3，seed `personal-blog-index-where-1add·f218979e·2026-11-11·r0`。
- **形态**：Index-First，draw `9a8543`。首屏即索引，无叙事铺陈、无 hero 图片。
- **首屏姿态**：Index（标题、一句、一个动作；归档行紧随）。
- **Chrome**：nav 为 edge-aligned 报头（字标、期号、链接、主题按钮），双线规则收口；footer 为 statement close（一句大字 + 期号 + 音乐控件 + 真实链接）。
- **Signature**：双线规则下按日期排列的归档行，日期用 agate 数字。
- **Imagery**：none。用字号、规则、栏宽构造体量，不放插画、渐变或空图片槽。

## 规则

- 所有颜色走 `--color-*`（OKLCH，暖新闻纸 + 暖黑墨，干砖色只作信号）；字体走 `--font-*`；字号走 `--text-*`；间距走 `--space-*`；容器用 `.container`。
- 普通分隔 1px 发丝线，主要分隔 3px 双线；不用卡片、阴影、圆角、渐变。
- 一个页面一个 filled primary；其余动作为文字链接。链接 hover 只加粗下划线；焦点环即时、无过渡。
- 只过渡 `background-color` 与 `transform`；主题动效为「仅状态」，无入场动画；`prefers-reduced-motion` 必须回退。
- 标签、日期、导航一律正文面孔、小一号、句式大小写，不用全大写或字距拉伸；不用 eyebrow、中点串、箭头后缀、装饰圆点。
- 内容在构建期写成静态 HTML；JS 只做增强，脚本失败时页面仍完整可读。

## 页面差异

| 页面 | 首屏 | 主体 |
|------|------|------|
| `index.html` / `page/*.html` | Index，标题 + 一句 + 读最新一篇 | 归档行、两栏关于 |
| `posts/*.html` | 文章标题 + dateline | 单栏 68ch 正文、返回目录 |

两者共享报头、页脚、令牌与排版尺度，只在主体结构上不同。

## 材料

真实：4 篇文章及其日期、分类、标签、摘要、正文；作者自述两段；GitHub 链接；期号与更新日期。
缺失（不得虚构）：照片、指标、证言、logo、引用语、价格。

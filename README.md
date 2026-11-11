# 墨迹 (JUweb) — 个人博客

一个基于 Vue.js + Tailwind CSS 的个人技术博客，支持文章展示、分页、详情阅读与本地管理后台。

## 功能特性

- 📝 博客文章展示（列表 + 详情 + 分页）
- 🛠️ 文章管理后台（增删改查，需管理员权限）
- 💾 数据持久化：首次从 `data/articles.json` 加载，之后缓存在 localStorage
- 🎵 背景音乐播放控制
- ✨ 滚动显现动画（IntersectionObserver）
- 📱 响应式布局

## 快速开始

本项目为纯静态站点，无需构建。任选一种方式启动本地服务器后访问：

```bash
# 方式一：Python
python3 -m http.server 8080

# 方式二：Node.js
npx serve .
```

然后打开浏览器访问 `http://localhost:8080/index.html`。

> 注意：直接以 `file://` 协议打开会导致 `fetch('./data/articles.json')` 失败，请使用本地服务器。

## 管理后台

在浏览器控制台执行以下命令开启管理员权限，然后访问 `admin.html`：

```js
localStorage.setItem('isAdmin', 'true');
```

## 目录结构

```
JUweb/
├── index.html          # 博客首页（主版本，纯内容页）
├── admin.html          # 文章管理页面
├── css/
│   └── style.css       # 自定义样式（reveal / 卡片 / 分页 / 音乐控件等）
├── data/
│   └── articles.json   # 默认文章数据
├── html/               # 旧版页面备份（含视频背景 Hero 设计）
│   ├── index.html
│   └── admin.html
├── js/
│   ├── app.js          # Vue 应用核心逻辑（文章加载 / 分页 / 详情）
│   └── script.js       # 特效与工具函数（滚动显现 / 音乐控制等）
├── media/              # 音频 / 视频 / 图片素材
├── spec.md             # 项目规格说明
├── checklist.md        # 质量检查清单
└── tasks.md            # 任务记录
```

## 技术栈

| 类别 | 选型 |
|------|------|
| 前端框架 | Vue.js 2.6.14 (CDN) |
| CSS 框架 | Tailwind CSS Play CDN（含内联自定义色板配置） |
| 字体 | Cormorant Garamond / Noto Sans SC (Google Fonts) |
| 数据存储 | localStorage + JSON |

## 文档

详细规格见 [spec.md](./spec.md)，质量清单见 [checklist.md](./checklist.md)。

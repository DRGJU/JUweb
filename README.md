# Python 博客 - 前端框架 + 本地存储方案

## 项目结构

```
JUweb/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 原有的JavaScript文件
├── articles.json       # 文章数据JSON文件（用于迁移）
├── vue.min.js          # Vue.js 库
├── app.js              # 新的Vue应用
└── admin.html          # 文章管理页面
```

## 实现步骤

### 1. 迁移现有文章到JSON文件

首先，创建 `articles.json` 文件，将现有文章数据从 `script.js` 中迁移出来：

```json
[
  {
    "id": 1,
    "title": "Python 入门教程：从零开始掌握 Python 基础",
    "excerpt": "Python 是一门简洁优雅、功能强大的编程语言，非常适合作为第一门编程语言。本文将从环境搭建讲起，带你逐步掌握变量、数据类型、流程控制、函数等核心语法，为后续深入学习打下坚实基础。",
    "date": "2026-03-24",
    "category": "技术",
    "tags": ["Python", "入门教程", "编程基础"],
    "content": "<p>Python 是一门简洁优雅、功能强大的编程语言。无论你是编程新手还是想学习一门新语言的开发者，Python 都是一个非常棒的选择。</p>..."
  },
  {
    "id": 2,
    "title": "Pythonic 的高效方法和技巧与魔法",
    "excerpt": "Python 以其优雅的语法和强大的表达能力而闻名。本文将深入探讨 Pythonic 的编程风格，分享一系列提高代码效率、可读性和简洁性的技巧和魔法，帮助你写出更符合 Python 哲学的高质量代码。",
    "date": "2026-03-24",
    "category": "技术",
    "tags": ["Python", "Pythonic", "技巧", "魔法"],
    "content": "<p>Pythonic 是一个经常被提及但有时难以定义的概念。简而言之，它指的是一种符合 Python 语言哲学的编程风格，强调代码的可读性、简洁性和优雅性。本文将介绍一些 Pythonic 的高效方法和技巧，帮助你写出更地道的 Python 代码。</p>..."
  },
  {
    "id": 3,
    "title": "Python 各数据类型的高效方法、技巧与魔法",
    "excerpt": "Python 提供了丰富的数据类型，每种类型都有其独特的方法和技巧。本文将深入探讨 Python 中常用数据类型的高效使用方法、实用技巧和一些令人惊叹的\"魔法\"操作，帮助你充分发挥每种数据类型的潜力。",
    "date": "2026-03-24",
    "category": "技术",
    "tags": ["Python", "数据类型", "技巧", "魔法"],
    "content": "<p>Python 是一种动态类型语言，提供了丰富的数据类型，每种类型都有其独特的方法和特性。掌握这些数据类型的高效使用方法和技巧，可以大大提高你的编程效率和代码质量。本文将详细介绍 Python 中常用数据类型的高效方法、实用技巧和一些\"魔法\"操作。</p>..."
  },
  {
    "id": 4,
    "title": "Python 使用 boto3 模块操作 DynamoDB 和 S3",
    "excerpt": "boto3 是 AWS 的官方 Python SDK，用于与 AWS 服务进行交互。本文将介绍如何使用 boto3 模块操作 DynamoDB 和 S3 这两个常用的 AWS 服务，包括基本的 CRUD 操作和常见的使用场景。",
    "date": "2026-03-24",
    "category": "技术",
    "tags": ["Python", "boto3", "DynamoDB", "S3", "AWS"],
    "content": "<p>boto3 是 AWS 的官方 Python SDK，提供了与 AWS 服务交互的完整功能。在 Python 中使用 boto3 可以轻松操作各种 AWS 服务，如 DynamoDB、S3、EC2 等。本文将重点介绍如何使用 boto3 操作 DynamoDB 和 S3 这两个常用的 AWS 服务。</p>..."
  }
]
```

### 2. 下载 Vue.js 库

从 [Vue.js 官网](https://vuejs.org/) 下载 vue.min.js 文件，或使用 CDN 链接。

### 3. 创建新的 Vue 应用文件 (`app.js`)

```javascript
// app.js
new Vue({
  el: '#app',
  data: {
    articles: [],
    currentPage: 1,
    itemsPerPage: 7,
    currentArticle: null,
    isDetailView: false
  },
  computed: {
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.articles.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.articles.length / this.itemsPerPage);
    }
  },
  methods: {
    loadArticles() {
      // 首先尝试从本地存储加载
      const storedArticles = localStorage.getItem('blogArticles');
      if (storedArticles) {
        this.articles = JSON.parse(storedArticles);
      } else {
        // 如果本地存储没有，从 JSON 文件加载
        fetch('articles.json')
          .then(response => response.json())
          .then(data => {
            this.articles = data;
            // 保存到本地存储
            localStorage.setItem('blogArticles', JSON.stringify(data));
          });
      }
    },
    openArticle(id) {
      this.currentArticle = this.articles.find(a => a.id === id);
      this.isDetailView = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    closeArticle() {
      this.currentArticle = null;
      this.isDetailView = false;
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    },
    goHome() {
      if (this.isDetailView) {
        this.closeArticle();
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  },
  mounted() {
    this.loadArticles();
  }
});
```

### 4. 修改 `index.html` 文件

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>墨迹 | 个人博客</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Noto+Sans+SC:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./style.css">
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>
</head>
<body class="min-h-screen flex flex-col">

  <!-- 视频背景 -->
  <div class="video-background">
    <video id="bgVideo" autoplay loop muted playsinline poster="./poster.jpg">
      <source src="./bg.mp4" type="video/mp4">
    </video>
    <div class="video-overlay"></div>
  </div>

  <!-- 背景纹理 -->
  <div class="texture-overlay"></div>

  <!-- 导航栏 -->
  <nav class="fixed top-0 left-0 right-0 z-50 border-b border-theme">
    <div class="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- 点击墨迹返回首页/顶部 -->
      <a href="#" @click="goHome" class="font-display text-2xl font-semibold text-fg cursor-pointer">墨迹</a>
      
      <!-- 导航链接 -->
      <div class="flex items-center gap-8">
        <a href="admin.html" class="text-sm text-muted hover:text-accent transition-colors">管理</a>
      </div>
    </div>
  </nav>

  <!-- 主要内容区域 -->
  <div class="flex-1" id="app">
    
    <!-- Hero 区域 -->
    <header class="h-screen flex flex-col justify-center items-center relative px-6" v-if="!isDetailView">
      <div class="max-w-4xl mx-auto text-center">
        <div class="reveal mb-8" style="transition-delay: 0.1s;">
          <div class="hero-avatar-wrapper mx-auto">
            <img src="./touxiang.png" alt="博主头像" class="hero-avatar"/>
          </div>
        </div>

        <div class="reveal" style="transition-delay: 0.2s;">
          <p class="text-muted text-sm tracking-widest uppercase mb-4">个人博客</p>
          <h1 class="font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-fg leading-tight mb-6">
            记录思考<br>沉淀生活
          </h1>
          <p class="text-muted text-lg max-w-xl mx-auto leading-relaxed">
            这里是笔墨流淌的地方，记录技术探索与生活感悟。<br>
            愿每一篇文章都能带来一丝启发。
          </p>
        </div>
      </div>

      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator">
        <div class="flex flex-col items-center gap-2 text-muted cursor-pointer" @click="document.getElementById('articles').scrollIntoView({behavior: 'smooth'})"><!-- 点击导航栏 Logo 返回首页 -->
          <span class="text-xs tracking-widest">向下滚动</span>
          <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </div>
    </header>

    <!-- 文章列表视图 -->
    <main id="articles" class="px-6 pb-20" v-if="!isDetailView">
      <div class="max-w-4xl mx-auto">
        <div class="reveal">
          <div class="flex items-center justify-between mb-10">
            <h2 class="font-display text-2xl font-semibold text-fg">最新文章</h2>
            <span class="text-muted text-sm">共 {{ articles.length }} 篇</span>
          </div>
        </div>
        <div class="space-y-6">
          <article 
            v-for="(article, index) in paginatedArticles" 
            :key="article.id"
            class="article-card p-6 reveal cursor-pointer" 
            :style="{ transitionDelay: index * 0.05 + 's' }"
            @click="openArticle(article.id)"
          >
            <div class="flex items-start justify-between gap-4 mb-3">
              <div class="flex items-center gap-3">
                <span class="text-xs font-medium text-accent bg-alt px-2 py-1 rounded">{{ article.category }}</span>
                <span class="text-xs text-muted">{{ article.date }}</span>
              </div>
            </div>
            <h3 class="font-display text-xl font-semibold text-fg mb-2 hover-accent transition-colors">{{ article.title }}</h3>
            <p class="text-muted text-sm leading-relaxed mb-4">{{ article.excerpt }}</p>
            <div class="flex flex-wrap gap-2" @click.stop>
              <span 
                v-for="tag in article.tags" 
                :key="tag"
                class="tag text-xs px-2 py-1 rounded"
              >{{ tag }}</span>
            </div>
          </article>
        </div>
        <div class="pagination-container" v-if="totalPages > 1">
          <button 
            class="pagination-btn" 
            @click="changePage(currentPage - 1)" 
            :disabled="currentPage === 1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button 
            v-for="page in totalPages" 
            :key="page"
            class="pagination-btn" 
            :class="{ active: currentPage === page }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
          <button 
            class="pagination-btn" 
            @click="changePage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </main>

    <!-- 文章详情视图 -->
    <section id="article-detail" class="px-6 pb-20 pt-24" v-if="isDetailView">
      <div class="max-w-3xl mx-auto">
        <button @click="closeArticle" class="flex items-center gap-2 text-muted hover:text-accent mb-6 transition-colors group">
          <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span>返回列表</span>
        </button>

        <div class="article-detail-container" v-if="currentArticle">
          <header class="mb-8 pb-6 border-b border-theme">
            <h1 class="font-display text-3xl sm:text-4xl font-semibold text-fg leading-tight">{{ currentArticle.title }}</h1>
          </header>
          <article class="prose custom-prose" v-html="currentArticle.content"></article>
        </div>
      </div>
    </section>

    <!-- 关于我 -->
    <section id="about" class="py-12 px-6" v-if="!isDetailView">
      <div class="max-w-4xl mx-auto">
        <div class="reveal">
          <h2 class="font-display text-xl font-semibold text-fg mb-6">关于我</h2>
          <div class="grid sm:grid-cols-3 gap-6">
            <div class="sm:col-span-2">
              <p class="text-muted leading-relaxed mb-3 text-sm">
                一个热爱技术与文字的普通人。白天写代码，晚上写文章。
                喜欢探索新技术，也喜欢回味经典。
              </p>
              <p class="text-muted leading-relaxed text-sm">
                相信好的代码像诗一样优雅，好的文章像老友聊天一样自然。
                这个博客是我的数字花园，记录成长，分享收获。
              </p>
            </div>
            <div>
              <h3 class="text-fg font-medium mb-2 text-sm">联系方式</h3>
              <div class="space-y-1 text-xs text-muted">
                <p>GitHub: @moji-blog</p>
                <p>Email: hello@moji.blog</p>
                <p>Twitter: @moji_writes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- 页脚 -->
  <footer class="py-8 px-6 border-t border-theme">
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
      <p>2024 墨迹. All rights reserved.</p>
      <p>用文字丈量世界</p>
    </div>
  </footer>

  <!-- 主题切换按钮 -->
  <button id="themeToggle" class="theme-fab" aria-label="切换主题">
    <svg class="sun-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
    </svg>
    <svg class="moon-icon hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
    </svg>
  </button>

  <script src="./app.js"></script>
  <script src="./script.js"></script>
</body>
</html>
```

### 5. 创建文章管理页面 (`admin.html`)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>文章管理 | 墨迹博客</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Noto+Sans+SC:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./style.css">
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>
</head>
<body class="min-h-screen flex flex-col bg-body">
  <!-- 导航栏 -->
  <nav class="fixed top-0 left-0 right-0 z-50 border-b border-theme bg-body">
    <div class="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="index.html" class="font-display text-2xl font-semibold text-fg cursor-pointer">墨迹</a>
      <div class="flex items-center gap-8">
        <a href="index.html" class="text-sm text-muted hover:text-accent transition-colors">博客</a>
      </div>
    </div>
  </nav>

  <!-- 主要内容区域 -->
  <div class="flex-1 pt-24 px-6" id="admin-app">
    <div class="max-w-4xl mx-auto">
      <h1 class="font-display text-3xl font-semibold text-fg mb-8">文章管理</h1>
      
      <!-- 文章列表 -->
      <div class="mb-12">
        <h2 class="font-display text-xl font-semibold text-fg mb-4">文章列表</h2>
        <div class="space-y-4">
          <div 
            v-for="article in articles" 
            :key="article.id"
            class="p-4 border border-theme rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 class="font-medium text-fg">{{ article.title }}</h3>
              <p class="text-xs text-muted">{{ article.date }} | {{ article.category }}</p>
            </div>
            <div class="flex gap-2">
              <button @click="editArticle(article)" class="px-3 py-1 bg-accent text-white text-sm rounded hover:bg-accent-light transition-colors">编辑</button>
              <button @click="deleteArticle(article.id)" class="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors">删除</button>
            </div>
          </div>
          <div v-if="articles.length === 0" class="text-center py-8 text-muted">
            暂无文章
          </div>
        </div>
      </div>
      
      <!-- 文章编辑表单 -->
      <div class="bg-card p-6 rounded-lg shadow">
        <h2 class="font-display text-xl font-semibold text-fg mb-4">{{ isEditing ? '编辑文章' : '添加文章' }}</h2>
        
        <form @submit.prevent="saveArticle">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-fg mb-1">标题</label>
              <input 
                v-model="form.title" 
                type="text" 
                class="w-full px-3 py-2 border border-theme rounded focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="文章标题"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-fg mb-1">分类</label>
              <input 
                v-model="form.category" 
                type="text" 
                class="w-full px-3 py-2 border border-theme rounded focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="文章分类"
                required
              >
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-fg mb-1">标签（用逗号分隔）</label>
            <input 
              v-model="form.tagsInput" 
              type="text" 
              class="w-full px-3 py-2 border border-theme rounded focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Python, 教程, 技巧"
            >
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-fg mb-1">摘要</label>
            <textarea 
              v-model="form.excerpt" 
              class="w-full px-3 py-2 border border-theme rounded focus:outline-none focus:ring-2 focus:ring-accent"
              rows="3"
              placeholder="文章摘要"
              required
            ></textarea>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-fg mb-1">内容</label>
            <textarea 
              v-model="form.content" 
              class="w-full px-3 py-2 border border-theme rounded focus:outline-none focus:ring-2 focus:ring-accent"
              rows="10"
              placeholder="文章内容（支持HTML）"
              required
            ></textarea>
          </div>
          
          <div class="flex gap-4">
            <button type="submit" class="px-4 py-2 bg-accent text-white rounded hover:bg-accent-light transition-colors">保存</button>
            <button type="button" @click="resetForm" class="px-4 py-2 border border-theme rounded hover:bg-bg-alt transition-colors">重置</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- 页脚 -->
  <footer class="py-8 px-6 border-t border-theme mt-12">
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
      <p>2024 墨迹. All rights reserved.</p>
      <p>用文字丈量世界</p>
    </div>
  </footer>

  <script>
    new Vue({
      el: '#admin-app',
      data: {
        articles: [],
        isEditing: false,
        form: {
          id: null,
          title: '',
          category: '',
          tagsInput: '',
          tags: [],
          excerpt: '',
          content: '',
          date: ''
        }
      },
      methods: {
        loadArticles() {
          const storedArticles = localStorage.getItem('blogArticles');
          if (storedArticles) {
            this.articles = JSON.parse(storedArticles);
          } else {
            // 从 JSON 文件加载
            fetch('articles.json')
              .then(response => response.json())
              .then(data => {
                this.articles = data;
                localStorage.setItem('blogArticles', JSON.stringify(data));
              });
          }
        },
        saveArticle() {
          // 处理标签
          this.form.tags = this.form.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
          
          // 设置日期
          if (!this.form.date) {
            const today = new Date();
            this.form.date = today.toISOString().split('T')[0];
          }
          
          if (this.isEditing) {
            // 编辑现有文章
            const index = this.articles.findIndex(a => a.id === this.form.id);
            if (index !== -1) {
              this.articles[index] = { ...this.form };
            }
          } else {
            // 添加新文章
            const newId = this.articles.length > 0 ? Math.max(...this.articles.map(a => a.id)) + 1 : 1;
            this.form.id = newId;
            this.articles.push({ ...this.form });
          }
          
          // 保存到本地存储
          localStorage.setItem('blogArticles', JSON.stringify(this.articles));
          
          // 重置表单
          this.resetForm();
          
          // 重新加载文章列表
          this.loadArticles();
        },
        editArticle(article) {
          this.isEditing = true;
          this.form = { ...article };
          this.form.tagsInput = article.tags.join(', ');
        },
        deleteArticle(id) {
          if (confirm('确定要删除这篇文章吗？')) {
            this.articles = this.articles.filter(a => a.id !== id);
            localStorage.setItem('blogArticles', JSON.stringify(this.articles));
          }
        },
        resetForm() {
          this.isEditing = false;
          this.form = {
            id: null,
            title: '',
            category: '',
            tagsInput: '',
            tags: [],
            excerpt: '',
            content: '',
            date: ''
          };
        }
      },
      mounted() {
        this.loadArticles();
      }
    });
  </script>
</body>
</html>
```

### 6. 保留原有的 `script.js` 文件（只保留必要的功能）

```javascript
// script.js
// 只保留主题切换和其他必要的功能

function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  
  if (!themeToggle || !sunIcon || !moonIcon) return;
  
  let isDark = false;

  function updateThemeIcons() {
    if (isDark) {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  }

  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    updateThemeIcons();
  });
}

function initVideoBackground() {
  const videoContainer = document.querySelector('.video-background');
  if (!videoContainer) return;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    videoContainer.remove();
  } else {
    const video = document.getElementById('bgVideo');
    if (video) video.play().catch(err => console.log('视频自动播放失败:', err));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initVideoBackground();
});
```

## 使用说明

### 1. 访问博客

- 打开 `index.html` 查看博客首页
- 点击文章标题查看文章详情
- 点击导航栏的"管理"链接进入文章管理页面

### 2. 管理文章

- 在 `admin.html` 页面可以查看所有文章
- 点击"添加文章"按钮创建新文章
- 点击文章旁边的"编辑"按钮修改文章
- 点击文章旁边的"删除"按钮删除文章
- 所有修改都会自动保存到本地存储

### 3. 数据持久化

- 文章数据存储在浏览器的本地存储中
- 首次加载时会从 `articles.json` 文件导入数据
- 后续的修改会保存在本地存储中，不会影响 `articles.json` 文件

## 优势

1. **数据与逻辑分离**：文章数据存储在本地存储中，管理更方便
2. **动态管理**：通过管理页面可以添加、编辑、删除文章
3. **无需后端**：完全基于前端技术，无需服务器
4. **易于扩展**：可以根据需要添加更多功能，如分类管理、标签管理等
5. **响应式设计**：适配不同屏幕尺寸

## 注意事项

- 本地存储有容量限制（通常为5MB），不适合存储大量文章
- 本地存储的数据只存在于当前浏览器中，更换浏览器或清除缓存会丢失数据
- 如需长期保存数据，建议定期导出数据备份

## 后续扩展建议

1. **添加 Markdown 编辑器**：使用 `marked.js` 或 `markdown-it` 支持 Markdown 编辑
2. **实现标签管理**：添加标签的增删改查功能
3. **添加分类管理**：支持文章分类的管理
4. **实现搜索功能**：添加文章搜索功能
5. **数据导出导入**：支持文章数据的导出和导入
6. **添加评论功能**：集成第三方评论系统或实现本地评论

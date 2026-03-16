// 文章数据
const articles = [
  {
    id: 1,
    title: '重新理解 JavaScript 闭包',
    excerpt: '闭包是 JavaScript 中最基础也最重要的概念之一。本文从实际场景出发，重新审视闭包的本质与应用。',
    date: '2024-01-15',
    category: '技术',
    tags: ['JavaScript', '前端'],
    readTime: '8 分钟'
  },
  {
    id: 2,
    title: '设计系统的构建思考',
    excerpt: '一个好的设计系统不仅是组件库，更是一种设计语言。分享我在构建团队设计系统时的思考与实践。',
    date: '2024-01-08',
    category: '设计',
    tags: ['设计系统', 'UI'],
    readTime: '12 分钟'
  },
  {
    id: 3,
    title: '阅读的碎片化与深度',
    excerpt: '在这个信息爆炸的时代，如何在碎片化阅读中保持深度思考？这是我近期的一些探索。',
    date: '2024-01-02',
    category: '随笔',
    tags: ['阅读', '思考'],
    readTime: '5 分钟'
  },
  {
    id: 4,
    title: 'CSS 容器查询实战指南',
    excerpt: '容器查询终于来了！这篇文章带你从零开始，掌握这一革命性的 CSS 特性。',
    date: '2023-12-20',
    category: '技术',
    tags: ['CSS', '前端'],
    readTime: '10 分钟'
  },
  {
    id: 5,
    title: '远程工作两年后的反思',
    excerpt: '远程工作改变了我的生活方式，也让我对"工作"本身有了新的理解。',
    date: '2023-12-12',
    category: '随笔',
    tags: ['远程工作', '生活'],
    readTime: '7 分钟'
  },
  {
    id: 6,
    title: '从零搭建个人博客的技术选型',
    excerpt: '分享这个博客的技术架构：为什么选择静态生成，为什么不用框架，以及性能优化的心得。',
    date: '2023-12-01',
    category: '技术',
    tags: ['博客', '架构'],
    readTime: '9 分钟'
  }
];

// 渲染文章列表
function renderArticles() {
  const container = document.getElementById('articleList');
  
  if (!container) return;

  container.innerHTML = articles.map((article, index) => `
    <article class="article-card rounded-xl p-6 reveal" style="transition-delay: ${index * 0.1}s">
      <div class="flex items-start justify-between gap-4 mb-3">
        <div class="flex items-center gap-3">
          <span class="text-xs font-medium text-accent bg-alt px-2 py-1 rounded">${article.category}</span>
          <span class="text-xs text-muted">${article.date}</span>
        </div>
        <span class="text-xs text-muted whitespace-nowrap">${article.readTime}</span>
      </div>
      
      <h3 class="font-display text-xl font-semibold text-fg mb-2 hover-accent cursor-pointer transition-colors">
        ${article.title}
      </h3>
      
      <p class="text-muted text-sm leading-relaxed mb-4">
        ${article.excerpt}
      </p>
      
      <div class="flex flex-wrap gap-2">
        ${article.tags.map(tag => `
          <span class="tag text-xs px-2 py-1 rounded cursor-pointer">${tag}</span>
        `).join('')}
      </div>
    </article>
  `).join('');
}

// 主题切换
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
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : '');
    updateThemeIcons();
  });
}

// 滚动显示动画
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => {
    observer.observe(el);
  });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  renderArticles();
  initThemeToggle();
  setTimeout(initScrollReveal, 100);
});

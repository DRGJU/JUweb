// 文章数据
const articles = [
  { id: 1, title: '重新理解 JavaScript 闭包', excerpt: '闭包是 JavaScript 中最基础也最重要的概念之一。本文从实际场景出发，重新审视闭包的本质与应用。', date: '2024-01-15', category: '技术', tags: ['JavaScript', '前端'], readTime: '8 分钟' },
  { id: 2, title: '设计系统的构建思考', excerpt: '一个好的设计系统不仅是组件库，更是一种设计语言。分享我在构建团队设计系统时的思考与实践。', date: '2024-01-08', category: '设计', tags: ['设计系统', 'UI'], readTime: '12 分钟' },
  { id: 3, title: '阅读的碎片化与深度', excerpt: '在这个信息爆炸的时代，如何在碎片化阅读中保持深度思考？这是我近期的一些探索。', date: '2024-01-02', category: '随笔', tags: ['阅读', '思考'], readTime: '5 分钟' },
  { id: 4, title: 'CSS 容器查询实战指南', excerpt: '容器查询终于来了！这篇文章带你从零开始，掌握这一革命性的 CSS 特性。', date: '2023-12-20', category: '技术', tags: ['CSS', '前端'], readTime: '10 分钟' },
  { id: 5, title: '远程工作两年后的反思', excerpt: '远程工作改变了我的生活方式，也让我对"工作"本身有了新的理解。', date: '2023-12-12', category: '随笔', tags: ['远程工作', '生活'], readTime: '7 分钟' },
  { id: 6, title: '从零搭建个人博客的技术选型', excerpt: '分享这个博客的技术架构：为什么选择静态生成，为什么不用框架，以及性能优化的心得。', date: '2023-12-01', category: '技术', tags: ['博客', '架构'], readTime: '9 分钟' },
  { id: 7, title: 'TypeScript 类型体操心得', excerpt: '深入理解 TypeScript 的高级类型系统，通过实际案例掌握类型推导与条件类型。', date: '2023-11-25', category: '技术', tags: ['TypeScript', '前端'], readTime: '15 分钟' },
  { id: 8, title: '极简主义生活实践', excerpt: '减少物质的拥有，增加精神的富足。我是如何开始极简生活，并从中获益的。', date: '2023-11-18', category: '随笔', tags: ['生活', '极简'], readTime: '6 分钟' },
  { id: 9, title: 'Node.js 性能优化全攻略', excerpt: '从内存泄漏到 CPU 瓶颈，全面解析 Node.js 后端服务的性能优化策略。', date: '2023-11-10', category: '技术', tags: ['Node.js', '后端'], readTime: '18 分钟' },
  { id: 10, title: '色彩心理学在 UI 设计中的应用', excerpt: '颜色不仅仅是视觉元素，它还能影响用户的情绪和行为决策。', date: '2023-11-02', category: '设计', tags: ['UI', '心理学'], readTime: '8 分钟' },
  { id: 11, title: '我的 2023 年度书单', excerpt: '整理了今年读过的几本好书，涵盖技术、文学与个人成长领域。', date: '2023-10-20', category: '随笔', tags: ['阅读', '书单'], readTime: '5 分钟' },
  { id: 12, title: 'React Server Components 入门', excerpt: '深入解读 React Server Components 的工作原理及其对前端架构的影响。', date: '2023-10-10', category: '技术', tags: ['React', '前端'], readTime: '12 分钟' }
];

const ITEMS_PER_PAGE = 7;
let currentPage = 1;
let observer = null;
const articleCountEl = document.getElementById('articleCount');

function renderArticles(page) {
  const container = document.getElementById('articleList');
  if (!container) return;
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedArticles = articles.slice(start, end);
  if(articleCountEl) articleCountEl.textContent = `共 ${articles.length} 篇`;

  container.innerHTML = paginatedArticles.map((article, index) => `
    <article class="article-card p-6 reveal" style="transition-delay: ${index * 0.05}s">
      <div class="flex items-start justify-between gap-4 mb-3">
        <div class="flex items-center gap-3">
          <span class="text-xs font-medium text-accent bg-alt px-2 py-1 rounded">${article.category}</span>
          <span class="text-xs text-muted">${article.date}</span>
        </div>
        <span class="text-xs text-muted whitespace-nowrap">${article.readTime}</span>
      </div>
      <h3 class="font-display text-xl font-semibold text-fg mb-2 hover-accent cursor-pointer transition-colors">${article.title}</h3>
      <p class="text-muted text-sm leading-relaxed mb-4">${article.excerpt}</p>
      <div class="flex flex-wrap gap-2">
        ${article.tags.map(tag => `<span class="tag text-xs px-2 py-1 rounded cursor-pointer">${tag}</span>`).join('')}
      </div>
    </article>
  `).join('');
  initTiltEffect();
  initScrollReveal();
}

function renderPagination() {
  const container = document.getElementById('pagination');
  if (!container) return;
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  if (totalPages <= 1) { container.innerHTML = ''; return; }
  let html = `<button class="pagination-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg></button>`;
  for (let i = 1; i <= totalPages; i++) { html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`; }
  html += `<button class="pagination-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></button>`;
  container.innerHTML = html;
}

function changePage(page) {
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderArticles(currentPage);
  renderPagination();
  const articlesSection = document.getElementById('articles');
  if (articlesSection) articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initTiltEffect() {
  if ('ontouchstart' in window) return;
  const cards = document.querySelectorAll('.article-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.03)';
    });
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10; 
      const rotateY = ((x - centerX) / centerX) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.2s ease-out'; 
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
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

// 修正后的主题切换逻辑
function initThemeToggle() {
  const avatar = document.getElementById('avatarTrigger');
  const layer = document.getElementById('theme-transition-layer');
  
  if (!avatar || !layer) return;

  let isAnimating = false;

  avatar.addEventListener('click', (e) => {
    // 防止动画过程中重复点击
    if (isAnimating) return;
    isAnimating = true;

    // 1. 获取头像中心坐标
    const rect = avatar.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // 2. 判断当前主题
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // 3. 设置遮罩层颜色 (即将变成的主题色)
    // 如果当前是深色，即将变成浅色，遮罩层背景设为浅色
    // 如果当前是浅色，即将变成深色，遮罩层背景设为深色
    const targetBgColor = isDark ? '#FAF8F5' : '#1A1A1A';
    layer.style.backgroundColor = targetBgColor;

    // 4. 设置起始状态：从头像位置开始的 0 半径圆
    // 必须使用内联样式直接控制，以确保坐标准确
    layer.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    
    // 5. 显示遮罩层
    layer.style.visibility = 'visible';
    
    // 6. 强制浏览器重绘，确保起始状态已渲染
    layer.offsetHeight;

    // 7. 设置目标状态：扩散到足够大的半径
    // 使用 150vmax 确保覆盖整个屏幕
    layer.style.clipPath = `circle(150vmax at ${x}px ${y}px)`;

    // 8. 监听过渡结束事件
    const handleEnd = (e) => {
      // 确保只监听 clip-path 的过渡
      if (e.propertyName !== 'clip-path' && e.propertyName !== 'transform') return;

      // 切换真实主题
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
      }

      // 重置遮罩层状态
      layer.style.visibility = 'hidden';
      // 延迟重置 clip-path，避免闪烁
      setTimeout(() => {
         layer.style.clipPath = 'circle(0px at 50% 50%)';
      }, 50);

      // 移除监听器并解锁点击
      layer.removeEventListener('transitionend', handleEnd);
      // 兼容 webkit 浏览器
      layer.removeEventListener('webkitTransitionEnd', handleEnd);
      isAnimating = false;
    };

    // 添加监听器
    layer.addEventListener('transitionend', handleEnd);
    layer.addEventListener('webkitTransitionEnd', handleEnd);
  });
}

function initScrollReveal() {
  if (observer) observer.disconnect();
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  renderArticles(currentPage);
  renderPagination();
  initThemeToggle();
  initVideoBackground();
});

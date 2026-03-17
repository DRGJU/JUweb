// 文章数据 (增加了 content 字段)
const articles = [
  {
    id: 1,
    title: 'Python 入门教程：从零开始掌握 Python 基础',
    excerpt: 'Python 是一门简洁优雅、功能强大的编程语言，非常适合作为第一门编程语言。本文将从环境搭建讲起，带你逐步掌握变量、数据类型、流程控制、函数等核心语法，为后续深入学习打下坚实基础。',
    date: '2024-03-10',
    category: '技术',
    tags: ['Python', '入门教程', '编程基础'],
    readTime: '15 分钟',
    content: `
      <p>Python 是一门简洁优雅、功能强大的编程语言。无论你是编程新手还是想学习一门新语言的开发者，Python 都是一个非常棒的选择。</p>
      
      <h2>1. 为什么选择 Python？</h2>
      <p>Python 以其高可读性和简洁的语法著称，它允许开发者用更少的代码行表达概念。以下是 Python 的一些主要优势：</p>
      <ul>
        <li><strong>易于学习：</strong>Python 的语法非常接近英语，使得初学者能够快速上手。</li>
        <li><strong>丰富的库：</strong>拥有庞大的标准库和第三方库，涵盖 Web 开发、数据分析、人工智能等领域。</li>
        <li><strong>社区活跃：</strong>庞大的社区意味着你遇到的问题很容易找到解决方案。</li>
      </ul>

      <h2>2. 环境搭建</h2>
      <p>在开始编写代码之前，我们需要先安装 Python。</p>
      <ol>
        <li>访问 <strong>python.org</strong> 下载最新版本的 Python。</li>
        <li>运行安装程序，记得勾选 <strong>"Add Python to PATH"</strong>。</li>
        <li>打开终端（Terminal 或 CMD），输入 <code>python --version</code> 验证安装。</li>
      </ol>

      <h2>3. Hello World</h2>
      <p>学习新语言的第一步，永远是向世界问好。在 Python 中，只需一行代码：</p>
      <pre><code>print("Hello, World!")</code></pre>

      <h2>4. 变量与数据类型</h2>
      <p>Python 是动态类型语言，不需要显式声明变量类型。</p>
      <pre><code># 数字
age = 25
price = 19.99

# 字符串
name = "Alice"

# 布尔值
is_student = True</code></pre>

      <h2>5. 流程控制</h2>
      <p>Python 使用缩进来表示代码块，而不是大括号。</p>
      <pre><code># 条件判断
if age >= 18:
    print("成年人")
else:
    print("未成年人")

# 循环
for i in range(5):
    print(i)</code></pre>

      <h2>6. 函数</h2>
      <p>函数是组织好的、可重复使用的代码块。</p>
      <pre><code>def greet(name):
    return f"Hello, {name}!"

message = greet("Bob")
print(message)  # 输出: Hello, Bob!</code></pre>

      <h2>结语</h2>
      <p>Python 的世界非常广阔。掌握了这些基础后，你可以尝试学习文件操作、面向对象编程，或者探索 Web 开发、数据科学等有趣的方向。保持好奇心，多敲代码！</p>
    `
  }
];

const ITEMS_PER_PAGE = 7;
let currentPage = 1;
let observer = null;
const articleCountEl = document.getElementById('articleCount');

function renderArticles(page) {
  const container = document.getElementById('articleList');
  if (!container) return;
  
  if (articles.length === 0) {
    if(articleCountEl) articleCountEl.textContent = '暂无文章';
    container.innerHTML = `
      <div class="text-center py-20 text-muted">
        <p class="text-lg mb-2">还没有文章</p>
        <p class="text-sm">敬请期待...</p>
      </div>
    `;
    return;
  }

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
      <!-- 修改：添加 onclick 事件 -->
      <h3 class="font-display text-xl font-semibold text-fg mb-2 hover-accent cursor-pointer transition-colors" onclick="openArticle(${article.id})">${article.title}</h3>
      <p class="text-muted text-sm leading-relaxed mb-4">${article.excerpt}</p>
      <div class="flex flex-wrap gap-2">
        ${article.tags.map(tag => `<span class="tag text-xs px-2 py-1 rounded cursor-pointer">${tag}</span>`).join('')}
      </div>
    </article>
  `).join('');
  initTiltEffect();
  initScrollReveal();
}

// 新增：打开文章详情
function openArticle(id) {
  const article = articles.find(a => a.id === id);
  if (!article) return;

  // 1. 隐藏列表，显示详情
  document.getElementById('articles').classList.add('hidden');
  document.getElementById('about').classList.add('hidden'); // 隐藏关于我
  document.getElementById('article-detail').classList.remove('hidden');

  // 2. 渲染内容
  document.getElementById('detail-title').textContent = article.title;
  document.getElementById('detail-date').textContent = article.date;
  document.getElementById('detail-readtime').textContent = article.readTime;
  document.getElementById('detail-content').innerHTML = article.content;

  // 3. 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 新增：关闭文章详情
function closeArticle() {
  document.getElementById('article-detail').classList.add('hidden');
  document.getElementById('articles').classList.remove('hidden');
  document.getElementById('about').classList.remove('hidden'); // 显示关于我
  
  // 滚动回文章列表位置（可选）
  document.getElementById('articles').scrollIntoView({ behavior: 'smooth' });
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

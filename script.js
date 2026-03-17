// 文章数据 (已清空)
const articles = [];

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

// 核心修改：从头像向外扩散的主题切换
function initThemeToggle() {
  const avatar = document.getElementById('avatarTrigger');
  const layer = document.getElementById('theme-transition-layer');
  
  if (!avatar || !layer) return;

  let isAnimating = false;

  avatar.addEventListener('click', (e) => {
    if (isAnimating) return;
    isAnimating = true;

    // 1. 获取头像中心坐标
    const rect = avatar.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // 2. 判断当前主题
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // 3. 设置遮罩层颜色为【目标主题色】
    // 如果当前是亮 -> 切换为暗 -> 遮罩层设为暗色
    const targetBgColor = isDark ? '#FAF8F5' : '#1A1A1A';
    layer.style.backgroundColor = targetBgColor;

    // 4. 设置起始状态：从头像中心开始，半径为0
    layer.style.visibility = 'visible';
    // 注意：这里必须先设置起始状态，浏览器需要一帧来渲染这个初始状态
    layer.style.clipPath = `circle(0% at ${x}px ${y}px)`;
    
    // 强制重绘
    layer.getBoundingClientRect();

    // 5. 执行扩散动画：半径扩大到覆盖整个屏幕 (150% 足够覆盖)
    layer.style.clipPath = `circle(150% at ${x}px ${y}px)`;

    // 6. 使用 setTimeout 等待动画结束 (CSS 中定义的 0.8s)
    setTimeout(() => {
      // 6.1 动画结束，真实切换 DOM 主题
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
      }

      // 6.2 立即隐藏遮罩层，并重置其状态（用户看不到重置过程）
      layer.style.visibility = 'hidden';
      layer.style.clipPath = 'circle(0% at 50% 50%)'; // 重置回默认值，方便下次使用

      isAnimating = false;
    }, 800); // 这里的时间要和 CSS transition 时间保持一致
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

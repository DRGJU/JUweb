// app.js
new Vue({
  el: '#app',
  data: {
    articles: [],
    currentPage: 1,
    itemsPerPage: 7,
    currentArticle: null,
    isDetailView: false,
    isAdmin: false,
    currentYear: new Date().getFullYear(),
    currentDate: new Date().toISOString().split('T')[0],
    showBackToTop: false,
    isPlaying: false,
    isDark: true,
    mobileMenuOpen: false,
    activeTab: 'home',
    isScrolled: false,
    navItems: [
      { id: 'home', name: '首页' },
      { id: 'articles', name: '文章' },
      { id: 'about', name: '关于' }
    ]
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
        fetch('./data/articles.json')
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
      // 延迟一下，确保 DOM 已经更新
      setTimeout(() => {
        // 重新初始化滚动显示效果
        if (typeof initScrollReveal === 'function') {
          initScrollReveal();
        }
      }, 100);
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
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    toggleMusic() {
      const bgMusic = document.getElementById('bgMusic');
      if (!bgMusic) return;
      
      if (this.isPlaying) {
        bgMusic.pause();
        this.isPlaying = false;
      } else {
        bgMusic.play().catch(err => console.log('音乐播放失败:', err));
        this.isPlaying = true;
      }
    },
    toggleTheme() {
      this.isDark = !this.isDark;
      if (this.isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    },
    handleNavClick(item) {
      this.activeTab = item.id;
      if (item.id === 'home') {
        this.goHome();
      } else if (item.id === 'articles') {
        if (this.isDetailView) {
          this.closeArticle();
        }
        // 滚动到文章区域
        const articlesSection = document.querySelector('#articles-section');
        if (articlesSection) {
          articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (item.id === 'about') {
        if (this.isDetailView) {
          this.closeArticle();
        }
        // 滚动到关于区域
        const aboutSection = document.querySelector('#about-section');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },
    moveScanLight(event) {
      const scanlight = document.getElementById('nav-scanlight');
      if (!scanlight) return;
      
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const parentRect = target.parentElement.getBoundingClientRect();
      
      scanlight.style.width = `${rect.width}px`;
      scanlight.style.height = `${rect.height}px`;
      scanlight.style.left = `${rect.left - parentRect.left}px`;
      scanlight.style.top = `${rect.top - parentRect.top}px`;
      scanlight.style.opacity = '1';
      
      // 触发扫光动画
      scanlight.classList.add('scan-active');
    },
    resetScanLight() {
      const scanlight = document.getElementById('nav-scanlight');
      if (!scanlight) return;
      scanlight.style.opacity = '0';
      scanlight.style.width = '0';
      scanlight.classList.remove('scan-active');
    }
  },
  mounted() {
    this.loadArticles();
    // 检查是否为管理员
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    // 监听滚动，控制回到顶部按钮显示和导航栏样式
    window.addEventListener('scroll', () => {
      this.showBackToTop = window.scrollY > 300;
      this.isScrolled = window.scrollY > 50;
    });
    
    // 初始化主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isDark = false;
      document.documentElement.classList.remove('dark');
    }
    
    // 初始化音乐状态
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
      bgMusic.addEventListener('play', () => { this.isPlaying = true; });
      bgMusic.addEventListener('pause', () => { this.isPlaying = false; });
    }
  }
});

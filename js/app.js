// app.js
const BLOG_STORAGE_KEY = 'blogArticles';
const ADMIN_STORAGE_KEY = 'isAdmin';

function safeStorageGet(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch (error) {
    console.warn(`读取 localStorage[${key}] 失败:`, error);
    return fallback;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`写入 localStorage[${key}] 失败:`, error);
  }
}

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
    currentDate: new Date().toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  },
  computed: {
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.articles.slice(start, end);
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.articles.length / this.itemsPerPage));
    }
  },
  methods: {
    async loadArticles() {
      try {
        const storedArticles = safeStorageGet(BLOG_STORAGE_KEY);
        if (storedArticles) {
          const parsed = JSON.parse(storedArticles);
          this.articles = Array.isArray(parsed) ? parsed : [];
          return;
        }

        const response = await fetch('./data/articles.json', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`加载文章失败: ${response.status}`);
        }

        const data = await response.json();
        this.articles = Array.isArray(data) ? data : [];
        safeStorageSet(BLOG_STORAGE_KEY, JSON.stringify(this.articles));
      } catch (error) {
        console.error('loadArticles error:', error);
        this.articles = [];
      }
    },
    openArticle(id) {
      const article = this.articles.find(item => item.id === id);
      if (!article) return;

      this.currentArticle = article;
      this.isDetailView = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    closeArticle() {
      this.currentArticle = null;
      this.isDetailView = false;

      window.setTimeout(() => {
        if (typeof window.initScrollReveal === 'function') {
          window.initScrollReveal();
        }
      }, 16);
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
    this.isAdmin = safeStorageGet(ADMIN_STORAGE_KEY) === 'true';
  }
});

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
      // 延迟一下，确保DOM已经更新
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
    }
  },
  mounted() {
    this.loadArticles();
  }
});
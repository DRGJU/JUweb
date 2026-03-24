// =========================
// 辅助函数：获取当前格式化日期
// =========================
function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 文章数据
const articles = [
  {
    id: 1,
    title: 'Python 入门教程：从零开始掌握 Python 基础',
    excerpt: 'Python 是一门简洁优雅、功能强大的编程语言，非常适合作为第一门编程语言。本文将从环境搭建讲起，带你逐步掌握变量、数据类型、流程控制、函数等核心语法，为后续深入学习打下坚实基础。',
    date: getCurrentDate(),
    category: '技术',
    tags: ['Python', '入门教程', '编程基础'],
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
  },
  {
    id: 2,
    title: 'Pythonic 的高效方法和技巧与魔法',
    excerpt: 'Python 以其优雅的语法和强大的表达能力而闻名。本文将深入探讨 Pythonic 的编程风格，分享一系列提高代码效率、可读性和简洁性的技巧和魔法，帮助你写出更符合 Python 哲学的高质量代码。',
    date: getCurrentDate(),
    category: '技术',
    tags: ['Python', 'Pythonic', '技巧', '魔法'],
    content: `
      <p>Pythonic 是一个经常被提及但有时难以定义的概念。简而言之，它指的是一种符合 Python 语言哲学的编程风格，强调代码的可读性、简洁性和优雅性。本文将介绍一些 Pythonic 的高效方法和技巧，帮助你写出更地道的 Python 代码。</p>

      <h2>1. Python 哲学</h2>
      <p>在深入技巧之前，让我们先了解一下 Python 的核心哲学。你可以通过在 Python 解释器中运行 <code>import this</code> 来查看 <strong>The Zen of Python</strong>：</p>
      <pre><code>import this</code></pre>
      <p>这将显示 Tim Peters 编写的 Python 设计原则，包括：</p>
      <ul>
        <li>美胜于丑</li>
        <li>显式胜于隐式</li>
        <li>简单胜于复杂</li>
        <li>复杂胜于混乱</li>
        <li>扁平胜于嵌套</li>
        <li>稀疏胜于密集</li>
        <li>可读性很重要</li>
      </ul>

      <h2>2. 列表推导式</h2>
      <p>列表推导式是 Python 中最强大的特性之一，它允许你用一行代码创建和转换列表：</p>
      <pre><code># 传统方式
squares = []
for i in range(10):
    squares.append(i**2)

# Pythonic 方式
squares = [i**2 for i in range(10)]

# 带条件的列表推导式
even_squares = [i**2 for i in range(10) if i % 2 == 0]</code></pre>

      <h2>3. 字典推导式和集合推导式</h2>
      <p>除了列表推导式，Python 还支持字典和集合推导式：</p>
      <pre><code># 字典推导式
user_ids = {"alice": 1, "bob": 2, "charlie": 3}
ids_to_users = {v: k for k, v in user_ids.items()}

# 集合推导式
unique_squares = {i**2 for i in range(-5, 6)}</code></pre>

      <h2>4. 上下文管理器（with 语句）</h2>
      <p>使用 <code>with</code> 语句可以自动管理资源，如文件、网络连接等：</p>
      <pre><code># 传统方式
file = open("example.txt", "r")
try:
    content = file.read()
finally:
    file.close()

# Pythonic 方式
with open("example.txt", "r") as file:
    content = file.read()</code></pre>

      <h2>5. 解包操作</h2>
      <p>Python 提供了强大的解包功能：</p>
      <pre><code># 基本解包
a, b, c = [1, 2, 3]

# 扩展解包
first, *rest = [1, 2, 3, 4, 5]

# 字典解包
user = {"name": "Alice", "age": 30}
print(f"{user['name']} is {user['age']} years old")  # 传统方式
print(f"{user.get('name')} is {user.get('age')} years old")  # 更安全的方式

# 函数参数解包
def greet(name, age):
    print(f"Hello, {name}! You are {age} years old.")

user_info = ("Bob", 25)
greet(*user_info)  # 解包元组

user_dict = {"name": "Charlie", "age": 35}
greet(**user_dict)  # 解包字典</code></pre>

      <h2>6. 生成器表达式</h2>
      <p>生成器表达式与列表推导式类似，但使用圆括号而不是方括号，并且它是惰性求值的，更节省内存：</p>
      <pre><code># 列表推导式（立即创建完整列表）
squares = [i**2 for i in range(1000000)]

# 生成器表达式（按需生成值）
squares_gen = (i**2 for i in range(1000000))

# 使用生成器
for square in squares_gen:
    if square > 100:
        break
    print(square)</code></pre>

      <h2>7. 装饰器</h2>
      <p>装饰器是 Python 中一种强大的元编程工具，它允许你修改函数或类的行为：</p>
      <pre><code>def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done"

slow_function()  # 输出: slow_function took 1.0001 seconds</code></pre>

      <h2>8. 魔术方法</h2>
      <p>Python 的魔术方法（也称为特殊方法）以双下划线开头和结尾，它们允许你自定义类的行为：</p>
      <pre><code>class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __len__(self):
        return int((self.x**2 + self.y**2)**0.5)

v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(v1 + v2)  # 输出: Vector(4, 6)
print(len(v1))  # 输出: 5</code></pre>

      <h2>9. 上下文管理器的实现</h2>
      <p>你可以通过实现 <code>__enter__</code> 和 <code>__exit__</code> 方法来创建自定义上下文管理器：</p>
      <pre><code>class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        self.end = time.time()
        print(f"Elapsed time: {self.end - self.start:.4f} seconds")

with Timer():
    # 执行一些操作
    import time
    time.sleep(1)</code></pre>

      <h2>10. 高级技巧</h2>
      <h3>10.1 使用 enumerate 获取索引</h3>
      <pre><code>fruits = ["apple", "banana", "cherry"]
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")</code></pre>

      <h3>10.2 使用 zip 并行迭代</h3>
      <pre><code>names = ["Alice", "Bob", "Charlie"]
age = [30, 25, 35]
for name, age in zip(names, age):
    print(f"{name} is {age} years old")</code></pre>

      <h3>10.3 使用 itertools 模块</h3>
      <pre><code>import itertools

# 无限迭代器
counter = itertools.count(start=1, step=2)
for i in counter:
    if i > 10:
        break
    print(i)

# 组合和排列
print(list(itertools.permutations([1, 2, 3])))
print(list(itertools.combinations([1, 2, 3], 2)))</code></pre>

      <h3>10.4 使用 functools 模块</h3>
      <pre><code>import functools

# 缓存函数结果
@functools.lru_cache(maxsize=None)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # 快速计算，因为结果被缓存了

# 偏函数
from functools import partial
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))  # 输出: 25
print(cube(5))    # 输出: 125</code></pre>

      <h2>结语</h2>
      <p>Pythonic 的编程风格不仅仅是关于使用特定的语法技巧，更是一种思维方式，强调代码的可读性、简洁性和优雅性。通过掌握这些方法和技巧，你可以写出更高效、更易维护的 Python 代码，同时也能更好地理解和欣赏 Python 语言的设计哲学。</p>
      <p>记住，Python 的魅力在于它允许你用更少的代码表达更多的思想。不断学习和实践这些技巧，你会发现 Python 编程变得越来越有趣和高效。</p>
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
    <article class="article-card p-6 reveal cursor-pointer" style="transition-delay: ${index * 0.05}s" onclick="openArticle(${article.id})">
      <div class="flex items-start justify-between gap-4 mb-3">
        <div class="flex items-center gap-3">
          <span class="text-xs font-medium text-accent bg-alt px-2 py-1 rounded">${article.category}</span>
          <span class="text-xs text-muted">${article.date}</span>
        </div>
      </div>
      <h3 class="font-display text-xl font-semibold text-fg mb-2 hover-accent transition-colors">${article.title}</h3>
      <p class="text-muted text-sm leading-relaxed mb-4">${article.excerpt}</p>
      <div class="flex flex-wrap gap-2" onclick="event.stopPropagation()">
        ${article.tags.map(tag => `<span class="tag text-xs px-2 py-1 rounded">${tag}</span>`).join('')}
      </div>
    </article>
  `).join('');
  
  initTiltEffect();
  initScrollReveal();
}

// 打开文章详情
function openArticle(id) {
  const article = articles.find(a => a.id === id);
  if (!article) return;

  const heroHeader = document.querySelector('header');
  if (heroHeader) heroHeader.classList.add('hidden');

  document.getElementById('articles').classList.add('hidden');
  document.getElementById('about').classList.add('hidden');
  
  document.getElementById('article-detail').classList.remove('hidden');

  document.getElementById('detail-title').textContent = article.title;
  document.getElementById('detail-content').innerHTML = article.content;

  document.querySelector('nav').classList.add('nav-article-view');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 关闭文章详情
function closeArticle() {
  const heroHeader = document.querySelector('header');
  if (heroHeader) heroHeader.classList.remove('hidden');

  document.getElementById('article-detail').classList.add('hidden');
  document.getElementById('articles').classList.remove('hidden');
  document.getElementById('about').classList.remove('hidden');

  document.querySelector('nav').classList.remove('nav-article-view');

  document.getElementById('articles').scrollIntoView({ behavior: 'smooth' });
}

// 点击导航栏 Logo 返回首页
function goHome(event) {
  event.preventDefault();

  const articleDetail = document.getElementById('article-detail');
  
  if (!articleDetail.classList.contains('hidden')) {
    closeArticle();
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
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

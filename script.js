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
# 注意：直接访问可能会引发KeyError if键不存在
print(f"{user['name']} is {user['age']} years old")  # 传统方式，但可能引发KeyError
print(f"{user.get('name')} is {user.get('age')} years old")  # 更安全的方式，键不存在时返回None

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
  },
  {
    id: 3,
    title: 'Python 各数据类型的高效方法、技巧与魔法',
    excerpt: 'Python 提供了丰富的数据类型，每种类型都有其独特的方法和技巧。本文将深入探讨 Python 中常用数据类型的高效使用方法、实用技巧和一些令人惊叹的"魔法"操作，帮助你充分发挥每种数据类型的潜力。',
    date: getCurrentDate(),
    category: '技术',
    tags: ['Python', '数据类型', '技巧', '魔法'],
    content: `
      <p>Python 是一种动态类型语言，提供了丰富的数据类型，每种类型都有其独特的方法和特性。掌握这些数据类型的高效使用方法和技巧，可以大大提高你的编程效率和代码质量。本文将详细介绍 Python 中常用数据类型的高效方法、实用技巧和一些"魔法"操作。</p>

      <h2>1. 数字类型</h2>
      <h3>1.1 整数 (int)</h3>
      <pre><code># 位运算技巧
# 检查数字是否为偶数
is_even = (x & 1) == 0

# 快速计算 2 的幂
power_of_two = 1 << n  # 相当于 2 ** n

# 取模运算的替代
remainder = x % 4
# 对于 2 的幂，可以使用位运算
remainder = x & 3  # 相当于 x % 4

# 快速交换两个变量
a, b = b, a

# 整数除法
# Python 3 中 // 表示整数除法
result = 7 // 3  # 结果为 2

# 绝对值
abs(-5)  # 结果为 5

# 最大值和最小值
max(1, 2, 3)  # 结果为 3
min(1, 2, 3)  # 结果为 1</code></pre>

      <h3>1.2 浮点数 (float)</h3>
      <pre><code># 浮点数比较
# 避免直接比较浮点数
import math
def is_close(a, b, rel_tol=1e-09, abs_tol=0.0):
    return abs(a - b) <= max(rel_tol * max(abs(a), abs(b)), abs_tol)

# 四舍五入
round(3.14159, 2)  # 结果为 3.14

# 科学计数法
x = 1e6  # 1000000.0

# 特殊值
import math
math.inf  # 无穷大
math.nan  # 非数字

# 数学函数
math.sqrt(25)  # 平方根
math.pow(2, 3)  # 幂运算
math.sin(math.pi/2)  # 正弦函数
math.cos(math.pi)  # 余弦函数
math.log(10)  # 自然对数
math.log10(100)  # 以 10 为底的对数</code></pre>

      <h2>2. 字符串 (str)</h2>
      <pre><code># 字符串格式化
name = "Alice"
age = 30

# f-string (Python 3.6+)
print(f"{name} is {age} years old")

# format 方法
print("{} is {} years old".format(name, age))

# 字符串方法
# 大小写转换
s = "Hello World"
s.upper()  # "HELLO WORLD"
s.lower()  # "hello world"
s.title()  # "Hello World"
s.capitalize()  # "Hello world"

# 去除空白
s = "  Hello World  "
s.strip()  # "Hello World"
s.lstrip()  # "Hello World  "
s.rstrip()  # "  Hello World"

# 分割和连接
s = "a,b,c"
s.split(",")  # ["a", "b", "c"]

s = ["a", "b", "c"]
",".join(s)  # "a,b,c"

# 查找和替换
s = "Hello World"
s.find("World")  # 6
 s.replace("World", "Python")  # "Hello Python"

# 检查前缀和后缀
s = "file.txt"
s.startswith("file")  # True
s.endswith(".txt")  # True

# 字符串反转
s = "Python"
s[::-1]  # "nohtyP"

# 字符串重复
s = "Python"
s * 3  # "PythonPythonPython"

# 检查字符串内容
"123".isdigit()  # True
"abc".isalpha()  # True
"abc123".isalnum()  # True
"   ".isspace()  # True

# 格式化数字
pi = 3.1415926535
print(f"pi = {pi:.2f}")  # pi = 3.14
print(f"pi = {pi:.5f}")  # pi = 3.14159</code></pre>

      <h2>3. 列表 (list)</h2>
      <pre><code># 列表创建
# 列表推导式
numbers = [i for i in range(10)]  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

even_numbers = [i for i in range(10) if i % 2 == 0]  # [0, 2, 4, 6, 8]

# 列表方法
# 添加元素
lst = [1, 2, 3]
lst.append(4)  # [1, 2, 3, 4]
lst.extend([5, 6])  # [1, 2, 3, 4, 5, 6]
lst.insert(0, 0)  # [0, 1, 2, 3, 4, 5, 6]

# 删除元素
lst.remove(0)  # [1, 2, 3, 4, 5, 6]
popped = lst.pop()  # 6, lst 变为 [1, 2, 3, 4, 5]
popped_first = lst.pop(0)  # 1, lst 变为 [2, 3, 4, 5]

# 排序
lst = [3, 1, 4, 1, 5, 9, 2, 6]
lst.sort()  # [1, 1, 2, 3, 4, 5, 6, 9]
lst.sort(reverse=True)  # [9, 6, 5, 4, 3, 2, 1, 1]

# 反转
lst.reverse()  # [1, 1, 2, 3, 4, 5, 6, 9]

# 列表操作
lst1 = [1, 2, 3]
lst2 = [4, 5, 6]
combined = lst1 + lst2  # [1, 2, 3, 4, 5, 6]
repeated = lst1 * 3  # [1, 2, 3, 1, 2, 3, 1, 2, 3]

# 列表索引和切片
lst = [0, 1, 2, 3, 4, 5]
lst[0]  # 0
lst[-1]  # 5
lst[1:4]  # [1, 2, 3]
lst[::2]  # [0, 2, 4]
lst[::-1]  # [5, 4, 3, 2, 1, 0]

# 列表长度
len(lst)  # 6

# 检查元素是否存在
3 in lst  # True
10 in lst  # False

# 统计元素出现次数
lst = [1, 2, 2, 3, 3, 3]
lst.count(2)  # 2

# 查找元素索引
lst = [1, 2, 3, 4, 5]
lst.index(3)  # 2

# 列表的高级操作
# 解包
a, b, *rest = [1, 2, 3, 4, 5]  # a=1, b=2, rest=[3, 4, 5]

# 列表转置（使用 zip）
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
transposed = list(zip(*matrix))  # [(1, 4, 7), (2, 5, 8), (3, 6, 9)]</code></pre>

      <h2>4. 元组 (tuple)</h2>
      <pre><code># 元组创建
t = (1, 2, 3)
t = 1, 2, 3  # 同样创建元组

# 单元素元组
t = (1,)  # 注意逗号

# 元组操作
# 索引和切片
t = (1, 2, 3, 4, 5)
t[0]  # 1
t[-1]  # 5
t[1:4]  # (2, 3, 4)

# 元组长度
len(t)  # 5

# 检查元素是否存在
3 in t  # True

# 元组拼接
t1 = (1, 2, 3)
t2 = (4, 5, 6)
t3 = t1 + t2  # (1, 2, 3, 4, 5, 6)

# 元组重复
t = (1, 2) * 3  # (1, 2, 1, 2, 1, 2)

# 元组解包
a, b, c = (1, 2, 3)  # a=1, b=2, c=3

# 元组的不可变性
# t[0] = 10  # 会引发 TypeError

# 元组的优势
# 1. 比列表更节省内存
# 2. 可以作为字典键
# 3. 可以作为集合元素
# 4. 函数返回多个值时使用元组

def get_coordinates():
    return (10, 20)
x, y = get_coordinates()</code></pre>

      <h2>5. 字典 (dict)</h2>
      <pre><code># 字典创建
d = {"name": "Alice", "age": 30}
d = dict(name="Alice", age=30)
d = dict([("name", "Alice"), ("age", 30)])

# 字典方法
# 获取值
d = {"name": "Alice", "age": 30}
d["name"]  # "Alice"
d.get("name")  # "Alice"
d.get("address", "Unknown")  # "Unknown"（键不存在时返回默认值）

# 设置值
d["address"] = "New York"

# 删除键值对
del d["age"]
d.pop("address")  # 返回值并删除

# 清空字典
d.clear()

# 获取所有键、值、键值对
d = {"name": "Alice", "age": 30}
list(d.keys())  # ["name", "age"]
list(d.values())  # ["Alice", 30]
list(d.items())  # [("name", "Alice"), ("age", 30)]

# 检查键是否存在
"name" in d  # True

# 字典推导式
d = {i: i**2 for i in range(5)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 合并字典（Python 3.5+）
d1 = {"a": 1, "b": 2}
d2 = {"b": 3, "c": 4}
d3 = {**d1, **d2}  # {"a": 1, "b": 3, "c": 4}

# 字典的高级操作
# 默认字典
from collections import defaultdict

# 创建一个默认值为列表的字典
d = defaultdict(list)
d["fruits"].append("apple")
d["fruits"].append("banana")  # d = {"fruits": ["apple", "banana"]}

# 计数器
from collections import Counter

fruits = ["apple", "banana", "apple", "orange", "banana", "apple"]
count = Counter(fruits)  # Counter({"apple": 3, "banana": 2, "orange": 1})

# 有序字典（Python 3.7+ 中普通字典已经有序）
from collections import OrderedDict

d = OrderedDict()
d["a"] = 1
d["b"] = 2
d["c"] = 3  # 保持插入顺序</code></pre>

      <h2>6. 集合 (set)</h2>
      <pre><code># 集合创建
s = {1, 2, 3}
s = set([1, 2, 3])
s = set("hello")  # {'h', 'e', 'l', 'o'}

# 空集合
s = set()  # 注意：{} 创建的是空字典

# 集合操作
# 添加元素
s = {1, 2, 3}
s.add(4)  # {1, 2, 3, 4}

# 删除元素
s.remove(4)  # {1, 2, 3}
s.discard(5)  # 不会引发错误
popped = s.pop()  # 随机删除一个元素

# 清空集合
s.clear()

# 集合运算
s1 = {1, 2, 3}
s2 = {3, 4, 5}

# 并集
s1 | s2  # {1, 2, 3, 4, 5}
s1.union(s2)  # 同上

# 交集
s1 & s2  # {3}
s1.intersection(s2)  # 同上

# 差集
s1 - s2  # {1, 2}
s1.difference(s2)  # 同上

# 对称差集
s1 ^ s2  # {1, 2, 4, 5}
s1.symmetric_difference(s2)  # 同上

# 子集和超集
s1 = {1, 2, 3}
s2 = {1, 2}
s2.issubset(s1)  # True
s1.issuperset(s2)  # True

# 集合推导式
s = {i**2 for i in range(5)}  # {0, 1, 4, 9, 16}

# 集合的应用
# 去重
lst = [1, 2, 2, 3, 3, 3]
unique_lst = list(set(lst))  # [1, 2, 3]

# 检查元素是否存在（集合的成员检查比列表快）
s = set(range(10000))
5000 in s  # 快速检查</code></pre>

      <h2>7. 布尔值 (bool) 和 None</h2>
      <pre><code># 布尔值
True and False  # False
True or False  # True
not True  # False

# 真值测试
# 以下值在布尔上下文中被视为 False：
# False, None, 0, 0.0, "", [], {}, set()

# 其他所有值都被视为 True

# None
# None 表示"无"或"空"
x = None

# 检查 None
if x is None:
    print("x is None")

# 注意：使用 is 而不是 == 来比较 None
x = None
x is None  # True
x == None  # True，但不推荐</code></pre>

      <h2>8. 高级数据类型技巧</h2>
      <h3>8.1 链式比较</h3>
      <pre><code># 链式比较
x = 5
1 < x < 10  # True
1 <= x <= 5  # True

# 等价于
1 < x and x < 10</code></pre>

      <h3>8.2 多重赋值</h3>
      <pre><code># 多重赋值
a, b, c = 1, 2, 3

# 交换变量
a, b = b, a

# 解包
t = (1, 2, 3)
a, b, c = t

lst = [4, 5, 6]
a, b, c = lst</code></pre>

      <h3>8.3 三元运算符</h3>
      <pre><code># 三元运算符
x = 10
y = "Even" if x % 2 == 0 else "Odd"

# 等价于
if x % 2 == 0:
    y = "Even"
else:
    y = "Odd"</code></pre>

      <h3>8.4 字符串和列表的魔法</h3>
      <pre><code># 字符串分割成列表
s = "Hello World"
list(s)  # ['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd']

# 列表连接成字符串
lst = ['H', 'e', 'l', 'l', 'o']
" ".join(lst)  # "H e l l o"

# 列表旋转
lst = [1, 2, 3, 4, 5]
rotated = lst[1:] + lst[:1]  # [2, 3, 4, 5, 1]

# 列表洗牌
import random
lst = [1, 2, 3, 4, 5]
random.shuffle(lst)  # 随机打乱</code></pre>

      <h3>8.5 字典的魔法</h3>
      <pre><code># 字典默认值
from collections import defaultdict

# 自动创建不存在的键
d = defaultdict(int)
d["count"] += 1  # d = {"count": 1}

# 字典按值排序
d = {"a": 3, "b": 1, "c": 2}
sorted_items = sorted(d.items(), key=lambda x: x[1])  # [('b', 1), ('c', 2), ('a', 3)]

# 字典按键排序
sorted_keys = sorted(d.keys())  # ['a', 'b', 'c']</code></pre>

      <h2>结语</h2>
      <p>Python 的数据类型丰富而强大，每种类型都有其独特的方法和技巧。通过掌握这些高效使用方法，你可以写出更简洁、更优雅、更高效的 Python 代码。</p>
      <p>记住，Python 的设计哲学是"简单胜于复杂"，"可读性很重要"。在使用这些技巧时，要确保代码的可读性和可维护性，不要为了追求技巧而牺牲代码的清晰度。</p>
      <p>不断学习和实践这些方法，你会发现 Python 编程变得越来越有趣和高效。享受 Python 的魅力吧！</p>
    `
  },
  {
    id: 4,
    title: 'Python 使用 boto3 模块操作 DynamoDB 和 S3',
    excerpt: 'boto3 是 AWS 的官方 Python SDK，用于与 AWS 服务进行交互。本文将介绍如何使用 boto3 模块操作 DynamoDB 和 S3 这两个常用的 AWS 服务，包括基本的 CRUD 操作和常见的使用场景。',
    date: getCurrentDate(),
    category: '技术',
    tags: ['Python', 'boto3', 'DynamoDB', 'S3', 'AWS'],
    content: `
      <p>boto3 是 AWS 的官方 Python SDK，提供了与 AWS 服务交互的完整功能。在 Python 中使用 boto3 可以轻松操作各种 AWS 服务，如 DynamoDB、S3、EC2 等。本文将重点介绍如何使用 boto3 操作 DynamoDB 和 S3 这两个常用的 AWS 服务。</p>

      <h2>1. 环境准备</h2>
      <p>首先，我们需要安装 boto3 库并配置 AWS 凭证。</p>
      <pre><code># 安装 boto3
pip install boto3

# 配置 AWS 凭证
# 方法 1: 使用 AWS CLI 配置
# aws configure

# 方法 2: 设置环境变量
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_REGION=us-east-1

# 方法 3: 在代码中直接设置
import boto3
from botocore.exceptions import NoCredentialsError

# 创建 boto3 客户端
s3 = boto3.client('s3',
                  aws_access_key_id='your_access_key',
                  aws_secret_access_key='your_secret_key',
                  region_name='us-east-1')

# 创建 DynamoDB 客户端
dynamodb = boto3.client('dynamodb',
                       aws_access_key_id='your_access_key',
                       aws_secret_access_key='your_secret_key',
                       region_name='us-east-1')</code></pre>

      <h2>2. S3 操作</h2>
      <h3>2.1 创建存储桶</h3>
      <pre><code>import boto3

s3 = boto3.client('s3')

try:
    # 创建存储桶
    bucket_name = 'my-bucket-123456'  # 存储桶名称必须全局唯一
    s3.create_bucket(Bucket=bucket_name)
    print(f"存储桶 {bucket_name} 创建成功")
except Exception as e:
    print(f"创建存储桶失败: {e}")</code></pre>

      <h3>2.2 上传文件</h3>
      <pre><code>import boto3

s3 = boto3.client('s3')

bucket_name = 'my-bucket-123456'
local_file = 'example.txt'
s3_key = 'documents/example.txt'  # S3 中的文件路径

try:
    # 上传文件
    s3.upload_file(local_file, bucket_name, s3_key)
    print(f"文件 {local_file} 上传成功")
except Exception as e:
    print(f"上传文件失败: {e}")</code></pre>

      <h3>2.3 下载文件</h3>
      <pre><code>import boto3

s3 = boto3.client('s3')

bucket_name = 'my-bucket-123456'
s3_key = 'documents/example.txt'
download_path = 'downloaded_example.txt'

try:
    # 下载文件
    s3.download_file(bucket_name, s3_key, download_path)
    print(f"文件 {s3_key} 下载成功")
except Exception as e:
    print(f"下载文件失败: {e}")</code></pre>

      <h3>2.4 列出存储桶中的文件</h3>
      <pre><code>import boto3

s3 = boto3.client('s3')

bucket_name = 'my-bucket-123456'

try:
    # 列出存储桶中的文件
    response = s3.list_objects_v2(Bucket=bucket_name)
    
    if 'Contents' in response:
        print(f"存储桶 {bucket_name} 中的文件:")
        for item in response['Contents']:
            print(f"- {item['Key']} (大小: {item['Size']} 字节)")
    else:
        print(f"存储桶 {bucket_name} 为空")
except Exception as e:
    print(f"列出文件失败: {e}")</code></pre>

      <h3>2.5 删除文件</h3>
      <pre><code>import boto3

s3 = boto3.client('s3')

bucket_name = 'my-bucket-123456'
s3_key = 'documents/example.txt'

try:
    # 删除文件
    s3.delete_object(Bucket=bucket_name, Key=s3_key)
    print(f"文件 {s3_key} 删除成功")
except Exception as e:
    print(f"删除文件失败: {e}")</code></pre>

      <h3>2.6 生成预签名 URL</h3>
      <pre><code>import boto3
from datetime import datetime, timedelta

s3 = boto3.client('s3')

bucket_name = 'my-bucket-123456'
s3_key = 'documents/example.txt'

# 设置 URL 过期时间（例如 1 小时）
expiration = datetime.now() + timedelta(hours=1)

try:
    # 生成预签名 URL
    presigned_url = s3.generate_presigned_url(
        'get_object',
        Params={'Bucket': bucket_name, 'Key': s3_key},
        ExpiresIn=3600  # 过期时间（秒）
    )
    print(f"预签名 URL: {presigned_url}")
except Exception as e:
    print(f"生成预签名 URL 失败: {e}")</code></pre>

      <h2>3. DynamoDB 操作</h2>
      <h3>3.1 创建表</h3>
      <pre><code>import boto3

dynamodb = boto3.client('dynamodb')

table_name = 'users'

try:
    # 创建表
    response = dynamodb.create_table(
        TableName=table_name,
        KeySchema=[
            {'AttributeName': 'id', 'KeyType': 'HASH'}  # 分区键
        ],
        AttributeDefinitions=[
            {'AttributeName': 'id', 'AttributeType': 'N'}
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        }
    )
    print(f"表 {table_name} 创建成功")
except Exception as e:
    print(f"创建表失败: {e}")</code></pre>

      <h3>3.2 插入数据</h3>
      <pre><code>import boto3

# 使用资源 API 更方便
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

try:
    # 插入数据
    response = table.put_item(
        Item={
            'id': 1,
            'name': 'Alice',
            'age': 30,
            'email': 'alice@example.com'
        }
    )
    print("数据插入成功")
except Exception as e:
    print(f"插入数据失败: {e}")</code></pre>

      <h3>3.3 查询数据</h3>
      <pre><code>import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

try:
    # 根据主键查询
    response = table.get_item(
        Key={'id': 1}
    )
    
    if 'Item' in response:
        print("查询结果:")
        print(response['Item'])
    else:
        print("未找到数据")
except Exception as e:
    print(f"查询数据失败: {e}")</code></pre>

      <h3>3.4 更新数据</h3>
      <pre><code>import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

try:
    # 更新数据
    response = table.update_item(
        Key={'id': 1},
        UpdateExpression='SET age = :val1, email = :val2',
        ExpressionAttributeValues={
            ':val1': 31,
            ':val2': 'alice.new@example.com'
        },
        ReturnValues='UPDATED_NEW'
    )
    print("数据更新成功")
    print(f"更新的值: {response['Attributes']}")
except Exception as e:
    print(f"更新数据失败: {e}")</code></pre>

      <h3>3.5 删除数据</h3>
      <pre><code>import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

try:
    # 删除数据
    response = table.delete_item(
        Key={'id': 1}
    )
    print("数据删除成功")
except Exception as e:
    print(f"删除数据失败: {e}")</code></pre>

      <h3>3.6 扫描表</h3>
      <pre><code>import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

try:
    # 扫描整个表
    response = table.scan()
    
    items = response['Items']
    print(f"表中有 {len(items)} 条数据:")
    for item in items:
        print(item)
        
    # 处理分页
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        items.extend(response['Items'])
        for item in response['Items']:
            print(item)
            
except Exception as e:
    print(f"扫描表失败: {e}")</code></pre>

      <h2>4. 高级操作</h2>
      <h3>4.1 S3 批量操作</h3>
      <pre><code>import boto3
from concurrent.futures import ThreadPoolExecutor

s3 = boto3.client('s3')
bucket_name = 'my-bucket-123456'

# 批量上传文件
def upload_file(file_path, key):
    try:
        s3.upload_file(file_path, bucket_name, key)
        print(f"上传成功: {key}")
    except Exception as e:
        print(f"上传失败 {key}: {e}")

# 要上传的文件列表
files = [
    ('file1.txt', 'documents/file1.txt'),
    ('file2.txt', 'documents/file2.txt'),
    ('file3.txt', 'documents/file3.txt')
]

# 使用线程池批量上传
with ThreadPoolExecutor(max_workers=5) as executor:
    executor.map(lambda x: upload_file(x[0], x[1]), files)</code></pre>

      <h3>4.2 DynamoDB 批量写入</h3>
      <pre><code>import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

# 批量写入数据
try:
    with table.batch_writer() as batch:
        batch.put_item(Item={'id': 2, 'name': 'Bob', 'age': 25, 'email': 'bob@example.com'})
        batch.put_item(Item={'id': 3, 'name': 'Charlie', 'age': 35, 'email': 'charlie@example.com'})
        batch.put_item(Item={'id': 4, 'name': 'David', 'age': 40, 'email': 'david@example.com'})
    print("批量写入成功")
except Exception as e:
    print(f"批量写入失败: {e}")</code></pre>

      <h3>4.3 使用 DynamoDB 查询条件</h3>
      <pre><code>import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

# 创建全局二级索引（如果还没有）
# 注意：需要在创建表时定义索引

# 使用索引查询
try:
    # 假设我们有一个按年龄排序的索引
    response = table.query(
        IndexName='AgeIndex',
        KeyConditionExpression=Key('age').eq(30)
    )
    
    print("查询结果:")
    for item in response['Items']:
        print(item)
        
except Exception as e:
    print(f"查询失败: {e}")</code></pre>

      <h2>5. 最佳实践</h2>
      <h3>5.1 错误处理</h3>
      <pre><code>import boto3
from botocore.exceptions import ClientError

s3 = boto3.client('s3')

try:
    response = s3.get_object(Bucket='my-bucket', Key='non-existent-file.txt')
except ClientError as e:
    if e.response['Error']['Code'] == 'NoSuchKey':
        print("文件不存在")
    elif e.response['Error']['Code'] == 'NoSuchBucket':
        print("存储桶不存在")
    else:
        print(f"发生错误: {e}")</code></pre>

      <h3>5.2 使用上下文管理器</h3>
      <pre><code>import boto3

s3 = boto3.client('s3')

bucket_name = 'my-bucket-123456'
key = 'documents/example.txt'

# 下载文件并处理
try:
    with open('downloaded_file.txt', 'wb') as f:
        s3.download_fileobj(bucket_name, key, f)
    print("文件下载成功")
except Exception as e:
    print(f"下载失败: {e}")</code></pre>

      <h3>5.3 配置重试策略</h3>
      <pre><code>import boto3
from botocore.config import Config

# 配置重试策略
config = Config(
    retries={
        'max_attempts': 10,
        'mode': 'standard'
    }
)

s3 = boto3.client('s3', config=config)
dynamodb = boto3.client('dynamodb', config=config)</code></pre>

      <h2>结语</h2>
      <p>boto3 是一个功能强大的库，提供了与 AWS 服务交互的完整能力。本文介绍了使用 boto3 操作 S3 和 DynamoDB 的常用方法，包括基本的 CRUD 操作和一些高级技巧。</p>
      <p>在实际使用中，你可能需要根据具体的业务需求进行调整和扩展。AWS 提供了详细的文档和示例，你可以参考官方文档来了解更多高级功能和最佳实践。</p>
      <p>记住，在生产环境中使用 AWS 服务时，要注意安全性、成本控制和性能优化。合理使用 boto3 可以帮助你构建可靠、高效的云应用。</p>
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

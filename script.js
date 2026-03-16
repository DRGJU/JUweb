/**
 * 博客核心脚本
 * 包含文章数据和渲染逻辑
 */

// ============================================
// 文章数据数组 - 在这里添加你的文章
// ============================================
const articles = [
    {
        id: 1,
        title: "在山间寻找内心的宁静",
        category: "随笔",
        date: "2024年1月15日",
        summary: "远离城市的喧嚣，我走进了那片熟悉的山林。阳光穿过树叶的缝隙，洒下斑驳的光影...",
        image: "https://picsum.photos/seed/blog-nature/800/600.jpg",
        content: `
            <p>远离城市的喧嚣，我走进了那片熟悉的山林。阳光穿过树叶的缝隙，洒下斑驳的光影，像是大自然最温柔的低语。</p>
            <p>清晨的薄雾还未散去，空气中弥漫着泥土和青草的芬芳。我沿着蜿蜒的山路前行，脚下的落叶发出轻微的沙沙声，仿佛在诉说着这片森林的故事。</p>
            <h2>与自然对话</h2>
            <p>在这片山林里，时间似乎变得缓慢。没有手机的消息提醒，没有工作的焦虑，只有风声、鸟鸣和自己心跳的声音。我找了一块干净的石头坐下，闭上眼睛，感受着周围的一切。</p>
            <blockquote>大自然是最好的治愈师，她从不评判，只是静静陪伴。</blockquote>
            <p>在山间的几个小时，让我找回了久违的平静。下山的时候，我带回了一片枫叶，作为这次旅行的纪念。</p>
        `
    },
    {
        id: 2,
        title: "重读《百年孤独》：时间的轮回",
        category: "阅读",
        date: "2024年1月10日",
        summary: "马尔克斯笔下的马孔多，像是一个被时间遗忘的角落。每一次重读，都能发现新的感动...",
        image: "https://picsum.photos/seed/blog-book/800/600.jpg",
        content: `
            <p>马尔克斯笔下的马孔多，像是一个被时间遗忘的角落。每一次重读，都能发现新的感动。</p>
            <p>第一次读《百年孤独》是在大学时期，那时只觉得人名繁多、情节魔幻。如今再读，却在那些荒诞的故事背后，看到了生命最本质的孤独与坚韧。</p>
            <h2>孤独的底色</h2>
            <p>布恩迪亚家族七代人的故事，看似是一部家族史，实则是对人类命运的深刻洞察。每个人都在自己的孤独中挣扎，试图寻找连接，却又一次次陷入循环。</p>
            <blockquote>生命中曾经有过的所有灿烂，终将需要用寂寞来偿还。</blockquote>
            <p>这本书教会我，接受孤独，它是生命的一部分。在孤独中，我们才能更清晰地认识自己。</p>
        `
    },
    {
        id: 3,
        title: "城市角落里的咖啡馆",
        category: "生活",
        date: "2024年1月5日",
        summary: "每座城市都有属于自己的咖啡馆，它们安静地存在于街角，等待着有缘人的到来...",
        image: "https://picsum.photos/seed/blog-cafe/800/600.jpg",
        content: `
            <p>每座城市都有属于自己的咖啡馆，它们安静地存在于街角，等待着有缘人的到来。</p>
            <p>我是一个喜欢探索咖啡馆的人。每到一个新的城市，我总会花时间寻找那些隐藏在小巷深处的店铺。它们往往没有醒目的招牌，却能给人带来惊喜。</p>
            <h2>咖啡馆的记忆</h2>
            <p>咖啡馆不仅仅是喝咖啡的地方，更是承载记忆的容器。那杯在雨天喝的热拿铁，那个在窗边读一下午书的周末，那些和朋友聊到深夜的时刻...</p>
            <p>我喜欢观察咖啡馆里的人：独自工作的自由职业者、低声交谈的情侣、在角落里画画的老先生。每个人都有自己的故事。</p>
        `
    },
    {
        id: 4,
        title: "春日漫步：樱花季的京都",
        category: "旅行",
        date: "2024年3月20日",
        summary: "春天的京都，满城樱花绽放。走在哲学之道上，花瓣随风飘落，如同粉色的雪...",
        image: "https://picsum.photos/seed/blog-spring/800/600.jpg",
        content: `
            <p>春天的京都，满城樱花绽放。走在哲学之道上，花瓣随风飘落，如同粉色的雪。</p>
            <p>这是我一直向往的场景。当真正置身其中时，才明白为什么那么多文人墨客为之倾倒。</p>
            <h2>古都的禅意</h2>
            <p>京都的美，在于它的安静与克制。即使是在樱花季最热闹的时候，你依然可以在某些寺庙的角落找到独处的空间。</p>
            <blockquote>花开花落，皆是风景。</blockquote>
            <p>这次旅行让我明白，美是需要慢下来才能感受的。不必赶景点，只需静静地走，慢慢地看。</p>
        `
    },
    {
        id: 5,
        title: "深夜的古典乐：德彪西的月光",
        category: "音乐",
        date: "2023年12月20日",
        summary: "当夜深人静，德彪西的《月光》总能带给人无限的遐想与宁静...",
        image: "https://picsum.photos/seed/blog-music/800/600.jpg",
        content: `
            <p>当夜深人静，德彪西的《月光》总能带给人无限的遐想与宁静。</p>
            <p>古典乐是我深夜工作的伴侣。在那些需要专注的时刻，没有歌词的旋律是最好的背景。</p>
            <h2>印象派的色彩</h2>
            <p>德彪西的音乐像是一幅幅水彩画，没有清晰的轮廓，却充满了色彩和光影。《月光》尤其如此，它让人联想到波光粼粼的湖面，或是穿透云层的银色光芒。</p>
        `
    },
    {
        id: 6,
        title: "看展手记：当代艺术的边界",
        category: "艺术",
        date: "2023年12月15日",
        summary: "艺术的边界在哪里？也许正是在不断突破与重构中，艺术才能保持它的生命力...",
        image: "https://picsum.photos/seed/blog-art/800/600.jpg",
        content: `
            <p>艺术的边界在哪里？也许正是在不断突破与重构中，艺术才能保持它的生命力。</p>
            <p>上周末去看了当代艺术展，展出的作品形式多样：装置、影像、行为艺术...有些作品让人困惑，有些则令人深思。</p>
            <h2>艺术与生活</h2>
            <p>当代艺术最有意思的地方，在于它模糊了艺术与生活的界限。一个普通的物件，放在展厅里，被观众凝视，就变成了艺术。</p>
        `
    }
];

// ============================================
// 渲染函数
// ============================================

/**
 * 渲染首页文章列表
 */
function renderArticleList() {
    const container = document.getElementById('articles-grid');
    if (!container) return;

    const html = articles.map(article => `
        <article class="article-card group bg-[#F3F0E6] border border-[#DCCFB8] rounded-lg overflow-hidden hover:border-[#C49A5A] transition-colors">
            <a href="article.html?id=${article.id}" class="block">
                <div class="aspect-[4/3] overflow-hidden">
                    <img 
                        src="${article.image}" 
                        alt="${article.title}"
                        class="article-card-img w-full h-full object-cover"
                    >
                </div>
                <div class="p-6">
                    <div class="flex items-center gap-3 mb-3">
                        <span class="text-xs font-medium text-[#C49A5A] uppercase tracking-wide">${article.category}</span>
                        <span class="text-xs text-[#6A6456]/60">·</span>
                        <span class="text-xs text-[#6A6456]/60">${article.date}</span>
                    </div>
                    <h3 class="text-lg font-medium text-[#3F3A33] mb-2 group-hover:text-[#C49A5A] transition-colors">${article.title}</h3>
                    <p class="text-sm font-light text-[#6A6456]/80 leading-relaxed line-clamp-2">
                        ${article.summary}
                    </p>
                </div>
            </a>
        </article>
    `).join('');

    container.innerHTML = html;
}

/**
 * 渲染文章详情页
 */
function renderArticleDetail() {
    const titleEl = document.getElementById('article-title');
    const metaEl = document.getElementById('article-meta');
    const imageEl = document.getElementById('article-image');
    const contentEl = document.getElementById('article-content');
    
    if (!titleEl) return; // 不在详情页则退出

    // 获取 URL 参数中的文章 ID
    const params = new URLSearchParams(window.location.search);
    const articleId = parseInt(params.get('id'));
    
    // 查找对应文章
    const article = articles.find(a => a.id === articleId);
    
    if (!article) {
        // 文章不存在，显示错误信息
        titleEl.textContent = '文章未找到';
        contentEl.innerHTML = '<p class="text-center py-12">抱歉，该文章不存在或已被删除。<a href="index.html" class="text-[#C49A5A]">返回首页</a></p>';
        document.getElementById('article-image-container').style.display = 'none';
        return;
    }

    // 更新页面标题
    document.title = `${article.title} | 林清雪`;

    // 渲染内容
    titleEl.textContent = article.title;
    metaEl.innerHTML = `
        <span class="text-xs font-medium text-[#C49A5A] uppercase tracking-wide">${article.category}</span>
        <span class="text-xs text-[#6A6456]/60 mx-2">·</span>
        <span class="text-xs text-[#6A6456]/60">${article.date}</span>
    `;
    imageEl.src = article.image;
    imageEl.alt = article.title;
    contentEl.innerHTML = article.content;
}

// ============================================
// 页面加载完成后执行
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    renderArticleList();    // 首页列表渲染
    renderArticleDetail();  // 详情页渲染
});

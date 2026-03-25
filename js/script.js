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



function initScrollReveal() {
  let observer = null;
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
  initVideoBackground();
  initScrollReveal();
  initMusicControl();
});

function initMusicControl() {
  const bgMusic = document.getElementById('bgMusic');
  const playBtn = document.getElementById('playBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  
  if (!bgMusic || !playBtn || !pauseBtn) return;
  
  // 播放按钮点击事件
  playBtn.addEventListener('click', () => {
    bgMusic.play().catch(err => console.log('音乐播放失败:', err));
    playBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
  });
  
  // 暂停按钮点击事件
  pauseBtn.addEventListener('click', () => {
    bgMusic.pause();
    pauseBtn.classList.add('hidden');
    playBtn.classList.remove('hidden');
  });
  
  // 音乐结束时重新播放
  bgMusic.addEventListener('ended', () => {
    bgMusic.currentTime = 0;
    bgMusic.play();
  });
}

// 点击涟漪特效
function initClickEffect() {
  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.classList.add('click-ripple');
    
    // 随机选择颜色
    const colorClasses = ['color-1', 'color-2', 'color-3', 'color-4'];
    const randomColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];
    ripple.classList.add(randomColor);
    
    // 随机选择大小
    const sizeClasses = ['small', 'medium', 'large'];
    const randomSize = sizeClasses[Math.floor(Math.random() * sizeClasses.length)];
    ripple.classList.add(randomSize);
    
    // 随机选择速度
    const speedClasses = ['fast', 'normal', 'slow'];
    const randomSpeed = speedClasses[Math.floor(Math.random() * speedClasses.length)];
    ripple.classList.add(randomSpeed);
    
    // 随机添加发光效果
    if (Math.random() > 0.5) {
      ripple.classList.add('glow');
    }
    
    // 设置位置
    ripple.style.left = (e.clientX - 20) + 'px'; // 20是默认大小的一半
    ripple.style.top = (e.clientY - 20) + 'px';
    
    document.body.appendChild(ripple);
    
    // 动画结束后移除元素
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  });
}

// 点击涟漪动画
function initRippleEffect() {
  const buttons = document.querySelectorAll('button, a, .article-card');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 800);
    });
  });
}

// 像素光标轨迹
function initPixelTrail() {
  const pixelContainer = document.createElement('div');
  pixelContainer.classList.add('pixel-cursor-trail');
  document.body.appendChild(pixelContainer);
  
  // 定义多种颜色
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffcc5c', '#ff9ff3', '#54a0ff', '#5f27cd'];
  
  document.addEventListener('mousemove', (e) => {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel-dot');
    pixel.style.left = (e.clientX - 4) + 'px';
    pixel.style.top = (e.clientY - 4) + 'px';
    
    // 随机选择一种颜色
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    pixel.style.background = randomColor;
    
    pixelContainer.appendChild(pixel);
    
    setTimeout(() => {
      pixel.remove();
    }, 1000);
  });
}



// 粒子动画
function initParticleAnimation() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 50; // 减少粒子数量
  const mouse = { x: null, y: null };
  const maxDistance = 150; // 粒子间连线的最大距离
  
  // 创建粒子
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 1,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
      color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 0.8 + 0.2})`
    });
  }
  
  // 鼠标移动事件
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  
  // 动画循环
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // 鼠标规避效果
      if (mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = (100 - distance) / 100;
        
        if (distance < 100) {
          const moveX = (dx / distance) * force;
          const moveY = (dy / distance) * force;
          p.x += moveX;
          p.y += moveY;
        }
      }
      
      // 绘制粒子
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      
      // 粒子间连线
      for (let j = i; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = 1 - (distance / maxDistance);
          ctx.beginPath();
          // 始终使用适合暗黑模式的颜色
          ctx.strokeStyle = `rgba(200, 200, 200, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
      
      // 移动粒子
      p.x += p.speedX;
      p.y += p.speedY;
      
      // 边界检查
      if (p.x > canvas.width) p.x = 0;
      if (p.x < 0) p.x = canvas.width;
      if (p.y > canvas.height) p.y = 0;
      if (p.y < 0) p.y = canvas.height;
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // 窗口大小变化时调整画布大小
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// 粒子文字特效
function initParticleText() {
  const ptCanvas = document.getElementById('particle-text-canvas');
  if (!ptCanvas) return;
  
  const ptCtx = ptCanvas.getContext('2d');
  let ptW, ptH, ptParticles = [], ptText = 'CODE', ptMouse = {x:null, y:null};

  function resizeParticleText() {
    ptW = ptCanvas.width = ptCanvas.offsetWidth;
    ptH = ptCanvas.height = ptCanvas.offsetHeight;
    createParticleText();
  }

  function createParticleText() {
    ptParticles = [];
    const fontSize = Math.min(ptW, ptH) * 0.7;
    ptCtx.font = `900 ${fontSize}px Arial`;
    ptCtx.fillStyle = '#fff';
    ptCtx.textAlign = 'center';
    ptCtx.textBaseline = 'middle';
    
    // 绘制文字获取像素数据
    ptCtx.fillText(ptText, ptW/2, ptH/2);
    const data = ptCtx.getImageData(0, 0, ptW, ptH).data;
    ptCtx.clearRect(0, 0, ptW, ptH);
    
    // 从像素数据创建粒子
    const gap = 4;
    for (let y = 0; y < ptH; y += gap) {
      for (let x = 0; x < ptW; x += gap) {
        const index = (y * ptW + x) * 4;
        if (data[index + 3] > 128) {
          ptParticles.push({
            x: x, y: y,
            originX: x, originY: y,
            vx: 0, vy: 0,
            size: Math.random() * 2 + 1,
            hue: Math.random() * 60 + 280
          });
        }
      }
    }
  }

  function animateParticleText() {
    ptCtx.clearRect(0, 0, ptW, ptH);
    
    ptParticles.forEach(p => {
      // 鼠标交互
      if (ptMouse.x !== null) {
        const dx = ptMouse.x - p.x;
        const dy = ptMouse.y - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 80) {
          const force = (80 - dist) / 80;
          p.vx -= dx * force * 0.03;
          p.vy -= dy * force * 0.03;
        }
      }
      
      // 回归原位
      const dx = p.originX - p.x;
      const dy = p.originY - p.y;
      p.vx += dx * 0.03;
      p.vy += dy * 0.03;
      
      // 阻尼
      p.vx *= 0.92;
      p.vy *= 0.92;
      
      p.x += p.vx;
      p.y += p.vy;
      
      ptCtx.fillStyle = `hsla(${p.hue}, 80%, 70%, 0.9)`;
      ptCtx.beginPath();
      ptCtx.arc(p.x, p.y, p.size, 0, Math.PI*2);
      ptCtx.fill();
    });
    requestAnimationFrame(animateParticleText);
  }

  // 鼠标移动事件
  window.addEventListener('mousemove', (e) => {
    const rect = ptCanvas.getBoundingClientRect();
    ptMouse.x = e.clientX - rect.left;
    ptMouse.y = e.clientY - rect.top;
  });

  // 窗口大小变化时调整画布大小
  window.addEventListener('resize', resizeParticleText);

  // 初始化
  resizeParticleText();
  animateParticleText();
}

// 在DOM加载完成后初始化所有效果
document.addEventListener('DOMContentLoaded', () => {
  initClickEffect();
  initRippleEffect();
  initPixelTrail();
  initParticleAnimation();
  initParticleText();
});
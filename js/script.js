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
  initClickEffect();
  initRippleEffect();
  initAdvancedCursorEffect();
  initMagneticEffect();
  initParticleAnimation();
  initParticleText();
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

// 星光拖尾效果 + 点击粒子爆发 + 光环跟随 + 磁吸效果
function initAdvancedCursorEffect() {
  console.log('[Cursor Effect] Initializing...');

  // 移动端禁用
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    console.log('[Cursor Effect] Mobile detected, disabling...');
    return;
  }

  // 创建 Canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'cursor-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;overflow:hidden;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  console.log('[Cursor Effect] Canvas created');

  // 颜色
  const colors = ['#00f5ff', '#a855f7', '#ec4899', '#ffffff'];
  const glowRGB = [
    '0, 245, 255',
    '168, 85, 247',
    '236, 72, 153'
  ];

  // 数据
  const trail = [];
  const bursts = [];
  const MAX_TRAIL = 80;
  const MAX_BURST = 150;

  // 状态
  let mouseX = -100, mouseY = -100;
  let isActive = false;
  let glowPhase = 0;

  // 检查鼠标是否在视口内
  function isMouseInViewport() {
    return mouseX >= 0 && mouseX <= window.innerWidth && mouseY >= 0 && mouseY <= window.innerHeight;
  }

  // 主动画
  function draw() {
    // 检查鼠标是否在视口内
    const shouldShowEffects = isActive && isMouseInViewport();

    // 清除
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 添加新轨迹点
    if (shouldShowEffects) {
      trail.push({ x: mouseX, y: mouseY, life: 1 });
      if (trail.length > MAX_TRAIL) trail.shift();
    }

    // 绘制轨迹
    for (let i = trail.length - 1; i >= 0; i--) {
      const p = trail[i];
      p.life -= 0.02;
      if (p.life <= 0) { trail.splice(i, 1); continue; }

      const colorIdx = Math.floor((1 - p.life) * 3) % 3;
      const size = (10 + p.life * 3) * p.life;
      const alpha = p.life;

      // 发光
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2.5);
      grd.addColorStop(0, `rgba(${glowRGB[colorIdx]}, ${alpha * 0.6})`);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // 核心
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = colors[colorIdx];
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // 绘制爆发粒子
    for (let i = bursts.length - 1; i >= 0; i--) {
      const b = bursts[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vx *= 0.95;
      b.vy *= 0.95;
      b.life -= 0.025;
      if (b.life <= 0) { bursts.splice(i, 1); continue; }

      const size = b.size * b.life;
      const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, size * 2);
      grd.addColorStop(0, `rgba(${glowRGB[b.colorIdx]}, ${b.life * 0.8})`);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(b.x, b.y, size * 2, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(b.x, b.y, size, 0, Math.PI * 2);
      ctx.fillStyle = colors[b.colorIdx];
      ctx.globalAlpha = b.life;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // 绘制光环 - 仅当鼠标在视口内时
    if (shouldShowEffects) {
      glowPhase += 0.05;
      const breathe = (Math.sin(glowPhase) + 1) / 2 * 0.4 + 0.4;

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 60 + i * 20, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${glowRGB[i]}, ${breathe * (0.5 - i * 0.15)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      const innerGrd = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 50);
      innerGrd.addColorStop(0, `rgba(0, 245, 255, ${breathe * 0.5})`);
      innerGrd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 50, 0, Math.PI * 2);
      ctx.fillStyle = innerGrd;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  // 事件
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isActive = true;
  });

  window.addEventListener('mouseleave', () => {
    isActive = false;
  });

  window.addEventListener('mouseenter', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isActive = true;
  });

  // 当鼠标移动到窗口边界时也检测
  window.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget || e.relatedTarget === document.documentElement) {
      isActive = false;
    }
  });

  window.addEventListener('click', (e) => {
    const count = 15 + Math.floor(Math.random() * 10);
    for (let i = 0; i < count; i++) {
      bursts.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.5) * 16,
        size: 5 + Math.random() * 7,
        colorIdx: Math.floor(Math.random() * 3),
        life: 1
      });
    }
  });

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // 页面可见性变化时重置状态
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isActive = false;
    }
  });

  console.log('[Cursor Effect] Starting...');
  draw();
}

// 磁吸效果
function initMagneticEffect() {
  const magneticElements = document.querySelectorAll('a, button, .article-card, .tag, .pagination-btn');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const force = (100 - distance) / 100;
        const moveX = dx * force * 0.3;
        const moveY = dy * force * 0.3;
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        el.style.transition = 'transform 0.1s ease-out';
      }
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 0.3s ease-out';
    });
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
    const container = ptCanvas.parentElement;
    ptW = ptCanvas.width = container.offsetWidth;
    ptH = ptCanvas.height = container.offsetHeight;
    createParticleText();
  }

  function createParticleText() {
    ptParticles = [];
    const centerX = ptW / 2;
    const centerY = ptH / 2;
    
    const maxTextWidth = ptW * 0.9;
    const maxTextHeight = ptH * 0.85;
    
    let fontSize = Math.min(ptW, ptH) * 0.4;
    ptCtx.font = `900 ${fontSize}px Arial`;
    let metrics = ptCtx.measureText(ptText);
    let textWidth = metrics.width;
    
    while ((textWidth > maxTextWidth || fontSize > maxTextHeight) && fontSize > 10) {
      fontSize -= 2;
      ptCtx.font = `900 ${fontSize}px Arial`;
      metrics = ptCtx.measureText(ptText);
      textWidth = metrics.width;
    }
    
    ptCtx.fillStyle = '#fff';
    ptCtx.textAlign = 'center';
    ptCtx.textBaseline = 'middle';
    ptCtx.fillText(ptText, centerX, centerY);
    
    const data = ptCtx.getImageData(0, 0, ptW, ptH).data;
    ptCtx.clearRect(0, 0, ptW, ptH);
    
    const gap = 3;
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
      
      const dx = p.originX - p.x;
      const dy = p.originY - p.y;
      p.vx += dx * 0.03;
      p.vy += dy * 0.03;
      
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

  window.addEventListener('mousemove', (e) => {
    const rect = ptCanvas.getBoundingClientRect();
    ptMouse.x = e.clientX - rect.left;
    ptMouse.y = e.clientY - rect.top;
  });

  window.addEventListener('resize', resizeParticleText);

  resizeParticleText();
  animateParticleText();
}